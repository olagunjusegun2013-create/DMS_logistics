import React, { useState } from 'react';
import { DeliveryException, ScreenId } from '../../types/logistics';

interface ExceptionsSectionProps {
  exceptions: DeliveryException[];
  onNavigate: (screenId: ScreenId) => void;
  onUpdateException: (exception: DeliveryException) => void;
  onAddException: (exception: DeliveryException) => void;
}

export const ExceptionsSection: React.FC<ExceptionsSectionProps> = ({
  exceptions,
  onNavigate,
  onUpdateException,
  onAddException,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedException, setSelectedException] = useState<DeliveryException | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrderNo, setNewOrderNo] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newDriver, setNewDriver] = useState('');
  const [newReason, setNewReason] = useState<DeliveryException['reason']>('Customer Unavailable');
  const [newDesc, setNewDesc] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filtered = exceptions.filter((exc) => {
    if (filterStatus === 'All') return true;
    return exc.status === filterStatus;
  });

  const handleResolve = (exc: DeliveryException, newStatus: DeliveryException['status']) => {
    const updated: DeliveryException = {
      ...exc,
      status: newStatus,
      resolutionNotes: resolutionText || exc.resolutionNotes || 'Resolved by Dispatch Operations.',
      updatedAt: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' WAT',
    };
    onUpdateException(updated);
    setSelectedException(null);
    setResolutionText('');
    showToast(`Incident #${exc.id} status updated to: ${newStatus}`);
  };

  const handleCreateException = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderNo.trim()) return;

    const newExc: DeliveryException = {
      id: `exc-${Date.now()}`,
      orderTrackingNo: newOrderNo.trim().startsWith('#') ? newOrderNo.trim() : `#${newOrderNo.trim()}`,
      customerName: newCustomer.trim() || 'Enterprise Client',
      driverName: newDriver.trim() || 'On-Duty Courier',
      reason: newReason,
      description: newDesc.trim() || 'Reported by dispatch officer during transit cycle.',
      reportedAt: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' WAT',
      status: 'Pending Review',
      assignedAdmin: 'Olusegun Ola',
    };

    onAddException(newExc);
    setIsAddModalOpen(false);
    setNewOrderNo('');
    setNewCustomer('');
    setNewDriver('');
    setNewDesc('');
    showToast(`Delivery Exception incident #${newExc.id} created!`);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">report_problem</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-error">warning</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Exception &amp; Failed Delivery Management Centre
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Resolve delivery complications, customer unavailability, address errors, and fleet incidents
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-error hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_alert</span>
            + Log Exception Incident
          </button>
        </div>
      </div>

      {/* KPI Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-[#74777e] uppercase font-semibold">Total Reported</span>
          <div className="text-xl font-bold text-[#0c1d2c] mt-0.5">{exceptions.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-amber-600 uppercase font-semibold">Under Investigation</span>
          <div className="text-xl font-bold text-amber-700 mt-0.5">
            {exceptions.filter((e) => e.status === 'Investigating' || e.status === 'Pending Review').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-blue-600 uppercase font-semibold">Rescheduled / Reassigned</span>
          <div className="text-xl font-bold text-blue-700 mt-0.5">
            {exceptions.filter((e) => e.status === 'Rescheduled' || e.status === 'Reassigned').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-emerald-600 uppercase font-semibold">Resolved &amp; Closed</span>
          <div className="text-xl font-bold text-emerald-700 mt-0.5">
            {exceptions.filter((e) => e.status === 'Resolved' || e.status === 'Closed').length}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-outline-variant/30 shadow-xs overflow-x-auto">
        {['All', 'Pending Review', 'Investigating', 'Rescheduled', 'Reassigned', 'Resolved'].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              filterStatus === st
                ? 'bg-[#142b45] text-white shadow-xs'
                : 'text-[#74777e] hover:bg-[#f8f9ff] hover:text-[#0c1d2c]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Exceptions Grid / List */}
      <div className="space-y-3.5">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-emerald-500 block mb-2">
              check_circle
            </span>
            <p className="font-bold text-base text-[#0c1d2c]">No active exceptions found</p>
            <p className="text-xs text-[#74777e] mt-1">
              All delivery corridors are operating smoothly without incident reports.
            </p>
          </div>
        ) : (
          filtered.map((exc) => (
            <div
              key={exc.id}
              className="bg-white rounded-xl border border-outline-variant/30 shadow-xs p-5 space-y-3.5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/15 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-mono font-bold text-xs">
                    !
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0c1d2c]">{exc.orderTrackingNo}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                        {exc.reason}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#74777e]">
                      Client: <strong className="text-[#0c1d2c]">{exc.customerName}</strong> • Courier: {exc.driverName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      exc.status === 'Resolved' || exc.status === 'Closed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : exc.status === 'Rescheduled' || exc.status === 'Reassigned'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {exc.status}
                  </span>
                  <span className="text-[11px] font-mono text-[#74777e]">{exc.reportedAt}</span>
                </div>
              </div>

              {/* Description & Driver Report */}
              <div className="bg-[#f8f9ff] rounded-lg p-3 text-xs space-y-1.5 border border-outline-variant/20">
                <p className="text-[#0c1d2c] leading-relaxed">
                  <strong className="text-[#43474d]">Incident Detail:</strong> {exc.description}
                </p>
                {exc.resolutionNotes && (
                  <p className="text-emerald-800 bg-emerald-50 p-2 rounded text-[11px]">
                    <strong>Resolution Log:</strong> {exc.resolutionNotes} (Updated: {exc.updatedAt || 'Recent'})
                  </p>
                )}
                <div className="flex items-center justify-between text-[10px] text-[#74777e] pt-1">
                  <span>Assigned Officer: {exc.assignedAdmin}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('track-shipment')}
                    className="text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[12px]">share_location</span>
                    View Waybill Telemetry
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedException(exc);
                      setResolutionText(exc.resolutionNotes || '');
                    }}
                    className="px-3 py-1.5 bg-[#142b45] hover:bg-[#00162e] text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                    Add Resolution Notes
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleResolve(exc, 'Rescheduled')}
                    className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(exc, 'Reassigned')}
                    className="px-2.5 py-1 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reassign Driver
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolve(exc, 'Resolved')}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    Close as Resolved
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resolution Notes Modal */}
      {selectedException && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c] mb-1">
              Resolution Audit for #{selectedException.id}
            </h3>
            <p className="text-xs text-[#74777e] mb-3">
              Order: {selectedException.orderTrackingNo} • Client: {selectedException.customerName}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Resolution Notes</label>
                <textarea
                  rows={3}
                  value={resolutionText}
                  onChange={(e) => setResolutionText(e.target.value)}
                  placeholder="Explain incident investigation, customer communication, or courier instructions..."
                  className="w-full bg-[#f8f9ff] text-xs p-3 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedException(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0c1d2c] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleResolve(selectedException, 'Resolved')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                >
                  Save &amp; Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Exception Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant/20">
              <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c]">
                Log Delivery Exception Incident
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#74777e] hover:text-[#0c1d2c]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateException} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Waybill Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. #DMS-TRK-98421"
                  value={newOrderNo}
                  onChange={(e) => setNewOrderNo(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Customer / Consignee</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Standard Bank Plc"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Reporting Driver</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tunde Bakare"
                  value={newDriver}
                  onChange={(e) => setNewDriver(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Exception Category</label>
                <select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value as any)}
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/40 focus:outline-none"
                >
                  <option value="Customer Unavailable">Customer Unavailable</option>
                  <option value="Incorrect Delivery Address">Incorrect Delivery Address</option>
                  <option value="Recipient Refused Delivery">Recipient Refused Delivery</option>
                  <option value="Damaged Package">Damaged Package</option>
                  <option value="Driver Unable to Reach Destination">Driver Unable to Reach Destination</option>
                  <option value="Delayed Delivery">Delayed Delivery (Traffic / Roadblock)</option>
                  <option value="Vehicle Breakdown">Vehicle Breakdown</option>
                  <option value="Other Delivery Complication">Other Delivery Complication</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#43474d] uppercase mb-1">Incident Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe what occurred at the drop-off location..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#f8f9ff] text-xs p-3 rounded-lg border border-outline-variant/40 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-error text-white rounded-lg font-bold"
                >
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
