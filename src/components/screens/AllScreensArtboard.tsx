import React from 'react';
import { ScreenId } from '../../types/logistics';
import { AdminDashboardScreen } from './AdminDashboardScreen';
import { LiveTrackingScreen } from './LiveTrackingScreen';
import { RequestDeliveryScreen } from './RequestDeliveryScreen';
import { TrackShipmentScreen } from './TrackShipmentScreen';
import { DriverDashboardScreen } from './DriverDashboardScreen';
import { DriverNavigationScreen } from './DriverNavigationScreen';
import { ProofOfDeliveryScreen } from './ProofOfDeliveryScreen';

interface AllScreensArtboardProps {
  onSelectScreen: (screen: ScreenId) => void;
  scale?: number;
}

export const AllScreensArtboard: React.FC<AllScreensArtboardProps> = ({
  onSelectScreen,
  scale = 0.65,
}) => {
  const screensList = [
    {
      id: 'admin-dashboard' as ScreenId,
      number: '01',
      title: 'Operations / Admin Dashboard',
      subtitle: 'Active Dispatch Operational Center (Lagos Hubs, KPI Bento, Telemetry Grid)',
      type: 'desktop',
      component: <AdminDashboardScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'live-tracking' as ScreenId,
      number: '02',
      title: 'Operations / Live Telemetry Radar',
      subtitle: 'Tactical Fleet Map, Courier Corridor Feeds, Dispatcher Console Override',
      type: 'desktop',
      component: <LiveTrackingScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'request-delivery' as ScreenId,
      number: '03',
      title: 'Customer Portal / Request Delivery',
      subtitle: '4-Step Consignment Booking, Route Calculation, Dynamic Real-Time Tariff',
      type: 'desktop',
      component: <RequestDeliveryScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'track-shipment' as ScreenId,
      number: '04',
      title: 'Customer Portal / Waybill Telemetry',
      subtitle: 'Chain-of-Custody Timeline, IoT Sensor Feeds, Courier Specialist Card',
      type: 'desktop',
      component: <TrackShipmentScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'driver-dashboard' as ScreenId,
      number: '05',
      title: 'Driver Stack / Shift Dashboard',
      subtitle: 'Courier Manifest Queue, Shift Bento KPIs, Active Stop Hero Card',
      type: 'mobile',
      component: <DriverDashboardScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'driver-navigation' as ScreenId,
      number: '06',
      title: 'Driver Stack / Turn-by-Turn GPS',
      subtitle: 'Live Vector Navigation, Maneuver HUD, Speedometer, Destination Pin',
      type: 'mobile',
      component: <DriverNavigationScreen onNavigate={onSelectScreen} />,
    },
    {
      id: 'proof-of-delivery' as ScreenId,
      number: '07',
      title: 'Driver Stack / Proof of Delivery',
      subtitle: 'Signee OTP Verification, Digital Signature Canvas, Telemetry Geotag Photo',
      type: 'mobile',
      component: <ProofOfDeliveryScreen onNavigate={onSelectScreen} />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#071321] text-white p-6 pb-24">
      {/* Artboard Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#0D1E32] border border-[#1E3756] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-secondary-container text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping" />
            Full Enterprise Suite Architecture
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-headline-xl">
            DMS Logistics Operations Suite — All 7 Screens
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            A unified design system connecting dispatch controllers, enterprise consignors, and on-field couriers in real time. Click on any screen header to open it in full view.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSelectScreen('admin-dashboard')}
            className="px-4 py-2 bg-secondary hover:bg-secondary-container text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Interactive Flow
          </button>
        </div>
      </div>

      {/* Grid of Screens */}
      <div className="max-w-[1700px] mx-auto space-y-12">
        {/* Section 1: Operations Management Center */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-[#1E3756] pb-3">
            <span className="material-symbols-outlined text-secondary-container text-[24px]">corporate_fare</span>
            <div>
              <h2 className="text-lg font-bold text-white">01. Operations Management Center</h2>
              <p className="text-xs text-slate-400">Hub telemetry, dispatch queue, active couriers, and live radar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {screensList.slice(0, 2).map((screen) => (
              <div
                key={screen.id}
                className="bg-[#0B1A2C] border border-[#1E3756] rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all hover:border-secondary-container/50"
              >
                <div className="p-4 bg-[#11243A] border-b border-[#1E3756] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/30">
                      {screen.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-secondary-container transition-colors">
                        {screen.title}
                      </h3>
                      <p className="text-xs text-slate-400">{screen.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectScreen(screen.id)}
                    className="px-3 py-1.5 bg-primary-container hover:bg-secondary hover:text-white text-xs font-semibold rounded-lg transition-all text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full View</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_full</span>
                  </button>
                </div>

                <div className="p-4 overflow-x-auto bg-[#071321] flex justify-center">
                  <div
                    className="origin-top transition-transform shadow-2xl rounded-xl overflow-hidden pointer-events-none"
                    style={{
                      transform: `scale(${scale})`,
                      width: '1280px',
                      height: '800px',
                      marginBottom: '-240px',
                    }}
                  >
                    {screen.component}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Customer Booking & Tracking Portal */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-[#1E3756] pb-3">
            <span className="material-symbols-outlined text-secondary-container text-[24px]">public</span>
            <div>
              <h2 className="text-lg font-bold text-white">02. Customer Portal Experience</h2>
              <p className="text-xs text-slate-400">Self-service waybill generation and end-to-end sensor telemetry</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {screensList.slice(2, 4).map((screen) => (
              <div
                key={screen.id}
                className="bg-[#0B1A2C] border border-[#1E3756] rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all hover:border-secondary-container/50"
              >
                <div className="p-4 bg-[#11243A] border-b border-[#1E3756] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/30">
                      {screen.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-secondary-container transition-colors">
                        {screen.title}
                      </h3>
                      <p className="text-xs text-slate-400">{screen.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectScreen(screen.id)}
                    className="px-3 py-1.5 bg-primary-container hover:bg-secondary hover:text-white text-xs font-semibold rounded-lg transition-all text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full View</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_full</span>
                  </button>
                </div>

                <div className="p-4 overflow-x-auto bg-[#071321] flex justify-center">
                  <div
                    className="origin-top transition-transform shadow-2xl rounded-xl overflow-hidden pointer-events-none"
                    style={{
                      transform: `scale(${scale})`,
                      width: '1280px',
                      height: '800px',
                      marginBottom: '-240px',
                    }}
                  >
                    {screen.component}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Mobile Courier / Driver App */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-[#1E3756] pb-3">
            <span className="material-symbols-outlined text-secondary-container text-[24px]">smartphone</span>
            <div>
              <h2 className="text-lg font-bold text-white">03. Courier Driver Mobile Stack (390px Viewport)</h2>
              <p className="text-xs text-slate-400">Ergonomic touch workflow: Shift cockpit → Turn-by-turn navigation → Biometric & signature POD</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {screensList.slice(4, 7).map((screen) => (
              <div
                key={screen.id}
                className="bg-[#0B1A2C] border border-[#1E3756] rounded-2xl overflow-hidden shadow-2xl flex flex-col group transition-all hover:border-secondary-container/50"
              >
                <div className="p-4 bg-[#11243A] border-b border-[#1E3756] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary-container/20 text-secondary-container border border-secondary-container/30">
                      {screen.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-xs text-white group-hover:text-secondary-container transition-colors truncate max-w-[180px]">
                        {screen.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{screen.subtitle}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectScreen(screen.id)}
                    className="px-2.5 py-1 bg-primary-container hover:bg-secondary hover:text-white text-xs font-semibold rounded-lg transition-all text-slate-200 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Open</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>

                <div className="p-4 bg-[#071321] flex justify-center items-center">
                  <div className="w-[390px] rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-surface">
                    {screen.component}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
