import React from 'react';
import { COMPANY_INFO, LEADERSHIP_CONTACTS, HEAD_OFFICE } from '../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import { BrandLogo } from './BrandLogo';
import { InteractiveTechGlobe } from './3d/InteractiveTechGlobe';
import { Card3DTilt } from './3d/Card3DTilt';
import {
  ShieldCheck,
  Zap,
  Target,
  Users,
  Compass,
  Award,
  Building2,
  MapPin,
  Mail,
  Phone,
  UserCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Reliable Engineering',
      desc: 'Proven databases and maintainable architectures engineered for business uptime.'
    },
    {
      icon: ShieldCheck,
      title: 'Data Security & Ownership',
      desc: '100% database & IP control with zero lock-in and automated backups.'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      desc: 'Turnkey on-site installation, seamless data migration, and full staff training.'
    },
    {
      icon: Award,
      title: 'Dedicated Support',
      desc: 'Prompt local support in Jamshedpur with direct WhatsApp and AnyDesk remote help.'
    }
  ];

  return (
    <div id="about" className="w-full relative transition-colors duration-300">
      {/* Background ambient accents */}
      <div className="absolute abstract-shape-blue w-[350px] h-[350px] top-6 -left-20 animate-pulse-glow opacity-50 pointer-events-none" />
      <div className="absolute abstract-shape-pink w-[300px] h-[300px] top-36 -right-20 animate-pulse-glow opacity-50 pointer-events-none" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-3">
        {/* Top Header - Compact and Top-Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 text-left pb-1 border-b border-slate-200/80 dark:border-white/10">
          <div className="max-w-3xl space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold uppercase tracking-wider border-cyan-500/30">
              <BrandLogo size={13} />
              <span>About Global InfoSoft</span>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">Est. 2014</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-tight">
              Software Engineering & Regional IT Leadership
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Based in Jamshedpur, Jharkhand, Global InfoSoft architects custom ERPs, GST billing solutions, institutional portals, and modern web applications for over 150+ growing businesses.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 px-2.5 py-1 rounded-full glass-card border-cyan-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Jamshedpur HQ • Active Operations</span>
            </span>
          </div>
        </div>

        {/* Top Bento Grid: Mission & Stats & Values (Left) + 3D Tech Globe (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 text-left">
          {/* Left Column (7 cols): Story, Stats & 4 Core Values */}
          <div className="lg:col-span-7 space-y-2.5">
            {/* Story Card with Stats Bar */}
            <div className="p-3 sm:p-3.5 rounded-xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Our Story & Mission</span>
                </h2>
                <span className="text-[9.5px] font-mono text-slate-500 dark:text-slate-400">
                  {COMPANY_INFO.yearsOfExperience} in Enterprise Tech
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                We engineer reliable, scalable desktop and cloud software that automates complex billing, multi-branch inventory, and accounting workflows. We believe in complete transparency, direct human support, and zero vendor lock-in for your data.
              </p>

              {/* 4 Stats Inline Ribbon */}
              <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-slate-200/80 dark:border-white/10 text-center">
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                  <div className="text-sm sm:text-base font-extrabold text-cyan-600 dark:text-cyan-400 font-['Outfit']">10+</div>
                  <div className="text-[9px] text-slate-600 dark:text-slate-400 font-medium">Years Active</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-['Outfit']">200+</div>
                  <div className="text-[9px] text-slate-600 dark:text-slate-400 font-medium">Deployments</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                  <div className="text-sm sm:text-base font-extrabold text-cyan-600 dark:text-cyan-400 font-['Outfit']">150+</div>
                  <div className="text-[9px] text-slate-600 dark:text-slate-400 font-medium">Active Clients</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
                  <div className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit']">100%</div>
                  <div className="text-[9px] text-slate-600 dark:text-slate-400 font-medium">Data Control</div>
                </div>
              </div>
            </div>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {values.map((val, idx) => {
                const Icon = val.icon;
                const valueThemes = [
                  'bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-300',
                  'bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-300',
                  'bg-pink-500/15 border-pink-500/30 text-pink-600 dark:text-pink-300',
                  'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-lime-300'
                ];
                return (
                  <div key={idx} className="p-2 sm:p-2.5 rounded-xl glass-card space-y-1 text-left border border-slate-200/70 dark:border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${valueThemes[idx % 4]}`}>
                        <Icon className="w-2.5 h-2.5" />
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{val.title}</div>
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): 3D Globe + Key Delivery Guarantees */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl glass-panel border border-slate-200/80 dark:border-white/10 p-3 shadow-sm relative overflow-hidden space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[10.5px] font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider font-mono">
                Technology Delivery Hub
              </div>
              <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full glass-card border border-emerald-500/20">
                Live Interactive Globe
              </span>
            </div>

            <InteractiveTechGlobe className="w-full h-[155px] sm:h-[175px]" />

            <div className="pt-1.5 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>On-Site Deployment</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Multi-Device Sync</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>GST E-Way & Invoicing</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>6-Month Free Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Verified Contacts (3 Compact Cards Side-by-Side) */}
        <div className="space-y-1.5 pt-1 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200/80 dark:border-white/10 pb-1">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">
                Leadership & Verified Direct Contacts
              </h3>
            </div>
            <span className="text-[9px] font-mono text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full glass-card shrink-0 w-fit border-cyan-500/20">
              Direct Verified Phone & WhatsApp
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* CEO Card */}
            <Card3DTilt intensity={6} className="p-3 rounded-xl glass-card space-y-1.5 transition-all border border-slate-200/70 dark:border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[8px] font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-0.5">
                    Chief Executive Officer
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">Rajnish Kumar</h4>
                  <span className="text-[10.5px] font-semibold text-cyan-700 dark:text-cyan-300">CEO & Founder</span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                  <UserCheck className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pt-0.5">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[0].phone, WHATSAPP_MESSAGES.ceo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CEO on WhatsApp"
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10.5px] text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{LEADERSHIP_CONTACTS[0].phone}</span>
                  </div>
                  <span className="text-[8px] text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 opacity-90 group-hover:opacity-100 transition-opacity">
                    WhatsApp
                  </span>
                </a>
                <a
                  href={`mailto:${LEADERSHIP_CONTACTS[0].email}`}
                  className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-500/15 border border-slate-200 dark:border-white/5 transition-colors group"
                >
                  <Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-white break-all">{LEADERSHIP_CONTACTS[0].email}</span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-200/80 dark:border-white/10 text-[8.5px] text-slate-500 dark:text-slate-400">
                Software Solutions, Client Partnerships & Management
              </div>
            </Card3DTilt>

            {/* CTO Card */}
            <Card3DTilt intensity={6} className="p-3 rounded-xl glass-card space-y-1.5 transition-all border border-slate-200/70 dark:border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[8px] font-mono font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-0.5">
                    Chief Technology Officer
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">Manoj Mahato</h4>
                  <span className="text-[10.5px] font-semibold text-sky-700 dark:text-sky-300">CTO</span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
                  <Zap className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pt-0.5">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[1].phone, WHATSAPP_MESSAGES.cto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CTO on WhatsApp"
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10.5px] text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{LEADERSHIP_CONTACTS[1].phone}</span>
                  </div>
                  <span className="text-[8px] text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 opacity-90 group-hover:opacity-100 transition-opacity">
                    WhatsApp
                  </span>
                </a>
                <a
                  href={`mailto:${LEADERSHIP_CONTACTS[1].email}`}
                  className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-sky-500/15 border border-slate-200 dark:border-white/5 transition-colors group"
                >
                  <Mail className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-[10px] text-slate-900 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-white break-all">{LEADERSHIP_CONTACTS[1].email}</span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-200/80 dark:border-white/10 text-[8.5px] text-slate-500 dark:text-slate-400">
                Software Architecture, Database Systems & Support
              </div>
            </Card3DTilt>

            {/* Head Office Card */}
            <Card3DTilt intensity={6} className="p-3 rounded-xl glass-card space-y-1.5 transition-all border border-slate-200/70 dark:border-white/5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[8px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-lime-400 mb-0.5">
                    Corporate Headquarters
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-['Outfit']">{HEAD_OFFICE.name}</h4>
                  <span className="text-[10.5px] font-semibold text-emerald-700 dark:text-lime-300">{HEAD_OFFICE.title}</span>
                </div>
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-lime-300">
                  <Building2 className="w-3 h-3" />
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pt-0.5">
                <div className="flex items-start gap-1.5 p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-lime-400 shrink-0 mt-0.5" />
                  <span className="text-[10px] text-slate-900 dark:text-slate-200 leading-tight">{HEAD_OFFICE.address}</span>
                </div>
                <a
                  href={getWhatsAppUrl(HEAD_OFFICE.phone, WHATSAPP_MESSAGES.headOffice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with Head Office on WhatsApp"
                  className="flex items-center justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[10.5px] text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{HEAD_OFFICE.phone}</span>
                  </div>
                  <span className="text-[8px] text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 opacity-90 group-hover:opacity-100 transition-opacity">
                    WhatsApp
                  </span>
                </a>
              </div>

              <div className="pt-1 border-t border-slate-200/80 dark:border-white/10 text-[8.5px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                <span>{HEAD_OFFICE.hours}</span>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </div>
  );
};

