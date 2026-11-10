import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and browser storage SymptomHelp AI uses, and how to change your choices.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" updated="10 November 2026">
      <p>
        This page explains the cookies and similar browser storage SymptomHelp AI uses. We use only
        what is needed to run the Service. We do not use advertising or analytics cookies.
      </p>

      <h2>What we use</h2>
      <h3>Essential</h3>
      <ul>
        <li>
          <strong>Sign-in session.</strong> Firebase Authentication stores a token in your
          browser&rsquo;s local storage or IndexedDB so you stay signed in. Without it you cannot use
          the Service.
        </li>
        <li>
          <strong>Your cookie choice.</strong> We save whether you chose &ldquo;Accept all&rdquo; or
          &ldquo;Essential only&rdquo; in local storage so we do not ask on every visit.
        </li>
      </ul>

      <h3>Third-party</h3>
      <ul>
        <li>
          If you choose &ldquo;Continue with Google&rdquo;, Google may set its own cookies on its
          domains during sign-in. These are governed by Google&rsquo;s policies.
        </li>
        <li>Fonts are served from this site, so no font provider sets cookies.</li>
      </ul>

      <h3>Optional</h3>
      <p>
        We do not currently use any optional cookies. If we add analytics later, they will be off
        unless you chose &ldquo;Accept all&rdquo;, and we will update this page first.
      </p>

      <h2>Your choices</h2>
      <p>
        You can change your choice at any time:
      </p>
      <p>
        <CookieSettingsButton />
      </p>
      <p>
        You can also clear site data in your browser settings. This signs you out and clears your
        saved choice. Blocking essential storage will stop sign-in from working.
      </p>

      <h2>More</h2>
      <p>
        See the <Link href="/privacy">Privacy Policy</Link> for how we handle personal data.
      </p>
    </LegalPage>
  );
}
