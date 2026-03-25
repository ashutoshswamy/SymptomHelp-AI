import { analyzeSymptoms } from "@/lib/gemini";
import type { SymptomInput } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SymptomInput;

    if (!body.symptoms || typeof body.symptoms !== "string" || !body.symptoms.trim()) {
      return Response.json(
        { error: "Invalid input", message: "Please describe your symptoms" },
        { status: 400 }
      );
    }

    if (body.symptoms.trim().length < 3) {
      return Response.json(
        { error: "Invalid input", message: "Please provide more detail about your symptoms" },
        { status: 400 }
      );
    }

    const result = await analyzeSymptoms({
      symptoms: body.symptoms.trim(),
      age: body.age,
      gender: body.gender,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return Response.json(
      { error: "Analysis failed", message },
      { status: 500 }
    );
  }
}
