import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb }        from '@/lib/firebase/admin'

interface DayStat {
  date:   string
  calls:  number
  reads:  number
  writes: number
  errors: number
}

interface KeyStat {
  keyId:     string
  keyName:   string
  calls:     number
  reads:     number
  writes:    number
  errors:    number
  lastCallAt: string | null
}

// ── GET /api/usage/stats ──────────────────────────────────────────────────────
// Returns aggregated SDK usage stats for the authenticated dashboard user.
export async function GET(req: NextRequest) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = await adminAuth.verifyIdToken(idToken)
    const uid     = decoded.uid
    const userRef = adminDb.collection('users').doc(uid)

    // ── Fetch in parallel ───────────────────────────────────────────────────
    const last7Dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toISOString().slice(0, 10)
    }).reverse()

    const [totalsSnap, daysSnaps, keyUsageSnap, apiKeysSnap] = await Promise.all([
      userRef.collection('usageStats').doc('totals').get(),
      Promise.all(last7Dates.map(d => userRef.collection('usageDays').doc(d).get())),
      userRef.collection('keyUsage').orderBy('calls', 'desc').limit(10).get(),
      userRef.collection('apiKeys').where('status', '==', 'active').get(),
    ])

    // ── Totals ──────────────────────────────────────────────────────────────
    const totalsData = totalsSnap.data() ?? {}
    const totals = {
      calls:     (totalsData.calls  ?? 0) as number,
      reads:     (totalsData.reads  ?? 0) as number,
      writes:    (totalsData.writes ?? 0) as number,
      errors:    (totalsData.errors ?? 0) as number,
      chains:    (totalsData.chains ?? {}) as Record<string, number>,
      lastCallAt: totalsData.lastCallAt
        ? (totalsData.lastCallAt.toDate().toISOString() as string)
        : null,
    }

    // ── Per-day timeline ────────────────────────────────────────────────────
    const days: DayStat[] = daysSnaps.map((snap, i) => {
      const d = snap.data() ?? {}
      return {
        date:   last7Dates[i],
        calls:  (d.calls  ?? 0) as number,
        reads:  (d.reads  ?? 0) as number,
        writes: (d.writes ?? 0) as number,
        errors: (d.errors ?? 0) as number,
      }
    })

    // ── Per-key stats ───────────────────────────────────────────────────────
    const keyNameMap: Record<string, string> = {}
    for (const doc of apiKeysSnap.docs) {
      keyNameMap[doc.id] = (doc.data().name as string) ?? doc.id
    }

    const keys: KeyStat[] = keyUsageSnap.docs.map(doc => {
      const d = doc.data()
      return {
        keyId:      doc.id,
        keyName:    keyNameMap[doc.id] ?? doc.id,
        calls:      (d.calls  ?? 0) as number,
        reads:      (d.reads  ?? 0) as number,
        writes:     (d.writes ?? 0) as number,
        errors:     (d.errors ?? 0) as number,
        lastCallAt: d.lastCallAt ? d.lastCallAt.toDate().toISOString() : null,
      }
    })

    return NextResponse.json({ totals, days, keys })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
