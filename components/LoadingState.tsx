"use client";

import { useState, useEffect } from "react";

const steps = [
  { label: "Parsing symptoms", icon: "parse" },
  { label: "Matching conditions", icon: "match" },
  { label: "Evaluating severity", icon: "severity" },
  { label: "Generating recommendations", icon: "recommend" },
];

function StepIcon({ icon, active }: { icon: string; active: boolean }) {
  const cls = `transition-colors duration-300 ${active ? "text-primary" : "text-muted/40"}`;
  switch (icon) {
    case "parse":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cls}
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case "match":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cls}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "severity":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cls}
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "recommend":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cls}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    default:
      return null;
  }
}

export function LoadingState({ symptoms }: { symptoms: string }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-2xl animate-fade-in pt-8 sm:pt-10">
      {/* Symptom summary */}
      <div className="rounded-md border border-border bg-surface p-4 sm:p-6 shadow-[var(--card-shadow)] mb-6 sm:mb-8">
        <p className="font-mono-chart text-xs font-semibold tracking-wider uppercase text-muted mb-2">
          Analyzing
        </p>
        <p className="text-sm text-foreground/80 line-clamp-2 italic">
          &ldquo;{symptoms}&rdquo;
        </p>
      </div>

      {/* Animated spinner */}
      <div className="flex flex-col items-center mb-8 sm:mb-10">
        <div className="relative h-16 w-16 mb-5">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin-slow" />
          {/* Inner pulse */}
          <div className="absolute inset-2 rounded-full border border-primary/20 animate-pulse-gentle" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
        </div>

        <p className="text-lg font-semibold text-foreground mb-1">
          Reading the chart
        </p>
        <p className="text-xs text-muted text-center max-w-sm">
          Cross-referencing symptoms against clinical knowledge powered by
          Google Gemini
        </p>
      </div>

      {/* Step indicators */}
      <div className="rounded-md border border-border bg-surface p-5 sm:p-6 shadow-[var(--card-shadow)] mb-6">
        <div className="space-y-0">
          {steps.map((step, i) => {
            const completed = i < activeStep;
            const active = i === activeStep;

            return (
              <div key={step.label} className="flex items-center gap-3">
                {/* Vertical connector line */}
                {i > 0 && (
                  <div
                    className="ml-[11px] -my-0.5 w-0.5 h-4 flex-shrink-0"
                    style={{ visibility: "hidden" }}
                  />
                )}
                <div className="flex items-center gap-3 py-2.5 w-full">
                  {/* Status circle */}
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                      completed
                        ? "bg-primary text-white scale-100"
                        : active
                          ? "border-2 border-primary bg-primary/10 scale-110"
                          : "border border-border bg-surface"
                    }`}
                  >
                    {completed ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : active ? (
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-gentle" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    )}
                  </div>

                  {/* Label + icon */}
                  <div className="flex items-center gap-2 flex-1">
                    <StepIcon icon={step.icon} active={completed || active} />
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        completed
                          ? "text-primary"
                          : active
                            ? "text-foreground"
                            : "text-muted/50"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {/* Status text */}
                  <span
                    className={`font-mono-chart text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 ${
                      completed
                        ? "text-primary"
                        : active
                          ? "text-foreground/60 animate-pulse-gentle"
                          : "text-transparent"
                    }`}
                  >
                    {completed ? "Done" : active ? "Processing" : ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 rounded-full bg-border/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Security badge */}
      <div className="flex justify-center">
        <div className="trust-badge">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your data is processed securely and never stored
        </div>
      </div>
    </div>
  );
}
