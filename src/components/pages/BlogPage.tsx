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
    <div className="pt-28 pb-20 mesh-bg min-h-screen relative overflow-hidden w-full transition-colors duration-300">
      <div className="abstract-shape-blue w-[500px] h-[500px] top-1/4 -left-20 animate-pulse-glow" />
      <div className="abstract-shape-pink w-[450px] h-[450px] bottom-1/4 -right-20 animate-pulse-glow" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
            <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Tech Insights & Software Tips</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Global InfoSoft Tech Blog
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Practical software guides on retail GST billing, barcode scanners, optical management, website optimization, and database security.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white glass-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-card text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 project-card-gradient transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Outfit'] leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full glass-card flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">{post.author}</span>
                  </div>
                  <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-3xl glass-panel border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-300 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/10">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{selectedPost.author}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{selectedPost.authorRole} • {selectedPost.date}</div>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose max-w-none text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
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
                  className="px-5 py-2.5 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider"
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
