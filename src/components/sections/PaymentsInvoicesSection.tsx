import React, { useState } from 'react';
import { PaymentRecord, ScreenId } from '../../types/logistics';

interface PaymentsInvoicesSectionProps {
  payments: PaymentRecord[];
  onNavigate: (screenId: ScreenId) => void;
  onUpdatePayment: (payment: PaymentRecord) => void;
}

export const PaymentsInvoicesSection: React.FC<PaymentsInvoicesSectionProps> = ({
  payments,
  onNavigate,
  onUpdatePayment,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null);
  const [paystackModal, setPaystackModal] = useState<PaymentRecord | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filtered = payments.filter((pay) => {
    if (filterStatus !== 'All' && pay.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        pay.orderTrackingNo.toLowerCase().includes(q) ||
        pay.customerName.toLowerCase().includes(q) ||
        pay.reference.toLowerCase().includes(q) ||
        pay.invoiceNo.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleVerifyManualPayment = (pay: PaymentRecord) => {
    const updated: PaymentRecord = {
      ...pay,
      status: 'Paid',
      receiptNo: `REC-NGN-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    onUpdatePayment(updated);
    showToast(`Payment ${pay.reference} manually verified & receipt issued!`);
  };

  const handleSimulatePaystackSuccess = (pay: PaymentRecord) => {
    const updated: PaymentRecord = {
      ...pay,
      status: 'Paid',
      paymentMethod: 'Paystack',
      receiptNo: `REC-PSTK-${Math.floor(10000 + Math.random() * 90000)}`,
      reference: `pstk_auth_${Date.now()}`,
    };
    onUpdatePayment(updated);
    setPaystackModal(null);
    showToast(`Paystack payment of ₦${pay.amount.toLocaleString()} confirmed via webhook!`);
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">payments</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">payments</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Payments, Invoices &amp; Freight Settlement
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Nigerian Naira (NGN / ₦) tariff ledger, Paystack / Flutterwave webhooks, and corporate pro-forma invoices
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('request-delivery')}
          className="px-4 py-2 bg-[#994700] hover:bg-[#d97732] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start"
        >
          <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          + New Consignment Invoice
        </button>
      </div>

      {/* Summary KPI Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase">Settled Freight (Paid)</span>
          <div className="text-2xl font-extrabold text-emerald-700">
            ₦{totalCollected.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% verified ledger balance</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase">Pending Escrow / COD</span>
          <div className="text-2xl font-extrabold text-amber-600">
            ₦{totalPending.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-700 font-semibold">Awaiting destination sign-off</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase">Active Gateway</span>
          <div className="text-lg font-bold text-[#0c1d2c] flex items-center gap-1.5 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Paystack &amp; Flutterwave
          </div>
          <span className="text-[10px] text-[#74777e] font-mono">Live NIBSS / Card API</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase">Total Invoices</span>
          <div className="text-2xl font-extrabold text-[#0c1d2c]">{payments.length}</div>
          <span className="text-[10px] text-[#74777e]">Generated this month</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice #, reference, customer, or waybill..."
            className="w-full bg-[#f8f9ff] text-xs px-3 py-2 pl-9 rounded-lg border border-outline-variant/40 focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <span className="material-symbols-outlined text-[18px] text-[#74777e] absolute left-2.5 top-2.5">
            search
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Paid', 'Pending', 'Failed', 'Refunded'].map((st) => (
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
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="bg-[#eef4ff] text-[#43474d] font-semibold uppercase tracking-wider border-b border-outline-variant/20">
              <tr>
                <th className="p-3.5">Invoice &amp; Ref</th>
                <th className="p-3.5">Consignment Waybill</th>
                <th className="p-3.5">Customer Entity</th>
                <th className="p-3.5">Tariff Amount (NGN)</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Settlement Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#f8f9ff] transition-colors group">
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-[#0c1d2c] block">{pay.invoiceNo}</span>
                    <span className="font-mono text-[10px] text-[#74777e]">{pay.reference}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-mono font-semibold text-secondary block">{pay.orderTrackingNo}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-[#0c1d2c]">{pay.customerName}</td>
                  <td className="p-3.5 font-mono font-bold text-sm text-[#0c1d2c]">
                    ₦{pay.amount.toLocaleString()}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#43474d] font-medium text-[11px]">
                      {pay.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#74777e] font-mono text-[11px]">{pay.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        pay.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : pay.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {pay.status === 'Pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => setPaystackModal(pay)}
                            className="px-2.5 py-1 bg-[#142b45] text-white hover:bg-[#00162e] rounded text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            Paystack Checkout
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVerifyManualPayment(pay)}
                            className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Verify Manual Transfer / Cash on Delivery"
                          >
                            Verify
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(pay)}
                        className="p-1.5 text-secondary hover:bg-amber-50 rounded transition-colors cursor-pointer"
                        title="View Official Invoice / Receipt"
                      >
                        <span className="material-symbols-outlined text-[17px]">receipt</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Invoice / Receipt Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-outline-variant/30 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">receipt_long</span>
                <div>
                  <h3 className="font-['Manrope'] font-bold text-base text-[#0c1d2c]">
                    {selectedInvoice.status === 'Paid' ? 'Official Tax Receipt' : 'Pro-Forma Logistics Invoice'}
                  </h3>
                  <span className="font-mono text-xs text-[#74777e]">{selectedInvoice.invoiceNo}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="text-[#74777e] hover:text-[#0c1d2c]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#f8f9ff] rounded-xl p-4 space-y-2 border border-outline-variant/20">
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Billed To:</span>
                  <span className="font-bold text-[#0c1d2c]">{selectedInvoice.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Waybill Consignment:</span>
                  <span className="font-mono font-bold text-secondary">{selectedInvoice.orderTrackingNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Payment Gateway:</span>
                  <span className="font-semibold text-[#0c1d2c]">{selectedInvoice.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#74777e]">Transaction Reference:</span>
                  <span className="font-mono text-[11px] text-[#43474d]">{selectedInvoice.reference}</span>
                </div>
                {selectedInvoice.receiptNo && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Receipt No:</span>
                    <span className="font-mono">{selectedInvoice.receiptNo}</span>
                  </div>
                )}
              </div>

              {/* Line items */}
              <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#eef4ff] text-[#43474d] font-semibold text-[11px]">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5 text-right">Amount (NGN)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15">
                    <tr>
                      <td className="p-2.5">Base Transit Corridor &amp; Fleet Mileage</td>
                      <td className="p-2.5 text-right font-mono">
                        ₦{(selectedInvoice.amount * 0.65).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5">Weight Surcharge &amp; Priority Handling</td>
                      <td className="p-2.5 text-right font-mono">
                        ₦{(selectedInvoice.amount * 0.25).toFixed(0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5">High-Value Cargo Insurance &amp; Biometric POD</td>
                      <td className="p-2.5 text-right font-mono">₦800</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-2.5 text-[#0c1d2c]">Total Settlement (7.5% VAT incl.)</td>
                      <td className="p-2.5 text-right font-mono text-sm text-[#0c1d2c]">
                        ₦{selectedInvoice.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-[#74777e]">
                  Issuer: Logicore Enterprise DMS • Lagos Central Ops
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print?.();
                      showToast('Print dialog triggered for official receipt.');
                    }}
                    className="px-4 py-2 bg-[#142b45] hover:bg-[#00162e] text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    Print / Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paystack / Flutterwave Gateway Simulation Modal */}
      {paystackModal && (
        <div className="fixed inset-0 z-50 bg-[#0c1d2c]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border-2 border-emerald-500 animate-in fade-in zoom-in">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0c1d2c]">Paystack Gateway Checkout</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold">256-Bit SSL Secured</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPaystackModal(null)}
                className="text-[#74777e]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg text-center">
                <span className="text-[#74777e] block">Total Amount to Settle</span>
                <div className="text-2xl font-mono font-extrabold text-[#0c1d2c] mt-0.5">
                  ₦{paystackModal.amount.toLocaleString()}
                </div>
                <span className="text-[10px] text-secondary font-mono">{paystackModal.orderTrackingNo}</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Card Number •••• •••• •••• 4242"
                  defaultValue="5399 4100 8821 4242"
                  className="w-full bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/30 font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/30 font-mono"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="821"
                    className="bg-[#f8f9ff] text-xs px-3 py-2 rounded-lg border border-outline-variant/30 font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSimulatePaystackSuccess(paystackModal)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer mt-2"
              >
                Pay ₦{paystackModal.amount.toLocaleString()} Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
