import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ArrowLeft, Sparkles, DollarSign } from 'lucide-react';

interface ServicePackage {
  id: string;
  name: string;
  description: string;
  image: string;
  demoUrl: string;
  addons: {
    id: string;
    title: string;
    price: number;
    description?: string;
  }[];
}

const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'website',
    name: 'Website',
    description: 'Modern, responsive, SEO-friendly websites',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'sevenfinancials.in',
    addons: [
      { id: 'web-corporate', title: 'Business Website', price: 450, description: '5-8 pages, mobile-friendly & responsive' },
      { id: 'web-ecommerce', title: 'E-Commerce Store', price: 850, description: 'Product catalog & payment integration' },
      { id: 'web-seo', title: 'SEO Optimization', price: 300, description: 'Meta tags, sitemap & Google Console' },
      { id: 'web-portal', title: 'Dynamic Portal', price: 650, description: 'Admin dashboard & database integration' }
    ]
  },
  {
    id: 'application',
    name: 'Application',
    description: 'Powerful mobile or web applications',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'app.globalinfosofts.com',
    addons: [
      { id: 'app-only', title: 'App Only', price: 600, description: 'Native performance & core application logic' },
      { id: 'app-website', title: 'App + Website', price: 900, description: 'Unified web portal and mobile app bundle' },
      { id: 'app-android', title: 'Android', price: 500, description: 'Optimized for Google Play Store deployment' },
      { id: 'app-ios', title: 'iOS', price: 500, description: 'Native Apple App Store architecture & compliance' }
    ]
  },
  {
    id: 'software',
    name: 'Software',
    description: 'Custom software built for your business',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'erp.globalinfosofts.com',
    addons: [
      { id: 'soft-pos', title: 'Desktop POS & Billing', price: 450, description: 'Thermal printer & barcode scanning support' },
      { id: 'soft-erp', title: 'Multi-Branch ERP', price: 950, description: 'Inventory, godowns, GST & staff accounts' },
      { id: 'soft-api', title: 'Custom REST API', price: 550, description: 'High-speed cloud synchronization engine' },
      { id: 'soft-backup', title: 'Auto Cloud Backup', price: 300, description: 'Encrypted daily scheduled database snapshots' }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Grow your brand and reach your audience',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: 'growth.analytics.io',
    addons: [
      { id: 'mkt-seo', title: 'Local Google SEO', price: 350, description: 'Google My Business map ranking & citations' },
      { id: 'mkt-social', title: 'Social Media Strategy', price: 400, description: 'Brand content, reels & community outreach' },
      { id: 'mkt-ads', title: 'Paid Ads Management', price: 500, description: 'Targeted Google Ads & Meta advertising' },
      { id: 'mkt-content', title: 'Content & Copywriting', price: 300, description: 'High-conversion sales copy & tech articles' }
    ]
  }
];

interface BuildPackageSectionProps {
  onOpenContact: (scope?: string) => void;
}

