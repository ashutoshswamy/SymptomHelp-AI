import Link from "next/link";
import { GithubLogo, Globe, LinkedinLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieSettingsButton";

const social = [
  { href: "https://ashutoshswamy.in", label: "Portfolio", Icon: Globe },
  { href: "https://github.com/ashutoshswamy", label: "GitHub", Icon: GithubLogo },
  { href: "https://linkedin.com/in/ashutoshswamy", label: "LinkedIn", Icon: LinkedinLogo },
  { href: "https://x.com/ashutoshswamy_", label: "X", Icon: XLogo },
];

const columns = [
  {
    title: "Product",
    links: [
      { href: "/check", label: "Symptom checker" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Medical disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="perforation mx-auto max-w-6xl" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-ink-soft">
            Describe your symptoms, get a ranked list of what it could be. Not a diagnosis.
          </p>
          <div className="mt-4 flex items-center gap-1">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-ground"
              >
                <Icon size={22} weight="bold" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-2xl">{col.title}</h2>
              <ul className="mt-3 space-y-0.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Legal" && (
                  <li>
                    <CookieSettingsButton />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 text-sm text-ink-soft sm:px-8">
        &copy; {new Date().getFullYear()} SymptomHelp AI.
      </div>
    </footer>
  );
}
