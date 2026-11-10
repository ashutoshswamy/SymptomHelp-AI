import { ConfidenceBar } from "./ConfidenceBar";
import { SeverityBadge } from "./SeverityBadge";

// Sample data, clearly labelled. Shows what a real read-out looks like.
const sample = [
  { name: "Tension headache", pct: 70, severity: "low" as const },
  { name: "Dehydration", pct: 40, severity: "moderate" as const },
  { name: "Migraine", pct: 20, severity: "low" as const },
];

export function ExampleReadout() {
  return (
    <figure className="strip press-in p-5 sm:p-7" style={{ "--delay": "200ms" } as React.CSSProperties}>
      <figcaption className="text-2xl">Example read-out</figcaption>
      <ol className="mt-4 space-y-5">
        {sample.map((s, i) => (
          <li key={s.name}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl text-ink-soft">{i + 1}</span>
              <span className="font-display flex-1 text-3xl leading-none">{s.name}</span>
              <span className="font-display text-4xl leading-none tabular">
                {s.pct}
                <span className="text-2xl">%</span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <SeverityBadge severity={s.severity} />
            </div>
            <div className="mt-3">
              <ConfidenceBar percentage={s.pct} severity={s.severity} delay={400 + i * 150} />
            </div>
          </li>
        ))}
      </ol>
      <p className="perforation mt-6 pt-4 text-sm text-ink-soft">
        Sample data for illustration. Not a real result and not medical advice.
      </p>
    </figure>
  );
}
