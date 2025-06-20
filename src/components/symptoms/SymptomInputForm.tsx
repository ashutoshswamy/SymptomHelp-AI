"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { Sparkles, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

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
    scanFindings?: string
  ) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function SymptomInputForm({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
}: SymptomInputFormProps) {
  const [isImproving, setIsImproving] = useState(false);

  const { toast } = useToast();
  const form = useForm<SymptomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomDescription: "",
      scanFindingsDescription: "",
    },
  });

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
      });

      onAnalysisComplete(
        analysisResult,
        data.symptomDescription,
        data.scanFindingsDescription
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
        data.scanFindingsDescription
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
