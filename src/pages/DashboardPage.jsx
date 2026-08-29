import React from 'react';
import {
  Shield,
  SearchX,
  Zap,
  Eye,
  SlidersHorizontal,
  Database,
  RefreshCw
} from 'lucide-react';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>System Telemetry & Differentiation Dashboard</h2>
          <p className={styles.subtitle}>
            Real-time analytics for Adaptive Perception, Privacy Firewall, Risk Engine, and Task Memory.
          </p>
        </div>
        <div className={styles.liveIndicator}>
          <span className={styles.pulseDot}></span>
          <span>Engine Status: Active (WebGPU/WASM)</span>
        </div>
      </div>
      
      {/* 4 Core Primary Metrics */}
      <div className={styles.statsGrid}>
        <div className="card">
          <div className={styles.statIcon} style={{ color: 'var(--accent-success)' }}>
            <Shield size={24} />
          </div>
          <div className={styles.statValue}>91.8%</div>
          <div className={styles.statLabel}>Privacy Budget Protected</div>
          <div className={styles.statSub}>Context minimized before Cloud LLM</div>
        </div>

        <div className="card">
          <div className={styles.statIcon} style={{ color: 'var(--accent-primary)' }}>
            <Zap size={24} />
          </div>
          <div className={styles.statValue}>84.5%</div>
          <div className={styles.statLabel}>DOM Fast-Path Perception</div>
          <div className={styles.statSub}>15.5% invoked Local Vision ONNX</div>
        </div>

        <div className="card">
          <div className={styles.statIcon} style={{ color: 'var(--accent-purple)' }}>
            <SlidersHorizontal size={24} />
          </div>
          <div className={styles.statValue}>94.2%</div>
          <div className={styles.statLabel}>Avg Agent Confidence</div>
          <div className={styles.statSub}>&gt;90% threshold for auto-execution</div>
        </div>

        <div className="card">
          <div className={styles.statIcon} style={{ color: 'var(--accent-warning)' }}>
            <SearchX size={24} />
          </div>
          <div className={styles.statValue}>296</div>
          <div className={styles.statLabel}>PII Entities Masked</div>
          <div className={styles.statSub}>0 private credentials leaked</div>
        </div>
      </div>

      {/* Deep Dive Roadmap Grids */}
      <div className={styles.deepDiveGrid}>
        {/* Section 1: Adaptive Perception Strategy */}
        <div className={`card ${styles.panelCard}`}>
          <div className={styles.panelHeader}>
            <Eye size={18} color="var(--accent-primary)" />
            <h4>Adaptive Perception Distribution</h4>
          </div>
          <p className={styles.panelDesc}>
            Prioritizes structured DOM / accessibility first; invokes local vision on-demand for canvas or visual ambiguities.
          </p>

          <div className={styles.barGroup}>
            <div className={styles.barItem}>
              <div className={styles.barLabelRow}>
                <span>⚡ DOM / Accessibility Tree (Fast-Path)</span>
                <strong>84.5% (14ms avg)</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '84.5%', background: 'var(--accent-primary)' }}></div>
              </div>
            </div>

            <div className={styles.barItem}>
              <div className={styles.barLabelRow}>
                <span>👁️ Local Vision ONNX (Canvas/Visual Controls)</span>
                <strong>15.5% (38ms avg)</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '15.5%', background: 'var(--accent-warning)' }}></div>
              </div>
            </div>
          </div>

          <div className={styles.tagRow}>
            <span className="badge success">⚡ 6.8x Faster Inference</span>
            <span className="badge primary">💡 82% Compute Saved</span>
          </div>
        </div>

        {/* Section 2: Action Risk & Permission Engine */}
        <div className={`card ${styles.panelCard}`}>
          <div className={styles.panelHeader}>
            <SlidersHorizontal size={18} color="var(--accent-warning)" />
            <h4>Action Risk & Validation Tiers</h4>
          </div>
          <p className={styles.panelDesc}>
            Safety validation engine scores every proposed action before dispatching to browser DOM.
          </p>

          <div className={styles.barGroup}>
            <div className={styles.barItem}>
              <div className={styles.barLabelRow}>
                <span>🟢 Low Risk (Search, Navigate, Read)</span>
                <strong>76.2%</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '76.2%', background: 'var(--accent-success)' }}></div>
              </div>
            </div>

            <div className={styles.barItem}>
              <div className={styles.barLabelRow}>
                <span>🟡 Medium Risk (Download, Selection)</span>
                <strong>21.0%</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '21.0%', background: 'var(--accent-warning)' }}></div>
              </div>
            </div>

            <div className={styles.barItem}>
              <div className={styles.barLabelRow}>
                <span>🔴 High Risk (Financial/Delete)</span>
                <strong>2.8%</strong>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: '2.8%', background: 'var(--accent-danger)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Self-Correction Loop & Robustness */}
        <div className={`card ${styles.panelCard}`}>
          <div className={styles.panelHeader}>
            <RefreshCw size={18} color="var(--accent-success)" />
            <h4>Self-Correction & Robustness</h4>
          </div>
          <p className={styles.panelDesc}>
            Verifies DOM state transitions after every action. Re-perceives and resolves alternative selectors if dynamic shifts occur.
          </p>

          <div className={styles.statsMiniGrid}>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>98.4%</span>
              <span className={styles.miniStatLabel}>First-Pass Success</span>
            </div>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>100%</span>
              <span className={styles.miniStatLabel}>Bounded Retries Safe</span>
            </div>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>0</span>
              <span className={styles.miniStatLabel}>Stuck Loops</span>
            </div>
          </div>
        </div>

        {/* Section 4: Task Memory & Storage Policy */}
        <div className={`card ${styles.panelCard}`}>
          <div className={styles.panelHeader}>
            <Database size={18} color="var(--accent-cyan)" />
            <h4>Task Memory & Storage Isolation</h4>
          </div>
          <p className={styles.panelDesc}>
            Learns safe workflow preferences without persisting credentials, OTPs, or raw DOM screenshots.
          </p>

          <div className={styles.statsMiniGrid}>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>7</span>
              <span className={styles.miniStatLabel}>Saved Safe Patterns</span>
            </div>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>0 KB</span>
              <span className={styles.miniStatLabel}>PII Persisted</span>
            </div>
            <div className={styles.miniStatBox}>
              <span className={styles.miniStatVal}>100%</span>
              <span className={styles.miniStatLabel}>Local Memory Isolated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
