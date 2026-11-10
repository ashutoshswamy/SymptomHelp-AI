"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

// Gate for signed-in pages: sends visitors to sign in, or to onboarding if
// they have not yet confirmed age 18+ and accepted the Terms and Privacy Policy.
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading, consent } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const waiting = loading || (user && consent === "loading");

  useEffect(() => {
    if (waiting) return;
    if (!user) router.replace(`/signin?next=${encodeURIComponent(pathname)}`);
    else if (consent === "missing") router.replace(`/onboarding?next=${encodeURIComponent(pathname)}`);
  }, [waiting, user, consent, router, pathname]);

  if (waiting || !user || consent !== "ok") {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-16" role="status" aria-label="Loading">
        <div className="strip h-64" />
      </div>
    );
  }
  return <>{children}</>;
}
