import React, { useState, useEffect } from 'react';
import Sidebar from './layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import BrowserAgentPage from './pages/BrowserAgentPage';
import PrivacyMonitorPage from './pages/PrivacyMonitorPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [activeTab, setActiveTab] = useState('agent');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('privagent_theme');
    return saved || 'isro';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('privagent_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'isro') return 'dark';
      if (prev === 'dark') return 'light';
      return 'isro';
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'agent':
        return <BrowserAgentPage />;
      case 'monitor':
        return <PrivacyMonitorPage />;
      case 'logs':
        return <LogsPage />;
      case 'settings':
        return <SettingsPage theme={theme} setTheme={setTheme} toggleTheme={toggleTheme} />;
      default:
        return <BrowserAgentPage />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="main-content">
        <div className="page-content">
          {renderContent()}
          <footer style={{ marginTop: 'auto', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', paddingBottom: '1rem' }}>
            PrivAgent SIH26171 &bull; On-Device Visual Perception &amp; Local Privacy Firewall &bull; 2026
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
