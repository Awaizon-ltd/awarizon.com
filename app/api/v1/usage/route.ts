import { NextRequest, NextResponse } from 'next/server'
import { adminDb }                   from '@/lib/firebase/admin'
import { FieldValue }                from 'firebase-admin/firestore'

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Allows MAX_REQUESTS per key per WINDOW_MS. Resets the window on expiry.
// Simple and zero-dependency; sufficient for a single serverless instance.
// For multi-region deployments, replace with Upstash Redis or Vercel KV.

const RATE_WINDOW_MS  = 60_000   // 1 minute
const MAX_REQUESTS    = 60       // 60 requests / min per key

const rateLimiter = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(key: string): boolean {
  const now    = Date.now()
  const record = rateLimiter.get(key)

  if (!record || now >= record.resetAt) {
    rateLimiter.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (record.count >= MAX_REQUESTS) return false

  record.count++
  return true
}

// ── Types ─────────────────────────────────────────────────────────────────────

const VALID_EVENT_TYPES = new Set([
  'contract.read', 'contract.write', 'contract.gas_estimate',
  'wallet.create', 'wallet.import', 'chain.switch',
])

const MAX_FUNCTIONS_TRACKED = 20

interface TelemetryEvent {
  type:          string
  chain:         string
  chainId:       number
  functionName?: string
  success:       boolean
  durationMs:    number
  ts:            number   // Unix ms
}

interface UsagePayload {
  events: TelemetryEvent[]
}

// ── POST /api/v1/usage ────────────────────────────────────────────────────────
// Receives batched telemetry events from the SDK.
// Atomically updates per-day and all-time usage stats in Firestore.
// Accepts: Authorization: Bearer <key>
export async function POST(req: NextRequest) {

  // ── Auth ──────────────────────────────────────────────────────────────────
  const authHeader = req.headers.get('authorization') ?? ''
  const apiKey =
    (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null) ??
    req.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Rate limit ────────────────────────────────────────────────────────────
  if (!checkRateLimit(apiKey)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 60 requests/minute per key.' },
      { status: 429 },
    )
  }

  // ── Validate key ──────────────────────────────────────────────────────────
  const keySnap = await adminDb
    .collection('apiKeys')
    .where('key', '==', apiKey)
    .where('status', '==', 'active')
    .limit(1)
    .get()

  if (keySnap.empty) {
    return NextResponse.json({ error: 'Invalid or revoked API key.' }, { status: 401 })
  }

  const keyDoc  = keySnap.docs[0]
  const keyId   = keyDoc.id
  const { uid } = keyDoc.data() as { uid: string }

  // ── Parse + sanitise events ───────────────────────────────────────────────
  let rawEvents: TelemetryEvent[]
  try {
    const body = await req.json() as UsagePayload
    rawEvents = Array.isArray(body?.events) ? body.events.slice(0, 50) : []
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const now = Date.now()
  const events = rawEvents.filter(ev =>
    // Must be a known event type
    typeof ev.type === 'string' && VALID_EVENT_TYPES.has(ev.type) &&
    // ts must be within ±24h of now to prevent bogus Firestore documents
    typeof ev.ts === 'number' && ev.ts > now - 86_400_000 && ev.ts <= now + 60_000,
  )

  if (events.length === 0) {
    return NextResponse.json({ ok: true, processed: 0 })
  }

  // ── Aggregate by date ─────────────────────────────────────────────────────
  const byDate: Record<string, {
    calls:   number
    reads:   number
    writes:  number
    errors:  number
    chains:  Record<string, number>
    functions: Record<string, number>
  }> = {}

  let totalCalls = 0, totalReads = 0, totalWrites = 0, totalErrors = 0
  const totalChains: Record<string, number> = {}

  for (const ev of events) {
    const date = new Date(ev.ts).toISOString().slice(0, 10)

    if (!byDate[date]) {
      byDate[date] = { calls: 0, reads: 0, writes: 0, errors: 0, chains: {}, functions: {} }
    }

    const bucket = byDate[date]
    bucket.calls++
    totalCalls++

    if (ev.type === 'contract.read')  { bucket.reads++;  totalReads++  }
    if (ev.type === 'contract.write') { bucket.writes++; totalWrites++ }
    if (!ev.success)                  { bucket.errors++; totalErrors++ }

    if (ev.chain) {
      bucket.chains[ev.chain] = (bucket.chains[ev.chain] ?? 0) + 1
      totalChains[ev.chain]   = (totalChains[ev.chain]   ?? 0) + 1
    }

    // Cap tracked functions at MAX_FUNCTIONS_TRACKED per day bucket to keep
    // Firestore document size bounded (Firestore max is 1 MiB per document).
    if (ev.functionName && Object.keys(bucket.functions).length < MAX_FUNCTIONS_TRACKED) {
      const safe = ev.functionName.replace(/[.[\]]/g, '_').slice(0, 64)
      bucket.functions[safe] = (bucket.functions[safe] ?? 0) + 1
    }
  }

  // ── Write to Firestore ────────────────────────────────────────────────────
  const userRef     = adminDb.collection('users').doc(uid)
  const totalsRef   = userRef.collection('usageStats').doc('totals')
  const keyUsageRef = userRef.collection('keyUsage').doc(keyId)
  const apiKeyRef   = userRef.collection('apiKeys').doc(keyId)

  const batch = adminDb.batch()

  // Per-day buckets
  for (const [date, bucket] of Object.entries(byDate)) {
    const dayRef = userRef.collection('usageDays').doc(date)

    const dayUpdate: Record<string, FieldValue> = {
      calls:  FieldValue.increment(bucket.calls),
      reads:  FieldValue.increment(bucket.reads),
      writes: FieldValue.increment(bucket.writes),
      errors: FieldValue.increment(bucket.errors),
    }
    for (const [chain, count] of Object.entries(bucket.chains)) {
      dayUpdate[`chains.${chain}`] = FieldValue.increment(count)
    }
    for (const [fn, count] of Object.entries(bucket.functions)) {
      dayUpdate[`functions.${fn}`] = FieldValue.increment(count)
    }

    batch.set(dayRef, dayUpdate, { merge: true })
  }

  // All-time totals
  const totalsUpdate: Record<string, FieldValue> = {
    calls:      FieldValue.increment(totalCalls),
    reads:      FieldValue.increment(totalReads),
    writes:     FieldValue.increment(totalWrites),
    errors:     FieldValue.increment(totalErrors),
    lastCallAt: FieldValue.serverTimestamp(),
  }
  for (const [chain, count] of Object.entries(totalChains)) {
    totalsUpdate[`chains.${chain}`] = FieldValue.increment(count)
  }
  batch.set(totalsRef, totalsUpdate, { merge: true })

  // Per-key usage stats
  batch.set(keyUsageRef, {
    calls:      FieldValue.increment(totalCalls),
    reads:      FieldValue.increment(totalReads),
    writes:     FieldValue.increment(totalWrites),
    errors:     FieldValue.increment(totalErrors),
    lastCallAt: FieldValue.serverTimestamp(),
  }, { merge: true })

  // Update lastUsedAt on the user's apiKey doc so the API Keys page stays fresh
  batch.update(apiKeyRef, { lastUsedAt: FieldValue.serverTimestamp() })

  await batch.commit()

  return NextResponse.json({ ok: true, processed: events.length })
}
