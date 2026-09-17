"use client";

const config = {
  low: { color: "var(--severity-low)", label: "Low Risk" },
  moderate: { color: "var(--severity-moderate)", label: "Moderate" },
  high: { color: "var(--severity-high)", label: "High Urgency" },
  critical: { color: "var(--severity-critical)", label: "Critical" },
} as const;

export function SeverityBadge({
  severity,
  urgency,
}: {
  severity: "low" | "moderate" | "high" | "critical";
  urgency?: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { color, label } = config[severity];
  const displayLabel =
    urgency === "emergency"
      ? "Emergency"
      : urgency === "urgent"
        ? "High Urgency"
        : label;

  return (
    <span
      className={`stamp font-mono-chart text-[10px] font-semibold uppercase ${
        severity === "critical" ? "animate-pulse-gentle" : ""
      }`}
      style={{ color }}
    >
      {displayLabel}
    </span>
  );
}
