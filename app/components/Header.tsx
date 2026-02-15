'use client';

import { Stethoscope } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <Stethoscope size={20} />
          </div>
          <div className="logo-text">
            <h1>SymptomHelp AI</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
