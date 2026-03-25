"use client";

import { useState, type FormEvent } from "react";
import type { AnalysisResponse } from "@/lib/types";
import { LoadingState } from "./LoadingState";
import { ResultsDisplay } from "./ResultsDisplay";

export function SymptomForm() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms,
          age: age ? Number(age) : undefined,
          gender: gender || undefined,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Analysis failed");
      }

      const data: AnalysisResponse = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSymptoms("");
    setAge("");
    setGender("");
    setError(null);
  };

  if (isLoading) {
    return <LoadingState symptoms={symptoms} />;
  }

  if (results) {
    return (
      <ResultsDisplay
        results={results}
        symptoms={symptoms}
        onReset={handleReset}
      />
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center pt-8 pb-8 sm:pt-16 sm:pb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Your Health
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
            Decoded.
          </span>
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed px-2">
          Describe your symptoms with clinical precision using our
          Gemini-powered diagnostic engine.
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8 shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <label
                htmlFor="symptoms"
                className="text-xs font-semibold tracking-wider uppercase text-primary"
              >
                Describe Your Symptoms
              </label>
            </div>
            <textarea
              id="symptoms"
              rows={5}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Example: I've had a dull ache in my lower back for 3 days, worsening when I sit down. Also feeling slight fatigue..."
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none transition-all resize-none"
              disabled={isLoading}
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label
                  htmlFor="age"
                  className="block text-xs font-semibold tracking-wider uppercase text-primary mb-2"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-xs font-semibold tracking-wider uppercase text-primary mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 focus:outline-none transition-all appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !symptoms.trim()}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:brightness-100 cursor-pointer flex items-center justify-center gap-2"
            >
              Analyze Symptoms
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13 3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <div className="trust-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary shrink-0"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            Privacy Encrypted
          </div>
          <div className="trust-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary shrink-0"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Clinical Standards
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800/50 dark:bg-red-950/30 animate-fade-in">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
