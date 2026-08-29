import React from 'react';
import { LayoutDashboard, Globe, ShieldCheck, Activity, Settings, Shield } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'agent', label: 'Browser Agent', icon: <Globe size={20} /> },
    { id: 'monitor', label: 'Privacy Monitor', icon: <ShieldCheck size={20} /> },
    { id: 'logs', label: 'Activity Logs', icon: <Activity size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Shield className={styles.logoIcon} size={28} />
        <div>
          <h1 className={styles.logoText}>PrivAgent</h1>
          <p className={styles.logoSubtext}>Privacy-First Browser AI Agent</p>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.statusBox}>
          <div className={styles.statusDot}></div>
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}
