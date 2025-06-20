import type { Metadata } from "next";
import { getSymptomReportsAction } from "@/lib/actions";
import ReportHistoryItem from "@/components/symptoms/ReportHistoryItem";
import { AlertCircle, HistoryIcon, Inbox } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Symptom Report History - SymptomHelp AI",
  description:
    "Review your past symptom analyses and AI-generated insights on SymptomHelp AI.",
  openGraph: {
    title: "Symptom Report History - SymptomHelp AI",
    description: "Access your history of symptom reports and AI analyses.",
  },
  twitter: {
    card: "summary",
    title: "Symptom Report History - SymptomHelp AI",
    description: "Access your history of symptom reports and AI analyses.",
  },
};

export default async function HistoryPage() {
  const { reports, error } = await getSymptomReportsAction();

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Fetching History</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2 flex flex-col h-full">
      <header className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary flex items-center">
          <HistoryIcon className="mr-3 h-8 w-8" />
          Symptom Report History
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Review your past symptom analyses.
        </p>
      </header>

      {reports.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 bg-card rounded-lg shadow-md border border-border/50">
          <Inbox className="w-16 h-16 sm:w-24 sm:h-24 text-muted-foreground/50 mb-6" />
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
            No Reports Yet
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md">
            You haven&apos;t saved any symptom reports. Create a new analysis to
            see your history here.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-grow pr-4 -mr-4">
          {" "}
          {/* Offset scrollbar */}
          <div className="space-y-6">
            {reports.map((report) => (
              <ReportHistoryItem key={report.id} report={report} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
