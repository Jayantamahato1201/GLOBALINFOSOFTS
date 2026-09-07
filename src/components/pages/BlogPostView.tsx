import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BlogPost } from '../../types';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  Tag,
  BookOpen,
  MessageSquare,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onOpenContact: (scope?: string) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  allPosts,
  onBack,
  onSelectPost,
  onOpenContact
}) => {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Construct absolute shareable URL
  const canonicalUrl = `https://globalinfosofts.com/blog/${post.slug}/`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = `Read this insightful article: "${post.title}" on Global InfoSoft - ${canonicalUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`,
      '_blank'
    );
  };

  const handleTwitterShare = () => {
    const text = `"${post.title}" by @GlobalInfoSoft\n\n${canonicalUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Other related articles (excluding the current one)
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-white relative overflow-hidden w-full transition-colors duration-300">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800/80 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8">
        {/* Navigation & Breadcrumbs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/60 transition-colors">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-['JetBrains_Mono'] overflow-x-auto whitespace-nowrap">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </button>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span>Blog</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-slate-700 dark:text-slate-300 truncate max-w-[240px] sm:max-w-xs">{post.title}</span>
          </div>

          {/* Share Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shadow-sm"
              title="Copy Article URL"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="p-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs transition-colors cursor-pointer"
              title="Share on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 text-left"
        >
          {/* Category Badge & Read Time */}
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-['JetBrains_Mono']">
              <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              <span>{post.readTime}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-['JetBrains_Mono']">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Tech Analysis</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] text-slate-900 dark:text-white tracking-tight leading-[1.15] transition-colors">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal transition-colors">
            {post.excerpt}
          </p>

          {/* Author Metadata Card */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 transition-colors">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/50 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm font-['Sora'] transition-colors">{post.author}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                    Author
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-['JetBrains_Mono']">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Featured Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/90 shadow-xl dark:shadow-2xl bg-slate-950"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-96 md:h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#07090F] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300 dark:text-slate-400 font-['JetBrains_Mono'] bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span>Official Global InfoSoft Research Publication</span>
            <span>Ref: {post.slug}</span>
          </div>
        </motion.div>

        {/* Key Takeaways Callout Card */}
        {post.summaryHighlights && post.summaryHighlights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-5 sm:p-6 rounded-2xl bg-cyan-50/70 dark:bg-gradient-to-br dark:from-cyan-950/40 dark:via-slate-900/70 dark:to-slate-950 border border-cyan-500/30 shadow-sm dark:shadow-xl space-y-3 text-left transition-colors"
          >
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold text-sm font-['Sora']">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaways &amp; Executive Summary</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {post.summaryHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mt-2 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Featured Quote */}
        {post.featuredQuote && (
          <motion.blockquote
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900/80 border-l-4 border-cyan-500 text-left space-y-2 border border-slate-200 dark:border-slate-800/80 shadow-sm"
          >
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white italic font-['Sora'] leading-relaxed">
              "{post.featuredQuote}"
            </p>
            <footer className="text-xs text-slate-500 dark:text-slate-400 font-['JetBrains_Mono']">
              — Global InfoSoft Technology Strategy Analysis
            </footer>
          </motion.blockquote>
        )}

        {/* Structured Sections or Content Body */}
        <div className="prose max-w-none space-y-8 text-left dark:prose-invert">
          {post.sections && post.sections.length > 0 ? (
            post.sections.map((section, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3.5 pt-4"
              >
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-white flex items-center gap-2.5">
                    <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">0{idx + 1}.</span>
                    <span>{section.heading}</span>
                  </h2>
                  {section.subheading && (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      {section.subheading}
                    </p>
                  )}
                </div>

                <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-2 my-4 transition-colors">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.callout && (
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm text-cyan-800 dark:text-cyan-200 font-medium">
                    {section.callout}
                  </div>
                )}
              </motion.section>
            ))
          ) : (
            <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {post.content}
            </div>
          )}
        </div>

        {/* Detailed Comparison Table (if present) */}
        {post.comparisonTable && post.comparisonTable.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 pt-6 text-left"
          >
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-['Sora'] text-slate-900 dark:text-white">
                Detailed Comparison: AI Diagnostic Engines vs. Human Clinicians
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evaluation across key dimensions of modern healthcare delivery
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950/70 shadow-sm dark:shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-['Sora']">
                      <th className="p-3.5 font-bold">Evaluation Metric</th>
                      <th className="p-3.5 font-bold text-cyan-600 dark:text-cyan-400">AI Doctor / Machine Diagnostics</th>
                      <th className="p-3.5 font-bold text-sky-600 dark:text-sky-400">Human Physician / Specialist</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                    {post.comparisonTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-3.5 font-medium text-slate-900 dark:text-white font-['Sora']">{row.feature}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{row.aiDoctor}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{row.humanDoctor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/80 text-left">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-['JetBrains_Mono'] mr-1 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags:
          </span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share This Article Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="p-5 rounded-2xl bg-white dark:bg-[#090D18] border border-slate-200 dark:border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-sm dark:shadow-lg"
        >
          <div className="space-y-0.5">
            <div className="text-sm font-bold font-['Sora'] text-slate-900 dark:text-white">Share This Article</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Help colleagues, developers, and healthcare operators stay informed.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleLinkedInShare}
              className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={handleTwitterShare}
              className="px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>X / Twitter</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </motion.div>

        {/* Engineering / Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C0F1D] to-cyan-950/50 border border-slate-800 dark:border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left"
        >
          <div className="space-y-2 max-w-xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-['JetBrains_Mono']">
              Enterprise Technology Consultation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] text-white">
              Ready to Implement Custom Software or AI Automation in Your Enterprise?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Global InfoSoft designs compliant medical software, offline-first clinical record systems, high-speed retail POS, and custom cloud architectures backed by guaranteed technical support SLAs.
            </p>
          </div>
          <button
            onClick={() => onOpenContact(`Consultation regarding article: ${post.title}`)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-['Sora'] text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-950/50 cursor-pointer active:scale-95 transition-all shrink-0"
          >
            Consult Our Engineering Team
          </button>
        </motion.div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="pt-10 space-y-6 text-left"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-white">
                  Related Technology Articles
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore more research, guides, and tech analysis from Global InfoSoft
                </p>
              </div>
              <button
                onClick={onBack}
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All Articles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {relatedPosts.map((rPost, rIdx) => (
                <motion.div
                  key={rPost.id}
                  initial={{ opacity: 0, y: 30, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: rIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                  onClick={() => onSelectPost(rPost)}
                  className="rounded-2xl bg-white dark:bg-[#090D18] border border-slate-200 dark:border-slate-800/80 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-[0_12px_28px_rgba(6,182,212,0.16)]"
                >
                  <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-950">
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md transition-colors">
                        {rPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-['JetBrains_Mono']">
                        <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                        <span>{rPost.date}</span>
                        <span>•</span>
                        <span>{rPost.author}</span>
                      </div>
                      <h4
                        className={`text-sm font-bold font-['Sora'] line-clamp-2 leading-snug transition-colors ${
                          rPost.titleHighlight
                            ? 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
                            : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
                        }`}
                      >
                        {rPost.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {rPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
};
