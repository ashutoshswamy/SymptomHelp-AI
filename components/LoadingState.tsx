"use client";

import { useState, useEffect } from "react";

const steps = [
  "Parsing symptoms",
  "Matching conditions",
  "Evaluating severity",
  "Generating recommendations",
];

export function LoadingState({ symptoms }: { symptoms: string }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rise-in mx-auto max-w-2xl pt-10 sm:pt-16" role="status" aria-live="polite">
      <h1 className="text-5xl text-ink sm:text-6xl">Reading your symptoms</h1>
      <p className="mt-4 line-clamp-2 text-lg italic text-ink-soft">
        &ldquo;{symptoms}&rdquo;
      </p>

      {/* The strip fills cell by cell as each step completes */}
      <div className="strip mt-8 p-5 sm:p-7">
        <div className="grid grid-cols-4 gap-3" aria-hidden="true">
          {steps.map((label, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <span
                key={label}
                className={`dot ${done || active ? "dot-full" : "dot-empty"} ${active ? "breathe" : ""}`}
                style={{ "--dot": done ? "var(--ink)" : "var(--tab)" } as React.CSSProperties}
              />
            );
          })}
        </div>
        <ol className="mt-6 space-y-2">
          {steps.map((label, i) => {
            const done = i < activeStep;
            const active = i === activeStep;
            return (
              <li
                key={label}
                className={`flex items-baseline justify-between gap-3 text-xl font-bold transition-opacity duration-300 sm:text-2xl ${
                  done || active ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="font-display">{label}</span>
                <span className="text-base font-medium text-ink-soft">
                  {done ? "Done" : active ? "Reading" : ""}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-5 text-ink-soft">
        Your details are processed securely and saved only to your account.
      </p>
    </div>
  );
}
