import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore }                 from 'firebase-admin/firestore'
import { getAuth }                      from 'firebase-admin/auth'

function initAdmin() {
  if (getApps().length > 0) return getApps()[0]

  return initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // .env stores literal \n — convert to real newlines
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

const adminApp = initAdmin()

export const adminDb   = getFirestore(adminApp)
export const adminAuth = getAuth(adminApp)
