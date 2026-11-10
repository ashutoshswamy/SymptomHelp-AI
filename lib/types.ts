export interface SymptomInput {
  symptoms: string;
  age?: number;
  gender?: string;
}

export interface ConditionAnalysis {
  condition: string;
  confidence: number;
  severity: "low" | "moderate" | "high" | "critical";
  urgency: "routine" | "soon" | "urgent" | "emergency";
  description: string;
  recommendedActions: string[];
  matchingSymptoms: string[];
}

export interface AnalysisResponse {
  conditions: ConditionAnalysis[];
  generalAdvice: string;
  disclaimer: string;
  analyzedAt: string;
}

export interface Profile {
  age?: number;
  gender?: string;
}

export interface HistoryItem {
  id: string;
  symptoms: string;
  result: AnalysisResponse;
  createdAt: string;
}
