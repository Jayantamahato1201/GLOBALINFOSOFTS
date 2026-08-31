import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/companyData';
import { Card3DTilt } from './3d/Card3DTilt';
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
    <section id="testimonials" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[450px] h-[450px] top-1/3 -right-20 animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              Client Endorsements & Trust
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
              Trusted By Fast-Growing Scaleups & Enterprises
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Read how our software engineering and digital marketing teams consistently exceed delivery standards and ROI expectations.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              id="testimonial-prev-btn"
              className="p-3 rounded-2xl glass-card text-slate-300 hover:text-white transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              id="testimonial-next-btn"
              className="p-3 rounded-2xl glass-card text-slate-300 hover:text-white transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative rounded-3xl glass-panel border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden">
          <div className="absolute top-6 right-8 text-indigo-500/10 pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-8">
            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-mono font-semibold text-slate-400 ml-2">
                5.0 Verified Review
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-100 font-['Outfit'] leading-relaxed">
              "{current.content}"
            </p>

            {/* Author details */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-indigo-500/30"
                />
                <div>
                  <div className="text-base font-bold text-white font-['Outfit']">{current.author}</div>
                  <div className="text-xs text-slate-300">{current.role} • {current.company}</div>
                  <div className="text-[11px] text-indigo-300">{current.location}</div>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-2xl glass-card text-xs font-mono text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Delivered: {current.projectType}</span>
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
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'glass-card text-slate-400 hover:text-slate-200'
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
                  <div className="text-xs font-bold text-white">{item.author}</div>
                  <div className="text-[11px] text-slate-400">{item.company}</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2">"{item.content}"</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
