import { NextRequest, NextResponse } from 'next/server'
import { adminDb }                   from '@/lib/firebase/admin'
import { FieldValue }                from 'firebase-admin/firestore'

// Accepts: Authorization: Bearer <key>  OR  x-api-key: <key>
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  const apiKey =
    (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null) ??
    req.headers.get('x-api-key') ??
    req.nextUrl.searchParams.get('key')

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key required. Pass via Authorization: Bearer <key> or x-api-key header.' },
      { status: 401 },
    )
  }

  // Look up key in top-level index
  const snap = await adminDb
    .collection('apiKeys')
    .where('key', '==', apiKey)
    .where('status', '==', 'active')
    .limit(1)
    .get()

  if (snap.empty) {
    return NextResponse.json({ error: 'Invalid or revoked API key.' }, { status: 401 })
  }

  const keyDoc = snap.docs[0]
  const { uid } = keyDoc.data() as { uid: string }

  // Update lastUsedAt on the user's key subcollection doc
  const keyId = keyDoc.id
  adminDb
    .collection('users').doc(uid)
    .collection('apiKeys').doc(keyId)
    .update({ lastUsedAt: FieldValue.serverTimestamp() })
    .catch(() => {/* non-critical */})

  return NextResponse.json({
    status:    'ok',
    message:   'Connection successful. Your API key is valid.',
    uid,
    keyId,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth:  '/api/v1/auth',
      test:  '/api/v1/test',
      usage: '/api/v1/usage',
    },
  })
}
