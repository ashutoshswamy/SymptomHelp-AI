"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { MIN_AGE } from "@/lib/consent";

export type Consents = { adult: boolean; terms: boolean; privacy: boolean };
export const noConsents: Consents = { adult: false, terms: false, privacy: false };
export const consentValid = (c: Consents) => c.adult && c.terms && c.privacy;

const link = "font-bold underline underline-offset-4";

function Check({
  checked,
  onChange,
  disabled,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#ff6b2c]"
      />
      <span className="text-ink">{children}</span>
    </label>
  );
}

// Three separate confirmations: age, Terms of Service, Privacy Policy.
export function ConsentFields({
  value,
  onChange,
  disabled,
}: {
  value: Consents;
  onChange: (v: Consents) => void;
  disabled?: boolean;
}) {
  const set = (k: keyof Consents) => (v: boolean) => onChange({ ...value, [k]: v });
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="mb-2 font-bold text-ink">Before you continue</legend>
      <Check checked={value.adult} onChange={set("adult")} disabled={disabled}>
        I am {MIN_AGE} years or older.
      </Check>
      <Check checked={value.terms} onChange={set("terms")} disabled={disabled}>
        I accept the{" "}
        <Link href="/terms" target="_blank" className={link}>
          Terms of Service
        </Link>
        .
      </Check>
      <Check checked={value.privacy} onChange={set("privacy")} disabled={disabled}>
        I accept the{" "}
        <Link href="/privacy" target="_blank" className={link}>
          Privacy Policy
        </Link>
        , and I understand this is not medical advice.
      </Check>
    </fieldset>
  );
}
