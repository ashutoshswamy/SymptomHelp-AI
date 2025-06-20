"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AnalyzeSymptomsOutput } from "@/ai/flows/analyze-symptoms";
import type { SymptomReport } from "@/types";
import { revalidatePath } from "next/cache";

export async function saveSymptomReportAction({
  symptomDescription,
  scanFindingsDescription,
  analysisResult,
}: {
  symptomDescription: string;
  scanFindingsDescription?: string;
  analysisResult: AnalyzeSymptomsOutput;
}): Promise<{ data: SymptomReport | null; error: string | null }> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("symptom_reports")
    .insert([
      {
        user_id: user.id,
        symptom_description: symptomDescription,
        scan_findings_description: scanFindingsDescription,
        analysis_result: analysisResult,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error saving report:", error);
    return { data: null, error: error.message };
  }

  revalidatePath("/dashboard/history");
  return { data: data as SymptomReport, error: null };
}

export async function getSymptomReportsAction(): Promise<{
  reports: SymptomReport[];
  error: string | null;
}> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { reports: [], error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from("symptom_reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reports:", error);
    return { reports: [], error: error.message };
  }

  return { reports: data as SymptomReport[], error: null };
}

// Example RLS for 'symptom_reports' table:
// - Enable RLS: `ALTER TABLE public.symptom_reports ENABLE ROW LEVEL SECURITY;`
// - Allow users to see their own reports:
//   `CREATE POLICY "Allow individual read access to their own reports" ON public.symptom_reports FOR SELECT TO authenticated USING (auth.uid() = user_id);`
// - Allow users to insert their own reports:
//   `CREATE POLICY "Allow individual insert access for their own reports" ON public.symptom_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);`
