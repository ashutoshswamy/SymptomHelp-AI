'use client';

import { Stethoscope } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <Stethoscope size={28} />
          </div>
          <div className="logo-text">
            <h1>SymptomHelp AI</h1>
            <p>Intelligent Symptom Analysis</p>
          </div>
        </div>
        <div className="header-badge">
          <span className="badge-dot"></span>
          Powered by Advanced AI
        </div>
      </div>
    </header>
  );
}
