"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookie-consent";
export type CookieChoice = "all" | "essential";

// Read the saved choice anywhere (e.g. to gate analytics later).
export function getCookieChoice(): CookieChoice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    if (!getCookieChoice()) show();
    window.addEventListener("open-cookie-settings", show);
    return () => window.removeEventListener("open-cookie-settings", show);
  }, []);

  function choose(c: CookieChoice) {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* private mode: the choice just will not persist */
    }
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="strip fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl p-5 sm:left-auto sm:right-6 sm:bottom-6 sm:mx-0 sm:p-6"
    >
      <h2 id="cookie-title" className="text-3xl">
        Cookies
      </h2>
      <p id="cookie-desc" className="mt-2 text-ink-soft">
        We use essential cookies and local storage to keep you signed in and to remember this
        choice. We do not run ads or sell your data. Read the{" "}
        <Link href="/cookies" className="font-bold text-ink underline underline-offset-4">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => choose("all")} className="tab !text-xl">
          Accept all
        </button>
        <button type="button" onClick={() => choose("essential")} className="tab tab-outline !text-xl">
          Essential only
        </button>
      </div>
    </div>
  );
}
