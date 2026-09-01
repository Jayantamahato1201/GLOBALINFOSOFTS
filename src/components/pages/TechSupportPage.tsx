import React, { useState } from 'react';
import { COMPANY_INFO } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PRIMARY_ENQUIRY_EMAIL, getSupportTicketMailtoUrl } from '../../utils/email';
import { FaqSection } from '../FaqSection';
import {
  HelpCircle,
  PhoneCall,
  Mail,
  Clock,
  CheckCircle2,
  Send,
  Monitor,
  ExternalLink,
  Phone
} from 'lucide-react';

interface TechSupportPageProps {
  onOpenContact: (scope?: string) => void;
}

export const TechSupportPage: React.FC<TechSupportPageProps> = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    softwareProduct: 'Retail POS / ERP',
    urgency: 'Standard (within 24 hours)',
    issueDescription: ''
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `GIS-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newId);
    setTicketSubmitted(true);

    const mailtoUrl = getSupportTicketMailtoUrl({
      fullName: ticketData.name,
      email: ticketData.email,
      category: ticketData.softwareProduct,
      priority: ticketData.urgency,
      ticketId: newId,
      description: ticketData.issueDescription
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
  };

  return (
    <div className="pt-28 pb-20 mesh-bg min-h-screen relative overflow-hidden w-full transition-colors duration-300">
      <div className="abstract-shape-blue w-[500px] h-[500px] top-1/4 -left-20 animate-pulse-glow" />
      <div className="abstract-shape-pink w-[450px] h-[450px] bottom-1/4 -right-20 animate-pulse-glow" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider font-mono border-cyan-500/30">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Dedicated Technical & Software Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
            Global InfoSoft Tech Support Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            We provide software maintenance, database backups, printer troubleshooting, and remote AnyDesk assistance for all our installed client systems in Jamshedpur.
          </p>
        </div>

        {/* SLA and Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 space-y-4 project-card-gradient">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Prompt SLA Support</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Every production accounting system, POS client, and custom web application comes with reliable technical backup and rapid response.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-cyan-700 dark:text-cyan-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Warranty & Maintenance Included</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 space-y-4 project-card-gradient">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">AnyDesk / Remote Assistance</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Immediate screen-share and remote troubleshooting for POS terminals, database backup restoration, barcode scanner setup, and thermal printers.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Direct Screen-Share Support</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 space-y-4 project-card-gradient">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Direct Support Line</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Need urgent help? Connect directly with our software specialists in Jamshedpur via phone or WhatsApp.
            </p>
            <div className="pt-2 space-y-1">
              <a
                href={getWhatsAppUrl(COMPANY_INFO.salesPhone, WHATSAPP_MESSAGES.support)}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to message Support on WhatsApp"
                className="text-xs font-mono text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1.5"
              >
                <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.supportEmail}`}
                className="text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white block"
              >
                {COMPANY_INFO.supportEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200/80 dark:border-white/15 max-w-4xl mx-auto space-y-6 text-left shadow-xl">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Outfit']">Submit a Technical Support Request</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Our support team will review your request and provide quick remote or on-site resolution.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Support Request Logged</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
                  Ticket <strong className="text-cyan-600 dark:text-cyan-300 font-mono">#{ticketId}</strong> has been formatted and queued for review. Details dispatched to <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">{PRIMARY_ENQUIRY_EMAIL}</span>.
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto text-slate-700 dark:text-slate-300">
                <div><span className="text-slate-500 dark:text-slate-400">Name:</span> <strong className="text-slate-900 dark:text-white">{ticketData.name}</strong></div>
                <div><span className="text-slate-500 dark:text-slate-400">Email:</span> <strong className="text-slate-900 dark:text-white">{ticketData.email}</strong></div>
                <div><span className="text-slate-500 dark:text-slate-400">Product:</span> <span className="text-cyan-600 dark:text-cyan-300">{ticketData.softwareProduct}</span></div>
                <div><span className="text-slate-500 dark:text-slate-400">Priority:</span> <span className="text-amber-600 dark:text-amber-300">{ticketData.urgency}</span></div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <a
                  href={getSupportTicketMailtoUrl({
                    fullName: ticketData.name,
                    email: ticketData.email,
                    category: ticketData.softwareProduct,
                    priority: ticketData.urgency,
                    ticketId: ticketId,
                    description: ticketData.issueDescription
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Send Ticket via Email Client</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={getWhatsAppUrl(COMPANY_INFO.salesPhone, `Hello, I submitted support ticket #${ticketId} for ${ticketData.softwareProduct}. Name: ${ticketData.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp Support</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setTicketData({ ...ticketData, issueDescription: '' });
                  }}
                  className="px-4 py-2 rounded-xl glass-card text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                    placeholder="Your Name / Store Name"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={ticketData.email}
                    onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                    placeholder="your-email@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Software Product / System</label>
                  <select
                    value={ticketData.softwareProduct}
                    onChange={(e) => setTicketData({ ...ticketData, softwareProduct: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/50 bg-white dark:bg-slate-900"
                  >
                    <option value="Retail POS / Billing">Retail POS & Billing Software</option>
                    <option value="Optical Store Software">Optical Store Software</option>
                    <option value="School Management ERP">School Management ERP</option>
                    <option value="Restaurant Billing POS">Restaurant Billing POS</option>
                    <option value="Gemstone / Jewelry Software">Gemstone / Jewelry Software</option>
                    <option value="Custom Web / Mobile App">Custom Web or Mobile App</option>
                    <option value="GST Accounting Software">GST Accounting Software</option>
                    <option value="Other">Other / General Technical Query</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Priority Level</label>
                  <select
                    value={ticketData.urgency}
                    onChange={(e) => setTicketData({ ...ticketData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500/50 bg-white dark:bg-slate-900"
                  >
                    <option value="Low">Low (General inquiry)</option>
                    <option value="Standard">Standard (Within 24 hours)</option>
                    <option value="High">High (Billing / Store counter stopped)</option>
                    <option value="Critical">Critical Issue (Immediate escalation)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-700 dark:text-slate-300 font-medium">Issue Description & Details</label>
                <textarea
                  rows={4}
                  required
                  value={ticketData.issueDescription}
                  onChange={(e) => setTicketData({ ...ticketData, issueDescription: e.target.value })}
                  placeholder="Describe the error, screen message, or support request..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Technical Support Request</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQs Section */}
        <div className="pt-8">
          <FaqSection />
        </div>
      </div>
    </div>
  );
};
