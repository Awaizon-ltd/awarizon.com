import { NextRequest, NextResponse } from 'next/server'
import { adminDb }                   from '@/lib/firebase/admin'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, x-api-key, Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

// ── GET /api/v1/auth ──────────────────────────────────────────────────────────
// Validates an SDK API key and returns the owner uid + keyId.
// Used by the SDK's TelemetryClient on first initialisation.
// Accepts: Authorization: Bearer <key>
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  const apiKey =
    (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null) ??
    req.headers.get('x-api-key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Pass via Authorization: Bearer <key>.' },
      { status: 401, headers: CORS_HEADERS },
    )
  }

  const snap = await adminDb
    .collection('apiKeys')
    .where('key', '==', apiKey)
    .where('status', '==', 'active')
    .limit(1)
    .get()

  if (snap.empty) {
    return NextResponse.json(
      { error: 'Invalid or revoked API key.' },
      { status: 401, headers: CORS_HEADERS },
    )
  }

  const doc   = snap.docs[0]
  const { uid } = doc.data() as { uid: string }

  return NextResponse.json({ ok: true, uid, keyId: doc.id }, { headers: CORS_HEADERS })
}
