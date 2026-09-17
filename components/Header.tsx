import Link from "next/link";

export function Header() {
  return (
    <header className="w-full border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              width="22"
              height="18"
              viewBox="0 0 44 18"
              fill="none"
              className="text-primary shrink-0"
            >
              <path
                d="M0 9H12L15 2L20 16L24 9L27 13L30 5L33 9H44"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-mono-chart text-[15px] sm:text-base font-semibold tracking-tight text-foreground">
              SymptomHelp<span className="text-primary">/AI</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
