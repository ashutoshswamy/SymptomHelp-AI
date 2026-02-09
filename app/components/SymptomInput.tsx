'use client';

import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Search, Sparkles } from 'lucide-react';

interface SymptomInputProps {
  symptoms: string[];
  onSymptomsChange: (symptoms: string[]) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const COMMON_SYMPTOMS = [
  'Headache', 'Fever', 'Fatigue', 'Cough', 'Nausea',
  'Dizziness', 'Chest Pain', 'Shortness of Breath', 'Back Pain',
  'Sore Throat', 'Runny Nose', 'Body Aches', 'Chills', 'Vomiting'
];

export default function SymptomInput({
  symptoms,
  onSymptomsChange,
  onAnalyze,
  isLoading
}: SymptomInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSymptom = (symptom: string) => {
    const trimmed = symptom.trim().toLowerCase();
    if (trimmed && !symptoms.map(s => s.toLowerCase()).includes(trimmed)) {
      onSymptomsChange([...symptoms, symptom.trim()]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeSymptom = (index: number) => {
    onSymptomsChange(symptoms.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSymptom(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && symptoms.length > 0) {
      removeSymptom(symptoms.length - 1);
    }
  };

  const filteredSuggestions = COMMON_SYMPTOMS.filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) &&
    !symptoms.map(sym => sym.toLowerCase()).includes(s.toLowerCase())
  );

  return (
    <motion.div 
      className="symptom-input-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="input-header">
        <h2>Enter Your Symptoms</h2>
        <p>Describe what you&apos;re experiencing for an AI-powered analysis</p>
      </div>

      <div className="input-wrapper">
        <div className="tags-container">
          <AnimatePresence mode="popLayout">
            {symptoms.map((symptom, index) => (
              <motion.span 
                key={symptom} 
                className="symptom-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {symptom}
                <motion.button
                  type="button"
                  onClick={() => removeSymptom(index)}
                  className="tag-remove"
                  aria-label={`Remove ${symptom}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </motion.button>
              </motion.span>
            ))}
          </AnimatePresence>
          <div className="input-field-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(inputValue.length > 0 || symptoms.length === 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={symptoms.length === 0 ? "Type a symptom..." : "Add more..."}
              className="symptom-input"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <AnimatePresence>
          {showSuggestions && (filteredSuggestions.length > 0 || (inputValue === '' && symptoms.length === 0)) && (
            <motion.div 
              className="suggestions-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="suggestions-header">
                <Search size={14} />
                <span>Common Symptoms</span>
              </div>
              {(inputValue === '' ? COMMON_SYMPTOMS : filteredSuggestions).slice(0, 8).map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  type="button"
                  className="suggestion-item"
                  onMouseDown={() => addSymptom(suggestion)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ x: 4, backgroundColor: 'var(--surface-light)' }}
                >
                  <Plus size={14} />
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {symptoms.length > 0 && (
          <motion.div 
            className="input-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              type="button"
              onClick={() => onSymptomsChange([])}
              className="clear-button"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Clear All
            </motion.button>
            <motion.button
              type="button"
              onClick={onAnalyze}
              className="analyze-button"
              disabled={isLoading || symptoms.length === 0}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={18} />
              {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

