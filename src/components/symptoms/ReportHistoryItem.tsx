"use client";

import type { SymptomReport } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { CalendarDays, Pill, FileText, Download } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

interface ReportHistoryItemProps {
  report: SymptomReport;
}

export default function ReportHistoryItem({ report }: ReportHistoryItemProps) {
  const formattedDate = format(
    parseISO(report.created_at),
    "MMMM d, yyyy - h:mm a"
  );
  const primaryDiagnosis =
    report.analysis_result.potentialDiagnoses?.[0] || "N/A";

  const isImage = report.report_file_data_uri?.startsWith("data:image");
  const isPdf = report.report_file_data_uri?.startsWith("data:application/pdf");

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="font-headline text-xl mb-1">
              Report from {formattedDate.split(" - ")[0]}
            </CardTitle>
            <CardDescription className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-2 h-4 w-4" />{" "}
              {formattedDate.split(" - ")[1]}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-end gap-2 ml-auto flex-shrink-0">
            {report.report_file_data_uri && (
              <Badge variant="outline" className="text-xs">
                <FileText className="mr-1 h-3 w-3" /> Report File
              </Badge>
            )}
            {report.scan_findings_description && (
              <Badge variant="outline" className="text-xs">
                <FileText className="mr-1 h-3 w-3" /> Scan Findings
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-primary">
                  Symptom Summary
                </span>
                <p className="text-sm text-muted-foreground truncate max-w-xs sm:max-w-sm md:max-w-md">
                  {report.symptom_description.substring(0, 100)}
                  {report.symptom_description.length > 100 ? "..." : ""}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <h4 className="font-semibold mb-1 mt-2">
                Full Symptom Description:
              </h4>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap mb-4 p-2 bg-secondary/30 rounded-md">
                {report.symptom_description}
              </p>
              {report.scan_findings_description && (
                <>
                  <h4 className="font-semibold mb-1 mt-3">
                    Scan Findings Description:
                  </h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap p-2 bg-secondary/30 rounded-md">
                    {report.scan_findings_description}
                  </p>
                </>
              )}
              {report.report_file_data_uri && (
                <>
                  <h4 className="font-semibold mb-1 mt-3">
                    Uploaded Report File:
                  </h4>
                  {isImage && (
                    <div className="relative w-full h-96 border rounded-md overflow-hidden bg-muted/50 p-1">
                      <Image
                        src={report.report_file_data_uri}
                        alt="User uploaded medical report"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-sm"
                      />
                    </div>
                  )}
                  {isPdf && (
                    <div className="p-4 border rounded-md bg-muted/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <span className="font-medium text-foreground">
                          Medical Report PDF
                        </span>
                      </div>
                      <Button asChild variant="outline">
                        <a
                          href={report.report_file_data_uri}
                          download="medical-report.pdf"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          View/Download
                        </a>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-primary">
                  AI Analysis Summary
                </span>
                <p className="text-sm text-muted-foreground">
                  Primary Suggestion: {primaryDiagnosis}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <h4 className="font-semibold mb-1 mt-2">Potential Diagnoses:</h4>
              {report.analysis_result.potentialDiagnoses &&
              report.analysis_result.potentialDiagnoses.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 mb-2 pl-2">
                  {report.analysis_result.potentialDiagnoses.map(
                    (diag, index) => (
                      <li key={index} className="text-sm">
                        {diag}
                        {report.analysis_result.confidenceLevels &&
                          report.analysis_result.confidenceLevels[index] && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {(
                                report.analysis_result.confidenceLevels[index] *
                                100
                              ).toFixed(0)}
                              % Conf.
                            </Badge>
                          )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No specific diagnoses provided.
                </p>
              )}
              {report.analysis_result.additionalNotes && (
                <>
                  <h4 className="font-semibold mb-1 mt-3">
                    Additional Notes from AI:
                  </h4>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap p-2 bg-secondary/30 rounded-md">
                    {report.analysis_result.additionalNotes}
                  </p>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3">
        <Pill className="mr-2 h-4 w-4 text-primary/70" />
        This report is AI-generated and not a medical diagnosis. Consult a
        doctor.
      </CardFooter>
    </Card>
  );
}
