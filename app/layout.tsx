import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import "sileo/styles.css";
import { AuthProvider } from "@/components/AuthProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { AppToaster } from "@/components/AppToaster";

// Pinned by the user: Bricolage Grotesque (display, condensed via wdth axis) and DM Sans (body).
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = "https://symptomhelpai.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d5d8da" },
    { media: "(prefers-color-scheme: dark)", color: "#1c0c24" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SymptomHelp AI: Free AI Symptom Checker",
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
    siteName: "SymptomHelp AI",
    title: "SymptomHelp AI: Free AI Symptom Checker",
    description:
      "Describe your symptoms and get instant AI-powered health insights. Free symptom checker powered by Google Gemini.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SymptomHelp AI - Describe what you feel, we'll read the chart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ashutoshswamy_",
    title: "SymptomHelp AI - Free AI-Powered Symptom Checker",
    description:
      "Describe your symptoms and get instant AI-powered health insights powered by Google Gemini.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "SymptomHelp AI",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "SymptomHelp AI",
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        founder: { "@type": "Person", name: "Ashutosh Swamy", url: "https://github.com/ashutoshswamy" },
      },
      {
        "@type": "WebApplication",
        name: "SymptomHelp AI",
        url: siteUrl,
        description:
          "Free AI-powered symptom checker that analyzes your symptoms and provides health insights using Google Gemini.",
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@id": `${siteUrl}/#org` },
      },
    ],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <CookieConsent />
        <AppToaster />
      </body>
    </html>
  );
}
