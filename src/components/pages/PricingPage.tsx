import React from 'react';
import { PRICING_PLANS } from '../../data/companyData';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface PricingPageProps {
  onOpenContact: (scope?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenContact }) => {
  const comparisonRows = [
    { feature: 'Core Billing & POS Engine', starter: true, pro: true, enterprise: true },
    { feature: 'Real-Time Inventory Management', starter: true, pro: true, enterprise: true },
    { feature: 'Customer CRM & Loyalty Points', starter: true, pro: true, enterprise: true },
    { feature: 'GST Tax & E-Invoice Compliance', starter: true, pro: true, enterprise: true },
    { feature: 'Multi-Location Cloud Sync', starter: false, pro: true, enterprise: true },
    { feature: 'Custom ERP Module Development', starter: false, pro: true, enterprise: true },
    { feature: 'Dedicated Support Engineer', starter: false, pro: true, enterprise: true },
    { feature: 'Custom Mobile App (Android / iOS)', starter: false, pro: 'Add-on', enterprise: true },
    { feature: '100% IP & Source Code Transfer', starter: true, pro: true, enterprise: true },
    { feature: 'Free Warranty & Support SLA', starter: '3 Months', pro: '6 Months', enterprise: '1 Year 24/7' }
  ];

  return (
    <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-4 relative z-10">
        {/* Page Header - Asymmetric Full-width */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-2 text-left">
          <div className="max-w-3xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-400 text-[11px] font-semibold uppercase tracking-wider font-mono border-slate-200 dark:border-slate-800">
              <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
              <span>Transparent Software Packages</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              Affordable & Predictable Pricing
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              No hidden annual traps. Every software delivery from Global InfoSoft includes complete data ownership, free installation and training, and complimentary post-launch support warranty.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>100% Data Sovereignty • Zero Forced Vendor Lock-In</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch w-full">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-4 sm:p-4.5 rounded-xl glass-panel border flex flex-col justify-between relative transition-all duration-200 text-left ${
                plan.popular
                  ? 'border-cyan-500/60 dark:border-cyan-400/60 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full btn-primary text-white font-mono text-[9.5px] font-bold uppercase tracking-wider shadow-sm">
                  Recommended For Retail & SMEs
                </div>
              )}

              <div>
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 min-h-[22px]">{plan.tagline}</p>
                </div>

                <div className="my-2.5 pb-2.5 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">{plan.period}</div>
                </div>

                {/* Deliverables List */}
                <div className="space-y-1.5 mb-3.5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                    Included in Package:
                  </div>
                  {plan.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                <button
                  onClick={() => onOpenContact(`Inquiry for Pricing Plan: ${plan.name} (${plan.price})`)}
                  className={`w-full py-2 px-3.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    plan.popular
                      ? 'btn-primary text-white'
                      : 'glass-card text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <div className="text-center text-[10.5px] text-slate-500 dark:text-slate-400 font-mono">
                  SLA Support: {plan.supportLevel}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="p-3.5 sm:p-4.5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 space-y-2.5 w-full text-left">
          <div className="text-left">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Outfit']">Detailed Package Comparison</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluate features across our core software tiers to find the perfect fit for your operational scale.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10.5px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-2 px-2.5">Feature / Deliverable</th>
                  <th className="py-2 px-2.5 text-center">Starter POS</th>
                  <th className="py-2 px-2.5 text-center text-cyan-700 dark:text-cyan-400">Professional Suite</th>
                  <th className="py-2 px-2.5 text-center">Enterprise Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:border-slate-800">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-1.5 px-2.5 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                    <td className="py-1.5 px-2.5 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2.5 text-center bg-cyan-500/5">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 mx-auto" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-cyan-700 dark:text-cyan-400 font-semibold text-[11px]">{row.pro}</span>
                      )}
                    </td>
                    <td className="py-1.5 px-2.5 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">{row.enterprise}</span>
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
