import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-6xl pt-8 sm:pt-14">
      <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-[0.95] text-ink">{title}</h1>
      <p className="mt-3 text-ink-soft">Last updated {updated}</p>
      <div className="prose-legal mt-8">{children}</div>
    </article>
  );
}
