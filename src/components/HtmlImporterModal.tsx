import { useState, useId } from 'react';
import { X, Code2, Image as ImageIcon, Sparkles, Check, Copy } from 'lucide-react';
import { extractImagesFromHtml } from '../data/sampleScreens';

interface HtmlImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHtml: string;
  onSaveHtml: (newHtml: string) => void;
}

const PRESET_TEMPLATES = [
  {
    name: 'Luxury Travel Stay',
    html: `<div class="p-5 bg-slate-950 text-white font-sans min-h-full">
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-lg font-bold">Amalfi Coast Penthouse</h3>
    <span class="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full font-semibold border border-indigo-500/30">★ 4.98</span>
  </div>
  <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" alt="Amalfi View" class="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg border border-white/10" />
  <p class="text-xs text-slate-300 leading-relaxed mb-4">Wake up to panoramic Tyrrhenian waters and cliffside morning espresso on your private travertine terrace.</p>
  <div class="grid grid-cols-2 gap-2 mb-4">
    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" class="w-full h-24 object-cover rounded-xl" alt="Interior" />
    <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80" class="w-full h-24 object-cover rounded-xl" alt="Terrace" />
  </div>
  <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition">Reserve Instant Booking ($580/nt)</button>
</div>`,
  },
  {
    name: 'Modern FinTech Card',
    html: `<div class="p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white font-sans min-h-full flex flex-col justify-between">
  <div>
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xs">V</div>
        <span class="text-sm font-bold tracking-wider">VANGUARD</span>
      </div>
      <span class="text-xs text-slate-400">Black Obsidian</span>
    </div>
    <div class="relative p-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-2xl border border-white/20 mb-6 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" alt="Texture" />
      <p class="text-xs text-white/70 font-mono tracking-widest">CURRENT BALANCE</p>
      <h2 class="text-3xl font-extrabold text-white mt-1">$48,290.40</h2>
      <div class="mt-6 flex justify-between items-end">
        <span class="text-xs font-mono tracking-widest">•••• 8924</span>
        <span class="text-xs font-bold text-amber-300 uppercase">Platinum</span>
      </div>
    </div>
    <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recent Transactions</h4>
    <div class="space-y-2">
      <div class="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80" class="w-9 h-9 rounded-full object-cover" alt="Merchant" />
          <div><p class="text-xs font-bold">Apple Store Fifth Ave</p><p class="text-[10px] text-slate-400">Electronics • Today</p></div>
        </div>
        <span class="text-xs font-bold text-rose-400">-$1,299.00</span>
      </div>
    </div>
  </div>
</div>`,
  },
  {
    name: 'Art & Design Gallery',
    html: `<div class="p-6 bg-neutral-950 text-neutral-100 font-sans min-h-full">
  <div class="flex justify-between items-center mb-6 border-b border-neutral-800 pb-4">
    <h2 class="text-xl font-light tracking-widest uppercase">Atelier 04</h2>
    <span class="text-[10px] tracking-widest text-neutral-400 uppercase">Autumn 2026</span>
  </div>
  <div class="relative mb-6 group cursor-pointer overflow-hidden rounded-xl border border-neutral-800">
    <img src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80" class="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700" alt="Sculpture" />
    <div class="p-4 bg-neutral-900/90 border-t border-neutral-800">
      <h3 class="text-sm font-semibold">Resonance of Monoliths</h3>
      <p class="text-xs text-neutral-400 mt-0.5">Klara Lindqvist • Bronze & Terracotta</p>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-3">
    <div class="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
      <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80" class="w-full h-28 object-cover" alt="Pigment Study" />
      <p class="p-2.5 text-[11px] text-neutral-300 font-medium">Pigment Study #14</p>
    </div>
    <div class="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
      <img src="https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=400&q=80" class="w-full h-28 object-cover" alt="Abstract Forms" />
      <p class="p-2.5 text-[11px] text-neutral-300 font-medium">Kinetic Glass Flow</p>
    </div>
  </div>
</div>`,
  },
];

export function HtmlImporterModal({
  isOpen,
  onClose,
  currentHtml,
  onSaveHtml,
}: HtmlImporterModalProps) {
  const [htmlCode, setHtmlCode] = useState(currentHtml);
  const [copied, setCopied] = useState(false);
  const rawHtmlTextareaId = useId();

  if (!isOpen) return null;

  const detectedImages = extractImagesFromHtml(htmlCode);

  const handleApply = () => {
    onSaveHtml(htmlCode);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">HTML & Screen Importer</h2>
              <p className="text-xs text-slate-400">
                Paste any HTML snippet with hotlinked images or select a template to preview live.
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

        {/* Quick Presets */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Sample Templates:
          </span>
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setHtmlCode(preset.html)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-slate-700 text-slate-200 transition shrink-0"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto">
          {/* Left: Code Editor */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={rawHtmlTextareaId} className="text-xs font-semibold text-slate-300">
                Raw HTML / Tailwind Markup
              </label>
              <button
                onClick={handleCopy}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <textarea
              id={rawHtmlTextareaId}
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="<div class='...'> <img src='https://...' /> ... </div>"
              className="w-full flex-1 min-h-[300px] p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none leading-relaxed"
            />
            {/* Detected Images Tracker */}
            <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                  Hotlinked Images Detected:
                </span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                  {detectedImages.length}
                </span>
              </div>
              {detectedImages.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto py-1">
                  {detectedImages.map((url, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 relative group bg-black"
                    >
                      <img src={url} alt={`Detected ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 italic">No image tags found yet. Add &lt;img src=&quot;...&quot;&gt;</p>
              )}
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-300 mb-2">Live Real-Time Preview</span>
            <div className="flex-1 min-h-[300px] rounded-2xl bg-black border border-slate-800 overflow-hidden shadow-inner flex flex-col">
              <div className="h-6 bg-slate-900 border-b border-slate-800 px-3 flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="text-[10px] text-slate-400 font-mono ml-2">Screen Preview</span>
              </div>
              <div
                className="flex-1 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: htmlCode }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Click <strong>Apply to Screen</strong> to replace the Custom Screen with your HTML.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Apply to Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
