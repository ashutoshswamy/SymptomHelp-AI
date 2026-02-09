import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://symptomhelpai.in"),
  title: {
    default: "SymptomHelp AI - Intelligent Symptom Analysis & Health Insights",
    template: "%s | SymptomHelp AI"
  },
  description: "Get instant AI-powered health insights by analyzing your symptoms. Receive detailed analysis with confidence ratings, severity levels, urgency scores, and personalized recommendations. Free symptom checker powered by advanced AI.",
  keywords: [
    "symptom checker",
    "AI health analysis",
    "medical symptoms",
    "health insights",
    "symptom analyzer",
    "AI doctor",
    "health assessment",
    "disease symptoms",
    "medical diagnosis",
    "symptom help",
    "health AI",
    "symptom analysis India"
  ],
  authors: [{ name: "SymptomHelp AI" }],
  creator: "SymptomHelp AI",
  publisher: "SymptomHelp AI",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://symptomhelpai.in",
    siteName: "SymptomHelp AI",
    title: "SymptomHelp AI - Intelligent Symptom Analysis & Health Insights",
    description: "Get instant AI-powered health insights by analyzing your symptoms. Free symptom checker with confidence ratings and personalized recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SymptomHelp AI - AI-Powered Symptom Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SymptomHelp AI - Intelligent Symptom Analysis",
    description: "Get instant AI-powered health insights by analyzing your symptoms.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://symptomhelpai.in",
  },
  category: "Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0f1a" />
        <meta name="google-site-verification" content="" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
