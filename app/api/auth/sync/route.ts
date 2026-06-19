import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb }        from '@/lib/firebase/admin'
import { FieldValue }                from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json() as { idToken: string }

    if (!idToken) {
      return NextResponse.json({ error: 'ID token required' }, { status: 400 })
    }

    // Verify token server-side — Admin SDK is the only way Firestore is touched
    const decoded = await adminAuth.verifyIdToken(idToken)

    const userRef  = adminDb.collection('users').doc(decoded.uid)
    const userSnap = await userRef.get()
    const now      = FieldValue.serverTimestamp()

    if (!userSnap.exists) {
      await userRef.set({
        uid:           decoded.uid,
        email:         decoded.email         ?? null,
        displayName:   decoded.name          ?? null,
        provider:      decoded.firebase?.sign_in_provider ?? 'unknown',
        emailVerified: decoded.email_verified ?? false,
        createdAt:     now,
        lastLoginAt:   now,
      })
    } else {
      const existing = userSnap.data() ?? {}
      await userRef.update({
        lastLoginAt:   now,
        emailVerified: decoded.email_verified ?? false,
        displayName:   decoded.name ?? existing.displayName ?? null,
      })
    }

    return NextResponse.json({ success: true, uid: decoded.uid })
  } catch (err) {
    console.error('[/api/auth/sync]', err)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }
}
