import type { Metadata } from "next";
import { GithubLogo, Globe, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach the maker of SymptomHelp AI.",
  alternates: { canonical: "/contact" },
};

const links = [
  { href: "https://linkedin.com/in/ashutoshswamy", label: "LinkedIn", note: "Best for privacy and data requests", Icon: LinkedinLogo },
  { href: "https://github.com/ashutoshswamy", label: "GitHub", note: "Bugs and ideas", Icon: GithubLogo },
  { href: "https://x.com/ashutoshswamy_", label: "X", note: "Quick questions", Icon: XLogo },
  { href: "https://ashutoshswamy.in", label: "Portfolio", note: "More of the maker's work", Icon: Globe },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl pt-8 sm:pt-14">
      <h1 className="text-[clamp(3rem,9vw,5.5rem)] leading-[0.95]">Contact</h1>
      <p className="mt-4 max-w-[52ch] text-lg text-ink-soft">
        Questions, feedback, or a request about your data. You can also delete your own data any time
        from your Account page.
      </p>
      <ul className="strip mt-8 grid gap-3 p-3 sm:p-4">
        {links.map(({ href, label, note, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="cell flex min-h-16 items-center gap-4 px-5 py-4 transition-transform hover:-translate-y-0.5"
            >
              <Icon size={28} weight="bold" aria-hidden="true" />
              <span>
                <span className="font-display block text-2xl leading-none">{label}</span>
                <span className="text-sm text-[#4d3b58]">{note}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
