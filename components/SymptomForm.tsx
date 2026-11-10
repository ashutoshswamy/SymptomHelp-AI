"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { sileo } from "sileo";
import type { AnalysisResponse } from "@/lib/types";
import { loadProfile, saveAnalysis, saveProfile } from "@/lib/store";
import { useAuth } from "./AuthProvider";
import { LoadingState } from "./LoadingState";
import { ResultsDisplay } from "./ResultsDisplay";

// The checker itself. Rendered inside <RequireAuth>, so a signed-in, consented user is assumed.
export function SymptomForm() {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefill age and sex from the saved profile.
  useEffect(() => {
    if (!user) return;
    let live = true;
    loadProfile(user.uid)
      .then((p) => {
        if (!live) return;
        if (p.age !== undefined) setAge(String(p.age));
        if (p.gender) setGender(p.gender);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setResults(null);

    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      // Saving must never block showing the result.
      const input = { symptoms, age: age ? Number(age) : undefined, gender: gender || undefined };
      Promise.all([saveAnalysis(user.uid, input, data), saveProfile(user.uid, input)]).catch((e) => {
        console.error("Could not save history", e);
        sileo.warning({
          title: "Not saved to history",
          description: "Your result is shown, but we couldn't save it to your account.",
        });
      });
    } catch (err) {
      sileo.error({
        title: "Analysis failed",
        description: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setSymptoms("");
  };

  if (isLoading) return <LoadingState symptoms={symptoms} />;
  if (results) return <ResultsDisplay results={results} symptoms={symptoms} onReset={handleReset} />;

  return (
    <div className="mx-auto max-w-6xl">
      <section className="grid gap-10 pt-8 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div className="lg:col-span-7 lg:pt-4">
          <h1 className="rise-in text-[clamp(3.25rem,11vw,6rem)] leading-[0.95] text-ink">
            Tell us
            <br />
            what you
            <br />
            <span className="text-tab-ink dark:text-tab">feel.</span>
          </h1>
          <p
            className="rise-in mt-6 max-w-[34ch] text-lg text-ink-soft sm:text-xl"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            Describe your symptoms in your own words. Get a ranked list of what it could be and when
            to see a doctor.
          </p>
          <p className="mt-6 max-w-[40ch] text-ink-soft">
            If this is an emergency, call your local emergency number now (112 in India).
          </p>
        </div>

        <div className="lg:col-span-5 lg:mt-10">
          <form
            onSubmit={handleSubmit}
            className="strip press-in p-5 sm:p-7"
            style={{ "--delay": "150ms" } as React.CSSProperties}
          >
            <h2 className="text-3xl text-ink">Your symptoms</h2>

            <label htmlFor="symptoms" className="mt-5 mb-2 block font-bold text-ink">
              What is going on?
            </label>
            <textarea
              id="symptoms"
              rows={5}
              maxLength={2000}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="A dull ache in my lower back for 3 days, worse when I sit. Some tiredness too."
              className="field resize-none"
              disabled={isLoading}
              required
            />

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="mb-2 block font-bold text-ink">
                  Age <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Years"
                  className="field"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="gender" className="mb-2 block font-bold text-ink">
                  Sex <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="field cursor-pointer appearance-none pr-10"
                    disabled={isLoading}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <CaretDown
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2a1233]"
                  />
                </div>
              </div>
            </div>


            <div className="perforation mt-7 pt-6">
              <button type="submit" disabled={isLoading || !symptoms.trim()} className="tab w-full">
                Analyze symptoms
                <ArrowRight size={24} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
