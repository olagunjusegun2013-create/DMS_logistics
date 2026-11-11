import { Code2, ExternalLink } from 'lucide-react';

interface CustomHtmlScreenProps {
  htmlSnippet: string;
  onOpenEditor?: () => void;
}

export function CustomHtmlScreen({ htmlSnippet, onOpenEditor }: CustomHtmlScreenProps) {
  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans overflow-y-auto select-none relative">
      {/* Quick Edit Overlay Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-slate-300">Live HTML Screen</span>
        </div>
        {onOpenEditor && (
          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg shadow transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Edit / Paste HTML</span>
          </button>
        )}
      </div>

      {/* Rendered HTML Container */}
      <div
        className="flex-1 w-full"
        dangerouslySetInnerHTML={{ __html: htmlSnippet }}
      />

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 bg-black/40 text-center">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <span>Hotlinked images rendered directly from HTML markup</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </p>
      </div>
    </div>
  );
}
