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
      return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: CheckCircle2, label: 'Low' };
    case 'moderate':
      return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: AlertCircle, label: 'Moderate' };
    case 'high':
      return { color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', icon: AlertTriangle, label: 'High' };
    case 'critical':
      return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle, label: 'Critical' };
    default:
      return { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)', icon: AlertCircle, label: 'Unknown' };
  }
};

const getUrgencyConfig = (score: number) => {
  if (score <= 3) return { color: '#10b981', label: 'Low Urgency', bg: 'linear-gradient(135deg, #10b981, #059669)' };
  if (score <= 5) return { color: '#f59e0b', label: 'Moderate Urgency', bg: 'linear-gradient(135deg, #f59e0b, #d97706)' };
  if (score <= 7) return { color: '#f97316', label: 'High Urgency', bg: 'linear-gradient(135deg, #f97316, #ea580c)' };
  return { color: '#ef4444', label: 'Emergency', bg: 'linear-gradient(135deg, #ef4444, #dc2626)' };
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AnalysisResults({ analysis, analyzedSymptoms }: AnalysisResultsProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);
  const urgencyConfig = getUrgencyConfig(analysis.urgencyScore);

  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div 
        className="results-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="results-title">
          <Activity size={24} />
          <h2>Analysis Results</h2>
        </div>
        <p className="analyzed-symptoms">
          Based on: {analyzedSymptoms.join(', ')}
        </p>
      </motion.div>

      {/* Urgency Score Card */}
      <motion.div 
        className="urgency-card" 
        style={{ '--urgency-bg': urgencyConfig.bg } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <motion.div 
          className="urgency-score-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
        >
          <span className="urgency-number">{analysis.urgencyScore}</span>
          <span className="urgency-max">/10</span>
        </motion.div>
        <div className="urgency-info">
          <h3>{urgencyConfig.label}</h3>
          <p>Based on symptom combination and severity analysis</p>
        </div>
        <Clock size={40} className="urgency-icon" />
      </motion.div>

      {/* Conditions Grid */}
      <motion.div 
        className="conditions-section"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h3 className="section-title" variants={fadeInUp}>
          <Stethoscope size={20} />
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
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                layout
              >
                <div className="condition-header">
                  <div className="condition-title-row">
                    <h4>{condition.name}</h4>
                    <span 
                      className="severity-badge"
                      style={{ color: severityConfig.color, backgroundColor: severityConfig.bg }}
                    >
                      <SeverityIcon size={14} />
                      {severityConfig.label}
                    </span>
                  </div>
                  <motion.button 
                    className="expand-toggle"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </motion.button>
                </div>

                <p className="condition-description">{condition.description}</p>

                {/* Confidence Bar */}
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
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
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
                      transition={{ duration: 0.3 }}
                    >
                      {/* Matched Symptoms */}
                      <div className="detail-section">
                        <h5>Matched Symptoms</h5>
                        <motion.div 
                          className="tags-list"
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                        >
                          {condition.matchedSymptoms.map((symptom, i) => (
                            <motion.span 
                              key={i} 
                              className="detail-tag matched"
                              variants={fadeInUp}
                            >
                              {symptom}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>

                      {/* Additional Symptoms */}
                      {condition.additionalSymptoms.length > 0 && (
                        <div className="detail-section">
                          <h5>Other Symptoms to Watch</h5>
                          <motion.div 
                            className="tags-list"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                          >
                            {condition.additionalSymptoms.map((symptom, i) => (
                              <motion.span 
                                key={i} 
                                className="detail-tag additional"
                                variants={fadeInUp}
                              >
                                {symptom}
                              </motion.span>
                            ))}
                          </motion.div>
                        </div>
                      )}

                      {/* Recommended Actions */}
                      <div className="detail-section">
                        <h5>Recommended Actions</h5>
                        <ul className="actions-list">
                          {condition.recommendedActions.map((action, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              {action}
                            </motion.li>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="section-title">
          <Shield size={20} />
          General Recommendations
        </h3>
        <ul className="recommendations-list">
          {analysis.generalRecommendations.map((rec, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              <CheckCircle2 size={18} />
              <span>{rec}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* When to Seek Help */}
      <motion.div 
        className="warning-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="section-title warning">
          <AlertTriangle size={20} />
          Seek Immediate Medical Help If
        </h3>
        <ul className="warning-list">
          {analysis.whenToSeekHelp.map((warning, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.05 }}
            >
              <XCircle size={16} />
              <span>{warning}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Disclaimer */}
      <motion.div 
        className="disclaimer-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AlertCircle size={20} />
        <p>{analysis.disclaimer}</p>
      </motion.div>
    </motion.div>
  );
}

