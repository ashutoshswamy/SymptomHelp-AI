import type { Metadata } from "next";
import { RequireAuth } from "@/components/RequireAuth";
import { AccountView } from "@/components/AccountView";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function Page() {
  return (
    <RequireAuth>
      <AccountView />
    </RequireAuth>
  );
}
