import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCms } from '../../context/CmsContext';
import { CmsCareer } from '../../admin/cmsTypes';
import { COMPANY_INFO } from '../../data/companyData';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Upload,
  X,
  Mail,
  Building,
  GraduationCap,
  ShieldCheck,
  Zap,
  Users,
  Award,
  ChevronRight
} from 'lucide-react';

interface CareersPageProps {
  onOpenContact: (scope?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenContact }) => {
  const { careers } = useCms();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [activeJobModal, setActiveJobModal] = useState<CmsCareer | null>(null);
  const [applicationJob, setApplicationJob] = useState<CmsCareer | null>(null);

  // Application form state
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    portfolioUrl: '',
    coverNote: '',
    resumeFilename: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Filter open positions from CMS
  const activeCareers = careers.filter((c) => c.status === 'open');

  // Department list
  const departments = ['all', ...Array.from(new Set(activeCareers.map((c) => c.department).filter(Boolean)))];

  const filteredCareers =
    selectedDept === 'all'
      ? activeCareers
      : activeCareers.filter((c) => c.department.toLowerCase() === selectedDept.toLowerCase());

  const handleStartApply = (job: CmsCareer) => {
    setActiveJobModal(null);
    setApplicationJob(job);
    setFormState({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      currentCompany: '',
      portfolioUrl: '',
      coverNote: '',
      resumeFilename: ''
    });
    setSubmittedSuccess(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState((prev) => ({ ...prev, resumeFilename: e.target.files![0].name }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate real submission + mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      // Optional mailto link creation for direct communication
      const mailSubject = encodeURIComponent(`Application for ${applicationJob?.title} - ${formState.fullName}`);
      const mailBody = encodeURIComponent(
        `Full Name: ${formState.fullName}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nExperience: ${formState.experience}\nCurrent Company: ${formState.currentCompany}\nPortfolio / LinkedIn: ${formState.portfolioUrl}\n\nCover Note:\n${formState.coverNote}`
      );
      window.open(`mailto:${applicationJob?.applicationEmail || COMPANY_INFO.contactEmail}?subject=${mailSubject}&body=${mailBody}`, '_blank');
    }, 600);
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* 1. Header Banner */}
      <section className="relative py-12 sm:py-16 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-['JetBrains_Mono'] text-xs font-semibold tracking-wider uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers at Global InfoSoft</span>
            </div>

            <h1 className="font-['Sora'] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Build High-Impact Software Solutions in Jamshedpur
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Join our engineering, architecture, and technology consulting teams. Work on real enterprise ERPs, point-of-sale retail engines, and modern full-stack web platforms serving businesses across eastern India.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>Head Office: Mango, Jamshedpur</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Collaborative Engineering Culture</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Direct Mentorship by Founder</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Department Filters & Openings */}
      <section className="py-10 sm:py-12">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8">
          {/* Department Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h2 className="font-['Sora'] text-xl font-bold text-slate-900 dark:text-white">
                Current Openings ({activeCareers.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore live positions across our engineering and tech operations.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-cyan-500 text-white font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-white'
                  }`}
                >
                  {dept === 'all' ? 'All Roles' : dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings Grid */}
          {filteredCareers.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xl mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-500 mx-auto flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-['Sora'] text-lg font-bold text-slate-900 dark:text-white">
                No Active Openings in this Category
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                We are always eager to meet skilled developers, designers, and support specialists. Send your resume directly to our leadership team.
              </p>
              <a
                href={`mailto:${COMPANY_INFO.contactEmail}?subject=Speculative Application - Software Career at Global InfoSoft`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider"
              >
                <span>Send Resume to HR</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCareers.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-500/60 dark:hover:border-cyan-500/60 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-['JetBrains_Mono'] text-[11px] font-bold uppercase tracking-wider">
                        {job.department}
                      </span>
                      {(job as any).featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                          <Sparkles className="w-3 h-3" />
                          <span>Priority Role</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-['Sora'] text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                      {job.summary}
                    </p>

                    {/* Metadata Badges */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="truncate">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{job.salary || 'Competitive'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{job.experience}</span>
                      </div>
                    </div>

                    {/* Required Skills Chips */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-['JetBrains_Mono']"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-slate-500 font-['JetBrains_Mono']">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => setActiveJobModal(job)}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleStartApply(job)}
                      className="flex-1 px-3.5 py-2 rounded-xl btn-primary text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Culture & Engineering Values */}
      <section className="py-12 sm:py-16 bg-white/60 dark:bg-slate-950/60 border-t border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
              Why Work With Us
            </span>
            <h2 className="font-['Sora'] text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Life and Engineering at Global InfoSoft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white">
                Modern Tech Stack
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Work directly with C# .NET, React, TypeScript, SQL Server, and REST APIs on production systems.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white">
                Founder Mentorship
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Direct guidance by CEO Rajnish Kumar, sharing a decade of commercial enterprise software know-how.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center mb-3">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white">
                Work in Jamshedpur
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Enjoy a high quality of life, close to home in Jharkhand without the exhausting metro commute.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Sora'] text-base font-bold text-slate-900 dark:text-white">
                Growth &amp; Ownership
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Every developer has direct impact on commercial releases, client feedback, and architecture choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Speculative Application CTA */}
      <section className="py-10">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-['Sora'] text-xl sm:text-2xl font-bold text-white">
                Don't See the Perfect Match?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                We are continually expanding our technical roster. Submit your resume directly to our recruitment desk for upcoming projects.
              </p>
            </div>

            <a
              href={`mailto:${COMPANY_INFO.contactEmail}?subject=General Application / Resume - Global InfoSoft Jamshedpur`}
              className="px-6 py-3 rounded-full btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 cursor-pointer shadow-lg active:scale-95"
            >
              <span>Email Your Resume</span>
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* MODAL 1: Job Details Modal */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveJobModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-['JetBrains_Mono'] text-xs font-bold uppercase">
                  {activeJobModal.department}
                </span>
                <h2 className="font-['Sora'] text-2xl font-bold text-slate-900 dark:text-white mt-2">
                  {activeJobModal.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    {activeJobModal.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-500" />
                    {activeJobModal.type}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    {activeJobModal.salary}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 font-['Sora']">
                    Position Overview
                  </h4>
                  <p>{activeJobModal.summary}</p>
                </div>

                {activeJobModal.responsibilities && activeJobModal.responsibilities.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 font-['Sora']">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {activeJobModal.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJobModal.requirements && activeJobModal.requirements.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 font-['Sora']">
                      Qualifications &amp; Requirements
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside">
                      {activeJobModal.requirements.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJobModal.skills && activeJobModal.skills.length > 0 && (
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 font-['Sora']">
                      Required Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeJobModal.skills.map((s, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-['JetBrains_Mono'] text-xs font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeJobModal.benefits && activeJobModal.benefits.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <h4 className="font-bold text-slate-900 dark:text-white font-['Sora']">
                      What We Offer
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {activeJobModal.benefits.map((b, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveJobModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => handleStartApply(activeJobModal)}
                  className="px-6 py-2.5 rounded-xl btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Application Form Modal */}
      <AnimatePresence>
        {applicationJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setApplicationJob(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="font-['JetBrains_Mono'] text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                  Job Application
                </span>
                <h3 className="font-['Sora'] text-xl font-bold text-slate-900 dark:text-white">
                  {applicationJob.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Location: {applicationJob.location} • {applicationJob.type}
                </p>
              </div>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-['Sora'] text-xl font-bold text-slate-900 dark:text-white">
                    Application Dispatched!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you for applying to Global InfoSoft. Our hiring team has received your information and will review your profile. You may also follow up directly at <strong>{applicationJob.applicationEmail || COMPANY_INFO.contactEmail}</strong>.
                  </p>
                  <button
                    onClick={() => setApplicationJob(null)}
                    className="px-6 py-2.5 rounded-xl btn-primary text-white font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.fullName}
                        onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91-9876543210"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Total Experience
                      </label>
                      <input
                        type="text"
                        value={formState.experience}
                        onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                        placeholder="e.g. 3.5 Years"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Current Company / College
                      </label>
                      <input
                        type="text"
                        value={formState.currentCompany}
                        onChange={(e) => setFormState({ ...formState, currentCompany: e.target.value })}
                        placeholder="e.g. Tech Solutions Jamshedpur"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Portfolio / GitHub / LinkedIn
                      </label>
                      <input
                        type="url"
                        value={formState.portfolioUrl}
                        onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Resume upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Upload Resume (PDF / DOC)
                    </label>
                    <label className="border border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 rounded-2xl p-4 flex items-center justify-center gap-3 cursor-pointer bg-slate-50 dark:bg-slate-950 transition-colors">
                      <Upload className="w-5 h-5 text-cyan-500" />
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {formState.resumeFilename ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            ✓ {formState.resumeFilename}
                          </span>
                        ) : (
                          'Click to select or drag & drop resume file'
                        )}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Note or Key Projects
                    </label>
                    <textarea
                      rows={3}
                      value={formState.coverNote}
                      onChange={(e) => setFormState({ ...formState, coverNote: e.target.value })}
                      placeholder="Share a brief intro on your tech background and relevant projects..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplicationJob(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl btn-primary text-white font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Submit Application'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
