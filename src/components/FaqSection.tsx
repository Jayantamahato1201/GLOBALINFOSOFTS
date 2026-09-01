import React, { useState } from 'react';
import { FAQS_DATA } from '../data/companyData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            Clear Answers & Guidance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Frequently asked questions regarding our software installations, data ownership, GST compliance, and technical support in Jamshedpur.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 max-w-4xl">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'glass-card border-cyan-500/50 shadow-lg'
                    : 'glass-card border-slate-200/80 dark:border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-cyan-700 dark:text-cyan-300 font-semibold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/80 dark:border-white/10 animate-fadeIn">
                    <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-2">
                      Category: {faq.category}
                    </div>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
