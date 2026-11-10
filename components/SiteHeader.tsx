"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { List, SignOut, X } from "@phosphor-icons/react";
import { useState } from "react";
import { sileo } from "sileo";
import { getFirebaseAuth } from "@/lib/firebase";
import { Logo } from "./Logo";
import { useAuth } from "./AuthProvider";

const publicLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];
const memberLinks = [
  { href: "/check", label: "Checker" },
  { href: "/history", label: "History" },
  { href: "/account", label: "Account" },
];

export function SiteHeader() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = user ? memberLinks : publicLinks;

  const linkClass = (href: string) =>
    `inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-base font-bold transition-colors hover:bg-ink hover:text-ground ${
      pathname === href ? "bg-ink/10" : ""
    }`;

  const out = (
    <button
      type="button"
      onClick={() => signOut(getFirebaseAuth()).then(() => sileo.success({ title: "Signed out" }))}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-base font-bold shadow-[inset_0_0_0_2px_var(--ink)] transition-colors hover:bg-ink hover:text-ground"
    >
      <SignOut size={18} weight="bold" aria-hidden="true" />
      Sign out
    </button>
  );

  return (
    <header className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex h-[72px] items-center gap-4">
          <Link href="/" aria-label="SymptomHelp AI home">
            <Logo />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            <span className="w-2" />
            {loading ? null : user ? (
              out
            ) : (
              <>
                <Link href="/signin" className={linkClass("/signin")}>
                  Sign in
                </Link>
                <Link href="/signup" className="tab !min-h-11 !px-5 !py-2 !text-xl">
                  Get started
                </Link>
              </>
            )}
          </nav>

          <button
            type="button"
            className="ml-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full shadow-[inset_0_0_0_2px_var(--ink)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="strip mb-4 flex flex-col gap-1 p-3 lg:hidden"
            onClick={() => setOpen(false)}
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
            {loading ? null : user ? (
              out
            ) : (
              <>
                <Link href="/signin" className={linkClass("/signin")}>
                  Sign in
                </Link>
                <Link href="/signup" className="tab mt-1 w-full">
                  Get started
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
