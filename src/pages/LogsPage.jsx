import React, { useState } from 'react';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Zap,
  Eye,
  Search,
  Copy,
  Check,
  RefreshCw,
  SlidersHorizontal,
  X
} from 'lucide-react';
import styles from './LogsPage.module.css';

export default function LogsPage() {
  const [expandedId, setExpandedId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);

  const auditLogs = [
    {
      id: 1,
      timestamp: '22:10:14',
      task: 'Find the project report and download it',
      status: 'Completed (Verified)',
      filterType: 'DOM',
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
      filterType: 'VISION',
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
      filterType: 'CORRECTION',
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
      filterType: 'DOM',
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

  const handleCopyTrace = (log, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'ALL' || log.filterType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <div className={styles.titleRow}>
            <h2 className={styles.pageTitle}>Action Audit Logs</h2>
            <span className="badge purple">Explainable Traces</span>
          </div>
          <p className={styles.subtitle}>
            Full transparent trace of perceptions, privacy interventions, risk assessments, and execution state checks.
          </p>
        </div>
        
        <div className={styles.topActions}>
          <div className={styles.searchBar}>
            <Search size={15} color="var(--text-subtle)" />
            <input 
              type="text" 
              placeholder="Search audit tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className={styles.clearSearchBtn} onClick={() => setSearchTerm('')} aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterPillsRow}>
        <button 
          className={`${styles.filterPill} ${selectedFilter === 'ALL' ? styles.filterPillActive : ''}`}
          onClick={() => setSelectedFilter('ALL')}
        >
          All Traces ({auditLogs.length})
        </button>
        <button 
          className={`${styles.filterPill} ${selectedFilter === 'DOM' ? styles.filterPillActive : ''}`}
          onClick={() => setSelectedFilter('DOM')}
        >
          <Zap size={12} /> DOM Fast-Path
        </button>
        <button 
          className={`${styles.filterPill} ${selectedFilter === 'VISION' ? styles.filterPillActive : ''}`}
          onClick={() => setSelectedFilter('VISION')}
        >
          <Eye size={12} /> Vision Fallbacks
        </button>
        <button 
          className={`${styles.filterPill} ${selectedFilter === 'CORRECTION' ? styles.filterPillActive : ''}`}
          onClick={() => setSelectedFilter('CORRECTION')}
        >
          <RefreshCw size={12} /> Self-Corrected
        </button>
      </div>

      {/* Logs List / Cards */}
      <div className={styles.logsList}>
        {filteredLogs.length === 0 ? (
          <div className={`card ${styles.emptyStateCard}`}>
            <Search size={32} color="var(--text-subtle)" />
            <h4>No audit traces match your criteria</h4>
            <p>Try searching for different keywords or reset your filters.</p>
            <button 
              className={styles.resetFiltersBtn} 
              onClick={() => { setSearchTerm(''); setSelectedFilter('ALL'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredLogs.map((log) => {
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
                          {log.perception.includes('Vision') ? <Eye size={11} /> : <Zap size={11} />}
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
                    <button 
                      className={styles.copyBtn} 
                      onClick={(e) => handleCopyTrace(log, e)}
                      title="Copy Trace JSON"
                    >
                      {copiedId === log.id ? <Check size={13} color="var(--accent-success)" /> : <Copy size={13} />}
                    </button>
                    <button className={styles.expandBtn} aria-label="Toggle Details">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expandable Explainable Action Trace */}
                {isExpanded && (
                  <div className={`${styles.explainableDrawer} fade-in`}>
                    <div className={styles.drawerHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Layers size={15} color="var(--accent-purple)" />
                        <strong>Explainable 6-Stage Action Trace Pipeline</strong>
                      </div>
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
                      <span className={styles.piiTagHeader}>Protected Entities:</span>
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
          })
        )}
      </div>
    </div>
  );
}
