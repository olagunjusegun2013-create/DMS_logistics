import { useState } from 'react';
import { Settings, Grid, Bookmark, Award, MapPin, Globe } from 'lucide-react';

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'badges'>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const galleryImages = [
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans overflow-y-auto pb-16 select-none">
      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 sticky top-0 bg-slate-950/90 backdrop-blur-md z-10">
        <h2 className="text-base font-extrabold tracking-tight">elena.rostova</h2>
        <button className="text-slate-400 hover:text-white transition">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80"
              alt="Elena Rostova"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500 shadow-xl"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[10px] text-white">
              ✓
            </span>
          </div>

          <div className="flex-1 flex justify-around text-center">
            <div>
              <p className="text-base font-black text-white">142</p>
              <p className="text-[11px] text-slate-400">Places</p>
            </div>
            <div>
              <p className="text-base font-black text-white">18.4k</p>
              <p className="text-[11px] text-slate-400">Followers</p>
            </div>
            <div>
              <p className="text-base font-black text-white">492</p>
              <p className="text-[11px] text-slate-400">Following</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-white">Elena Rostova</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Architectural Photographer & Spatial Designer 🌿 Documenting remote alpine dwellings, cliffside retreats & sustainable architecture.
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-indigo-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Milan & Zurich</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="hover:underline cursor-pointer">elenarostova.design</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-5">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition shadow ${
              isFollowing
                ? 'bg-white/10 text-white border border-white/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="flex-1 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/10 transition">
            Message
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-t border-b border-white/10 mt-2">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 text-xs font-semibold transition ${
            activeTab === 'posts' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Gallery</span>
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 text-xs font-semibold transition ${
            activeTab === 'saved' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 text-xs font-semibold transition ${
            activeTab === 'badges' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Awards</span>
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {galleryImages.map((img, i) => (
          <div key={i} className="aspect-square overflow-hidden bg-slate-900 group cursor-pointer relative">
            <img
              src={img}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold">
              View
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
