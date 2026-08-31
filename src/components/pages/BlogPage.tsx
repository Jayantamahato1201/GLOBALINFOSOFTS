import React, { useState } from 'react';
import { BLOG_POSTS } from '../../data/companyData';
import { BlogPost } from '../../types';
import { FileText, Sparkles, Clock, ArrowRight, X, Calendar, User, Search } from 'lucide-react';

interface BlogPageProps {
  onOpenContact: (scope?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenContact }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Enterprise Software', 'Web Engineering', 'Mobile Apps'];

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
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Engineering Insights & Architectural Blueprints</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Global InfoSofts Tech Blog
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Practical technical guides on enterprise ERP modernization, sub-second web architectures, mobile scaling, and tax automation.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white glass-card'
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
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-3xl glass-panel border border-white/15 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors font-['Outfit'] leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full glass-card flex items-center justify-center text-indigo-400 border border-white/10">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] text-slate-300 font-medium">{post.author}</span>
                  </div>
                  <span className="text-xs text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/20 bg-slate-900 shadow-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-xl glass-card text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-indigo-400 border border-white/10">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{selectedPost.author}</div>
                    <div className="text-[11px] text-slate-400">{selectedPost.authorRole} • {selectedPost.date}</div>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-slate-200 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {selectedPost.content}
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-mono text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const title = selectedPost.title;
                    setSelectedPost(null);
                    onOpenContact(`Consultation regarding technical blog: ${title}`);
                  }}
                  className="px-5 py-2.5 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider"
                >
                  Discuss Architecture With Author
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
