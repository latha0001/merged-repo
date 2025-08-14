import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    purchases: [],
    shares: [],
    referrals: [],
    entries: [],
    dailyWinners: []
  });

  // Mock data generation
  useEffect(() => {
    const generateMockData = () => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const data = {
        purchases: [],
        shares: [],
        referrals: [],
        entries: [],
        dailyWinners: []
      };

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        data.purchases.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 50) + 10
        });
        
        data.shares.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 100) + 20
        });
        
        data.referrals.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 30) + 5
        });
        
        data.entries.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 200) + 50
        });
        
        data.dailyWinners.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 10) + 1
        });
      }

      setAnalyticsData(data);
    };

    generateMockData();
  }, [timeRange]);

  const calculateTotals = () => {
    return {
      purchases: analyticsData.purchases.reduce((sum, item) => sum + item.value, 0),
      shares: analyticsData.shares.reduce((sum, item) => sum + item.value, 0),
      referrals: analyticsData.referrals.reduce((sum, item) => sum + item.value, 0),
      entries: analyticsData.entries.reduce((sum, item) => sum + item.value, 0),
      dailyWinners: analyticsData.dailyWinners.reduce((sum, item) => sum + item.value, 0)
    };
  };

  const totals = calculateTotals();

  const renderChart = (data, color, title) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="chart">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color
                }}
                title={`${item.date}: ${item.value}`}
              />
              <span className="chart-label">{item.date.split('-')[2]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-dashboard">
      <div className="container">
        <h1 className="page-title">Analytics Dashboard</h1>
        
        {/* Time Range Selector */}
        <div className="time-range-selector">
          <button 
            className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button 
            className={`time-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </button>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon purchases">📦</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Purchases</h3>
              <div className="summary-value">{totals.purchases}</div>
              <div className="summary-period">Last {timeRange}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon shares">📤</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Shares</h3>
              <div className="summary-value">{totals.shares}</div>
              <div className="summary-period">Last {timeRange}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon referrals">👥</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Referrals</h3>
              <div className="summary-value">{totals.referrals}</div>
              <div className="summary-period">Last {timeRange}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon entries">🎫</div>
            <div className="summary-content">
              <h3 className="summary-title">Total Entries</h3>
              <div className="summary-value">{totals.entries}</div>
              <div className="summary-period">Last {timeRange}</div>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon winners">🏆</div>
            <div className="summary-content">
              <h3 className="summary-title">Daily Winners</h3>
              <div className="summary-value">{totals.dailyWinners}</div>
              <div className="summary-period">Last {timeRange}</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="charts-grid">
            <div className="chart-card">
              {renderChart(analyticsData.purchases, '#FF7A00', 'Daily Purchases')}
            </div>
            
            <div className="chart-card">
              {renderChart(analyticsData.shares, '#1DA1F2', 'Daily Shares')}
            </div>
            
            <div className="chart-card">
              {renderChart(analyticsData.referrals, '#10B981', 'Daily Referrals')}
            </div>
            
            <div className="chart-card">
              {renderChart(analyticsData.entries, '#8B5CF6', 'Daily Entries')}
            </div>
            
            <div className="chart-card">
              {renderChart(analyticsData.dailyWinners, '#F59E0B', 'Daily Winners')}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="section">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            {analyticsData.purchases.slice(-5).reverse().map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <div className="activity-title">New Purchase</div>
                  <div className="activity-details">{item.value} bundles sold on {item.date}</div>
                </div>
                <div className="activity-time">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="section">
          <h2 className="section-title">Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Conversion Rate</h3>
              <div className="metric-value">{(totals.purchases / totals.entries * 100).toFixed(1)}%</div>
              <p>Purchases per total entries</p>
            </div>
            
            <div className="metric-card">
              <h3>Referral Rate</h3>
              <div className="metric-value">{(totals.referrals / totals.purchases * 100).toFixed(1)}%</div>
              <p>Referrals per purchase</p>
            </div>
            
            <div className="metric-card">
              <h3>Engagement Rate</h3>
              <div className="metric-value">{(totals.shares / totals.entries * 100).toFixed(1)}%</div>
              <p>Shares per total entries</p>
            </div>
            
            <div className="metric-card">
              <h3>Win Rate</h3>
              <div className="metric-value">{(totals.dailyWinners / totals.entries * 100).toFixed(2)}%</div>
              <p>Winners per total entries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 