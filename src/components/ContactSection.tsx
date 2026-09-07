import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/companyData';
import { getWhatsAppUrl } from '../utils/whatsapp';
import {
  User,
  Calendar,
  Video,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  CalendarCheck,
  MessageSquare,
  ShieldCheck,
  Globe,
  Monitor,
  VideoIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  prefilledScope?: string;
}

type StepId = 1 | 2 | 3 | 4;

interface ContactCardData {
  id: string;
  name: string;
  role: string;
  isOffice?: boolean;
  companyName?: string;
  address?: string;
  phone: string;
  email: string;
}

const CONTACT_LEADERSHIP: ContactCardData[] = [
  {
    id: 'manoj',
    name: 'Manoj Mahato',
    role: 'CTO',
    phone: '+91-9431515806',
    email: 'manoj@globalinfosofts.com'
  },
  {
    id: 'rajnish',
    name: 'Rajnish Kumar',
    role: 'CEO',
    phone: '+91-9431515806',
    email: 'info@globalinfosofts.com'
  },
  {
    id: 'office',
    name: 'Head Office',
    role: 'Global Infosoft',
    isOffice: true,
    companyName: 'Global Infosoft',
    address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Jamshedpur 831012',
    phone: '+91-9835855561',
    email: 'info@globalinfosofts.com'
  }
];

const TIME_SLOTS = [
  '10:00 AM - 10:45 AM IST',
  '11:30 AM - 12:15 PM IST',
  '02:00 PM - 02:45 PM IST',
  '03:30 PM - 04:15 PM IST',
  '05:00 PM - 05:45 PM IST',
  '06:30 PM - 07:15 PM IST'
];

const PLATFORMS = [
  {
    id: 'google-meet',
    name: 'Google Meet',
    desc: 'Instant video link sent to your email & calendar',
    badge: 'Popular'
  },
  {
    id: 'zoom',
    name: 'Zoom Video Call',
    desc: 'HD conference with screen sharing & live recording',
    badge: 'Enterprise'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    desc: 'Corporate consultation for enterprise IT teams',
    badge: 'Teams'
  },
  {
    id: 'whatsapp-phone',
    name: 'WhatsApp / Direct Call',
    desc: 'Audio/Video call with our senior tech leadership',
    badge: 'Fastest'
  }
];

