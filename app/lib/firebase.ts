import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";

export type FirebaseClient = {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  storage: FirebaseStorage | null;
  configured: boolean;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export async function getFirebaseClient(): Promise<FirebaseClient> {
  const configured = Object.values(firebaseConfig).every(Boolean);

  if (!configured || typeof window === "undefined") {
    return { app: null, auth: null, db: null, storage: null, configured: false };
  }

  const [{ getApps, initializeApp }, { getAuth }, { getFirestore }, { getStorage }] =
    await Promise.all([
      import("firebase/app"),
      import("firebase/auth"),
      import("firebase/firestore"),
      import("firebase/storage"),
    ]);

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app),
    configured: true,
  };
}
