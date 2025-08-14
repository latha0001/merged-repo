import React, { useState, useEffect } from 'react';
import './EngagementSurvey.css';

const EngagementSurvey = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInStreak, setCheckInStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyResponses, setSurveyResponses] = useState({});
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Check if user has checked in today
  useEffect(() => {
    const today = new Date().toDateString();
    const storedLastCheckIn = localStorage.getItem('lastCheckIn');
    
    if (storedLastCheckIn === today) {
      setIsCheckedIn(true);
      setLastCheckIn(today);
    }
    
    const streak = localStorage.getItem('checkInStreak') || 0;
    setCheckInStreak(parseInt(streak));
  }, []);

  const handleDailyCheckIn = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    setIsCheckedIn(true);
    setLastCheckIn(today);
    localStorage.setItem('lastCheckIn', today);
    
    // Update streak
    if (lastCheckIn === yesterday || checkInStreak === 0) {
      const newStreak = checkInStreak + 1;
      setCheckInStreak(newStreak);
      localStorage.setItem('checkInStreak', newStreak.toString());
    }
    
    // Show survey after check-in
    setTimeout(() => {
      setShowSurvey(true);
    }, 1000);
  };

  const handleSurveyResponse = (questionId, response) => {
    setSurveyResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleSurveySubmit = () => {
    // Here you would typically send survey responses to your backend
    console.log('Survey responses:', surveyResponses);
    setShowSurvey(false);
    setSurveyResponses({});
    
    // Show success message
    alert('Thank you for your feedback! You\'ve earned bonus entries for completing the survey.');
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    if (!emailNotifications) {
      // Request notification permission
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted');
          }
        });
      }
    }
  };

  const surveyQuestions = [
    {
      id: 'satisfaction',
      question: 'How satisfied are you with TheTop36 experience?',
      type: 'rating',
      options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
    },
    {
      id: 'content_quality',
      question: 'How would you rate the quality of the content bundles?',
      type: 'rating',
      options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
    },
    {
      id: 'recommendation',
      question: 'How likely are you to recommend TheTop36 to a friend?',
      type: 'rating',
      options: ['Not at all', 'Unlikely', 'Maybe', 'Likely', 'Very Likely']
    },
    {
      id: 'improvement',
      question: 'What would you like to see improved?',
      type: 'text',
      placeholder: 'Share your suggestions...'
    }
  ];

  return (
    <div className="engagement-survey">
      <div className="container">
        <h1 className="page-title">Daily Engagement & Survey</h1>
        
        {/* Daily Check-In Section */}
        <div className="check-in-section">
          <div className="check-in-card">
            <h2 className="section-title">Daily Check-In</h2>
            <p className="section-description">
              Check in daily to maintain your streak and earn bonus entries!
            </p>
            
            <div className="streak-info">
              <div className="streak-counter">
                <span className="streak-number">{checkInStreak}</span>
                <span className="streak-label">Day Streak</span>
              </div>
              
              <div className="check-in-status">
                {isCheckedIn ? (
                  <div className="checked-in">
                    <span className="check-icon">✓</span>
                    <span>Checked in today!</span>
                  </div>
                ) : (
                  <div className="not-checked-in">
                    <span>Ready to check in</span>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              className={`check-in-btn ${isCheckedIn ? 'checked' : ''}`}
              onClick={handleDailyCheckIn}
              disabled={isCheckedIn}
            >
              {isCheckedIn ? 'Already Checked In' : 'Check In Today'}
            </button>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="section">
          <h2 className="section-title">Email Notifications</h2>
          <p className="section-description">
            Stay updated with daily reminders and exclusive offers
          </p>
          
          <div className="notification-toggle">
            <label className="toggle-label">
              <input 
                type="checkbox" 
                checked={emailNotifications}
                onChange={toggleEmailNotifications}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">
                {emailNotifications ? 'Notifications Enabled' : 'Enable Daily Reminders'}
              </span>
            </label>
          </div>
        </div>

        {/* Survey Section */}
        {showSurvey && (
          <div className="survey-section">
            <div className="survey-card">
              <h2 className="section-title">Quick Survey</h2>
              <p className="section-description">
                Help us improve by answering a few questions. Complete the survey for bonus entries!
              </p>
              
              <div className="survey-questions">
                {surveyQuestions.map((question) => (
                  <div key={question.id} className="question-item">
                    <label className="question-label">{question.question}</label>
                    
                    {question.type === 'rating' ? (
                      <div className="rating-options">
                        {question.options.map((option, index) => (
                          <label key={index} className="rating-option">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                              className="rating-input"
                            />
                            <span className="rating-text">{option}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <textarea
                        placeholder={question.placeholder}
                        onChange={(e) => handleSurveyResponse(question.id, e.target.value)}
                        className="survey-textarea"
                        rows="3"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="survey-actions">
                <button 
                  className="survey-submit-btn"
                  onClick={handleSurveySubmit}
                >
                  Submit Survey
                </button>
                <button 
                  className="survey-skip-btn"
                  onClick={() => setShowSurvey(false)}
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="section">
          <h2 className="section-title">Your Engagement Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{checkInStreak}</div>
              <div className="stat-label">Day Streak</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{Object.keys(surveyResponses).length}</div>
              <div className="stat-label">Surveys Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{emailNotifications ? 'On' : 'Off'}</div>
              <div className="stat-label">Notifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementSurvey; 