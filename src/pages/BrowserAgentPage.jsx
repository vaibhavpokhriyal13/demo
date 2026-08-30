import React, { useState } from 'react';
import {
  Play,
  ShieldCheck,
  Zap,
  MousePointer2,
  FileDown,
  Eye,
  Layers,
  Database,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Fingerprint,
  FileText,
  Lock,
  Cpu,
  Sparkles,
  Copy,
  Check,
  Search,
  Terminal,
  Activity,
  Sliders
} from 'lucide-react';
import styles from './BrowserAgentPage.module.css';

export default function BrowserAgentPage() {
  // Preset Demo Scenarios
  const scenarios = [
    {
      id: 'report',
      title: 'Annual Project Report',
      task: 'Find the project report and download it',
      canvas: false,
      risk: { tier: 'MEDIUM', score: 0.42, reason: 'Verified Gov.in PDF download' },
      piiCount: 3,
      confidence: 96
    },
    {
      id: 'finance',
      title: 'Financial Audit Export',
      task: 'Export Q4 Financial Expenditure and balance sheet',
      canvas: false,
      risk: { tier: 'MEDIUM', score: 0.48, reason: 'Financial tabular data export' },
      piiCount: 4,
      confidence: 93
    },
    {
      id: 'canvas',
      title: 'Canvas Control (Vision)',
      task: 'Locate visual action button on graphical canvas',
      canvas: true,
      risk: { tier: 'LOW', score: 0.18, reason: 'Visual map coordinate inspection' },
      piiCount: 2,
      confidence: 88
    }
  ];

  const [activeScenario, setActiveScenario] = useState('report');
  const [task, setTask] = useState(scenarios[0].task);
  const [agentState, setAgentState] = useState('IDLE'); // IDLE, OBSERVE, DETECT, FILTER, REASON, VALIDATE, EXECUTE, COMPLETED
  const [sanitizedView, setSanitizedView] = useState(true);
  const [highlightSensitives, setHighlightSensitives] = useState(true);
  const [simulateSelfCorrection, setSimulateSelfCorrection] = useState(false);
  const [simulateCanvasTarget, setSimulateCanvasTarget] = useState(false);
  const [copiedTrace, setCopiedTrace] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [activeInspectorTab, setActiveInspectorTab] = useState('trace'); // 'trace', 'security', 'logs'
  
  // Privacy Firewall & Privacy Budget
  const [privacyMode, setPrivacyMode] = useState('balanced'); // strict, balanced, automation
  const [privacyBudget, setPrivacyBudget] = useState({
    totalBytesCaptured: 1680,
    bytesTransmitted: 142,
    percentProtected: 91.5,
    sensitiveBlocked: 3,
    allowedTokens: 11
  });

  // Adaptive Perception
  const [perceptionMode, setPerceptionMode] = useState('DOM_FIRST'); // DOM_FIRST, VISION_ONNX
  const [perceptionTimeMs, setPerceptionTimeMs] = useState(14);

  // Action Risk Engine
  const [actionRisk, setActionRisk] = useState({
    tier: 'MEDIUM',
    score: 0.42,
    reason: 'File Download from verified domain (Gov Portal)',
    autoVerified: true
  });

  // Confidence-Aware Agent
  const [confidenceScore, setConfidenceScore] = useState(96);
  const [ambiguityLevel, setAmbiguityLevel] = useState('LOW');

  // Explainable Action Trace
  const [traceSteps, setTraceSteps] = useState([
    {
      id: 'OBSERVE',
      num: 1,
      label: 'Observe UI',
      desc: 'DOM & Accessibility Tree parsed: 14 interactive nodes, 3 containers',
      status: 'idle',
      badge: 'DOM / a11y',
      expanded: false
    },
    {
      id: 'DETECT',
      num: 2,
      label: 'Detect PII',
      desc: 'Local regex & ONNX detected 3 PII entities: Aadhaar, Phone, Email',
      status: 'idle',
      badge: '3 PII Detected',
      expanded: false
    },
    {
      id: 'FILTER',
      num: 3,
      label: 'Privacy Firewall',
      desc: 'Firewall Policy: Balanced. Redacted PII locally. 0 confidential tokens leaked',
      status: 'idle',
      badge: '0 PII Transmitted',
      expanded: false
    },
    {
      id: 'REASON',
      num: 4,
      label: 'Hybrid Reasoner',
      desc: 'Cloud LLM Reasoner mapped goal -> CLICK(Project_Report.pdf) with sanitized context',
      status: 'idle',
      badge: 'Cloud LLM (Safe)',
      expanded: false
    },
    {
      id: 'VALIDATE',
      num: 5,
      label: 'Risk & Confidence',
      desc: 'Risk: 0.42 (Medium) | Confidence: 96% (>90% threshold for direct execute)',
      status: 'idle',
      badge: 'Risk: Med | Conf: 96%',
      expanded: false
    },
    {
      id: 'EXECUTE',
      num: 6,
      label: 'Execute & Verify',
      desc: 'Dispatched native DOM click event on #download-btn-1. Verified state 200 OK',
      status: 'idle',
      badge: 'Verified Success',
      expanded: false
    }
  ]);

  // Self-Correction Loop State
  const [correctionAttempts, setCorrectionAttempts] = useState(0);

  // Intelligent Local/Cloud Routing State
  const [routingStats, setRoutingStats] = useState({
    localPerceptionDuration: '14ms',
    cloudReasoningDuration: '280ms',
    contextMinimizedPercent: '91.5%'
  });

  // Task Memory
  const [taskMemory] = useState([
    { key: 'Preferred File Format', value: 'PDF Document (.pdf)' },
    { key: 'Target Save Location', value: '/Reports/2026/' },
    { key: 'Verified Safe Domains', value: 'https://gov.in/*' }
  ]);

  const [logs, setLogs] = useState([]);
  
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setLogs(prev => [...prev, { time, message, type }]);
  };

  const handleSelectScenario = (sc) => {
    if (agentState !== 'IDLE' && agentState !== 'COMPLETED') return;
    setActiveScenario(sc.id);
    setTask(sc.task);
    setSimulateCanvasTarget(sc.canvas);
    setActionRisk({
      tier: sc.risk.tier,
      score: sc.risk.score,
      reason: sc.risk.reason,
      autoVerified: true
    });
    setConfidenceScore(sc.confidence);
    setAmbiguityLevel(sc.confidence > 90 ? 'LOW' : 'MEDIUM');
  };

  const updateTraceStep = (stepId, status, customDetail = null) => {
    setTraceSteps(prev => prev.map(s => {
      if (s.id === stepId) {
        return {
          ...s,
          status,
          ...(customDetail ? { desc: customDetail } : {})
        };
      }
      return s;
    }));
  };

  const toggleTraceExpand = (stepId) => {
    setTraceSteps(prev => prev.map(s => s.id === stepId ? { ...s, expanded: !s.expanded } : s));
  };

  const copyTraceJson = () => {
    const payload = JSON.stringify({
      task,
      privacyMode,
      perceptionMode,
      confidenceScore,
      actionRisk,
      traceSteps,
      routingStats,
      timestamp: new Date().toISOString()
    }, null, 2);
    navigator.clipboard.writeText(payload);
    setCopiedTrace(true);
    setTimeout(() => setCopiedTrace(false), 2000);
  };

  const triggerDummyDownload = () => {
    const content = `=== SIH26171 PRIVAGENT VERIFIED DOWNLOAD ===\n\nTask: ${task}\nStatus: Verified Execution\nPrivacy Mode: ${privacyMode.toUpperCase()}\nPrivacy Budget Saved: ${privacyBudget.percentProtected}%\nPerception Mode: ${perceptionMode}\nConfidence Score: ${confidenceScore}%\nRisk Score: ${actionRisk.score}\n\nAll personal identifiers (Aadhaar, Phone, Email) were intercepted and masked locally before cloud reasoning.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Project_Report.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const runAgent = () => {
    if (agentState !== 'IDLE' && agentState !== 'COMPLETED') return;
    
    setLogs([]);
    setCorrectionAttempts(0);
    setTraceSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    // Switch to trace tab automatically so the user sees live execution
    setActiveInspectorTab('trace');

    // STEP 1: Adaptive Perception (DOM vs Local Vision)
    setAgentState('OBSERVE');
    addLog(`Task initiated: "${task}"`, 'primary');
    
    if (simulateCanvasTarget) {
      setPerceptionMode('VISION_ONNX');
      setPerceptionTimeMs(38);
      addLog('Adaptive Perception: Canvas / Visual element detected -> Invoking Local Vision (ONNX Runtime Web)', 'warning');
      updateTraceStep('OBSERVE', 'active', 'Visual-only canvas detected. Local Vision ONNX (WebGPU/WASM) computed bounding boxes in 38ms');
    } else {
      setPerceptionMode('DOM_FIRST');
      setPerceptionTimeMs(12);
      addLog('Adaptive Perception: DOM/a11y First (Fast-Path structural extraction in 12ms)', 'info');
      updateTraceStep('OBSERVE', 'active', 'DOM & Accessibility Tree parsed: 14 interactive nodes, 3 data containers');
    }

    setTimeout(() => {
      updateTraceStep('OBSERVE', 'completed');
      
      // STEP 2: Sensitive Element Detector
      setAgentState('DETECT');
      addLog('Sensitive Element Detector: Scanning for PII entities...', 'warning');
      updateTraceStep('DETECT', 'active');
      addLog('Detected: [Aadhaar: 4321-8765-1098] | [Phone: 9876543210] | [Email: vaibhav@example.com]', 'warning');
    }, 1100);

    // STEP 3: Privacy Firewall & Privacy Budget
    setTimeout(() => {
      updateTraceStep('DETECT', 'completed');
      setAgentState('FILTER');
      addLog(`Privacy Firewall [Mode: ${privacyMode.toUpperCase()}]: Enforcing local masking...`, 'primary');
      updateTraceStep('FILTER', 'active');
      
      if (privacyMode === 'strict') {
        setPrivacyBudget({
          totalBytesCaptured: 1680,
          bytesTransmitted: 94,
          percentProtected: 94.4,
          sensitiveBlocked: 3,
          allowedTokens: 7
        });
      } else {
        setPrivacyBudget({
          totalBytesCaptured: 1680,
          bytesTransmitted: 142,
          percentProtected: 91.5,
          sensitiveBlocked: 3,
          allowedTokens: 11
        });
      }
      setSanitizedView(true);
      addLog('Privacy Firewall: Zero PII permitted across boundary. 91.5% context minimized.', 'success');
    }, 2200);

    // STEP 4: Intelligent Local/Cloud Routing
    setTimeout(() => {
      updateTraceStep('FILTER', 'completed');
      setAgentState('REASON');
      addLog('Intelligent Router: Dispatching sanitized structured tokens to LLM...', 'info');
      updateTraceStep('REASON', 'active');
      
      setRoutingStats({
        localPerceptionDuration: `${perceptionTimeMs}ms`,
        cloudReasoningDuration: '280ms',
        contextMinimizedPercent: '91.5%'
      });
      addLog('LLM Reasoning output: Proposed CLICK(#download-report-btn)', 'primary');
    }, 3400);

    // STEP 5: Action Risk & Permission Engine + Confidence Scoring
    setTimeout(() => {
      updateTraceStep('REASON', 'completed');
      setAgentState('VALIDATE');
      
      const calculatedConf = simulateCanvasTarget ? 88 : 96;
      setConfidenceScore(calculatedConf);
      setAmbiguityLevel(calculatedConf > 90 ? 'LOW' : 'MEDIUM');

      setActionRisk({
        tier: 'MEDIUM',
        score: 0.42,
        reason: 'File Download (Safe domain: gov.in)',
        autoVerified: true
      });

      addLog(`Confidence-Aware Agent: Confidence = ${calculatedConf}% (>90% Auto-Execute)`, 'success');
      addLog('Action Risk Engine: Evaluated CLICK(Download) -> Risk: MEDIUM (0.42) - Pre-validated', 'success');
      updateTraceStep('VALIDATE', 'active');
    }, 4500);

    // STEP 6: Self-Correction Loop / Execution
    setTimeout(() => {
      updateTraceStep('VALIDATE', 'completed');
      
      if (simulateSelfCorrection) {
        setAgentState('EXECUTE');
        setCorrectionAttempts(1);
        addLog('Self-Correction Loop: Initial target selector stale / intercepted!', 'warning');
        addLog('Re-perceiving local DOM state and selecting alternative selector...', 'warning');

        setTimeout(() => {
          setCorrectionAttempts(2);
          addLog('Self-Correction: Alternate selector resolved (#btn-download-primary). Verified state match.', 'success');
          updateTraceStep('EXECUTE', 'active', 'Self-corrected selector (#btn-download-primary). Verified state change: 200 OK');
          
          setTimeout(() => {
            triggerDummyDownload();
            setAgentState('COMPLETED');
            updateTraceStep('EXECUTE', 'completed');
            addLog('Task Completed Successfully with verified trace', 'success');
          }, 1100);
        }, 1300);
      } else {
        setAgentState('EXECUTE');
        updateTraceStep('EXECUTE', 'active');
        addLog('Local Executor: Triggering action on verified element...', 'primary');
        
        setTimeout(() => {
          triggerDummyDownload();
          setAgentState('COMPLETED');
          updateTraceStep('EXECUTE', 'completed');
          addLog('Task Completed Successfully with verified trace', 'success');
        }, 1100);
      }
    }, 5600);
  };

  const isRunning = agentState !== 'IDLE' && agentState !== 'COMPLETED';

  return (
    <div className={styles.container}>
      {/* Top Header Bar */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>AI Browser Agent</h2>
            <span className="badge primary">SIH26171 Sandbox</span>
          </div>
          <p className={styles.subtitle}>
            On-device visual perception &bull; Local PII firewall &bull; Risk validation &bull; Explainable action trace
          </p>
        </div>

        {/* Header Telemetry Badges */}
        <div className={styles.headerBadges}>
          <div className={`${styles.statusChip} ${isRunning ? styles.statusPulse : ''}`}>
            <span className={styles.chipDot}></span>
            <span>Pipeline: <strong>{agentState === 'IDLE' ? 'STANDBY' : agentState}</strong></span>
          </div>

          <div className={styles.perceptionChip}>
            {perceptionMode === 'DOM_FIRST' ? (
              <span className="badge success">
                <Zap size={12} /> Fast-Path ({perceptionTimeMs}ms)
              </span>
            ) : (
              <span className="badge warning">
                <Eye size={12} /> ONNX Vision ({perceptionTimeMs}ms)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Unified Command & Scenario Bar */}
      <div className={`card ${styles.commandHubCard}`}>
        {/* Preset scenario selection pills */}
        <div className={styles.presetSection}>
          <span className={styles.presetLabel}>PRESETS:</span>
          <div className={styles.presetChips}>
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                className={`${styles.presetBtn} ${activeScenario === sc.id ? styles.presetActive : ''}`}
                onClick={() => handleSelectScenario(sc)}
                disabled={isRunning}
              >
                <Sparkles size={12} />
                <span>{sc.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Input Row */}
        <div className={styles.commandInputRow}>
          <div className={styles.inputBox}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.taskInput}
              value={task} 
              onChange={(e) => setTask(e.target.value)}
              disabled={isRunning}
              placeholder="Enter instructions (e.g. Find project report and download it)"
            />
          </div>

          <div className={styles.commandActions}>
            <button 
              className={styles.optionsToggleBtn}
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              title="Configure Privacy Mode & Simulation Switches"
            >
              <Sliders size={15} />
              <span>Config</span>
              {showAdvancedControls ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            <button 
              className={`${styles.runBtn} ${isRunning ? styles.runningBtn : ''}`}
              onClick={runAgent}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Zap className="processing-pulse" size={16} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Execute Agent
                </>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Config Drawer */}
        {showAdvancedControls && (
          <div className={`${styles.advancedConfigDrawer} fade-in`}>
            {/* Privacy Mode Switcher */}
            <div className={styles.drawerGroup}>
              <span className={styles.drawerGroupLabel}>
                <Lock size={13} color="var(--accent-primary)" /> Privacy Firewall:
              </span>
              <div className={styles.pillGroup}>
                {['strict', 'balanced', 'automation'].map((mode) => (
                  <button
                    key={mode}
                    className={`${styles.pillBtn} ${privacyMode === mode ? styles.activePill : ''}`}
                    onClick={() => setPrivacyMode(mode)}
                    disabled={isRunning}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.drawerDivider}></div>

            {/* Interactive Simulation Switches */}
            <div className={styles.drawerToggles}>
              <label className={styles.toggleItem}>
                <input 
                  type="checkbox" 
                  checked={simulateSelfCorrection}
                  onChange={(e) => setSimulateSelfCorrection(e.target.checked)}
                  disabled={isRunning}
                />
                <RefreshCw size={12} />
                <span>Simulate Self-Correction</span>
              </label>

              <label className={styles.toggleItem}>
                <input 
                  type="checkbox" 
                  checked={simulateCanvasTarget}
                  onChange={(e) => setSimulateCanvasTarget(e.target.checked)}
                  disabled={isRunning}
                />
                <Eye size={12} />
                <span>Simulate Canvas/Visual Target</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Sleek Horizontal Stepper Pipeline */}
      <div className={styles.stepperContainer}>
        {traceSteps.map((st, i) => {
          const isDone = st.status === 'completed';
          const isActive = st.status === 'active';
          return (
            <React.Fragment key={st.id}>
              <div className={`${styles.stepperItem} ${isActive ? styles.stepActive : ''} ${isDone ? styles.stepDone : ''}`}>
                <div className={styles.stepCircle}>
                  {isDone ? <Check size={12} /> : <span>{st.num}</span>}
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepName}>{st.label}</span>
                  <span className={styles.stepSubBadge}>{st.badge}</span>
                </div>
              </div>
              {i < traceSteps.length - 1 && <div className={`${styles.stepLine} ${isDone ? styles.stepLineDone : ''}`}></div>}
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Segregated 2-Column Responsive Workspace */}
      <div className={styles.mainWorkspace}>
        {/* Left Column: Simulated Browser Window */}
        <div className={styles.browserColumn}>
          {/* Browser Controls & View Mode */}
          <div className={styles.browserToolbar}>
            <div className={styles.viewToggleGroup}>
              <button 
                className={`${styles.viewBtn} ${sanitizedView ? styles.viewBtnActive : ''}`}
                onClick={() => setSanitizedView(true)}
              >
                <ShieldCheck size={13} color="var(--accent-success)" />
                Sanitized (Safe View)
              </button>
              <button 
                className={`${styles.viewBtn} ${!sanitizedView ? styles.viewBtnActive : ''}`}
                onClick={() => setSanitizedView(false)}
              >
                Raw Page View
              </button>
            </div>

            <label className={styles.inlineCheck}>
              <input 
                type="checkbox" 
                checked={highlightSensitives}
                onChange={(e) => setHighlightSensitives(e.target.checked)}
              />
              Show PII Bounds
            </label>
          </div>

          {/* Mock Browser Frame */}
          <div className={styles.browserFrame}>
            {/* Window Header */}
            <div className={styles.browserFrameHeader}>
              <div className={styles.dots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.urlBar}>
                <Lock size={11} color="#10b981" />
                <span>https://gov.in/portal/infrastructure/reports</span>
              </div>
              <span className={styles.sslBadge}>Protected Context</span>
            </div>

            <div className={styles.browserFrameContent}>
              {/* Scan Laser Overlay */}
              {(agentState === 'OBSERVE' || agentState === 'DETECT') && (
                <div className={styles.scanOverlay}></div>
              )}

              {/* Cursor Simulation during execution */}
              {(agentState === 'EXECUTE') && (
                <div className={styles.cursorSim}>
                  <MousePointer2 size={24} fill="#3b82f6" color="#ffffff" />
                  <span className={styles.cursorLabel}>
                    {simulateSelfCorrection && correctionAttempts === 1 ? 'Retrying Alternate Selector...' : 'Clicking Target'}
                  </span>
                </div>
              )}

              {/* Web Page Body */}
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
                    <Fingerprint size={15} color="var(--accent-primary)" />
                    Project Metadata (Firewall Active)
                  </span>
                  <div className={styles.detectorBadgesList}>
                    <span className="badge warning">■ Aadhaar Masked</span>
                    <span className="badge warning">■ Phone Masked</span>
                    <span className="badge warning">■ Email Masked</span>
                  </div>
                </div>

                <div className={styles.dataFieldsGrid}>
                  <div className={styles.dataFieldItem}>
                    <span className={styles.fieldLabel}>Project Name:</span>
                    <span className={styles.fieldValAllowed}>Smart Urban Corridor Phase II</span>
                  </div>
                  <div className={styles.dataFieldItem}>
                    <span className={styles.fieldLabel}>Manager:</span>
                    <span className={styles.fieldValAllowed}>Vaibhav Sharma</span>
                  </div>
                  
                  {/* PII Field 1: Phone */}
                  <div className={`${styles.dataFieldItem} ${highlightSensitives && agentState === 'DETECT' ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Contact Phone:</span>
                    {sanitizedView ? (
                      <span className="redacted-block" style={{ width: '110px' }}></span>
                    ) : (
                      <span className={styles.rawPii}>+91 98765 43210</span>
                    )}
                    <span className={styles.tagPii}>Phone</span>
                  </div>

                  {/* PII Field 2: Aadhaar Number */}
                  <div className={`${styles.dataFieldItem} ${highlightSensitives && agentState === 'DETECT' ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Gov ID / Aadhaar:</span>
                    {sanitizedView ? (
                      <span className="redacted-block" style={{ width: '130px' }}></span>
                    ) : (
                      <span className={styles.rawPii}>4321 8765 1098</span>
                    )}
                    <span className={styles.tagPii}>Gov ID</span>
                  </div>

                  {/* PII Field 3: Email */}
                  <div className={`${styles.dataFieldItem} ${highlightSensitives && agentState === 'DETECT' ? styles.fieldHighlight : ''}`}>
                    <span className={styles.fieldLabel}>Email Address:</span>
                    {sanitizedView ? (
                      <span className="redacted-block" style={{ width: '140px' }}></span>
                    ) : (
                      <span className={styles.rawPii}>vaibhav.sharma@gov.in</span>
                    )}
                    <span className={styles.tagPii}>Email</span>
                  </div>

                  <div className={styles.dataFieldItem}>
                    <span className={styles.fieldLabel}>Clearance Status:</span>
                    <span className="badge success">Approved &amp; Public</span>
                  </div>
                </div>
              </div>

              {/* Action Target Section: Documents List */}
              <div className={styles.actionSection}>
                <div className={styles.actionHeader}>
                  <FileText size={16} color="var(--accent-primary)" />
                  <h4>Target Documents &amp; Exports</h4>
                </div>

                <div className={styles.docListGrid}>
                  {/* Target 1: Target Match */}
                  <div className={`${styles.docCard} ${agentState === 'EXECUTE' || agentState === 'COMPLETED' ? styles.docCardActive : ''}`}>
                    <div className={styles.docDetails}>
                      <div className={styles.docIconWrap}>
                        <FileDown size={18} color="var(--accent-primary)" />
                      </div>
                      <div>
                        <div className={styles.docTitle}>Project_Report.pdf</div>
                        <div className={styles.docMeta}>Annual Comprehensive Audit (2.4 MB) &bull; Public</div>
                      </div>
                    </div>

                    <div className={styles.docActionArea}>
                      {simulateCanvasTarget ? (
                        <div className={styles.canvasButtonSim}>
                          <span>[Canvas Action Target]</span>
                        </div>
                      ) : (
                        <button 
                          id="download-btn-1"
                          className={`${styles.actionDownloadBtn} ${agentState === 'EXECUTE' || agentState === 'COMPLETED' ? styles.btnExecuting : ''}`}
                        >
                          <FileDown size={14} />
                          Download PDF
                        </button>
                      )}
                      
                      {agentState === 'VALIDATE' && (
                        <span className="badge warning">Validating Risk...</span>
                      )}
                    </div>
                  </div>

                  {/* Target 2: Financial Report */}
                  <div className={styles.docCard}>
                    <div className={styles.docDetails}>
                      <div className={styles.docIconWrap}>
                        <FileDown size={18} color="var(--text-muted)" />
                      </div>
                      <div>
                        <div className={styles.docTitle}>Financial_Quarterly_Report.pdf</div>
                        <div className={styles.docMeta}>Q4 Expenditure &amp; Balance Sheet (1.8 MB)</div>
                      </div>
                    </div>
                    <button className={styles.actionDownloadBtnSecondary}>
                      <FileDown size={14} />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Segregated Tabbed Intelligence Inspector */}
        <div className={styles.intelligenceColumn}>
          {/* Top Quick Telemetry HUD (3 Instant Metrics) */}
          <div className={styles.quickHud}>
            <div className={styles.hudPill}>
              <ShieldCheck size={14} color="var(--accent-success)" />
              <div>
                <span className={styles.hudLabel}>Privacy Saved</span>
                <span className={styles.hudVal} style={{ color: 'var(--accent-success)' }}>{privacyBudget.percentProtected}%</span>
              </div>
            </div>

            <div className={styles.hudPill}>
              <SlidersHorizontal size={14} color="var(--accent-warning)" />
              <div>
                <span className={styles.hudLabel}>Risk Tier</span>
                <span className={styles.hudVal} style={{ color: '#fbbf24' }}>{actionRisk.tier} ({actionRisk.score})</span>
              </div>
            </div>

            <div className={styles.hudPill}>
              <Zap size={14} color="var(--accent-primary)" />
              <div>
                <span className={styles.hudLabel}>Confidence</span>
                <span className={styles.hudVal} style={{ color: 'var(--accent-primary)' }}>{confidenceScore}%</span>
              </div>
            </div>
          </div>

          {/* Inspector Segmented Tab Navigation */}
          <div className={`card ${styles.inspectorCard}`}>
            <div className={styles.inspectorTabBar}>
              <button 
                className={`${styles.inspectorTabBtn} ${activeInspectorTab === 'trace' ? styles.tabActive : ''}`}
                onClick={() => setActiveInspectorTab('trace')}
              >
                <Layers size={14} />
                <span>Action Trace</span>
              </button>

              <button 
                className={`${styles.inspectorTabBtn} ${activeInspectorTab === 'security' ? styles.tabActive : ''}`}
                onClick={() => setActiveInspectorTab('security')}
              >
                <ShieldCheck size={14} />
                <span>Privacy &amp; Risk</span>
              </button>

              <button 
                className={`${styles.inspectorTabBtn} ${activeInspectorTab === 'logs' ? styles.tabActive : ''}`}
                onClick={() => setActiveInspectorTab('logs')}
              >
                <Terminal size={14} />
                <span>Logs &amp; Memory</span>
                {logs.length > 0 && <span className={styles.logCountBadge}>{logs.length}</span>}
              </button>
            </div>

            {/* TAB CONTENT 1: ACTION TRACE */}
            {activeInspectorTab === 'trace' && (
              <div className={`${styles.tabPane} fade-in`}>
                <div className={styles.paneHeaderRow}>
                  <div>
                    <h4 className={styles.paneTitle}>Explainable Execution Pipeline</h4>
                    <p className={styles.paneSub}>Transparent 6-stage autonomous decision trail</p>
                  </div>
                  <button className={styles.copyJsonBtn} onClick={copyTraceJson}>
                    {copiedTrace ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedTrace ? 'Copied' : 'JSON'}</span>
                  </button>
                </div>

                <div className={styles.traceTimeline}>
                  {traceSteps.map((step) => (
                    <div 
                      key={step.id} 
                      className={`${styles.traceStep} ${styles['trace_' + step.status]}`}
                    >
                      <div className={styles.traceStepTop} onClick={() => toggleTraceExpand(step.id)}>
                        <div className={styles.traceStepLeft}>
                          <span className={styles.traceNodeDot}></span>
                          <span className={styles.traceStepLabel}>{step.num}. {step.label}</span>
                        </div>
                        <div className={styles.traceStepRight}>
                          <span className={styles.traceBadge}>{step.badge}</span>
                          {step.expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </div>
                      </div>

                      {step.expanded && (
                        <div className={`${styles.traceDetailBox} fade-in`}>
                          <p>{step.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {simulateSelfCorrection && correctionAttempts > 0 && (
                  <div className={styles.selfCorrectionNotice}>
                    <RefreshCw size={13} className="processing-pulse" />
                    <span>Self-Correction Loop: Alternative target selector resolved successfully</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: PRIVACY & RISK ENGINE */}
            {activeInspectorTab === 'security' && (
              <div className={`${styles.tabPane} fade-in`}>
                {/* Section A: Privacy Budget */}
                <div className={styles.inspectorSection}>
                  <div className={styles.sectionHeaderRow}>
                    <ShieldCheck size={16} color="var(--accent-success)" />
                    <h4 className={styles.sectionHeading}>On-Device Privacy Firewall</h4>
                  </div>

                  <div className={styles.budgetGaugeContainer}>
                    <div className={styles.gaugeHeader}>
                      <span>Protected Context Ratio</span>
                      <strong className={styles.gaugeValue}>{privacyBudget.percentProtected}%</strong>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${privacyBudget.percentProtected}%` }}
                      ></div>
                    </div>
                    <div className={styles.budgetBreakdownRow}>
                      <div>
                        <span className={styles.subText}>Captured</span>
                        <strong>{privacyBudget.totalBytesCaptured} B</strong>
                      </div>
                      <div>
                        <span className={styles.subText}>Transmitted</span>
                        <strong style={{ color: 'var(--accent-primary)' }}>{privacyBudget.bytesTransmitted} B</strong>
                      </div>
                      <div>
                        <span className={styles.subText}>PII Masked</span>
                        <strong style={{ color: 'var(--accent-warning)' }}>{privacyBudget.sensitiveBlocked} items</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section B: Action Risk & Confidence */}
                <div className={styles.inspectorSection}>
                  <div className={styles.sectionHeaderRow}>
                    <SlidersHorizontal size={16} color="var(--accent-primary)" />
                    <h4 className={styles.sectionHeading}>Risk &amp; Confidence Engine</h4>
                  </div>

                  <div className={styles.dualEngineGrid}>
                    <div className={styles.engineCol}>
                      <span className={styles.engineLabel}>Action Risk</span>
                      <div className={styles.engineBadgeRow}>
                        <span className={`badge risk-${actionRisk.tier.toLowerCase()}`}>
                          {actionRisk.tier} ({actionRisk.score})
                        </span>
                      </div>
                      <p className={styles.engineSub}>{actionRisk.reason}</p>
                    </div>

                    <div className={styles.engineCol}>
                      <span className={styles.engineLabel}>Confidence</span>
                      <div className={styles.engineBadgeRow}>
                        <span className={`badge ${confidenceScore > 90 ? 'success' : 'warning'}`}>
                          {confidenceScore}%
                        </span>
                        <span className="badge primary" style={{ fontSize: '0.62rem' }}>
                          {ambiguityLevel} Ambiguity
                        </span>
                      </div>
                      <p className={styles.engineSub}>
                        {confidenceScore > 90 ? '⚡ Direct Execute' : '🔍 Evidence Verified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section C: Hybrid Latency Routing */}
                <div className={styles.inspectorSection}>
                  <div className={styles.sectionHeaderRow}>
                    <Cpu size={16} color="var(--accent-purple)" />
                    <h4 className={styles.sectionHeading}>Intelligent Hybrid Latency</h4>
                  </div>

                  <div className={styles.routingStatsRow}>
                    <div className={styles.routingStatBox}>
                      <span className={styles.subText}>Local Perception</span>
                      <strong style={{ color: 'var(--accent-primary)' }}>{routingStats.localPerceptionDuration}</strong>
                    </div>
                    <div className={styles.routingStatBox}>
                      <span className={styles.subText}>LLM Reasoning</span>
                      <strong style={{ color: 'var(--accent-purple)' }}>{routingStats.cloudReasoningDuration}</strong>
                    </div>
                    <div className={styles.routingStatBox}>
                      <span className={styles.subText}>Context Minimized</span>
                      <strong style={{ color: 'var(--accent-success)' }}>{routingStats.contextMinimizedPercent}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: LOGS & TASK MEMORY */}
            {activeInspectorTab === 'logs' && (
              <div className={`${styles.tabPane} fade-in`}>
                {/* Live Logs */}
                <div className={styles.inspectorSection}>
                  <div className={styles.sectionHeaderRow}>
                    <Activity size={16} color="var(--accent-primary)" />
                    <h4 className={styles.sectionHeading}>Live Execution Terminal</h4>
                  </div>

                  <div className={styles.liveLogBox}>
                    {logs.length === 0 ? (
                      <div className={styles.emptyLog}>Ready for execution. Click "Execute Agent" above.</div>
                    ) : (
                      logs.map((l, i) => (
                        <div key={i} className={styles.liveLogItem}>
                          <span className={styles.liveLogTime}>{l.time}</span>
                          <span className={styles[`log_${l.type}`]}>{l.message}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Task Memory */}
                <div className={styles.inspectorSection}>
                  <div className={styles.sectionHeaderRow}>
                    <Database size={16} color="var(--accent-cyan)" />
                    <h4 className={styles.sectionHeading}>Safe Task Memory (Zero Credentials)</h4>
                  </div>

                  <div className={styles.memoryItemsList}>
                    {taskMemory.map((mem, idx) => (
                      <div key={idx} className={styles.memoryItem}>
                        <span className={styles.memoryKey}>{mem.key}:</span>
                        <span className={styles.memoryVal}>{mem.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
