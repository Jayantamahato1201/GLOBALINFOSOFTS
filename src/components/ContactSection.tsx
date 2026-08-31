import React, { useState } from 'react';
import { COMPANY_INFO, OFFICE_LOCATIONS } from '../data/companyData';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import {
  PRIMARY_ENQUIRY_EMAIL,
  getEnquiryMailtoUrl,
  getEnquiryGmailWebUrl,
  formatEnquiryEmailBody,
  ProjectEnquiryData
} from '../utils/email';
import {
  Send,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building,
  User,
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  prefilledScope?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledScope = '' }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Enterprise ERP & CRM');
  const [budgetRange, setBudgetRange] = useState('$5k - $15k');
  const [message, setMessage] = useState(prefilledScope ? `Scope details:\n${prefilledScope}` : '');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const enquiryPayload: ProjectEnquiryData = {
    fullName,
    email,
    phone,
    company,
    serviceCategory,
    budgetRange,
    message
  };

  const handleCopyDetails = () => {
    const textToCopy = formatEnquiryEmailBody(enquiryPayload);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare direct mailto URL
    const mailtoUrl = getEnquiryMailtoUrl(enquiryPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Attempt to launch client default email draft
      try {
        const mailAnchor = document.createElement('a');
        mailAnchor.href = mailtoUrl;
        mailAnchor.target = '_blank';
        mailAnchor.rel = 'noopener noreferrer';
        mailAnchor.click();
      } catch {
        // browser popup safety fallback
      }

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }, 500);
  };

  return (
    <section id="contact" className="relative py-24 mesh-bg border-t border-white/10 overflow-hidden">
      {/* Background shape */}
      <div className="abstract-shape w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Outfit']">
            Let's Architect Your Next Breakthrough
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fill out the technical brief below to connect with a Senior Solutions Architect. We respond within 24 hours with an initial feasibility roadmap and NDA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="p-6 sm:p-8 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">
                      Project Enquiry Dispatched!
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mt-2 leading-relaxed">
                      Thank you, <strong className="text-white">{fullName || 'there'}</strong>. Your project specifications have been formatted and addressed directly to <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{PRIMARY_ENQUIRY_EMAIL}</span> (Rajnish Kumar - CEO).
                    </p>
                  </div>

                  {/* Summary Details Card */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-left space-y-2 text-xs text-slate-300">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/10 pb-1.5 flex items-center justify-between">
                      <span>Enquiry Summary Details</span>
                      <span className="text-emerald-400 font-mono">Routed to: {PRIMARY_ENQUIRY_EMAIL}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div><span className="text-slate-400">Client Name:</span> <strong className="text-white">{fullName || 'N/A'}</strong></div>
                      <div><span className="text-slate-400">Client Email:</span> <strong className="text-white">{email || 'N/A'}</strong></div>
                      <div><span className="text-slate-400">Phone / WhatsApp:</span> <span className="text-slate-200 font-mono">{phone || 'N/A'}</span></div>
                      <div><span className="text-slate-400">Company:</span> <span className="text-slate-200">{company || 'Individual / Direct'}</span></div>
                      <div><span className="text-slate-400">Service:</span> <span className="text-indigo-300">{serviceCategory}</span></div>
                      <div><span className="text-slate-400">Budget:</span> <span className="text-emerald-300">{budgetRange}</span></div>
                    </div>
                    {message && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-slate-400">Scope:</span> <span className="text-slate-300 italic">"{message.slice(0, 140)}{message.length > 140 ? '...' : ''}"</span>
                      </div>
                    )}
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <div className="text-[11px] text-slate-400">
                      Open in your preferred email application or send directly to the CEO:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href={getEnquiryGmailWebUrl(enquiryPayload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <Mail className="w-4 h-4 text-red-400" />
                        <span>Open in Gmail Web</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>

                      <a
                        href={getEnquiryMailtoUrl(enquiryPayload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                      >
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <span>Send via Mail App</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handleCopyDetails}
                        className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] flex items-center gap-1.5 transition-colors border border-white/5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copied ? 'Details Copied!' : 'Copy Enquiry Text'}</span>
                      </button>

                      <a
                        href={getWhatsAppUrl('+919431515806', `Hello Rajnish Ji, I have submitted an enquiry from ${fullName || 'a client'} (${email || ''}) regarding ${serviceCategory}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-[11px] flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp to CEO</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="px-5 py-2 rounded-xl glass-card text-slate-300 hover:text-white text-xs font-semibold"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Alex Morgan"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="text-xs font-semibold text-slate-300">
                        Company / Organization
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-company"
                          type="text"
                          placeholder="Apex Enterprises"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-300">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Category & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-service" className="text-xs font-semibold text-slate-300">
                        Interested Practice / Solution
                      </label>
                      <select
                        id="contact-service"
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs focus:outline-none"
                      >
                        <option value="Enterprise ERP & CRM" className="bg-slate-900 text-white">Enterprise ERP & CRM</option>
                        <option value="Custom Software Development" className="bg-slate-900 text-white">Custom Software Development</option>
                        <option value="Full-Stack Web & SaaS" className="bg-slate-900 text-white">Full-Stack Web & SaaS</option>
                        <option value="Mobile App (iOS & Android)" className="bg-slate-900 text-white">Mobile App (iOS & Android)</option>
                        <option value="Accounting & Retail POS" className="bg-slate-900 text-white">Accounting & Retail POS</option>
                        <option value="Digital Marketing & SEO" className="bg-slate-900 text-white">Digital Marketing & SEO</option>
                        <option value="Cloud DevOps & Migration" className="bg-slate-900 text-white">Cloud DevOps & Migration</option>
                        <option value="AI & Automation Integration" className="bg-slate-900 text-white">AI & Automation Integration</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-budget" className="text-xs font-semibold text-slate-300">
                        Anticipated Investment Range
                      </label>
                      <select
                        id="contact-budget"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs focus:outline-none"
                      >
                        <option value="Under $5,000" className="bg-slate-900 text-white">Under $5,000</option>
                        <option value="$5,000 - $15,000" className="bg-slate-900 text-white">$5,000 - $15,000</option>
                        <option value="$15,000 - $40,000" className="bg-slate-900 text-white">$15,000 - $40,000</option>
                        <option value="$40,000 - $100,000+" className="bg-slate-900 text-white">$40,000 - $100,000+</option>
                        <option value="Monthly Retainer Partnership" className="bg-slate-900 text-white">Monthly Retainer Partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                      Project Goals & Architecture Scope
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Briefly describe your objectives, existing tech stack, required integrations, and target timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-white text-xs placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-contact-form"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Validating & Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief & Request NDA</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Strict confidentiality assured. Mutual NDA provided prior to technical review.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & SLA Commitment */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Connect Box */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Direct Communication Channels
              </h3>

              <div className="space-y-3">
                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.sales)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat on WhatsApp for sales & quotation enquiry"
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Head Office Sales & Inquiries</div>
                      <div className="text-xs font-bold text-white font-mono">+91-9431515806</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
                    WhatsApp Enquiry
                  </span>
                </a>

                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat with Executive Line on WhatsApp"
                  className="flex items-center justify-between p-3.5 rounded-2xl glass-card hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Direct Executive Line (CEO / CTO)</div>
                      <div className="text-xs font-bold text-white font-mono">+91-9431515806</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
                    WhatsApp Enquiry
                  </span>
                </a>

                <a
                  href={`mailto:${PRIMARY_ENQUIRY_EMAIL}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-card hover:border-indigo-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Direct Inquiries & RFPs (CEO)</div>
                    <div className="text-xs font-bold text-white font-mono">{PRIMARY_ENQUIRY_EMAIL}</div>
                  </div>
                </a>

                <a
                  href="mailto:manoj@globalinfosofts.com"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl glass-card hover:border-indigo-500/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">CTO Technical Architecture</div>
                    <div className="text-xs font-bold text-white font-mono">manoj@globalinfosofts.com</div>
                  </div>
                </a>
              </div>

              {/* SLA Guarantee Box */}
              <div className="p-4 rounded-2xl glass-card border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Guaranteed 24-Hour SLA Response</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Every inquiry is triaged directly by our lead architectural committee. You will receive an actionable technical overview and milestone estimate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
