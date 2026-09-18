import { NextRequest, NextResponse } from 'next/server'
import { adminAuth }                 from '@/lib/firebase/admin'

// Mints a short-lived Firebase custom token so a session started on
// awarizon.com can be handed off to dashboard.awarizon.com — a different
// origin, which can't see awarizon.com's browser storage on its own.
export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json() as { idToken: string }

    if (!idToken) {
      return NextResponse.json({ error: 'ID token required' }, { status: 400 })
    }

    const decoded     = await adminAuth.verifyIdToken(idToken)
    const customToken = await adminAuth.createCustomToken(decoded.uid)

    return NextResponse.json({ token: customToken })
  } catch (err) {
    console.error('[/api/auth/handoff]', err)
    return NextResponse.json({ error: 'Handoff failed' }, { status: 401 })
  }
}
