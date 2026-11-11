import { useState } from 'react';
import { ChevronLeft, Share2, Heart, Star, ShieldCheck, Wifi, Sparkles, Coffee, Calendar, CheckCircle2 } from 'lucide-react';

interface DetailScreenProps {
  onBack?: () => void;
}

export function DetailScreen({ onBack }: DetailScreenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [booked, setBooked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const photos = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans overflow-y-auto pb-24 select-none relative">
      {/* Top Floating Actions */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/70 transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/70 transition">
            <Share2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-black/70 transition"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
          </button>
        </div>
      </div>

      {/* Main Hero Gallery */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-900">
        <img
          src={photos[selectedPhoto]}
          alt="Main Gallery"
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/90">
          {selectedPhoto + 1} / {photos.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto bg-slate-900/60 border-b border-white/10">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedPhoto(i)}
            className={`w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
              selectedPhoto === i ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={src} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-5 pt-4">
        {/* Title & Badge */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>4.98</span>
              <span className="text-slate-400 font-normal">• 128 Reviews • Positano, Italy</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">Villa Bellagio Paradiso</h1>
            <p className="text-xs text-slate-400 mt-1">Entire luxury cliffside residence hosted by Marco & Lucia</p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <Sparkles className="w-5 h-5 mx-auto text-indigo-400 mb-1" />
            <p className="text-xs font-bold text-white">Infinity Pool</p>
            <p className="text-[10px] text-slate-400">Heated sea view</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <Wifi className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
            <p className="text-xs font-bold text-white">500 Mbps</p>
            <p className="text-[10px] text-slate-400">Fast Starlink</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <Coffee className="w-5 h-5 mx-auto text-amber-400 mb-1" />
            <p className="text-xs font-bold text-white">Private Chef</p>
            <p className="text-[10px] text-slate-400">Breakfast included</p>
          </div>
        </div>

        {/* Host Card */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Host Avatar"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/50"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-white">Lucia Romani</h4>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400">Superhost • 7 years hosting</p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition">
            Contact
          </button>
        </div>

        {/* Description */}
        <div className="mt-5">
          <h3 className="text-sm font-bold text-white mb-2">About this space</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Perched directly on the dramatic cliffs of Positano, this villa features three private terraces, unobstructed panoramic ocean vistas, private funicular access to the water, and handcrafted Italian ceramics throughout.
          </p>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-between z-30">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-white">$620</span>
            <span className="text-xs text-slate-400">/ night</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-indigo-400">
            <Calendar className="w-3 h-3" />
            <span>Oct 14 - 19 • 2 guests</span>
          </div>
        </div>

        <button
          onClick={() => setBooked(!booked)}
          className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2 transition ${
            booked
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {booked ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Reserved!
            </>
          ) : (
            'Reserve Stays'
          )}
        </button>
      </div>
    </div>
  );
}
