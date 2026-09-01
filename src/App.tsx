import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { SolutionsPage } from './components/pages/SolutionsPage';
import { PricingPage } from './components/pages/PricingPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { TeamPage } from './components/pages/TeamPage';
import { TechSupportPage } from './components/pages/TechSupportPage';
import { BlogPage } from './components/pages/BlogPage';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DetailModal } from './components/DetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { SERVICES_DATA, SOLUTIONS_DATA, CASE_STUDIES } from './data/companyData';
import { ServiceItem, CaseStudy, SoftwareSolution, DetailModalData, PageId } from './types';

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [modalData, setModalData] = useState<DetailModalData | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [prefilledContactScope, setPrefilledContactScope] = useState<string>('');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = [
        'home',
        'services',
        'solutions',
        'projects',
        'pricing',
        'about',
        'team',
        'support',
        'blog',
        'contact'
      ];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageId, detailId?: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (detailId) {
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

  return (
    <div className="min-h-screen bg-[var(--bg-body)] text-[var(--text-body)] selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col transition-colors duration-300">
      {/* Universal Fixed Navigation with Theme Toggle */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={(page) => navigateToPage(page)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Page View Switcher */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigatePage={(page) => navigateToPage(page)}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onSelectService={handleSelectServiceById}
            onSelectProject={handleSelectProjectById}
            onSelectSolution={handleSelectSolutionById}
          />
        )}

        {currentPage === 'services' && (
          <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full">
            <ServicesSection
              onSelectService={(service) => openServiceModal(service)}
              onExplore3DModel={() => navigateToPage('solutions')}
            />
          </div>
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage
            onSelectSolution={(sol) => openSolutionModal(sol)}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onSelectServiceById={handleSelectServiceById}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onOpenProject={(proj) => openProjectModal(proj)}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage onOpenContact={(scope) => handleOpenContact(scope)} />
        )}

        {currentPage === 'about' && (
          <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full">
            <AboutSection />
          </div>
        )}

        {currentPage === 'team' && (
          <TeamPage
            onNavigatePage={(page) => navigateToPage(page)}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        )}

        {currentPage === 'support' && (
          <TechSupportPage onOpenContact={(scope) => handleOpenContact(scope)} />
        )}

        {currentPage === 'blog' && (
          <BlogPage onOpenContact={(scope) => handleOpenContact(scope)} />
        )}

        {currentPage === 'contact' && (
          <div className="pt-16 sm:pt-20 pb-8 mesh-bg w-full">
            <ContactSection prefilledScope={prefilledContactScope} />
          </div>
        )}
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
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
