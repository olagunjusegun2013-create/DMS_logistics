import React from 'react';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { ScreenData } from '../types';
import { DeviceFrame } from './DeviceFrame';

interface ScreenArtboardProps {
  screen: ScreenData;
  children: React.ReactNode;
  onSelect: (screenId: string) => void;
  scale?: number;
}

export function ScreenArtboard({
  screen,
  children,
  onSelect,
  scale = 0.85,
}: ScreenArtboardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Artboard Top Label */}
      <div className="w-[380px] mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
          <h3 className="text-sm font-bold text-white tracking-wide">{screen.title}</h3>
          {screen.badge && (
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[10px] font-semibold uppercase tracking-wider">
              {screen.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-indigo-400" />
            {screen.hotlinkedImages.length}
          </span>
          <button
            onClick={() => onSelect(screen.id)}
            title="Focus Screen in Device View"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Frame with Scale Transform */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `-${(1 - scale) * 780}px`,
        }}
        className="transition-transform duration-200"
      >
        <DeviceFrame deviceType="mobile">
          {children}
        </DeviceFrame>
      </div>
    </div>
  );
}
