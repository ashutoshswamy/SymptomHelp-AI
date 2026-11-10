import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/lib/faq";

export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="strip grid gap-3 p-3 sm:p-4">
      {items.map((f) => (
        <details key={f.q} className="faq cell">
          <summary className="flex min-h-14 items-center justify-between gap-4 px-5 py-4 text-xl font-bold sm:text-2xl">
            <span className="font-display">{f.q}</span>
            <CaretDown size={20} weight="bold" aria-hidden="true" className="faq-caret shrink-0 transition-transform duration-300" />
          </summary>
          <p className="max-w-[62ch] px-5 pb-5 text-[#4d3b58]">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
