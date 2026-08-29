import React, { useState, useEffect } from 'react';
import { Play, ShieldAlert, ShieldCheck, CheckCircle2, Search, Zap, MousePointer2, FileDown } from 'lucide-react';
import styles from './BrowserAgentPage.module.css';

export default function BrowserAgentPage() {
  const [task, setTask] = useState('Find the project report and download it');
  const [agentState, setAgentState] = useState('IDLE'); // IDLE, PROCESSING, REDACTING, AI_DECISION, ACTION, COMPLETED
  const [sanitizedView, setSanitizedView] = useState(false);
  const [logs, setLogs] = useState([]);
  
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour12: false });
    setLogs(prev => [...prev, { time, message, type }]);
  };

  const triggerDummyDownload = () => {
    const content = "This is a dummy Project Report downloaded during the PrivAgent Demo.\\n\\nIn a real scenario, the AI Agent would have triggered the actual download button on the page without ever seeing the redacted PII (Aadhaar, Phone number, etc).";
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
    setAgentState('PROCESSING');
    setSanitizedView(false);
    
    // Step 1: Scanning
    addLog('Capturing current screen...', 'info');
    
    setTimeout(() => {
      addLog('Local vision model analyzing screen...', 'info');
    }, 1000);

    setTimeout(() => {
      setAgentState('REDACTING');
      addLog('Detecting sensitive information...', 'warning');
    }, 2000);

    setTimeout(() => {
      addLog('3 sensitive elements detected', 'warning');
    }, 3000);

    setTimeout(() => {
      addLog('Redacting sensitive information locally...', 'success');
      setSanitizedView(true);
    }, 4000);

    setTimeout(() => {
      setAgentState('AI_DECISION');
      addLog('Sanitized visual context created', 'success');
      addLog('Sending sanitized context to Server AI...', 'info');
    }, 5000);

    setTimeout(() => {
      addLog('AI decision: Locate Project_Report.pdf', 'primary');
    }, 6500);

    setTimeout(() => {
      setAgentState('ACTION');
      addLog('Action received: Click Download', 'primary');
    }, 7500);

    setTimeout(() => {
      addLog('Download initiated', 'success');
      triggerDummyDownload();
    }, 8500);

    setTimeout(() => {
      setAgentState('COMPLETED');
      addLog('Task completed successfully', 'success');
    }, 9500);
  };

  return (
    <div className={styles.container}>
      {/* Top Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>AI Browser Agent</h2>
          <p className={styles.subtitle}>Test the on-device perception and redaction capabilities.</p>
        </div>
        <div className={styles.statusBadge}>
          Status: <span className={styles[`status${agentState}`]}>{agentState}</span>
        </div>
      </div>

      {/* Task Input Area */}
      <div className={`card ${styles.taskCard}`}>
        <label>What do you want the agent to do?</label>
        <div className={styles.inputGroup}>
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)}
            disabled={agentState !== 'IDLE' && agentState !== 'COMPLETED'}
          />
          <button 
            className={`${styles.runBtn} ${agentState !== 'IDLE' && agentState !== 'COMPLETED' ? styles.running : ''}`}
            onClick={runAgent}
            disabled={agentState !== 'IDLE' && agentState !== 'COMPLETED'}
          >
            {agentState !== 'IDLE' && agentState !== 'COMPLETED' ? (
              <Zap className="processing-pulse" size={18} />
            ) : (
              <Play size={18} />
            )}
            Run Agent
          </button>
        </div>
      </div>

      <div className={styles.mainWorkspace}>
        {/* Left: Browser Mockup */}
        <div className={styles.browserSection}>
          <div className={styles.viewToggle}>
            <button 
              className={!sanitizedView ? styles.activeToggle : ''} 
              onClick={() => setSanitizedView(false)}
            >
              Original View
            </button>
            <button 
              className={sanitizedView ? styles.activeToggle : ''} 
              onClick={() => setSanitizedView(true)}
            >
              Sanitized View
            </button>
          </div>

          <div className={styles.browserWindow}>
            <div className={styles.browserHeader}>
              <div className={styles.dots}><span></span><span></span><span></span></div>
              <div className={styles.url}>https://gov.in/project/dashboard</div>
            </div>
            
            <div className={styles.browserContent}>
              {agentState === 'PROCESSING' && <div className={styles.scanOverlay}></div>}
              {agentState === 'ACTION' && <div className={styles.cursorSim}><MousePointer2 size={24} fill="#fff" /></div>}
              
              <h3>Project Dashboard</h3>
              
              <div className={styles.dataBox}>
                <div className={styles.dataRow}>
                  <span className={styles.label}>Project:</span>
                  <span>Smart Infrastructure Project</span>
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.label}>Manager:</span>
                  <span>Vaibhav Sharma</span>
                </div>
                
                <hr className={styles.divider} />
                
                <div className={styles.dataRow}>
                  <span className={styles.label}>Phone:</span>
                  {sanitizedView ? <span className="redacted-block" style={{width: '100px'}}></span> : <span>9876543210</span>}
                  {!sanitizedView && agentState === 'REDACTING' && <span className={styles.detectHighlight}></span>}
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.label}>Aadhaar:</span>
                  {sanitizedView ? <span className="redacted-block" style={{width: '120px'}}></span> : <span>4321 8765 1098</span>}
                  {!sanitizedView && agentState === 'REDACTING' && <span className={styles.detectHighlight}></span>}
                </div>
                <div className={styles.dataRow}>
                  <span className={styles.label}>Email:</span>
                  {sanitizedView ? <span className="redacted-block" style={{width: '150px'}}></span> : <span>vaibhav@example.com</span>}
                  {!sanitizedView && agentState === 'REDACTING' && <span className={styles.detectHighlight}></span>}
                </div>
              </div>

              <h4 className={styles.docHeader}>Documents</h4>
              <div className={styles.docList}>
                <div className={`${styles.docItem} ${agentState === 'ACTION' || agentState === 'COMPLETED' ? styles.docHighlight : ''}`}>
                  <div className={styles.docInfo}>
                    <FileDown size={18} />
                    <span>Project_Report.pdf</span>
                  </div>
                  <button className={`${styles.downloadBtn} ${agentState === 'ACTION' || agentState === 'COMPLETED' ? styles.btnClicked : ''}`}>Download</button>
                </div>
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileDown size={18} />
                    <span>Financial_Report.pdf</span>
                  </div>
                  <button className={styles.downloadBtn}>Download</button>
                </div>
                <div className={styles.docItem}>
                  <div className={styles.docInfo}>
                    <FileDown size={18} />
                    <span>Project_Schedule.pdf</span>
                  </div>
                  <button className={styles.downloadBtn}>Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Privacy Shield & Logs */}
        <div className={styles.sidebarSection}>
          <div className={`card ${styles.shieldCard}`}>
            <div className="flex-between" style={{marginBottom: '1rem'}}>
              <h3 style={{fontSize: '1.1rem', display: 'flex', alignItems:'center', gap:'0.5rem'}}>
                <ShieldCheck className="text-success" size={20} color="var(--accent-success)" />
                Privacy Shield
              </h3>
            </div>
            
            <div className={styles.shieldChecks}>
              <div className={`${styles.checkItem} ${agentState !== 'IDLE' ? styles.checkDone : ''}`}>
                <CheckCircle2 size={16} /> <span>Screen captured locally</span>
              </div>
              <div className={`${styles.checkItem} ${['REDACTING', 'AI_DECISION', 'ACTION', 'COMPLETED'].includes(agentState) ? styles.checkDone : ''}`}>
                <CheckCircle2 size={16} /> <span>Sensitive info detected</span>
              </div>
              <div className={`${styles.checkItem} ${['AI_DECISION', 'ACTION', 'COMPLETED'].includes(agentState) ? styles.checkDone : ''}`}>
                <CheckCircle2 size={16} /> <span>Data redacted locally</span>
              </div>
              <div className={`${styles.checkItem} ${['AI_DECISION', 'ACTION', 'COMPLETED'].includes(agentState) ? styles.checkDone : ''}`}>
                <CheckCircle2 size={16} /> <span>Sanitized context ready</span>
              </div>
            </div>
          </div>

          <div className={`card ${styles.activityCard}`}>
            <h3 style={{fontSize: '1.1rem', marginBottom: '1rem'}}>Agent Activity</h3>
            <div className={styles.logContainer}>
              {logs.length === 0 && <div className={styles.emptyLog}>Ready to process task...</div>}
              {logs.map((log, index) => (
                <div key={index} className={`${styles.logItem} fade-in`}>
                  <span className={styles.logTime}>{log.time}</span>
                  <span className={`${styles.logMessage} ${styles['log-'+log.type]}`}>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
