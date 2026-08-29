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
  Sparkles
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Telemetry & Stats', icon: <LayoutDashboard size={19} />, badge: 'Live' },
    { id: 'agent', label: 'Browser Agent', icon: <Globe size={19} />, badge: 'PS' },
    { id: 'monitor', label: 'Privacy Monitor', icon: <ShieldCheck size={19} />, badge: 'Firewall' },
    { id: 'logs', label: 'Action Audit Trace', icon: <Activity size={19} /> },
    { id: 'settings', label: 'Policy Settings', icon: <Settings size={19} /> },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.logoContainerMobile}>
          <div className={styles.logoEmblem}>
            <Shield size={20} color="#fff" />
          </div>
          <div>
            <h1 className={styles.logoText}>PrivAgent</h1>
            <span className={styles.versionPill}>SIH26171</span>
          </div>
        </div>
        <button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)} aria-label="Open Navigation">
          <Menu size={24} color="var(--text-main)" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logoContainer}>
          <div className={styles.logoEmblem}>
            <Shield size={24} color="#fff" />
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
            <X size={20} color="var(--text-main)" />
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
          <div className={styles.sihBadge}>
            <div className={styles.sihTagRow}>
              <Sparkles size={12} color="var(--accent-primary)" />
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
