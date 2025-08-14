import React, { useState } from 'react';
import './SupportFAQ.css';

const SupportFAQ = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [optOutReason, setOptOutReason] = useState('');

  const faqData = [
    {
      id: 1,
      question: 'How does TheTop36 work?',
      answer: 'TheTop36 is a digital-vault store that sells curated $19 bundles of public-domain content. Each purchase qualifies you for our multi-tier raffle with a grand prize of $10,000, plus daily micro-draws and referral-boosted odds across a 45-day cycle.'
    },
    {
      id: 2,
      question: 'How do I earn more raffle entries?',
      answer: 'You can earn additional entries through social sharing (0.2 entries per share, up to 5 shares) and purchase referrals (0.5 entries per referral, up to 4 referrals). Daily check-ins and completing surveys also provide bonus entries.'
    },
    {
      id: 3,
      question: 'When are the raffle draws held?',
      answer: 'We hold daily micro-draws for smaller prizes ($50-$200) and a major draw at the end of each 45-day cycle for the grand prize of $10,000 and secondary prizes of $500-$2,000.'
    },
    {
      id: 4,
      question: 'How do I track my entries?',
      answer: 'You can track your total entries in real-time through our Referral & Odds Tracker. This shows your entries from purchases, social shares, referrals, and daily check-ins.'
    },
    {
      id: 5,
      question: 'What\'s included in the content bundles?',
      answer: 'Each $19 bundle contains carefully curated public-domain content including ebooks, templates, graphics, and other digital resources. The content is legally free to use and distribute.'
    },
    {
      id: 6,
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the chat widget, contact form, or by emailing support@thetop36.com. We typically respond within 24 hours.'
    },
    {
      id: 7,
      question: 'Can I opt out of communications?',
      answer: 'Yes, you can opt out of email communications at any time. Use the opt-out form to specify your preferences and reason for opting out.'
    },
    {
      id: 8,
      question: 'Are the raffles legitimate?',
      answer: 'Absolutely! All our raffles are conducted fairly and transparently. Winners are selected using a verified random number generator, and all results are publicly posted.'
    }
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: 'Thank you for your message! Our support team will get back to you within 24 hours. In the meantime, you might find the answer in our FAQ section.',
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleOptOut = (e) => {
    e.preventDefault();
    // Here you would typically send the opt-out request to your backend
    console.log('Opt-out request:', optOutReason);
    alert('You have been successfully opted out of communications. We\'re sorry to see you go!');
    setOptOutReason('');
  };

  return (
    <div className="support-faq">
      <div className="container">
        <h1 className="page-title">Support & FAQ</h1>
        
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
          <button 
            className={`tab-btn ${activeTab === 'optout' ? 'active' : ''}`}
            onClick={() => setActiveTab('optout')}
          >
            Opt Out
          </button>
        </div>

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="faq-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="faq-list">
              {filteredFAQ.map((item) => (
                <div key={item.id} className="faq-item">
                  <details className="faq-details">
                    <summary className="faq-question">
                      {item.question}
                    </summary>
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
            
            {filteredFAQ.length === 0 && (
              <div className="no-results">
                <p>No FAQ items found matching your search.</p>
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="contact-section">
            <div className="contact-grid">
              <div className="contact-form-container">
                <h2 className="section-title">Send us a Message</h2>
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows="5"
                      className="form-textarea"
                    />
                  </div>
                  
                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              </div>
              
              <div className="contact-info">
                <h2 className="section-title">Get in Touch</h2>
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>support@thetop36.com</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">⏰</div>
                  <div>
                    <h3>Response Time</h3>
                    <p>Within 24 hours</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">🌐</div>
                  <div>
                    <h3>Website</h3>
                    <p>thetop36.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Opt Out Tab */}
        {activeTab === 'optout' && (
          <div className="optout-section">
            <div className="optout-container">
              <h2 className="section-title">Opt Out of Communications</h2>
              <p className="optout-description">
                We're sorry to see you go! Please let us know why you're opting out so we can improve our service.
              </p>
              
              <form onSubmit={handleOptOut} className="optout-form">
                <div className="form-group">
                  <label htmlFor="optout-reason">Reason for Opting Out</label>
                  <select
                    id="optout-reason"
                    value={optOutReason}
                    onChange={(e) => setOptOutReason(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select a reason...</option>
                    <option value="too-many-emails">Too many emails</option>
                    <option value="not-relevant">Content not relevant</option>
                    <option value="privacy-concerns">Privacy concerns</option>
                    <option value="no-longer-interested">No longer interested</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <button type="submit" className="optout-btn">
                  Opt Out
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Chat Widget */}
        <div className={`chat-widget ${chatOpen ? 'open' : ''}`}>
          <button 
            className="chat-toggle"
            onClick={() => setChatOpen(!chatOpen)}
          >
            {chatOpen ? '✕' : '💬'}
          </button>
          
          {chatOpen && (
            <div className="chat-container">
              <div className="chat-header">
                <h3>Live Chat</h3>
                <p>We're here to help!</p>
              </div>
              
              <div className="chat-messages">
                {chatMessages.length === 0 ? (
                  <div className="welcome-message">
                    <p>👋 Hi! How can we help you today?</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`chat-message ${message.sender}`}
                    >
                      <div className="message-content">{message.text}</div>
                      <div className="message-time">{message.timestamp}</div>
                    </div>
                  ))
                )}
              </div>
              
              <form onSubmit={handleChatSubmit} className="chat-input-form">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="chat-input"
                />
                <button type="submit" className="chat-send-btn">
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportFAQ; 