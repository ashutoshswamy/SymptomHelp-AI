"use client";

import { useState } from "react";
import { CaretDown, CheckCircle } from "@phosphor-icons/react";
import type { ConditionAnalysis } from "@/lib/types";
import { ConfidenceBar } from "./ConfidenceBar";
import { SeverityBadge } from "./SeverityBadge";
import { UrgencyIndicator } from "./UrgencyIndicator";

export function ConditionCard({
  condition,
  index,
}: {
  condition: ConditionAnalysis;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const panelId = `condition-${index}`;

  return (
    <li
      className="strip press-in overflow-hidden"
      style={{ "--delay": `${index * 140}ms` } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="w-full cursor-pointer p-5 text-left sm:p-7"
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-3xl leading-none text-ink-soft tabular sm:text-4xl">
            {index + 1}
          </span>
          <span className="font-display min-w-0 flex-1 basis-40 break-words text-3xl leading-none sm:text-4xl">
            {condition.condition}
          </span>
          <span className="ml-auto flex items-baseline gap-2">
            <span className="font-display text-4xl leading-none tabular sm:text-5xl">
              {condition.confidence}
              <span className="text-2xl sm:text-3xl">%</span>
            </span>
            <CaretDown
              size={20}
              weight="bold"
              aria-hidden="true"
              className={`shrink-0 self-center text-ink-soft transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <SeverityBadge severity={condition.severity} urgency={condition.urgency} />
          <UrgencyIndicator urgency={condition.urgency} />
        </div>

        <div className="mt-5">
          <ConfidenceBar
            percentage={condition.confidence}
            severity={condition.severity}
            delay={300 + index * 140}
          />
        </div>
      </button>

      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 px-5 pb-6 sm:px-7 sm:pb-8">
            {condition.description && (
              <p className="max-w-[62ch] text-ink-soft">{condition.description}</p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              {condition.matchingSymptoms.length > 0 && (
                <div>
                  <h4 className="text-2xl">What matched</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {condition.matchingSymptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="rounded-full bg-ink px-3 py-1 text-sm font-semibold text-ground"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-2xl">What to do</h4>
                <ul className="mt-3 space-y-2">
                  {condition.recommendedActions.map((action) => (
                    <li key={action} className="flex items-start gap-2.5">
                      <CheckCircle
                        size={20}
                        weight="fill"
                        aria-hidden="true"
                        className="mt-1 shrink-0"
                      />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
