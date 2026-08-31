import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import { Card3DTilt } from './3d/Card3DTilt';
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
    <section id="process" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[400px] h-[400px] top-1/4 -left-20 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            Predictable Agile Delivery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
            From Architecture Blueprint To Production Scale
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Our ISO-aligned development lifecycle guarantees complete transparency, bi-weekly sprint deliverables, and zero surprise delays.
          </p>
        </div>

        {/* Step Progress Bar Navigator */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-12">
          {PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.stepNumber}
                id={`process-tab-${idx}`}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-400 backdrop-blur-xl'
                    : 'glass-card text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-xs font-bold ${isCurrent ? 'text-indigo-300' : 'text-slate-500'}`}>
                    STEP {step.stepNumber}
                  </span>
                  <span className="text-[10px] text-slate-400">{step.timeline}</span>
                </div>
                <div className="text-xs font-semibold text-white truncate">{step.title.split(' ')[0]} {step.title.split(' ')[1]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        {(() => {
          const step = PROCESS_STEPS[activeStep];
          const Icon = STEP_ICONS[step.icon] || Search;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl glass-panel border border-white/10 p-6 sm:p-10 shadow-2xl">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full glass-card text-indigo-300 font-mono text-xs font-bold">
                      PHASE {step.stepNumber}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-300 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{step.timeline}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                    {step.title}
                  </h3>
                  <div className="text-sm font-medium text-indigo-300">{step.subtitle}</div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Phase Deliverables & Artifacts:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl glass-card text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Visual Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl glass-card-static border border-white/15 text-center relative overflow-hidden">
                <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-6 shadow-xl shadow-indigo-500/15">
                  <Icon className="w-10 h-10" />
                </div>
                <div className="text-4xl font-extrabold text-white font-['Outfit'] mb-1">
                  100%
                </div>
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                  Quality & Security Gate
                </div>
                <p className="text-xs text-slate-300 mt-2 max-w-xs">
                  Zero code moves to production without automated test validation and client sprint signoff.
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