const TOPICS = [
  'Retail POS, GST Billing & Inventory Software',
  'Optical Store & Clinic Management Software',
  'School & College ERP Management Suite',
  'Custom Web & Mobile App Engineering',
  'Cloud Architecture, DevOps & Database Migration',
  'General Technical Consultation & Commercial SLA'
];

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledScope = '' }) => {
  // Wizard steps
  const [currentStep, setCurrentStep] = useState<StepId>(1);

  // Form states - Step 1
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [stateName, setStateName] = useState('Maharashtra');
  const [city, setCity] = useState('Mumbai');
  const [phone, setPhone] = useState('+91 ');
  const [projectDetails, setProjectDetails] = useState('');
  const [validationError, setValidationError] = useState('');

  // Form states - Step 2 (Schedule)
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 AM - 12:15 PM IST');
  const [selectedDuration, setSelectedDuration] = useState('45 Mins');

  // Form states - Step 3 (Platform)
  const [selectedPlatform, setSelectedPlatform] = useState('Google Meet');
  const [selectedTopic, setSelectedTopic] = useState('Retail POS, GST Billing & Inventory Software');

  // Submission & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync prefilled scope
  useEffect(() => {
    if (prefilledScope) {
      setProjectDetails(`Requirement Scope:\n${prefilledScope}`);
    }
  }, [prefilledScope]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleStep1Continue = () => {
    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setValidationError('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!projectDetails.trim()) {
      setValidationError('Please provide a brief outline of your project or enquiry.');
      return;
    }
    setValidationError('');
    setCurrentStep(2);
  };

  const handleStep2Continue = () => {
    if (!selectedDate) {
      setValidationError('Please choose a meeting date.');
      return;
    }
    setValidationError('');
    setCurrentStep(3);
  };

  const handleStep3Continue = () => {
    setCurrentStep(4);
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ref = `GIS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);

    // Format mailto body
    const emailSubject = encodeURIComponent(`Meeting Scheduled [${ref}]: ${fullName} - ${selectedTopic}`);
    const emailBody = encodeURIComponent(
      `Hello Global InfoSoft Team,\n\n` +
      `A meeting has been scheduled via the web portal.\n\n` +
      `Booking Reference: ${ref}\n` +
      `Client: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Location: ${city}, ${stateName}, ${country}\n\n` +
      `Meeting Details:\n` +
      `- Date: ${selectedDate}\n` +
      `- Time Slot: ${selectedTimeSlot} (${selectedDuration})\n` +
      `- Platform: ${selectedPlatform}\n` +
      `- Topic: ${selectedTopic}\n\n` +
      `Project Details:\n${projectDetails}\n\n` +
      `Looking forward to the discussion!`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsBooked(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }

      // Open mailto in background
      try {
        const mailtoLink = `mailto:info@globalinfosofts.com,kumarrajnish531@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        const mailAnchor = document.createElement('a');
        mailAnchor.href = mailtoLink;
        mailAnchor.target = '_blank';
        mailAnchor.rel = 'noopener noreferrer';
        mailAnchor.click();
      } catch {
        // fallback
      }
    }, 600);
  };

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Global InfoSoft Consultation: ${selectedTopic}`);
    const details = encodeURIComponent(
      `Meeting with Global InfoSoft Technical Leadership (${fullName})\n` +
      `Platform: ${selectedPlatform}\n` +
      `Booking Reference: ${bookingRef}\n` +
      `Phone: ${phone}\n` +
      `Notes: ${projectDetails}`
    );
    const location = encodeURIComponent(selectedPlatform);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const generateWhatsAppAlertUrl = () => {
    const text =
      `Hello Rajnish Ji & Global InfoSoft Team,\n` +
      `I have scheduled a consultation meeting through your portal.\n\n` +
      `• Ref: ${bookingRef || 'GIS-DEMO'}\n` +
      `• Name: ${fullName}\n` +
      `• Date & Slot: ${selectedDate} at ${selectedTimeSlot}\n` +
      `• Platform: ${selectedPlatform}\n` +
      `• Topic: ${selectedTopic}\n\n` +
      `Could you please confirm the schedule?`;
    return getWhatsAppUrl('9431515806', text);
  };

  // Stepper item component
  const stepsMeta = [
    { id: 1, label: 'Basic Info', icon: User },
    { id: 2, label: 'Schedule', icon: Calendar },
    { id: 3, label: 'Platform', icon: Video },
    { id: 4, label: 'Confirm', icon: CheckCircle }
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-6 sm:py-10 bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300"
    >
      {/* Ambient Animated Logo-Themed Gradient Halos */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 left-1/3 w-[520px] h-[520px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-6 sm:space-y-8 text-left">
        {/* =========================================================================
            TOP BANNER CARD: "Schedule a Meeting"
           ========================================================================= */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white dark:from-[#0e1628]/90 dark:via-[#0a1020]/95 dark:to-[#070b14] backdrop-blur-xl p-6 sm:p-8 md:p-10 text-center overflow-hidden shadow-xl dark:shadow-2xl transition-colors">
          {/* Subtle radial sheen */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Sora'] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 dark:from-sky-400 dark:via-cyan-300 dark:to-blue-400 drop-shadow-[0_4px_24px_rgba(56,189,248,0.15)] dark:drop-shadow-[0_4px_24px_rgba(56,189,248,0.25)]">
              Schedule a Meeting
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal transition-colors">
              Let's connect! Fill out the details below and we'll reach out to schedule a meeting at your convenience.
            </p>
          </div>
        </div>

        {/* =========================================================================
            MAIN WIZARD CARD: Multi-step Interactive Container
           ========================================================================= */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#090D18]/95 backdrop-blur-xl p-5 sm:p-8 md:p-10 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors">
          {/* Stepper Navigation Bar */}
          <div className="relative z-10 max-w-4xl mx-auto mb-8 sm:mb-10">
            <div className="flex items-center justify-between relative">
              {/* Horizontal connector track */}
              <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-slate-800 z-0 transition-colors" />
              {/* Active progress bar */}
              <div
                className="absolute left-6 top-5 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-600 z-0 transition-all duration-500 ease-out"
                style={{
                  width: `${((currentStep - 1) / (stepsMeta.length - 1)) * 100}%`,
                  maxWidth: 'calc(100% - 48px)'
                }}
              />

              {stepsMeta.map((step) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                    onClick={() => {
                      if (isCompleted || isBooked) {
                        setCurrentStep(step.id as StepId);
                      }
                    }}
                  >
                    {/* Step Circle */}
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-900/30 dark:shadow-cyan-900/40 ring-4 ring-cyan-500/20 scale-110'
                          : isCompleted
                          ? 'bg-cyan-600 text-white shadow-md cursor-pointer hover:scale-105'
                          : 'bg-slate-100 dark:bg-[#111625] text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/80 group-hover:border-slate-400 dark:group-hover:border-slate-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>

                    {/* Step Label below circle */}
                    <span
                      className={`mt-2 text-[11px] sm:text-xs font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                          : isCompleted
                          ? 'text-slate-700 dark:text-slate-200'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

            {/* Validation Message Notification */}
            {validationError && (
              <div className="mb-6 p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2 animate-fadeIn transition-colors">
                <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-ping" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Step Contents */}
            <AnimatePresence mode="wait">
              {/* =============================================================
                  STEP 1: Basic Information
                 ============================================================= */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-cyan-300 transition-colors">
                      Basic Information
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 transition-colors">
                      Tell us about yourself and how we can help you.
                    </p>
                  </div>

                  {/* Form Grid */}
                  <div className="space-y-4">
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>Full Name</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>Email Address</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Country & State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>Country</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. India"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>State</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: City & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>City</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Mumbai"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                          <span>Phone Number</span>
                          <span className="text-cyan-600 dark:text-cyan-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 font-mono transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: Project Details */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors">
                        <span>Project Details</span>
                        <span className="text-cyan-600 dark:text-cyan-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={projectDetails}
                        onChange={(e) => setProjectDetails(e.target.value)}
                        placeholder="Tell us about your project or what you'd like to discuss..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Continue Button on bottom right */}
                  <div className="flex items-center justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleStep1Continue}
                      className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-all cursor-pointer hover:shadow-cyan-500/30 active:scale-95 flex items-center gap-2 font-['Sora']"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* =============================================================
                  STEP 2: Schedule (Date & Time)
                 ============================================================= */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-cyan-300 transition-colors">
                      Select Date & Time Slot
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 transition-colors">
                      Choose a convenient window for our engineering leadership to review your requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Selection */}
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span>Meeting Date *</span>
                      </label>

                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-cyan-500/80 transition-all"
                      />

                      {/* Quick date shortcuts */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          { label: 'Today', days: 0 },
                          { label: 'Tomorrow', days: 1 },
                          { label: '+2 Days', days: 2 },
                          { label: '+3 Days', days: 3 }
                        ].map((btn) => {
                          const target = new Date();
                          target.setDate(target.getDate() + btn.days);
                          const formatted = target.toISOString().split('T')[0];
                          const active = selectedDate === formatted;

                          return (
                            <button
                              key={btn.label}
                              type="button"
                              onClick={() => setSelectedDate(formatted)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                                active
                                  ? 'bg-cyan-600 text-white shadow-md'
                                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              {btn.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Meeting Duration */}
                      <div className="pt-3 space-y-2">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                          <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>Estimated Session Duration</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['30 Mins', '45 Mins', '60 Mins'].map((dur) => (
                            <button
                              key={dur}
                              type="button"
                              onClick={() => setSelectedDuration(dur)}
                              className={`py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                                selectedDuration === dur
                                  ? 'bg-sky-600 text-white shadow-md shadow-sky-950/20 dark:shadow-sky-950/50'
                                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700'
                              }`}
                            >
                              {dur}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Time Slot Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                          <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>Preferred Time Slot (IST) *</span>
                        </label>
                        <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-mono bg-cyan-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-500/30">
                          GMT +5:30
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TIME_SLOTS.map((slot) => {
                          const active = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`p-3 rounded-xl text-xs font-medium text-left cursor-pointer transition-all border ${
                                active
                                  ? 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/60 dark:to-slate-900 border-cyan-500 text-cyan-900 dark:text-white shadow-sm dark:shadow-md'
                                  : 'bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{slot}</span>
                                {active && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-[11px] text-slate-500 pt-1">
                        • Slots are automatically converted to your local system time on Google Calendar.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Info</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStep2Continue}
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-all cursor-pointer active:scale-95 flex items-center gap-2 font-['Sora']"
                    >
                      <span>Continue to Platform</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* =============================================================
                  STEP 3: Platform Selection & Discussion Topic
                 ============================================================= */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-cyan-300 transition-colors">
                      Meeting Platform & Consultation Scope
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 transition-colors">
                      Choose your preferred video tool and the primary area you want to discuss.
                    </p>
                  </div>

                  {/* Platform Selection Cards */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                      <Video className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Video Conference Platform *</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PLATFORMS.map((plat) => {
                        const active = selectedPlatform === plat.name;
                        return (
                          <div
                            key={plat.id}
                            onClick={() => setSelectedPlatform(plat.name)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              active
                                ? 'bg-cyan-50/80 dark:bg-gradient-to-br dark:from-cyan-950/50 dark:via-slate-900 dark:to-[#0B0F19] border-cyan-500 shadow-md dark:shadow-lg shadow-cyan-950/20'
                                : 'bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-bold text-slate-900 dark:text-white font-['Sora'] transition-colors">
                                {plat.name}
                              </span>
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                  active
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {plat.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{plat.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Topic Selection */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>Primary Discussion Topic</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TOPICS.map((top) => {
                        const active = selectedTopic === top;
                        return (
                          <button
                            key={top}
                            type="button"
                            onClick={() => setSelectedTopic(top)}
                            className={`p-3 rounded-xl text-xs text-left transition-all border cursor-pointer ${
                              active
                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-500 font-semibold shadow-md'
                                : 'bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {top}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Schedule</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleStep3Continue}
                      className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-all cursor-pointer active:scale-95 flex items-center gap-2 font-['Sora']"
                    >
                      <span>Review & Confirm</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* =============================================================
                  STEP 4: Review & Final Confirmation
                 ============================================================= */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-cyan-300 transition-colors">
                      {isBooked ? 'Meeting Confirmed!' : 'Review & Confirm Meeting'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 transition-colors">
                      {isBooked
                        ? 'Your consultation session is confirmed with Global InfoSoft leadership.'
                        : 'Verify the summary details before dispatching the invitation.'}
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 space-y-4 transition-colors">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {isBooked ? 'Appointment Confirmed' : 'Ready to Dispatch'}
                        </span>
                      </div>
                      {bookingRef && (
                        <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/30">
                          Ref: {bookingRef}
                        </span>
                      )}
                    </div>

                    {/* 2-Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-slate-500">Client Contact:</span>
                        <div className="font-bold text-slate-900 dark:text-white text-sm transition-colors">{fullName || 'N/A'}</div>
                        <div className="text-slate-600 dark:text-slate-400">{email}</div>
                        <div className="text-slate-600 dark:text-slate-400 font-mono">{phone}</div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500">Location:</span>
                        <div className="font-bold text-slate-900 dark:text-white transition-colors">{city}, {stateName}</div>
                        <div className="text-slate-600 dark:text-slate-400">{country}</div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500">Scheduled Date & Time:</span>
                        <div className="font-bold text-cyan-600 dark:text-cyan-400 text-sm flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{selectedDate}</span>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{selectedTimeSlot} ({selectedDuration})</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500">Meeting Platform:</span>
                        <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5" />
                          <span>{selectedPlatform}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">{selectedTopic}</div>
                      </div>
                    </div>

                    {projectDetails && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                        <span className="text-slate-500 block mb-1">Project Notes:</span>
                        <p className="text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-900 transition-colors">
                          "{projectDetails}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Post-Booking Action Center */}
                  {isBooked ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <a
                          href={generateGoogleCalendarUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold font-['Sora'] flex items-center justify-center gap-2 shadow-md dark:shadow-lg shadow-sky-950/20 dark:shadow-sky-950/50 cursor-pointer"
                        >
                          <CalendarCheck className="w-4 h-4" />
                          <span>Add to Google Calendar</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>

                        <a
                          href={generateWhatsAppAlertUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold font-['Sora'] flex items-center justify-center gap-2 shadow-md dark:shadow-lg shadow-emerald-950/20 dark:shadow-emerald-950/50 cursor-pointer"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Notify via WhatsApp</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsBooked(false);
                            setCurrentStep(1);
                          }}
                          className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline cursor-pointer transition-colors"
                        >
                          Schedule another appointment
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Initial Confirmation Actions */
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Platform</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleFinalBooking}
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/20 dark:shadow-cyan-950/50 transition-all cursor-pointer active:scale-95 flex items-center gap-2 font-['Sora'] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Dispatching Invitation...</span>
                        ) : (
                          <>
                            <span>Confirm &amp; Schedule Meeting</span>
                            <CheckCircle className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        {/* =========================================================================
            BOTTOM CARD: "Contact Information"
            With exact data for Manoj Mahato, Rajnish Kumar & Head Office
           ========================================================================= */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white/95 dark:bg-[#090D18]/95 backdrop-blur-xl p-5 sm:p-8 md:p-10 text-left overflow-hidden shadow-xl dark:shadow-2xl transition-colors">
          {/* Header: "Contact Information" */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-['Sora'] text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-slate-100 dark:to-cyan-300 transition-colors">
              Contact Information
            </h2>
          </div>

            {/* 3 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {CONTACT_LEADERSHIP.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="rounded-2xl bg-slate-50 dark:bg-[#0c1222]/80 border border-slate-200/90 dark:border-slate-800/80 hover:border-cyan-500/60 p-5 sm:p-6 space-y-4 shadow-sm dark:shadow-lg hover:shadow-cyan-950/10 dark:hover:shadow-cyan-950/30 transition-all group flex flex-col justify-between backdrop-blur-md"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Avatar Circle + Name & Role */}
                    <div className="flex items-start gap-3">
                      {/* Avatar container with cyan tint */}
                      <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/80 transition-colors">
                        {item.isOffice ? (
                          <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        ) : (
                          <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <h3 className="text-base font-bold font-['Sora'] text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    {/* Office Address (only for Head Office card) */}
                    {item.address && (
                      <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item.address}</span>
                      </div>
                    )}

                    {/* Phone Number */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <a
                        href={`tel:${item.phone.replace(/[^+\d]/g, '')}`}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        <span className="font-mono">{item.phone}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.phone, `phone-${item.id}`)}
                        title="Copy phone"
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedKey === `phone-${item.id}` ? (
                          <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Email Address */}
                    <div className="flex items-center justify-between text-xs">
                      <a
                        href={`mailto:${item.email}`}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                        <span className="truncate">{item.email}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.email, `email-${item.id}`)}
                        title="Copy email"
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedKey === `email-${item.id}` ? (
                          <Check className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Fast Action Buttons on card footer */}
                  <div className="pt-3 border-t border-slate-200/90 dark:border-slate-800/80 flex items-center gap-2">
                    <a
                      href={`tel:${item.phone.replace(/[^+\d]/g, '')}`}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/40 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-[11px] font-semibold text-center transition-colors cursor-pointer border border-cyan-200 dark:border-cyan-900/40"
                    >
                      Call Now
                    </a>

                    <a
                      href={getWhatsAppUrl(item.phone.replace(/[^+\d]/g, ''), `Hello ${item.name}, I would like to enquire about Global InfoSoft services.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold text-center transition-colors cursor-pointer border border-emerald-200 dark:border-emerald-900/40"
                    >
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};
