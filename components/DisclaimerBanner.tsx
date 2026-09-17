export function DisclaimerBanner() {
  return (
    <div className="w-full py-2 px-4 text-center border-b border-dashed border-border bg-surface">
      <p className="font-mono-chart text-[10px] sm:text-[11px] tracking-wide uppercase leading-relaxed text-muted">
        <span className="text-foreground font-semibold">Not medical advice</span>
        <span className="hidden sm:inline">
          {" "}
          — informational only. Always consult a licensed clinician.
        </span>
        <span className="sm:hidden"> — informational only.</span>
      </p>
    </div>
  );
}
