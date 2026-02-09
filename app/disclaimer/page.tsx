import Link from 'next/link';
import { Stethoscope, ArrowLeft, AlertTriangle, Shield, Info, Heart } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | SymptomHelp AI',
  description: 'Important disclaimer and terms of use for SymptomHelp AI symptom analysis tool.',
};

export default function DisclaimerPage() {
  return (
    <div className="disclaimer-page">
      {/* Header */}
      <header className="disclaimer-header">
        <div className="disclaimer-header-content">
          <Link href="/" className="disclaimer-logo">
            <div className="logo-icon">
              <Stethoscope size={24} />
            </div>
            <span>SymptomHelp AI</span>
          </Link>
        </div>
      </header>

      <main className="disclaimer-main">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="disclaimer-content">
          <div className="disclaimer-hero">
            <AlertTriangle size={48} className="disclaimer-icon" />
            <h1>Disclaimer</h1>
            <p className="disclaimer-subtitle">
              Please read this disclaimer carefully before using SymptomHelp AI
            </p>
          </div>

          <div className="disclaimer-sections">
            {/* Not Medical Advice */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <Info size={24} />
              </div>
              <h2>Not Medical Advice</h2>
              <p>
                SymptomHelp AI is designed for <strong>informational purposes only</strong>. 
                The information provided by this application should not be considered as medical 
                advice, diagnosis, or treatment recommendations. This tool is not a substitute 
                for professional medical consultation, examination, or treatment.
              </p>
            </section>

            {/* No Doctor-Patient Relationship */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <Heart size={24} />
              </div>
              <h2>No Doctor-Patient Relationship</h2>
              <p>
                Using SymptomHelp AI does not create a doctor-patient relationship between you 
                and the developers of this application. The AI-generated results are based on 
                general information and algorithms, not on a personal examination of your 
                specific medical condition.
              </p>
            </section>

            {/* Consult Healthcare Professionals */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <Shield size={24} />
              </div>
              <h2>Always Consult Healthcare Professionals</h2>
              <p>
                If you are experiencing symptoms or have health concerns, you should always 
                consult with a qualified healthcare provider. <strong>Do not delay seeking 
                medical attention</strong> based on information from this application. In case 
                of a medical emergency, please call your local emergency services immediately.
              </p>
            </section>

            {/* AI Limitations */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <AlertTriangle size={24} />
              </div>
              <h2>AI Limitations</h2>
              <p>
                The AI technology used in SymptomHelp AI has inherent limitations. It cannot:
              </p>
              <ul>
                <li>Perform physical examinations</li>
                <li>Access your complete medical history</li>
                <li>Consider all possible factors affecting your health</li>
                <li>Guarantee accuracy of the analysis</li>
                <li>Replace the expertise of trained medical professionals</li>
              </ul>
            </section>

            {/* User Responsibility */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <Info size={24} />
              </div>
              <h2>User Responsibility</h2>
              <p>
                By using SymptomHelp AI, you acknowledge and agree that:
              </p>
              <ul>
                <li>You use this service at your own risk</li>
                <li>You will not rely solely on this tool for medical decisions</li>
                <li>You understand the limitations of AI-based health analysis</li>
                <li>You will seek professional medical advice for any health concerns</li>
              </ul>
            </section>

            {/* Liability */}
            <section className="disclaimer-section">
              <div className="section-icon">
                <Shield size={24} />
              </div>
              <h2>Limitation of Liability</h2>
              <p>
                The developers and operators of SymptomHelp AI shall not be held liable for 
                any damages, injuries, or losses that may result from the use of this application. 
                This includes, but is not limited to, any direct, indirect, incidental, or 
                consequential damages arising from reliance on the information provided.
              </p>
            </section>
          </div>

          <div className="disclaimer-footer-note">
            <p>
              <strong>Last Updated:</strong> February 2026
            </p>
            <p>
              By using SymptomHelp AI, you acknowledge that you have read, understood, and 
              agree to this disclaimer.
            </p>
          </div>

          <div className="disclaimer-cta">
            <Link href="/analyze" className="disclaimer-cta-button">
              I Understand, Continue to App
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="disclaimer-page-footer">
        <p>© {new Date().getFullYear()} SymptomHelp AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
