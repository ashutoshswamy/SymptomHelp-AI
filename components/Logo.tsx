// Mark: one pressed cell (the circle) with a single pulse line running through it and
// breaking out of both edges: a signal being read. Tile and line follow the theme.
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <rect width="64" height="64" rx="18" fill="var(--ink)" />
      <circle cx="32" cy="32" r="19" fill="var(--tab)" />
      <path
        d="M7 35H21L26.5 13L36 51L41 35H57"
        fill="none"
        stroke="var(--mark-line)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3 whitespace-nowrap">
      <LogoMark />
      <span className="font-display text-[1.7rem] leading-none text-ink">
        SymptomHelp<span className="text-[#c2410c] dark:text-tab"> AI</span>
      </span>
    </span>
  );
}
