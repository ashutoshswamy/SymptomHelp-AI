import type { Metadata } from "next";
import { RequireAuth } from "@/components/RequireAuth";
import { HistoryView } from "@/components/HistoryView";

export const metadata: Metadata = { title: "Your history", robots: { index: false } };

export default function Page() {
  return (
    <RequireAuth>
      <HistoryView />
    </RequireAuth>
  );
}
