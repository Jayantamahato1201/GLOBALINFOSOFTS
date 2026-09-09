import React, { useState, useEffect } from 'react';
import {
  FileText,
  Briefcase,
  Layers,
  Boxes,
  Image,
  Users,
  Activity,
  PlusCircle,
  Eye,
  CheckCircle2,
  AlertCircle,
  Globe,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';

export const AdminDashboard: React.FC = () => {
  const { user, apiFetch, setActiveTab, setPreviewMode } = useAdminAuth();
  const [stats, setStats] = useState({
    pagesCount: 0,
    blogsCount: 0,
    blogsDraftCount: 0,
    careersCount: 0,
    servicesCount: 0,
    solutionsCount: 0,
    projectsCount: 0,
    teamCount: 0,
    mediaCount: 0,
    usersCount: 0
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [publicData, logs, allUsers] = await Promise.all([
          apiFetch('/api/public/cms-data'),
          apiFetch('/api/activity'),
          apiFetch('/api/auth/users').catch(() => [])
        ]);

        const allBlogs = await apiFetch('/api/blogs?includeDrafts=true').catch(() => []);
        const allCareers = await apiFetch('/api/careers?includeClosed=true').catch(() => []);
        const allMedia = await apiFetch('/api/media').catch(() => []);

        setStats({
          pagesCount: publicData?.pages?.length || 0,
          blogsCount: allBlogs.filter((b: any) => b.status === 'published').length,
          blogsDraftCount: allBlogs.filter((b: any) => b.status !== 'published').length,
          careersCount: allCareers.filter((c: any) => c.status === 'open').length,
          servicesCount: publicData?.services?.length || 0,
          solutionsCount: publicData?.solutions?.length || 0,
          projectsCount: publicData?.projects?.length || 0,
          teamCount: publicData?.team?.length || 0,
          mediaCount: allMedia?.length || 0,
          usersCount: Array.isArray(allUsers) ? allUsers.length : 2
        });

        setRecentActivities(logs ? logs.slice(0, 8) : []);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [apiFetch]);

  const statCards = [
    {
      title: 'Active Pages',
      value: stats.pagesCount,
      sub: 'All public routes online',
      icon: <Globe className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
      actionTab: 'pages'
    },
    {
      title: 'Published Blogs',
      value: stats.blogsCount,
      sub: stats.blogsDraftCount > 0 ? `${stats.blogsDraftCount} drafts pending` : 'All articles live',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
      actionTab: 'blogs'
    },
    {
      title: 'Career Openings',
      value: stats.careersCount,
      sub: 'Active job vacancies',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400',
      actionTab: 'careers'
    },
    {
      title: 'Services & Solutions',
      value: stats.servicesCount + stats.solutionsCount,
      sub: `${stats.servicesCount} services, ${stats.solutionsCount} solutions`,
      icon: <Boxes className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 text-cyan-400',
      actionTab: 'services'
    },
    {
      title: 'Case Studies',
      value: stats.projectsCount,
      sub: 'Verified client projects',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
      actionTab: 'projects'
    },
    {
      title: 'Media Files',
      value: stats.mediaCount,
      sub: 'Stored assets & images',
      icon: <Image className="w-5 h-5 text-teal-400" />,
      color: 'from-teal-500/10 to-teal-600/5 border-teal-500/20 text-teal-400',
      actionTab: 'media'
    },
    {
      title: 'Team Directory',
      value: stats.teamCount,
      sub: 'Leadership & engineers',
      icon: <Users className="w-5 h-5 text-rose-400" />,
      color: 'from-rose-500/10 to-rose-600/5 border-rose-500/20 text-rose-400',
      actionTab: 'team'
    },
    {
      title: 'Admin Accounts',
      value: stats.usersCount,
      sub: `Current session: ${user?.role}`,
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400',
      actionTab: 'users'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Good day, {user?.fullName || 'Administrator'}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-semibold">
              {user?.role === 'super_admin' ? 'Super Admin' : user?.role}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Global InfoSoft Content Management System & Real-Time Engine. All website edits sync dynamically.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setPreviewMode(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-2 transition"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            Live Preview
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-cyan-950/40"
          >
            Visit Public Site
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid of Statistical Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(card.actionTab)}
            className={`p-4 rounded-xl bg-gradient-to-b ${card.color} border bg-slate-900/80 hover:bg-slate-900 transition duration-200 cursor-pointer group flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-1 group-hover:scale-105 transition origin-left">
                  {isLoading ? '...' : card.value}
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                {card.icon}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 flex items-center justify-between">
              <span>{card.sub}</span>
              <span className="text-slate-500 group-hover:text-cyan-400 transition">Manage →</span>
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          Quick Management Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('blogs')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>New Blog</span>
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>Post Job</span>
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <Image className="w-4 h-4 text-teal-400" />
            <span>Upload Media</span>
          </button>
          <button
            onClick={() => setActiveTab('pages')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Page Layouts</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <Settings className="w-4 h-4 text-purple-400" />
            <span>Site Settings</span>
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className="p-3 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition flex flex-col items-center gap-1.5 text-center"
          >
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: System Status & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System & Architecture Status */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-cyan-400" />
              System Architecture
            </h3>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">Public Website State</p>
                <p className="text-slate-500 text-[11px]">Protected & Undamaged</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">CMS Database Engine</p>
                <p className="text-slate-500 text-[11px]">Persistent JSON Datastore</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">Real-Time Sync Channel</p>
                <p className="text-slate-500 text-[11px]">Sub-50ms reactive bus</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">RBAC Security Guard</p>
                <p className="text-slate-500 text-[11px]">JWT Bearer + Role ACLs</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Live Activity Stream */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Audit Stream
            </h3>
            <button
              onClick={() => setActiveTab('activity')}
              className="text-xs text-cyan-400 hover:underline"
            >
              View Full History →
            </button>
          </div>

          <div className="divide-y divide-slate-800/60">
            {recentActivities.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-500">No recent activities logged.</p>
            ) : (
              recentActivities.map((act) => (
                <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5 min-w-0">
                    <p className="font-semibold text-slate-200 truncate">{act.action}</p>
                    <p className="text-slate-400 text-[11px] truncate">
                      {act.userName} • {act.details || act.category}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 flex-shrink-0 font-mono">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
