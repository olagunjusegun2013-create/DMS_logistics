import React, { useState } from 'react';
import { ShipmentOrder, ScreenId } from '../../types/logistics';

interface OrdersManagementSectionProps {
  orders: ShipmentOrder[];
  onNavigate: (screenId: ScreenId) => void;
  onDeleteOrder: (trackingNo: string) => void;
  onDeleteDemoOrders?: () => void;
}

export const OrdersManagementSection: React.FC<OrdersManagementSectionProps> = ({
  orders,
  onNavigate,
  onDeleteOrder,
  onDeleteDemoOrders,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter === 'In Transit' && order.status !== 'In Transit') return false;
    if (statusFilter === 'Delivered' && order.status !== 'Delivered') return false;
    if (statusFilter === 'Pending' && order.status !== 'Pending Dispatch') return false;
    if (statusFilter === 'Delayed' && order.status !== 'Delayed') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        order.trackingNo.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.origin.toLowerCase().includes(q) ||
        order.destination.toLowerCase().includes(q) ||
        order.courierName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map((o) => o.trackingNo));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleToggleSelect = (trackingNo: string) => {
    setSelectedOrders((prev) =>
      prev.includes(trackingNo) ? prev.filter((id) => id !== trackingNo) : [...prev, trackingNo]
    );
  };

  const handleDeleteSelected = () => {
    selectedOrders.forEach((trackingNo) => onDeleteOrder(trackingNo));
    setSelectedOrders([]);
  };

  const demoOrdersCount = orders.filter((o) => o.isDemo).length;

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">local_shipping</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Orders &amp; Consignments Management
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Dispatch stream, active cargo routing, and waybill life-cycle control
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {demoOrdersCount > 0 && onDeleteDemoOrders && (
            <button
              type="button"
              onClick={onDeleteDemoOrders}
              className="px-3 py-2 bg-error-container text-error hover:bg-error hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Delete all demo shipments from database"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              Delete Demo Orders ({demoOrdersCount})
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('request-delivery')}
            className="px-4 py-2 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            + New Consignment Order
          </button>
        </div>
      </div>

      {/* KPI Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-[#74777e] uppercase font-semibold">Active Orders</span>
          <div className="text-xl font-bold text-[#0c1d2c] mt-0.5">{orders.length}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-blue-600 uppercase font-semibold">In Transit</span>
          <div className="text-xl font-bold text-blue-700 mt-0.5">
            {orders.filter((o) => o.status === 'In Transit').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-emerald-600 uppercase font-semibold">Delivered</span>
          <div className="text-xl font-bold text-emerald-700 mt-0.5">
            {orders.filter((o) => o.status === 'Delivered').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-amber-600 uppercase font-semibold">Pending / Queued</span>
          <div className="text-xl font-bold text-amber-700 mt-0.5">
            {orders.filter((o) => o.status === 'Pending Dispatch' || o.status === 'Pickup Queued').length}
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-xs">
          <span className="text-[11px] text-rose-600 uppercase font-semibold">Delayed / Issue</span>
          <div className="text-xl font-bold text-rose-700 mt-0.5">
            {orders.filter((o) => o.status === 'Delayed').length}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Waybill #, Customer, Origin, or Destination..."
            className="w-full bg-[#f8f9ff] text-xs px-3 py-2 pl-9 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['All', 'In Transit', 'Delivered', 'Pending', 'Delayed'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#142b45] text-white shadow-xs'
                  : 'bg-[#f8f9ff] text-[#74777e] hover:bg-[#eef4ff] hover:text-[#0c1d2c]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk selection actions */}
      {selectedOrders.length > 0 && (
        <div className="bg-primary-container text-on-primary px-4 py-2.5 rounded-xl flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-5 h-5 rounded-full bg-secondary-container text-white flex items-center justify-center text-[10px] font-bold">
              {selectedOrders.length}
            </span>
            <span>consignments selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="px-3 py-1 bg-error hover:bg-rose-700 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">delete</span>
              Delete Selected
            </button>
            <button
              type="button"
              onClick={() => setSelectedOrders([])}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-[#eef4ff] text-[#43474d] font-semibold uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    className="rounded text-secondary focus:ring-0"
                  />
                </th>
                <th className="p-3.5">Waybill / Tracking No</th>
                <th className="p-3.5">Customer &amp; Contact</th>
                <th className="p-3.5">Route Origin &amp; Destination</th>
                <th className="p-3.5">Assigned Courier</th>
                <th className="p-3.5">Timestamp / ETA</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-500">
                    <span className="material-symbols-outlined text-[40px] text-slate-300 block mb-2">
                      inbox
                    </span>
                    <p className="font-semibold text-sm text-[#0c1d2c]">No consignments match this filter</p>
                    <p className="text-xs text-[#74777e] mt-1">
                      Create a new order or reset your search query.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.trackingNo}
                    className="hover:bg-[#f8f9ff] transition-colors group"
                  >
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.trackingNo)}
                        onChange={() => handleToggleSelect(order.trackingNo)}
                        className="rounded text-secondary focus:ring-0"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#0c1d2c]">
                          {order.trackingNo}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(order.trackingNo)}
                          title="Copy Waybill"
                          className="text-[#74777e] hover:text-secondary p-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {copiedCode === order.trackingNo ? 'check' : 'content_copy'}
                          </span>
                        </button>
                        {order.isDemo && (
                          <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded font-mono">
                            DEMO
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#74777e] block mt-0.5">
                        {order.type}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-[#0c1d2c] block">
                        {order.customer}
                      </span>
                      <span className="font-mono text-[11px] text-[#74777e]">
                        {order.phone}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <div className="flex items-center gap-1.5 text-[#0c1d2c]">
                        <span className="truncate">{order.origin}</span>
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          arrow_forward
                        </span>
                        <span className="truncate font-semibold">{order.destination}</span>
                      </div>
                      <span className="text-[10px] text-[#74777e] truncate block mt-0.5">
                        {order.originDetail} → {order.destinationDetail}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#142b45] text-white flex items-center justify-center font-bold font-mono text-[10px]">
                          {order.courierInitials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#0c1d2c] leading-tight">
                            {order.courierName}
                          </span>
                          <span className="text-[10px] text-[#74777e] font-mono leading-tight">
                            {order.courierVehicle}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="text-[#0c1d2c] font-medium block">
                        {order.timestamp}
                      </span>
                      <span className="text-[11px] text-secondary font-mono">
                        {order.eta}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          order.statusVariant === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.statusVariant === 'transit'
                            ? 'bg-blue-100 text-blue-800'
                            : order.statusVariant === 'delayed'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.statusVariant === 'delivered'
                              ? 'bg-emerald-600'
                              : order.statusVariant === 'transit'
                              ? 'bg-blue-600'
                              : order.statusVariant === 'delayed'
                              ? 'bg-rose-600'
                              : 'bg-amber-600'
                          }`}
                        />
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onNavigate('track-shipment')}
                          className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          title="Track Consignment Live"
                        >
                          <span className="material-symbols-outlined text-[17px]">share_location</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteOrder(order.trackingNo)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Delete Order"
                        >
                          <span className="material-symbols-outlined text-[17px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
