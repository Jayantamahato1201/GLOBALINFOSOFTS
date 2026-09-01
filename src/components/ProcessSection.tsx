import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import {
  Search,
  Layout,
  Cpu,
  ShieldCheck,
  Rocket,
  HeartHandshake,
  CheckCircle2,
  Clock
} from 'lucide-react';

const STEP_ICONS: Record<string, typeof Search> = {
  Search,
  Layout,
  Cpu,
  ShieldCheck,
  Rocket,
  HeartHandshake
};

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="relative py-7 sm:py-9 border-t border-slate-200/80 dark:border-white/10 overflow-hidden text-left transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-1 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider font-mono border-cyan-500/25">
            Predictable Agile Delivery
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            From Requirement Analysis To Production Scale
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Our structured development lifecycle guarantees complete transparency, milestone reviews, and zero surprise delays.
          </p>
        </div>

        {/* Step Progress Bar Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                id={`process-tab-${idx}`}
                onClick={() => setActiveStep(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all duration-200 ${
                  isCurrent
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-slate-900 dark:text-white shadow-sm ring-1 ring-cyan-400 backdrop-blur-xl'
                    : 'glass-card text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-mono text-[10.5px] font-bold ${isCurrent ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-400 dark:text-slate-500'}`}>
                    STEP {step.stepNumber}
                  </span>
                  <span className="text-[9.5px] text-slate-500 dark:text-slate-400">{step.timeline}</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{step.title.split(' ')[0]} {step.title.split(' ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        {(() => {
          const step = PROCESS_STEPS[activeStep];
          const Icon = STEP_ICONS[step.icon] || Search;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center rounded-2xl glass-panel border border-slate-200/80 dark:border-white/10 p-4 sm:p-6 shadow-md">
              <div className="lg:col-span-7 space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-bold">
                      PHASE {step.stepNumber}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
                      <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      <span>{step.timeline}</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                    {step.title}
                  </h3>
                  <div className="text-xs font-medium text-cyan-700 dark:text-cyan-300">{step.subtitle}</div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-white/10">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Phase Deliverables & Artifacts:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg glass-card text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate text-[11px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Visual Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl glass-card border border-slate-200/80 dark:border-white/15 text-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-300 mb-2.5 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] mb-0.5">
                  100%
                </div>
                <div className="text-[11px] text-cyan-700 dark:text-cyan-300 font-semibold uppercase tracking-wider">
                  Quality & Accuracy Gate
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 max-w-xs leading-tight">
                  Zero software is deployed without thorough quality testing, invoice template validation, and client training.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
