import React, { useState } from 'react';
import { Courier, ShipmentOrder, ScreenId } from '../../types/logistics';

interface AssignmentsSectionProps {
  orders: ShipmentOrder[];
  couriers: Courier[];
  onNavigate: (screenId: ScreenId) => void;
  onAssignOrder: (trackingNo: string, courierName: string, initials: string) => void;
}

export const AssignmentsSection: React.FC<AssignmentsSectionProps> = ({
  orders,
  couriers,
  onNavigate,
  onAssignOrder,
}) => {
  const [selectedCourierId, setSelectedCourierId] = useState<string>(couriers[0]?.id || '');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const unassignedOrders = orders.filter(
    (o) => o.status === 'Pending Dispatch' || o.courierName === 'Unassigned'
  );

  const activeCourier = couriers.find((c) => c.id === selectedCourierId) || couriers[0];

  const handleQuickAssign = (trackingNo: string) => {
    if (!activeCourier) {
      showToast('Please select a courier first');
      return;
    }
    const initials = activeCourier.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
    onAssignOrder(trackingNo, activeCourier.name, initials);
    showToast(`Assigned ${trackingNo} to ${activeCourier.name}`);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2 rounded-lg shadow-lg border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">route</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Delivery Assignments &amp; Corridor Allocation
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Allocate pending waybills, balance driver capacity, and dispatch batch manifests
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('live-tracking')}
          className="px-4 py-2 bg-[#142b45] hover:bg-[#00162e] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start"
        >
          <span className="material-symbols-outlined text-[16px]">radar</span>
          View Tactical Map Corridors
        </button>
      </div>

      {/* Two Column Layout: Unassigned Orders vs Available Couriers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Unassigned Orders (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-amber-600">hourglass_top</span>
              <h2 className="font-bold text-sm text-[#0c1d2c]">
                Pending Consignments Queue ({unassignedOrders.length})
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#74777e]">Require Dispatch</span>
          </div>

          {unassignedOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <span className="material-symbols-outlined text-[40px] text-emerald-500 block mb-2">
                task_alt
              </span>
              <p className="text-sm font-bold text-[#0c1d2c]">All Consignments Assigned!</p>
              <p className="text-xs text-[#74777e] mt-0.5">
                No backlog shipments are currently waiting for driver assignment.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {unassignedOrders.map((order) => (
                <div
                  key={order.trackingNo}
                  className="bg-[#f8f9ff] border border-outline-variant/30 rounded-lg p-3 hover:border-secondary transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-xs text-[#0c1d2c]">{order.trackingNo}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold">
                      Priority Express
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#0c1d2c] truncate">{order.customer}</p>
                  <p className="text-[11px] text-[#74777e] mt-0.5">
                    {order.origin} → <span className="font-medium text-[#0c1d2c]">{order.destination}</span>
                  </p>
                  <p className="text-[10px] text-[#74777e]">{order.type} • {order.weight}</p>

                  <div className="mt-2.5 pt-2 border-t border-outline-variant/15 flex items-center justify-between">
                    <span className="text-[10px] text-[#74777e] font-mono">{order.timestamp}</span>
                    <button
                      type="button"
                      onClick={() => handleQuickAssign(order.trackingNo)}
                      className="px-3 py-1 bg-secondary hover:bg-secondary-container text-white text-[11px] font-bold rounded flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <span>Assign to {activeCourier ? activeCourier.name.split(' ')[0] : 'Driver'}</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Courier Fleet Capacity & Allocation (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary">local_shipping</span>
              <h2 className="font-bold text-sm text-[#0c1d2c]">
                Fleet Couriers &amp; Current Shift Capacity
              </h2>
            </div>
            <span className="text-xs text-[#74777e]">Select a driver to target assignments</span>
          </div>

          {couriers.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <span className="material-symbols-outlined text-[40px] text-slate-300 block mb-2">
                group_off
              </span>
              <p className="text-sm font-bold text-[#0c1d2c]">No couriers registered</p>
              <p className="text-xs text-[#74777e] mt-0.5">
                Register couriers in the Drivers tab to allocate cargo.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {couriers.map((courier) => {
                const isSelected = activeCourier?.id === courier.id;
                const assignedCount = orders.filter((o) => o.courierName === courier.name).length;

                return (
                  <div
                    key={courier.id}
                    onClick={() => setSelectedCourierId(courier.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#eef4ff] border-secondary shadow-sm'
                        : 'bg-white border-outline-variant/30 hover:border-outline-variant/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={courier.avatar}
                          alt={courier.name}
                          className="w-10 h-10 rounded-full object-cover border border-outline-variant/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs text-[#0c1d2c] truncate">{courier.name}</h3>
                            <span className="text-[10px] font-mono text-[#74777e]">{courier.trackingCode}</span>
                          </div>
                          <p className="text-[11px] text-[#43474d] truncate">{courier.vehicle}</p>
                          <p className="text-[10px] text-[#74777e]">{courier.location}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#0c1d2c] block">
                          {assignedCount} Assigned
                        </span>
                        <span className="text-[10px] text-[#74777e] block">
                          {courier.battery} • {courier.speed.split('•')[0]}
                        </span>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${
                            courier.status === 'Available Idle'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {courier.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar for Shift Capacity */}
                    <div className="mt-3 pt-2 border-t border-outline-variant/15">
                      <div className="flex justify-between text-[10px] text-[#74777e] mb-1">
                        <span>Manifest Rack Utilization</span>
                        <span className="font-mono">{Math.min(assignedCount * 20, 100)}% Capacity</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary transition-all"
                          style={{ width: `${Math.min(assignedCount * 20, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
