"use client";

// Removed Metadata import as this is a client component.
// Metadata for /dashboard should be handled by src/app/dashboard/layout.tsx
import { useState, useEffect } from "react";
import SymptomInputForm from "@/components/symptoms/SymptomInputForm";
import SymptomAnalysisResult from "@/components/symptoms/SymptomAnalysisResult";
import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import { saveSymptomReportAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeSymptomsOutput | null>(null);
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentScanFindings, setCurrentScanFindings] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false); // For AI analysis
  const [isSaving, setIsSaving] = useState(false); // For saving report
  const { toast } = useToast();

  // Dynamically set title (client-side only, not for SEO bots initially)
  // SEO title is primarily set by src/app/dashboard/layout.tsx
  useEffect(() => {
    document.title = "New Symptom Analysis - SymptomHelp AI";
  }, []);

  const handleAnalysisComplete = (
    result: AnalyzeSymptomsOutput,
    description: string,
    scanFindings?: string
  ) => {
    setAnalysisResult(result);
    setCurrentDescription(description);
    setCurrentScanFindings(scanFindings);
  };

  const handleSaveReport = async () => {
    if (!analysisResult || !currentDescription) {
      toast({
        title: "Cannot Save",
        description: "No analysis result or description to save.",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);
    try {
      const { data, error } = await saveSymptomReportAction({
        symptomDescription: currentDescription,
        scanFindingsDescription: currentScanFindings,
        analysisResult,
      });

      if (error) throw new Error(error);

      toast({
        title: "Report Saved",
        description: "Your symptom report has been saved successfully.",
        className: "bg-green-500 text-white",
      });
      setAnalysisResult(null);
      setCurrentDescription("");
      setCurrentScanFindings(undefined);
      // Consider resetting the form fields in SymptomInputForm as well
      // This might involve passing a reset function down or managing form state here.
    } catch (error: any) {
      console.error("Error saving report:", error);
      toast({
        title: "Save Error",
        description: error.message || "Failed to save the report.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-2 space-y-8">
      <SymptomInputForm
        onAnalysisComplete={handleAnalysisComplete}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {analysisResult && !isLoading && (
        <>
          <SymptomAnalysisResult result={analysisResult} />
          {!analysisResult.additionalNotes
            ?.toLowerCase()
            .startsWith("error:") && (
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleSaveReport}
                disabled={isSaving}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Report
              </Button>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <Card className="w-full mt-8 shadow-xl animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-10 bg-muted rounded w-1/3 mt-4"></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
