import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { DeviceType } from '../types';

interface DeviceFrameProps {
  deviceType?: DeviceType;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function DeviceFrame({
  deviceType = 'mobile',
  children,
  className = '',
}: DeviceFrameProps) {
  if (deviceType === 'tablet') {
    return (
      <div className={`relative mx-auto bg-slate-950 rounded-[36px] p-3 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800 w-[600px] h-[820px] flex flex-col ${className}`}>
        {/* Screen inside */}
        <div className="relative w-full h-full bg-slate-950 rounded-[28px] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  if (deviceType === 'desktop') {
    return (
      <div className={`relative mx-auto bg-slate-900 rounded-2xl shadow-2xl ring-1 ring-white/20 border border-slate-800 w-[960px] h-[640px] flex flex-col overflow-hidden ${className}`}>
        {/* Desktop window header */}
        <div className="h-8 bg-slate-900 px-4 flex items-center gap-2 border-b border-white/10 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="mx-auto text-[11px] font-mono text-slate-400 bg-black/30 px-6 py-0.5 rounded-md">
            ScreenCraft Preview Canvas
          </div>
        </div>
        <div className="relative flex-1 bg-slate-950 overflow-hidden">
          {children}
        </div>
      </div>
    );
  }

  // Default: Mobile (iPhone 16 Pro Style)
  return (
    <div
      className={`relative mx-auto bg-black rounded-[52px] p-3 shadow-2xl ring-1 ring-white/15 border-4 border-slate-800/90 w-[380px] h-[780px] flex flex-col select-none ${className}`}
      style={{
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
      }}
    >
      {/* Side buttons accents */}
      <div className="absolute -left-[6px] top-28 w-[3px] h-8 bg-slate-700 rounded-l" />
      <div className="absolute -left-[6px] top-40 w-[3px] h-12 bg-slate-700 rounded-l" />
      <div className="absolute -left-[6px] top-56 w-[3px] h-12 bg-slate-700 rounded-l" />
      <div className="absolute -right-[6px] top-36 w-[3px] h-16 bg-slate-700 rounded-r" />

      {/* Screen container */}
      <div className="relative w-full h-full bg-slate-950 rounded-[42px] overflow-hidden flex flex-col ring-1 ring-black">
        {/* iOS Status Bar */}
        <div className="h-11 px-7 pt-3 flex items-center justify-between text-white shrink-0 z-40 bg-slate-950 select-none">
          <span className="text-xs font-semibold tracking-tight">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end px-2 ring-1 ring-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Inner App Screen Viewport */}
        <div className="relative flex-1 overflow-hidden flex flex-col">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-0 right-0 h-4 flex items-center justify-center pointer-events-none z-50">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
