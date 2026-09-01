import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/companyData';
import { BlogPost } from '../../types';
import { FileText, Clock, X, Calendar, User, Search } from 'lucide-react';

interface BlogPageProps {
  onOpenContact: (scope?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenContact }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'POS & Software', 'Web Engineering', 'Mobile Apps'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 sm:pt-20 pb-8 sm:pb-10 mesh-bg relative overflow-hidden w-full transition-colors duration-300">
      <div className="absolute abstract-shape-blue w-[500px] h-[500px] top-1/4 -left-20 animate-pulse-glow pointer-events-none" />
      <div className="absolute abstract-shape-pink w-[450px] h-[450px] bottom-1/4 -right-20 animate-pulse-glow pointer-events-none" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-4 sm:space-y-5">
        {/* Header */}
        <div className="max-w-3xl space-y-1 sm:space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
            <FileText className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            <span>Tech Insights & Software Tips</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Global InfoSoft Tech Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Practical software guides on retail GST billing, barcode scanners, optical management, website optimization, and database security.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-2 sm:p-2.5 rounded-xl glass-panel border border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white glass-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 rounded-lg glass-card text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-left">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-xl glass-panel border border-slate-200/80 dark:border-white/15 project-card-gradient transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between shadow-sm"
            >
              <div className="relative h-36 sm:h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-3 sm:p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-0.5">
                      <Calendar className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full glass-card flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10">
                      <User className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[10.5px] text-slate-700 dark:text-slate-300 font-medium">{post.author}</span>
                  </div>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Article Reader Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl glass-panel border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 shadow-2xl max-h-[88vh] overflow-y-auto p-4 sm:p-6 space-y-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-300 font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedPost.author}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">{selectedPost.authorRole} • {selectedPost.date}</div>
                  </div>
                </div>
              </div>

              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const title = selectedPost.title;
                    setSelectedPost(null);
                    onOpenContact(`Consultation regarding article: ${title}`);
                  }}
                  className="px-4 py-2 rounded-lg btn-primary text-white text-xs font-bold uppercase tracking-wider"
                >
                  Contact Global InfoSoft Team
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
