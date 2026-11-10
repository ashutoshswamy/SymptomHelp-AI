import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why SymptomHelp AI exists and how it is built.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-6xl pt-8 sm:pt-14">
      <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-[0.95]">About</h1>
      <div className="prose-legal mt-8">
        <p className="!text-xl !text-ink">
          SymptomHelp AI is a free tool that turns a worry into a clear, ranked list of
          possibilities, and says plainly when it is time to see a doctor.
        </p>

        <h2>Why it exists</h2>
        <p>
          Most people search their symptoms late at night and land on frightening, contradictory
          pages. This site tries to be the opposite: calm, specific, and honest about what it
          cannot know.
        </p>

        <h2>How it works</h2>
        <p>
          You describe your symptoms. The text goes to Google&rsquo;s Gemini model, which returns
          possible conditions with a confidence estimate, severity, urgency and next steps. The site
          is built with Next.js, with Firebase for sign-in and your private history.
        </p>

        <h2>What it is not</h2>
        <p>
          It is not a doctor, a diagnosis or a substitute for care. Confidence figures are model
          estimates. Read the <Link href="/disclaimer">medical disclaimer</Link>.
        </p>

        <h2>Who built it</h2>
        <p>
          Built and maintained by Ashutosh Swamy. See the <Link href="/contact">contact page</Link>{" "}
          to get in touch.
        </p>
      </div>
    </article>
  );
}
