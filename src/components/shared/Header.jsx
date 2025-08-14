import React from 'react';
import './Header.css';

const Header = () => {
  const modules = [
    { name: 'Referral Engine', path: '#referral' },
    { name: 'Engagement Survey', path: '#engagement' },
    { name: 'Analytics Dashboard', path: '#analytics' },
    { name: 'Support & FAQ', path: '#support' }
  ];

  const handleLogoClick = () => {
    window.location.hash = '';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src="./assets/logo.svg" alt="TheTop36" className="logo-image" onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }} />
          <div className="logo-fallback" style={{display: 'none'}}>
            <span className="logo-text">TheTop36</span>
          </div>
        </div>
        
        <nav className="navigation">
          <ul className="nav-list">
            {modules.map((module) => (
              <li key={module.path} className="nav-item">
                <a href={module.path} className="nav-link">
                  {module.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 