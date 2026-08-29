import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Cpu,
  Lock,
  Eye,
  CheckCircle,
  Database,
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import styles from './PrivacyMonitorPage.module.css';

export default function PrivacyMonitorPage() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const piiRules = [
    { id: 1, type: 'Aadhaar / National ID', pattern: '\\d{4}\\s?\\d{4}\\s?\\d{4}', action: 'BLOCK & MASK', confidence: '99.4%', status: 'Active', detectionsToday: 48 },
    { id: 2, type: 'Phone Number (+91 / Int)', pattern: '(\\+91|0)?[6-9]\\d{9}', action: 'MASK LOCALLY', confidence: '98.8%', status: 'Active', detectionsToday: 112 },
    { id: 3, type: 'Email Address', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+', action: 'MASK LOCALLY', confidence: '99.9%', status: 'Active', detectionsToday: 87 },
    { id: 4, type: 'Password / Secret Fields', pattern: 'input[type="password"]', action: 'STRICT BLOCK', confidence: '100.0%', status: 'Active', detectionsToday: 14 },
    { id: 5, type: 'Payment / Card Numbers', pattern: '\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}', action: 'STRICT BLOCK', confidence: '99.7%', status: 'Active', detectionsToday: 6 },
    { id: 6, type: 'PAN Card (India)', pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}', action: 'BLOCK & MASK', confidence: '99.1%', status: 'Active', detectionsToday: 29 },
  ];

  const filteredRules = selectedFilter === 'ALL' 
    ? piiRules 
    : piiRules.filter(r => r.action.includes(selectedFilter));

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Privacy Monitor & Firewall Inspector</h2>
          <p className={styles.subtitle}>
            Inspect the on-device Privacy Firewall, local PII classification engine, and cloud context minimization telemetry.
          </p>
        </div>
        <div className={styles.topBadge}>
          <ShieldCheck size={16} color="var(--accent-success)" />
          <span>Firewall Status: <strong>STRICT ENFORCEMENT</strong></span>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className={styles.metricsGrid}>
        {/* Metric 1 */}
        <div className="card">
          <div className={styles.metricHeader}>
            <TrendingDown size={18} color="var(--accent-success)" />
            <span>Cloud Context Minimized</span>
          </div>
          <div className={styles.metricBig}>91.8%</div>
          <div className={styles.metricSub}>Average token/byte reduction before server call</div>
        </div>

        {/* Metric 2 */}
        <div className="card">
          <div className={styles.metricHeader}>
            <ShieldAlert size={18} color="var(--accent-warning)" />
            <span>Sensitive Entities Blocked</span>
          </div>
          <div className={styles.metricBig}>296</div>
          <div className={styles.metricSub}>PII tokens intercepted locally across sessions</div>
        </div>

        {/* Metric 3 */}
        <div className="card">
          <div className={styles.metricHeader}>
            <Cpu size={18} color="var(--accent-primary)" />
            <span>Local ONNX WASM Latency</span>
          </div>
          <div className={styles.metricBig}>14.2ms</div>
          <div className={styles.metricSub}>On-device perception & redaction speed</div>
        </div>

        {/* Metric 4 */}
        <div className="card">
          <div className={styles.metricHeader}>
            <Database size={18} color="var(--accent-cyan)" />
            <span>Task Memory PII Policy</span>
          </div>
          <div className={styles.metricBig}>0 PII</div>
          <div className={styles.metricSub}>Zero credentials/screenshots persisted in memory</div>
        </div>
      </div>

      {/* Hybrid Architecture Flow Diagram Card */}
      <div className={`card ${styles.archCard}`}>
        <h3 className={styles.sectionTitle}>Intelligent Local/Cloud Routing Architecture</h3>
        <p className={styles.sectionDesc}>
          How PrivAgent processes browser tasks without transmitting unredacted raw screenshots or private identifiers.
        </p>

        <div className={styles.flowPipeline}>
          <div className={styles.flowNode}>
            <div className={styles.nodeBadge}>Local Client</div>
            <div className={styles.nodeIconWrap} style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
              <Eye size={20} color="var(--accent-primary)" />
            </div>
            <h4>Adaptive Perception</h4>
            <p>DOM Fast-Path + ONNX Vision fallback</p>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={18} color="var(--accent-primary)" />
          </div>

          <div className={styles.flowNode}>
            <div className={styles.nodeBadge} style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-warning)' }}>Local Sandbox</div>
            <div className={styles.nodeIconWrap} style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
              <Lock size={20} color="var(--accent-warning)" />
            </div>
            <h4>Privacy Firewall</h4>
            <p>Classify & Redact: Passwords, Aadhaar, Phone</p>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={18} color="var(--accent-warning)" />
          </div>

          <div className={styles.flowNode}>
            <div className={styles.nodeBadge} style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-success)' }}>Cloud LLM</div>
            <div className={styles.nodeIconWrap} style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
              <Sparkles size={20} color="var(--accent-success)" />
            </div>
            <h4>Sanitized Reasoning</h4>
            <p>Zero PII in prompt. Receives clean UI tokens</p>
          </div>

          <div className={styles.flowArrow}>
            <ArrowRight size={18} color="var(--accent-success)" />
          </div>

          <div className={styles.flowNode}>
            <div className={styles.nodeBadge}>Local Client</div>
            <div className={styles.nodeIconWrap} style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
              <CheckCircle size={20} color="var(--accent-purple)" />
            </div>
            <h4>Risk & Local Exec</h4>
            <p>Confidence & Risk Engine validates action</p>
          </div>
        </div>
      </div>

      {/* Sensitive Element Detector Rules Table */}
      <div className={`card ${styles.tableCard}`}>
        <div className={styles.tableToolbar}>
          <div>
            <h3 className={styles.sectionTitle}>Sensitive Element Detection Rules</h3>
            <p className={styles.sectionDesc}>Active on-device filters scanning the DOM and visual viewport.</p>
          </div>

          <div className={styles.filterPills}>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'ALL' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('ALL')}
            >
              All Rules ({piiRules.length})
            </button>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'BLOCK' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('BLOCK')}
            >
              Strict Block
            </button>
            <button 
              className={`${styles.filterBtn} ${selectedFilter === 'MASK' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('MASK')}
            >
              Mask Locally
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.rulesTable}>
            <thead>
              <tr>
                <th>Entity Type</th>
                <th>Regex / Selector Pattern</th>
                <th>Firewall Action</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Detections Today</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map((rule) => (
                <tr key={rule.id}>
                  <td className={styles.entityCol}>
                    <strong>{rule.type}</strong>
                  </td>
                  <td className={styles.codeCol}>
                    <code>{rule.pattern}</code>
                  </td>
                  <td>
                    <span className={`badge ${rule.action.includes('BLOCK') ? 'danger' : 'warning'}`}>
                      {rule.action}
                    </span>
                  </td>
                  <td>
                    <span className="badge success">{rule.confidence}</span>
                  </td>
                  <td>
                    <span className={styles.statusLive}>
                      <span className={styles.liveDot}></span> {rule.status}
                    </span>
                  </td>
                  <td className={styles.countCol}>
                    <strong>{rule.detectionsToday}</strong> intercepted
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
