"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  analyzeSymptoms,
  type AnalyzeSymptomsOutput,
} from "@/ai/flows/analyze-symptoms";
import { improveSymptomDescription } from "@/ai/flows/improve-symptom-description";
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Loader2,
  FileText,
  Trash2,
} from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  symptomDescription: z
    .string()
    .min(10, {
      message: "Please describe your symptoms in at least 10 characters.",
    })
    .max(5000),
  scanFindingsDescription: z
    .string()
    .max(3000)
    .optional()
    .describe(
      "Detailed description of findings from X-rays, MRIs, CT scans, etc."
    ),
});

type SymptomFormValues = z.infer<typeof formSchema>;

interface SymptomInputFormProps {
  onAnalysisComplete: (
    result: AnalyzeSymptomsOutput,
    description: string,
    scanFindings?: string,
    reportFileDataUri?: string
  ) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface FileInfo {
  dataUri: string;
  name: string;
  isImage: boolean;
}

export default function SymptomInputForm({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
}: SymptomInputFormProps) {
  const [isImproving, setIsImproving] = useState(false);
  const [reportFile, setReportFile] = useState<FileInfo | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // to reset file input

  const { toast } = useToast();
  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomDescription: "",
      scanFindingsDescription: "",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 4MB.",
          variant: "destructive",
        });
        setFileInputKey(Date.now()); // reset file input
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportFile({
          dataUri: reader.result as string,
          name: file.name,
          isImage: file.type.startsWith("image/"),
        });
      };
      reader.onerror = () => {
        toast({
          title: "Error Reading File",
          description: "Could not read the selected file.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    } else {
      setReportFile(null);
    }
  };

  const removeFile = () => {
    setReportFile(null);
    setFileInputKey(Date.now()); // reset file input so same file can be re-added
  };

  const handleImproveDescription = async () => {
    const description = form.getValues("symptomDescription");
    if (!description.trim()) {
      toast({
        title: "Cannot Improve Empty Description",
        description: "Please enter your symptoms first.",
        variant: "destructive",
      });
      return;
    }
    setIsImproving(true);
    try {
      const result = await improveSymptomDescription({
        symptomDescription: description,
      });
      form.setValue("symptomDescription", result.improvedDescription);
      toast({
        title: "Description Improved!",
        description: "Your symptom description has been enhanced.",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error improving description:", error);
      toast({
        title: "Error",
        description: "Could not improve description.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const onSubmit: SubmitHandler<SymptomFormValues> = async (data) => {
    setIsLoading(true);

    try {
      const analysisResult = await analyzeSymptoms({
        symptomDescription: data.symptomDescription,
        scanFindingsDescription: data.scanFindingsDescription,
        reportFileDataUri: reportFile?.dataUri,
      });

      onAnalysisComplete(
        analysisResult,
        data.symptomDescription,
        data.scanFindingsDescription,
        reportFile?.dataUri
      );
      toast({
        title: "Analysis Complete",
        description: "Potential diagnoses are ready.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
    } catch (error: any) {
      console.error("Error analyzing symptoms:", error);
      toast({
        title: "Analysis Error",
        description: error.message || "Failed to analyze symptoms.",
        variant: "destructive",
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      });
      onAnalysisComplete(
        {
          potentialDiagnoses: [],
          additionalNotes: `Error: ${
            error.message || "Failed to analyze symptoms."
          }`,
        },
        data.symptomDescription,
        data.scanFindingsDescription,
        reportFile?.dataUri
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Describe Your Symptoms & Scan Findings
        </CardTitle>
        <CardDescription>
          Provide as much detail as possible about your symptoms and any
          relevant medical scan findings.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="symptomDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="symptomDescription" className="text-base">
                    Symptom Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="symptomDescription"
                      placeholder="e.g., I have a persistent cough, slight fever, and a red rash on my arm that appeared 2 days ago..."
                      rows={6}
                      className="resize-none focus:ring-primary focus:border-primary"
                      {...field}
                      disabled={isLoading || isImproving}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleImproveDescription}
              disabled={isLoading || isImproving}
              className="w-full sm:w-auto text-primary border-primary hover:bg-primary/10 hover:text-primary"
            >
              {isImproving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              AI Improve Symptom Description
            </Button>

            <FormField
              control={form.control}
              name="scanFindingsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="scanFindingsDescription"
                    className="text-base"
                  >
                    X-ray/Scan Findings Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="scanFindingsDescription"
                      placeholder="e.g., X-ray showed opacity in the lower left lung lobe. MRI of the knee indicated a possible meniscus tear..."
                      rows={4}
                      className="resize-none focus:ring-primary focus:border-primary"
                      {...field}
                      disabled={isLoading || isImproving}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="report-upload" className="text-base">
                Upload Medical Report (Optional)
              </Label>
              <Input
                key={fileInputKey}
                id="report-upload"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                disabled={isLoading || isImproving || !!reportFile}
                className="file:text-primary file:font-semibold"
              />
              <p className="text-xs text-muted-foreground">
                Upload an image or PDF of your report (max 4MB) for a more
                detailed analysis.
              </p>
            </div>

            {reportFile && (
              <div className="mt-4 space-y-2">
                <Label>File Preview</Label>
                <div className="relative w-full border-2 border-dashed rounded-lg p-2">
                  {reportFile.isImage ? (
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <Image
                        src={reportFile.dataUri}
                        alt="Medical report preview"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-2">
                      <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground truncate">
                        {reportFile.name}
                      </p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-7 w-7 bg-background/50 hover:bg-destructive/20"
                    onClick={removeFile}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
              disabled={isLoading || isImproving}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Analyze Symptoms & Findings
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
