"use client";

const config = {
  low: {
    bg: "bg-teal-100 dark:bg-teal-900/40",
    text: "text-teal-700 dark:text-teal-300",
    label: "Low Risk",
  },
  moderate: {
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
    label: "Moderate",
  },
  high: {
    bg: "bg-red-100 dark:bg-red-900/40",
    text: "text-red-700 dark:text-red-300",
    label: "High Urgency",
  },
  critical: {
    bg: "bg-red-200 dark:bg-red-900/60",
    text: "text-red-800 dark:text-red-200",
    label: "Critical",
  },
} as const;

export function SeverityBadge({
  severity,
  urgency,
}: {
  severity: "low" | "moderate" | "high" | "critical";
  urgency?: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { bg, text, label } = config[severity];
  const displayLabel =
    urgency === "emergency"
      ? "Emergency"
      : urgency === "urgent"
        ? "High Urgency"
        : label;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${bg} ${text} ${severity === "critical" ? "animate-pulse" : ""}`}
    >
      {displayLabel}
    </span>
  );
}
