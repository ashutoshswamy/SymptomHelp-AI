import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

// Focused layout for sign-in flows: no site nav, just the logo and the task.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="w-full bg-ink px-4 py-2 text-center text-ground">
        <p className="text-sm leading-snug">
          <strong className="font-bold">Not medical advice.</strong> For information only.
        </p>
      </div>
      <header className="mx-auto flex h-[72px] w-full max-w-6xl items-center px-4 sm:px-8">
        <Link href="/" aria-label="SymptomHelp AI home">
          <Logo />
        </Link>
      </header>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-16 pt-6 sm:pt-12">{children}</main>
      <p className="px-4 pb-8 text-center text-sm text-ink-soft">
        <Link href="/terms" className="underline underline-offset-4">Terms</Link>
        {" · "}
        <Link href="/privacy" className="underline underline-offset-4">Privacy</Link>
        {" · "}
        <Link href="/cookies" className="underline underline-offset-4">Cookies</Link>
      </p>
    </div>
  );
}
