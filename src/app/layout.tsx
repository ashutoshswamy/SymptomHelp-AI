"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
// Removed useState and useEffect as 'mounted' state is no longer used for this logic

// Default metadata for client component
const defaultTitle = "SymptomHelp AI";
const defaultDescription = "AI-powered symptom analysis and health insights.";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_ICON = "3rem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const headContent = (
    <head>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="icon"
        href="icon.png"
        type="image/<generated>"
        sizes="<generated>"
      />
      <link
        rel="apple-touch-icon"
        href="apple-icon.png"
        type="image/<generated>"
        sizes="<generated>"
      />
    </head>
  );

  const isAuthPage = pathname === "/auth";

  if (isAuthPage) {
    // Auth page gets minimal structure, NO SidebarProvider
    return (
      <html lang="en" suppressHydrationWarning>
        {headContent}
        <body className="font-body antialiased">
          {children} {/* AuthLayout -> AuthPage -> AuthForm */}
          <Toaster />
        </body>
      </html>
    );
  }

  // Non-auth pages get the full application shell WITH SidebarProvider
  return (
    <html lang="en" suppressHydrationWarning>
      {headContent}
      <body className="font-body antialiased">
        <SidebarProvider defaultOpen>
          {" "}
          {/* SidebarProvider now wraps the main structure */}
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex flex-col min-h-screen w-full has-[[data-variant=inset]]:bg-sidebar"
            )}
          >
            <div className="flex flex-1 overflow-hidden">
              {children} {/* Main app pages (e.g., DashboardLayout) go here */}
            </div>
            <Footer /> {/* Footer is now correctly inside SidebarProvider */}
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
