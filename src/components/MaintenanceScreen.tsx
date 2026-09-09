import React from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { Wrench, PhoneCall, Mail, MessageSquare, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface MaintenanceScreenProps {
  customMessage?: string;
  onOpenAdmin: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({
  customMessage,
  onOpenAdmin
}) => {
  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header bar */}
      <header className="p-6 sm:p-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <BrandLogo size={36} showGlow />
          <div>
            <span className="font-['Sora'] text-lg font-bold text-white tracking-tight">
              Global InfoSoft
            </span>
            <span className="block text-[10px] font-['JetBrains_Mono'] text-slate-400">
              Jamshedpur, Jharkhand
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAdmin}
          className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-['JetBrains_Mono'] text-slate-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Admin Portal</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-['JetBrains_Mono'] font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Emergency Maintenance Active</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Wrench className="w-8 h-8" />
          </div>

          <h1 className="font-['Sora'] text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Scheduled Maintenance in Progress
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            {customMessage ||
              'We are currently upgrading our cloud infrastructure and services to serve you better. Please contact our technical desk directly for urgent assistance, billing support, or software demos.'}
          </p>

          {/* Urgent Assistance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 text-left">
            <a
              href={`tel:${COMPANY_INFO.primaryPhone}`}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all group cursor-pointer block"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-['JetBrains_Mono'] text-slate-400 uppercase tracking-wider">Direct Hotline</div>
              <div className="text-xs font-bold text-white mt-0.5 truncate">{COMPANY_INFO.primaryPhone}</div>
            </a>

            <a
              href={getWhatsAppUrl(COMPANY_INFO.primaryPhone, 'Hello Global InfoSoft, I am contacting during maintenance for urgent software assistance.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all group cursor-pointer block"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-['JetBrains_Mono'] text-slate-400 uppercase tracking-wider">WhatsApp Support</div>
              <div className="text-xs font-bold text-white mt-0.5 truncate">Instant Chat</div>
            </a>

            <a
              href={`mailto:${COMPANY_INFO.contactEmail}`}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all group cursor-pointer block"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-['JetBrains_Mono'] text-slate-400 uppercase tracking-wider">Email Helpdesk</div>
              <div className="text-xs font-bold text-white mt-0.5 truncate">{COMPANY_INFO.contactEmail}</div>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Client database backups &amp; licenses remain fully secure and operational.</span>
          </div>
        </motion.div>
      </main>

      {/* Footer bar */}
      <footer className="p-6 text-center text-xs text-slate-400 border-t border-slate-800/80 relative z-10 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto w-full gap-2">
        <span>© {new Date().getFullYear()} Global InfoSoft. All rights reserved. Floor 2, Dayal Apartment, Dimna Road, Mango, Jamshedpur.</span>
        <button
          onClick={onOpenAdmin}
          className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Staff Login</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </footer>
    </div>
  );
};
