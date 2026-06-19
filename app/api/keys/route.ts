import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb }        from '@/lib/firebase/admin'
import { FieldValue }                from 'firebase-admin/firestore'
import { randomBytes }               from 'crypto'

function generateKey(): string {
  return 'awz_live_' + randomBytes(20).toString('hex')
}

// ── GET — list all keys for the authenticated user ───────────────────────────
export async function GET(req: NextRequest) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = await adminAuth.verifyIdToken(idToken)

    const snap = await adminDb
      .collection('users').doc(decoded.uid)
      .collection('apiKeys')
      .orderBy('createdAt', 'desc')
      .get()

    const keys = snap.docs.map(d => {
      const data = d.data()
      return {
        id:        d.id,
        name:      data.name,
        prefix:    data.prefix,
        status:    data.status,
        createdAt: data.createdAt?.toDate().toISOString() ?? null,
      }
    })

    return NextResponse.json({ keys })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

// ── POST — generate a new API key ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded = await adminAuth.verifyIdToken(idToken)
    const { name } = await req.json() as { name: string }

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Key name is required' }, { status: 400 })
    }

    const key    = generateKey()
    const prefix = key.slice(0, 16)          // "awz_live_xxxxxxx"
    const keyRef = adminDb
      .collection('users').doc(decoded.uid)
      .collection('apiKeys')
      .doc()

    const now = FieldValue.serverTimestamp()

    await keyRef.set({
      id:        keyRef.id,
      name:      name.trim(),
      key,
      prefix,
      status:    'active',
      createdAt: now,
      lastUsedAt: null,
    })

    // Also write to top-level index for fast lookup by external callers
    await adminDb.collection('apiKeys').doc(keyRef.id).set({
      uid:    decoded.uid,
      key,
      status: 'active',
    })

    return NextResponse.json({ id: keyRef.id, key, name: name.trim(), prefix })
  } catch (err) {
    console.error('[POST /api/keys]', err)
    return NextResponse.json({ error: 'Failed to generate key' }, { status: 500 })
  }
}

// ── DELETE — revoke a key ────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded    = await adminAuth.verifyIdToken(idToken)
    const { keyId }  = await req.json() as { keyId: string }

    if (!keyId) return NextResponse.json({ error: 'keyId required' }, { status: 400 })

    const userKeyRef = adminDb
      .collection('users').doc(decoded.uid)
      .collection('apiKeys').doc(keyId)

    const snap = await userKeyRef.get()
    if (!snap.exists) return NextResponse.json({ error: 'Key not found' }, { status: 404 })

    const now = FieldValue.serverTimestamp()
    await userKeyRef.update({ status: 'revoked', revokedAt: now })
    await adminDb.collection('apiKeys').doc(keyId).update({ status: 'revoked' })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/keys]', err)
    return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 })
  }
}
