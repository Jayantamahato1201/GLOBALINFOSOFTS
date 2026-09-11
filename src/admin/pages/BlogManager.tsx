import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Tag,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsBlog } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const BlogManager: React.FC = () => {
  const { apiFetch, showToast, canDelete, canPublish, user } = useAdminAuth();
  const [blogs, setBlogs] = useState<CmsBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Editor Modal State
  const [editingBlog, setEditingBlog] = useState<Partial<CmsBlog> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirm State
  const [deleteTarget, setDeleteTarget] = useState<CmsBlog | null>(null);

  const loadBlogs = async () => {
    try {
      const data = await apiFetch('/api/blogs?includeDrafts=true');
      setBlogs(data || []);
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setIsSaving(true);
    try {
      if (editingBlog.id) {
        // Update existing
        const updated = await apiFetch(`/api/blogs/${editingBlog.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingBlog)
        });
        setBlogs((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
        showToast(`Blog "${updated.title}" updated successfully.`);
      } else {
        // Create new
        const created = await apiFetch('/api/blogs', {
          method: 'POST',
          body: JSON.stringify(editingBlog)
        });
        setBlogs((prev) => [created, ...prev]);
        showToast(`Blog "${created.title}" published.`);
      }
      setEditingBlog(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await apiFetch(`/api/blogs/${deleteTarget.id}`, { method: 'DELETE' });
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      showToast(`Blog deleted successfully.`);
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleToggleStatus = async (blog: CmsBlog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await apiFetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...blog, status: newStatus })
      });
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? updated : b)));
      showToast(`Status changed to ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    setEditingBlog({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      author: user?.fullName || 'Global InfoSoft Editorial',
      authorRole: 'Enterprise Technology Research Group',
      category: 'TECHNOLOGY',
      tags: ['Software', 'Enterprise'],
      readTime: '5 min read',
      status: 'draft',
      publishDate: new Date().toISOString()
    });
  };

  // Filtered list
  const filteredBlogs = blogs.filter((b) => {
    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      (b.title || '').toLowerCase().includes(q) ||
      (b.category || '').toLowerCase().includes(q) ||
      (Array.isArray(b.tags) && b.tags.some((t) => (t || '').toLowerCase().includes(q)));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && b.status === 'published') ||
      (statusFilter === 'draft' && b.status !== 'published');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Insights & Technical Blogs CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Author in-depth technical blogs, manage publishing statuses, categories, and SEO.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-950/40"
        >
          <Plus className="w-4 h-4" />
          Create New Article
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by title, tag, or category..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({blogs.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'published'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Published ({blogs.filter((b) => b.status === 'published').length})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              statusFilter === 'draft'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Drafts ({blogs.filter((b) => b.status !== 'published').length})
          </button>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading blog records...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No blogs match your filter criteria.
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition group"
            >
              <div>
                {/* Article Card Thumbnail */}
                <div className="h-40 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={blog.featuredImage || blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                        blog.status === 'published'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-700/50'
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-800/40">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime || '5 min'}
                    </span>
                    <span>•</span>
                    <span>By {blog.author}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={`/#blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-cyan-400 transition flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Live
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleStatus(blog)}
                    title={blog.status === 'published' ? 'Switch to Draft' : 'Publish Article'}
                    className={`p-1.5 rounded-lg transition ${
                      blog.status === 'published'
                        ? 'text-emerald-400 hover:bg-emerald-950/40'
                        : 'text-amber-400 hover:bg-amber-950/40'
                    }`}
                  >
                    {blog.status === 'published' ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setEditingBlog(blog)}
                    title="Edit blog post"
                    className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {canDelete && (
                    <button
                      onClick={() => setDeleteTarget(blog)}
                      title="Delete post"
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal for Blog Post */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              {editingBlog.id ? 'Edit Blog Article' : 'New Blog Article'}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Configure content, tags, excerpt, and publishing status.
            </p>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title || ''}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        title: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)/g, '')
                      })
                    }
                    placeholder="Enter headline..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Category</label>
                  <select
                    value={editingBlog.category || 'TECHNOLOGY'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="TECHNOLOGY">TECHNOLOGY</option>
                    <option value="AI & MACHINE LEARNING">AI & MACHINE LEARNING</option>
                    <option value="ENTERPRISE ERP">ENTERPRISE ERP</option>
                    <option value="HEALTHCARE">HEALTHCARE</option>
                    <option value="RETAIL POS">RETAIL POS</option>
                    <option value="SUSTAINABILITY">SUSTAINABILITY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Author Name</label>
                  <input
                    type="text"
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Publish Status</label>
                  <select
                    value={editingBlog.status || 'draft'}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, status: e.target.value as any })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-semibold"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live On Website)</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={editingBlog.featuredImage || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, featuredImage: e.target.value })}
                    placeholder="https://images.unsplash.com/... or /uploads/image.jpg"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">
                    Short Excerpt (Summary for Cards & SEO)
                  </label>
                  <textarea
                    rows={2}
                    value={editingBlog.excerpt || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    placeholder="Brief 1-2 sentence preview..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">
                    Full Article Content (Markdown / Text)
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={editingBlog.content || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                    placeholder="Write your article paragraphs here..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Blog Article?"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action will remove the article from the public website.`}
        confirmLabel="Delete Post"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
