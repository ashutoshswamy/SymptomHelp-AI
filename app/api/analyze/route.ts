import { analyzeSymptoms } from "@/lib/gemini";
import type { SymptomInput } from "@/lib/types";
import { hasConsent, verifyIdToken } from "@/lib/verifyToken";

const MAX_SYMPTOMS_LENGTH = 2000;
const VALID_GENDERS = new Set(["male", "female", "other"]);

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const uid = token ? await verifyIdToken(token) : null;
  if (!uid) {
    return Response.json(
      { error: "Unauthorized", message: "Please sign in to run an analysis" },
      { status: 401 }
    );
  }

  if (!(await hasConsent(uid, token!))) {
    return Response.json(
      { error: "Consent required", message: "Please confirm you are 18 or older and accept the Terms and Privacy Policy" },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as SymptomInput;

    if (!body.symptoms || typeof body.symptoms !== "string" || !body.symptoms.trim()) {
      return Response.json(
        { error: "Invalid input", message: "Please describe your symptoms" },
        { status: 400 }
      );
    }

    const symptoms = body.symptoms.trim();

    if (symptoms.length < 3) {
      return Response.json(
        { error: "Invalid input", message: "Please provide more detail about your symptoms" },
        { status: 400 }
      );
    }

    if (symptoms.length > MAX_SYMPTOMS_LENGTH) {
      return Response.json(
        { error: "Invalid input", message: "Please keep your description under 2000 characters" },
        { status: 400 }
      );
    }

    let age: number | undefined;
    if (body.age !== undefined) {
      const parsedAge = Number(body.age);
      if (!Number.isFinite(parsedAge) || parsedAge < 0 || parsedAge > 120) {
        return Response.json(
          { error: "Invalid input", message: "Please provide a valid age between 0 and 120" },
          { status: 400 }
        );
      }
      age = parsedAge;
    }

    const gender =
      typeof body.gender === "string" && VALID_GENDERS.has(body.gender)
        ? body.gender
        : undefined;

    const result = await analyzeSymptoms({ symptoms, age, gender });

    return Response.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return Response.json(
      { error: "Analysis failed", message: "We couldn't complete the analysis. Please try again." },
      { status: 500 }
    );
  }
}
