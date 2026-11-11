import React, { useState } from 'react';
import { ScreenId } from '../../types/logistics';

interface DriverNavigationScreenProps {
  onNavigate?: (screen: ScreenId) => void;
}

export const DriverNavigationScreen: React.FC<DriverNavigationScreenProps> = ({
  onNavigate,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(48);
  const [radarActive, setRadarActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    showToast(isMuted ? 'Voice guidance resumed: "In 300 meters, turn right"' : 'Voice guidance muted');
  };

  const recenterGps = () => {
    setRadarActive(false);
    setTimeout(() => setRadarActive(true), 100);
    showToast('GPS Signal Re-centered: Fixed on Kingsway Corridor');
  };

  return (
    <div className="w-full sm:max-w-[420px] mx-auto bg-surface text-on-surface font-body-md min-h-screen flex flex-col relative shadow-none sm:shadow-2xl border-0 sm:border border-outline-variant/30 overflow-hidden select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary text-xs px-4 py-2 rounded-full shadow-lg border border-secondary-container/40 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-secondary-container">navigation</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60 shadow-[0_1px_8px_rgba(20,43,69,0.06)]">
        <div className="h-14 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate?.('driver-dashboard')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-xl text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline-sm text-sm font-bold text-on-surface truncate">
                Turn-by-Turn GPS Navigation
              </h1>
              <p className="font-code-sm text-[10px] text-on-surface-variant">Active Leg: Lagos Mainland → Ikoyi</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Stack */}
      <main className="flex-1 flex flex-col px-4 pt-3 pb-6 space-y-3">
        {/* TOP LIVE GUIDANCE MANEUVER BANNER */}
        <div className="w-full bg-primary-container text-on-primary rounded-xl p-3.5 shadow-lg relative z-20 border border-secondary-container/30">
          <div className="flex items-center gap-3">
            {/* Main Direction Turn Graphic */}
            <div className="w-13 h-13 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-secondary-container text-[36px]">turn_right</span>
            </div>

            {/* Primary Maneuver Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-1">
                <span className="text-2xl font-headline-xl text-on-primary font-bold tracking-tight">350 m</span>
                <span className="font-code-sm text-[10px] text-on-primary-container uppercase px-2 py-0.5 rounded bg-surface-container-lowest/10 font-bold">
                  In 45s
                </span>
              </div>
              <p className="text-sm font-headline-sm text-on-primary truncate font-semibold">Turn Right onto Kingsway Rd</p>
              <p className="text-[11px] text-on-primary-container truncate">Alfred Rewane Way corridor</p>
            </div>
          </div>

          {/* Secondary Subsequent Maneuver Bar */}
          <div className="mt-2.5 pt-2 flex items-center gap-2 text-on-primary-container text-[11px] bg-primary/40 rounded-lg px-2.5 py-1.5 border border-white/5">
            <span className="material-symbols-outlined text-[16px] text-secondary-container">turn_sharp_left</span>
            <span className="text-on-primary/80 font-medium">Then:</span>
            <span className="text-on-primary truncate font-medium">Sharp left into Kingsway Tower Gate 2</span>
            <span className="ml-auto font-code-sm text-[10px] text-on-primary-container font-bold">650m</span>
          </div>
        </div>

        {/* LIVE GPS MAP VIEWPORT (DOMINANT VIEW) */}
        <div className="w-full h-[370px] rounded-xl relative overflow-hidden shadow-md bg-surface-container-high border border-outline-variant/30">
          {/* Stylized Vector Roads / GPS Map Simulation (Lagos / Ikoyi grid) */}
          <svg className="absolute inset-0 w-full h-full object-cover" fill="none" viewBox="0 0 390 360" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#E8EFF8" height="360" width="390" />
            {/* Water body (Five Cowries Creek edge) */}
            <path d="M-20 320 C 60 290, 160 330, 240 310 C 310 290, 360 330, 420 320 L 420 380 L -20 380 Z" fill="#D2E4F8" />
            <text fill="#7D93B2" fontFamily="Inter" fontSize="9" fontWeight="600" letterSpacing="1" x="270" y="345">
              IKOYI WATERFRONT
            </text>

            {/* Secondary Street Grid */}
            <path d="M0 60 L390 90 M0 140 L390 170 M0 240 L390 270" stroke="#DAE4F0" strokeLinecap="round" strokeWidth="6" />
            <path d="M70 0 L90 360 M190 0 L210 360 M310 0 L330 360" stroke="#DAE4F0" strokeLinecap="round" strokeWidth="6" />

            {/* Green parks/zones */}
            <rect fill="#DAEDDC" height="60" opacity="0.8" rx="6" width="80" x="230" y="30" />
            <text fill="#3D7E50" fontFamily="Inter" fontSize="8" fontWeight="700" x="240" y="55">
              IKOYI GOLF
            </text>

            {/* Alternative Route (Subdued grey-dashed) */}
            <path d="M110 340 L 110 210 L 260 210 L 260 90" opacity="0.75" stroke="#94A3B8" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="4" />

            {/* ACTIVE NAVIGATION CORRIDOR (Glow + Primary Route) */}
            {/* Subdued Traveled segment */}
            <path d="M50 350 L 105 285" opacity="0.6" stroke="#7D93B2" strokeLinecap="round" strokeWidth="7" />
            {/* Smooth Green corridor */}
            <path d="M105 285 L 140 240" stroke="#16845B" strokeLinecap="round" strokeWidth="8" />
            {/* Moderate traffic delay (Amber zone near roundabout) */}
            <path d="M140 240 L 175 195" stroke="#FD934C" strokeLinecap="round" strokeWidth="8" />
            {/* Turn path forward (High-contrast Navy/Cyan active polyline) */}
            <path d="M175 195 L 210 150 L 285 150 L 285 75" stroke="#002B51" strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
            <path d="M175 195 L 210 150 L 285 150 L 285 75" stroke="#5994DB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />

            {/* Destination Waypoint Pin (Kingsway Tower) */}
            <g transform="translate(270, 48)">
              <circle cx="15" cy="15" fill="#142B45" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))" r="16" />
              <circle cx="15" cy="15" fill="#D97732" r="13" />
              <path d="M11 11 H19 V19 H11 Z" fill="#FFFFFF" />
              {/* Destination Flag Tag */}
              <rect fill="#0C1D2C" height="22" rx="4" width="76" x="36" y="4" />
              <text fill="#FFFFFF" fontFamily="Inter" fontSize="9" fontWeight="700" x="42" y="19">
                Kingsway Tower
              </text>
            </g>

            {/* Dynamic Vehicle GPS Location Icon (with heading radar cone) */}
            <g transform="translate(162, 178) rotate(32)">
              {/* Heading cone/radar sweep */}
              {radarActive && (
                <path d="M12 12 L-4 -20 A30 30 0 0 1 28 -20 Z" fill="#5994DB" opacity="0.3" />
              )}
              {/* Pulse ring */}
              <circle cx="12" cy="12" fill="#FD934C" opacity="0.2" r="16">
                <animate attributeName="r" dur="2s" repeatCount="indefinite" values="12;20;12" />
                <animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="0.3;0;0.3" />
              </circle>
              {/* Vehicle base */}
              <circle cx="12" cy="12" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" r="10" />
              <circle cx="12" cy="12" fill="#142B45" r="7" />
              <path d="M12 7 L16 15 L12 13 L8 15 Z" fill="#FD934C" />
            </g>
          </svg>

          {/* Top Floating Traffic Hazard HUD */}
          <div className="absolute top-2 inset-x-2 z-10 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
            <p className="text-[11px] text-on-surface truncate flex-1 font-semibold">
              Heavy traffic near Falomo • <span className="text-secondary font-bold">+3 min delay</span> factored
            </p>
            <span className="font-code-sm text-[10px] text-on-surface-variant font-medium">1.4 km</span>
          </div>

          {/* Map Overlay Controls: Left Stack (Telemetry & Speed) */}
          <div className="absolute left-2.5 bottom-2.5 z-10 flex flex-col gap-1.5">
            {/* Speedometer & Speed Limit Group */}
            <div className="flex items-center gap-1.5 bg-surface-container-lowest/95 backdrop-blur-md p-1.5 rounded-xl shadow-md border border-outline-variant/20">
              {/* Current Speed */}
              <div className="flex flex-col items-center px-2 py-0.5">
                <span className="text-xl font-headline-md text-on-surface font-bold leading-none">{speed}</span>
                <span className="font-code-sm text-on-surface-variant text-[9px] uppercase tracking-wider font-semibold">km/h</span>
              </div>
              {/* Speed Limit Sign Badge */}
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest border-2 border-error flex flex-col items-center justify-center p-0.5 shadow-sm">
                <span className="font-code-sm text-error font-bold leading-tight text-[11px]">60</span>
                <span className="text-[6px] font-bold text-on-surface-variant leading-none">LIMIT</span>
              </div>
            </div>

            {/* Stop Sequence Tag */}
            <div className="bg-primary-container text-on-primary px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 self-start">
              <span className="material-symbols-outlined text-[14px] text-secondary-container">inventory_2</span>
              <span className="text-[10px] font-semibold tracking-wide">Stop #9 of 12</span>
            </div>
          </div>

          {/* Map Overlay Controls: Right Stack (Navigation Utilities) */}
          <div className="absolute right-2.5 top-11 z-10 flex flex-col gap-1.5">
            {/* North Compass Indicator */}
            <button
              type="button"
              onClick={() => showToast('Orienting compass to True North')}
              aria-label="North Heading"
              className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 text-on-surface flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px] text-error">explore</span>
            </button>

            {/* Audio Voice Guidance Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label="Mute Voice Directions"
              className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 text-on-surface flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            {/* Map Layer Switcher */}
            <button
              type="button"
              onClick={() => showToast('Traffic satellite layer toggled')}
              aria-label="Toggle Layers"
              className="w-9 h-9 rounded-xl bg-surface-container-lowest/95 text-on-surface flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">layers</span>
            </button>

            {/* Recenter Vehicle GPS Floating Button */}
            <button
              type="button"
              onClick={recenterGps}
              aria-label="Recenter Vehicle"
              className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform mt-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary-container">my_location</span>
            </button>
          </div>
        </div>

        {/* BOTTOM DOCKED TRIP & TELEMETRY INFORMATION CARD */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-md border border-outline-variant/20 space-y-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                Target Consignee Destination
              </span>
              <h2 className="text-sm font-bold text-on-surface truncate mt-0.5">
                Standard Bank Plc – Treasury
              </h2>
              <p className="text-xs text-on-surface-variant truncate">
                Kingsway Tower, 4th Floor, Marina Hub
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-headline-xl text-primary font-extrabold block">11 min</span>
              <span className="font-code-sm text-[10px] text-on-surface-variant block">2.1 km • 14:49 WAT</span>
            </div>
          </div>

          {/* Quick Courier Utilities */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
            <a
              href="tel:+2348021183390"
              className="py-2 px-2 bg-surface-container hover:bg-surface-container-high rounded-lg flex items-center justify-center gap-1 font-semibold text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">call</span>
              Call Client
            </a>
            <button
              type="button"
              onClick={() => showToast('Alternative corridor calculated via Marina Bypass (+1 min)')}
              className="py-2 px-2 bg-surface-container hover:bg-surface-container-high rounded-lg flex items-center justify-center gap-1 font-semibold text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">alt_route</span>
              Alt Route
            </button>
            <button
              type="button"
              onClick={() => showToast('SOS Dispatch beacon pinged to Sarah Jenkins (Ops Director)')}
              className="py-2 px-2 bg-error-container text-on-error-container rounded-lg flex items-center justify-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">emergency</span>
              SOS Ping
            </button>
          </div>

          {/* Primary Action Button: Arrived at Stop -> Go to POD */}
          <button
            type="button"
            onClick={() => onNavigate?.('proof-of-delivery')}
            className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary-container text-on-secondary font-headline-sm text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer mt-1"
          >
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
            Arrived at Stop • Open Proof of Delivery
          </button>
        </div>
      </main>
    </div>
  );
};
