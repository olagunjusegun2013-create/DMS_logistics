import React from 'react';
import { ShipmentOrder, ScreenId } from '../../types/logistics';

interface CustomerOrdersHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ShipmentOrder[];
  onNavigate: (screenId: ScreenId) => void;
}

export const CustomerOrdersHistoryModal: React.FC<CustomerOrdersHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-outline-variant/30 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#142b45] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-secondary">history</span>
            <div>
              <h2 className="font-['Manrope'] font-bold text-base">My Orders &amp; Consignment History</h2>
              <p className="text-xs text-slate-300">Self-service tracking and proof-of-delivery receipts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1 text-xs">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <span className="material-symbols-outlined text-[48px] text-slate-300 block mb-2">
                package_2
              </span>
              <p className="font-bold text-sm text-[#0c1d2c]">No shipments recorded</p>
              <p className="text-xs text-[#74777e] mt-1">Book your first delivery request today.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.trackingNo}
                className="bg-[#f8f9ff] border border-outline-variant/30 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-secondary transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#0c1d2c]">{order.trackingNo}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.statusVariant === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.statusVariant === 'transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0c1d2c]">{order.type} • {order.weight}</p>
                  <p className="text-[11px] text-[#74777e]">
                    {order.origin} → {order.destination} ({order.destinationDetail})
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('track-shipment');
                    }}
                    className="px-3 py-1.5 bg-[#142b45] hover:bg-[#00162e] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">share_location</span>
                    Track
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onNavigate('request-delivery');
                    }}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0c1d2c] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-xs text-[#74777e]">Showing {orders.length} consignments</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0c1d2c] text-xs font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
