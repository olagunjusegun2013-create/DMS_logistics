import { ScreenData, HotlinkedAsset } from '../types';

export const SAMPLE_HTML_DEFAULT = `<div class="p-6 bg-gradient-to-b from-indigo-900 via-slate-900 to-black text-white min-h-full font-sans">
  <!-- Top Navigation -->
  <div class="flex items-center justify-between pb-5 border-b border-white/10">
    <div class="flex items-center gap-3">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" alt="Avatar" class="w-11 h-11 rounded-full ring-2 ring-indigo-400 object-cover" />
      <div>
        <p class="text-xs text-indigo-300 font-medium tracking-wide uppercase">Welcome back</p>
        <h2 class="text-lg font-bold text-white">Elena Rostova</h2>
      </div>
    </div>
    <span class="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold">PRO</span>
  </div>

  <!-- Hero Feature Card with Hotlinked Image -->
  <div class="mt-6 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Alpine Sanctuary" class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
      <div class="flex items-center gap-2 mb-1.5">
        <span class="px-2 py-0.5 bg-amber-400/90 text-slate-950 font-bold text-[10px] rounded uppercase tracking-wider">Featured</span>
        <span class="text-xs text-white/80">★ 4.98 (1,420 reviews)</span>
      </div>
      <h3 class="text-xl font-extrabold text-white leading-snug">Alpine Horizon Retreat</h3>
      <p class="text-xs text-slate-300 mt-1 line-clamp-2">Exclusive mountain sanctuary nestled above the mist in Zermatt, Switzerland.</p>
      <div class="mt-3 flex items-center justify-between">
        <div>
          <span class="text-xs text-slate-400">Starting from</span>
          <p class="text-lg font-bold text-white">$450 <span class="text-xs font-normal text-slate-400">/ night</span></p>
        </div>
        <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg transition">Explore</button>
      </div>
    </div>
  </div>

  <!-- Quick Grid -->
  <div class="mt-6">
    <div class="flex items-center justify-between mb-3">
      <h4 class="text-sm font-semibold text-white">Curated Collections</h4>
      <a href="#" class="text-xs text-indigo-400 hover:underline">View all</a>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition">
        <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80" class="w-full h-24 object-cover rounded-lg mb-2" alt="Nordic Cabins" />
        <h5 class="text-xs font-bold text-white">Nordic Cabins</h5>
        <p class="text-[10px] text-slate-400">24 Stays</p>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80" class="w-full h-24 object-cover rounded-lg mb-2" alt="Seaside Villas" />
        <h5 class="text-xs font-bold text-white">Seaside Villas</h5>
        <p class="text-[10px] text-slate-400">18 Stays</p>
      </div>
    </div>
  </div>
</div>`;

export const SCREENS: ScreenData[] = [
  {
    id: 'screen-discover',
    title: 'Explore & Discover',
    subtitle: 'Curated experiences & trending destinations',
    category: 'Discovery',
    deviceType: 'mobile',
    badge: 'Popular',
    hotlinkedImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'screen-detail',
    title: 'Experience Detail',
    subtitle: 'High-res gallery, booking spec & reviews',
    category: 'Product Flow',
    deviceType: 'mobile',
    badge: 'Hero Flow',
    hotlinkedImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'screen-feed',
    title: 'Community Feed',
    subtitle: 'Photographer moments, interactions & tags',
    category: 'Social',
    deviceType: 'mobile',
    badge: 'Social',
    hotlinkedImages: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'screen-profile',
    title: 'Creator Profile',
    subtitle: 'Stats, collection albums & badges',
    category: 'Account',
    deviceType: 'mobile',
    badge: 'Profile',
    hotlinkedImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    ],
  },
  {
    id: 'screen-html-sandbox',
    title: 'Custom HTML Screen',
    subtitle: 'Directly parsed HTML with hotlinked images',
    category: 'Custom HTML',
    deviceType: 'mobile',
    badge: 'Live HTML',
    htmlSnippet: SAMPLE_HTML_DEFAULT,
    hotlinkedImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

export function extractImagesFromHtml(html: string): string[] {
  const urls: string[] = [];
  // Match standard img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1] && !urls.includes(match[1])) {
      urls.push(match[1]);
    }
  }
  // Match css url(...)
  const bgRegex = /url\(["']?([^"')]+)["']?\)/gi;
  while ((match = bgRegex.exec(html)) !== null) {
    if (match[1] && !urls.includes(match[1]) && !match[1].startsWith('data:')) {
      urls.push(match[1]);
    }
  }
  return urls;
}

export function getAllHotlinkedAssets(screens: ScreenData[]): HotlinkedAsset[] {
  const assets: HotlinkedAsset[] = [];
  screens.forEach((screen) => {
    screen.hotlinkedImages.forEach((url, idx) => {
      assets.push({
        id: `${screen.id}-asset-${idx}`,
        url,
        title: `${screen.title} asset #${idx + 1}`,
        screenId: screen.id,
        screenTitle: screen.title,
      });
    });
  });
  return assets;
}
