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
    <section id="testimonials" className="relative py-24 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
              Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
              Trusted By Businesses in Jamshedpur & Beyond
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Read how our software installations, retail billing setups, and custom development have helped businesses run smoothly.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              id="testimonial-prev-btn"
              className="p-3 rounded-2xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              id="testimonial-next-btn"
              className="p-3 rounded-2xl glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-6 right-8 text-cyan-500/10 pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-8">
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 ml-2">
                5.0 Verified Review
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-800 dark:text-slate-100 font-['Outfit'] leading-relaxed">
              "{current.content}"
            </p>

            {/* Author details */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-cyan-500/30"
                />
                <div>
                  <div className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">{current.author}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">{current.role} • {current.company}</div>
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400">{current.location}</div>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-2xl glass-card text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2 border border-slate-200 dark:border-white/10">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Installed: {current.projectType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                currentIndex === idx
                  ? 'bg-cyan-500/10 dark:bg-cyan-600/20 border-cyan-500 shadow-md'
                  : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border-slate-200 dark:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{item.author}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.company}</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">"{item.content}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
