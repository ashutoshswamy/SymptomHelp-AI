"use server";
/**
 * @fileOverview An AI agent that analyzes user-provided symptoms and scan descriptions to suggest potential diagnoses.
 *
 * - analyzeSymptoms - A function that takes symptom and scan descriptions as input and returns potential diagnoses.
 * - AnalyzeSymptomsInput - The input type for the analyzeSymptoms function.
 * - AnalyzeSymptomsOutput - The return type for the analyzeSymptoms function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AnalyzeSymptomsInputSchema = z.object({
  symptomDescription: z
    .string()
    .describe("A detailed description of the symptoms experienced."),
  scanFindingsDescription: z
    .string()
    .describe(
      "A description of findings from medical scans like X-rays, MRIs, CT scans, etc."
    )
    .optional(),
  reportFileDataUri: z
    .string()
    .describe(
      "A medical report file (image or PDF), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(),
});

export type AnalyzeSymptomsInput = z.infer<typeof AnalyzeSymptomsInputSchema>;

const AnalyzeSymptomsOutputSchema = z.object({
  potentialDiagnoses: z
    .array(z.string())
    .describe(
      "A list of potential diagnoses based on the provided symptoms and scan findings."
    ),
  confidenceLevels: z
    .array(z.number())
    .describe("The confidence levels for each potential diagnosis (0-1).")
    .optional(),
  additionalNotes: z
    .string()
    .describe("Additional notes or recommendations.")
    .optional(),
});

export type AnalyzeSymptomsOutput = z.infer<typeof AnalyzeSymptomsOutputSchema>;

export async function analyzeSymptoms(
  input: AnalyzeSymptomsInput
): Promise<AnalyzeSymptomsOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: "analyzeSymptomsPrompt",
  input: { schema: AnalyzeSymptomsInputSchema },
  output: { schema: AnalyzeSymptomsOutputSchema },
  prompt: `You are a medical AI assistant that analyzes symptoms and medical scan findings described by users and suggests potential diagnoses.

  Consider the following information provided by the user:

  Symptom Description: {{{symptomDescription}}}

  {{~#if scanFindingsDescription}}
  Medical Scan Findings: {{{scanFindingsDescription}}}
  {{~/if}}

  {{~#if reportFileDataUri}}
  Medical Report File (Image or PDF): {{media url=reportFileDataUri}}
  (Analyze the contents of this file, including any text or visual data, as part of the medical report.)
  {{~else}}
  No medical report file provided.
  {{~/if}}

  Based on all this information, provide a list of potential diagnoses, along with confidence levels (0-1) for each diagnosis. Also include any additional notes or recommendations.
  Ensure that the diagnoses are relevant to the symptoms and scan findings provided.

  Format your output as a JSON object that adheres to the AnalyzeSymptomsOutputSchema schema.
  `,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: "analyzeSymptomsFlow",
    inputSchema: AnalyzeSymptomsInputSchema,
    outputSchema: AnalyzeSymptomsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
