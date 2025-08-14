import React, { useState, useEffect } from 'react';
import './ReferralEngine.css';

const ReferralEngine = () => {
  const [entries, setEntries] = useState(0);
  const [shares, setShares] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const [shareBoost, setShareBoost] = useState(0);
  const [referralBoost, setReferralBoost] = useState(0);

  // Calculate boosts
  useEffect(() => {
    const shareEntries = Math.min(shares * 0.2, 1); // 0.2 entries per share, max 5 shares
    const referralEntries = Math.min(referrals * 0.5, 2); // 0.5 entries per referral, max 4 referrals
    
    setShareBoost(shareEntries);
    setReferralBoost(referralEntries);
    setEntries(shareEntries + referralEntries);
  }, [shares, referrals]);

  const handleShare = (platform) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=Check out TheTop36.com - amazing digital content bundles!&url=https://thetop36.com`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=https://thetop36.com`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=https://thetop36.com`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      if (shares < 5) {
        setShares(prev => prev + 1);
      }
    }
  };

  const handleReferral = () => {
    if (referrals < 4) {
      setReferrals(prev => prev + 1);
    }
  };

  const generateReferralLink = () => {
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    return `https://thetop36.com/ref/${userId}`;
  };

  return (
    <div className="referral-engine">
      <div className="container">
        <h1 className="page-title">Referral & Odds Tracker</h1>
        
        {/* Live Entries Counter */}
        <div className="entries-counter">
          <div className="counter-card">
            <h2 className="counter-title">Your Total Entries</h2>
            <div className="counter-value">{entries.toFixed(1)}</div>
            <p className="counter-subtitle">Live tracking of your raffle entries</p>
          </div>
        </div>

        {/* Social Sharing Section */}
        <div className="section">
          <h2 className="section-title">Social Share Boosts</h2>
          <p className="section-description">
            Share TheTop36 and earn 0.2 entries per share (up to 5 shares)
          </p>
          
          <div className="share-stats">
            <div className="stat-item">
              <span className="stat-label">Shares Used:</span>
              <span className="stat-value">{shares}/5</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Entries from Shares:</span>
              <span className="stat-value">{shareBoost.toFixed(1)}</span>
            </div>
          </div>

          <div className="share-buttons">
            <button 
              className="share-btn twitter"
              onClick={() => handleShare('twitter')}
              disabled={shares >= 5}
            >
              Share on Twitter
            </button>
            <button 
              className="share-btn facebook"
              onClick={() => handleShare('facebook')}
              disabled={shares >= 5}
            >
              Share on Facebook
            </button>
            <button 
              className="share-btn linkedin"
              onClick={() => handleShare('linkedin')}
              disabled={shares >= 5}
            >
              Share on LinkedIn
            </button>
          </div>
        </div>

        {/* Referral Section */}
        <div className="section">
          <h2 className="section-title">Purchase Referrals</h2>
          <p className="section-description">
            Refer friends to purchase and earn 0.5 entries per referral (up to 4 referrals)
          </p>
          
          <div className="referral-stats">
            <div className="stat-item">
              <span className="stat-label">Referrals Used:</span>
              <span className="stat-value">{referrals}/4</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Entries from Referrals:</span>
              <span className="stat-value">{referralBoost.toFixed(1)}</span>
            </div>
          </div>

          <div className="referral-link-section">
            <h3>Your Referral Link</h3>
            <div className="referral-link-container">
              <input 
                type="text" 
                value={generateReferralLink()} 
                readOnly 
                className="referral-link-input"
              />
              <button className="copy-btn">Copy</button>
            </div>
            <button 
              className="referral-btn"
              onClick={handleReferral}
              disabled={referrals >= 4}
            >
              Simulate Referral Purchase
            </button>
          </div>
        </div>

        {/* Prize Information */}
        <div className="section">
          <h2 className="section-title">Raffle Prizes</h2>
          <div className="prize-grid">
            <div className="prize-card">
              <h3>Grand Prize</h3>
              <div className="prize-amount">$10,000</div>
              <p>Cash prize for the lucky winner</p>
            </div>
            <div className="prize-card">
              <h3>Secondary Prizes</h3>
              <div className="prize-amount">$500 - $2,000</div>
              <p>Multiple tiers available</p>
            </div>
            <div className="prize-card">
              <h3>Daily Micro-Draws</h3>
              <div className="prize-amount">$50 - $200</div>
              <p>Daily chances to win</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralEngine; 