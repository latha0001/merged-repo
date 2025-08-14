import React, { useState, useEffect } from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import ReferralEngine from './components/modules/ReferralEngine';
import EngagementSurvey from './components/modules/EngagementSurvey';
import AnalyticsDashboard from './components/modules/AnalyticsDashboard';
import SupportFAQ from './components/modules/SupportFAQ';
import './styles/variables.css';
import './App.css';

function App() {
  const [currentModule, setCurrentModule] = useState('home');

  // Simple routing based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentModule(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderModule = () => {
    switch (currentModule) {
      case 'referral':
        return <ReferralEngine />;
      case 'engagement':
        return <EngagementSurvey />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'support':
        return <SupportFAQ />;
      default:
        return <HomePage/>;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {renderModule()}
      </main>
      <Footer />
    </div>
  );
}

// Home Page Component
const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Welcome to TheTop36</h1>
          <p className="hero-subtitle">
            Digital-vault store selling curated $19 bundles of public-domain content
          </p>
          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">🎫</span>
              <h3>Multi-Tier Raffle</h3>
              <p>Grand prize $10,000 + daily micro-draws</p>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <h3>Referral System</h3>
              <p>Earn bonus entries through referrals</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📦</span>
              <h3>Content Bundles</h3>
              <p>Curated public-domain content for $19</p>
            </div>
          </div>
        </div>
      </div>

      <div className="modules-section">
        <div className="container">
          <h2 className="section-title">Our Modules</h2>
          <div className="modules-grid">
            <div className="module-card">
              <h3>Referral Engine</h3>
              <p>Track your entries, share on social media, and manage referrals</p>
              <a href="#referral" className="module-link">Open Module</a>
            </div>
            
            <div className="module-card">
              <h3>Engagement Survey</h3>
              <p>Daily check-ins, surveys, and email notifications</p>
              <a href="#engagement" className="module-link">Open Module</a>
            </div>
            
            <div className="module-card">
              <h3>Analytics Dashboard</h3>
              <p>Track purchases, shares, referrals, and daily winners</p>
              <a href="#analytics" className="module-link">Open Module</a>
            </div>
            
            <div className="module-card">
              <h3>Support & FAQ</h3>
              <p>Live chat, contact forms, and searchable FAQ</p>
              <a href="#support" className="module-link">Open Module</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
