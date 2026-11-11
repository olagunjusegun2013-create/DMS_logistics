import React, { useState } from 'react';
import {
  LOGO_URL,
  SARAH_JENKINS_AVATAR,
  MAP_LAGOS_TACTICAL,
  INITIAL_COURIERS,
} from '../../data/logisticsData';
import { ScreenId } from '../../types/logistics';

interface LiveTrackingScreenProps {
  onNavigate: (screenId: ScreenId) => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({ onNavigate }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedCourierId, setSelectedCourierId] = useState('tunde');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeLayer, setActiveLayer] = useState<'normal' | 'traffic' | 'satellite'>('traffic');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedCourier =
    INITIAL_COURIERS.find((c) => c.id === selectedCourierId) || INITIAL_COURIERS[0];

  const handleAction = (action: string) => {
    setToastMessage(`${action} triggered for ${selectedCourier.name}`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredCouriers = INITIAL_COURIERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.trackingCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.vehicle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] text-[#0c1d2c] font-sans antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs border border-white/20 animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#142b45] text-white flex flex-col justify-between shrink-0 shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <img alt="DMS Logistics Logo" className="h-7 w-auto object-contain" src={LOGO_URL} />
                  <div className="flex flex-col">
                    <span className="font-['Manrope'] text-sm text-white font-bold tracking-tight">
                      DMS Enterprise
                    </span>
                    <span className="text-[10px] text-[#b2c8e9] uppercase tracking-wider font-semibold">
                      Telemetry Radar
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('admin-dashboard'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    <span>Dashboard</span>
                  </div>
                </button>

                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('admin-dashboard'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    <span>Orders</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#994700] text-white font-mono text-[10px]">
                    1,420
                  </span>
                </button>

                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('request-delivery'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">post_add</span>
                    <span>Create Order</span>
                  </div>
                </button>

                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('live-tracking'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 text-white font-medium text-xs transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">my_location</span>
                    <span>Live Tracking</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#fd934c] animate-pulse"></span>
                </button>

                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('driver-dashboard'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                    <span>Drivers (Mobile App)</span>
                  </div>
                </button>

                <button
                  onClick={() => { setMobileNavOpen(false); onNavigate('admin-dashboard'); }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-xs text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">groups</span>
                    <span>Customers</span>
                  </div>
                </button>
              </nav>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#142b45] text-white flex-col justify-between shrink-0 select-none shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-20">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="h-16 px-6 flex items-center gap-3 border-b border-white/10">
            <img alt="DMS Logistics Logo" className="h-8 w-auto object-contain" src={LOGO_URL} />
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-sm text-white leading-tight font-bold tracking-tight">
                DMS Enterprise
              </span>
              <span className="text-[11px] text-[#b2c8e9] uppercase tracking-wider font-semibold">
                Suite Orchestrator
              </span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                <span>Orders</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#994700] text-white font-mono text-xs">
                1,420
              </span>
            </button>

            <button
              onClick={() => onNavigate('request-delivery')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">post_add</span>
                <span>Create Order</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">route</span>
                <span>Delivery Assignments</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('live-tracking')}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/10 text-white font-medium text-sm transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">my_location</span>
                <span>Live Tracking</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#fd934c] animate-pulse"></span>
            </button>

            <button
              onClick={() => onNavigate('driver-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">badge</span>
                <span>Drivers (Mobile App)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-xs">
                42
              </span>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">groups</span>
                <span>Customers</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span>Notifications</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-xs">
                5
              </span>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                <span>Reports &amp; Analytics</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-white/5 hover:text-white transition-colors text-sm text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-3 flex flex-col gap-2 border-t border-white/10">
          <div className="px-3 py-2 rounded-lg bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-white">Live Fleet Sync</span>
            </div>
            <span className="font-mono text-xs text-[#b2c8e9]">Online</span>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#b2c8e9] hover:bg-[#ffdad6] hover:text-[#93000a] transition-colors text-sm">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8f9ff]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#d3e4fa] px-3.5 sm:px-6 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-1 text-[#0c1d2c] hover:bg-[#eef4ff] rounded-lg transition-colors cursor-pointer"
              title="Open Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="flex items-center gap-2 text-xs truncate">
              <span className="text-[#43474d] hidden sm:inline">Operations</span>
              <span className="text-[#c4c6ce] hidden sm:inline">/</span>
              <span className="text-[#0c1d2c] font-semibold truncate">Live Fleet Telemetry</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#eef4ff] text-[#43474d] font-mono text-xs">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>UTC+1 | Lagos Ops Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#43474d] text-[18px]">
                search
              </span>
              <input
                className="w-72 h-9 pl-9 pr-12 rounded-lg bg-[#f8f9ff] border border-[#c4c6ce] text-[#0c1d2c] text-xs placeholder:text-[#43474d] focus:outline-none focus:border-[#994700] transition-colors"
                placeholder="Search tracking number, customer, driver..."
                type="text"
              />
              <kbd className="absolute right-2 px-1.5 py-0.5 rounded bg-[#daeaff] border border-[#c4c6ce] text-[#43474d] font-mono text-[10px]">
                ⌘K
              </kbd>
            </div>

            <button
              onClick={() => onNavigate('request-delivery')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#994700] hover:bg-[#6c3000] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Order</span>
            </button>

            <button className="relative p-2 rounded-lg text-[#43474d] hover:bg-[#eef4ff] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-[#d3e4fa]">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={SARAH_JENKINS_AVATAR}
              />
              <div className="hidden lg:flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-[#0c1d2c]">Sarah Jenkins</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] text-[#43474d]">Lead Operations Director</span>
              </div>
            </div>
          </div>
        </header>

        {/* Live Tracking Workspace */}
        <main className="flex-1 flex flex-col w-full pb-8">
          {/* Top Command Sub-Bar / Regional Filter */}
          <div className="px-3.5 sm:px-6 py-3 bg-white flex flex-wrap items-center justify-between gap-3 shadow-sm border-b border-[#e2e8f0]">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-[#142b45] text-white px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">hub</span>
                <span>Hub:</span>
                <select className="bg-transparent text-[#b2c8e9] font-bold outline-none cursor-pointer max-w-[160px] sm:max-w-none truncate">
                  <option className="bg-[#00162e] text-white">All Lagos Corridors (42 Active)</option>
                  <option className="bg-[#00162e] text-white">Mainland Hub (Ikeja / Yaba)</option>
                  <option className="bg-[#00162e] text-white">Island Corridor (VI / Lekki)</option>
                  <option className="bg-[#00162e] text-white">Ebute-Metta Terminal</option>
                </select>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[#43474d] text-xs">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  Telemetry: 100Hz Real-Time
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-2.5 sm:px-3 py-1.5 bg-[#eef4ff] hover:bg-[#e4efff] text-[#0c1d2c] text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                <span>Filter</span>
              </button>
              <button
                onClick={() => handleAction('Telemetry Refresh')}
                className="px-2.5 sm:px-3 py-1.5 bg-[#00162e] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 hover:bg-[#142b45] transition-colors shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Sync</span>
              </button>
            </div>
          </div>

          {/* Main Split-Screen Workspace */}
          <div className="flex flex-col lg:flex-row flex-1 p-3 sm:p-6 gap-4 sm:gap-6">
            {/* Left Panel: Active Fleet Telemetry List (35%) */}
            <div className="w-full lg:w-[35%] flex flex-col gap-3">
              {/* Search & Quick Metrics */}
              <div className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col gap-3">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#43474d] text-[18px]">
                    search
                  </span>
                  <input
                    className="w-full h-9 pl-9 pr-4 bg-[#f8f9ff] border border-[#c4c6ce] rounded-lg text-[#0c1d2c] text-xs outline-none focus:border-[#994700] transition-all"
                    placeholder="Search courier, vehicle ID, waybill..."
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-[#eef4ff] rounded-lg">
                    <span className="block font-['Manrope'] text-lg font-bold text-[#00162e]">
                      38
                    </span>
                    <span className="block text-[10px] text-[#43474d] font-semibold uppercase">
                      In Transit
                    </span>
                  </div>
                  <div className="p-2 bg-[#eef4ff] rounded-lg">
                    <span className="block font-['Manrope'] text-lg font-bold text-[#994700]">
                      3
                    </span>
                    <span className="block text-[10px] text-[#43474d] font-semibold uppercase">
                      Delayed
                    </span>
                  </div>
                  <div className="p-2 bg-[#eef4ff] rounded-lg">
                    <span className="block font-['Manrope'] text-lg font-bold text-emerald-600">
                      99.4%
                    </span>
                    <span className="block text-[10px] text-[#43474d] font-semibold uppercase">
                      SLA Health
                    </span>
                  </div>
                </div>
              </div>

              {/* Courier List Stream */}
              <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[580px] pr-1">
                {filteredCouriers.map((courier) => {
                  const isSelected = selectedCourierId === courier.id;
                  return (
                    <div
                      key={courier.id}
                      onClick={() => setSelectedCourierId(courier.id)}
                      className={`group cursor-pointer bg-white hover:bg-[#eef4ff] p-3.5 rounded-xl shadow-sm transition-all relative overflow-hidden border ${
                        isSelected
                          ? 'border-2 border-[#994700]'
                          : 'border-[#e2e8f0]'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 bg-[#994700] text-white px-2 py-0.5 rounded-bl-xl text-[10px] font-bold tracking-wider uppercase">
                          ACTIVE WAYBILL
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <img
                          className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#e4efff]"
                          alt={courier.name}
                          src={courier.avatar}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c] truncate">
                              {courier.name}
                            </h4>
                            <span
                              className={`font-mono text-xs font-semibold ${
                                isSelected ? 'text-[#994700]' : 'text-[#43474d]'
                              }`}
                            >
                              {courier.trackingCode}
                            </span>
                          </div>
                          <p className="text-xs text-[#43474d] truncate">{courier.vehicle}</p>

                          <div className="mt-2 grid grid-cols-2 gap-1 font-mono text-[11px] text-[#43474d]">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-[#994700]">
                                speed
                              </span>
                              <span className="truncate">{courier.speed}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-emerald-600">
                                battery_horiz_075
                              </span>
                              <span>{courier.battery}</span>
                            </div>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-[#e2e8f0] flex items-center justify-between">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                                courier.eta.includes('Rerouting')
                                  ? 'bg-amber-50 text-amber-700'
                                  : courier.eta.includes('6 mins')
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                  courier.eta.includes('Rerouting')
                                    ? 'bg-amber-500'
                                    : courier.eta.includes('6 mins')
                                    ? 'bg-emerald-500'
                                    : 'bg-blue-500'
                                }`}
                              ></span>
                              {courier.eta}
                            </span>
                            <span className="material-symbols-outlined text-[#994700] text-[18px] group-hover:translate-x-1 transition-transform">
                              chevron_right
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel: Interactive Enterprise Map Viewport (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col gap-3">
              {/* Map Container */}
              <div className="relative w-full h-[360px] sm:h-[500px] rounded-xl overflow-hidden shadow-md bg-[#00162e] border border-[#142b45]">
                {/* Tactical map background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90"
                  style={{ backgroundImage: `url('${MAP_LAGOS_TACTICAL}')` }}
                />

                {/* Tactical overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00162e]/80 via-[#00162e]/30 to-transparent pointer-events-none" />

                {/* SVG Route Polylines & Geofences */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Active Route Corridor */}
                  <path
                    className="animate-pulse"
                    d="M 120 400 Q 250 250 420 180 T 650 120"
                    fill="none"
                    stroke="#D97732"
                    strokeDasharray="8 4"
                    strokeWidth="4"
                  />
                  {/* Secondary Route */}
                  <path
                    d="M 200 480 Q 300 320 500 280"
                    fill="none"
                    opacity="0.6"
                    stroke="#321300"
                    strokeWidth="3"
                  />
                  {/* Geo-Fence Zone Polygon */}
                  <polygon
                    fill="#D97732"
                    fillOpacity="0.12"
                    points="350,120 550,90 600,280 380,320"
                    stroke="#D97732"
                    strokeDasharray="4 4"
                    strokeWidth="2"
                  />
                  <text
                    fill="#D97732"
                    fontFamily="IBM Plex Mono"
                    fontSize="11"
                    fontWeight="bold"
                    x="365"
                    y="140"
                  >
                    ZONE A: VICTORIA ISLAND SECURE PERIMETER
                  </text>
                </svg>

                {/* Live Vehicle Pins on Map */}
                {/* Pin 1: Tunde Bakare */}
                <div
                  onClick={() => setSelectedCourierId('tunde')}
                  className="absolute top-[35%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-[#994700]/30 animate-ping"></span>
                    <div className="w-10 h-10 rounded-full bg-[#994700] text-white flex items-center justify-center shadow-lg border-2 border-white font-bold">
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </div>
                    <div className="absolute top-12 bg-[#00162e] text-white px-2 py-1 rounded-lg shadow-xl whitespace-nowrap border border-[#994700]">
                      <p className="font-mono text-xs font-bold">#DMS-TRK-98421</p>
                      <p className="text-[10px] text-[#b2c8e9]">Tunde Bakare • 54 km/h</p>
                    </div>
                  </div>
                </div>

                {/* Pin 2: Emeka Okonkwo */}
                <div
                  onClick={() => setSelectedCourierId('emeka')}
                  className="absolute top-[20%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  <div className="w-8 h-8 rounded-full bg-[#142b45] text-white flex items-center justify-center shadow-md border-2 border-[#994700] font-bold">
                    <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                  </div>
                </div>

                {/* Pin 3: Amina Bello */}
                <div
                  onClick={() => setSelectedCourierId('amina')}
                  className="absolute top-[65%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md border-2 border-white font-bold">
                    <span className="material-symbols-outlined text-[16px]">warning</span>
                  </div>
                </div>

                {/* Map Controls Floating Toolbar */}
                <div className="absolute top-3 right-3 flex flex-col gap-1 bg-white/95 backdrop-blur p-1 rounded-xl shadow-lg border border-[#e2e8f0] z-20">
                  <button
                    onClick={() => setActiveLayer('satellite')}
                    className={`p-1.5 rounded-lg flex items-center justify-center transition ${
                      activeLayer === 'satellite' ? 'bg-[#142b45] text-white' : 'text-[#0c1d2c] hover:bg-[#eef4ff]'
                    }`}
                    title="Toggle Satellite"
                  >
                    <span className="material-symbols-outlined text-[18px]">layers</span>
                  </button>
                  <button
                    onClick={() => setActiveLayer('traffic')}
                    className={`p-1.5 rounded-lg flex items-center justify-center transition ${
                      activeLayer === 'traffic' ? 'text-[#994700] bg-[#ffdbc8]/50' : 'text-[#0c1d2c] hover:bg-[#eef4ff]'
                    }`}
                    title="Traffic Overlay"
                  >
                    <span className="material-symbols-outlined text-[18px]">traffic</span>
                  </button>
                  <button
                    className="p-1.5 hover:bg-[#eef4ff] rounded-lg text-[#0c1d2c] flex items-center justify-center transition"
                    title="Geo-Fences"
                  >
                    <span className="material-symbols-outlined text-[18px]">polyline</span>
                  </button>
                  <div className="h-px bg-[#e2e8f0] my-0.5"></div>
                  <button
                    className="p-1.5 hover:bg-[#eef4ff] rounded-lg text-[#0c1d2c] flex items-center justify-center transition"
                    title="Zoom In"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                  <button
                    className="p-1.5 hover:bg-[#eef4ff] rounded-lg text-[#0c1d2c] flex items-center justify-center transition"
                    title="Zoom Out"
                  >
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                  </button>
                </div>

                {/* Map Legend Footer Overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#00162e]/90 backdrop-blur text-white px-3 py-2 rounded-xl flex flex-wrap items-center justify-between gap-2 border border-white/10 z-20">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-[#ffdbc8] font-bold">SELECTED MANIFEST:</span>
                    <span className="font-mono font-bold">{selectedCourier.trackingCode}</span>
                    <span className="text-white/40">|</span>
                    <span>Client: Dangote Industries PLC</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[#b2c8e9]">Cargo: Industrial Grade Polymers</span>
                    <span className="px-2 py-0.5 bg-[#994700] text-white rounded font-mono font-semibold text-[11px]">
                      Cold-Chain Secure
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Toolbar for Selected Courier */}
              <div className="bg-white p-4 rounded-xl border border-[#e2e8f0] shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ffdbc8]/40 flex items-center justify-center text-[#994700]">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <div>
                    <h5 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                      Dispatcher Operations Console
                    </h5>
                    <p className="text-xs text-[#43474d]">
                      Instant command override &amp; direct telemetry link for {selectedCourier.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handleAction('Ping Driver')}
                    className="px-3 py-2 bg-[#00162e] text-white rounded-xl text-xs font-semibold hover:bg-[#142b45] transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                    <span>Ping Driver</span>
                  </button>
                  <button
                    onClick={() => handleAction('Re-Route Command')}
                    className="px-3 py-2 bg-[#eef4ff] hover:bg-[#e4efff] text-[#0c1d2c] rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">route</span>
                    <span>Re-Route</span>
                  </button>
                  <button
                    onClick={() => handleAction('Broadcast Alert')}
                    className="px-3 py-2 bg-[#eef4ff] hover:bg-[#e4efff] text-[#0c1d2c] rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">campaign</span>
                    <span>Broadcast</span>
                  </button>
                  <button
                    onClick={() => handleAction('SOS Dispatch')}
                    className="px-3 py-2 bg-[#ba1a1a] text-white rounded-xl text-xs font-bold hover:bg-[#93000a] transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">sos</span>
                    <span>Dispatch SOS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Telemetry & Chain of Custody Drawer */}
          <div className="px-3 sm:px-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden border-t-4 border-t-[#994700]">
              <div className="px-3.5 sm:px-6 py-3 bg-[#eef4ff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="material-symbols-outlined text-[#994700]">history</span>
                  <h3 className="font-['Manrope'] text-xs sm:text-sm font-bold text-[#0c1d2c] truncate">
                    Live Event Stream &amp; Chain of Custody Log ({selectedCourier.trackingCode})
                  </h3>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#d3e4fa] rounded-lg font-mono text-[10px] sm:text-xs text-[#0c1d2c] font-semibold">
                    Hash: 0x8F92A...4C1E
                  </span>
                  <button
                    onClick={() => handleAction('Audit Report Export')}
                    className="text-[#994700] hover:underline text-xs font-semibold cursor-pointer"
                  >
                    Export Audit Report
                  </button>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Log Item 1 */}
                <div className="flex flex-col gap-1 p-3 bg-[#f8f9ff] rounded-xl border border-[#e2e8f0]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#994700] font-semibold">14:22:10 UTC</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs font-bold text-[#0c1d2c]">Geofence Entry Confirmed</p>
                  <p className="text-[11px] text-[#43474d] leading-relaxed">
                    Vehicle entered Victoria Island Secure Perimeter Zone A via Lekki Toll Gate check-point.
                  </p>
                  <span className="mt-2 font-mono text-[10px] text-[#74777e]">
                    Lat: 6.4281° N, Lon: 3.4219° E
                  </span>
                </div>

                {/* Log Item 2 */}
                <div className="flex flex-col gap-1 p-3 bg-[#f8f9ff] rounded-xl border border-[#e2e8f0]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#994700] font-semibold">14:10:45 UTC</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs font-bold text-[#0c1d2c]">Cold-Chain Temp Check</p>
                  <p className="text-[11px] text-[#43474d] leading-relaxed">
                    Compartment sensor reading stable at +4.2°C. Within threshold limits.
                  </p>
                  <span className="mt-2 font-mono text-[10px] text-[#74777e]">
                    Sensor ID: CLD-LAG-09
                  </span>
                </div>

                {/* Log Item 3 */}
                <div className="flex flex-col gap-1 p-3 bg-[#f8f9ff] rounded-xl border border-[#e2e8f0]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#994700] font-semibold">13:55:00 UTC</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-xs font-bold text-[#0c1d2c]">Tamper-Evident Bag Scan</p>
                  <p className="text-[11px] text-[#43474d] leading-relaxed">
                    RFID seal integrity verified intact by automated scanner at Ikeja Hub exit.
                  </p>
                  <span className="mt-2 font-mono text-[10px] text-[#74777e]">
                    Seal Tag: #TEB-883921
                  </span>
                </div>

                {/* Log Item 4 */}
                <div className="flex flex-col gap-1 p-3 bg-[#f8f9ff] rounded-xl border border-[#e2e8f0]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#994700] font-semibold">13:30:15 UTC</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <p className="text-xs font-bold text-[#0c1d2c]">Manifest Assigned</p>
                  <p className="text-[11px] text-[#43474d] leading-relaxed">
                    Courier Tunde Bakare accepted dispatch assignment and loaded manifest items.
                  </p>
                  <span className="mt-2 font-mono text-[10px] text-[#74777e]">
                    Dispatcher ID: Sarah J.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
