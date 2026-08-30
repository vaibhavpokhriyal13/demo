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
  Fingerprint,
  Building2,
  ShieldCheck,
  CreditCard,
  Download,
  Calendar,
  MapPin,
  FileSpreadsheet,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Plus
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
      badge: '4 PII Detected',
      status: 'pending',
      details: 'On-device Regex & NLP marked Aadhaar, Phone, PAN, and Bank Account.'
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
      details: 'Synthesized target: CLICK(Q4_Project_Expenditure_Report_2026.pdf) using sanitized context.'
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
        addLog('Fast-Path Perception complete: 24 DOM elements parsed in 12ms', 'success');
      }
      setAgentState('DETECT');
    }, 800);

    // Stage 2: DETECT
    setTimeout(() => {
      updateTraceStep('DETECT', 'active');
      addLog('Scanning for PII & sensitive entities with local token dictionary...', 'info');
      setTimeout(() => {
        updateTraceStep('DETECT', 'completed', 'Detected 4 sensitive entities: Aadhaar, Phone, PAN, Bank Account.');
        addLog('Sensitive Element Detector tagged 4 PII items for redaction', 'warning');
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
        updateTraceStep('REASON', 'completed', 'Intent identified: CLICK(Q4_Project_Expenditure_Report_2026.pdf download button).');
        addLog('Action Proposal received: Intent: CLICK_ELEMENT | Target: [data-doc-id="report_q4_2026"]', 'primary');
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
            <Search size={16} className={styles.searchIcon} />
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
              <Sliders size={13} />
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
                  <Zap className="processing-pulse" size={14} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
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

      {/* 2-Column Responsive Workspace */}
      <div className={styles.mainWorkspace}>
        {/* Left: Authentic Living Web Browser Window */}
        <div className={styles.browserColumn}>
          <div className={styles.browserFrame}>
            {/* Real Browser Chrome Tabs Bar */}
            <div className={styles.browserTabsHeader}>
              <div className={styles.browserTabActive}>
                <span className={styles.tabFavicon}>🏛️</span>
                <span className={styles.tabTitleText}>NIeP Portal &bull; Project NHAI-2026-SC4</span>
                <span className={styles.tabCloseIcon}>&times;</span>
              </div>
              <div className={styles.browserTabInactive}>
                <span className={styles.tabFavicon}>📊</span>
                <span className={styles.tabTitleText}>PFMS Sanction System</span>
              </div>
              <button className={styles.newTabBtn} title="New Tab"><Plus size={12} /></button>
            </div>

            {/* Browser URL Navigation Bar */}
            <div className={styles.browserNavControlBar}>
              <div className={styles.navArrowsGroup}>
                <button className={styles.navArrowBtn} title="Back"><ArrowLeft size={13} /></button>
                <button className={styles.navArrowBtn} title="Forward"><ArrowRight size={13} /></button>
                <button className={styles.navArrowBtn} title="Reload"><RotateCw size={12} /></button>
                <button className={styles.navArrowBtn} title="Home"><Home size={13} /></button>
              </div>

              <div className={styles.urlAddressBar}>
                <Lock size={12} color="#10b981" />
                <span className={styles.urlProtocol}>https://</span>
                <span className={styles.urlDomain}>eprocure.gov.in</span>
                <span className={styles.urlPath}>/morth/projects/NHAI-2026-SC4/reports.html</span>
              </div>

              <div className={styles.viewModeToggleGroup}>
                <button 
                  className={`${styles.viewBtnPill} ${viewMode === 'sanitized' ? styles.viewBtnPillActive : ''}`}
                  onClick={() => setViewMode('sanitized')}
                  title="Sanitized View: PII replaced with local cryptographic tokens"
                >
                  🛡️ Sanitized (Firewall)
                </button>
                <button 
                  className={`${styles.viewBtnPill} ${viewMode === 'raw' ? styles.viewBtnPillActive : ''}`}
                  onClick={() => setViewMode('raw')}
                  title="Raw View: Live unredacted DOM"
                >
                  👁️ Raw DOM
                </button>
              </div>
            </div>

            {/* Authentic Webpage Body Canvas */}
            <div className={styles.webpageCanvas}>
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

              {/* Official Tricolor National Ribbon */}
              <div className={styles.nationalRibbon}></div>

              {/* Ministry Top Header */}
              <header className={styles.govOfficialHeader}>
                <div className={styles.govEmblemSection}>
                  <div className={styles.ashokaEmblem}>🏛️</div>
                  <div className={styles.govTitlesWrap}>
                    <div className={styles.govGovtLine}>GOVERNMENT OF INDIA &bull; भारत सरकार</div>
                    <div className={styles.govMinistryLine}>Ministry of Road Transport &amp; Highways</div>
                    <div className={styles.govPortalLine}>National Infrastructure e-Governance Portal (NIeP)</div>
                  </div>
                </div>

                <div className={styles.govHeaderUtilities}>
                  <div className={styles.govLangPill}>English | हिन्दी</div>
                  <div className={styles.govSecureBadge}>
                    <ShieldCheck size={12} color="#10b981" />
                    <span>e-Gov SSL Verified</span>
                  </div>
                </div>
              </header>

              {/* Main Website Navigation Menu */}
              <nav className={styles.govNavbar}>
                <a href="#home" className={styles.govNavLink}>Home</a>
                <a href="#projects" className={styles.govNavLink}>Project Directory</a>
                <a href="#sanctions" className={styles.govNavLink}>Sanction Orders</a>
                <a href="#audits" className={`${styles.govNavLink} ${styles.govNavLinkActive}`}>Audits &amp; Reports</a>
                <a href="#kyc" className={styles.govNavLink}>KYC Records</a>
                <a href="#tenders" className={styles.govNavLink}>Tenders</a>
              </nav>

              {/* Notification Ticker */}
              <div className={styles.govNoticeTicker}>
                <span className={styles.tickerTag}>NOTICE:</span>
                <span className={styles.tickerText}>
                  Mandatory Q4 audit verification under RTI Act Section 8(1)(j). Sensitive identity attributes masked by PrivAgent on-device firewall.
                </span>
              </div>

              {/* Breadcrumb Path */}
              <div className={styles.pageBreadcrumbs}>
                <span>e-Portal Home</span> &raquo; <span>National Highways</span> &raquo; <span>Southern Corridor Phase-IV</span> &raquo; <strong style={{ color: 'var(--text-main)' }}>Q4 Expenditure Reports</strong>
              </div>

              {/* Section 1: Official Project Overview Table */}
              <section className={styles.govWebSection}>
                <div className={styles.sectionHeadingBar}>
                  <h4>1. Project Summary &amp; Sanction Details</h4>
                  <span className={styles.liveStatusPill}>Status: Active (84.2% Physical Progress)</span>
                </div>

                <div className={styles.govTableWrapper}>
                  <table className={styles.govDataTable}>
                    <tbody>
                      <tr>
                        <td className={styles.tableHeadCell}>Project Name</td>
                        <td className={styles.tableValCell}><strong>Bengaluru - Chennai Economic Corridor Expressway (Package-IV)</strong></td>
                        <td className={styles.tableHeadCell}>Project ID / Code</td>
                        <td className={styles.tableValCell}><code className={styles.codeSnippet}>NHAI/BOT/2026/SC4-992</code></td>
                      </tr>
                      <tr>
                        <td className={styles.tableHeadCell}>Executing Contractor</td>
                        <td className={styles.tableValCell}>Larsen &amp; Toubro - Tata Infra Construction JV</td>
                        <td className={styles.tableHeadCell}>Sanctioned Budget</td>
                        <td className={styles.tableValCell}><strong style={{ color: 'var(--accent-success)' }}>₹4,280.50 Crores</strong></td>
                      </tr>
                      <tr>
                        <td className={styles.tableHeadCell}>Location Sector</td>
                        <td className={styles.tableValCell}>Karnataka - Tamil Nadu Interstate Border Section</td>
                        <td className={styles.tableHeadCell}>Scheduled Target</td>
                        <td className={styles.tableValCell}>31 December 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 2: Confidential Personnel & Contractor KYC (The Redaction Target) */}
              <section className={styles.govWebSection}>
                <div className={styles.sectionHeadingBar}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Fingerprint size={14} color="var(--accent-primary)" />
                    <h4>2. Officer &amp; Contractor KYC Authorization Directory</h4>
                  </div>
                  <span className={styles.firewallActiveTag}>🛡️ PrivAgent On-Device Masking Active</span>
                </div>

                <div className={styles.govTableWrapper}>
                  <table className={styles.govDataTable}>
                    <thead>
                      <tr>
                        <th>Designation / Entity</th>
                        <th>Authorized Name</th>
                        <th>Sensitive Document UID / Account</th>
                        <th>Classification</th>
                        <th>UIDAI / NSDL Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Principal Director</strong></td>
                        <td>Dr. Rajeshwar Sharma (IAS)</td>
                        <td>
                          {viewMode === 'sanitized' ? (
                            <span className="redacted-block">
                              <Lock size={11} />
                              XXXX-XXXX-8921
                            </span>
                          ) : (
                            <span className={styles.rawPii}>9842-1104-8921</span>
                          )}
                        </td>
                        <td><span className={styles.kycTag}>AADHAAR</span></td>
                        <td><span className={styles.statusVerified}>✅ Verified UIDAI</span></td>
                      </tr>
                      <tr>
                        <td><strong>Site Supervising Eng.</strong></td>
                        <td>Suresh K. Verma</td>
                        <td>
                          {viewMode === 'sanitized' ? (
                            <span className="redacted-block">
                              <Lock size={11} />
                              +91 9840X XXXXX
                            </span>
                          ) : (
                            <span className={styles.rawPii}>+91 98401 23456</span>
                          )}
                        </td>
                        <td><span className={styles.kycTag}>PHONE</span></td>
                        <td><span className={styles.statusVerified}>✅ Verified OTP</span></td>
                      </tr>
                      <tr>
                        <td><strong>Contractor Legal Tax Entity</strong></td>
                        <td>L&amp;T Construction JV</td>
                        <td>
                          {viewMode === 'sanitized' ? (
                            <span className="redacted-block">
                              <Lock size={11} />
                              ABCPSXXXXF
                            </span>
                          ) : (
                            <span className={styles.rawPii}>ABCPS9182F</span>
                          )}
                        </td>
                        <td><span className={styles.kycTag}>PAN_CARD</span></td>
                        <td><span className={styles.statusVerified}>✅ NSDL Valid</span></td>
                      </tr>
                      <tr>
                        <td><strong>Contractor Escrow Account</strong></td>
                        <td>State Bank of India (Disbursement)</td>
                        <td>
                          {viewMode === 'sanitized' ? (
                            <span className="redacted-block">
                              <Lock size={11} />
                              HDFC-0092-XXXX-4421
                            </span>
                          ) : (
                            <span className={styles.rawPii}>HDFC-0092-1049-4421</span>
                          )}
                        </td>
                        <td><span className={styles.kycTag}>BANK_ACC</span></td>
                        <td><span className={styles.statusVerified}>✅ Escrow Tied</span></td>
                      </tr>
                      <tr>
                        <td><strong>Field Financial Auditor</strong></td>
                        <td>Rajesh S. (Comptroller)</td>
                        <td>
                          {viewMode === 'sanitized' ? (
                            <span className="redacted-block">
                              <Lock size={11} />
                              r***@morth.gov.in
                            </span>
                          ) : (
                            <span className={styles.rawPii}>rajesh.s@morth.gov.in</span>
                          )}
                        </td>
                        <td><span className={styles.kycTag}>EMAIL</span></td>
                        <td><span className={styles.statusVerified}>✅ NIC Mailbox</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 3: Official Reports & Downloadable Attachments (Target Element) */}
              <section className={styles.govWebSection}>
                <div className={styles.sectionHeadingBar}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <FileText size={14} color="var(--accent-primary)" />
                    <h4>3. Sanctioned Expenditure Reports &amp; Verified Audit Statements</h4>
                  </div>
                  <span className={styles.publicRecordsCount}>3 Attachments Available</span>
                </div>

                <div className={styles.govTableWrapper}>
                  <table className={styles.govDataTable}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Document Title &amp; Description</th>
                        <th>Size</th>
                        <th>Classification Tier</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Primary Download Target */}
                      <tr className={`${styles.tableTargetRow} ${agentState === 'EXECUTE' ? styles.targetRowHighlight : ''}`}>
                        <td style={{ fontWeight: 'bold' }}>01</td>
                        <td>
                          <div className={styles.docRowTitle}>
                            <FileText size={15} color="var(--accent-primary)" />
                            <strong>Q4_Project_Expenditure_Report_2026.pdf</strong>
                          </div>
                          <div className={styles.docRowSub}>
                            Consolidated Quarterly Expenditure, Fund Utilization &amp; Stage-3 Physical Verification Statement
                          </div>
                        </td>
                        <td>3.8 MB</td>
                        <td><span className={styles.confidentialBadge}>CONFIDENTIAL AUDIT</span></td>
                        <td>
                          {simulateCanvasTarget ? (
                            <span className={styles.canvasButtonSim}>Canvas Vision Element</span>
                          ) : (
                            <button 
                              className={`${styles.govDownloadBtn} ${agentState === 'EXECUTE' ? styles.btnExecuting : ''}`}
                              id="target-download-report"
                            >
                              {agentState === 'COMPLETED' ? (
                                <>
                                  <CheckCircle2 size={13} />
                                  Downloaded
                                </>
                              ) : (
                                <>
                                  <Download size={13} />
                                  Download PDF
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>02</td>
                        <td>
                          <div className={styles.docRowTitle}>
                            <FileSpreadsheet size={15} color="var(--accent-success)" />
                            <strong>Contractor_Escrow_Disbursements_2026.xlsx</strong>
                          </div>
                          <div className={styles.docRowSub}>
                            Itemized Bill Invoice Schedules, Material Test Certifications &amp; Line Estimates
                          </div>
                        </td>
                        <td>1.4 MB</td>
                        <td><span className={styles.publicDocBadge}>FINANCIAL RECORD</span></td>
                        <td>
                          <button className={styles.govDownloadBtnSec}>
                            <Download size={12} /> Download XLS
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>03</td>
                        <td>
                          <div className={styles.docRowTitle}>
                            <FileText size={15} color="var(--text-muted)" />
                            <strong>Environmental_Impact_Assessment_NOC.pdf</strong>
                          </div>
                          <div className={styles.docRowSub}>
                            MoEFCC Statutory Environmental Clearance &amp; Eco-sensitive Buffer Zone Approval
                          </div>
                        </td>
                        <td>2.1 MB</td>
                        <td><span className={styles.publicDocBadge}>STATUTORY NOC</span></td>
                        <td>
                          <button className={styles.govDownloadBtnSec}>
                            <Download size={12} /> Download PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Real Portal Footer */}
              <footer className={styles.govPortalFooter}>
                <div>🇮🇳 Portal Designed &amp; Developed by National Informatics Centre (NIC) &bull; Govt. of India</div>
                <div style={{ color: 'var(--text-subtle)' }}>Last Updated: 30 Aug 2026 | Content Owned by MoRTH</div>
              </footer>
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
                        <strong>4 Items</strong>
                      </div>
                      <div>
                        <span className={styles.subText}>DOM Nodes Cleaned</span>
                        <strong>24 Nodes</strong>
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
