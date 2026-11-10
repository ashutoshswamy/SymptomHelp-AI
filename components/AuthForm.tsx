"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { sileo } from "sileo";
import { firebaseConfigured, getFirebaseAuth } from "@/lib/firebase";
import { saveConsent } from "@/lib/consent";
import { useAuth } from "./AuthProvider";
import { ConsentFields, consentValid, noConsents, type Consents } from "./ConsentFields";
import { GoogleG } from "./GoogleG";

export type AuthMode = "signin" | "signup" | "reset";

export function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "That email and password do not match.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Sign in instead.";
    case "auth/weak-password":
      return "Use a password with at least 6 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a minute and try again.";
    case "auth/requires-recent-login":
      return "For security, sign in again and retry.";
    default:
      return "Something went wrong. Please try again.";
  }
}

// Only same-site paths: never redirect to an attacker-supplied URL.
export function nextPath(): string {
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") ? n : "/check";
}

const copy = {
  signin: { title: "Welcome back", cta: "Sign in", failed: "Couldn't sign you in" },
  signup: { title: "Create your account", cta: "Create account", failed: "Couldn't create your account" },
  reset: { title: "Reset your password", cta: "Send reset link", failed: "Couldn't send the link" },
} as const;

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { user, consent, refreshConsent } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consents, setConsents] = useState<Consents>(noConsents);
  const [busy, setBusy] = useState(false);

  // Already signed in: continue, or finish consent first.
  useEffect(() => {
    if (busy || !user || consent === "loading") return;
    router.replace(
      consent === "ok"
        ? nextPath()
        : `/onboarding?next=${encodeURIComponent(nextPath())}`
    );
  }, [busy, user, consent, router]);

  const consentOk = consentValid(consents);

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    try {
      await fn();
    } catch (err) {
      const description = friendlyAuthError(err);
      if (description) sileo.error({ title: copy[mode].failed, description });
    } finally {
      setBusy(false);
    }
  }

  async function finishSignup(uid: string) {
    await saveConsent(uid);
    await refreshConsent();
  }

  const onGoogle = () =>
    run(async () => {
      const cred = await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
      // On the sign-up page the visitor already confirmed age and terms.
      if (mode === "signup") await finishSignup(cred.user.uid);
    });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const auth = getFirebaseAuth();
    return run(async () => {
      if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        sileo.success({
          title: "Check your email",
          description: "If an account exists for that email, a reset link is on its way.",
        });
      } else if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!consentOk) throw Object.assign(new Error("consent"), { code: "consent" });
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await finishSignup(cred.user.uid);
      }
    });
  };

  if (!firebaseConfigured) {
    return (
      <div className="strip p-6" role="alert">
        <h1 className="text-4xl">Sign-in is not set up yet</h1>
        <p className="mt-3 text-ink-soft">
          Add the Firebase keys from <code>.env.example</code> to <code>.env.local</code> and restart
          the server.
        </p>
      </div>
    );
  }

  const showGoogle = mode !== "reset";
  return (
    <div className="strip press-in p-6 sm:p-8">
      <h1 className="text-5xl text-ink">{copy[mode].title}</h1>

      {mode === "signup" && (
        <div className="mt-6">
          <ConsentFields value={consents} onChange={setConsents} disabled={busy} />
        </div>
      )}

      {showGoogle && (
        <>
          <button
            type="button"
            onClick={onGoogle}
            disabled={busy || (mode === "signup" && !consentOk)}
            className="tab tab-outline mt-5 w-full !text-xl"
          >
            <GoogleG />
            Continue with Google
          </button>
          {mode === "signup" && !consentOk && (
            <p className="mt-2 text-sm text-ink-soft">
              Tick all three boxes above to continue.
            </p>
          )}
          <p className="my-5 text-center text-sm font-bold text-ink-soft">or use email</p>
        </>
      )}

      <form onSubmit={onSubmit} className={showGoogle ? "" : "mt-6"}>
        <label htmlFor="email" className="mb-2 block font-bold text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
          disabled={busy}
        />

        {mode !== "reset" && (
          <>
            <label htmlFor="password" className="mt-4 mb-2 block font-bold text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              disabled={busy}
            />
          </>
        )}



        <div className="perforation mt-6 pt-5">
          <button
            type="submit"
            disabled={busy || (mode === "signup" && !consentOk)}
            className="tab w-full"
          >
            {copy[mode].cta}
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-col gap-1 text-base font-semibold">
        {mode === "signin" && (
          <>
            <Link href="/forgot-password" className="inline-flex min-h-11 items-center underline underline-offset-4">
              Forgot your password?
            </Link>
            <Link href="/signup" className="inline-flex min-h-11 items-center underline underline-offset-4">
              New here? Create an account
            </Link>
          </>
        )}
        {mode === "signup" && (
          <Link href="/signin" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Have an account? Sign in
          </Link>
        )}
        {mode === "reset" && (
          <Link href="/signin" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Back to sign in
          </Link>
        )}
      </div>
    </div>
  );
}
