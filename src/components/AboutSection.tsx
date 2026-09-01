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
  UserCheck
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Reliable Engineering',
      desc: 'We build dependable desktop and web software using proven databases and maintainable architectures.'
    },
    {
      icon: ShieldCheck,
      title: 'Data Security & Ownership',
      desc: 'Complete database ownership with zero vendor lock-in and automated regular backups.'
    },
    {
      icon: Zap,
      title: 'Fast Deployment',
      desc: 'Rapid installation and setup with on-site staff training and streamlined workflow transitions.'
    },
    {
      icon: Award,
      title: 'Dedicated Support',
      desc: 'Prompt local support in Jamshedpur with direct WhatsApp and AnyDesk remote assistance.'
    }
  ];

  return (
    <section id="about" className="relative py-24 mesh-bg border-t border-slate-200/80 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape-blue w-[500px] h-[500px] top-1/3 -left-24 animate-pulse-glow" />
      <div className="abstract-shape-pink w-[450px] h-[450px] bottom-10 -right-20 animate-pulse-glow" style={{ animationDelay: '-3.5s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3 text-left">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider border-cyan-500/30">
            <BrandLogo size={18} />
            <span>About Global InfoSoft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            Software Development & IT Solutions Since 2014
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded in Jamshedpur, Jharkhand, Global InfoSoft delivers specialized software solutions, GST billing software, institutional portals, and corporate websites for businesses.
          </p>
        </div>

        {/* 2-Column: Vision/Story + 3D Interactive Global Network Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 text-left">
          {/* Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 space-y-4 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Our Story & Mission</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                For over <strong>{COMPANY_INFO.yearsOfExperience}</strong>, Global InfoSoft has engineered custom software solutions, retail billing & POS systems, optical shop management software, school ERP portals, and modern responsive websites.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Based in Jamshedpur, Jharkhand, we work closely with local businesses, retail chains, wholesalers, and educational institutions to build reliable digital tools that streamline day-to-day operations and accelerate growth.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80 dark:border-white/10">
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">200+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Software Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-300 font-['Outfit']">150+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Satisfied Clients</div>
                </div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                const valueThemes = [
                  'bg-cyan-500/15 border-cyan-500/30 text-cyan-600 dark:text-cyan-300',
                  'bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-300',
                  'bg-pink-500/15 border-pink-500/30 text-pink-600 dark:text-pink-300',
                  'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-lime-300'
                ];
                return (
                  <div key={idx} className="p-4.5 rounded-2xl glass-card space-y-2 text-left">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${valueThemes[idx % 4]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Interactive Tech Globe */}
          <div className="lg:col-span-6 flex flex-col justify-center rounded-3xl glass-panel border border-slate-200/80 dark:border-white/10 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider">
                Technology Network
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full glass-card">
                Jamshedpur Hub • Active
              </span>
            </div>

            <InteractiveTechGlobe className="w-full h-[380px]" />
          </div>
        </div>

        {/* Leadership & Locations Section */}
        <div className="space-y-6 pt-4 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/10 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Outfit'] flex items-center gap-2.5">
                <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span>Leadership & Headquarters</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Executive leadership contacts and official corporate office of Global InfoSoft Jamshedpur.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-full glass-card shrink-0 w-fit border-cyan-500/20">
              Direct Verified Contacts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CEO Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-0.5">
                    Chief Executive Officer
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Rajnish Kumar</h4>
                  <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">CEO & Founder</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[0].phone, WHATSAPP_MESSAGES.ceo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CEO on WhatsApp"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{LEADERSHIP_CONTACTS[0].phone}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Direct
                  </span>
                </a>
                <a
                  href={`mailto:${LEADERSHIP_CONTACTS[0].email}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-500/15 border border-slate-200 dark:border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-white break-all">{LEADERSHIP_CONTACTS[0].email}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                Software Solutions, Client Partnerships & Management
              </div>
            </Card3DTilt>

            {/* CTO Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-0.5">
                    Chief Technology Officer
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Manoj Mahato</h4>
                  <span className="text-xs font-semibold text-sky-700 dark:text-sky-300">CTO</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-300">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[1].phone, WHATSAPP_MESSAGES.cto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CTO on WhatsApp"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{LEADERSHIP_CONTACTS[1].phone}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Direct
                  </span>
                </a>
                <a
                  href={`mailto:${LEADERSHIP_CONTACTS[1].email}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-sky-500/15 border border-slate-200 dark:border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-white break-all">{LEADERSHIP_CONTACTS[1].email}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                Software Architecture, Database Systems & Support
              </div>
            </Card3DTilt>

            {/* Head Office Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-lime-400 mb-0.5">
                    Corporate Headquarters
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">{HEAD_OFFICE.name}</h4>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-lime-300">{HEAD_OFFICE.title}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-lime-300">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 pt-2">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-lime-400 shrink-0 mt-0.5" />
                  <span className="text-slate-900 dark:text-slate-200 leading-snug">{HEAD_OFFICE.address}</span>
                </div>
                <a
                  href={getWhatsAppUrl(HEAD_OFFICE.phone, WHATSAPP_MESSAGES.headOffice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with Head Office on WhatsApp"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-emerald-500/15 border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-white">{HEAD_OFFICE.phone}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Direct
                  </span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.contactEmail}`}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-cyan-500/15 border border-slate-200 dark:border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-900 dark:text-slate-200 group-hover:text-cyan-700 dark:group-hover:text-white break-all">{COMPANY_INFO.contactEmail}</span>
                </a>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {HEAD_OFFICE.hours}
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
};
