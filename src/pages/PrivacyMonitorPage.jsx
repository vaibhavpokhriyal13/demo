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
  Sparkles,
  Play,
  ListFilter,
  Layers,
  FlaskConical
} from 'lucide-react';
import styles from './PrivacyMonitorPage.module.css';

export default function PrivacyMonitorPage() {
  const [activeTab, setActiveTab] = useState('sandbox'); // 'sandbox', 'rules', 'architecture'
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [sandboxInput, setSandboxInput] = useState('Contact manager Vaibhav at 9876543210 or Aadhaar 4321 8765 1098. Password is password123.');
  const [sandboxSanitized, setSandboxSanitized] = useState('');
  const [tested, setTested] = useState(false);

  const piiRules = [
    { id: 1, type: 'Aadhaar / National ID', pattern: '\\d{4}\\s?\\d{4}\\s?\\d{4}', action: 'BLOCK & MASK', confidence: '99.4%', status: 'Active', detectionsToday: 48 },
    { id: 2, type: 'Phone Number (+91 / Int)', pattern: '(\\+91|0)?[6-9]\\d{9}', action: 'MASK LOCALLY', confidence: '98.8%', status: 'Active', detectionsToday: 112 },
    { id: 3, type: 'Email Address', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+', action: 'MASK LOCALLY', confidence: '99.9%', status: 'Active', detectionsToday: 87 },
    { id: 4, type: 'Password / Secret Fields', pattern: 'input[type="password"]', action: 'STRICT BLOCK', confidence: '100.0%', status: 'Active', detectionsToday: 14 },
    { id: 5, type: 'Payment / Card Numbers', pattern: '\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{4}', action: 'STRICT BLOCK', confidence: '99.7%', status: 'Active', detectionsToday: 6 },
    { id: 6, type: 'PAN Card (India)', pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}', action: 'BLOCK & MASK', confidence: '99.1%', status: 'Active', detectionsToday: 29 },
  ];

  const handleTestSandbox = () => {
    // Client-side regex PII redactor simulation
    let sanitized = sandboxInput
      .replace(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, '[REDACTED_AADHAAR]')
      .replace(/(\+91|0)?[6-9]\d{9}/g, '[REDACTED_PHONE]')
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
      .replace(/password\s*(is|=|:)\s*\S+/gi, 'password is [STRICT_BLOCKED]');
    
    setSandboxSanitized(sanitized);
    setTested(true);
  };

  const filteredRules = selectedFilter === 'ALL' 
    ? piiRules 
    : piiRules.filter(r => r.action.includes(selectedFilter));

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Privacy Monitor &amp; Firewall</h2>
            <span className="badge success">Strict Enforcement Active</span>
          </div>
          <p className={styles.subtitle}>
            Inspect on-device PII classification, local context minimization, and zero-PII cloud transmission.
          </p>
        </div>
        <div className={styles.topBadge}>
          <ShieldCheck size={15} color="var(--accent-success)" />
          <span>Firewall Status: <strong>STRICT</strong></span>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className={styles.metricsGrid}>
        <div className="card">
          <div className={styles.metricHeader}>
            <TrendingDown size={16} color="var(--accent-success)" />
            <span>Context Minimized</span>
          </div>
          <div className={styles.metricBig}>91.8%</div>
          <div className={styles.metricSub}>Average token/byte reduction before server call</div>
        </div>

        <div className="card">
          <div className={styles.metricHeader}>
            <ShieldAlert size={16} color="var(--accent-warning)" />
            <span>Entities Blocked</span>
          </div>
          <div className={styles.metricBig}>296</div>
          <div className={styles.metricSub}>PII tokens intercepted locally across sessions</div>
        </div>

        <div className="card">
          <div className={styles.metricHeader}>
            <Cpu size={16} color="var(--accent-primary)" />
            <span>Local WASM Latency</span>
          </div>
          <div className={styles.metricBig}>14.2ms</div>
          <div className={styles.metricSub}>On-device perception &amp; redaction speed</div>
        </div>

        <div className="card">
          <div className={styles.metricHeader}>
            <Database size={16} color="var(--accent-cyan)" />
            <span>Memory PII Policy</span>
          </div>
          <div className={styles.metricBig}>0 PII</div>
          <div className={styles.metricSub}>Zero credentials/screenshots persisted in memory</div>
        </div>
      </div>

      {/* Segregated Section Navigation Tabs */}
      <div className={styles.tabNavContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'sandbox' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('sandbox')}
        >
          <FlaskConical size={15} />
          <span>Interactive Firewall Sandbox</span>
        </button>

        <button 
          className={`${styles.tabBtn} ${activeTab === 'rules' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <ListFilter size={15} />
          <span>PII Detection Rules ({piiRules.length})</span>
        </button>

        <button 
          className={`${styles.tabBtn} ${activeTab === 'architecture' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          <Layers size={15} />
          <span>Hybrid Routing Architecture</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className={`card ${styles.sandboxCard} fade-in`}>
          <div className={styles.sandboxHeader}>
            <div className={styles.sandboxTitleWrap}>
              <Sparkles size={18} color="var(--accent-primary)" />
              <div>
                <h3 className={styles.sectionTitle}>Interactive Privacy Firewall Tester</h3>
                <p className={styles.sectionDesc}>
                  Test on-device PII classification and regex token masking in real-time.
                </p>
              </div>
            </div>

            <button className={styles.testBtn} onClick={handleTestSandbox}>
              <Play size={14} fill="currentColor" />
              <span>Enforce Firewall Filter</span>
            </button>
          </div>

          <div className={styles.sandboxGrid}>
            <div className={styles.sandboxCol}>
              <label className={styles.sandboxLabel}>INPUT (Raw Unsanitized Text / DOM Snippet):</label>
              <textarea
                className={styles.sandboxTextarea}
                value={sandboxInput}
                onChange={(e) => setSandboxInput(e.target.value)}
                placeholder="Paste raw text with phones, Aadhaar, passwords..."
                rows={4}
              />
            </div>

            <div className={styles.sandboxCol}>
              <label className={styles.sandboxLabel}>OUTPUT (Sanitized Payload for Cloud LLM):</label>
              <div className={styles.sandboxOutputBox}>
                {tested ? (
                  <p className={styles.sanitizedOutputText}>{sandboxSanitized}</p>
                ) : (
                  <span className={styles.placeholderText}>Click "Enforce Firewall Filter" to inspect sanitized output...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RULES TABLE */}
      {activeTab === 'rules' && (
        <div className={`card ${styles.tableCard} fade-in`}>
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
                All ({piiRules.length})
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
                  <th>Detections</th>
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
                      <strong>{rule.detectionsToday}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: HYBRID ARCHITECTURE PIPELINE */}
      {activeTab === 'architecture' && (
        <div className={`card ${styles.archCard} fade-in`}>
          <h3 className={styles.sectionTitle}>Intelligent Local/Cloud Routing Architecture</h3>
          <p className={styles.sectionDesc}>
            PrivAgent processes browser tasks without transmitting unredacted raw screenshots or private identifiers.
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
              <p>Classify &amp; Redact: Passwords, Aadhaar, Phone</p>
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
              <h4>Risk &amp; Local Exec</h4>
              <p>Confidence &amp; Risk Engine validates action</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
