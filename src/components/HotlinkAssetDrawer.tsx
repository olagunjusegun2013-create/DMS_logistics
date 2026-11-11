import { useState } from 'react';
import { X, Copy, ExternalLink, Check, Image as ImageIcon, Link2 } from 'lucide-react';
import { HotlinkedAsset } from '../types';

interface HotlinkAssetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  assets: HotlinkedAsset[];
}

export function HotlinkAssetDrawer({ isOpen, onClose, assets }: HotlinkAssetDrawerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredAssets = assets.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.screenTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Hotlinked Assets</h2>
              <p className="text-xs text-slate-400">
                {assets.length} image assets linked across active screens
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/50">
          <input
            type="text"
            placeholder="Search assets by screen, name, or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* List of Hotlinked Assets */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition flex gap-3 group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative border border-white/10">
                <img
                  src={asset.url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                      {asset.screenTitle}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Loaded
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{asset.title}</h4>
                  <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">{asset.url}</p>
                </div>

                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => copyUrl(asset.id, asset.url)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white transition"
                  >
                    {copiedId === asset.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition ml-auto"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Open</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredAssets.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No assets match your query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
