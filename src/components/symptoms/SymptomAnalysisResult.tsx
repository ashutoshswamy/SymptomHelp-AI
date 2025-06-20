"use client";

import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb, CheckCircle, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SymptomAnalysisResultProps {
  result: AnalyzeSymptomsOutput | null;
}

export default function SymptomAnalysisResult({
  result,
}: SymptomAnalysisResultProps) {
  if (!result) {
    return null;
  }

  const hasDiagnoses =
    result.potentialDiagnoses && result.potentialDiagnoses.length > 0;
  const hasError = result.additionalNotes?.toLowerCase().startsWith("error:");

  return (
    <Card className="w-full mt-8 shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          {hasError ? (
            <AlertCircle className="mr-2 h-7 w-7 text-destructive" />
          ) : (
            <Lightbulb className="mr-2 h-7 w-7 text-primary" />
          )}
          AI Analysis Results
        </CardTitle>
        {!hasError && (
          <CardDescription>
            Here's what our AI found based on your symptoms. This is not a
            medical diagnosis.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {hasError ? (
          <div className="text-destructive p-4 border border-destructive bg-destructive/10 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Analysis Error</h3>
            <p>{result.additionalNotes}</p>
          </div>
        ) : (
          <>
            {hasDiagnoses ? (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="item-0"
              >
                {result.potentialDiagnoses.map((diagnosis, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-2">
                        {result.confidenceLevels &&
                        result.confidenceLevels[index] > 0.7 ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <HelpCircle className="h-5 w-5 text-amber-600" />
                        )}
                        {diagnosis}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pl-2">
                      {result.confidenceLevels &&
                        result.confidenceLevels[index] && (
                          <div className="mb-2">
                            <span className="font-medium">Confidence: </span>
                            <Badge
                              variant={
                                result.confidenceLevels[index] > 0.7
                                  ? "default"
                                  : result.confidenceLevels[index] > 0.4
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                result.confidenceLevels[index] > 0.7
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : result.confidenceLevels[index] > 0.4
                                  ? "bg-amber-100 text-amber-800 border-amber-300"
                                  : "bg-slate-100 text-slate-800 border-slate-300"
                              }
                            >
                              {(result.confidenceLevels[index] * 100).toFixed(
                                0
                              )}
                              %
                            </Badge>
                          </div>
                        )}
                      {/* Here you could add more details per diagnosis if the AI provides them */}
                      <p>
                        Please consult a healthcare professional for an accurate
                        diagnosis and treatment options.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground">
                No specific potential diagnoses identified. This could be due to
                insufficient information or symptoms not matching known
                patterns.
              </p>
            )}

            {result.additionalNotes && (
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <h4 className="font-semibold text-lg mb-2 text-primary">
                  Additional Notes from AI:
                </h4>
                <p className="text-foreground/90 whitespace-pre-wrap">
                  {result.additionalNotes}
                </p>
              </div>
            )}

            <div className="mt-8 p-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <AlertCircle className="inline-block mr-1 h-4 w-4" />
                <strong>Disclaimer:</strong> This AI analysis is for
                informational purposes only and is not a substitute for
                professional medical advice, diagnosis, or treatment. Always
                seek the advice of your physician or other qualified health
                provider with any questions you may have regarding a medical
                condition.
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
