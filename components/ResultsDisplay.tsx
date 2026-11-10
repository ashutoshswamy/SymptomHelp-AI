"use client";

import { ArrowCounterClockwise, Warning } from "@phosphor-icons/react";
import type { AnalysisResponse } from "@/lib/types";
import { ConditionCard } from "./ConditionCard";

export function ResultsDisplay({
  results,
  symptoms,
  onReset,
  resetLabel = "Check new symptoms",
}: {
  results: AnalysisResponse;
  symptoms: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  const symptomTags = symptoms
    .split(/[,.]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
    .slice(0, 5);

  const total = results.conditions.length;
  const urgent = results.conditions.filter(
    (c) => c.severity === "high" || c.severity === "critical"
  ).length;
  const analyzed = new Date(results.analyzedAt);

  return (
    <div className="mx-auto max-w-3xl pt-8 sm:pt-14">
      <header className="rise-in">
        <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-[0.95] text-ink">
          Here is your read.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          {total} possible {total === 1 ? "cause" : "causes"}, most likely first.{" "}
          {urgent > 0
            ? `${urgent} ${urgent === 1 ? "needs" : "need"} prompt attention.`
            : "None flagged as urgent."}{" "}
          <span className="tabular">
            {analyzed.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            , {analyzed.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </p>
      </header>

      <section
        className="rise-in perforation mt-8 pt-5"
        style={{ "--delay": "120ms" } as React.CSSProperties}
        aria-label="Your symptoms"
      >
        {symptomTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {symptomTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-ink px-3 py-1 text-sm font-semibold text-ground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="italic text-ink-soft">&ldquo;{symptoms}&rdquo;</p>
      </section>

      <ol className="mt-8 space-y-4" aria-label="Possible conditions">
        {results.conditions.map((condition, i) => (
          <ConditionCard key={condition.condition} condition={condition} index={i} />
        ))}
      </ol>

      <section
        className="rise-in mt-8 rounded-[28px] bg-tab p-6 text-tab-ink sm:p-9"
        style={{ "--delay": `${total * 140 + 200}ms` } as React.CSSProperties}
      >
        <h2 className="text-4xl">Looking after yourself</h2>
        <p className="mt-3 max-w-[60ch] text-lg">{results.generalAdvice}</p>
      </section>

      {results.disclaimer && (
        <section
          className="rise-in mt-6 flex items-start gap-3 rounded-[28px] border-[3px] border-dotted border-ink/40 p-5"
          style={{ "--delay": `${total * 140 + 320}ms` } as React.CSSProperties}
        >
          <Warning size={24} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0" />
          <div>
            <h2 className="text-2xl">A word of caution</h2>
            <p className="mt-1 text-ink-soft">{results.disclaimer}</p>
          </div>
        </section>
      )}

      <div className="mt-10 flex justify-start pb-4">
        <button type="button" onClick={onReset} className="tab tab-outline">
          <ArrowCounterClockwise size={22} weight="bold" aria-hidden="true" />
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
