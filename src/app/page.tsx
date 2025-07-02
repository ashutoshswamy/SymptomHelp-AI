import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Stethoscope, BrainCircuit, ShieldCheck, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const metadata: Metadata = {
  title: "SymptomHelp AI - Intelligent Health Symptom Analysis",
  description:
    "Gain clarity on your health. Describe symptoms, detail scan findings, and receive AI-driven insights with SymptomHelp AI. Get started now.",
  openGraph: {
    title: "SymptomHelp AI - Intelligent Health Symptom Analysis",
    description:
      "AI-powered insights for your health symptoms and medical scan findings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SymptomHelp AI - Intelligent Health Symptom Analysis",
    description:
      "AI-powered insights for your health symptoms and medical scan findings.",
  },
};

export default async function HomePage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-grow relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-background to-background -z-10"></div>
      <header className="container mx-auto py-16 md:py-24 text-center">
        <div className="inline-block p-5 rounded-2xl bg-primary/10 mx-auto mb-8 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-pulse"
            role="img"
            aria-hidden="true"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.22 12H9.5l.7-1.44.7 2.88.7-1.44H15" />
          </svg>
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
          SymptomHelp AI
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10">
          Gain clarity on your health. Effortlessly describe symptoms, detail
          scan findings, and receive AI-driven insights to guide your next
          steps.
        </p>
        <Link href="/auth">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <Zap className="mr-2 h-5 w-5" /> Get Started Now
          </Button>
        </Link>
      </header>

      <main className="container mx-auto py-16 md:py-20 flex-grow">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          How SymptomHelp AI Empowers You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-300 flex flex-col hover:border-primary/50">
            <Stethoscope className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-3">
              Intuitive Symptom Logging
            </h3>
            <p className="text-foreground/70 flex-grow">
              Clearly articulate your symptoms and provide details from medical
              scans. Our AI can even help refine your descriptions for better
              clarity.
            </p>
          </div>
          <div className="p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-300 flex flex-col hover:border-primary/50">
            <BrainCircuit className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-3">
              Advanced AI Analysis
            </h3>
            <p className="text-foreground/70 flex-grow">
              Leverage cutting-edge AI to analyze your information,
              cross-referencing vast medical knowledge to suggest potential
              considerations.
            </p>
          </div>
          <div className="p-8 bg-card/80 backdrop-blur-sm rounded-xl shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-300 flex flex-col hover:border-primary/50">
            <ShieldCheck className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-headline text-2xl font-semibold mb-3">
              Secure & Private History
            </h3>
            <p className="text-foreground/70 flex-grow">
              Your health data is handled with utmost security. Create an
              account to save, review, and track your symptom reports over time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
