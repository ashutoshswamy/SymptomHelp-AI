"use client";

import { Clock, FirstAid, Siren, Stethoscope } from "@phosphor-icons/react";

const config = {
  routine: { Icon: Clock, label: "Routine checkup" },
  soon: { Icon: Stethoscope, label: "See doctor soon" },
  urgent: { Icon: FirstAid, label: "Seek care promptly" },
  emergency: { Icon: Siren, label: "Seek emergency care" },
} as const;

export function UrgencyIndicator({
  urgency,
}: {
  urgency: "routine" | "soon" | "urgent" | "emergency";
}) {
  const { Icon, label } = config[urgency];
  const strong = urgency === "urgent" || urgency === "emergency";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-base ${
        strong ? "font-bold" : "font-medium text-ink-soft"
      }`}
    >
      <Icon size={18} weight={strong ? "fill" : "bold"} aria-hidden="true" />
      {label}
    </span>
  );
}
