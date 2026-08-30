import React, { useState } from 'react';
import {
  LayoutDashboard,
  Globe,
  ShieldCheck,
  Activity,
  Settings,
  Shield,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
  Rocket
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Telemetry & Stats', icon: <LayoutDashboard size={18} />, badge: 'Live' },
    { id: 'agent', label: 'Browser Agent', icon: <Globe size={18} />, badge: 'PS' },
    { id: 'monitor', label: 'Privacy Monitor', icon: <ShieldCheck size={18} />, badge: 'Firewall' },
    { id: 'logs', label: 'Action Audit Trace', icon: <Activity size={18} /> },
    { id: 'settings', label: 'Policy Settings', icon: <Settings size={18} /> },
  ];

  const getThemeInfo = () => {
    switch (theme) {
      case 'isro':
        return { label: 'ISRO Space Mode', icon: <Rocket size={15} color="#f97316" /> };
      case 'light':
        return { label: 'Light Mode', icon: <Sun size={15} color="#f59e0b" /> };
      case 'dark':
      default:
        return { label: 'Dark Mode', icon: <Moon size={15} color="#818cf8" /> };
    }
  };

  const themeInfo = getThemeInfo();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.logoContainerMobile}>
          <div className={styles.logoEmblem}>
            <Shield size={18} color="#fff" />
          </div>
          <div>
            <h1 className={styles.logoText}>PrivAgent</h1>
            <span className={styles.versionPill}>SIH26171</span>
          </div>
        </div>

        <div className={styles.mobileActions}>
          <button 
            className={styles.themeToggleBtn} 
            onClick={toggleTheme} 
            aria-label="Cycle Theme"
            title={`Current: ${themeInfo.label} (Click to switch)`}
          >
            {themeInfo.icon}
          </button>

          <button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)} aria-label="Open Navigation">
            <Menu size={22} color="var(--text-main)" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logoContainer}>
          <div className={styles.logoEmblem}>
            <Rocket size={20} color="#ffffff" />
            <div className={styles.emblemGlow}></div>
          </div>
          <div className={styles.logoInfo}>
            <div className={styles.brandRow}>
              <h1 className={styles.logoText}>PrivAgent</h1>
              <span className={styles.versionPill}>SIH 2026</span>
            </div>
            <p className={styles.logoSubtext}>Bharatiya Antariksh Hackathon</p>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close Navigation">
            <X size={18} color="var(--text-main)" />
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navSectionLabel}>CORE WORKSPACES</div>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
              >
                <div className={styles.navItemIcon}>{item.icon}</div>
                <span className={styles.navItemText}>{item.label}</span>
                {item.badge && (
                  <span className={`${styles.navBadge} ${isActive ? styles.navBadgeActive : ''}`}>
                    {item.badge}
                  </span>
                )}
                {isActive && <div className={styles.activePillBar}></div>}
              </button>
            );
          })}
        </nav>
        
        <div className={styles.footer}>
          {/* 3-Way Theme Switcher */}
          <button 
            className={styles.themeToggleBar} 
            onClick={toggleTheme}
            title={`Current: ${themeInfo.label} (Click to cycle ISRO / Dark / Light)`}
          >
            <div className={styles.themeToggleLeft}>
              {themeInfo.icon}
              <span>{themeInfo.label}</span>
            </div>
            <div className={`${styles.themeSwitchPill} ${styles['switch_' + theme]}`}>
              <div className={styles.switchKnob}>
                {theme === 'isro' && <Rocket size={10} color="#f97316" />}
                {theme === 'dark' && <Moon size={10} color="#818cf8" />}
                {theme === 'light' && <Sun size={10} color="#f59e0b" />}
              </div>
            </div>
          </button>

          <div className={styles.sidebarSubtleStatus}>
            <span className={styles.onlineDot}></span>
            <span>WebGPU Engine &bull; SIH26171</span>
          </div>
        </div>
      </aside>
    </>
  );
}
