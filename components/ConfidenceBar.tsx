"use client";

const barColors = {
  low: "from-teal-400 to-teal-500",
  moderate: "from-amber-400 to-amber-500",
  high: "from-red-400 to-red-500",
  critical: "from-red-500 to-red-700",
} as const;

export function ConfidenceBar({
  percentage,
  severity,
}: {
  percentage: number;
  severity: "low" | "moderate" | "high" | "critical";
}) {
  return (
    <div className="h-2 rounded-full bg-border/50 overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${barColors[severity]} animate-fill-bar`}
        style={{ "--bar-width": `${percentage}%` } as React.CSSProperties}
      />
    </div>
  );
}
