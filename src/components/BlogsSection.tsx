import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/companyData';
import { BlogPost, PageId } from '../types';
import { useCms } from '../context/CmsContext';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import {
  FileText,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Share2,
  Check,
  Copy,
  Sparkles,
  BookOpen,
  ChevronRight,
  Search,
  MessageSquare,
  ShieldCheck,
  X
} from 'lucide-react';

interface BlogsSectionProps {
  onNavigatePage: (page: PageId) => void;
  onOpenContact: (scope?: string) => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({
  onNavigatePage,
  onOpenContact
}) => {
  const { blogs } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const allPosts: BlogPost[] = (blogs && blogs.length > 0)
    ? blogs.map(b => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        authorRole: b.authorRole || 'Technical Lead',
        authorAvatar: b.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        date: b.date || b.publishDate || 'Recent',
        readTime: b.readTime || '5 min read',
        category: b.category,
        image: b.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        tags: b.tags || [],
        featured: b.featured
      }))
    : BLOG_POSTS;

  const categories = [
    'All',
    'Retail Software & POS',
    'GST & Compliance',
    'Healthcare & Optical',
    'Education ERP'
  ];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0] || allPosts[0];
  const gridPosts = filteredPosts.slice(1);

  const handleCopyShareLink = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#blog-${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(post.id);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <section
      id="blogs"
      className="py-8 sm:py-10 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-[#080d1a]/50 relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 space-y-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left border-b border-slate-200/80 dark:border-slate-800/80 pb-4"
        >
          <div className="max-w-3xl space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold font-mono border-cyan-500/30">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Engineering Knowledge Base</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-emerald-600 dark:text-emerald-400">Practical Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Sora']">
              Industry Insights &amp; Software Guides
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              In-depth articles by our senior software engineers in Jamshedpur covering high-speed POS billing, automated GST compliance, optical store lab workflows, and database security.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigatePage('blog')}
              className="px-4 py-2 rounded-xl btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm cursor-pointer active:scale-95 group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* Category Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 p-2 sm:p-2.5 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 text-left"
        >
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'btn-primary text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white glass-card'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides & tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500/60"
            />
          </div>
        </motion.div>

        {/* Featured Article Card + Grid Layout */}
        <div className="space-y-4">
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setReadingPost(featuredPost)}
              className="group cursor-pointer rounded-2xl glass-panel border border-slate-200/90 dark:border-white/10 overflow-hidden hover:border-cyan-500/60 transition-all duration-300 shadow-sm grid grid-cols-1 lg:grid-cols-12 text-left"
            >
              {/* Image side */}
              <div className="lg:col-span-5 relative h-52 lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/60" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                    Featured Guide
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-7 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Sora'] leading-snug">
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10.5px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.author}
                      className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {featuredPost.author}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {featuredPost.authorRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleCopyShareLink(featuredPost, e)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      title="Share link"
                    >
                      {copiedSlug === featuredPost.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Posts 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {gridPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => setReadingPost(post)}
                className="group cursor-pointer rounded-2xl glass-panel border border-slate-200/90 dark:border-white/10 overflow-hidden hover:border-cyan-500/60 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold uppercase tracking-wider bg-slate-900/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
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

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors font-['Sora'] leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-5 h-5 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {post.author}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>Read</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Guidance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white font-['Sora']">
                Have a specific software architecture or GST compliance query?
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Our senior software developers in Jamshedpur provide tailored consultations for retail, healthcare, and educational institutions.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenContact('Software Architecture & Consultation')}
            className="px-4 py-2 rounded-xl glass-card text-xs font-bold text-slate-900 dark:text-white hover:border-cyan-500/50 transition-all shrink-0 cursor-pointer active:scale-95"
          >
            Request Free Technical Consultation
          </button>
        </motion.div>
      </div>

      {/* Full Article Reader Modal */}
      {readingPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setReadingPost(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl glass-panel border border-slate-200 dark:border-white/20 bg-white dark:bg-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 space-y-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs text-cyan-700 dark:text-cyan-300 font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30">
                  {readingPost.category}
                </span>
                <span>•</span>
                <span>{readingPost.readTime}</span>
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Author Info */}
            <div className="space-y-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Sora'] leading-tight">
                {readingPost.title}
              </h2>

              <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2.5">
                  <img
                    src={readingPost.authorAvatar}
                    alt={readingPost.author}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {readingPost.author}
                    </span>
                    <span className="mx-1">•</span>
                    <span>{readingPost.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{readingPost.date}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden">
              <img
                src={readingPost.image}
                alt={readingPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>

            {/* Article Content */}
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
              {readingPost.content}
            </div>

            {/* Article Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-white/10">
              {readingPost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Call to action inside modal */}
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white font-['Sora']">
                  Looking to implement this software solution in your business?
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Global InfoSoft provides turnkey setup, data migration, and local support across East India.
                </div>
              </div>
              <button
                onClick={() => {
                  const title = readingPost.title;
                  setReadingPost(null);
                  onOpenContact(`Consultation regarding article: ${title}`);
                }}
                className="py-2 px-4 rounded-xl btn-primary text-white text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer active:scale-95"
              >
                Discuss With An Engineer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
