import { getApps, initializeApp, cert, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore }           from 'firebase-admin/firestore'
import { getAuth, type Auth }                     from 'firebase-admin/auth'

// Lazy singletons — initialized on first real use, not at module import time.
// Next.js imports every route module during `next build` to collect page
// data; if credential() ran eagerly here, a missing env var would fail the
// entire build instead of just the requests that actually need Firebase.
let _app: App | null = null
let _db: Firestore | null = null
let _auth: Auth | null = null

function getAdminApp(): App {
  if (_app) return _app
  if (getApps().length > 0) {
    _app = getApps()[0]
    return _app
  }
  _app = initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // .env stores literal \n — convert to real newlines
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
  return _app
}

function getDb(): Firestore {
  if (!_db) _db = getFirestore(getAdminApp())
  return _db
}

function getAdminAuthInstance(): Auth {
  if (!_auth) _auth = getAuth(getAdminApp())
  return _auth
}

// Proxies preserve the existing `adminDb.foo()` / `adminAuth.foo()` call
// sites — the real Firestore/Auth instance (and the credential check behind
// it) is only constructed the first time a property is actually accessed.
export const adminDb = new Proxy({} as Firestore, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver)
  },
})

export const adminAuth = new Proxy({} as Auth, {
  get(_target, prop, receiver) {
    return Reflect.get(getAdminAuthInstance(), prop, receiver)
  },
})
