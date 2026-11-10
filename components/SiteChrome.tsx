import type { ReactNode } from "react";
import { DisclaimerBanner } from "./DisclaimerBanner";
import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1 px-4 pb-16 sm:px-8">{children}</main>
      <Footer />
    </div>
  );
}
