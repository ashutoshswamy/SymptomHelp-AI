export function DisclaimerBanner() {
  return (
    <div
      className="w-full py-2.5 px-4 text-center"
      style={{
        background: "var(--disclaimer-bg)",
        borderBottom: "1px solid var(--disclaimer-border)",
      }}
    >
      <p
        className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase leading-relaxed"
        style={{ color: "var(--disclaimer-text)" }}
      >
        <span className="hidden sm:inline">Medical Disclaimer: </span>
        <span className="sm:hidden">Disclaimer: </span>
        This AI tool is for informational purposes only and
        is not a substitute for professional medical advice.
      </p>
    </div>
  );
}
