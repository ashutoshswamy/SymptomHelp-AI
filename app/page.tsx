'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Sparkles, 
  Brain, 
  Shield, 
  Clock, 
  ArrowRight,
  Activity,
  MessageCircle
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI analyzes your symptoms and provides detailed health insights.'
    },
    {
      icon: Activity,
      title: 'Confidence Metrics',
      description: 'Get confidence scores, severity levels, and urgency ratings for each condition.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data stays private. We don\'t store symptoms or analysis results.'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Receive comprehensive health insights within seconds. No waiting needed.'
    }
  ];

  const steps = [
    { number: '01', title: 'Enter Symptoms', description: 'Type or select the symptoms you\'re experiencing' },
    { number: '02', title: 'AI Analysis', description: 'Our AI processes your symptoms against medical knowledge' },
    { number: '03', title: 'Get Insights', description: 'Receive analysis with conditions, confidence, and recommendations' }
  ];

  return (
    <div className="landing-page">
      {/* Nav */}
      <motion.nav 
        className="landing-nav"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <Stethoscope size={18} />
            </div>
            <span>SymptomHelp AI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
          </div>
          <Link href="/analyze" className="nav-cta">
            <Sparkles size={14} />
            Try Now
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 className="hero-headline" variants={fadeIn}>
            Understand Your Health
            <span className="hero-headline-gradient"> Symptoms Instantly</span>
          </motion.h1>
          
          <motion.p className="hero-subheadline" variants={fadeIn}>
            Get AI-powered health insights in seconds. Enter your symptoms and receive 
            detailed analysis with confidence scores and personalized recommendations.
          </motion.p>

          <motion.div className="hero-cta-group" variants={fadeIn}>
            <Link href="/analyze" className="hero-cta-primary">
              <Sparkles size={16} />
              Start Free Analysis
              <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className="hero-cta-secondary">
              <MessageCircle size={16} />
              See How It Works
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            <span className="section-badge">Features</span>
            <h2>Why Choose SymptomHelp AI?</h2>
            <p>Advanced technology meets healthcare insights for smarter symptom understanding.</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            {features.map((feature, index) => (
              <motion.div key={index} className="feature-card" variants={fadeIn}>
                <div className="feature-icon">
                  <feature.icon size={20} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            transition={{ duration: 0.4 }}
          >
            <span className="section-badge">How It Works</span>
            <h2>Get Insights in 3 Simple Steps</h2>
            <p>Our streamlined process makes it easy to understand your symptoms quickly.</p>
          </motion.div>

          <motion.div 
            className="steps-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="step-card" variants={fadeIn}>
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="how-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/analyze" className="hero-cta-primary">
              <Sparkles size={16} />
              Try It Now — It&apos;s Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeIn}
          transition={{ duration: 0.4 }}
        >
          <h2>Ready to Understand Your Symptoms?</h2>
          <p>Get instant AI-powered health insights. No sign-up required.</p>
          <Link href="/analyze" className="cta-button">
            <Sparkles size={16} />
            Start Free Analysis
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-icon">
              <Stethoscope size={18} />
            </div>
            <span>SymptomHelp AI</span>
          </div>
          <p className="footer-disclaimer">
            SymptomHelp AI provides general health information only and is not a substitute 
            for professional medical advice, diagnosis, or treatment.
          </p>
          <div className="footer-developer">
            <span>Built by</span>
            <a href="https://ashutoshswamy.in" target="_blank" rel="noopener noreferrer">Ashutosh Swamy</a>
            <div className="developer-links">
              <a href="https://github.com/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} SymptomHelp AI. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
