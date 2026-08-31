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
  MessageSquare,
  UserCheck,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Architectural Rigor',
      desc: 'We prioritize clean, maintainable, self-documenting codebases built with strict types and robust engineering patterns.'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Security',
      desc: 'Role-based access control (RBAC), end-to-end data encryption, and regular security audits safeguard client trust.'
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      desc: 'High-speed execution with bi-weekly working sprint deliveries, automated testing, and dependable delivery cycles.'
    },
    {
      icon: Award,
      title: 'Client-Centric Support',
      desc: 'Dedicated technical assistance, direct leadership access, and continuous software maintenance support.'
    }
  ];

  return (
    <section id="about" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Abstract Blur Shape */}
      <div className="abstract-shape w-[500px] h-[500px] top-1/2 -left-24 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BrandLogo size={18} />
            <span>About Global InfoSofts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
            Delivering Enterprise Software & Engineering Excellence
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded in Jamshedpur with a commitment to engineering excellence, Global InfoSofts bridges the gap between intricate business requirements and modern software architecture.
          </p>
        </div>

        {/* 2-Column: Vision/Story + 3D Interactive Global Network Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                <span>Our Heritage & Mission</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                For over <strong>{COMPANY_INFO.yearsOfExperience}</strong>, Global InfoSofts has engineered custom software solutions, enterprise ERP/CRM platforms, retail billing POS systems, gemstone & jewelry software, and responsive web & mobile applications.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Based in Jamshedpur, Jharkhand, we work closely with businesses, retail chains, wholesalers, and healthcare institutions to build reliable digital tools that streamline day-to-day operations and accelerate growth.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl font-extrabold text-white font-['Outfit']">350+</div>
                  <div className="text-xs text-slate-400">Software Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-indigo-300 font-['Outfit']">150+</div>
                  <div className="text-xs text-slate-400">Satisfied Clients</div>
                </div>
              </div>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="p-4.5 rounded-2xl glass-card space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-bold text-white">{val.title}</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Interactive Tech Globe */}
          <div className="lg:col-span-6 flex flex-col justify-center rounded-3xl glass-panel border border-white/10 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
                Engineering & Technology Network
              </div>
              <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded-full glass-card">
                Jamshedpur Hub • Active
              </span>
            </div>

            <InteractiveTechGlobe className="w-full h-[380px]" />
          </div>
        </div>

        {/* Leadership & Locations Section */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] flex items-center gap-2.5">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Leadership & Locations :</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Executive leadership contacts and official corporate headquarters of Global Infosoft.
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-300 px-3 py-1 rounded-full glass-card shrink-0 w-fit">
              Official Contact Information
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CEO Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 mb-0.5">
                    Chief Executive Officer
                  </div>
                  <h4 className="text-xl font-bold text-white font-['Outfit']">Rajnish Kumar</h4>
                  <span className="text-xs font-semibold text-indigo-300">CEO</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[0].phone, WHATSAPP_MESSAGES.ceo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CEO on WhatsApp for enquiry"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-200 group-hover:text-white">+91-9431515806</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Enquiry
                  </span>
                </a>
                <a
                  href="mailto:kumarrajnish531@gmail.com"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-indigo-500/15 border border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-200 group-hover:text-white break-all">kumarrajnish531@gmail.com</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                Corporate Governance, Client Partnerships & Strategic Expansion
              </div>
            </Card3DTilt>

            {/* CTO Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 mb-0.5">
                    Chief Technology Officer
                  </div>
                  <h4 className="text-xl font-bold text-white font-['Outfit']">Manoj Mahato</h4>
                  <span className="text-xs font-semibold text-indigo-300">CTO</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <a
                  href={getWhatsAppUrl(LEADERSHIP_CONTACTS[1].phone, WHATSAPP_MESSAGES.cto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with CTO on WhatsApp for enquiry"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-200 group-hover:text-white">+91-9431515806</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Enquiry
                  </span>
                </a>
                <a
                  href="mailto:manoj@globalinfosofts.com"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-indigo-500/15 border border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-200 group-hover:text-white break-all">manoj@globalinfosofts.com</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                Software Engineering Architecture, ERP Solutions & Tech Strategy
              </div>
            </Card3DTilt>

            {/* Head Office Card */}
            <Card3DTilt intensity={8} className="p-6 rounded-2xl glass-card space-y-4 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 mb-0.5">
                    Corporate Headquarters
                  </div>
                  <h4 className="text-xl font-bold text-white font-['Outfit']">{HEAD_OFFICE.name}</h4>
                  <span className="text-xs font-semibold text-indigo-300">{HEAD_OFFICE.title}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.04] border border-white/5">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 leading-snug">{HEAD_OFFICE.address}</span>
                </div>
                <a
                  href={getWhatsAppUrl(HEAD_OFFICE.phone, WHATSAPP_MESSAGES.headOffice)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with Head Office on WhatsApp for enquiry"
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-slate-200 group-hover:text-white">+91-9431515806</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 opacity-80 group-hover:opacity-100 transition-opacity">
                    WhatsApp Enquiry
                  </span>
                </a>
                <a
                  href="mailto:kumarrajnish531@gmail.com"
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-indigo-500/15 border border-white/5 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-200 group-hover:text-white break-all">kumarrajnish531@gmail.com</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
                {HEAD_OFFICE.hours}
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </section>
  );
};
