import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SymptomHelp AI",
    short_name: "SymptomHelp",
    description:
      "Free AI-powered symptom checker that analyzes your symptoms and provides health insights.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f4ef",
    theme_color: "#f3f4ef",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
