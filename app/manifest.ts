import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SymptomHelp AI",
    short_name: "SymptomHelp",
    description:
      "Free AI-powered symptom checker that analyzes your symptoms and provides health insights.",
    start_url: "/",
    display: "standalone",
    background_color: "#d5d8da",
    theme_color: "#d5d8da",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
