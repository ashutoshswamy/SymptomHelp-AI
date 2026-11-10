import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDb } from "./firebase";
import type { AnalysisResponse, HistoryItem, Profile } from "./types";

// Layout: users/{uid} (profile), users/{uid}/analyses/{id} (history).
// Firestore rejects `undefined`, so optional fields are only written when set.

export async function loadProfile(uid: string): Promise<Profile> {
  const snap = await getDoc(doc(getDb(), "users", uid));
  return snap.exists() ? (snap.data() as Profile) : {};
}

export async function saveProfile(uid: string, profile: Profile) {
  const data: Profile = {};
  if (profile.age !== undefined) data.age = profile.age;
  if (profile.gender) data.gender = profile.gender;
  await setDoc(doc(getDb(), "users", uid), data, { merge: true });
}

export async function saveAnalysis(
  uid: string,
  input: { symptoms: string; age?: number; gender?: string },
  result: AnalysisResponse
) {
  const data: Record<string, unknown> = {
    symptoms: input.symptoms,
    result,
    createdAt: serverTimestamp(),
  };
  if (input.age !== undefined) data.age = input.age;
  if (input.gender) data.gender = input.gender;
  await addDoc(collection(getDb(), "users", uid, "analyses"), data);
}

export async function listAnalyses(uid: string): Promise<HistoryItem[]> {
  const snap = await getDocs(
    query(collection(getDb(), "users", uid, "analyses"), orderBy("createdAt", "desc"), limit(20))
  );
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      symptoms: data.symptoms,
      result: data.result,
      createdAt: data.createdAt?.toDate?.().toISOString() ?? data.result?.analyzedAt,
    } as HistoryItem;
  });
}

export async function deleteAnalysis(uid: string, id: string) {
  await deleteDoc(doc(getDb(), "users", uid, "analyses", id));
}

export async function deleteAllHistory(uid: string) {
  const snap = await getDocs(collection(getDb(), "users", uid, "analyses"));
  await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
}

// Removes every document we hold for this user (history, then profile and consent record).
export async function deleteAllUserData(uid: string) {
  await deleteAllHistory(uid);
  await deleteDoc(doc(getDb(), "users", uid));
}
