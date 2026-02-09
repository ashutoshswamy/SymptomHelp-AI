import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { symptoms } = await request.json();

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one symptom' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    const prompt = `You are a medical AI assistant. Analyze the following symptoms and provide possible health conditions.

SYMPTOMS: ${symptoms.join(', ')}

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks, just raw JSON):
{
  "conditions": [
    {
      "name": "Condition Name",
      "description": "Brief description of the condition",
      "confidence": 85,
      "severity": "moderate",
      "matchedSymptoms": ["symptom1", "symptom2"],
      "additionalSymptoms": ["other symptoms to watch for"],
      "recommendedActions": ["action1", "action2"]
    }
  ],
  "urgencyScore": 6,
  "urgencyLevel": "moderate",
  "generalRecommendations": ["general advice 1", "general advice 2"],
  "disclaimer": "This is not a substitute for professional medical advice.",
  "whenToSeekHelp": ["warning sign 1", "warning sign 2"]
}

Rules:
- Provide 3-5 possible conditions
- Confidence should be a number 0-100
- Severity can be: "low", "moderate", "high", "critical"
- Urgency score is 1-10 (1=not urgent, 10=emergency)
- Urgency level can be: "low", "moderate", "high", "emergency"
- Be thorough but concise
- Always include safety disclaimers`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let analysisData;
    try {
      // Clean up the response - remove any markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisData = JSON.parse(cleanedText);
    } catch {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
      analyzedSymptoms: symptoms,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symptoms. Please try again.' },
      { status: 500 }
    );
  }
}
