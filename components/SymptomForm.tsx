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
      <div className="text-center pt-10 pb-8 sm:pt-16 sm:pb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
          Describe what you feel.
          <br />
          <span className="text-primary">We&rsquo;ll read the chart.</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed px-2">
          Enter symptoms in your own words. Our Gemini-powered engine
          cross-references them against clinical patterns and returns a
          ranked read-out.
        </p>
      </div>

      {/* Form Card */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-md border border-border bg-surface shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow overflow-hidden">
          <div className="flex items-center px-4 sm:px-6 py-3 border-b border-dashed border-border">
            <span className="font-mono-chart text-[10px] tracking-[0.15em] uppercase text-muted">
              Patient Intake
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 pt-5 sm:pt-6">
            <label
              htmlFor="symptoms"
              className="flex items-baseline gap-2 font-mono-chart text-[11px] font-semibold tracking-wider uppercase text-foreground mb-2"
            >
              <span className="text-primary">01</span> Symptoms
            </label>
            <textarea
              id="symptoms"
              rows={5}
              maxLength={2000}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Example: I've had a dull ache in my lower back for 3 days, worsening when I sit down. Also feeling slight fatigue..."
              className="w-full rounded-sm border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none transition-colors resize-none"
              disabled={isLoading}
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label
                  htmlFor="age"
                  className="flex items-baseline gap-2 font-mono-chart text-[11px] font-semibold tracking-wider uppercase text-foreground mb-2"
                >
                  <span className="text-primary">02</span> Age
                </label>
                <input
                  id="age"
                  type="number"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="flex items-baseline gap-2 font-mono-chart text-[11px] font-semibold tracking-wider uppercase text-foreground mb-2"
                >
                  <span className="text-primary">03</span> Sex
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !symptoms.trim()}
              className="mt-6 w-full rounded-sm bg-primary py-3.5 text-sm font-mono-chart font-semibold tracking-wide uppercase text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100 cursor-pointer flex items-center justify-center gap-2"
            >
              Run Analysis
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6">
          <div className="trust-badge">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary shrink-0"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            Nothing stored
          </div>
          <div className="trust-badge">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Results in seconds
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 mx-auto max-w-2xl rounded-sm border border-[var(--alert)]/30 bg-[var(--alert-soft)] px-4 py-3 animate-fade-in">
          <p className="text-sm text-[var(--alert)]">{error}</p>
        </div>
      )}
    </div>
  );
}
