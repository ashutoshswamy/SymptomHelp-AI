"use client";

const config = {
  routine: { color: "var(--ink-muted)", label: "Routine checkup" },
  soon: { color: "var(--pulse)", label: "See doctor soon" },
  urgent: { color: "var(--amber)", label: "Seek care promptly" },
  emergency: { color: "var(--severity-critical)", label: "Seek emergency care" },
} as const;

export function UrgencyIndicator({
  urgency,
}: {
  urgency: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { color, label } = config[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${
        urgency === "emergency" ? "animate-pulse-gentle" : ""
      }`}
      style={{ color }}
    >
      {label}
    </span>
  );
}
