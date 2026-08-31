import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, ShieldCheck, Zap, Send, Sparkles, Mail, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRIMARY_ENQUIRY_EMAIL, getEnquiryMailtoUrl } from '../utils/email';

interface EstimatorOption {
  id: string;
  name: string;
  price: number;
  weeks: number;
  desc: string;
}

const PLATFORMS: EstimatorOption[] = [
  { id: 'web-saas', name: 'Web App / SaaS Platform', price: 4500, weeks: 6, desc: 'Responsive React 19 / Next.js web application with dashboard & API' },
  { id: 'mobile-app', name: 'Mobile App (iOS & Android)', price: 5500, weeks: 8, desc: 'Native Flutter / React Native cross-platform mobile ecosystem' },
  { id: 'erp-crm', name: 'Custom ERP / Enterprise CRM', price: 8500, weeks: 12, desc: 'Integrated inventory, multi-department accounting & workflows' },
  { id: 'accounting-pos', name: 'Accounting & Retail POS', price: 3200, weeks: 4, desc: 'Windows .NET & SQL ledger, GST/Tax, barcode inventory engine' },
  { id: 'full-growth', name: 'Full Digital Growth & Marketing', price: 2800, weeks: 4, desc: 'Technical SEO overhaul, CRO funnel, and automated email workflows' }
];

const FEATURES = [
  { id: 'auth-rbac', name: 'Enterprise Auth & RBAC', price: 800, weeks: 1 },
  { id: 'payments', name: 'Payment Gateways & Subscriptions', price: 1200, weeks: 1 },
  { id: 'realtime-chat', name: 'Real-time WebSockets / Chat', price: 1400, weeks: 2 },
  { id: 'ai-features', name: 'Generative AI & LLM Automation', price: 2200, weeks: 2 },
  { id: 'custom-reporting', name: 'Custom Analytics & PDF Reports', price: 950, weeks: 1 },
  { id: 'multi-lang', name: 'Multi-Language & Multi-Currency', price: 850, weeks: 1 },
  { id: 'cloud-devops', name: 'Automated CI/CD & Kubernetes', price: 1500, weeks: 1 },
  { id: 'offline-sync', name: 'Offline-First SQLite Sync', price: 1100, weeks: 1 }
];

const TIMELINE_MODIFIERS = [
  { id: 'standard', name: 'Standard Delivery', multiplier: 1.0, weeksOffset: 0, tag: 'Best Quality & Value' },
  { id: 'fast-track', name: 'Fast-Track Sprint', multiplier: 1.25, weeksOffset: -2, tag: 'Dedicated Pair Engineers' },
  { id: 'enterprise', name: 'Enterprise Phased Rollout', multiplier: 1.1, weeksOffset: 2, tag: 'High-Governance Multi-Tier' }
];

