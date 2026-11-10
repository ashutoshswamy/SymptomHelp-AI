"use client";

import { useEffect, useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { sileo } from "sileo";
import { deleteAnalysis, listAnalyses } from "@/lib/store";
import type { HistoryItem } from "@/lib/types";

export function HistoryList({
  uid,
  refreshKey,
  onOpen,
}: {
  uid: string;
  refreshKey: number;
  onOpen: (item: HistoryItem) => void;
}) {
  const [items, setItems] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    let live = true;
    listAnalyses(uid)
      .then((list) => live && setItems(list))
      .catch(
        () =>
          live &&
          sileo.error({
            title: "Couldn't load your history",
            description: "Check your connection and refresh.",
          })
      );
    return () => {
      live = false;
    };
  }, [uid, refreshKey]);

  async function remove(id: string) {
    setItems((cur) => cur?.filter((i) => i.id !== id) ?? null);
    try {
      await deleteAnalysis(uid, id);
      sileo.success({ title: "Entry deleted" });
    } catch {
      sileo.error({ title: "Couldn't delete that entry", description: "Refresh and try again." });
    }
  }

  return (
    <section className="mt-8 sm:mt-14" aria-labelledby="history-title">
      <h2 id="history-title" className="text-4xl text-ink sm:text-5xl">
        Your history
      </h2>
      {items && items.length === 0 && (
        <p className="mt-4 max-w-[52ch] text-ink-soft">
          Nothing saved yet. Each analysis you run appears here, only for you.
        </p>
      )}
      {items && items.length > 0 && (
        <ul className="strip mt-6 grid gap-3 p-3 sm:p-4">
          {items.map((item) => {
            const top = item.result.conditions[0];
            return (
              <li key={item.id} className="cell flex items-center gap-2 pr-2">
                <button
                  type="button"
                  onClick={() => onOpen(item)}
                  className="min-w-0 flex-1 cursor-pointer px-5 py-4 text-left"
                >
                  <p className="truncate font-bold">{item.symptoms}</p>
                  <p className="mt-1 text-sm text-[#4d3b58]">
                    {top ? `${top.condition}, ${top.confidence}%` : "No result"}
                    {item.createdAt
                      ? ` · ${new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
                      : ""}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label="Delete this entry"
                  className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full hover:bg-[#2a1233] hover:text-[#f7efe2]"
                >
                  <Trash size={20} weight="bold" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
