import React from 'react';
import { Activity } from 'lucide-react';
import styles from './LogsPage.module.css';

export default function LogsPage() {
  const logs = [
    { id: 1, task: 'Download project report', status: 'Completed', blocked: 3, time: '1.2s' },
    { id: 2, task: 'Find project schedule', status: 'Completed', blocked: 2, time: '0.9s' },
    { id: 3, task: 'Open financial report', status: 'Completed', blocked: 4, time: '1.4s' },
    { id: 4, task: 'Summarize meeting notes', status: 'Failed (Timeout)', blocked: 0, time: '5.0s' },
    { id: 5, task: 'Click login button', status: 'Completed', blocked: 1, time: '0.6s' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Activity Logs</h2>
      <p className={styles.subtitle}>History of agent tasks and privacy interventions.</p>

      <div className={`card ${styles.tableCard}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Sensitive Data</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td className={styles.taskCol}>{log.task}</td>
                <td>
                  <span className={`badge ${log.status.includes('Completed') ? 'success' : 'danger'}`}>
                    {log.status}
                  </span>
                </td>
                <td>
                  {log.blocked > 0 ? (
                    <span className={styles.blockedBadge}>{log.blocked} blocked</span>
                  ) : (
                    <span className={styles.cleanBadge}>Clean</span>
                  )}
                </td>
                <td className={styles.timeCol}>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
