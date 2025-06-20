import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";

export interface SymptomReport {
  id: string;
  user_id: string;
  symptom_description: string;
  scan_findings_description?: string; // Description of X-ray, MRI, etc. findings
  analysis_result: AnalyzeSymptomsOutput;
  created_at: string; // ISO string date
}
