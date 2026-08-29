import React from 'react';
import { Activity, Shield, Cpu, Clock, CheckCircle, SearchX } from 'lucide-react';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Dashboard</h2>
      
      <div className={styles.statsGrid}>
        <div className="card">
          <div className={styles.statIcon} style={{color: 'var(--accent-success)'}}>
            <Activity size={24} />
          </div>
          <div className={styles.statValue}>Active</div>
          <div className={styles.statLabel}>Agent Status</div>
        </div>
        <div className="card">
          <div className={styles.statIcon} style={{color: 'var(--accent-primary)'}}>
            <Shield size={24} />
          </div>
          <div className={styles.statValue}>Enabled</div>
          <div className={styles.statLabel}>Privacy Protection</div>
        </div>
        <div className="card">
          <div className={styles.statIcon} style={{color: 'var(--text-main)'}}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statValue}>12</div>
          <div className={styles.statLabel}>Tasks Completed</div>
        </div>
        <div className="card">
          <div className={styles.statIcon} style={{color: 'var(--accent-warning)'}}>
            <SearchX size={24} />
          </div>
          <div className={styles.statValue}>27</div>
          <div className={styles.statLabel}>Sensitive Data Blocked</div>
        </div>
      </div>

      <div className={styles.metricsSection}>
        <h3 style={{marginBottom: '1rem'}}>Privacy & Performance (Demo Metrics)</h3>
        <div className={styles.metricsGrid}>
          <div className={`card ${styles.metricCard}`}>
            <div className={styles.metricHeader}>
              <Shield size={18} /> Redaction Accuracy
            </div>
            <div className={styles.metricBig}>98.7%</div>
            <div className={styles.metricSub}>Local vision model</div>
          </div>
          <div className={`card ${styles.metricCard}`}>
            <div className={styles.metricHeader}>
              <SearchX size={18} /> Visual Context Accuracy
            </div>
            <div className={styles.metricBig}>96.4%</div>
            <div className={styles.metricSub}>Server LLM comprehension</div>
          </div>
          <div className={`card ${styles.metricCard}`}>
            <div className={styles.metricHeader}>
              <Cpu size={18} /> Client CPU Usage
            </div>
            <div className={styles.metricBig}>18%</div>
            <div className={styles.metricSub}>Avg during redaction</div>
          </div>
          <div className={`card ${styles.metricCard}`}>
            <div className={styles.metricHeader}>
              <Clock size={18} /> Processing Latency
            </div>
            <div className={styles.metricBig}>420ms</div>
            <div className={styles.metricSub}>End-to-end average</div>
          </div>
        </div>
      </div>
    </div>
  );
}
