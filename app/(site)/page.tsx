import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ExampleReadout } from "@/components/ExampleReadout";
import { FaqList } from "@/components/FaqList";
import { SeverityBadge } from "@/components/SeverityBadge";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const steps = [
  {
    verb: "Describe",
    text: "Type what you feel in your own words, with your age and sex if you like. No medical terms needed.",
  },
  {
    verb: "Read",
    text: "Get a ranked list of what it could be, each with a confidence score, a severity and an urgency.",
  },
  {
    verb: "Decide",
    text: "See what matched, what to do next, and when it is time to see a doctor or call for help.",
  },
];

const expectations = [
  { name: "Cost", value: "Free" },
  { name: "Saved", value: "Only to you" },
  { name: "Wait", value: "Seconds" },
  { name: "Diagnosis", value: "Never" },
];

const levels = [
  { severity: "low", urgency: "routine", label: "Routine checkup", note: "Worth mentioning at your next visit." },
  { severity: "moderate", urgency: "soon", label: "See a doctor soon", note: "Book an appointment in the coming days." },
  { severity: "high", urgency: "urgent", label: "Seek care promptly", note: "Get seen today if you can." },
  { severity: "critical", urgency: "emergency", label: "Seek emergency care", note: "Do not wait. Call emergency services." },
] as const;

const redFlags = [
  "Chest pain or pressure",
  "Trouble breathing",
  "Sudden weakness, a drooping face or slurred speech",
  "Heavy bleeding that will not stop",
  "Thoughts of harming yourself",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <section className="grid gap-10 pt-8 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-16">
        <div className="lg:col-span-7">
          <h1 className="rise-in text-[clamp(3.25rem,10vw,6rem)] leading-[0.95] text-ink">
            A calm read on what you feel.
          </h1>
          <p
            className="rise-in mt-6 max-w-[36ch] text-lg text-ink-soft sm:text-xl"
            style={{ "--delay": "250ms" } as React.CSSProperties}
          >
            Describe your symptoms in your own words. Get a ranked list of what it could be and when
            to see a doctor.
          </p>
          <div
            className="rise-in mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            <Link href="/check" className="tab">
              Check my symptoms
              <ArrowRight size={24} weight="bold" aria-hidden="true" />
            </Link>
            <Link href="/#how-it-works" className="tab tab-outline">
              How it works
            </Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ExampleReadout />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mt-24 scroll-mt-8 sm:mt-32">
        <h2 className="text-4xl sm:text-5xl">How it works</h2>
        <ol className="mt-8">
          {steps.map((s, i) => (
            <li
              key={s.verb}
              className={`grid gap-2 py-7 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-10 ${i > 0 ? "perforation" : ""}`}
            >
              <span className="font-display text-5xl leading-none sm:text-6xl">{s.verb}</span>
              <p className="max-w-[48ch] text-lg text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What to expect */}
      <section className="mt-24 sm:mt-32">
        <h2 className="text-4xl sm:text-5xl">What to expect</h2>
        <div className="strip mt-6 grid grid-cols-2 gap-3 p-3 sm:p-4 lg:grid-cols-[1fr_1.35fr_1.35fr_1fr]">
          {expectations.map(({ name, value }) => (
            <div key={name} className="cell px-5 py-6 sm:px-6 sm:py-8">
              <p className="font-display text-4xl leading-none sm:text-5xl">{value}</p>
              <p className="mt-3 text-sm font-bold text-[#4d3b58]">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Urgency */}
      <section className="mt-24 grid gap-10 sm:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="text-4xl sm:text-5xl">Urgency without alarm</h2>
          <p className="mt-4 max-w-[40ch] text-lg text-ink-soft">
            Every possibility comes with a plain label for how soon to act. Red is saved for the ones
            that matter.
          </p>
        </div>
        <ul className="lg:col-span-7">
          {levels.map((l, i) => (
            <li
              key={l.severity}
              className={`flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6 ${i > 0 ? "perforation" : ""}`}
            >
              <span className="sm:w-40 sm:shrink-0">
                <SeverityBadge severity={l.severity} urgency={l.urgency} />
              </span>
              <span>
                <span className="font-display block text-2xl">{l.label}</span>
                <span className="text-ink-soft">{l.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Safety */}
      <section className="mt-24 rounded-[28px] border-[3px] border-dotted border-ink/40 p-6 sm:mt-32 sm:p-10">
        <h2 className="text-4xl sm:text-5xl">If it is an emergency, do not use this</h2>
        <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
          Call your local emergency number now (112 in India) if you or someone near you has any of
          these.
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {redFlags.map((f) => (
            <li key={f} className="cell px-5 py-3 font-semibold">
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-24 sm:mt-32">
        <h2 className="text-4xl sm:text-5xl">Questions</h2>
        <div className="mt-6">
          <FaqList limit={4} />
        </div>
        <Link href="/faq" className="mt-5 inline-flex min-h-11 items-center font-bold underline underline-offset-4">
          Read all questions
        </Link>
      </section>

      {/* Closing */}
      <section className="mt-24 rounded-[28px] bg-tab p-8 text-tab-ink sm:mt-32 sm:p-14">
        <h2 className="max-w-[16ch] text-5xl sm:text-6xl">Ready when you are.</h2>
        <p className="mt-4 max-w-[44ch] text-lg">
          Free to use. Takes seconds. You stay in charge of every decision.
        </p>
        <Link href="/signup" className="tab tab-ink mt-8">
          Create your account
          <ArrowRight size={24} weight="bold" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
