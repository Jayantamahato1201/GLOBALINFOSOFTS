import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { SolutionsPage } from './components/pages/SolutionsPage';
import { PricingPage } from './components/pages/PricingPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { TeamPage } from './components/pages/TeamPage';
import { TechSupportPage } from './components/pages/TechSupportPage';
import { BlogPage } from './components/pages/BlogPage';
import { CareersPage } from './components/pages/CareersPage';
import { PageUnavailable } from './components/PageUnavailable';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { AnnouncementPopup } from './components/AnnouncementPopup';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SERVICES_DATA, SOLUTIONS_DATA, CASE_STUDIES } from './data/companyData';
import { ServiceItem, CaseStudy, SoftwareSolution, DetailModalData, PageId } from './types';
import { CmsProvider, useCms } from './context/CmsContext';
import { AdminAuthProvider } from './admin/AdminAuthContext';
import { AdminPortal } from './admin/AdminPortal';
import { CrmPortal } from './crm/CrmPortal';
import { AlertTriangle } from 'lucide-react';

function MainAppContent() {
  const { settings, isPageVisible } = useCms();
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [inCrm, setInCrm] = useState<boolean>(false);
  const [adminRoute, setAdminRoute] = useState<{
    inAdmin: boolean;
    initialView: 'login' | 'signup' | 'dashboard';
  }>({ inAdmin: false, initialView: 'login' });
  const [blogArticleSlug, setBlogArticleSlug] = useState<string | null>(null);
  const [modalData, setModalData] = useState<DetailModalData | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [prefilledContactScope, setPrefilledContactScope] = useState<string>('');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const rawPath = window.location.pathname.replace(/^\//, '').toLowerCase();
      const target = rawHash || rawPath;

      if (target === 'crm' || target.startsWith('crm/') || target === 'crm-portal') {
        setInCrm(true);
        setAdminRoute({ inAdmin: false, initialView: 'login' });
        return;
      }
      setInCrm(false);

      if (target === 'admin' || target === 'admin/dashboard') {
        setAdminRoute({ inAdmin: true, initialView: 'dashboard' });
        return;
      }
      if (target === 'admin/login') {
        setAdminRoute({ inAdmin: true, initialView: 'login' });
        return;
      }
      if (target === 'admin/signup') {
        setAdminRoute({ inAdmin: true, initialView: 'signup' });
        return;
      }
      if (target.startsWith('admin/')) {
        setAdminRoute({ inAdmin: true, initialView: 'dashboard' });
        return;
      }

      setAdminRoute({ inAdmin: false, initialView: 'login' });

      if (target.startsWith('blog/') || target.startsWith('blog-')) {
        const slug = target.replace(/^blog[\/-]/, '');
        setCurrentPage('blog');
        setBlogArticleSlug(slug || null);
        return;
      }

      if (target === 'blog') {
        setCurrentPage('blog');
        setBlogArticleSlug(null);
        return;
      }

      const validPages: PageId[] = [
        'home',
        'services',
        'solutions',
        'projects',
        'pricing',
        'about',
        'team',
        'careers',
        'support',
        'blog',
        'contact'
      ];
      if (validPages.includes(target as PageId)) {
        setCurrentPage(target as PageId);
        setBlogArticleSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageId, detailId?: string) => {
    setCurrentPage(page);
    if (page === 'blog') {
      if (detailId) {
        setBlogArticleSlug(detailId);
        window.location.hash = `/blog/${detailId}`;
      } else {
        setBlogArticleSlug(null);
        window.location.hash = 'blog';
      }
    } else {
      setBlogArticleSlug(null);
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (detailId && page !== 'blog') {
      if (page === 'services') {
        const found = SERVICES_DATA.find((s) => s.id === detailId);
        if (found) openServiceModal(found);
      } else if (page === 'projects') {
        const found = CASE_STUDIES.find((p) => p.id === detailId);
        if (found) openProjectModal(found);
      } else if (page === 'solutions') {
        const found = SOLUTIONS_DATA.find((s) => s.id === detailId);
        if (found) openSolutionModal(found);
      }
    }
  };

  const handleOpenContact = (scope?: string) => {
    if (scope) {
      setPrefilledContactScope(scope);
    }
    navigateToPage('contact');
  };

  const openProjectModal = (project: CaseStudy) => {
    setModalData({
      type: 'project',
      id: project.id,
      category: project.category || project.industry,
      title: project.title,
      description: project.summary,
      duration: project.duration,
      metadata: project.client ? `Client: ${project.client}` : undefined,
      image: project.image,
      technologies: project.technologies,
      primaryActionLabel: 'Read Full Case Study',
      secondaryActionLabel: 'Enquire Now',
      onPrimaryAction: () => {
        handleOpenContact(`Consultation for project deployment: ${project.title} (${project.client})`);
      },
      onSecondaryAction: () => {
        handleOpenContact(`Enquiring about project: ${project.title}`);
      }
    });
  };

  const openServiceModal = (service: ServiceItem) => {
    setModalData({
      type: 'service',
      id: service.id,
      category: service.category ? service.category.toUpperCase() : 'SERVICE',
      title: service.title,
      description: service.shortDesc,
      longDesc: service.longDesc,
      iconName: service.iconName,
      deliverables: service.deliverables,
      duration: service.duration || '2 - 4 Weeks',
      metadata: service.metrics,
      image: service.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      technologies: service.technologies,
      primaryActionLabel: 'View Full Specifications',
      secondaryActionLabel: 'Enquire About Service',
      onPrimaryAction: () => {
        handleOpenContact(`Requesting specifications for service: ${service.title}`);
      },
      onSecondaryAction: () => {
        handleOpenContact(`Enquiry for: ${service.title}`);
      }
    });
  };

  const openSolutionModal = (solution: SoftwareSolution) => {
    setModalData({
      type: 'solution',
      id: solution.id,
      category: solution.industry,
      title: solution.title,
      description: solution.shortDesc,
      longDesc: solution.fullDesc,
      iconName: solution.iconName,
      features: solution.features,
      benefits: solution.benefits,
      duration: solution.duration || 'Turnkey Setup',
      metadata: solution.compliance,
      image: solution.image || 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
      technologies: solution.technologies,
      primaryActionLabel: 'View Solution Details',
      secondaryActionLabel: 'Enquire Now',
      onPrimaryAction: () => {
        handleOpenContact(`Demo & consultation request for software solution: ${solution.title}`);
      },
      onSecondaryAction: () => {
        handleOpenContact(`Enquiry for solution: ${solution.title}`);
      }
    });
  };

  const handleSelectServiceById = (serviceId: string) => {
    const found = SERVICES_DATA.find((s) => s.id === serviceId);
    if (found) {
      openServiceModal(found);
    } else {
      navigateToPage('services');
    }
  };

  const handleSelectSolutionById = (solutionId?: string) => {
    if (solutionId) {
      const found = SOLUTIONS_DATA.find((s) => s.id === solutionId);
      if (found) {
        openSolutionModal(found);
        return;
      }
    }
    navigateToPage('solutions');
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = CASE_STUDIES.find((p) => p.id === projectId);
    if (found) {
      openProjectModal(found);
    } else {
      navigateToPage('projects');
    }
  };

  const getPageDisplayName = (page: PageId): string => {
    switch (page) {
      case 'home': return 'Home';
      case 'services': return 'Services';
      case 'solutions': return 'Software Solutions';
      case 'projects': return 'Projects & Case Studies';
      case 'pricing': return 'Pricing & Packages';
      case 'about': return 'About Us';
      case 'team': return 'Our Leadership Team';
      case 'careers': return 'Careers';
      case 'support': return 'Technical Support';
      case 'blog': return 'Insights & Blogs';
      case 'contact': return 'Contact & Consultation';
      default: return 'Page';
    }
  };

  const renderCurrentPageContent = () => {
    // If this page has been toggled to HIDDEN in the CMS, display the branded PageUnavailable state
    if (!isPageVisible(currentPage)) {
      return (
        <div className="pt-16 sm:pt-20">
          <PageUnavailable
            pageName={getPageDisplayName(currentPage)}
            onBackToHome={() => navigateToPage('home')}
          />
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigatePage={(page) => navigateToPage(page)}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onSelectService={handleSelectServiceById}
            onSelectServiceItem={(service) => openServiceModal(service)}
            onSelectProject={handleSelectProjectById}
            onSelectSolution={handleSelectSolutionById}
          />
        );
      case 'services':
        return (
          <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full">
            <ServicesSection
              onSelectService={(service) => openServiceModal(service)}
              onExplore3DModel={() => navigateToPage('solutions')}
            />
          </div>
        );
      case 'solutions':
        return (
          <SolutionsPage
            onSelectSolution={(sol) => openSolutionModal(sol)}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onSelectServiceById={handleSelectServiceById}
          />
        );
      case 'projects':
        return (
          <ProjectsPage
            onOpenProject={(proj) => openProjectModal(proj)}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        );
      case 'pricing':
        return (
          <PricingPage onOpenContact={(scope) => handleOpenContact(scope)} />
        );
      case 'about':
        return (
          <div className="pt-16 sm:pt-20 pb-8 bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-slate-100 w-full min-h-screen transition-colors duration-300">
            <AboutSection
              onOpenContact={(scope) => handleOpenContact(scope)}
              onSelectProject={(id) => navigateToPage('projects', id)}
              onNavigatePage={(page) => navigateToPage(page)}
            />
          </div>
        );
      case 'team':
        return (
          <TeamPage
            onNavigatePage={(page) => navigateToPage(page)}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        );
      case 'careers':
        return (
          <CareersPage onOpenContact={(scope) => handleOpenContact(scope)} />
        );
      case 'support':
        return (
          <TechSupportPage onOpenContact={(scope) => handleOpenContact(scope)} />
        );
      case 'blog':
        return (
          <BlogPage
            initialSlug={blogArticleSlug}
            onNavigateArticle={(slug) => {
              setBlogArticleSlug(slug);
              if (slug) {
                window.location.hash = `/blog/${slug}`;
              } else {
                window.location.hash = 'blog';
              }
            }}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        );
      case 'contact':
        return (
          <div className="pt-16 sm:pt-20 pb-8 bg-slate-50 dark:bg-[#07090F] text-slate-900 dark:text-slate-100 w-full min-h-screen transition-colors duration-300">
            <ContactSection prefilledScope={prefilledContactScope} />
          </div>
        );
      default:
        return null;
    }
  };

  if (inCrm) {
    return (
      <CrmPortal
        onBackToWebsite={() => {
          window.location.hash = '';
          window.history.pushState(null, '', '/');
          setInCrm(false);
          setCurrentPage('home');
        }}
        onOpenAdminCms={() => {
          window.location.hash = 'admin';
          setInCrm(false);
          setAdminRoute({ inAdmin: true, initialView: 'dashboard' });
        }}
      />
    );
  }

  if (adminRoute.inAdmin) {
    return (
      <AdminAuthProvider>
        <AdminPortal
          initialView={adminRoute.initialView}
          onBackToWebsite={() => {
            window.location.hash = '';
            window.history.pushState(null, '', '/');
            setAdminRoute({ inAdmin: false, initialView: 'login' });
            setCurrentPage('home');
          }}
        />
      </AdminAuthProvider>
    );
  }

  // If Emergency Maintenance Mode is active, show the maintenance screen to public visitors
  if (settings?.maintenanceMode) {
    return (
      <MaintenanceScreen
        customMessage={settings.maintenanceMessage}
        onOpenAdmin={() => {
          window.location.hash = 'admin';
          setAdminRoute({ inAdmin: true, initialView: 'login' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-body)] selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col transition-colors duration-300">
      {/* Maintenance Mode Emergency Alert Banner */}
      {settings?.maintenanceMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between z-50 sticky top-0 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-slate-950 shrink-0" />
            <span>{settings.maintenanceMessage || 'Scheduled system maintenance is currently in progress.'}</span>
          </div>
          <a
            href="#admin"
            className="underline hover:text-slate-900 text-[11px] font-mono shrink-0 ml-2"
          >
            Admin Login
          </a>
        </div>
      )}

      {/* Universal Fixed Navigation with Theme Toggle */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={(page) => navigateToPage(page)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Page View Switcher with Snappy, Instant Transitions */}
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full flex-1"
          >
            {renderCurrentPageContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Footer */}
      <Footer
        onNavigatePage={(page) => navigateToPage(page)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Universal Detail Modal for Projects, Services & Solutions */}
      <DetailModal
        data={modalData}
        onClose={() => setModalData(null)}
      />

      {/* Compact Search Popup */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigatePage={(page, id) => navigateToPage(page, id)}
        onSelectService={handleSelectServiceById}
        onSelectSolution={handleSelectSolutionById}
        onSelectProject={handleSelectProjectById}
      />

      {/* Floating WhatsApp Enquiry Widget */}
      <WhatsAppWidget />

      {/* Global Real-Time Announcement / Festive Notification Popup */}
      <AnnouncementPopup onNavigatePage={(p) => navigateToPage(p as any)} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CmsProvider>
          <MainAppContent />
        </CmsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
