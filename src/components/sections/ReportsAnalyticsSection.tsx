import React, { useState } from 'react';
import { ScreenId } from '../../types/logistics';

interface ReportsAnalyticsSectionProps {
  onNavigate: (screenId: ScreenId) => void;
}

export const ReportsAnalyticsSection: React.FC<ReportsAnalyticsSectionProps> = ({
  onNavigate,
}) => {
  const [dateRange, setDateRange] = useState('Today (Oct 24)');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Waybill,Customer,Origin,Destination,Courier,Status,TransitTime\n' +
      'DMS-TRK-98421,Aliko Dangote Corp,Ikeja Whse 4C,Victoria Island,Emeka Okonkwo,In Transit,18m\n' +
      'DMS-TRK-98418,Standard Bank Plc,Marina Hub,Ikoyi Kingsway,Tunde Bakare,Delivered,32m\n' +
      'DMS-TRK-98402,MedPlus Pharma,Yaba Depot,Lekki Phase 2,David Adeleke,Delayed,45m\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DMS_Logistics_Operations_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export complete: Official CSV dispatch manifest downloaded');
  };

  return (
    <div className="flex-1 p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-secondary flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">download_done</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[26px] text-secondary">analytics</span>
            <h1 className="font-['Manrope'] text-2xl font-extrabold text-[#0c1d2c]">
              Operational Intelligence &amp; SLA Reports
            </h1>
          </div>
          <p className="text-xs text-[#74777e] mt-1">
            Hub throughput histograms, corridor transit latency, courier efficiency, and financial freight metrics
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-outline-variant/40 text-xs px-3 py-2 rounded-lg font-semibold text-[#0c1d2c] focus:outline-none"
          >
            <option value="Today (Oct 24)">Today: Oct 24, 2024</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Current Month">Month-to-Date (October)</option>
          </select>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-[#142b45] hover:bg-[#00162e] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Export CSV Audit
          </button>
        </div>
      </div>

      {/* Top 4 Performance Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase tracking-wider">Gross Tariff Freight</span>
          <div className="text-2xl font-extrabold text-[#0c1d2c]">₦4,850,000</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +14.8% vs last week
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase tracking-wider">On-Time SLA Delivery</span>
          <div className="text-2xl font-extrabold text-[#0c1d2c]">99.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Target &gt;98.5% Met
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase tracking-wider">Avg Transit Latency</span>
          <div className="text-2xl font-extrabold text-[#0c1d2c]">34.2 mins</div>
          <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">speed</span>
            Lagos Island / Mainland
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-outline-variant/30 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-[#74777e] uppercase tracking-wider">1st Attempt Success</span>
          <div className="text-2xl font-extrabold text-[#0c1d2c]">96.8%</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Biometric / OTP Verification
          </span>
        </div>
      </div>

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Hourly Dispatch Throughput Histogram (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div>
              <h2 className="font-bold text-sm text-[#0c1d2c]">Hourly Consignment Shift Volume</h2>
              <p className="text-[11px] text-[#74777e]">Parcels processed per 3-hour dispatch interval</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-[#142b45] rounded-xs" /> On-Time
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-secondary rounded-xs" /> Delayed
              </span>
            </div>
          </div>

          {/* Histogram Bars */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { time: '06:00', onTime: 65, delayed: 4 },
              { time: '09:00', onTime: 120, delayed: 12 },
              { time: '12:00', onTime: 180, delayed: 22 },
              { time: '15:00', onTime: 155, delayed: 18 },
              { time: '18:00', onTime: 130, delayed: 8 },
              { time: '21:00', onTime: 50, delayed: 2 },
            ].map((slot) => (
              <div key={slot.time} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full max-w-[42px] flex items-end gap-1 h-48">
                  <div
                    className="w-1/2 bg-[#142b45] rounded-t hover:opacity-85 transition-opacity"
                    style={{ height: `${(slot.onTime / 180) * 100}%` }}
                    title={`${slot.onTime} On-Time`}
                  />
                  <div
                    className="w-1/2 bg-secondary rounded-t hover:opacity-85 transition-opacity"
                    style={{ height: `${(slot.delayed / 30) * 100}%` }}
                    title={`${slot.delayed} Delayed`}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#74777e] mt-1">{slot.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Regional Hub Loads (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-outline-variant/30 shadow-sm p-5 space-y-4">
          <div className="border-b border-outline-variant/20 pb-3">
            <h2 className="font-bold text-sm text-[#0c1d2c]">Regional Hub Load &amp; Capacity</h2>
            <p className="text-[11px] text-[#74777e]">Active parcel volume vs sorting gate ceiling</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0c1d2c]">Lagos Mainland Hub (Yaba)</span>
                <span className="font-mono text-[#74777e]">920 / 1,000 pkts (92%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
              </div>
              <span className="text-[10px] text-amber-700 font-semibold block mt-1">
                Near Peak Capacity • 14 Couriers Active
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0c1d2c]">Victoria Island Hub (VI South)</span>
                <span className="font-mono text-[#74777e]">615 / 800 pkts (76.8%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76.8%' }} />
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                Optimal Throughput • Smooth Transit
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0c1d2c]">Ikeja Industrial Hub (Central)</span>
                <span className="font-mono text-[#74777e]">780 / 800 pkts (97.5%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '97.5%' }} />
              </div>
              <span className="text-[10px] text-rose-700 font-semibold block mt-1">
                Overload Warning • Reroute Recommended
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#0c1d2c]">Lekki-Epe Express Corridor</span>
                <span className="font-mono text-[#74777e]">530 / 900 pkts (58.8%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '58.8%' }} />
              </div>
              <span className="text-[10px] text-blue-700 font-semibold block mt-1">
                Surplus Capacity Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
