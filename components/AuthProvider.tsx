"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { firebaseConfigured, getFirebaseAuth } from "@/lib/firebase";
import { readConsent } from "@/lib/consent";

type Consent = "loading" | "ok" | "missing";
type AuthState = {
  user: User | null;
  loading: boolean;
  consent: Consent;
  refreshConsent: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  consent: "loading",
  refreshConsent: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [consent, setConsent] = useState<Consent>("loading");

  const check = useCallback(async (u: User) => {
    try {
      setConsent((await readConsent(u.uid)) ? "ok" : "missing");
    } catch {
      setConsent("missing");
    }
  }, []);

  useEffect(() => {
    if (!firebaseConfigured) return;
    return onAuthStateChanged(getFirebaseAuth(), async (u) => {
      setUser(u);
      if (u) {
        setConsent("loading");
        await check(u);
      } else {
        setConsent("loading");
      }
      setLoading(false);
    });
  }, [check]);

  const refreshConsent = useCallback(async () => {
    if (user) await check(user);
  }, [user, check]);

  const value = useMemo(
    () => ({ user, loading, consent, refreshConsent }),
    [user, loading, consent, refreshConsent]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
