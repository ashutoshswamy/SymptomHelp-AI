"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { signOut } from "firebase/auth";
import { sileo } from "sileo";
import { getFirebaseAuth } from "@/lib/firebase";
import { saveConsent } from "@/lib/consent";
import { useAuth } from "./AuthProvider";
import { ConsentFields, consentValid, noConsents, type Consents } from "./ConsentFields";
import { nextPath } from "./AuthForm";

// Shown once after sign-in, before any use, until age and terms are confirmed.
export function OnboardingForm() {
  const router = useRouter();
  const { user, loading, consent, refreshConsent } = useAuth();
  const [consents, setConsents] = useState<Consents>(noConsents);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (busy || loading) return;
    if (!user) router.replace("/signin");
    else if (consent === "ok") router.replace(nextPath());
  }, [busy, loading, user, consent, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user || !consentValid(consents)) return;
    setBusy(true);
    try {
      await saveConsent(user.uid);
      await refreshConsent();
    } catch {
      sileo.error({
        title: "Couldn't save that",
        description: "Check your connection and try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user) {
    return <div className="strip h-80" role="status" aria-label="Loading" />;
  }

  return (
    <form onSubmit={onSubmit} className="strip press-in p-6 sm:p-8">
      <h1 className="text-5xl text-ink">One last step</h1>
      <p className="mt-3 text-ink-soft">
        Before you use SymptomHelp AI, confirm your age and accept our terms and policy.
      </p>

      <div className="mt-6">
        <ConsentFields value={consents} onChange={setConsents} disabled={busy} />
      </div>


      <div className="perforation mt-6 pt-5">
        <button type="submit" disabled={busy || !consentValid(consents)} className="tab w-full">
          Continue
        </button>
      </div>
      <button
        type="button"
        onClick={() => signOut(getFirebaseAuth())}
        className="mt-3 inline-flex min-h-11 cursor-pointer items-center font-semibold underline underline-offset-4"
      >
        Sign out instead
      </button>
    </form>
  );
}
