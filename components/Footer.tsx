export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-surface/50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              SymptomHelp AI
            </p>
            <p className="text-xs text-muted leading-relaxed max-w-md">
              &copy; {new Date().getFullYear()} SymptomHelp AI. Powered by
              Google Gemini. This platform does not provide medical diagnoses.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted">
            <span>Built by Ashutosh Swamy</span>
            <span className="text-border">·</span>
            <a
              href="https://github.com/ashutoshswamy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-border">·</span>
            <a
              href="https://linkedin.com/in/ashutoshswamy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
