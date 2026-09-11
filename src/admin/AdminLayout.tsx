import React, { useState } from 'react';
import {
  LayoutDashboard,
  Globe,
  Compass,
  FileText,
  Briefcase,
  Boxes,
  Layers,
  Users,
  MapPin,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  Activity,
  Eye,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  CreditCard,
  Bell,
  Calendar
} from 'lucide-react';
import { useAdminAuth } from './AdminAuthContext';
import { AdminDashboard } from './pages/AdminDashboard';
import { PageSectionManager } from './pages/PageSectionManager';
import { NavigationFooterManager } from './pages/NavigationFooterManager';
import { BlogManager } from './pages/BlogManager';
import { CareerManager } from './pages/CareerManager';
import { ServiceSolutionManager } from './pages/ServiceSolutionManager';
import { ProjectsManager } from './pages/ProjectsManager';
import { TeamManager } from './pages/TeamManager';
import { LocationTestimonialManager } from './pages/LocationTestimonialManager';
import { MediaLibrary } from './pages/MediaLibrary';
import { NotificationManager } from './pages/NotificationManager';
import { CalendarEventManager } from './pages/CalendarEventManager';
import { SiteSettingsManager } from './pages/SiteSettingsManager';
import { PaymentManager } from './pages/PaymentManager';
import { UserManagement } from './pages/UserManagement';
import { ActivityLogManager } from './pages/ActivityLogManager';
import { GlobalSearchDialog } from './components/GlobalSearchDialog';
import { PreviewModal } from './components/PreviewModal';
import { ConfirmModal } from './components/ConfirmModal';
import { BrandLogo } from '../components/BrandLogo';

export const AdminLayout: React.FC = () => {
  const {
    user,
    logout,
    activeTab,
    setActiveTab,
    setPreviewMode,
    canManageUsers
  } = useAdminAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const navigationSections = [
    {
      group: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Site Architecture',
      items: [
        { id: 'pages', label: 'Pages & Sections', icon: <Globe className="w-4 h-4" /> },
        { id: 'navigation', label: 'Menu & Footer', icon: <Compass className="w-4 h-4" /> }
      ]
    },
    {
      group: 'CMS Content Modules',
      items: [
        { id: 'blogs', label: 'Articles & Blogs', icon: <FileText className="w-4 h-4" /> },
        { id: 'careers', label: 'Career Openings', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'services', label: 'Services & Solutions', icon: <Boxes className="w-4 h-4" /> },
        { id: 'projects', label: 'Case Studies', icon: <Layers className="w-4 h-4" /> },
        { id: 'team', label: 'Team Directory', icon: <Users className="w-4 h-4" /> },
        { id: 'locations', label: 'Offices & Reviews', icon: <MapPin className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Broadcast & Scheduling',
      items: [
        { id: 'notifications', label: 'Popups & Notifications', icon: <Bell className="w-4 h-4 text-amber-400" /> },
        { id: 'calendar', label: 'Event Calendar', icon: <Calendar className="w-4 h-4 text-indigo-400" /> }
      ]
    },
    {
      group: 'Digital Assets',
      items: [
        { id: 'media', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> }
      ]
    },
    {
      group: 'System & Security',
      items: [
        { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
        { id: 'payments', label: 'Payment Gateways', icon: <CreditCard className="w-4 h-4" /> },
        { id: 'users', label: 'Admin Accounts & Security', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'activity', label: 'Audit Trail', icon: <Activity className="w-4 h-4" /> }
      ]
    }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'notifications': return <NotificationManager />;
      case 'calendar': return <CalendarEventManager />;
      case 'pages': return <PageSectionManager />;
      case 'navigation': return <NavigationFooterManager />;
      case 'blogs': return <BlogManager />;
      case 'careers': return <CareerManager />;
      case 'services':
      case 'solutions': return <ServiceSolutionManager />;
      case 'projects': return <ProjectsManager />;
      case 'team': return <TeamManager />;
      case 'locations':
      case 'testimonials': return <LocationTestimonialManager />;
      case 'media': return <MediaLibrary />;
      case 'settings': return <SiteSettingsManager />;
      case 'payments': return <PaymentManager />;
      case 'users': return <UserManagement />;
      case 'activity': return <ActivityLogManager />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col antialiased">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <BrandLogo size={34} showGlow={true} />
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight">Global InfoSoft</h1>
                <p className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  Enterprise CMS
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
            {navigationSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                  {sec.group}
                </p>
                {sec.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      activeTab === item.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-950/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* User Profile Card & Sign Out */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 flex-shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {user?.fullName?.charAt(0) || 'A'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user?.fullName}</p>
                  <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-wider truncate">
                    {user?.role?.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setLogoutConfirmOpen(true)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top App Bar */}
          <header className="h-14 px-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span>CMS Console</span>
                <span>/</span>
                <span className="font-semibold text-white capitalize">{activeTab}</span>
              </div>
            </div>

            {/* Top Bar Actions: Search, Preview, Visit Site */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode(true)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Preview</span>
              </button>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition shadow-md shadow-cyan-950/40"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </header>

          {/* Body Content Container */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#07090E]">
            <div className="max-w-7xl mx-auto">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <GlobalSearchDialog />
      <PreviewModal />

      {/* Logout Confirmation */}
      <ConfirmModal
        isOpen={logoutConfirmOpen}
        title="Sign Out of CMS?"
        message="Are you sure you want to end your administrative session?"
        confirmLabel="Sign Out"
        onConfirm={() => {
          setLogoutConfirmOpen(false);
          logout();
        }}
        onCancel={() => setLogoutConfirmOpen(false)}
      />
    </div>
  );
};
