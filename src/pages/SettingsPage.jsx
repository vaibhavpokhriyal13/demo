import React, { useState } from 'react';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    localPii: true,
    autoRedact: true,
    faceDetect: true,
    passwordProtect: true,
    sanitizedOnly: true,
    localProcessing: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Settings</h2>
      <p className={styles.subtitle}>Configure local privacy policies and agent behavior.</p>

      <div className={`card ${styles.settingsCard}`}>
        <h3 className={styles.sectionTitle}>Privacy Protection</h3>
        
        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Local PII Detection</h4>
            <p>Use local vision model to detect Aadhaar, Phone, PAN, etc.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.localPii ? styles.on : ''}`}
            onClick={() => toggleSetting('localPii')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Automatic Redaction</h4>
            <p>Automatically black out detected PII before server transmission.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.autoRedact ? styles.on : ''}`}
            onClick={() => toggleSetting('autoRedact')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Face Detection</h4>
            <p>Detect and blur faces in visual context.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.faceDetect ? styles.on : ''}`}
            onClick={() => toggleSetting('faceDetect')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Password Protection</h4>
            <p>Identify and redact password fields and visible secrets.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.passwordProtect ? styles.on : ''}`}
            onClick={() => toggleSetting('passwordProtect')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

        <hr className={styles.divider} />
        
        <h3 className={styles.sectionTitle}>Network & Processing</h3>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Send Only Sanitized Context</h4>
            <p>Block unredacted images from leaving the device entirely.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.sanitizedOnly ? styles.on : ''}`}
            onClick={() => toggleSetting('sanitizedOnly')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

        <div className={styles.settingRow}>
          <div className={styles.settingInfo}>
            <h4>Local Processing Priority</h4>
            <p>Attempt to solve tasks locally before querying the Server LLM.</p>
          </div>
          <button 
            className={`${styles.toggle} ${settings.localProcessing ? styles.on : ''}`}
            onClick={() => toggleSetting('localProcessing')}
          >
            <div className={styles.toggleKnob}></div>
          </button>
        </div>

      </div>
    </div>
  );
}
