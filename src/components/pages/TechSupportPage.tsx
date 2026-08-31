import React, { useState } from 'react';
import { COMPANY_INFO, FAQS_DATA } from '../../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../../utils/whatsapp';
import { PRIMARY_ENQUIRY_EMAIL, getSupportTicketMailtoUrl } from '../../utils/email';
import { FaqSection } from '../FaqSection';
import {
  HelpCircle,
  PhoneCall,
  Mail,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Send,
  MessageSquare,
  AlertCircle,
  Monitor,
  ExternalLink,
  Phone
} from 'lucide-react';

interface TechSupportPageProps {
  onOpenContact: (scope?: string) => void;
}

export const TechSupportPage: React.FC<TechSupportPageProps> = ({ onOpenContact }) => {
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
    <div className="pt-24 pb-20 mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>24/7 Dedicated Technical & Development Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit']">
            Global InfoSofts Tech Support Hub
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We provide around-the-clock software maintenance, cloud telemetry, emergency bug fixes, and remote assistance for all deployed systems.
          </p>
        </div>

        {/* SLA and Support Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">24-Hour Guaranteed SLA</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Every production accounting system, ERP client, and custom web application comes with a guaranteed 24-hour response turnaround.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-indigo-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>6 Months Warranty Included</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">Remote Desk Assistance</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Immediate screen-share and remote troubleshooting for POS terminals, database migrations, thermal printers, and server upgrades.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-300 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Screen Support</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">Direct Engineering Hotline</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Need urgent escalation? Connect directly with our on-call systems engineers and dedicated account leads.
            </p>
            <div className="pt-2 space-y-1">
              <a
                href={getWhatsAppUrl(COMPANY_INFO.salesPhone, WHATSAPP_MESSAGES.support)}
                target="_blank"
                rel="noopener noreferrer"
                title="Click to message Support on WhatsApp"
                className="text-xs font-mono text-emerald-300 hover:text-emerald-200 hover:underline flex items-center gap-1.5"
              >
                <span>WhatsApp: {COMPANY_INFO.salesPhone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.supportEmail}`}
                className="text-xs font-mono text-slate-400 hover:text-white block"
              >
                {COMPANY_INFO.supportEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/15 max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-['Outfit']">Submit a Technical Support Ticket</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Our engineering support desk will review your diagnostic details and dispatch assistance promptly.
            </p>
          </div>

          {ticketSubmitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">Support Ticket Logged Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  Ticket <strong className="text-indigo-300 font-mono">#{ticketId}</strong> has been formatted and queued for review. Details dispatched to <span className="text-emerald-400 font-mono font-semibold">{PRIMARY_ENQUIRY_EMAIL}</span>.
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div><span className="text-slate-400">Name:</span> <strong className="text-white">{ticketData.name}</strong></div>
                <div><span className="text-slate-400">Email:</span> <strong className="text-white">{ticketData.email}</strong></div>
                <div><span className="text-slate-400">Product:</span> <span className="text-indigo-300">{ticketData.softwareProduct}</span></div>
                <div><span className="text-slate-400">Priority:</span> <span className="text-amber-300">{ticketData.urgency}</span></div>
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
                  className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Send Ticket via Email Client</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={getWhatsAppUrl(COMPANY_INFO.salesPhone, `Hello, I submitted support ticket #${ticketId} for ${ticketData.softwareProduct}. Name: ${ticketData.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-white font-semibold text-xs flex items-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Support</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setTicketSubmitted(false);
                    setTicketData({ ...ticketData, issueDescription: '' });
                  }}
                  className="px-4 py-2 rounded-xl glass-card text-xs text-slate-300 hover:text-white"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Your Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={ticketData.name}
                    onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                    placeholder="e.g. John Doe / Apex Retail"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={ticketData.email}
                    onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">System / Software Product</label>
                  <select
                    value={ticketData.softwareProduct}
                    onChange={(e) => setTicketData({ ...ticketData, softwareProduct: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-card text-xs text-white focus:outline-none focus:border-indigo-500/50 bg-slate-900"
                  >
                    <option value="Retail POS / Billing">Retail POS & Billing Software</option>
                    <option value="Optical Store POS">Optical Store Software</option>
                    <option value="Wholesale ERP">Wholesale & Distribution ERP</option>
                    <option value="Hotel & Restaurant ERP">Hotel & Restaurant ERP</option>
                    <option value="Hospital & Pharmacy System">Hospital & Pharmacy System</option>
                    <option value="Custom Web / Mobile App">Custom Web or Mobile App</option>
                    <option value="GST Accounting Software">GST Accounting Software</option>
                    <option value="Other">Other / General Technical Query</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Priority Level</label>
                  <select
                    value={ticketData.urgency}
                    onChange={(e) => setTicketData({ ...ticketData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-card text-xs text-white focus:outline-none focus:border-indigo-500/50 bg-slate-900"
                  >
                    <option value="Low">Low (General inquiry)</option>
                    <option value="Standard">Standard (Within 24 hours)</option>
                    <option value="High">High (Billing / Store operation blocked)</option>
                    <option value="Critical">Critical Outage (Immediate escalation)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Issue Description & Diagnostic Details</label>
                <textarea
                  rows={4}
                  required
                  value={ticketData.issueDescription}
                  onChange={(e) => setTicketData({ ...ticketData, issueDescription: e.target.value })}
                  placeholder="Describe the error code, behavior, or support request in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-card text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Technical Ticket</span>
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
