import { useState } from 'react';
import { Search, Bell, Heart, Star, MapPin, Compass, Bookmark, User, SlidersHorizontal } from 'lucide-react';

interface DiscoverScreenProps {
  onNavigateToDetail?: () => void;
}

export function DiscoverScreen({ onNavigateToDetail }: DiscoverScreenProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [liked, setLiked] = useState<Record<string, boolean>>({ hero: false, card1: true, card2: false });
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Cabins', 'Beachfront', 'Villas', 'Arctic', 'Treehouses'];

  const toggleLike = (key: string) => {
    setLiked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans select-none overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between sticky top-0 bg-slate-950/90 backdrop-blur-md z-10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Location</span>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <MapPin className="w-4 h-4 text-rose-500" />
            <h1 className="text-base font-bold text-white">Amalfi Coast, Italy</h1>
          </div>
        </div>
        <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Bell className="w-4 h-4 text-slate-300" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-5 mt-2">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stays, experiences, villas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
          />
          <SlidersHorizontal className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto px-5 py-3.5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hero Featured Card with Hotlinked Image */}
      <div className="px-5 mt-1">
        <div
          onClick={onNavigateToDetail}
          className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
            alt="Mediterranean Cliffside Villa"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/20" />

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider shadow">
              Superhost ✦
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike('hero');
              }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95 transition"
            >
              <Heart
                className={`w-4 h-4 transition ${
                  liked.hero ? 'fill-rose-500 text-rose-500' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Bottom Card Details */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>4.98</span>
              <span className="text-slate-300 font-normal">(348 reviews)</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Villa Bellagio Paradiso</h3>
            <p className="text-xs text-slate-300 mt-0.5">Positano • Panoramic Tyrrhenian Sea View</p>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-extrabold text-white">$620</span>
                <span className="text-xs text-slate-400 font-normal"> / night</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-600 text-white shadow-md">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-5 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-white">Popular Destinations</h3>
            <p className="text-xs text-slate-400">Hand-picked by local travel curators</p>
          </div>
          <button className="text-xs text-indigo-400 font-semibold hover:underline">See all</button>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1 */}
          <div
            onClick={onNavigateToDetail}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition group"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
                alt="Lake Como Boat Haven"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike('card1');
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    liked.card1 ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 text-[11px] text-amber-300">
                <Star className="w-3 h-3 fill-amber-300" />
                <span>4.92</span>
              </div>
              <h4 className="text-xs font-bold text-white mt-1 truncate">Alpine Glass Chalet</h4>
              <p className="text-[11px] text-slate-400 truncate">Zermatt, Swiss Alps</p>
              <p className="text-xs font-bold text-indigo-400 mt-2">$390 <span className="text-[10px] text-slate-400 font-normal">/ night</span></p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={onNavigateToDetail}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-white/20 transition group"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
                alt="Parisian Rooftop Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike('card2');
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    liked.card2 ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-1 text-[11px] text-amber-300">
                <Star className="w-3 h-3 fill-amber-300" />
                <span>4.97</span>
              </div>
              <h4 className="text-xs font-bold text-white mt-1 truncate">Haussmann Penthouse</h4>
              <p className="text-[11px] text-slate-400 truncate">Le Marais, Paris</p>
              <p className="text-xs font-bold text-indigo-400 mt-2">$510 <span className="text-[10px] text-slate-400 font-normal">/ night</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mock Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-6 flex items-center justify-around z-20">
        <button className="flex flex-col items-center text-indigo-400 gap-1">
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Explore</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white gap-1 transition">
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Saved</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white gap-1 transition">
          <Bookmark className="w-5 h-5" />
          <span className="text-[10px] font-medium">Trips</span>
        </button>
        <button className="flex flex-col items-center text-slate-400 hover:text-white gap-1 transition">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}
