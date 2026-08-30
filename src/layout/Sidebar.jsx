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
  Moon
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

  const isDark = theme === 'dark';

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
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
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
            <Shield size={22} color="#fff" />
            <div className={styles.emblemGlow}></div>
          </div>
          <div className={styles.logoInfo}>
            <div className={styles.brandRow}>
              <h1 className={styles.logoText}>PrivAgent</h1>
              <span className={styles.versionPill}>v2.6</span>
            </div>
            <p className={styles.logoSubtext}>On-Device Visual Privacy AI</p>
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
          {/* Theme Quick Switcher Pill in Footer */}
          <button 
            className={styles.themeToggleBar} 
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <div className={styles.themeToggleLeft}>
              {isDark ? <Moon size={15} color="#818cf8" /> : <Sun size={15} color="#f59e0b" />}
              <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <div className={`${styles.themeSwitchPill} ${isDark ? styles.switchDark : styles.switchLight}`}>
              <div className={styles.switchKnob}>
                {isDark ? <Moon size={10} color="#fff" /> : <Sun size={10} color="#f59e0b" />}
              </div>
            </div>
          </button>

          <div className={styles.sihBadge}>
            <div className={styles.sihTagRow}>
              <Sparkles size={11} color="var(--accent-primary)" />
              <span className={styles.sihTag}>PROBLEM PS SIH26171</span>
            </div>
            <span className={styles.sihSub}>On-Device Perception &amp; Redaction</span>
          </div>

          <div className={styles.statusBox}>
            <div className={styles.statusDot}></div>
            <div className={styles.statusTexts}>
              <span className={styles.statusOnline}>WASM / ONNX Engine</span>
              <span className={styles.statusFps}>WebGPU Accelerated</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
