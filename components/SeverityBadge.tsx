"use client";

// Printed chips. Crimson (high, critical) is the only place the page ever uses it.
const config = {
  low: { bg: "var(--field-bg)", fg: "#2a1233", label: "Low risk" },
  moderate: { bg: "var(--tab)", fg: "#2a1233", label: "Moderate" },
  high: { bg: "var(--sev-high)", fg: "#ffffff", label: "High urgency" },
  critical: { bg: "var(--sev-critical)", fg: "#ffffff", label: "Critical" },
} as const;

export function SeverityBadge({
  severity,
  urgency,
}: {
  severity: "low" | "moderate" | "high" | "critical";
  urgency?: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { bg, fg, label } = config[severity];
  const displayLabel =
    urgency === "emergency"
      ? "Emergency"
      : urgency === "urgent"
        ? "High urgency"
        : label;

  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-sm font-bold leading-none"
      style={{ backgroundColor: bg, color: fg }}
    >
      {displayLabel}
    </span>
  );
}
