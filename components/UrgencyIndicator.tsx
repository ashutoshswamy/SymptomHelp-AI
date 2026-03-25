"use client";

const config = {
  routine: {
    color: "text-slate-500 dark:text-slate-400",
    label: "Routine checkup",
  },
  soon: {
    color: "text-blue-600 dark:text-blue-400",
    label: "See doctor soon",
  },
  urgent: {
    color: "text-orange-600 dark:text-orange-400",
    label: "Seek care promptly",
  },
  emergency: {
    color: "text-red-600 dark:text-red-400",
    label: "Seek emergency care",
  },
} as const;

export function UrgencyIndicator({
  urgency,
}: {
  urgency: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { color, label } = config[urgency];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${color} ${urgency === "emergency" ? "animate-pulse" : ""}`}
    >
      {label}
    </span>
  );
}
