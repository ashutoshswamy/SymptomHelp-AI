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
      <div className="text-center pt-6 pb-2 mb-6">
        <p className="font-mono-chart text-[11px] tracking-[0.2em] uppercase text-primary mb-2 animate-fade-in-up">
          Chart Result
        </p>
        <h2 className="text-2xl font-semibold text-foreground mb-1">
          Analysis Complete
        </h2>
        <p className="font-mono-chart text-xs text-muted">
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

      {/* Stats row: lab-report readout */}
      <div className="rounded-md border border-border bg-surface shadow-[var(--card-shadow)] mb-6 animate-fade-in-up divide-y divide-border sm:divide-y-0 sm:divide-x sm:grid sm:grid-cols-3" style={{ animationDelay: "100ms" }}>
        <div className="p-4 text-center">
          <p className="font-mono-chart text-2xl font-semibold text-foreground tabular-nums">{totalConditions}</p>
          <p className="font-mono-chart text-[10px] font-semibold tracking-wider uppercase text-muted">Conditions</p>
        </div>
        <div className="p-4 text-center">
          <p className="font-mono-chart text-2xl font-semibold text-foreground tabular-nums">
            {results.conditions[0]?.confidence ?? 0}%
          </p>
          <p className="font-mono-chart text-[10px] font-semibold tracking-wider uppercase text-muted">Top Match</p>
        </div>
        <div className="p-4 text-center">
          <p className={`font-mono-chart text-2xl font-semibold tabular-nums ${highSeverity > 0 ? "text-[var(--alert)]" : "text-foreground"}`}>
            {highSeverity}
          </p>
          <p className="font-mono-chart text-[10px] font-semibold tracking-wider uppercase text-muted">High Risk</p>
        </div>
      </div>

      {/* Symptom summary card */}
      <div className="rounded-md border border-border bg-surface p-4 sm:p-5 shadow-[var(--card-shadow)] mb-6 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-3">
          <p className="font-mono-chart text-[11px] font-semibold tracking-wider uppercase text-primary">
            Your Symptoms
          </p>
          <p className="font-mono-chart text-[11px] text-muted tabular-nums">
            REF #{new Date(results.analyzedAt).getTime().toString().slice(-6)}
          </p>
        </div>
        {symptomTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {symptomTags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm bg-[var(--pulse-soft)] border border-primary/20 px-3 py-1 text-xs font-medium text-[var(--pulse-ink)]"
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
      <div
        className="rounded-md border border-dashed p-5 mb-6 animate-fade-in-up"
        style={{
          animationDelay: `${totalConditions * 150 + 200}ms`,
          borderColor: "var(--pulse)",
          backgroundColor: "var(--pulse-soft)",
        }}
      >
        <p className="font-mono-chart text-[10px] font-semibold tracking-wider uppercase text-[var(--pulse-ink)] mb-1.5">
          Chart Note — General Wellness
        </p>
        <p className="text-sm text-[var(--pulse-ink)] leading-relaxed">
          {results.generalAdvice}
        </p>
      </div>

      {results.disclaimer && (
        <div
          className="rounded-md border border-dashed px-4 py-3 mb-8 animate-fade-in-up"
          style={{
            animationDelay: `${totalConditions * 150 + 350}ms`,
            borderColor: "var(--amber)",
            backgroundColor: "var(--amber-soft)",
          }}
        >
          <p className="font-mono-chart text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: "var(--amber)" }}>
            Chart Note — Caution
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "var(--amber)" }}>
            {results.disclaimer}
          </p>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center pb-4">
        <button
          onClick={onReset}
          className="rounded-sm border border-border bg-surface hover:bg-surface-hover px-8 py-3 font-mono-chart text-xs font-semibold tracking-wide uppercase text-foreground transition-colors cursor-pointer flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          New Intake
        </button>
      </div>
    </div>
  );
}
