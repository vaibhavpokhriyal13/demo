import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Search
} from 'lucide-react';
import styles from './LogsPage.module.css';

export default function LogsPage() {
  const [expandedId, setExpandedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const auditLogs = [
    {
      id: 1,
      timestamp: '22:10:14',
      task: 'Find the project report and download it',
      status: 'Completed (Verified)',
      perception: 'DOM First (12ms)',
      risk: { tier: 'MEDIUM', score: 0.42 },
      confidence: 96,
      piiBlocked: ['Aadhaar ID', 'Phone Number', 'Email Address'],
      cloudContextSaved: '91.5%',
      trace: [
        { phase: 'OBSERVED', text: 'Parsed 14 DOM nodes and accessibility tree attributes' },
        { phase: 'DETECTED', text: 'Sensitive Element Detector tagged 3 PII items (Aadhaar, Phone, Email)' },
        { phase: 'FILTERED', text: 'Privacy Firewall (Balanced Mode) applied local regex & token mask' },
        { phase: 'REASONED', text: 'Cloud LLM Reasoner selected CLICK(Project_Report.pdf) with 0 PII exposure' },
        { phase: 'VALIDATED', text: 'Risk Engine scored 0.42 (Medium) | Confidence 96% (>90% threshold)' },
        { phase: 'EXECUTED', text: 'Local DOM click event dispatched. State change 200 OK verified' },
      ]
    },
    {
      id: 2,
      timestamp: '21:55:40',
      task: 'Locate submit button on custom canvas map',
      status: 'Completed (Vision Fallback)',
      perception: 'Local Vision ONNX (38ms)',
      risk: { tier: 'LOW', score: 0.18 },
      confidence: 89,
      piiBlocked: ['User Session ID'],
      cloudContextSaved: '86.4%',
      trace: [
        { phase: 'OBSERVED', text: 'DOM node was unstructured <canvas>. Invoked Local Vision ONNX WebGPU' },
        { phase: 'DETECTED', text: 'Detected bounding box for graphical "Submit Geo-Data" icon' },
        { phase: 'FILTERED', text: 'Masked user session coordinate data locally' },
        { phase: 'REASONED', text: 'Mapped canvas coordinate (X: 420, Y: 180) to action intent' },
        { phase: 'VALIDATED', text: 'Risk Engine: 0.18 (Low) | Confidence 89% (Verified evidence)' },
        { phase: 'EXECUTED', text: 'Dispatched native coordinate click' },
      ]
    },
    {
      id: 3,
      timestamp: '21:32:15',
      task: 'Download quarterly expenditure statement',
      status: 'Completed (Self-Corrected)',
      perception: 'DOM First (15ms)',
      risk: { tier: 'MEDIUM', score: 0.48 },
      confidence: 92,
      piiBlocked: ['Bank Account #', 'PAN Card', 'Manager Name'],
      cloudContextSaved: '93.1%',
      trace: [
        { phase: 'OBSERVED', text: 'Extracted financial table layout and export options' },
        { phase: 'DETECTED', text: 'Masked Bank Account & PAN number entities' },
        { phase: 'FILTERED', text: 'Zero sensitive financial account numbers passed to LLM' },
        { phase: 'REASONED', text: 'Initial target selector intercepted by modal popup' },
        { phase: 'SELF_CORRECT', text: 'Self-Correction Loop: Re-perceived active DOM, bypassed modal, clicked direct download' },
        { phase: 'EXECUTED', text: 'Financial statement generated and downloaded successfully' },
      ]
    },
    {
      id: 4,
      timestamp: '20:45:00',
      task: 'Review infrastructure vendor bids',
      status: 'Completed',
      perception: 'DOM First (11ms)',
      risk: { tier: 'LOW', score: 0.12 },
      confidence: 98,
      piiBlocked: ['Tax ID', 'Phone (+91)'],
      cloudContextSaved: '94.0%',
      trace: [
        { phase: 'OBSERVED', text: 'Parsed vendor directory table' },
        { phase: 'DETECTED', text: 'Masked vendor tax registration numbers' },
        { phase: 'FILTERED', text: 'Sanitized table metadata generated' },
        { phase: 'REASONED', text: 'Read top 3 compliant proposals' },
        { phase: 'EXECUTED', text: 'Summarized public bidding status' },
      ]
    }
  ];

  const filteredLogs = auditLogs.filter(log =>
    log.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.pageTitle}>Explainable Action Audit Logs</h2>
          <p className={styles.subtitle}>
            Full transparent trace of observations, privacy interventions, risk assessments, and execution state checks.
          </p>
        </div>
        <div className={styles.searchBar}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search task or status..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Logs Table / Cards */}
      <div className={styles.logsList}>
        {filteredLogs.map((log) => {
          const isExpanded = expandedId === log.id;
          return (
            <div key={log.id} className={`card ${styles.logCard}`}>
              <div className={styles.logSummaryRow} onClick={() => toggleExpand(log.id)}>
                <div className={styles.logLeft}>
                  <span className={styles.timeBadge}>{log.timestamp}</span>
                  <div>
                    <h4 className={styles.taskTitle}>{log.task}</h4>
                    <div className={styles.logMetaRow}>
                      <span className="badge primary">
                        {log.perception.includes('Vision') ? <Eye size={12} /> : <Zap size={12} />}
                        {log.perception}
                      </span>
                      <span className={`badge risk-${log.risk.tier.toLowerCase()}`}>
                        Risk: {log.risk.tier} ({log.risk.score})
                      </span>
                      <span className="badge success">
                        {log.confidence}% Confidence
                      </span>
                      <span className="badge warning">
                        🛡️ {log.piiBlocked.length} PII Masked
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.logRight}>
                  <span className="badge success">{log.status}</span>
                  <button className={styles.expandBtn}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Expandable Explainable Action Trace */}
              {isExpanded && (
                <div className={`${styles.explainableDrawer} fade-in`}>
                  <div className={styles.drawerHeader}>
                    <Layers size={16} color="var(--accent-purple)" />
                    <strong>Explainable 6-Stage Action Trace Pipeline</strong>
                    <span className={styles.savedMetric}>Context Minimized: {log.cloudContextSaved}</span>
                  </div>

                  <div className={styles.traceTimeline}>
                    {log.trace.map((step, idx) => (
                      <div key={idx} className={styles.traceStepItem}>
                        <div className={styles.stepBullet}>
                          <span>{idx + 1}</span>
                        </div>
                        <div className={styles.stepBody}>
                          <div className={styles.stepPhase}>{step.phase}</div>
                          <p className={styles.stepText}>{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.piiTagContainer}>
                    <span className={styles.piiTagHeader}>Protected Entities in this Task:</span>
                    {log.piiBlocked.map((item, i) => (
                      <span key={i} className={styles.piiPill}>
                        🔒 {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
