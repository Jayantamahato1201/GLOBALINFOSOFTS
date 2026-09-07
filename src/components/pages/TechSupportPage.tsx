import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PRIMARY_ENQUIRY_EMAIL, getSupportTicketMailtoUrl } from '../../utils/email';
import {
  Sparkles,
  PhoneCall,
  MessageSquare,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Wifi,
  Printer,
  Share2,
  Smartphone,
  Cloud,
  HardDrive,
  Star,
  Quote,
  Clock,
  Award,
  Wrench,
  ChevronDown,
  ArrowRight,
  Play,
  Check,
  Lock,
  UserCheck,
  X,
  Send,
  Monitor
} from 'lucide-react';

interface TechSupportPageProps {
  onOpenContact: (scope?: string) => void;
}

type ServiceCategory = 'All' | 'Devices' | 'Network' | 'Security' | 'Software';

interface ServiceItem {
  id: string;
  category: 'Devices' | 'Network' | 'Security' | 'Software';
  title: string;
  icon: React.ElementType;
  desc: string;
  bullets: string[];
}

export const TechSupportPage: React.FC<TechSupportPageProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState(false);

  // Quick Support Ticket / Remote Help Modal State
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [selectedServiceForHelp, setSelectedServiceForHelp] = useState<string>('General Tech Issue');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    phone: '',
    email: '',
    anydeskId: '',
    deviceType: 'Windows PC / Laptop',
    issueDetails: ''
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleOpenHelpModal = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForHelp(serviceTitle);
    }
    setTicketSubmitted(false);
    setHelpModalOpen(true);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GIS-SPT-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedTicketId(newId);
    setTicketSubmitted(true);

    // Generate mailto link
    const mailtoUrl = getSupportTicketMailtoUrl({
      fullName: ticketForm.name,
      email: ticketForm.email || 'N/A',
      category: `${selectedServiceForHelp} (${ticketForm.deviceType})`,
      priority: 'Urgent (Tech Support)',
      ticketId: newId,
      description: `AnyDesk ID: ${ticketForm.anydeskId || 'N/A'}\nPhone: ${ticketForm.phone}\nIssue: ${ticketForm.issueDetails}`
    });

    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = mailtoUrl;
    }
  };

  // 8 Services
  const services: ServiceItem[] = [
    {
      id: 'virus-removal',
      category: 'Security',
      title: 'Virus & Malware Removal',
      icon: ShieldCheck,
      desc: 'Complete scan, threat elimination & system hardening.',
      bullets: ['Deep malware scan', 'Ransomware protection', 'Real-time defense setup']
    },
    {
      id: 'os-troubleshooting',
      category: 'Software',
      title: 'OS Troubleshooting',
      icon: Monitor,
      desc: 'Fix crashes, freeze issues, boot loops & sluggishness.',
      bullets: ['Windows 10/11 & macOS', 'Driver updates & registry fix', 'Startup optimization']
    },
    {
      id: 'wifi-optimization',
      category: 'Network',
      title: 'Wi-Fi Optimization',
      icon: Wifi,
      desc: 'Stronger signal, fewer dropouts, faster speeds.',
      bullets: ['Speed optimization', 'Dead zone elimination', 'Security setup']
    },
    {
      id: 'printer-setup',
      category: 'Devices',
      title: 'Printer Setup / Fix',
      icon: Printer,
      desc: 'Install drivers & fix queues for any printer brand.',
      bullets: ['Driver installation', 'Network printing', 'Queue management']
    },
    {
      id: 'remote-access',
      category: 'Network',
      title: 'Remote Access Setup',
      icon: Share2,
      desc: 'Secure, monitored remote access for work from anywhere.',
      bullets: ['VPN setup', 'Remote desktop', 'Security protocols']
    },
    {
      id: 'device-repair',
      category: 'Devices',
      title: 'Device Repair',
      icon: Smartphone,
      desc: 'Laptop / Desktop / Mobile hardware and software repairs.',
      bullets: ['Screen repair', 'Battery replacement', 'Data transfer']
    },
    {
      id: 'cloud-backup',
      category: 'Software',
      title: 'Cloud Backup & Sync',
      icon: Cloud,
      desc: 'Never lose your files with automated cloud backups.',
      bullets: ['Auto backup', 'Cross-device sync', 'Version history']
    },
    {
      id: 'data-recovery',
      category: 'Security',
      title: 'Data Recovery',
      icon: HardDrive,
      desc: 'Recover lost files from crashed drives and devices.',
      bullets: ['Drive recovery', 'File restoration', 'Forensic analysis']
    }
  ];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  // Reviews
  const reviews = [
    {
      text: 'They fixed my network issues in under 30 minutes. Incredible service and very patient with my questions!',
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      initial: 'S'
    },
    {
      text: 'My laptop was running so slow I thought I needed a new one. They optimized it and now it is faster than ever!',
      name: 'Michael Chen',
      role: 'Remote Worker',
      initial: 'M'
    },
    {
      text: 'Lost all my design files to a virus. They recovered everything and set up proper backups. Lifesavers!',
      name: 'Emily Rodriguez',
      role: 'Freelance Designer',
      initial: 'E'
    }
  ];

  // FAQs
  const faqs = [
    {
      q: 'How quickly will I get a response?',
      a: 'Our average initial response time is under 2 hours. For live chat and urgent priority tickets, a certified technician connects with you in as little as 5 to 15 minutes.'
    },
    {
      q: 'Do you offer remote sessions?',
      a: 'Yes! We use bank-grade 256-bit encrypted AnyDesk, TeamViewer, and secure remote desktop sessions where you can observe every step on your screen in real time.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major Credit/Debit Cards, UPI, Net Banking, Razorpay, Stripe, and PayPal for international clients. You only pay after diagnosis and clear quotation.'
    },
    {
      q: 'Is my data safe during remote sessions?',
      a: 'Absolutely. You retain 100% control, can terminate the session at any instant with a single click, and our technicians never access private folders without explicit verbal permission.'
    },
    {
      q: 'What if my problem cannot be fixed remotely?',
      a: 'If an issue stems from physical hardware failure, we provide comprehensive diagnostics, advise on components needed, or dispatch/recommend certified doorstep technician partners.'
    },
    {
      q: 'Do you support both Windows, Mac, and mobile devices?',
      a: 'Yes! We support Windows 10/11, macOS, Linux, iOS (iPhone/iPad), and Android, along with networking gear (Cisco, TP-Link, Netgear), printers, and POS systems.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#F8FAFC] dark:bg-[#07090F] text-slate-900 dark:text-white relative overflow-hidden w-full font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-300">
      {/* Background ambient lighting matching Contact Us, Blog & About */}
      <div className="absolute top-20 -left-32 w-[550px] h-[550px] bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8 sm:space-y-12">

        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION - MATCHING BLOG / CONTACT US HEADER CARD */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] p-6 sm:p-8 lg:p-10 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-300"
        >
          {/* Subtle glowing circular accents inside banner */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Subtitle, Actions */}
            <div className="lg:col-span-7 space-y-4">
              {/* Live Status Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
                <span>24/7 Live Tech Support Available</span>
              </motion.div>

              {/* Bold Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Sora'] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400 tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(56,189,248,0.25)]">
                  TECH SUPPORT
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Sora'] text-slate-900 dark:text-white mt-1 transition-colors">
                  Made Simple &amp; Instant
                </h2>
              </motion.div>

              {/* Subtitle / Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal transition-colors"
              >
                From virus removal and system optimization to network troubleshooting — get certified expert help in minutes, not days. Any device, any problem, solved fast.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  onClick={() => handleOpenHelpModal('General Tech Support')}
                  className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-['Sora'] text-xs sm:text-sm shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 hover:shadow-cyan-500/30 active:scale-95 transition-all cursor-pointer"
                >
                  Get Help Now
                </button>

                <a
                  href={getWhatsAppUrl(COMPANY_INFO.primaryPhone, WHATSAPP_MESSAGES.support)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-[#00C980] hover:bg-[#00b573] text-white font-bold font-['Sora'] text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Live Chat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${COMPANY_INFO.primaryPhone.replace(/\D/g, '')}`}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-[#0B0F19]/90 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200 text-xs inline-flex items-center gap-2.5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">Call us now</div>
                    <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                      {COMPANY_INFO.primaryPhone}
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* Stats Ribbon underneath buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 font-mono transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                  <span className="font-bold text-slate-900 dark:text-white">40K+</span>
                  <span className="text-slate-500 dark:text-slate-400">Happy Clients</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-slate-900 dark:text-white">1M+</span>
                  <span className="text-slate-500 dark:text-slate-400">Issues Resolved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-slate-900 dark:text-white">&lt; 2hr</span>
                  <span className="text-slate-500 dark:text-slate-400">Avg Response Time</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Card with Overlays */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/90 shadow-2xl bg-slate-100 dark:bg-[#090D18] aspect-[4/3] sm:aspect-[16/11] transition-colors">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                  alt="Global Infosoft Technical Engineering and Remote Support Team"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90 dark:opacity-85 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#07090F] via-slate-950/20 dark:via-slate-950/30 to-transparent" />

                {/* Floating Badge Top-Left: "Issue Resolved! Just now" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <motion.div
                    animate={{ y: [-2, 3, -2] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white/95 dark:bg-[#090D18]/90 border border-emerald-300 dark:border-emerald-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg backdrop-blur-md transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-['Sora'] leading-tight">
                        Issue Resolved!
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Just now</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveVideoModal(true)}
                    aria-label="Watch how remote tech support works"
                    className="group relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-cyan-950/40 dark:shadow-cyan-950/60 transition-all cursor-pointer"
                  >
                    <span className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-ping pointer-events-none" />
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </motion.button>
                </div>

                {/* Floating Badge Bottom-Right: "Expert Online • Available now" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute bottom-4 right-4 z-10"
                >
                  <motion.div
                    animate={{ y: [3, -2, 3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white/95 dark:bg-[#090D18]/90 border border-cyan-300 dark:border-cyan-500/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg backdrop-blur-md transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-['Sora'] leading-tight">
                        Expert Online
                      </div>
                      <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                        Available now
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SECTION 2: STAT METRIC 4-CARD BAR */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            {
              icon: Star,
              fill: true,
              color: 'text-amber-500 dark:text-amber-400',
              bg: 'bg-amber-50 dark:bg-amber-500/10',
              border: 'border-amber-200 dark:border-amber-500/30',
              val: '40K+',
              label: 'Happy Customers'
            },
            {
              icon: Wrench,
              fill: false,
              color: 'text-cyan-600 dark:text-cyan-400',
              bg: 'bg-cyan-50 dark:bg-cyan-500/10',
              border: 'border-cyan-200 dark:border-cyan-500/30',
              val: '1M+',
              label: 'Issues Resolved'
            },
            {
              icon: Clock,
              fill: false,
              color: 'text-sky-600 dark:text-sky-400',
              bg: 'bg-sky-50 dark:bg-sky-500/10',
              border: 'border-sky-200 dark:border-sky-500/30',
              val: '< 2hr',
              label: 'Avg Response Time'
            },
            {
              icon: Award,
              fill: false,
              color: 'text-emerald-600 dark:text-emerald-400',
              bg: 'bg-emerald-50 dark:bg-emerald-500/10',
              border: 'border-emerald-200 dark:border-emerald-500/30',
              val: '99.9%',
              label: 'Satisfaction Rate'
            }
          ].map((metric, idx) => {
            const IconC = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-500/40 shadow-md dark:shadow-xl text-center space-y-2 transition-all backdrop-blur-md"
              >
                <div className={`w-10 h-10 rounded-xl ${metric.bg} ${metric.border} border mx-auto flex items-center justify-center ${metric.color}`}>
                  <IconC className={`w-5 h-5 ${metric.fill ? 'fill-current' : ''}`} />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
                  {metric.val}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* SECTION 3: ANY TECHNOLOGY ISSUE, SOLVED */}
        {/* ========================================================================= */}
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 transition-colors">
              <Wrench className="w-3.5 h-3.5" />
              <span>Comprehensive Services</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
              Any Technology Issue,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400">
                Solved
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
              From simple glitches to complex business networks — our certified technicians handle it all with care, precision, and speed.
            </p>
          </motion.div>

          {/* Filter Bar (Matching Blog / Pricing Pill Bar) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-2.5 rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-center gap-2 shadow-md dark:shadow-xl max-w-2xl mx-auto transition-colors"
          >
            {(['All', 'Devices', 'Network', 'Security', 'Software'] as ServiceCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold font-['Sora'] transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Services Grid (8 cards) */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left pt-2"
          >
            <AnimatePresence>
              {filteredServices.map((service, idx) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, y: 35, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.45,
                      delay: (idx % 4) * 0.08,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                    className="rounded-2xl p-5 bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-500/50 shadow-md dark:shadow-xl flex flex-col justify-between transition-all group backdrop-blur-md"
                  >
                    <div className="space-y-3.5">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-400 dark:group-hover:border-cyan-500/60 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-1">
                        <h3 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[34px] transition-colors">
                          {service.desc}
                        </p>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        {service.bullets.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 transition-colors"
                          >
                            <div className="w-3.5 h-3.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-400 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Link */}
                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <button
                        onClick={() => handleOpenHelpModal(service.title)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 dark:bg-slate-900/80 dark:hover:bg-gradient-to-r dark:hover:from-cyan-500 dark:hover:to-blue-600 border border-slate-200 dark:border-slate-700/80 hover:border-transparent text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white text-xs font-bold font-['Sora'] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>Request Support</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: HOW IT WORKS: GET HELP IN 3 SIMPLE STEPS */}
        {/* ========================================================================= */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Streamlined Process</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
              Get Help in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400">
                3 Simple Steps
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                num: '1',
                icon: MessageSquare,
                title: '1. Describe Your Issue',
                desc: 'Tell us what is wrong via chat, call, or ticket form. No technical jargon needed!',
                bg: 'bg-gradient-to-r from-cyan-500 to-blue-600'
              },
              {
                num: '2',
                icon: Headphones,
                title: '2. Connect With Expert',
                desc: 'Get matched with a certified technician who specializes in your specific operating system or network.',
                bg: 'bg-cyan-600'
              },
              {
                num: '3',
                icon: CheckCircle2,
                title: '3. Problem Solved',
                desc: 'Watch your issue get resolved in real-time with our secure, monitored remote access session.',
                bg: 'bg-emerald-600'
              }
            ].map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-cyan-400 dark:hover:border-cyan-500/40 text-center space-y-3 shadow-md dark:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${step.bg} text-white mx-auto flex items-center justify-center shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: CUSTOMER STORIES: LOVED BY 40,000+ CUSTOMERS */}
        {/* ========================================================================= */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2 max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 transition-colors">
              <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
              <span>Customer Satisfaction</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
              Loved by{' '}
              <span className="text-amber-500 dark:text-amber-400">
                40,000+
              </span>{' '}
              Customers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto text-left">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2 } }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 hover:border-amber-400 dark:hover:border-amber-500/40 shadow-md dark:shadow-xl flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 dark:text-amber-400 text-sm gap-0.5">★★★★★</div>
                    <Quote className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic transition-colors">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {rev.initial}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-['Sora'] transition-colors">
                      {rev.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors">
                      {rev.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 6: FAQS ACCORDION */}
        {/* ========================================================================= */}
        <div className="space-y-6 max-w-3xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.07,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="rounded-2xl bg-white dark:bg-[#0B0F19]/90 border border-slate-200/90 dark:border-slate-800/80 overflow-hidden transition-all shadow-sm dark:shadow-lg hover:border-cyan-400 dark:hover:border-cyan-500/30"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-cyan-600 dark:text-cyan-400"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 transition-colors">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 7: WHY TRUST US WITH YOUR TECH? */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] shadow-xl dark:shadow-2xl space-y-6 text-center transition-colors"
        >
          <div className="max-w-2xl mx-auto space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Sora'] text-slate-900 dark:text-white tracking-tight transition-colors">
              Why Trust Us With Your Tech?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors">
              Security, certified expertise, and prompt customer satisfaction are our uncompromising standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-center">
            {[
              {
                icon: UserCheck,
                color: 'text-cyan-600 dark:text-cyan-400',
                bg: 'bg-cyan-50 dark:bg-cyan-950/80',
                border: 'border-cyan-200 dark:border-cyan-800/50',
                title: 'Vetted Experts',
                desc: 'All engineers are certified, experienced, and background-checked.'
              },
              {
                icon: Clock,
                color: 'text-sky-600 dark:text-sky-400',
                bg: 'bg-sky-50 dark:bg-sky-950/80',
                border: 'border-sky-200 dark:border-sky-800/50',
                title: 'Fast Response',
                desc: 'Average response time under 2 hours, 24/7 round the clock.'
              },
              {
                icon: Lock,
                color: 'text-emerald-600 dark:text-emerald-400',
                bg: 'bg-emerald-50 dark:bg-emerald-950/80',
                border: 'border-emerald-200 dark:border-emerald-800/50',
                title: 'Bank-Grade Security',
                desc: 'End-to-end 256-bit encryption protects all your files and credentials.'
              },
              {
                icon: Award,
                color: 'text-amber-600 dark:text-amber-400',
                bg: 'bg-amber-50 dark:bg-amber-950/80',
                border: 'border-amber-200 dark:border-amber-800/50',
                title: 'Satisfaction Guarantee',
                desc: 'Not fully satisfied? We will re-diagnose free or offer a full refund.'
              }
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-4 rounded-xl bg-white dark:bg-[#090D18]/90 border border-slate-200/90 dark:border-slate-800/80 space-y-2 hover:border-cyan-400 dark:hover:border-cyan-500/40 shadow-sm dark:shadow-none transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.border} border ${item.color} mx-auto flex items-center justify-center`}>
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL: INSTANT TECH SUPPORT TICKET & ANYDESK CONNECT */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {helpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0B0F19] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden text-left transition-colors"
            >
              {/* Close Button */}
              <button
                onClick={() => setHelpModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!ticketSubmitted ? (
                <>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      <Headphones className="w-3.5 h-3.5" />
                      <span>{selectedServiceForHelp}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
                      Request Live Assistance
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">
                      Our certified engineers will connect directly to diagnose &amp; resolve your issue.
                    </p>
                  </div>

                  <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 transition-colors">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 transition-colors">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={ticketForm.phone}
                          onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                          placeholder="+91 94315 15806"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 transition-colors">AnyDesk / TeamViewer ID</label>
                        <input
                          type="text"
                          value={ticketForm.anydeskId}
                          onChange={(e) => setTicketForm({ ...ticketForm, anydeskId: e.target.value })}
                          placeholder="e.g. 1 234 567 890"
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1 transition-colors">Brief Description of Issue *</label>
                      <textarea
                        required
                        rows={3}
                        value={ticketForm.issueDetails}
                        onChange={(e) => setTicketForm({ ...ticketForm, issueDetails: e.target.value })}
                        placeholder="e.g. Printer queue is stuck and Wi-Fi disconnects frequently during meetings..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-['Sora'] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Live Help Request</span>
                      </button>

                      <a
                        href={getWhatsAppUrl(
                          COMPANY_INFO.primaryPhone,
                          `Hi Global Infosoft, I need help with ${selectedServiceForHelp}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#00C980] hover:bg-[#00b573] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/40"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-['Sora'] text-slate-900 dark:text-white transition-colors">
                      Help Request Dispatched!
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto transition-colors">
                      Your ticket ID is{' '}
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{generatedTicketId}</span>.
                      Our on-call technician has received your notification.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 transition-colors">
                    Need immediate emergency resolution? Call us right now at{' '}
                    <a href={`tel:${COMPANY_INFO.primaryPhone}`} className="text-cyan-600 dark:text-cyan-400 font-bold underline">
                      {COMPANY_INFO.primaryPhone}
                    </a>
                  </div>
                  <button
                    onClick={() => setHelpModalOpen(false)}
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold cursor-pointer text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 dark:bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] p-6 shadow-2xl relative space-y-4 text-left transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm font-['Sora'] transition-colors">
                    How Remote Assistance Works
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideoModal(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900 dark:bg-black flex flex-col items-center justify-center p-6 text-center space-y-3 border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 rounded-full bg-cyan-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                  <Play className="w-6 h-6 fill-cyan-400" />
                </div>
                <div className="text-white font-bold text-sm font-['Sora']">
                  Live Screen Share &amp; Encrypted AnyDesk Remote Session
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-400 max-w-md leading-relaxed">
                  Our certified engineers establish a one-time, secure 256-bit encrypted connection. You see every mouse movement in real time and can disconnect at any millisecond.
                </p>
                <button
                  onClick={() => {
                    setActiveVideoModal(false);
                    handleOpenHelpModal('Remote Screen Assistance');
                  }}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold font-['Sora'] cursor-pointer shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-colors"
                >
                  Start Remote Assistance Session
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
