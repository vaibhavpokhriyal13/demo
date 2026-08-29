import React, { useState } from 'react';
import {
  ShieldCheck,
  Database,
  Lock,
  Eye,
  Trash2,
  Sliders
} from 'lucide-react';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const [privacyMode, setPrivacyMode] = useState('balanced');
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [settings, setSettings] = useState({
    aadhaarMask: true,
    phoneMask: true,
    passwordProtect: true,
    domFirstAdaptive: true,
    autoVerifyMediumRisk: true,
    selfCorrectionRetries: true,
  });

  const [memoryCleared, setMemoryCleared] = useState(false);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearMemory = () => {
    setMemoryCleared(true);
    setTimeout(() => setMemoryCleared(false), 3000);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>System &amp; Privacy Policy Settings</h2>
          <p className={styles.subtitle}>
            Configure on-device Privacy Firewall policies, Adaptive Perception thresholds, and Risk Engine parameters.
          </p>
        </div>
      </div>

      <div className={`card ${styles.settingsCard}`}>
        {/* Section 1: Privacy Firewall & Modes */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Lock size={19} color="var(--accent-primary)" />
            <div>
              <h3 className={styles.sectionTitle}>Privacy Firewall Policy Mode</h3>
              <p className={styles.sectionSub}>Enforces local token sanitization before LLM reasoning.</p>
            </div>
          </div>

          <div className={styles.modeSelectorGrid}>
            <div 
              className={`${styles.modeOption} ${privacyMode === 'strict' ? styles.modeActive : ''}`}
              onClick={() => setPrivacyMode('strict')}
            >
              <div className={styles.modeRadio}>
                {privacyMode === 'strict' && <div className={styles.radioDot} />}
              </div>
              <div>
                <strong>Strict Privacy Mode</strong>
                <p>Blocks all PII, metadata, and ambiguous tokens. Highest privacy guarantees (95%+ budget saved).</p>
              </div>
            </div>

            <div 
              className={`${styles.modeOption} ${privacyMode === 'balanced' ? styles.modeActive : ''}`}
              onClick={() => setPrivacyMode('balanced')}
            >
              <div className={styles.modeRadio}>
                {privacyMode === 'balanced' && <div className={styles.radioDot} />}
              </div>
              <div>
                <strong>Balanced Privacy Mode (Recommended)</strong>
                <p>Redacts PII locally (Aadhaar, Phone, Email) while preserving interactive layout roles &amp; DOM structure.</p>
              </div>
            </div>

            <div 
              className={`${styles.modeOption} ${privacyMode === 'automation' ? styles.modeActive : ''}`}
              onClick={() => setPrivacyMode('automation')}
            >
              <div className={styles.modeRadio}>
                {privacyMode === 'automation' && <div className={styles.radioDot} />}
              </div>
              <div>
                <strong>Automation Optimized Mode</strong>
                <p>High throughput sanitized context for rapid sequential task executions.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Section 2: Confidence Threshold Slider */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Sliders size={19} color="var(--accent-purple)" />
            <div>
              <h3 className={styles.sectionTitle}>Agent Auto-Execution Confidence Threshold</h3>
              <p className={styles.sectionSub}>Actions with confidence below this threshold will prompt verification.</p>
            </div>
          </div>

          <div className={styles.sliderBox}>
            <div className={styles.sliderHeader}>
              <span>Minimum Confidence for Direct Execution:</span>
              <strong className={styles.sliderValue}>{confidenceThreshold}%</strong>
            </div>
            <input 
              type="range" 
              min="70" 
              max="98" 
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className={styles.rangeSlider}
            />
            <div className={styles.sliderTicks}>
              <span>70% (Permissive)</span>
              <span>85% (Balanced)</span>
              <span>90% (Recommended)</span>
              <span>98% (Ultra-Strict)</span>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Section 3: Sensitive Element Detector Settings */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <ShieldCheck size={19} color="var(--accent-warning)" />
            <div>
              <h3 className={styles.sectionTitle}>Sensitive Element Detector Rules</h3>
              <p className={styles.sectionSub}>Granular entity scanners operating locally via Regex + ONNX Runtime.</p>
            </div>
          </div>

          <div className={styles.togglesList}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>Aadhaar &amp; National ID Masking</h4>
                <p>Identify and redact 12-digit Aadhaar / National Identity numbers.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.aadhaarMask ? styles.on : ''}`}
                onClick={() => toggleSetting('aadhaarMask')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>Phone &amp; Contact Number Masking</h4>
                <p>Detect and redact Indian (+91) and international telephone numbers.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.phoneMask ? styles.on : ''}`}
                onClick={() => toggleSetting('phoneMask')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>Password &amp; Secret Field Interception</h4>
                <p>Strictly block password inputs, OTP fields, and secret tokens from viewport context.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.passwordProtect ? styles.on : ''}`}
                onClick={() => toggleSetting('passwordProtect')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Section 4: Adaptive Perception & Engine Controls */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Eye size={19} color="var(--accent-primary)" />
            <div>
              <h3 className={styles.sectionTitle}>Adaptive Perception &amp; Risk Engine</h3>
              <p className={styles.sectionSub}>Inference strategy and pre-execution safety validation.</p>
            </div>
          </div>

          <div className={styles.togglesList}>
            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>DOM Fast-Path First</h4>
                <p>Use lightweight DOM / accessibility tree first; invoke Vision ONNX only when visually ambiguous.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.domFirstAdaptive ? styles.on : ''}`}
                onClick={() => toggleSetting('domFirstAdaptive')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>Auto-Verify Medium-Risk Actions</h4>
                <p>Perform safety pre-checks for file downloads and selection mutations.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.autoVerifyMediumRisk ? styles.on : ''}`}
                onClick={() => toggleSetting('autoVerifyMediumRisk')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>

            <div className={styles.settingRow}>
              <div className={styles.settingInfo}>
                <h4>Self-Correction Loop</h4>
                <p>Automatically re-perceive and retry with safe alternative selector on dynamic UI shift.</p>
              </div>
              <button 
                className={`${styles.toggle} ${settings.selfCorrectionRetries ? styles.on : ''}`}
                onClick={() => toggleSetting('selfCorrectionRetries')}
              >
                <div className={styles.toggleKnob}></div>
              </button>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Section 5: Task Memory Settings */}
        <div className={styles.sectionBlock}>
          <div className={styles.sectionHeader}>
            <Database size={19} color="var(--accent-cyan)" />
            <div>
              <h3 className={styles.sectionTitle}>Task Memory &amp; Safe Preference Cache</h3>
              <p className={styles.sectionSub}>Persistent storage for non-sensitive workflows with zero credentials policy.</p>
            </div>
          </div>

          <div className={styles.memorySettingRow}>
            <div>
              <strong>Stored Safe Patterns: 3 non-sensitive entries</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Zero passwords, OTPs, or raw screenshots are ever saved.
              </p>
            </div>
            <button className={styles.clearMemoryBtn} onClick={handleClearMemory}>
              <Trash2 size={15} />
              {memoryCleared ? 'Task Memory Cleared!' : 'Clear Safe Task Memory'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
