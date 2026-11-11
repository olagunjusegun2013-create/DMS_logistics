import React, { useState } from 'react';
import { AuditLog, ScreenId } from '../../types/logistics';

interface AuditLogsSectionProps {
  logs: AuditLog[];
  onNavigate: (screenId: ScreenId) => void;
}

export const AuditLogsSection: React.FC<AuditLogsSectionProps> = ({ logs }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredLogs = logs.filter((log) => {
    if (filterCategory !== 'All' && log.category !== filterCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.userName.toLowerCase().includes(q) ||
        log.recordId.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportAudit = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Timestamp,User,Role,Action,RecordID,Category,Details\n' +
      logs
        .map(
          (l) =>
            `"${l.timestamp}","${l.userName}","${l.userRole}","${l.action}","${l.recordId}","${l.category}","${l.details.replace(/"/g, '""')}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Logicore_Compliance_Audit_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Immutable audit log exported for ISO 27001 compliance verification.');
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">policy</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              System Audit Logs &amp; Activity History
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Immutable chain-of-custody ledger, administrative overrides, security actions, and courier state updates
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportAudit}
          className="px-4 py-2 bg-[#142b45] hover:bg-[#00162e] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer self-start"
        >
          <span className="material-symbols-outlined text-[16px]">file_download</span>
          Export Compliance Trail (CSV)
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, officer, record ID, or details..."
            className="w-full bg-[#f8f9ff] text-xs px-3 py-2 pl-9 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Auth', 'Order', 'Driver', 'Payment', 'Exception', 'System'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                filterCategory === cat
                  ? 'bg-[#142b45] text-white shadow-xs'
                  : 'text-[#74777e] hover:bg-[#f8f9ff] hover:text-[#0c1d2c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-xs">
            <thead className="bg-[#eef4ff] text-[#43474d] font-semibold uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Responsible User / Role</th>
                <th className="p-3.5">Action Code</th>
                <th className="p-3.5">Affected Record</th>
                <th className="p-3.5">Audit Detail</th>
                <th className="p-3.5 text-right">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f8f9ff] transition-colors">
                  <td className="p-3.5 text-[#74777e] text-[11px] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3.5 font-sans">
                    <span className="font-bold text-[#0c1d2c] block">{log.userName}</span>
                    <span className="text-[10px] text-secondary font-mono">{log.userRole}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#0c1d2c] font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-blue-700 font-bold">{log.recordId}</td>
                  <td className="p-3.5 font-sans text-xs text-[#43474d] max-w-md">{log.details}</td>
                  <td className="p-3.5 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${
                        log.category === 'Auth'
                          ? 'bg-purple-100 text-purple-800'
                          : log.category === 'Order'
                          ? 'bg-blue-100 text-blue-800'
                          : log.category === 'Payment'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.category === 'Exception'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
