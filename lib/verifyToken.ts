import { TERMS_VERSION } from "./terms-version";
// Verifies a Firebase ID token without the Admin SDK: Google's Identity Toolkit
// rejects invalid, expired, or other-project tokens. Returns the uid or null.
export async function verifyIdToken(idToken: string): Promise<string | null> {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { users?: { localId: string }[] };
    return data.users?.[0]?.localId ?? null;
  } catch {
    return null;
  }
}

// Confirms the user's own profile document records age confirmation and the
// current terms version. Reads Firestore over REST with the user's token, so the
// security rules apply and no Admin SDK is needed.
export async function hasConsent(uid: string, idToken: string): Promise<boolean> {
  const project = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!project) return false;
  try {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)/documents/users/${uid}`,
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    if (!res.ok) return false;
    const doc = (await res.json()) as {
      fields?: { adultConfirmed?: { booleanValue?: boolean }; termsVersion?: { stringValue?: string } };
    };
    return (
      doc.fields?.adultConfirmed?.booleanValue === true &&
      doc.fields?.termsVersion?.stringValue === TERMS_VERSION
    );
  } catch {
    return false;
  }
}
