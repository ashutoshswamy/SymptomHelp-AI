import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// NEXT_PUBLIC_* must be referenced literally so Next can inline them.
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(
  config.apiKey && config.authDomain && config.projectId && config.appId
);

// Lazy so a missing config never crashes prerender; callers check firebaseConfigured first.
function app() {
  return getApps().length ? getApp() : initializeApp(config);
}
export const getFirebaseAuth = () => getAuth(app());
export const getDb = () => getFirestore(app());
