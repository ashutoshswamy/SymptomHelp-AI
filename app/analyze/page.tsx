'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import SymptomInput from '../components/SymptomInput';
import LoadingState from '../components/LoadingState';
import AnalysisResults from '../components/AnalysisResults';
import { AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AnalysisResponse {
  success: boolean;
  analysis: {
    conditions: Array<{
      name: string;
      description: string;
      confidence: number;
      severity: 'low' | 'moderate' | 'high' | 'critical';
      matchedSymptoms: string[];
      additionalSymptoms: string[];
      recommendedActions: string[];
    }>;
    urgencyScore: number;
    urgencyLevel: string;
    generalRecommendations: string[];
    disclaimer: string;
    whenToSeekHelp: string[];
  };
  analyzedSymptoms: string[];
  error?: string;
}

export default function AnalyzePage() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (symptoms.length === 0) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze symptoms');
      }

      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setSymptoms([]);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {!results && !isLoading && (
            <motion.div
              key="input-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="hero-section" style={{ marginTop: '0.5rem' }}>
                <motion.div 
                  className="hero-badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Sparkles size={14} />
                  AI-Powered Health Insights
                </motion.div>
                <h1 className="hero-title">Understand Your Symptoms</h1>
                <p className="hero-description">
                  Enter your symptoms below and get instant AI-powered analysis with 
                  confidence ratings, severity levels, and personalized recommendations.
                </p>
              </div>
              
              <SymptomInput
                symptoms={symptoms}
                onSymptomsChange={setSymptoms}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState />
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              className="error-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle size={22} />
              <h3>Analysis Failed</h3>
              <p>{error}</p>
              <button onClick={handleNewAnalysis} className="retry-button">
                Try Again
              </button>
            </motion.div>
          )}

          {results && results.success && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnalysisResults 
                analysis={results.analysis} 
                analyzedSymptoms={results.analyzedSymptoms}
              />
              <div className="new-analysis-section">
                <button 
                  onClick={handleNewAnalysis} 
                  className="new-analysis-button"
                >
                  <Sparkles size={16} />
                  Start New Analysis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="app-footer">
        <p>
          SymptomHelp AI provides general health information only. 
          Always consult a healthcare professional for medical advice.
        </p>
      </footer>
    </div>
  );
}
