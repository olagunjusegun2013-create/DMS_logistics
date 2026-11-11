import React, { useState } from 'react';
import {
  MAP_IKOYI_TRACKING,
  TUNDE_BAKARE_PROFILE_PIC,
  INITIAL_ORDERS,
} from '../../data/logisticsData';
import { ScreenId, ShipmentOrder } from '../../types/logistics';
import { CustomerOrdersHistoryModal } from '../sections/CustomerOrdersHistoryModal';
import { CustomerSupportModal } from '../sections/CustomerSupportModal';

interface TrackShipmentScreenProps {
  onNavigate: (screenId: ScreenId) => void;
  orders?: ShipmentOrder[];
}

export const TrackShipmentScreen: React.FC<TrackShipmentScreenProps> = ({ onNavigate, orders }) => {
  const [waybillInput, setWaybillInput] = useState('#DMS-TRK-98421');
  const [copied, setCopied] = useState(false);
  const [instructionModal, setInstructionModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9ff] text-[#0c1d2c] font-sans antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#142b45] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs border border-white/20 animate-in fade-in">
          <span className="material-symbols-outlined text-[#fd934c] text-[18px]">
            notifications_active
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Track Shipment Canvas */}
      <main className="w-full flex-1 flex flex-col justify-between">
        <div>
          {/* Top Command & Live Status Banner */}
          <div className="w-full bg-[#142b45] text-white py-4 sm:py-6 px-3.5 sm:px-6 shadow-md relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4 relative z-10">
              {/* Search input & direct dispatch query bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#fd934c]/20 text-[#ffdbc8] font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                    Enterprise Dispatch
                  </span>
                  <span className="text-[#7d93b2] text-[11px] sm:text-xs">Global Real-time Waybill Telemetry</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-1 rounded-xl shadow-sm max-w-xl w-full">
                  <div className="relative flex-1 flex items-center">
                    <span className="material-symbols-outlined text-[#74777e] ml-3 mr-1 text-[20px]">
                      search
                    </span>
                    <input
                      className="w-full px-2 py-1.5 bg-transparent font-mono text-xs text-[#0c1d2c] focus:outline-none placeholder:text-[#74777e]"
                      placeholder="Enter Waybill, BOL or Reference..."
                      type="text"
                      value={waybillInput}
                      onChange={(e) => setWaybillInput(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => showToast(`Tracking synced for ${waybillInput}`)}
                    className="px-3.5 py-2 bg-[#994700] hover:bg-[#6c3000] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                    <span>Track Shipment</span>
                  </button>
                </div>
              </div>

              {/* Live Shipment Header Card */}
              <div className="bg-[#00162e]/70 backdrop-blur-md rounded-xl p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#994700]/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#fd934c] text-[24px] sm:text-[28px]">
                      electric_bolt
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Manrope'] text-base sm:text-lg font-bold tracking-tight">
                        Shipment {waybillInput}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#fd934c] text-[#6c3000] text-[10px] uppercase font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#6c3000] animate-pulse"></span>
                        In Transit
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[#7d93b2] text-[11px] sm:text-xs flex-wrap">
                      <span>
                        Service: <strong className="text-white font-medium">Express Priority Air Parcel</strong>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span>
                        Node: <strong className="text-white font-medium">Marina Fleet Desk</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ETA Telemetry Highlight */}
                <div className="flex items-center justify-between sm:justify-end gap-3 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase tracking-wider text-[#7d93b2] font-semibold">
                      Estimated Target Arrival
                    </div>
                    <div className="font-['Manrope'] text-xs sm:text-sm font-bold text-[#ffdbc8] tracking-tight">
                      Today, Oct 24 • 15:10 PM
                    </div>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#994700] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">schedule</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* LEFT COLUMN: Detailed Chronological Milestone Timeline (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e2e8f0]">
                  <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#e2e8f0]">
                    <div>
                      <h2 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                        Telemetry &amp; Dispatch Log
                      </h2>
                      <p className="text-xs text-[#43474d]">
                        Authenticated chain-of-custody updates with precise geolocation nodes
                      </p>
                    </div>
                    <button
                      onClick={() => showToast('Telemetry Stream Synced')}
                      className="inline-flex items-center gap-1 text-[#994700] text-xs font-semibold hover:underline"
                    >
                      <span className="material-symbols-outlined text-[16px]">refresh</span>
                      <span>Live Sync</span>
                    </button>
                  </div>

                  {/* Chronological Step Tree */}
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#d3e4fa]">
                    {/* Milestone 1: Active Out for Delivery */}
                    <div className="relative group">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#994700] flex items-center justify-center ring-4 ring-[#ffdbc8]">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      </div>
                      <div className="bg-[#eef4ff] rounded-xl p-3.5 ml-2 transition-all hover:bg-[#e4efff]">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-[#994700]">Out for Delivery</span>
                          <span className="font-mono text-xs font-semibold text-[#0c1d2c]">
                            14:22 WAT
                          </span>
                        </div>
                        <p className="text-xs text-[#0c1d2c] mb-2 leading-relaxed">
                          Courier assigned{' '}
                          <span className="font-semibold text-[#00162e]">Tunde Bakare</span> (Plate:{' '}
                          <span className="font-mono text-[11px] bg-[#d3e4fa] px-1.5 py-0.5 rounded text-[#0c1d2c]">
                            APP-882-XY
                          </span>
                          ) dispatched from Marina Hub on final delivery sequence.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-[#d3e4fa] text-[#43474d] inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">pin_drop</span>{' '}
                            Marina Central Terminal
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#ffdbc8] text-[#321300] inline-flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-[14px]">speed</span>{' '}
                            Active Route • 2.4 km out
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 2: Sorting Facility Arrival */}
                    <div className="relative group">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#00162e] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[12px]">done</span>
                      </div>
                      <div className="ml-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="font-['Manrope'] text-xs font-bold text-[#0c1d2c]">
                            Arrived at Sorting Facility
                          </span>
                          <span className="font-mono text-xs text-[#43474d]">13:40 WAT</span>
                        </div>
                        <p className="text-xs text-[#43474d] mb-2">
                          Optical scan inbound verified at Marina Hub Warehouse Gate 2. Transferred to localized urban delivery van.
                        </p>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-[#e4efff] text-[#43474d] inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">warehouse</span>{' '}
                            Marina Hub (Dock Bay 4)
                          </span>
                          <span className="text-[#43474d] font-mono">Staff ID: #OPS-LAG-402</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 3: Departed Origin Hub */}
                    <div className="relative group">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#00162e] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[12px]">done</span>
                      </div>
                      <div className="ml-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="font-['Manrope'] text-xs font-bold text-[#0c1d2c]">
                            Departed Origin Hub
                          </span>
                          <span className="font-mono text-xs text-[#43474d]">11:15 WAT</span>
                        </div>
                        <p className="text-xs text-[#43474d] mb-2">
                          Consolidated linehaul vehicle departing Ikeja Industrial Sorting Center en route to Island South Hub via Third Mainland Transit Corridor.
                        </p>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-[#e4efff] text-[#43474d] inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>{' '}
                            Ikeja Industrial Sorting
                          </span>
                          <span className="text-[#43474d] font-mono">Manifest #LH-8831</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 4: Package Picked Up */}
                    <div className="relative group">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#00162e] flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[12px]">done</span>
                      </div>
                      <div className="ml-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="font-['Manrope'] text-xs font-bold text-[#0c1d2c]">
                            Package Picked Up
                          </span>
                          <span className="font-mono text-xs text-[#43474d]">09:30 WAT</span>
                        </div>
                        <p className="text-xs text-[#43474d] mb-2">
                          Handed over from consignor Aliko Dangote Corp / B. Adeleke (Whse 4C). Package weight verified at 2.40 kg with tamper seal #7741.
                        </p>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-[#e4efff] text-[#43474d] inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">business</span>{' '}
                            Aliko Corp Logistic Dock
                          </span>
                          <span className="text-[#43474d] font-mono">Field Agent: S. Ojo</span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone 5: Order Created & Confirmed */}
                    <div className="relative group">
                      <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#d3e4fa] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#43474d] text-[12px]">check</span>
                      </div>
                      <div className="ml-2">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="font-['Manrope'] text-xs font-bold text-[#43474d]">
                            Order Created &amp; Confirmed
                          </span>
                          <span className="font-mono text-xs text-[#43474d]">08:00 WAT</span>
                        </div>
                        <p className="text-xs text-[#43474d] mb-2">
                          Digital electronic waybill generated and pre-customs cleared via Customer Portal API interface.
                        </p>
                        <span className="text-[11px] font-mono text-[#74777e]">
                          TxRef: 98421-CONF-LKG
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Sensors Snapshot Metric Banner */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f0] grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Current Speed
                    </span>
                    <span className="font-['Manrope'] text-base text-[#00162e] font-bold font-mono">
                      38 km/h
                    </span>
                    <span className="text-[11px] text-[#43474d]">Urban Flow</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Cargo Integrity
                    </span>
                    <span className="font-['Manrope'] text-base text-[#0c1d2c] font-bold">
                      100% Secure
                    </span>
                    <span className="text-[11px] text-[#43474d]">Tamper Guard Valid</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Hub Transfers
                    </span>
                    <span className="font-['Manrope'] text-base text-[#00162e] font-bold">
                      2 Hubs
                    </span>
                    <span className="text-[11px] text-[#43474d]">Origin &amp; Transit</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#43474d] uppercase font-semibold">
                      Sign-Off Mode
                    </span>
                    <span className="font-['Manrope'] text-base text-[#994700] font-bold">
                      OTP + Biometric
                    </span>
                    <span className="text-[11px] text-[#43474d]">Direct Recipient</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Transit Map, Courier & Details (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Live Transit Map Card */}
                <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col">
                  <div className="p-3.5 flex items-center justify-between border-b border-[#e2e8f0]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#994700] animate-ping"></span>
                      <span className="text-xs font-bold text-[#0c1d2c]">Live Transit Telemetry</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#43474d] bg-[#eef4ff] px-2 py-0.5 rounded">
                      GPS Refresh: 4s
                    </span>
                  </div>

                  <div className="relative w-full h-64 bg-[#d3e4fa] overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${MAP_IKOYI_TRACKING}')` }}
                    />
                    <div className="absolute inset-0 bg-[#00162e]/20 pointer-events-none" />

                    {/* Dynamic Courier Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="bg-[#994700] text-white px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 text-[11px] font-bold animate-bounce">
                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                        <span>Courier Bakare (2.4 km away)</span>
                      </div>
                      <div className="w-3 h-3 bg-[#994700] rotate-45 -mt-1 shadow-md"></div>
                    </div>

                    {/* Destination Node Indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 backdrop-blur px-2.5 py-1 rounded shadow-sm">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                        location_on
                      </span>
                      <span className="text-xs text-[#0c1d2c] font-semibold">Kingsway Tower</span>
                    </div>

                    {/* Quick Map Footer Stats */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur p-2.5 rounded-lg shadow-sm flex items-center justify-between text-[#0c1d2c]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#994700] text-[20px]">
                          near_me
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#43474d]">Remaining Distance</span>
                          <span className="font-mono text-xs font-bold text-[#0c1d2c]">
                            2.4 km (approx. 14 mins)
                          </span>
                        </div>
                      </div>
                      <span className="text-[#994700] text-xs font-semibold bg-[#ffdbc8] px-2 py-0.5 rounded">
                        On Schedule
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assigned Courier Card */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e2e8f0]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">
                      Assigned Delivery Specialist
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#994700] text-[11px] font-semibold bg-[#ffdbc8]/50 px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Verified Carrier
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        className="w-16 h-16 rounded-xl object-cover shadow-sm ring-2 ring-[#e4efff]"
                        alt="Tunde Bakare"
                        src={TUNDE_BAKARE_PROFILE_PIC}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#994700] text-white flex items-center justify-center text-[10px]">
                        <span className="material-symbols-outlined text-[12px]">directions_car</span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c] truncate">
                          Tunde Bakare
                        </h3>
                        <div className="flex items-center gap-1 text-[#994700]">
                          <span className="material-symbols-outlined text-[16px] text-[#994700]">star</span>
                          <span className="text-xs font-bold text-[#0c1d2c]">4.88</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#43474d]">Enterprise Van Delivery Unit</p>
                      <div className="flex items-center gap-2 mt-1 text-[#43474d] font-mono text-[11px]">
                        <span>1,420 Completed Runs</span>
                        <span>•</span>
                        <span className="font-semibold text-[#00162e]">Plate: APP-882-XY</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-[#e2e8f0]">
                    <a
                      href="tel:+2348034918820"
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#00162e] hover:bg-[#142b45] text-white text-xs font-semibold transition shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Call Driver</span>
                    </a>
                    <button
                      onClick={() => onNavigate('driver-dashboard')}
                      className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#e4efff] hover:bg-[#daeaff] text-[#0c1d2c] text-xs font-semibold transition"
                    >
                      <span className="material-symbols-outlined text-[16px]">smartphone</span>
                      <span>Driver View</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Details & Package Specs */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e2e8f0] flex flex-col gap-3">
                  <h3 className="font-['Manrope'] text-sm font-bold text-[#0c1d2c]">
                    Consignment Manifest
                  </h3>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#e4efff] flex items-center justify-center text-[#00162e] shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[16px]">trip_origin</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#43474d] uppercase font-bold">Origin Point</span>
                        <span className="text-xs text-[#0c1d2c] font-semibold">
                          Ikeja Industrial Hub, Lagos
                        </span>
                        <span className="text-[11px] text-[#43474d]">
                          Aliko Dangote Corporate Campus, Whse 4C
                        </span>
                      </div>
                    </div>

                    <div className="w-0.5 h-3 bg-[#d3e4fa] ml-3.5"></div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#ffdbc8] flex items-center justify-center text-[#994700] shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#43474d] uppercase font-bold">
                          Destination Address
                        </span>
                        <span className="text-xs text-[#0c1d2c] font-semibold">
                          Kingsway Tower, Kingsway Road
                        </span>
                        <span className="text-[11px] text-[#43474d]">
                          Ikoyi, Lagos State • Level 7 Suite A
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#eef4ff] p-3 rounded-lg flex flex-col gap-1.5 text-xs mt-1">
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span>Recipient Authorized:</span>
                      <span className="font-bold text-[#0c1d2c]">Folake Balogun</span>
                    </div>
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span>Direct Contact:</span>
                      <span className="font-mono text-[#0c1d2c] font-semibold">+234 802 118 3390</span>
                    </div>
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span>Package Contents:</span>
                      <span className="text-[#0c1d2c]">Critical Contract &amp; Legal Envelopes (2.4kg)</span>
                    </div>
                    <div className="flex justify-between items-center text-[#43474d]">
                      <span>Waybill Number:</span>
                      <span className="font-mono font-bold text-[#994700]">#DMS-TRK-98421</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Management & Action Suite */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-[#e2e8f0] flex flex-col gap-2">
                  <span className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider mb-1">
                    Consignee Controls
                  </span>

                  <button
                    onClick={() => setInstructionModal(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#00162e] text-[20px]">
                        edit_note
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Change Delivery Instructions
                        </span>
                        <span className="text-[10px] text-[#43474d]">
                          Add gate pass code, leave at reception notes
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#74777e] text-[18px]">
                      chevron_right
                    </span>
                  </button>

                  <button
                    onClick={() => setRescheduleModal(true)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#00162e] text-[20px]">
                        calendar_month
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Reschedule Time Slot
                        </span>
                        <span className="text-[10px] text-[#43474d]">
                          Select alternate morning or afternoon window
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#74777e] text-[18px]">
                      chevron_right
                    </span>
                  </button>

                  <button
                    onClick={() => showToast('Downloading Cryptographic Waybill PDF...')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#eef4ff] hover:bg-[#e4efff] transition text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#994700] text-[20px]">
                        picture_as_pdf
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#0c1d2c]">
                          Download Waybill Copy (PDF)
                        </span>
                        <span className="text-[10px] text-[#43474d]">
                          Official cryptographic BOL manifest
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#74777e] text-[18px]">
                      download
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-[#d3e4fa] py-4 px-6 text-xs text-[#43474d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2025 DMS Enterprise Logistics Suite. Secure Customer Portal.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#0c1d2c]">Service Level Agreements</a>
            <a href="#" className="hover:text-[#0c1d2c]">Compliance &amp; Security</a>
            <a href="#" className="hover:text-[#0c1d2c]">Dispatch Desk</a>
          </div>
        </footer>
      </main>

      {/* Instruction Modal */}
      {instructionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e8f0]">
            <h3 className="font-['Manrope'] text-base font-bold text-[#0c1d2c] mb-2">
              Update Delivery Guidance
            </h3>
            <p className="text-xs text-[#43474d] mb-4">
              Enter any building gate access codes or reception signee instructions for Driver Tunde Bakare.
            </p>
            <textarea
              className="w-full p-3 rounded-xl bg-[#f8f9ff] border border-[#c4c6ce] text-xs outline-none"
              rows={3}
              defaultValue="Receptionist Folake Balogun will receive on 4th floor. Intercom code: #402."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setInstructionModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#43474d] hover:bg-[#eef4ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setInstructionModal(false);
                  showToast('Instructions updated and transmitted to driver');
                }}
                className="px-4 py-1.5 rounded-lg bg-[#994700] text-white text-xs font-semibold hover:bg-[#6c3000]"
              >
                Save Guidance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e8f0]">
            <h3 className="font-['Manrope'] text-base font-bold text-[#0c1d2c] mb-2">
              Reschedule Time Window
            </h3>
            <p className="text-xs text-[#43474d] mb-4">
              Select an alternate delivery time slot for shipment {waybillInput}.
            </p>
            <div className="space-y-2 mb-4">
              {[
                'Today, Oct 24 • Afternoon (15:00 - 17:00)',
                'Tomorrow, Oct 25 • Morning (09:00 - 11:30)',
                'Tomorrow, Oct 25 • Afternoon (13:00 - 15:30)',
              ].map((slot, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-[#eef4ff] cursor-pointer hover:bg-[#e4efff]"
                >
                  <input
                    type="radio"
                    name="slot"
                    defaultChecked={i === 0}
                    className="accent-[#994700]"
                  />
                  <span className="text-xs font-medium text-[#0c1d2c]">{slot}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRescheduleModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#43474d] hover:bg-[#eef4ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRescheduleModal(false);
                  showToast('Time slot updated with logistics desk');
                }}
                className="px-4 py-1.5 rounded-lg bg-[#994700] text-white text-xs font-semibold hover:bg-[#6c3000]"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Orders History Modal */}
      <CustomerOrdersHistoryModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders || INITIAL_ORDERS}
        onNavigate={onNavigate}
      />

      {/* Customer Support Modal */}
      <CustomerSupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />
    </div>
  );
};
