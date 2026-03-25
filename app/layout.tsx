import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://symptomhelpai.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fffe" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SymptomHelp AI - Free AI-Powered Symptom Checker & Health Analysis",
    template: "%s | SymptomHelp AI",
  },
  description:
    "Describe your symptoms and get instant AI-powered health insights. Free symptom checker powered by Google Gemini analyzes conditions, severity, and recommended actions. Not a substitute for medical advice.",
  keywords: [
    "symptom checker",
    "AI health analysis",
    "symptom analysis",
    "health conditions",
    "medical symptoms",
    "AI diagnosis tool",
    "free symptom checker",
    "health AI",
    "symptom help",
    "Google Gemini health",
  ],
  authors: [{ name: "Ashutosh Swamy", url: "https://github.com/ashutoshswamy" }],
  creator: "Ashutosh Swamy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "SymptomHelp AI",
    title: "SymptomHelp AI - Free AI-Powered Symptom Checker & Health Analysis",
    description:
      "Describe your symptoms and get instant AI-powered health insights. Free symptom checker powered by Google Gemini.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SymptomHelp AI - Free AI-Powered Symptom Checker",
    description:
      "Describe your symptoms and get instant AI-powered health insights powered by Google Gemini.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SymptomHelp AI",
    url: siteUrl,
    description:
      "Free AI-powered symptom checker that analyzes your symptoms and provides health insights using Google Gemini.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    author: {
      "@type": "Person",
      name: "Ashutosh Swamy",
      url: "https://github.com/ashutoshswamy",
    },
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
