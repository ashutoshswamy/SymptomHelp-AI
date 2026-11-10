"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { HistoryList } from "./HistoryList";
import { ResultsDisplay } from "./ResultsDisplay";
import type { HistoryItem } from "@/lib/types";

export function HistoryView() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  if (!user) return null;

  if (selected) {
    return (
      <ResultsDisplay
        results={selected.result}
        symptoms={selected.symptoms}
        onReset={() => setSelected(null)}
        resetLabel="Back to history"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <HistoryList uid={user.uid} refreshKey={0} onOpen={setSelected} />
      <Link href="/check" className="tab mt-8">
        Check new symptoms
      </Link>
    </div>
  );
}
