"use client";

import type { AnalysisResponse } from "@/lib/types";
import { ConditionCard } from "./ConditionCard";

export function ResultsDisplay({
  results,
  symptoms,
  onReset,
}: {
  results: AnalysisResponse;
  symptoms: string;
  onReset: () => void;
}) {
  const symptomTags = symptoms
    .split(/[,.]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
    .slice(0, 5);

  const totalConditions = results.conditions.length;
  const highSeverity = results.conditions.filter(
    (c) => c.severity === "high" || c.severity === "critical"
  ).length;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      {/* Success header */}
      <div className="text-center pt-4 pb-2 mb-6">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in-up">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Analysis Complete
        </h2>
        <p className="text-xs font-medium tracking-wider uppercase text-muted">
          {new Date(results.analyzedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &bull;{" "}
          {new Date(results.analyzedAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <div className="rounded-xl border border-border bg-surface p-3 text-center shadow-[var(--card-shadow)] animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <p className="text-xl font-bold text-foreground tabular-nums">{totalConditions}</p>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-muted">Conditions</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3 text-center shadow-[var(--card-shadow)] animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <p className="text-xl font-bold text-foreground tabular-nums">
            {results.conditions[0]?.confidence ?? 0}%
          </p>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-muted">Top Match</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3 text-center shadow-[var(--card-shadow)] animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <p className={`text-xl font-bold tabular-nums ${highSeverity > 0 ? "text-red-500" : "text-primary"}`}>
            {highSeverity}
          </p>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-muted">High Risk</p>
        </div>
      </div>

      {/* Symptom summary card */}
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-[var(--card-shadow)] mb-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-3">
          <p className="text-xs font-semibold tracking-wider uppercase text-primary">
            Your Symptoms
          </p>
          <p className="text-xs text-muted font-medium tabular-nums">
            ID: #SH-{Math.floor(Math.random() * 9000 + 1000)}
          </p>
        </div>
        {symptomTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {symptomTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-sm text-foreground/70 italic leading-relaxed">
          &ldquo;{symptoms}&rdquo;
        </p>
      </div>

      {/* Condition Cards */}
      <div className="space-y-4 mb-8">
        {results.conditions.map((condition, i) => (
          <ConditionCard
            key={condition.condition}
            condition={condition}
            index={i}
          />
        ))}
      </div>

      {/* General Wellness Advice */}
      <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-5 mb-6 dark:border-teal-800/40 dark:bg-teal-950/20 animate-fade-in-up" style={{ animationDelay: `${totalConditions * 150 + 200}ms` }}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-teal-800 dark:text-teal-200 mb-1.5">
              General Wellness Advice
            </h3>
            <p className="text-sm text-teal-700 dark:text-teal-300 leading-relaxed">
              {results.generalAdvice}
            </p>
          </div>
        </div>
      </div>

      {results.disclaimer && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-3 mb-8 dark:border-amber-800/30 dark:bg-amber-950/20 animate-fade-in-up" style={{ animationDelay: `${totalConditions * 150 + 350}ms` }}>
          <div className="flex items-start gap-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 mt-0.5 shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              {results.disclaimer}
            </p>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center pb-4">
        <button
          onClick={onReset}
          className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:brightness-110 cursor-pointer flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Start New Analysis
        </button>
      </div>
    </div>
  );
}
