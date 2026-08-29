import React, { useState } from 'react';
import { LayoutDashboard, Globe, ShieldCheck, Activity, Settings, Shield, Menu, X } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'agent', label: 'Browser Agent', icon: <Globe size={20} /> },
    { id: 'monitor', label: 'Privacy Monitor', icon: <ShieldCheck size={20} /> },
    { id: 'logs', label: 'Activity Logs', icon: <Activity size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className={styles.mobileTopBar}>
        <div className={styles.logoContainerMobile}>
          <Shield className={styles.logoIcon} size={24} />
          <h1 className={styles.logoText}>PrivAgent</h1>
        </div>
        <button className={styles.hamburgerBtn} onClick={() => setIsOpen(true)}>
          <Menu size={24} color="var(--text-main)" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

      {/* Sidebar Drawer */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logoContainer}>
          <Shield className={styles.logoIcon} size={28} />
          <div>
            <h1 className={styles.logoText}>PrivAgent</h1>
            <p className={styles.logoSubtext}>Privacy-First Browser AI Agent</p>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <X size={24} color="var(--text-main)" />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className={styles.footer}>
          <div className={styles.sihBadge}>
            <span className={styles.sihTag}>PS SIH26171</span>
            <span className={styles.sihSub}>On-Device Perception</span>
          </div>
          <div className={styles.statusBox}>
            <div className={styles.statusDot}></div>
            <span>WASM / ONNX Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}
