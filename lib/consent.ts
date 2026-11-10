import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDb } from "./firebase";

import { TERMS_VERSION } from "./terms-version";
export { TERMS_VERSION };
export const MIN_AGE = 18;

export async function readConsent(uid: string): Promise<boolean> {
  const snap = await getDoc(doc(getDb(), "users", uid));
  const data = snap.data();
  return Boolean(data?.adultConfirmed && data?.termsVersion === TERMS_VERSION);
}

// Records that the user confirmed they are 18+ and accepted the Terms and Privacy Policy.
export async function saveConsent(uid: string) {
  await setDoc(
    doc(getDb(), "users", uid),
    { adultConfirmed: true, termsVersion: TERMS_VERSION, termsAcceptedAt: serverTimestamp() },
    { merge: true }
  );
}
