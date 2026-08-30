import React, { useState, useEffect } from 'react';
import {
  Globe,
  Play,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Sparkles,
  Lock,
  Eye,
  FileText,
  Search,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Copy,
  Check,
  MousePointer2,
  Fingerprint
} from 'lucide-react';
import styles from './BrowserAgentPage.module.css';

export default function BrowserAgentPage() {
  const [task, setTask] = useState('Find the project report and download it');
  const [agentState, setAgentState] = useState('IDLE'); // IDLE, OBSERVE, DETECT, FILTER, REASON, RISK_CHECK, EXECUTE, COMPLETED
  const [activeTab, setActiveTab] = useState('trace'); // trace, privacy, logs
  const [privacyMode, setPrivacyMode] = useState('balanced');
  const [perceptionMode, setPerceptionMode] = useState('DOM_FIRST'); // DOM_FIRST or VISION_FALLBACK
  const [perceptionTimeMs, setPerceptionTimeMs] = useState(12);
  const [simulateCanvasTarget, setSimulateCanvasTarget] = useState(false);
  const [simulateSelfCorrection, setSimulateSelfCorrection] = useState(false);
  const [correctionAttempts, setCorrectionAttempts] = useState(0);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [copiedTrace, setCopiedTrace] = useState(false);
  const [viewMode, setViewMode] = useState('sanitized'); // sanitized or raw
  const [highlightPii, setHighlightPii] = useState(true);

  // Scenario Presets
  const [activeScenario, setActiveScenario] = useState('report');
  const scenarios = [
    {
      id: 'report',
      title: 'Annual Project Report',
      taskText: 'Find the project report and download it',
      canvas: false,
      selfCorrect: false,
      mode: 'balanced'
    },
    {
      id: 'audit',
      title: 'Financial Audit Export',
      taskText: 'Export quarterly financial audit statement with self-healing retry',
      canvas: false,
      selfCorrect: true,
      mode: 'strict'
    },
    {
      id: 'canvas',
      title: 'Canvas Control (Vision)',
      taskText: 'Locate submit button on custom canvas map',
      canvas: true,
      selfCorrect: false,
      mode: 'balanced'
    }
  ];

  // Pipeline execution trace state
  const [executionTrace, setExecutionTrace] = useState([
    {
      id: 'OBSERVE',
      name: 'Observe UI',
      phase: 'DOM First Perception',
      badge: 'DOM / a11y',
      status: 'pending',
      details: 'Extracted semantic DOM tree and computed accessibility nodes (12ms).'
    },
    {
      id: 'DETECT',
      name: 'Detect PII',
      phase: 'Element Categorization',
      badge: '3 PII Detected',
      status: 'pending',
      details: 'On-device Regex & NLP marked Aadhaar, Phone Number, and Email.'
    },
    {
      id: 'FILTER',
      name: 'Privacy Firewall',
      phase: 'Token Replacement',
      badge: '0 PII Transmitted',
      status: 'pending',
      details: 'Replaced sensitive text with cryptographic placeholder tokens locally.'
    },
    {
      id: 'REASON',
      name: 'Hybrid Reasoner',
      phase: 'Action Synthesis',
      badge: 'Cloud LLM (Safe)',
      status: 'pending',
      details: 'Synthesized target: CLICK(Download_Report_Button) using sanitized context.'
    },
    {
      id: 'RISK_CHECK',
      name: 'Risk & Confidence',
      phase: 'Safety Gate',
      badge: 'Risk: Med | Conf: 96%',
      status: 'pending',
      details: 'Calculated Risk Tier: Medium (0.42) | Confidence: 96% (> 90% threshold).'
    },
    {
      id: 'EXECUTE',
      name: 'Execute & Verify',
      phase: 'DOM Event Dispatch',
      badge: 'Verified Success',
      status: 'pending',
      details: 'Dispatched native DOM click. Verified state change (HTTP 200 OK).'
    }
  ]);

  // Live Terminal Logs
  const [logs, setLogs] = useState([
    { time: '00:00.01', type: 'info', text: 'PrivAgent Perception Engine initialized (WebGPU & WASM ready)' },
    { time: '00:00.04', type: 'info', text: 'Privacy Policy active: BALANCED (High-confidence masking)' },
    { time: '00:00.06', type: 'info', text: 'Pre-flight check: Target selector valid (0 exposed entities)' },
  ]);

  const addLog = (text, type = 'info') => {
    const now = new Date();
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')}`;
    setLogs(prev => [...prev, { time: timeStr, type, text }]);
  };

  const handleSelectScenario = (sc) => {
    setActiveScenario(sc.id);
    setTask(sc.taskText);
    setSimulateCanvasTarget(sc.canvas);
    setSimulateSelfCorrection(sc.selfCorrect);
    setPrivacyMode(sc.mode);
    setPerceptionMode(sc.canvas ? 'VISION_FALLBACK' : 'DOM_FIRST');
    setPerceptionTimeMs(sc.canvas ? 38 : 12);
  };

  const updateTraceStep = (stepId, status, newDetails = null) => {
    setExecutionTrace(prev =>
      prev.map(step => {
        if (step.id === stepId) {
          return {
            ...step,
            status,
            details: newDetails || step.details
          };
        }
        return step;
      })
    );
  };

  const resetPipeline = () => {
    setExecutionTrace(prev => prev.map(s => ({ ...s, status: 'pending' })));
    setCorrectionAttempts(0);
  };

  const runAgent = () => {
    resetPipeline();
    setAgentState('OBSERVE');
    addLog(`Task initiated: "${task}"`, 'primary');

    // Stage 1: OBSERVE
    updateTraceStep('OBSERVE', 'active');
    setTimeout(() => {
      if (simulateCanvasTarget) {
        setPerceptionMode('VISION_FALLBACK');
        setPerceptionTimeMs(38);
        updateTraceStep('OBSERVE', 'completed', 'DOM failed (unstructured canvas). Fallback: Local Vision ONNX WebGPU (38ms).');
        addLog('DOM node was unstructured <canvas>. Invoked Local Vision ONNX WebGPU (38ms)', 'warning');
      } else {
        setPerceptionMode('DOM_FIRST');
        setPerceptionTimeMs(12);
        updateTraceStep('OBSERVE', 'completed', 'Parsed DOM layout and accessibility tree in 12ms (DOM Fast-Path).');
        addLog('Fast-Path Perception complete: 14 DOM nodes parsed in 12ms', 'success');
      }
      setAgentState('DETECT');
    }, 800);

    // Stage 2: DETECT
    setTimeout(() => {
      updateTraceStep('DETECT', 'active');
      addLog('Scanning for PII & sensitive entities with local token dictionary...', 'info');
      setTimeout(() => {
        updateTraceStep('DETECT', 'completed', 'Detected 3 sensitive entities: Aadhaar (1), Phone (1), Email (1).');
        addLog('Sensitive Element Detector tagged 3 PII items for redaction', 'warning');
        setAgentState('FILTER');
      }, 700);
    }, 1200);

    // Stage 3: FILTER (Privacy Firewall)
    setTimeout(() => {
      updateTraceStep('FILTER', 'active');
      addLog(`Applying Privacy Firewall ruleset: [${privacyMode.toUpperCase()}]`, 'info');
      setTimeout(() => {
        updateTraceStep('FILTER', 'completed', 'Masked sensitive fields with placeholder tokens. Cloud transmission contains ZERO raw PII.');
        addLog('Local Redaction Firewall applied: 100% PII blocked from network payload', 'success');
        setAgentState('REASON');
      }, 700);
    }, 2200);

    // Stage 4: REASON
    setTimeout(() => {
      updateTraceStep('REASON', 'active');
      addLog('Synthesizing action via Cloud Reasoner with sanitized metadata...', 'info');
      setTimeout(() => {
        updateTraceStep('REASON', 'completed', 'Intent identified: CLICK(Project_Report.pdf download button).');
        addLog('Action Proposal received: Intent: CLICK_ELEMENT | Target: [data-doc-id="report_2026"]', 'primary');
        setAgentState('RISK_CHECK');
      }, 800);
    }, 3200);

    // Stage 5: RISK_CHECK
    setTimeout(() => {
      updateTraceStep('RISK_CHECK', 'active');
      addLog('Evaluating Risk Engine score and perception confidence...', 'info');
      setTimeout(() => {
        updateTraceStep('RISK_CHECK', 'completed', 'Risk Score: 0.42 (Medium) | Confidence: 96% (>90% threshold) -> Approved.');
        addLog('Risk Engine: Medium Risk (0.42) | Confidence: 96% | Action Gate: APPROVED', 'success');
        setAgentState('EXECUTE');
      }, 700);
    }, 4300);

    // Stage 6: EXECUTE (with optional self-correction)
    setTimeout(() => {
      updateTraceStep('EXECUTE', 'active');
      if (simulateSelfCorrection && correctionAttempts === 0) {
        addLog('Executing initial selector click...', 'info');
        setTimeout(() => {
          addLog('State Verification: Element obstructed by modal popup! Triggering Self-Correction...', 'warning');
          setCorrectionAttempts(1);
          updateTraceStep('EXECUTE', 'active', 'Self-Correction Loop: Re-perceiving active DOM, dismissing modal, clicking target.');
          setTimeout(() => {
            addLog('Self-Correction Success: Modal bypassed, target selector clicked successfully.', 'success');
            setAgentState('COMPLETED');
            updateTraceStep('EXECUTE', 'completed');
            addLog('Task Completed Successfully (Self-Corrected)', 'success');
          }, 1200);
        }, 800);
      } else {
        addLog('Dispatched native DOM click event to target selector', 'info');
        setTimeout(() => {
          setAgentState('COMPLETED');
          updateTraceStep('EXECUTE', 'completed');
          addLog('Task Completed Successfully with verified trace', 'success');
        }, 900);
      }
    }, 5300);
  };

  const isRunning = agentState !== 'IDLE' && agentState !== 'COMPLETED';

  const handleCopyTrace = () => {
    navigator.clipboard.writeText(JSON.stringify(executionTrace, null, 2));
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Clean Unified Command Hero Bar */}
      <div className={`card ${styles.commandHeroCard}`}>
        <div className={styles.commandInputRow}>
          <div className={styles.inputBox}>
            <Search size={17} className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.taskInput}
              value={task} 
              onChange={(e) => setTask(e.target.value)}
              disabled={isRunning}
              placeholder="What should the AI browser agent do?"
            />
          </div>

          <div className={styles.commandActions}>
            <button 
              className={styles.configBtn}
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              title="Configure Privacy Rules & Self-Correction"
            >
              <Sliders size={14} />
              <span>Options</span>
              {showAdvancedControls ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>

            <button 
              className={`${styles.runBtn} ${isRunning ? styles.runningBtn : ''}`}
              onClick={runAgent}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Zap className="processing-pulse" size={15} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={15} fill="currentColor" />
                  Run Agent
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Chips Row */}
        <div className={styles.presetChipsRow}>
          <span className={styles.presetTag}>Quick Scenarios:</span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              className={`${styles.presetChip} ${activeScenario === sc.id ? styles.presetChipActive : ''}`}
              onClick={() => handleSelectScenario(sc)}
              disabled={isRunning}
            >
              <Sparkles size={11} />
              <span>{sc.title}</span>
            </button>
          ))}
        </div>

        {/* Collapsible Options Drawer */}
        {showAdvancedControls && (
          <div className={`${styles.advancedConfigDrawer} fade-in`}>
            <div className={styles.drawerGroup}>
              <span className={styles.drawerLabel}>
                <Lock size={12} color="var(--accent-primary)" /> Privacy Policy:
              </span>
              <div className={styles.pillSwitch}>
                {['strict', 'balanced', 'automation'].map((mode) => (
                  <button
                    key={mode}
                    className={`${styles.pillOption} ${privacyMode === mode ? styles.activePillOption : ''}`}
                    onClick={() => setPrivacyMode(mode)}
                    disabled={isRunning}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.drawerToggles}>
              <label className={styles.toggleItem}>
                <input 
                  type="checkbox" 
                  checked={simulateSelfCorrection}
                  onChange={(e) => setSimulateSelfCorrection(e.target.checked)}
                  disabled={isRunning}
                />
                <RefreshCw size={12} />
                <span>Self-Correction Retry</span>
              </label>

              <label className={styles.toggleItem}>
                <input 
                  type="checkbox" 
                  checked={simulateCanvasTarget}
                  onChange={(e) => setSimulateCanvasTarget(e.target.checked)}
                  disabled={isRunning}
                />
                <Eye size={12} />
                <span>Simulate Canvas Fallback</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* 2-Column Clean Workspace */}
      <div className={styles.mainWorkspace}>
        {/* Left: Mock Browser Viewport */}
        <div className={styles.browserColumn}>
          <div className={styles.browserFrame}>
            <div className={styles.browserFrameHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.urlBar}>
                <Lock size={11} color="#10b981" />
                <span>https://gov.in/portal/infrastructure/reports</span>
              </div>
              <div className={styles.viewSwitchMini}>
                <button 
                  className={`${styles.viewBtnMini} ${viewMode === 'sanitized' ? styles.viewActiveMini : ''}`}
                  onClick={() => setViewMode('sanitized')}
                >
                  Sanitized View
                </button>
                <button 
                  className={`${styles.viewBtnMini} ${viewMode === 'raw' ? styles.viewActiveMini : ''}`}
                  onClick={() => setViewMode('raw')}
                >
                  Raw View
                </button>
              </div>
            </div>

            <div className={styles.browserFrameContent}>
              {/* Scan Laser Overlay */}
              {(agentState === 'OBSERVE' || agentState === 'DETECT') && (
                <div className={styles.scanOverlay}></div>
              )}

              {/* Cursor Simulation during execution */}
              {(agentState === 'EXECUTE') && (
                <div className={styles.cursorSim}>
                  <MousePointer2 size={22} fill="var(--accent-primary)" color="#ffffff" />
                  <span className={styles.cursorLabel}>
                    {simulateSelfCorrection && correctionAttempts === 1 ? 'Retrying Target...' : 'Clicking Target'}
                  </span>
                </div>
              )}

              {/* Web Page Header */}
              <div className={styles.pageHeader}>
                <div className={styles.pageHeaderTitle}>
                  <h3>Infrastructure Project Management Portal</h3>
                  <p>National Development &amp; Public Works Registry</p>
                </div>
                <div className={styles.govEmblem}>GOV.IN VERIFIED</div>
              </div>

              {/* Sensitive Element Detector Live Container */}
              <div className={styles.detectorSection}>
                <div className={styles.detectorSectionHeader}>
                  <span className={styles.detectorTitle}>
                    <Fingerprint size={14} color="var(--accent-primary)" />
                    Project Metadata (Firewall Active)
                  </span>
                  <div className={styles.detectorBadgesList}>
                    <span className="badge warning">■ Aadhaar Masked</span>
                    <span className="badge warning">■ Phone Masked</span>
                    <span className="badge warning">■ Email Masked</span>
                  </div>
                </div>

                <div className={styles.dataFieldsGrid}>
                  <div className={`${styles.dataFieldItem} ${highlightPii ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Manager Name</span>
                    <span className={styles.fieldValAllowed}>Dr. Vikram S. (Director)</span>
                  </div>

                  <div className={`${styles.dataFieldItem} ${highlightPii ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Aadhaar ID</span>
                    {viewMode === 'sanitized' ? (
                      <span className="redacted-block">XXXX-XXXX-8921</span>
                    ) : (
                      <span className={styles.rawPii}>9842-1104-8921</span>
                    )}
                    <span className={styles.tagPii}>PII</span>
                  </div>

                  <div className={`${styles.dataFieldItem} ${highlightPii ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Phone Number</span>
                    {viewMode === 'sanitized' ? (
                      <span className="redacted-block">+91 9840X XXXXX</span>
                    ) : (
                      <span className={styles.rawPii}>+91 98401 23456</span>
                    )}
                    <span className={styles.tagPii}>PII</span>
                  </div>

                  <div className={`${styles.dataFieldItem} ${highlightPii ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Official Email</span>
                    {viewMode === 'sanitized' ? (
                      <span className="redacted-block">v***@isro.gov.in</span>
                    ) : (
                      <span className={styles.rawPii}>vikram.s@isro.gov.in</span>
                    )}
                    <span className={styles.tagPii}>PII</span>
                  </div>
                </div>
              </div>

              {/* Action Targets / Document List */}
              <div className={styles.actionSection}>
                <div className={styles.actionHeader}>
                  <FileText size={15} color="var(--accent-primary)" />
                  <h4>Available Documentation</h4>
                </div>

                <div className={styles.docListGrid}>
                  <div className={`${styles.docCard} ${agentState === 'EXECUTE' ? styles.docCardActive : ''}`}>
                    <div className={styles.docDetails}>
                      <div className={styles.docIconWrap}>
                        <FileText size={17} color="var(--accent-primary)" />
                      </div>
                      <div>
                        <div className={styles.docTitle}>Project_Report_Q4_2026.pdf</div>
                        <div className={styles.docMeta}>3.8 MB &bull; Verified Geospatial Survey Report</div>
                      </div>
                    </div>

                    <div className={styles.docActionArea}>
                      {simulateCanvasTarget ? (
                        <div className={styles.canvasButtonSim}>
                          Canvas Geo-Target (ONNX Vision Required)
                        </div>
                      ) : (
                        <button 
                          className={`${styles.actionDownloadBtn} ${agentState === 'EXECUTE' ? styles.btnExecuting : ''}`}
                          id="target-download-report"
                        >
                          {agentState === 'COMPLETED' ? (
                            <>
                              <CheckCircle2 size={13} />
                              Downloaded
                            </>
                          ) : (
                            'Download Report'
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className={styles.docCard}>
                    <div className={styles.docDetails}>
                      <div className={styles.docIconWrap}>
                        <FileText size={17} color="var(--text-muted)" />
                      </div>
                      <div>
                        <div className={styles.docTitle}>Environmental_Clearance_2026.pdf</div>
                        <div className={styles.docMeta}>1.2 MB &bull; Public Works NOC &amp; Registry</div>
                      </div>
                    </div>
                    <button className={styles.actionDownloadBtnSecondary}>View Summary</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Focused Intelligence Inspector */}
        <div className={styles.intelligenceColumn}>
          {/* Quick HUD Metrics Strip */}
          <div className={styles.quickHud}>
            <div className={styles.hudPill}>
              <Lock size={14} color="var(--accent-success)" />
              <div>
                <span className={styles.hudLabel}>Privacy Saved</span>
                <span className={styles.hudVal} style={{ color: 'var(--accent-success)' }}>91.5%</span>
              </div>
            </div>

            <div className={styles.hudPill}>
              <AlertTriangle size={14} color="var(--accent-warning)" />
              <div>
                <span className={styles.hudLabel}>Risk Tier</span>
                <span className={styles.hudVal} style={{ color: 'var(--accent-warning)' }}>MEDIUM</span>
              </div>
            </div>

            <div className={styles.hudPill}>
              <Zap size={14} color="var(--accent-primary)" />
              <div>
                <span className={styles.hudLabel}>Confidence</span>
                <span className={styles.hudVal} style={{ color: 'var(--accent-primary)' }}>96%</span>
              </div>
            </div>
          </div>

          {/* Tabbed Inspector Card */}
          <div className={`card ${styles.inspectorCard}`}>
            <div className={styles.inspectorTabBar}>
              <button 
                className={`${styles.inspectorTabBtn} ${activeTab === 'trace' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('trace')}
              >
                <Layers size={13} />
                Action Trace
              </button>
              <button 
                className={`${styles.inspectorTabBtn} ${activeTab === 'privacy' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                <Lock size={13} />
                Privacy &amp; Risk
              </button>
              <button 
                className={`${styles.inspectorTabBtn} ${activeTab === 'logs' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('logs')}
              >
                <Cpu size={13} />
                Live Logs
              </button>
            </div>

            {/* Tab 1: Action Trace */}
            {activeTab === 'trace' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.paneHeaderRow}>
                  <div>
                    <h4 className={styles.paneTitle}>Explainable Execution Trace</h4>
                    <p className={styles.paneSub}>Transparent 6-stage decision pipeline</p>
                  </div>
                  <button className={styles.copyJsonBtn} onClick={handleCopyTrace}>
                    {copiedTrace ? <Check size={12} color="var(--accent-success)" /> : <Copy size={12} />}
                    <span>{copiedTrace ? 'Copied' : 'JSON'}</span>
                  </button>
                </div>

                <div className={styles.traceTimeline}>
                  {executionTrace.map((step) => {
                    const isActive = step.status === 'active';
                    const isDone = step.status === 'completed';
                    return (
                      <div 
                        key={step.id} 
                        className={`${styles.traceStep} ${isActive ? styles.trace_active : ''} ${isDone ? styles.trace_completed : ''}`}
                      >
                        <div className={styles.traceStepTop}>
                          <div className={styles.traceStepLeft}>
                            <div className={styles.traceNodeDot}></div>
                            <span className={styles.traceStepLabel}>{step.name}</span>
                          </div>
                          <span className={styles.traceBadge}>{step.badge}</span>
                        </div>
                        {(isActive || isDone) && (
                          <div className={styles.traceDetailBox}>
                            {step.details}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {simulateSelfCorrection && correctionAttempts === 1 && (
                  <div className={styles.selfCorrectionNotice}>
                    <RefreshCw size={13} />
                    <span>Self-Correction loop automatically recovered target state</span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Privacy & Risk Budget */}
            {activeTab === 'privacy' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.inspectorSection}>
                  <h4 className={styles.paneTitle}>Differential Privacy Budget</h4>
                  <div className={styles.budgetGaugeContainer}>
                    <div className={styles.gaugeHeader}>
                      <span>Transmission Protection</span>
                      <strong className={styles.gaugeValue}>91.5% Minimized</strong>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '91.5%' }}></div>
                    </div>
                    <div className={styles.budgetBreakdownRow}>
                      <div>
                        <span className={styles.subText}>Entities Masked</span>
                        <strong>3 Items</strong>
                      </div>
                      <div>
                        <span className={styles.subText}>DOM Nodes Cleaned</span>
                        <strong>14 Nodes</strong>
                      </div>
                      <div>
                        <span className={styles.subText}>Payload Epsilon</span>
                        <strong>0.14 ε</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.inspectorSection}>
                  <h4 className={styles.paneTitle}>Adaptive Perception Architecture</h4>
                  <div className={styles.dualEngineGrid}>
                    <div className={styles.engineCol}>
                      <span className={styles.engineLabel}>Primary Tier</span>
                      <div className={styles.engineBadgeRow}>
                        <span className="badge success">DOM Fast-Path</span>
                        <span className={styles.engineTime}>12ms</span>
                      </div>
                      <p className={styles.engineSub}>Zero-token local parsing for standard semantic web elements</p>
                    </div>

                    <div className={styles.engineCol}>
                      <span className={styles.engineLabel}>Fallback Tier</span>
                      <div className={styles.engineBadgeRow}>
                        <span className="badge warning">Local ONNX Vision</span>
                        <span className={styles.engineTime}>38ms</span>
                      </div>
                      <p className={styles.engineSub}>On-device WebGPU visual grounding for unstructured canvas</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Live Logs */}
            {activeTab === 'logs' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.paneHeaderRow}>
                  <div>
                    <h4 className={styles.paneTitle}>Perception Engine Terminal</h4>
                    <p className={styles.paneSub}>Live WebGPU / WASM execution logs</p>
                  </div>
                </div>

                <div className={styles.liveLogBox}>
                  {logs.map((l, i) => (
                    <div key={i} className={styles.liveLogItem}>
                      <span className={styles.liveLogTime}>{l.time}</span>
                      <span className={styles['log_' + l.type]}>{l.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
