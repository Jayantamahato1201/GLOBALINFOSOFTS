import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/companyData';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface PricingPageProps {
  onOpenContact: (scope?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenContact }) => {
  const [billingCycle, setBillingCycle] = useState<'onetime' | 'monthly'>('onetime');

  const comparisonRows = [
    { feature: 'Core Billing & POS Engine', starter: true, pro: true, enterprise: true },
    { feature: 'Real-Time Inventory Management', starter: true, pro: true, enterprise: true },
    { feature: 'Customer CRM & Loyalty Points', starter: true, pro: true, enterprise: true },
    { feature: 'GST Tax & E-Invoice Compliance', starter: true, pro: true, enterprise: true },
    { feature: 'Multi-Location Cloud Sync', starter: false, pro: true, enterprise: true },
    { feature: 'Custom ERP Module Development', starter: false, pro: true, enterprise: true },
    { feature: 'Dedicated Account Manager', starter: false, pro: true, enterprise: true },
    { feature: 'Custom Mobile App (iOS / Android)', starter: false, pro: 'Add-on', enterprise: true },
    { feature: '100% IP & Source Code Transfer', starter: true, pro: true, enterprise: true },
    { feature: 'Free Warranty & Support SLA', starter: '3 Months', pro: '6 Months', enterprise: '1 Year 24/7' }
  ];

  return (
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Transparent Investment Roadmaps</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Clear, Predictable Enterprise Pricing
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            No surprise license renewals. Every custom software package includes 100% source code ownership, complete database sovereignty, and complimentary post-launch support.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-8 rounded-3xl glass-panel border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'border-indigo-500/60 shadow-2xl shadow-indigo-500/20 lg:-translate-y-2'
                  : 'border-white/15 hover:border-indigo-500/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular for Growing Enterprises
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="my-6 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{plan.period}</div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-indigo-300">
                    Included in Package:
                  </div>
                  {plan.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => onOpenContact(`Inquiry for Pricing Plan: ${plan.name} (${plan.price})`)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'btn-primary text-white shadow-xl'
                      : 'glass-card text-white hover:bg-white/10 hover:border-indigo-500/40'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center text-[11px] text-slate-400 font-mono">
                  SLA: {plan.supportLevel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/15 space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white font-['Outfit']">Detailed Package Comparison</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Evaluate features across our core software tiers to find the perfect fit for your operational scale.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Feature / Deliverable</th>
                  <th className="py-3 px-4 text-center">Starter Business</th>
                  <th className="py-3 px-4 text-center text-indigo-300">Professional Suite</th>
                  <th className="py-3 px-4 text-center">Enterprise Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-slate-400">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center bg-indigo-500/5">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-indigo-300 font-semibold">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-emerald-400 font-semibold">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
