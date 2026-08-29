import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import BrowserAgentPage from './pages/BrowserAgentPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [activeTab, setActiveTab] = useState('agent');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'monitor':
        return <DashboardPage />;
      case 'agent':
        return <BrowserAgentPage />;
      case 'logs':
        return <LogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <BrowserAgentPage />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <div className="page-content">
          {renderContent()}
          <footer style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', paddingBottom: '1rem' }}>
            PrivAgent Prototype &copy; SIH 2026
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
