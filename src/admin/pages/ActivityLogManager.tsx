import React, { useState, useEffect } from 'react';
import {
  Activity,
  Download,
  Filter,
  Search,
  Calendar,
  Clock,
  User,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { ActivityLog } from '../cmsTypes';

export const ActivityLogManager: React.FC = () => {
  const { apiFetch, showToast } = useAdminAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch('/api/activity');
      setLogs(data || []);
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-audit-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Audit log export downloaded.', 'info');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            Security Audit Trail & Activity Logs
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete tamper-evident audit record of content changes, logins, published items, and deletions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadLogs}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition"
            title="Refresh logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Export JSON Logs
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by action, user, or details..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          {['all', 'auth', 'page', 'blog', 'career', 'service', 'settings', 'media'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition ${
                categoryFilter === cat
                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                  : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Admin User</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    Loading audit trail...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">
                    No activity logs match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition font-mono text-[11px]">
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold text-white whitespace-nowrap">
                      {log.userName}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950 text-slate-300 border border-slate-800">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-200">{log.action}</td>
                    <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{log.details || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
