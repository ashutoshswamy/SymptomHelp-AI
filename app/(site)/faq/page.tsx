import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about how SymptomHelp AI works, what it saves, and its limits.",
  alternates: { canonical: "/faq" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-8 sm:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-[0.95]">Questions</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-ink-soft">
        How SymptomHelp AI works, what it saves, and what it cannot do.
      </p>
      <div className="mt-8">
        <FaqList />
      </div>
    </div>
  );
}
