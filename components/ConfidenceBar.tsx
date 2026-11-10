"use client";

// Ten pressed cells, filled to the confidence. Name kept so imports stay stable.
const dotColor = {
  low: "var(--sev-low)",
  moderate: "var(--sev-moderate)",
  high: "var(--sev-high)",
  critical: "var(--sev-critical)",
} as const;

export function ConfidenceBar({
  percentage,
  severity,
  delay = 200,
}: {
  percentage: number;
  severity: "low" | "moderate" | "high" | "critical";
  delay?: number;
}) {
  const filled = Math.max(0, Math.min(10, Math.round(percentage / 10)));
  return (
    <div
      className="grid grid-cols-10 gap-1.5 sm:gap-2"
      role="img"
      aria-label={`${percentage}% match`}
    >
      {Array.from({ length: 10 }, (_, i) =>
        i < filled ? (
          <span
            key={i}
            className="dot dot-full fill-cell"
            style={
              {
                "--dot": dotColor[severity],
                "--delay": `${delay + i * 55}ms`,
              } as React.CSSProperties
            }
          />
        ) : (
          <span key={i} className="dot dot-empty" />
        )
      )}
    </div>
  );
}
