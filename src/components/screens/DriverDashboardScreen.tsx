import React, { useState } from 'react';
import { ScreenId } from '../../types/logistics';
import { MAP_KINGSWAY_TOWER } from '../../data/logisticsData';

interface DriverDashboardScreenProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({
  onNavigate,
}) => {
  const [dutyStatus, setDutyStatus] = useState<'On Duty / Available' | 'On Break' | 'Off Duty'>('On Duty / Available');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'deliveries' | 'nav' | 'profile'>('dashboard');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyWaybill = () => {
    navigator.clipboard?.writeText('DMS-TRK-98421');
    setCopied(true);
    showToast('Waybill #DMS-TRK-98421 copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full sm:max-w-[420px] mx-auto bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative shadow-none sm:shadow-2xl border-0 sm:border border-outline-variant/30 overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary text-xs px-4 py-2 rounded-full shadow-lg border border-secondary-container/40 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Driver Mobile Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(20,43,69,0.06)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[22px]">person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm font-bold text-on-surface truncate text-sm">Tunde Bakare</span>
                <span className="font-code-sm text-xs text-on-surface-variant shrink-0">#DRV-882</span>
              </div>
              <div className="relative mt-0.5">
                <button
                  type="button"
                  onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-secondary-container hover:bg-surface-container-highest transition-colors cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full ${dutyStatus === 'On Duty / Available' ? 'bg-secondary-container animate-pulse' : 'bg-outline'}`} />
                  <span className="text-[11px] font-semibold">{dutyStatus}</span>
                  <span className="material-symbols-outlined text-[14px]">expand_more</span>
                </button>

                {isStatusMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-surface-container-lowest border border-outline-variant/30 rounded-lg shadow-xl py-1 z-50 w-44">
                    {(['On Duty / Available', 'On Break', 'Off Duty'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setDutyStatus(status);
                          setIsStatusMenuOpen(false);
                          showToast(`Status updated to ${status}`);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs hover:bg-surface-container flex items-center gap-2 font-medium"
                      >
                        <span className={`w-2 h-2 rounded-full ${status === 'On Duty / Available' ? 'bg-emerald-500' : status === 'On Break' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => showToast('Dispatch notification: 1 priority reroute available')}
              aria-label="Notifications"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary-container" />
            </button>
            <button
              onClick={() => showToast('Fleet telemetry connected (4G LTE strong)')}
              className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-mono font-bold"
              title="Courier Fleet Unit"
            >
              TB
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-3 pb-24 space-y-4">
        {/* Driver Greeting & Ambient Shift Pulse */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm relative overflow-hidden border border-outline-variant/20">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[11px] font-semibold text-on-surface-variant flex items-center gap-1.5 uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                Active Shift • Zone 4
              </span>
              <h1 className="text-xl font-headline-xl text-on-surface font-extrabold tracking-tight mt-0.5">
                Good afternoon, Tunde
              </h1>
              <p className="font-code-sm text-xs text-on-surface-variant mt-0.5 truncate">
                Shift Route #LG-04B • Lagos Central – Ikoyi/VI
              </p>
            </div>
            <div className="shrink-0 bg-surface-container px-2.5 py-1.5 rounded-lg flex flex-col items-end">
              <span className="text-[10px] text-on-surface-variant font-medium">Est. Wrap</span>
              <span className="text-sm text-primary font-bold">16:45</span>
            </div>
          </div>

          {/* Shift Progress Visualizer */}
          <div className="mt-4 pt-2 relative z-10">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                Shift Manifest Progress
              </span>
              <span className="font-code-sm text-xs text-on-surface-variant font-medium">
                <span className="text-on-surface font-bold">8</span>/12 Stops (67%)
              </span>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden flex">
              <div className="h-full bg-primary" style={{ width: '66.6%' }} />
              <div className="h-full bg-secondary-container animate-pulse" style={{ width: '8.3%' }} />
              <div className="h-full bg-surface-container-highest" style={{ width: '25.1%' }} />
            </div>

            <div className="flex items-center justify-between mt-2 text-[11px] text-on-surface-variant font-medium">
              <span className="flex items-center gap-1 text-primary font-semibold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> 8 Completed
              </span>
              <span className="flex items-center gap-1 text-secondary-container font-semibold">
                <span className="material-symbols-outlined text-[14px]">play_circle</span> 1 Active
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 3 In Queue
              </span>
            </div>
          </div>

          {/* Soft Decorative Accent */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-container/10 pointer-events-none blur-2xl" />
        </div>

        {/* Real-time KPI Mini-Bento */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {/* Metric 1: On-Time */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] font-semibold leading-tight">On-Time</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            </div>
            <div className="mt-2">
              <span className="text-base text-on-surface font-extrabold block">98.5%</span>
              <span className="text-[10px] text-on-surface-variant flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-[12px] text-secondary font-bold">trending_up</span>
                Top Tier
              </span>
            </div>
          </div>

          {/* Metric 2: Fuel Status */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] font-semibold leading-tight">Fuel Eco</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">eco</span>
            </div>
            <div className="mt-2">
              <span className="text-base text-on-surface font-extrabold block">Optimal</span>
              <span className="text-[10px] text-on-surface-variant mt-0.5 block truncate">
                6.4L / 100km
              </span>
            </div>
          </div>

          {/* Metric 3: Shift Payout / Points */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] font-semibold leading-tight">Payout</span>
              <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
            </div>
            <div className="mt-2">
              <span className="text-base text-on-surface font-extrabold block truncate">₦18,450</span>
              <span className="text-[10px] text-on-surface-variant mt-0.5 block">
                +320 pts
              </span>
            </div>
          </div>
        </div>

        {/* Current Active Stop Hero Card */}
        <div className="w-full bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative border border-outline-variant/20">
          {/* Top Priority Ribbon */}
          <div className="bg-primary text-on-primary px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping" />
              <span className="text-[11px] uppercase tracking-wider font-bold">
                Current Active Stop • #9 of 12
              </span>
            </div>
            <span className="bg-secondary-container text-on-primary font-code-sm text-xs px-2 py-0.5 rounded-md font-semibold">
              12 min ETA
            </span>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Tracking Header & Priority Pill */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[11px] text-on-surface-variant font-medium">Consignment Waybill</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="font-code-md text-sm text-primary font-bold tracking-tight">#DMS-TRK-98421</span>
                  <button
                    type="button"
                    onClick={copyWaybill}
                    title="Copy Waybill"
                    className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer p-0.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">{copied ? 'done' : 'content_copy'}</span>
                  </button>
                </div>
              </div>
              <div className="bg-error-container text-on-error-container px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                <span className="text-[11px] font-bold leading-none">Perishable Docs</span>
              </div>
            </div>

            {/* Recipient Detail */}
            <div className="bg-surface-container-low rounded-lg p-3 space-y-1 border border-outline-variant/10">
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">domain</span>
                <h2 className="text-sm font-bold truncate">
                  Standard Bank Plc – Treasury
                </h2>
              </div>
              <p className="text-xs text-on-surface-variant pl-6">
                Attn: <span className="text-on-surface font-semibold">Folake Balogun</span> • 4th Floor
              </p>
            </div>

            {/* Location / Address & Distance Badge */}
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">pin_drop</span>
              <div className="flex flex-col min-w-0">
                <p className="text-xs text-on-surface font-medium leading-snug">
                  Plot 1218 Marina Financial Hub, Kingsway Tower, 4th Floor, Lagos
                </p>
                <span className="text-[11px] text-on-surface-variant mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                  2.4 km away via Ring Road • Moderate flow
                </span>
              </div>
            </div>

            {/* Map Snapshot Trigger */}
            <div
              onClick={() => onNavigate?.('driver-navigation')}
              className="w-full h-32 rounded-lg bg-cover bg-center relative overflow-hidden shadow-inner flex items-end p-2.5 cursor-pointer group"
              style={{ backgroundImage: `url('${MAP_KINGSWAY_TOWER}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/90 transition-all" />
              <div className="relative z-10 w-full flex items-center justify-between text-on-primary">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary-container">navigation</span>
                  <span className="text-xs font-semibold">Direct Route: Outer Ring Exit 3</span>
                </div>
                <span className="bg-surface-container-lowest/20 backdrop-blur-md px-2 py-0.5 rounded font-code-sm text-[11px] font-semibold">
                  Fastest
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate?.('driver-navigation')}
                className="w-full h-12 bg-secondary hover:bg-secondary-container active:scale-[0.99] transition-all rounded-lg text-on-secondary text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">explore</span>
                Open Turn-by-Turn GPS Map
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+2348021183390"
                  className="h-11 bg-primary hover:bg-primary-container active:scale-[0.99] transition-all rounded-lg text-on-primary text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Customer
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate?.('proof-of-delivery')}
                  className="h-11 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                  Proof of Delivery
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Stops Manifest Queue */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">view_timeline</span>
              <h3 className="text-sm font-bold text-on-surface">Upcoming Manifest Queue</h3>
            </div>
            <span className="font-code-sm text-xs text-on-surface-variant font-semibold">3 Remaining</span>
          </div>

          <div className="space-y-2.5">
            {/* Stop #10 */}
            <div
              onClick={() => showToast('Stop #10: MedPlus Clinic (Yaba Depot)')}
              className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-3 flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-code-md text-xs font-bold shrink-0">
                  10
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs font-bold text-on-surface truncate">MedPlus Clinic</h4>
                  <p className="text-[11px] text-on-surface-variant truncate">Yaba Central Depot • Medical Supplies</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-primary text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Next In Line
                </span>
                <span className="font-code-sm text-[10px] text-on-surface-variant mt-0.5">~15:05</span>
              </div>
            </div>

            {/* Stop #11 */}
            <div
              onClick={() => showToast('Stop #11: Konga Logistics Fulfillment')}
              className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-3 flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-code-md text-xs font-bold shrink-0">
                  11
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs font-bold text-on-surface truncate">Konga Logistics Fulfillment</h4>
                  <p className="text-[11px] text-on-surface-variant truncate">Surulere Depot • Secure Locker Transfer</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-semibold">
                  Scheduled
                </span>
                <span className="font-code-sm text-[10px] text-on-surface-variant mt-0.5">15:30</span>
              </div>
            </div>

            {/* Stop #12 */}
            <div
              onClick={() => showToast('Stop #12: Jumia Hub (Apapa Terminal)')}
              className="bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg p-3 flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-code-md text-xs font-bold shrink-0">
                  12
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-xs font-bold text-on-surface truncate">Jumia Hub Hub Final Drop</h4>
                  <p className="text-[11px] text-on-surface-variant truncate">Apapa Gateway • Whse Consolidation</p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-semibold">
                  Final Stop
                </span>
                <span className="font-code-sm text-[10px] text-on-surface-variant mt-0.5">16:15</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Driver Mobile Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full max-w-[420px] bg-surface/95 backdrop-blur-xl border-t border-surface-container-high/60 shadow-[0_-4px_16px_rgba(20,43,69,0.06)] px-4 py-2 z-40">
        <div className="grid grid-cols-4 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-1 rounded-lg transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[22px]">space_dashboard</span>
            <span className="text-[10px] font-semibold mt-0.5">Shift</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('deliveries');
              showToast('Active Manifest: 4 pending deliveries');
            }}
            className={`flex flex-col items-center py-1 rounded-lg transition-colors cursor-pointer relative ${activeTab === 'deliveries' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            <span className="text-[10px] font-semibold mt-0.5">Manifest</span>
            <span className="absolute top-0.5 right-4 w-4 h-4 bg-secondary-container text-on-primary rounded-full text-[9px] font-bold flex items-center justify-center">
              4
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('driver-navigation')}
            className="flex flex-col items-center py-1 rounded-lg text-secondary font-bold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">navigation</span>
            <span className="text-[10px] font-bold mt-0.5">GPS Nav</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('proof-of-delivery')}
            className="flex flex-col items-center py-1 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">fact_check</span>
            <span className="text-[10px] font-semibold mt-0.5">POD Sign</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
