import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';

export function SocialScreen() {
  const [likes, setLikes] = useState<Record<number, number>>({ 0: 482, 1: 1240 });
  const [liked, setLiked] = useState<Record<number, boolean>>({ 0: false, 1: true });
  const [following, setFollowing] = useState<Record<number, boolean>>({ 0: true, 1: false });

  const posts = [
    {
      author: 'Julian Moreau',
      handle: '@julian.explores',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80',
      location: 'Dolomites, Italy',
      time: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
      caption: 'Sunrise hitting the peaks of Tre Cime di Lavaredo. No filters needed when the light is this pure ✨',
      tags: ['#dolomites', '#hiking', '#italy'],
      commentsCount: 38,
    },
    {
      author: 'Sophie Chen',
      handle: '@sophiechen',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
      location: 'Kyoto, Japan',
      time: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      caption: 'The endless road through the ancient cedar forests. Found a serene tea garden right off the path.',
      tags: ['#wanderlust', '#travelgram', '#peaceful'],
      commentsCount: 94,
    },
  ];

  const togglePostLike = (index: number) => {
    setLiked((prev) => {
      const isCurrentlyLiked = prev[index];
      setLikes((l) => ({ ...l, [index]: l[index] + (isCurrentlyLiked ? -1 : 1) }));
      return { ...prev, [index]: !isCurrentlyLiked };
    });
  };

  const toggleFollow = (index: number) => {
    setFollowing((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white font-sans overflow-y-auto pb-16 select-none">
      {/* Top Bar */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-white/10 sticky top-0 bg-slate-950/90 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-extrabold tracking-tight">Community Moments</h2>
        </div>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-full font-semibold">
          Live
        </span>
      </div>

      {/* Posts Stream */}
      <div className="divide-y divide-white/10">
        {posts.map((post, idx) => (
          <div key={idx} className="py-4">
            {/* Author Header */}
            <div className="px-5 flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{post.author}</span>
                    <button
                      onClick={() => toggleFollow(idx)}
                      className={`text-[11px] font-semibold transition ${
                        following[idx] ? 'text-slate-400' : 'text-indigo-400 hover:text-indigo-300'
                      }`}
                    >
                      • {following[idx] ? 'Following' : 'Follow'}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {post.location} • {post.time}
                  </p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Post Hotlinked Image */}
            <div className="relative overflow-hidden aspect-[4/3] bg-slate-900">
              <img
                src={post.image}
                alt="Post media"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Post Actions */}
            <div className="px-5 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => togglePostLike(idx)}
                    className="flex items-center gap-1.5 text-xs transition group"
                  >
                    <Heart
                      className={`w-5 h-5 transition group-hover:scale-110 ${
                        liked[idx] ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                      }`}
                    />
                    <span className="font-semibold text-slate-200">{likes[idx]}</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-semibold">{post.commentsCount}</span>
                  </button>

                  <button className="text-slate-300 hover:text-white transition">
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <button className="text-slate-300 hover:text-white transition">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-200 mt-2.5 leading-relaxed">
                <span className="font-bold text-white mr-1.5">{post.author}</span>
                {post.caption}
              </p>

              {/* Tags */}
              <div className="flex gap-1.5 mt-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-indigo-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
