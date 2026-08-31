import React, { useState, useEffect } from 'react';
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
import { ProjectModal } from './components/ProjectModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { SERVICES_DATA, SOLUTIONS_DATA, CASE_STUDIES } from './data/companyData';
import { ServiceItem, CaseStudy, SoftwareSolution, PageId } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
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
        if (found) setSelectedService(found);
      } else if (page === 'projects') {
        const found = CASE_STUDIES.find((p) => p.id === detailId);
        if (found) setSelectedProject(found);
      }
    }
  };

  const handleOpenEstimator = () => {
    navigateToPage('pricing');
  };

  const handleOpenContact = (scope?: string) => {
    if (scope) {
      setPrefilledContactScope(scope);
    }
    navigateToPage('contact');
  };

  const handleSelectServiceById = (serviceId: string) => {
    const found = SERVICES_DATA.find((s) => s.id === serviceId);
    if (found) {
      setSelectedService(found);
    } else {
      navigateToPage('services');
    }
  };

  const handleSelectSolutionById = (solutionId: string) => {
    navigateToPage('solutions');
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = CASE_STUDIES.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    } else {
      navigateToPage('projects');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 flex flex-col justify-between">
      {/* Universal Fixed Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={(page) => navigateToPage(page)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEstimator={handleOpenEstimator}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigatePage={(page) => navigateToPage(page)}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onOpenEstimator={handleOpenEstimator}
            onSelectService={handleSelectServiceById}
            onSelectProject={handleSelectProjectById}
            onSelectSolution={handleSelectSolutionById}
          />
        )}

        {currentPage === 'services' && (
          <div className="pt-24 pb-16 mesh-bg min-h-screen">
            <ServicesSection
              onSelectService={(service) => setSelectedService(service)}
              onExplore3DModel={() => navigateToPage('solutions')}
            />
          </div>
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage
            onSelectSolution={(sol) => {
              setPrefilledContactScope(`Inquiring about solution: ${sol.title}`);
              handleOpenContact(`Inquiring about solution: ${sol.title}`);
            }}
            onOpenEstimator={handleOpenEstimator}
            onOpenContact={(scope) => handleOpenContact(scope)}
            onSelectServiceById={handleSelectServiceById}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onOpenProject={(proj) => setSelectedProject(proj)}
            onOpenContact={(scope) => handleOpenContact(scope)}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage onOpenContact={(scope) => handleOpenContact(scope)} />
        )}

        {currentPage === 'about' && (
          <div className="pt-24 pb-16 mesh-bg min-h-screen">
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
          <div className="pt-24 pb-16 mesh-bg min-h-screen">
            <ContactSection prefilledScope={prefilledContactScope} />
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <Footer
        onNavigatePage={(page) => navigateToPage(page)}
        onOpenEstimator={handleOpenEstimator}
        onOpenContact={() => handleOpenContact()}
      />

      {/* Modal Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsult={(summary) => {
          setPrefilledContactScope(summary);
          handleOpenContact(summary);
        }}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquire={(title) => {
          setPrefilledContactScope(`Inquiring about service: ${title}`);
          handleOpenContact(`Inquiring about service: ${title}`);
        }}
        onExplore3D={() => {
          setSelectedService(null);
          navigateToPage('solutions');
        }}
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