export const BuildPackageSection: React.FC<BuildPackageSectionProps> = ({ onOpenContact }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const selectedService = SERVICE_PACKAGES.find((s) => s.id === selectedServiceId);

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedAddons([]); // reset add-on choices
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const totalCalculatedPrice = selectedService
    ? selectedService.addons
        .filter((a) => selectedAddons.includes(a.id))
        .reduce((sum, item) => sum + item.price, 0)
    : 0;

  const handleGetQuote = () => {
    if (!selectedService) return;
    const addonTitles = selectedService.addons
      .filter((a) => selectedAddons.includes(a.id))
      .map((a) => `${a.title} ($${a.price})`)
      .join(', ');

    const quoteMsg = `Service Package: ${selectedService.name}${
      addonTitles ? ` with add-ons: ${addonTitles} (Est: $${totalCalculatedPrice})` : ''
    }`;
    onOpenContact(quoteMsg);
  };

  return (
    <section
      id="build-package"
      className="py-14 sm:py-20 relative z-10 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-[#07090F] transition-colors duration-300"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-['Sora'] tracking-tight text-[#FF0055] dark:text-[#FF1464] drop-shadow-sm"
          >
            Build Your Service Package
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-2 font-['JetBrains_Mono'] tracking-wide"
          >
            {selectedServiceId
              ? 'Step 2 — Tap one or more add-ons (you can select multiple)'
              : 'Step 1 — Tap a service below to get started'}
          </motion.p>
        </div>

        {/* Outer Frame Container */}
        <div className="max-w-6xl mx-auto rounded-3xl p-4 sm:p-7 md:p-9 bg-white dark:bg-[#0D0F19]/90 border border-slate-200 dark:border-red-900/30 shadow-2xl dark:shadow-[0_0_50px_rgba(255,0,85,0.06)] relative overflow-hidden backdrop-blur-xl">
          {/* Subtle ambient corner glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF0055]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!selectedServiceId ? (
              /* STEP 1: 4 SERVICES 2x2 GRID */
              <motion.div
                key="step1-grid"
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative z-10"
              >
                {SERVICE_PACKAGES.map((pkg, idx) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                      onClick={() => handleSelectService(pkg.id)}
                      className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 hover:border-[#FF0055] dark:hover:border-[#FF0055] bg-slate-50/80 dark:bg-[#111322] hover:bg-white dark:hover:bg-[#141728] shadow-sm hover:shadow-xl hover:dark:shadow-[0_0_30px_rgba(255,0,85,0.22)] transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer text-left select-none"
                    >
                      {/* Live Browser Frame */}
                      <div className="relative overflow-hidden bg-slate-950 flex flex-col">
                        {/* Chrome Header */}
                        <div className="bg-slate-900/95 dark:bg-[#060913] border-b border-white/10 px-3.5 py-1.5 flex items-center justify-between z-10 shrink-0 select-none">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-rose-500/90" />
                            <div className="w-2 h-2 rounded-full bg-amber-500/90" />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/90" />
                          </div>
                          <div className="bg-slate-800/90 dark:bg-white/5 text-[10px] font-['JetBrains_Mono'] text-slate-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-white/5 truncate max-w-[170px]">
                            <span className="text-emerald-400 text-[8px] animate-pulse">●</span>
                            <span className="truncate">{pkg.demoUrl}</span>
                          </div>
                          <span className="text-[9px] font-['JetBrains_Mono'] font-bold text-cyan-400 uppercase tracking-wider">
                            LIVE DEMO
                          </span>
                        </div>

                        {/* Image Container */}
                        <div className="relative h-44 sm:h-52 overflow-hidden bg-slate-950">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                          {/* "Tap to open" Badge */}
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FF0055] text-white text-[11px] font-bold font-['JetBrains_Mono'] tracking-wide shadow-md shadow-red-950/40 group-hover:scale-105 transition-transform duration-300">
                            Tap to open
                          </div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-[#FF0055] dark:group-hover:text-[#FF2A75] transition-colors duration-300">
                            {pkg.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Action button - Turns vibrant red on card hover only */}
                        <div className="pt-2">
                          <div
                            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold font-['JetBrains_Mono'] flex items-center justify-center gap-1.5 transition-all duration-300 bg-slate-200/80 dark:bg-[#1E2135] text-slate-800 dark:text-slate-300 group-hover:bg-gradient-to-r group-hover:from-[#FF0055] group-hover:to-[#E6004C] group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-900/40 group-hover:brightness-105"
                          >
                            <span>Customize package</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            ) : (
              /* STEP 2: INTERACTIVE CUSTOMIZER VIEW */
              selectedService && (
                <motion.div
                  key="step2-customizer"
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10 text-left"
                >
                  {/* Left Column: Controls and Addons (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Back button */}
                    <button
                      onClick={() => setSelectedServiceId(null)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E2135] hover:bg-slate-200 dark:hover:bg-[#282C46] text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 transition-colors cursor-pointer group"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#FF0055] group-hover:-translate-x-1 transition-transform" />
                      <span>Change service</span>
                    </button>

                    {/* Service title and instruction */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-slate-900 dark:text-[#FF2A75]">
                        {selectedService.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Select the options you need — tap again to deselect
                      </p>
                    </div>

                    {/* 2x2 Addons Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedService.addons.map((addon) => {
                        const isChecked = selectedAddons.includes(addon.id);
                        return (
                          <motion.div
                            key={addon.id}
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.985 }}
                            onClick={() => handleToggleAddon(addon.id)}
                            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                              isChecked
                                ? 'bg-rose-50/80 dark:bg-[#221626] border-[#FF0055] shadow-md dark:shadow-[0_0_18px_rgba(255,0,85,0.18)]'
                                : 'bg-slate-50 dark:bg-[#131627] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-sm font-bold font-['Sora'] text-slate-900 dark:text-white">
                                  {addon.title}
                                </h4>
                                {addon.description && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                    {addon.description}
                                  </p>
                                )}
                              </div>
                              <span className="text-sm font-extrabold font-['JetBrains_Mono'] text-[#FF0055]">
                                ${addon.price}
                              </span>
                            </div>

                            {/* Checkbox row */}
                            <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                              <div
                                className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                                  isChecked
                                    ? 'bg-[#FF0055] border-[#FF0055] text-white'
                                    : 'border-slate-400 dark:border-slate-600 bg-transparent'
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span
                                className={`text-[11px] font-medium font-['JetBrains_Mono'] ${
                                  isChecked
                                    ? 'text-[#FF0055] font-bold'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {isChecked ? 'Added to package' : 'Tap to add'}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Bottom Bar: Selections and Get a quote */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-[#141728] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-bold font-['Sora'] text-[#FF0055] dark:text-[#FF2A75] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Your selections</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm">
                          {selectedAddons.length > 0
                            ? `${selectedAddons.length} add-on${
                                selectedAddons.length > 1 ? 's' : ''
                              } selected • Estimated $${totalCalculatedPrice}`
                            : 'Choose at least one add-on above, or contact us for a custom quote'}
                        </p>
                      </div>

                      <button
                        onClick={handleGetQuote}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF0055] to-[#E6004C] hover:from-[#FF1A66] hover:to-[#D10045] text-white text-xs sm:text-sm font-bold font-['JetBrains_Mono'] flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all cursor-pointer active:scale-95 shrink-0"
                      >
                        <span>Get a quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Selected Preview Card (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131627] shadow-xl">
                      {/* Image Frame */}
                      <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-950">
                        <img
                          src={selectedService.image}
                          alt={selectedService.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white font-['JetBrains_Mono']">
                          <span className="font-bold">{selectedService.name} Package</span>
                          <span className="text-[#FF2A75] font-semibold">Active Selection</span>
                        </div>
                      </div>

                      {/* Card details */}
                      <div className="p-5 space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-xl font-bold font-['Sora'] text-slate-900 dark:text-[#FF2A75]">
                            {selectedService.name}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {selectedService.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-['JetBrains_Mono']">
                            Included Add-ons:
                          </div>

                          {selectedAddons.length === 0 ? (
                            <p className="text-xs italic text-slate-500 dark:text-slate-500 py-2">
                              No add-ons selected yet
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {selectedService.addons
                                .filter((a) => selectedAddons.includes(a.id))
                                .map((a) => (
                                  <div
                                    key={a.id}
                                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-100 dark:bg-[#1A1D2E] text-slate-800 dark:text-slate-200"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Check className="w-3.5 h-3.5 text-[#FF0055]" />
                                      <span className="font-medium">{a.title}</span>
                                    </div>
                                    <span className="font-mono font-bold text-[#FF0055]">
                                      ${a.price}
                                    </span>
                                  </div>
                                ))}

                              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700/60 font-bold text-xs sm:text-sm">
                                <span className="text-slate-700 dark:text-slate-300">
                                  Estimated Total:
                                </span>
                                <span className="font-mono text-[#FF0055] text-base">
                                  ${totalCalculatedPrice}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
