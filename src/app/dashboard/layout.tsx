import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/layout/UserNav";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, History, HeartPulse } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const metadata: Metadata = {
  title: "Dashboard - SymptomHelp AI",
  description:
    "Manage your symptom analyses, view your report history, and get AI-driven health insights on SymptomHelp AI.",
  openGraph: {
    title: "Dashboard - SymptomHelp AI",
    description:
      "Your personal health dashboard for symptom analysis and history.",
  },
  twitter: {
    card: "summary",
    title: "Dashboard - SymptomHelp AI",
    description:
      "Your personal health dashboard for symptom analysis and history.",
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        side="left"
        className="border-r border-border/70"
      >
        <SidebarHeader className="p-4 flex flex-col items-center gap-2 group-data-[collapsible=icon]:items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
          >
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="font-headline text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
              SymptomHelp
            </span>
          </Link>
        </SidebarHeader>

        <ScrollArea className="flex-grow">
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard" asChild>
                  <SidebarMenuButton tooltip="New Analysis">
                    <LayoutDashboard />
                    <span>New Analysis</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/dashboard/history" asChild>
                  <SidebarMenuButton tooltip="Report History">
                    <History />
                    <span>Report History</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>

        <SidebarFooter className="p-4 mt-auto border-t border-border/70 group-data-[collapsible=icon]:p-2">
          <div className="flex items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-4">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:hidden">
          <SidebarTrigger />
          <Link href="/dashboard" className="flex items-center gap-1">
            <HeartPulse className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-semibold text-primary">
              SymptomHelp
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </SidebarInset>
    </>
  );
}
