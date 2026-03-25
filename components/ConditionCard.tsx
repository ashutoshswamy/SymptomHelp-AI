"use client";

import { useState } from "react";
import type { ConditionAnalysis } from "@/lib/types";
import { ConfidenceBar } from "./ConfidenceBar";
import { SeverityBadge } from "./SeverityBadge";
import { UrgencyIndicator } from "./UrgencyIndicator";

const borderColors = {
  low: "#0d9488",
  moderate: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
} as const;

export function ConditionCard({
  condition,
  index,
}: {
  condition: ConditionAnalysis;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="animate-slide-up rounded-2xl border border-border bg-surface shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-all condition-border-left overflow-hidden"
      style={{
        animationDelay: `${index * 150}ms`,
        "--border-color": borderColors[condition.severity],
      } as React.CSSProperties}
    >
      {/* Header - always visible, clickable */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 sm:p-5 md:p-6 text-left cursor-pointer"
      >
        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <SeverityBadge severity={condition.severity} urgency={condition.urgency} />
              <UrgencyIndicator urgency={condition.urgency} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground mt-1.5 break-words">
              {condition.condition}
            </h3>
          </div>
          <div className="text-right shrink-0 flex items-start gap-2 sm:gap-3">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">
                {condition.confidence}%
              </span>
              <p className="text-[10px] font-medium tracking-wider uppercase text-muted">
                Match
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`text-muted mt-2 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Confidence bar */}
        <div>
          <ConfidenceBar
            percentage={condition.confidence}
            severity={condition.severity}
          />
        </div>
      </button>

      {/* Expandable details */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0 space-y-4">
            {/* Description */}
            {condition.description && (
              <div className="rounded-xl bg-background/60 border border-border/50 p-3.5">
                <p className="text-sm text-foreground/75 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            )}

            {/* Two-column layout: indicators + next steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {condition.matchingSymptoms.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold tracking-wider uppercase text-muted mb-2">
                    Key Indicators
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {condition.matchingSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary dark:bg-primary/15"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] font-semibold tracking-wider uppercase text-muted mb-2">
                  Recommended Actions
                </p>
                <ul className="space-y-1.5">
                  {condition.recommendedActions.map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-2 text-sm text-foreground/75"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0"
                        style={{ color: borderColors[condition.severity] }}
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
