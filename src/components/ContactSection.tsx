import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
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
  MessageSquare,
  Building,
  User,
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
  const [serviceCategory, setServiceCategory] = useState('Software & POS Billing Solutions');
  const [budgetRange, setBudgetRange] = useState('₹15,000 - ₹35,000');
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

    const mailtoUrl = getEnquiryMailtoUrl(enquiryPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        const mailAnchor = document.createElement('a');
        mailAnchor.href = mailtoUrl;
        mailAnchor.target = '_blank';
        mailAnchor.rel = 'noopener noreferrer';
        mailAnchor.click();
      } catch {
        // safe fallback
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
    <section id="contact" className="relative py-7 sm:py-9 mesh-bg border-t border-slate-200 dark:border-slate-800 overflow-hidden w-full transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-4 sm:mb-5 space-y-1 text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-card text-cyan-700 dark:text-cyan-400 text-[11px] font-semibold uppercase tracking-wider font-mono border-slate-200 dark:border-slate-800">
            <MessageSquare className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            <span>Direct Software Consultation</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit']">
            Contact Global InfoSoft Jamshedpur
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Fill out the form below or connect with our team directly via phone or WhatsApp. We provide fast demonstrations, price estimates, and technical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 text-left">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800">
              {submitted ? (
                <div className="p-4 sm:p-5 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">
                      Project Enquiry Dispatched!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs max-w-lg mx-auto mt-1 leading-relaxed">
                      Thank you, <strong className="text-slate-900 dark:text-white">{fullName || 'there'}</strong>. Your enquiry details have been addressed directly to <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">{PRIMARY_ENQUIRY_EMAIL}</span> (Global InfoSoft).
                    </p>
                  </div>

                  {/* Summary Details Card */}
                  <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-left space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-white/10 pb-1 flex items-center justify-between">
                      <span>Enquiry Summary Details</span>
                      <span className="text-cyan-600 dark:text-cyan-400 font-mono">{PRIMARY_ENQUIRY_EMAIL}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                      <div><span className="text-slate-500 dark:text-slate-400">Client Name:</span> <strong className="text-slate-900 dark:text-white">{fullName || 'N/A'}</strong></div>
                      <div><span className="text-slate-500 dark:text-slate-400">Client Email:</span> <strong className="text-slate-900 dark:text-white">{email || 'N/A'}</strong></div>
                      <div><span className="text-slate-500 dark:text-slate-400">Phone / WhatsApp:</span> <span className="text-slate-900 dark:text-slate-200 font-mono">{phone || 'N/A'}</span></div>
                      <div><span className="text-slate-500 dark:text-slate-400">Company:</span> <span className="text-slate-900 dark:text-slate-200">{company || 'Direct'}</span></div>
                      <div><span className="text-slate-500 dark:text-slate-400">Service:</span> <span className="text-cyan-600 dark:text-cyan-300">{serviceCategory}</span></div>
                      <div><span className="text-slate-500 dark:text-slate-400">Budget:</span> <span className="text-emerald-600 dark:text-emerald-300">{budgetRange}</span></div>
                    </div>
                    {message && (
                      <div className="pt-1.5 border-t border-slate-200 dark:border-white/5">
                        <span className="text-slate-500 dark:text-slate-400">Scope:</span> <span className="text-slate-700 dark:text-slate-300 italic">"{message.slice(0, 140)}{message.length > 140 ? '...' : ''}"</span>
                      </div>
                    )}
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Open in your preferred email client or chat on WhatsApp:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a
                        href={getEnquiryGmailWebUrl(enquiryPayload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                        <span>Open in Gmail Web</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>

                      <a
                        href={getEnquiryMailtoUrl(enquiryPayload)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Send via Default Mail</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <button
                        onClick={handleCopyDetails}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-[10.5px] flex items-center gap-1 transition-colors border border-slate-200 dark:border-white/5"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                        <span>{copied ? 'Details Copied!' : 'Copy Enquiry Text'}</span>
                      </button>

                      <a
                        href={getWhatsAppUrl('+919431515806', `Hello Rajnish Ji, I have submitted an enquiry from ${fullName || 'a client'} (${email || ''}) regarding ${serviceCategory}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-[10.5px] flex items-center gap-1 transition-colors border border-emerald-500/30"
                      >
                        <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>WhatsApp Direct</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 dark:border-white/10">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="px-4 py-1.5 rounded-lg glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Company Name */}
                    <div className="space-y-1">
                      <label htmlFor="contact-company" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Company / Business Name
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-company"
                          type="text"
                          placeholder="Store or Company Name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Work Email */}
                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div className="space-y-1">
                      <label htmlFor="contact-phone" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Phone / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="+91 94315 15806"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Category & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="contact-service" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Product or Service Required
                      </label>
                      <select
                        id="contact-service"
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs focus:outline-none bg-white dark:bg-slate-900"
                      >
                        <option value="Software & POS Billing Solutions">Software & POS Billing Solutions</option>
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="Optical & Clinic Management Software">Optical & Clinic Management Software</option>
                        <option value="School & College ERP Management">School & College ERP Management</option>
                        <option value="Website Design & Web Development">Website Design & Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Digital Marketing & Local SEO">Digital Marketing & Local SEO</option>
                        <option value="Computer Hardware & Tech Support">Computer Hardware & Tech Support</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-budget" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs focus:outline-none bg-white dark:bg-slate-900"
                      >
                        <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                        <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000+">₹1,00,000+</option>
                        <option value="Annual Maintenance / Support">Annual Maintenance / Support</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      Requirement Details & Specific Needs
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Tell us about your business, required software features, number of counters or users, and target timeline..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg glass-input text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-submit-contact-form"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-5 rounded-lg btn-primary text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <Send className="w-3 h-3" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>Your contact details are strictly confidential and only used to provide your quote.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & SLA Commitment */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Direct Connect Box */}
            <div className="p-4 sm:p-5 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Direct Communication Channels
              </h3>

              <div className="space-y-2">
                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.sales)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat on WhatsApp for sales & quotation enquiry"
                  className="flex items-center justify-between p-2.5 rounded-lg glass-card hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Head Office Sales & Inquiries</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">+91-9431515806</div>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60">
                    WhatsApp
                  </span>
                </a>

                <a
                  href={getWhatsAppUrl('+919431515806', WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to chat on WhatsApp"
                  className="flex items-center justify-between p-2.5 rounded-lg glass-card hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Direct Executive Support</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">+91-9431515806</div>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-semibold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60">
                    WhatsApp
                  </span>
                </a>

                <a
                  href={`mailto:${PRIMARY_ENQUIRY_EMAIL}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg glass-card hover:border-cyan-500/50 transition-all group"
                >
                  <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Direct Inquiries & Software Quotes</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{PRIMARY_ENQUIRY_EMAIL}</div>
                  </div>
                </a>
              </div>

              {/* SLA Guarantee Box */}
              <div className="p-3 rounded-lg glass-card border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400 font-semibold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prompt Response & Demo</span>
                </div>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Every enquiry is evaluated promptly by our technical team. You will receive an actionable software demo, cost estimate, and implementation plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
