'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Activity,
  Clock,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Shield
} from 'lucide-react';
import { useState } from 'react';

interface Condition {
  name: string;
  description: string;
  confidence: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  matchedSymptoms: string[];
  additionalSymptoms: string[];
  recommendedActions: string[];
}

interface AnalysisData {
  conditions: Condition[];
  urgencyScore: number;
  urgencyLevel: string;
  generalRecommendations: string[];
  disclaimer: string;
  whenToSeekHelp: string[];
}

interface AnalysisResultsProps {
  analysis: AnalysisData;
  analyzedSymptoms: string[];
}

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case 'low':
      return { color: '#16a34a', bg: 'rgba(22, 163, 74, 0.06)', icon: CheckCircle2, label: 'Low' };
    case 'moderate':
      return { color: '#d97706', bg: 'rgba(217, 119, 6, 0.06)', icon: AlertCircle, label: 'Moderate' };
    case 'high':
      return { color: '#ea580c', bg: 'rgba(234, 88, 12, 0.06)', icon: AlertTriangle, label: 'High' };
    case 'critical':
      return { color: '#dc2626', bg: 'rgba(220, 38, 38, 0.06)', icon: XCircle, label: 'Critical' };
    default:
      return { color: '#71717a', bg: 'rgba(113, 113, 122, 0.06)', icon: AlertCircle, label: 'Unknown' };
  }
};

const getUrgencyConfig = (score: number) => {
  if (score <= 3) return { color: '#16a34a', label: 'Low Urgency', bg: 'linear-gradient(135deg, #16a34a, #15803d)' };
  if (score <= 5) return { color: '#d97706', label: 'Moderate Urgency', bg: 'linear-gradient(135deg, #d97706, #b45309)' };
  if (score <= 7) return { color: '#ea580c', label: 'High Urgency', bg: 'linear-gradient(135deg, #ea580c, #c2410c)' };
  return { color: '#dc2626', label: 'Emergency', bg: 'linear-gradient(135deg, #dc2626, #b91c1c)' };
};

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

export default function AnalysisResults({ analysis, analyzedSymptoms }: AnalysisResultsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);
  const urgencyConfig = getUrgencyConfig(analysis.urgencyScore);

  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="results-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="results-title">
          <Activity size={20} />
          <h2>Analysis Results</h2>
        </div>
        <p className="analyzed-symptoms">
          Based on: {analyzedSymptoms.join(', ')}
        </p>
      </motion.div>

      {/* Urgency Score */}
      <motion.div 
        className="urgency-card" 
        style={{ '--urgency-bg': urgencyConfig.bg } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <div className="urgency-score-circle">
          <span className="urgency-number">{analysis.urgencyScore}</span>
          <span className="urgency-max">/10</span>
        </div>
        <div className="urgency-info">
          <h3>{urgencyConfig.label}</h3>
          <p>Based on symptom combination and severity analysis</p>
        </div>
      </motion.div>

      {/* Conditions */}
      <motion.div 
        className="conditions-section"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.h3 className="section-title" variants={fadeIn}>
          <Stethoscope size={18} />
          Possible Conditions
        </motion.h3>
        <div className="conditions-grid">
          {analysis.conditions.map((condition, index) => {
            const severityConfig = getSeverityConfig(condition.severity);
            const SeverityIcon = severityConfig.icon;
            const isExpanded = expandedCard === index;

            return (
              <motion.div 
                key={index} 
                className={`condition-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                variants={fadeIn}
                layout
              >
                <div className="condition-header">
                  <div className="condition-title-row">
                    <h4>{condition.name}</h4>
                    <span 
                      className="severity-badge"
                      style={{ color: severityConfig.color, backgroundColor: severityConfig.bg }}
                    >
                      <SeverityIcon size={12} />
                      {severityConfig.label}
                    </span>
                  </div>
                  <button className="expand-toggle">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                <p className="condition-description">{condition.description}</p>

                <div className="confidence-section">
                  <div className="confidence-label">
                    <span>Confidence</span>
                    <span className="confidence-value">{condition.confidence}%</span>
                  </div>
                  <div className="confidence-bar">
                    <motion.div 
                      className="confidence-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${condition.confidence}%` }}
                      transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: 'easeOut' }}
                      style={{ backgroundColor: severityConfig.color }}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      className="condition-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="detail-section">
                        <h5>Matched Symptoms</h5>
                        <div className="tags-list">
                          {condition.matchedSymptoms.map((symptom, i) => (
                            <span key={i} className="detail-tag matched">{symptom}</span>
                          ))}
                        </div>
                      </div>

                      {condition.additionalSymptoms.length > 0 && (
                        <div className="detail-section">
                          <h5>Other Symptoms to Watch</h5>
                          <div className="tags-list">
                            {condition.additionalSymptoms.map((symptom, i) => (
                              <span key={i} className="detail-tag additional">{symptom}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="detail-section">
                        <h5>Recommended Actions</h5>
                        <ul className="actions-list">
                          {condition.recommendedActions.map((action, i) => (
                            <li key={i}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* General Recommendations */}
      <motion.div 
        className="recommendations-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="section-title">
          <Shield size={18} />
          General Recommendations
        </h3>
        <ul className="recommendations-list">
          {analysis.generalRecommendations.map((rec, index) => (
            <li key={index}>
              <CheckCircle2 size={16} />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* When to Seek Help */}
      <motion.div 
        className="warning-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title warning">
          <AlertTriangle size={18} />
          Seek Immediate Medical Help If
        </h3>
        <ul className="warning-list">
          {analysis.whenToSeekHelp.map((warning, index) => (
            <li key={index}>
              <XCircle size={14} />
              <span>{warning}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Disclaimer */}
      <motion.div 
        className="disclaimer-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <AlertCircle size={16} />
        <p>{analysis.disclaimer}</p>
      </motion.div>
    </motion.div>
  );
}
