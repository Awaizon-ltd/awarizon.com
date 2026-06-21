import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb }        from '@/lib/firebase/admin'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const idToken = req.headers.get('x-id-token')
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const decoded  = await adminAuth.verifyIdToken(idToken)
    const { id }   = await params
    const keySnap  = await adminDb
      .collection('users').doc(decoded.uid)
      .collection('apiKeys').doc(id)
      .get()

    if (!keySnap.exists) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const data = keySnap.data()!
    if (data.status !== 'active') {
      return NextResponse.json({ error: 'Key is revoked' }, { status: 403 })
    }

    return NextResponse.json({ key: data.key as string })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
