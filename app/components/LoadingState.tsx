'use client';

import { Sparkles } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="loading-container">
      <div className="loading-header">
        <div className="loading-icon">
          <Sparkles size={24} className="sparkle-animate" />
        </div>
        <h3>Analyzing Your Symptoms</h3>
        <p>Our AI is reviewing your symptoms and matching them against medical knowledge...</p>
      </div>
      
      <div className="loading-cards">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="skeleton-header">
              <div className="skeleton-title"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-bar"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
