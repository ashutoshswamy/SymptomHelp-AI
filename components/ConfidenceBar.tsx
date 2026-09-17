"use client";

const barColor = {
  low: "var(--severity-low)",
  moderate: "var(--severity-moderate)",
  high: "var(--severity-high)",
  critical: "var(--severity-critical)",
} as const;

export function ConfidenceBar({
  percentage,
  severity,
}: {
  percentage: number;
  severity: "low" | "moderate" | "high" | "critical";
}) {
  return (
    <div
      className="h-2 rounded-[2px] overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--line) 0, var(--line) 1px, transparent 1px, transparent 6px)",
        backgroundColor: "var(--line-soft)",
      }}
    >
      <div
        className="h-full animate-fill-bar"
        style={
          {
            "--bar-width": `${percentage}%`,
            backgroundColor: barColor[severity],
          } as React.CSSProperties
        }
      />
    </div>
  );
}