export const InteractiveEstimator: React.FC<{ onBookConsultation?: (summary: string) => void }> = ({
  onBookConsultation
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('web-saas');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['auth-rbac', 'payments', 'custom-reporting']);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('standard');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [clientEmail, setClientEmail] = useState<string>('');

  const platformObj = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  const timelineObj = TIMELINE_MODIFIERS.find((t) => t.id === selectedTimeline) || TIMELINE_MODIFIERS[0];

  const featuresPrice = selectedFeatures.reduce((acc, featId) => {
    const f = FEATURES.find((item) => item.id === featId);
    return acc + (f ? f.price : 0);
  }, 0);

  const featuresWeeks = selectedFeatures.reduce((acc, featId) => {
    const f = FEATURES.find((item) => item.id === featId);
    return acc + (f ? f.weeks : 0);
  }, 0);

  const rawPrice = (platformObj.price + featuresPrice) * timelineObj.multiplier;
  const rawWeeks = Math.max(3, Math.round((platformObj.weeks + featuresWeeks * 0.5) + timelineObj.weeksOffset));

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const handleSendEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    const summary = `Estimated: ${platformObj.name} | Features: ${selectedFeatures.length} selected | Approx: $${rawPrice.toLocaleString()} (${rawWeeks} weeks) | Client Email: ${clientEmail}`;
    
    // Format mailto to kumarrajnish531@gmail.com
    const mailtoUrl = getEnquiryMailtoUrl({
      fullName: 'Prospective Client',
      email: clientEmail,
      serviceCategory: platformObj.name,
      budgetRange: `$${rawPrice.toLocaleString()} (Approx. ${rawWeeks} weeks)`,
      message: `Selected Platform: ${platformObj.name}\nDelivery Sprint: ${timelineObj.name}\nSelected Features (${selectedFeatures.length}):\n${FEATURES.filter(f => selectedFeatures.includes(f.id)).map(f => `• ${f.name} (+$${f.price})`).join('\n')}\n\nEstimated Total: $${rawPrice.toLocaleString()} (${rawWeeks} weeks)`
    });

    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    } catch {
      // safe fallback
    }

    onBookConsultation?.(summary);
  };

  return (
    <div id="project-estimator" className="relative rounded-3xl glass-panel border border-white/10 p-6 lg:p-12 shadow-2xl overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="abstract-shape w-80 h-80 -top-20 -right-20 animate-pulse-glow" />
      <div className="abstract-shape w-80 h-80 -bottom-20 -left-20 animate-pulse-glow" style={{ animationDelay: '-3s' }} />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Cost & Timeline Calculator</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white font-['Outfit']">
          Transparent Estimation In Real-Time
        </h2>
        <p className="text-slate-300 text-sm lg:text-base mt-2">
          Select your platform architecture, desired functional modules, and delivery speed to generate a real-world scope benchmark with zero obligation.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Step 1 & 2 Left Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Select Platform */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                1. Select Core Platform Architecture
              </label>
              <span className="text-xs text-indigo-300 font-mono">Step 1 of 3</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatform === platform.id;
                return (
                  <button
                    key={platform.id}
                    type="button"
                    id={`estimator-platform-${platform.id}`}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-md shadow-indigo-500/15 ring-1 ring-indigo-400 backdrop-blur-xl'
                        : 'glass-card text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-white">{platform.name}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{platform.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Feature Add-ons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                2. Select Core Features & Integrations
              </label>
              <span className="text-xs text-slate-400">({selectedFeatures.length} selected)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATURES.map((feature) => {
                const isChecked = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    id={`estimator-feature-${feature.id}`}
                    onClick={() => toggleFeature(feature.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-150 ${
                      isChecked
                        ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm'
                        : 'glass-card text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors ${
                          isChecked ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-white/20 bg-white/5'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium truncate">{feature.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-indigo-300 shrink-0 ml-2">+${feature.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Delivery Speed */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              3. Delivery Pace & Governance Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMELINE_MODIFIERS.map((mod) => {
                const isSelected = selectedTimeline === mod.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    id={`estimator-timeline-${mod.id}`}
                    onClick={() => setSelectedTimeline(mod.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md'
                        : 'glass-card text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{mod.name}</div>
                    <div className="text-[10px] text-indigo-300 mt-0.5">{mod.tag}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Summary Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 lg:p-8 rounded-3xl glass-card-static border border-white/15 shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Estimated Project Scope</span>
              <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Live Calculation
              </span>
            </div>

            {/* Price Display */}
            <div>
              <div className="text-xs text-slate-400 mb-1">Estimated Investment Range</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-extrabold text-white font-['Outfit']">
                  ${Math.round(rawPrice * 0.9).toLocaleString()} - ${Math.round(rawPrice * 1.1).toLocaleString()}
                </span>
                <span className="text-xs text-slate-400">USD</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Fixed-scope milestone contract with transparent bi-weekly sprint deliverables.
              </p>
            </div>

            {/* Timeline & Metrics */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
              <div className="p-3.5 rounded-2xl glass-card">
                <div className="text-[11px] text-slate-400">Estimated Timeline</div>
                <div className="text-lg font-bold text-indigo-300 mt-0.5">{rawWeeks} - {rawWeeks + 2} Weeks</div>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <div className="text-[11px] text-slate-400">Included Warranty</div>
                <div className="text-lg font-bold text-emerald-300 mt-0.5">6 Mos Free Support</div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>100% Full IP & Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Guaranteed 24-Hour SLA Response Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Zero Hidden Fees or Vendor Lock-in</span>
              </div>
            </div>
          </div>

          {/* Action Form */}
          <div className="mt-8 pt-4 border-t border-white/10">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Estimation Breakdown Dispatched!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Estimate and scope brief routed to <strong className="text-emerald-400 font-mono">{PRIMARY_ENQUIRY_EMAIL}</strong>. Our senior solutions architect will review and email you back at <strong className="text-white">{clientEmail}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEstimate} className="space-y-3">
                <div className="space-y-1.5">
                  <label htmlFor="estimator-email-input" className="text-xs text-slate-300 font-medium">
                    Receive Full Scope Breakdown & Proposal:
                  </label>
                  <input
                    id="estimator-email-input"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  id="btn-submit-estimator"
                  className="w-full py-3 px-4 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>Lock In Estimate & Get Full Proposal</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
