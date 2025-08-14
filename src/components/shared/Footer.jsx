import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">TheTop36</h3>
            <p className="footer-description">
              Digital-vault store selling curated $19 bundles of public-domain content.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Modules</h4>
            <ul className="footer-links">
              <li><a href="/referral">Referral Engine</a></li>
              <li><a href="/engagement">Engagement Survey</a></li>
              <li><a href="/analytics">Analytics Dashboard</a></li>
              <li><a href="/support">Support & FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 TheTop36. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 