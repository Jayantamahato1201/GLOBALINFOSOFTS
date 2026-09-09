import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS, COMPANY_INFO } from '../../data/companyData';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';
import { BlogPostView } from './BlogPostView';
import {
  Clock,
  User,
  Search,
  BookOpen,
  ArrowRight,
  Share2,
  Check,
  ChevronRight,
  MessageSquare,
  Sparkles,
  PhoneCall,
  X,
  Tag,
  Filter
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';

interface BlogPageProps {
  initialSlug?: string | null;
  onNavigateArticle?: (slug: string | null) => void;
  onOpenContact: (scope?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  initialSlug,
  onNavigateArticle,
  onOpenContact
}) => {
  const { blogs } = useCms();
  const allPosts: BlogPost[] = (blogs && blogs.length > 0)
    ? blogs.map((b) => ({
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
        tags: b.tags || ['Technology']
      }))
    : BLOG_POSTS;

  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync with initialSlug or window hash on mount and changes
  useEffect(() => {
    if (initialSlug !== undefined && initialSlug !== null) {
      setActiveArticleSlug(initialSlug);
    } else {
      // Check window.location.hash or pathname for /blog/<slug>
      const rawHash = window.location.hash.replace('#', '').replace(/^\//, '');
      const pathname = window.location.pathname.replace(/^\//, '');
      const target = rawHash || pathname;
      if (target.startsWith('blog/') || target.startsWith('blog-')) {
        const extractedSlug = target.replace(/^blog[\/-]/, '');
        if (extractedSlug) {
          const match = allPosts.find((p) => p.slug === extractedSlug || p.id === extractedSlug);
          if (match) {
            setActiveArticleSlug(match.slug);
          }
        }
      }
    }
  }, [initialSlug, allPosts]);

  const categories = ['All', 'AI & Medicine', 'Sustainable IT', 'Quantum Computing'];

  const filteredPosts = allPosts.filter((post) => {
    let matchesCategory = true;
    if (selectedCategory === 'AI & Medicine') {
      matchesCategory = post.tags.includes('AI') || post.tags.includes('Healthcare');
    } else if (selectedCategory === 'Sustainable IT') {
      matchesCategory = post.tags.includes('Green Technology') || post.tags.includes('Sustainable IT');
    } else if (selectedCategory === 'Quantum Computing') {
      matchesCategory = post.tags.includes('Quantum Computing');
    }
    const matchesSearch =
      !searchQuery.trim() ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activePost = activeArticleSlug
    ? allPosts.find((p) => p.slug === activeArticleSlug || p.id === activeArticleSlug) || null
    : null;

  const handleOpenArticle = (post: BlogPost) => {
    setActiveArticleSlug(post.slug);
    if (onNavigateArticle) {
      onNavigateArticle(post.slug);
    } else {
      window.location.hash = `/blog/${post.slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setActiveArticleSlug(null);
    if (onNavigateArticle) {
      onNavigateArticle(null);
    } else {
      window.location.hash = 'blog';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCardLink = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://globalinfosofts.com/blog/${post.slug}/`;
    navigator.clipboard.writeText(url);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // If a specific article is active, render the dedicated WHOLE ARTICLE PAGE
  if (activePost) {
    return (
      <BlogPostView
        post={activePost}
        allPosts={BLOG_POSTS}
        onBack={handleBackToArticles}
        onSelectPost={(p) => handleOpenArticle(p)}
        onOpenContact={onOpenContact}
      />
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-white relative overflow-hidden w-full transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background ambient lighting */}
      <div className="absolute top-20 -left-32 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-7 sm:space-y-8">
        {/* Top Header Card Matching Reference UI Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] p-6 sm:p-8 lg:p-10 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors"
        >
          {/* Subtle glowing circle inside banner */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-5xl space-y-2.5">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span>Industry Insights &amp; Engineering</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400 tracking-tight leading-none drop-shadow-sm">
              OUR BLOG
            </h1>

            {/* Subtitle */}
            <h2 className="text-base sm:text-lg md:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
              Insights, Tutorials, and Updates from Global Infosoft
            </h2>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl font-normal transition-colors">
              Stay updated with the latest trends in technology, development tips, and industry insights from our team of experts.
            </p>
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-3 rounded-2xl bg-white/95 dark:bg-[#0B0F19]/90 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3 text-left shadow-sm dark:shadow-xl transition-colors"
        >
          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-['Sora'] whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search AI, Quantum, Green Tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Articles Count Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 font-['JetBrains_Mono'] text-left">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredPosts.length}</strong> technology articles
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              Reset to All
            </button>
          )}
        </div>

        {/* Blog Posts Responsive Grid with Smooth Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 text-left">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              whileHover={{ y: -7, transition: { duration: 0.22, ease: 'easeOut' } }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.08, 0.32), ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleOpenArticle(post)}
              className="rounded-2xl bg-white dark:bg-[#090D18] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/60 transition-colors duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-[0_16px_36px_rgba(6,182,212,0.16)]"
            >
              {/* Image Container with Floating Badge - Compact height (h-38 sm:h-42) */}
              <div className="relative h-38 sm:h-42 overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#090D18] via-transparent to-transparent opacity-80" />

                {/* Top-Left Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-['Sora'] transition-colors">
                    {post.category}
                  </span>
                </div>

                {/* Top-Right Share Link Icon */}
                <button
                  onClick={(e) => handleCopyCardLink(post, e)}
                  title="Copy shareable link"
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer backdrop-blur-md"
                >
                  {copiedId === post.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Share2 className="w-3 h-3" />
                  )}
                </button>
              </div>

              {/* Card Content - Compact padding and sizing */}
              <div className="p-4 sm:p-4.5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Metadata Row: Date • Author */}
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400 font-['JetBrains_Mono']">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      <span>{post.date}</span>
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-sm sm:text-base font-bold font-['Sora'] line-clamp-2 leading-snug transition-colors ${
                      post.titleHighlight
                        ? 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
                        : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt - 2 lines, clean and compact */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed transition-colors">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer: Tags & Read Article Button */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5 transition-colors">
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-['JetBrains_Mono'] bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Article Action with smooth arrow nudge */}
                  <div className="pt-0.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold font-['Sora'] text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="p-12 rounded-3xl bg-white dark:bg-[#090D18] border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="text-base font-bold text-slate-900 dark:text-white">No articles matched your search</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try searching with different terms like "AI", "POS", "GST", or "Quantum".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold cursor-pointer transition-colors mt-2"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Consultation Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B0E19] to-cyan-950/30 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-['Sora']">
                Need Technical Consultation or Custom Software Development?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Connect with our senior engineering division to discuss healthcare software, AI models, high-volume retail POS, and enterprise cloud migrations with guaranteed SLAs.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenContact('General Technical Consultation')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-['Sora'] font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-all shrink-0 shadow-lg shadow-cyan-950/50"
          >
            Consult An Engineer
          </button>
        </motion.div>
      </div>
    </div>
  );
};
