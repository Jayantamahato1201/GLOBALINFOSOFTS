import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="relative py-7 sm:py-9 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-5 gap-3">
          <div className="max-w-2xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              Client Feedback
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Trusted By Businesses in Jamshedpur & Beyond
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              Read how our software installations, retail billing setups, and custom development have helped businesses run smoothly.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevTestimonial}
              id="testimonial-prev-btn"
              className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              id="testimonial-next-btn"
              className="p-2 rounded-xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 p-4 sm:p-6 shadow-md overflow-hidden">
          <div className="absolute top-3 right-5 text-cyan-500/10 pointer-events-none">
            <Quote className="w-16 h-16" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-3">
            {/* Rating Stars */}
            <div className="flex items-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-[10.5px] font-mono font-semibold text-slate-500 dark:text-slate-400 ml-1.5">
                5.0 Verified Review
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-sm sm:text-base lg:text-lg font-medium text-slate-800 dark:text-slate-100 font-['Outfit'] leading-relaxed">
              "{current.content}"
            </p>

            {/* Author details */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src={current.avatar}
                  alt={current.author}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-cyan-500/30"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">{current.author}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">{current.role} • {current.company}</div>
                  <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">{current.location}</div>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-lg glass-card text-[10.5px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border border-slate-200 dark:border-white/10">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Installed: {current.projectType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3.5">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                currentIndex === idx
                  ? 'bg-cyan-500/10 dark:bg-cyan-600/20 border-cyan-500 shadow-sm'
                  : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{item.author}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.company}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">"{item.content}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
