import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-3xl pt-10 sm:pt-20">
        <h1 className="text-[clamp(4rem,14vw,8rem)] leading-[0.9]">Not here.</h1>
        <p className="mt-4 max-w-[40ch] text-lg text-ink-soft">
          That page does not exist or has moved.
        </p>
        <Link href="/" className="tab mt-8">
          Back to home
        </Link>
      </div>
    </SiteChrome>
  );
}
