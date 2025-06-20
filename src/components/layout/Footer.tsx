"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, HeartPulse } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sidebarContext = useSidebar();
  const pathname = usePathname();

  let footerPaddingClasses = "px-6"; // Default padding for non-dashboard pages or mobile

  const isDashboardPage = pathname.startsWith("/dashboard");

  if (isDashboardPage && sidebarContext?.state && !sidebarContext.isMobile) {
    if (sidebarContext.state === "expanded") {
      // Adjust padding to account for the expanded sidebar width
      // The exact value might need tweaking based on your sidebar's actual width and desired gap
      footerPaddingClasses = "md:pl-[calc(var(--sidebar-width)_+_1rem)] pr-6";
    } else if (sidebarContext.state === "collapsed") {
      // Adjust padding for collapsed sidebar
      footerPaddingClasses =
        "md:pl-[calc(var(--sidebar-width-icon)_+_1rem)] pr-6";
    }
  }

  return (
    <footer
      className={cn(
        "bg-muted text-muted-foreground py-8",
        footerPaddingClasses
      )}
    >
      <div className="container mx-auto">
        {" "}
        {/* Removed py-8 from here, mx-auto handles centering within padded footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left Section: App Info */}
          <div className="w-full md:w-2/3 lg:w-1/2">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl font-semibold text-primary">
                SymptomHelp AI
              </span>
            </Link>
            <p className="text-sm">
              Your AI-powered assistant for analyzing symptoms and understanding
              health insights. We help you make informed decisions about your
              well-being.
            </p>
          </div>

          {/* Right Section: Connect with Us */}
          <div className="w-full md:w-1/3 lg:w-auto mt-6 md:mt-0 text-left md:text-right">
            <h3 className="font-headline text-lg font-semibold text-primary mb-2">
              Connect with Developer
            </h3>
            <p className="text-xs mb-3">Developed by Ashutosh Swamy</p>
            <div className="flex space-x-3 justify-start md:justify-end">
              <Link
                href="https://github.com/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-primary transition-colors"
              >
                <Github size={18} />
              </Link>
              <Link
                href="https://linkedin.com/in/ashutoshswamy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="https://twitter.com/ashutoshswamy_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-6 border-border/50" />
        <div className="text-center text-xs">
          &copy; {currentYear} SymptomHelp AI. All rights reserved.
          <p className="mt-1">
            This tool is for informational purposes only and is not a substitute
            for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
