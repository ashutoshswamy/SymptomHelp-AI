'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Sparkles, 
  Brain, 
  Shield, 
  Clock, 
  ChevronRight,
  Activity,
  Heart,
  Zap,
  CheckCircle2,
  Users,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

export default function Home() {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI analyzes your symptoms with medical-grade precision and provides detailed insights.',
      gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)'
    },
    {
      icon: Activity,
      title: 'Confidence Metrics',
      description: 'Get detailed confidence scores, severity levels, and urgency ratings for each possible condition.',
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data stays private. We don\'t store your symptoms or analysis results on our servers.',
      gradient: 'linear-gradient(135deg, #10b981, #14b8a6)'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Receive comprehensive health insights within seconds. No waiting, no appointments needed.',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Enter Your Symptoms',
      description: 'Simply type or select from common symptoms you\'re experiencing'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI processes your symptoms against medical knowledge'
    },
    {
      number: '03',
      title: 'Get Insights',
      description: 'Receive detailed analysis with conditions, confidence, and recommendations'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Symptoms Analyzed' },
    { number: '99%', label: 'Uptime' },
    { number: '<3s', label: 'Response Time' }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <motion.nav 
        className="landing-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <Stethoscope size={24} />
            </div>
            <span>SymptomHelp AI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
          </div>
          <Link href="/analyze" className="nav-cta">
            <Sparkles size={16} />
            Try Now — Free
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-elements">
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
          <div className="hero-grid"></div>
        </div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-badge" variants={scaleIn}>
            <Zap size={14} />
            Powered by Advanced AI
          </motion.div>
          
          <motion.h1 className="hero-headline" variants={fadeInUp}>
            Understand Your Health
            <span className="hero-headline-gradient"> Symptoms Instantly</span>
          </motion.h1>
          
          <motion.p className="hero-subheadline" variants={fadeInUp}>
            Get AI-powered health insights in seconds. Enter your symptoms and receive 
            detailed analysis with confidence scores, severity levels, and personalized recommendations.
          </motion.p>

          <motion.div className="hero-cta-group" variants={fadeInUp}>
            <Link href="/analyze" className="hero-cta-primary">
              <Sparkles size={20} />
              Start Free Analysis
              <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="hero-cta-secondary">
              <MessageCircle size={18} />
              See How It Works
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={fadeIn}>
            <div className="hero-trust-avatars">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div 
                  key={i} 
                  className="trust-avatar"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Users size={16} />
                </motion.div>
              ))}
            </div>
            <p><strong>Join 50,000+</strong> users who trust SymptomHelp AI</p>
          </motion.div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-card-main">
            <div className="hero-card-header">
              <Activity size={20} />
              <span>Analysis Result</span>
            </div>
            <div className="hero-card-condition">
              <h4>Possible Condition</h4>
              <p>Viral Upper Respiratory Infection</p>
              <div className="hero-card-metrics">
                <div className="metric">
                  <span className="metric-label">Confidence</span>
                  <span className="metric-value">87%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Severity</span>
                  <span className="metric-value severity-low">Low</span>
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            className="hero-card-floating-1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <CheckCircle2 size={16} />
            <span>Rest recommended</span>
          </motion.div>
          <motion.div 
            className="hero-card-floating-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <Heart size={16} />
            <span>Monitor symptoms</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div 
          className="stats-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="stat-item"
              variants={scaleIn}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="stat-number">
                {stat.number}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">Features</span>
            <h2>Why Choose SymptomHelp AI?</h2>
            <p>Advanced technology meets healthcare insights for a smarter approach to understanding your symptoms.</p>
          </motion.div>

          <motion.div 
            className="features-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div 
                  className="feature-icon" 
                  style={{ background: feature.gradient }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon size={24} />
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">How It Works</span>
            <h2>Get Insights in 3 Simple Steps</h2>
            <p>Our streamlined process makes it easy to understand your symptoms quickly.</p>
          </motion.div>

          <motion.div 
            className="steps-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="step-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <ChevronRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="how-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/analyze" className="hero-cta-primary">
              <Sparkles size={20} />
              Try It Now — It&apos;s Free
            </Link>
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-glow"></div>
          <h2>Ready to Understand Your Symptoms?</h2>
          <p>Get instant AI-powered health insights. No sign-up required.</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/analyze" className="cta-button">
              <Sparkles size={20} />
              Start Free Analysis
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="logo-icon">
              <Stethoscope size={24} />
            </div>
            <span>SymptomHelp AI</span>
          </motion.div>
          <p className="footer-disclaimer">
            SymptomHelp AI provides general health information only and is not a substitute 
            for professional medical advice, diagnosis, or treatment. Always consult a qualified 
            healthcare provider for medical concerns.
          </p>
          <div className="footer-developer">
            <span>Built by</span>
            <a href="https://ashutoshswamy.in" target="_blank" rel="noopener noreferrer">Ashutosh Swamy</a>
            <div className="developer-links">
              <a href="https://github.com/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/ashutoshswamy" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
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

