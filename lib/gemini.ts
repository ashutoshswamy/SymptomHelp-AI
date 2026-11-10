import { GoogleGenerativeAI } from "@google/generative-ai";
import type { SymptomInput, AnalysisResponse } from "./types";

const SYSTEM_INSTRUCTION = `You are a medical information assistant that provides educational analysis of symptoms. You do NOT diagnose conditions. You provide potential conditions that may be associated with the described symptoms, along with confidence levels and recommended actions.

IMPORTANT RULES:
- This is for educational purposes only
- Never claim to diagnose
- Always recommend consulting a healthcare professional
- Be conservative with confidence scores
- If symptoms suggest something potentially serious, flag it with appropriate urgency
- Return 2-5 potential conditions, ordered by confidence (highest first)`;

const JSON_SCHEMA = `{
  "conditions": [
    {
      "condition": "string - name of the potential condition",
      "confidence": "number - 0 to 100, how likely symptoms match this condition",
      "severity": "string - one of: low, moderate, high, critical",
      "urgency": "string - one of: routine, soon, urgent, emergency",
      "description": "string - brief 1-2 sentence explanation of the condition",
      "recommendedActions": ["string - specific next steps"],
      "matchingSymptoms": ["string - which user symptoms are associated with this condition"]
    }
  ],
  "generalAdvice": "string - overall health guidance based on the symptoms",
  "disclaimer": "string - reminder that this is not medical advice"
}`;

export async function analyzeSymptoms(
  input: SymptomInput,
): Promise<AnalysisResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });

  const demographics = [
    input.age ? `Age: ${input.age}` : null,
    input.gender ? `Gender: ${input.gender}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const prompt = `Analyze the following symptoms and provide potential conditions with confidence levels, severity, and recommended actions.

Symptoms: ${input.symptoms}
${demographics ? `Demographics: ${demographics}` : ""}

Respond with valid JSON matching this exact schema:
${JSON_SCHEMA}

Remember:
- List 2-5 conditions ordered by confidence (highest first)
- Be conservative and realistic with confidence percentages
- Always include "Consult a healthcare professional" in recommended actions
- The disclaimer should remind users this is educational information only`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  let parsed: AnalysisResponse;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Failed to parse AI response");
  }

  if (!parsed.conditions || !Array.isArray(parsed.conditions)) {
    throw new Error("Invalid response structure from AI");
  }

  parsed.analyzedAt = new Date().toISOString();

  return parsed;
}
