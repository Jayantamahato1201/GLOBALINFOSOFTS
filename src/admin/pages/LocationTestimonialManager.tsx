import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Star,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageSquareQuote,
  Building
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsLocation, CmsTestimonial } from '../cmsTypes';
import { ConfirmModal } from '../components/ConfirmModal';

export const LocationTestimonialManager: React.FC = () => {
  const { apiFetch, showToast, canDelete } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'locations' | 'testimonials'>('locations');
  const [locations, setLocations] = useState<CmsLocation[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Editor states
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'location' | 'testimonial'; item: any } | null>(null);

  const loadData = async () => {
    try {
      const [locData, testData] = await Promise.all([
        apiFetch('/api/locations'),
        apiFetch('/api/testimonials')
      ]);
      setLocations(locData || []);
      setTestimonials(testData || []);
    } catch (err) {
      console.error('Failed to load locations/testimonials:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsSaving(true);
    const isLoc = activeTab === 'locations';
    const endpoint = isLoc ? '/api/locations' : '/api/testimonials';

    try {
      if (editingItem.id) {
        const updated = await apiFetch(`${endpoint}/${editingItem.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingItem)
        });
        if (isLoc) {
          setLocations((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        } else {
          setTestimonials((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        }
        showToast(`${isLoc ? 'Location' : 'Review'} updated.`);
      } else {
        const created = await apiFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(editingItem)
        });
        if (isLoc) {
          setLocations((prev) => [...prev, created]);
        } else {
          setTestimonials((prev) => [...prev, created]);
        }
        showToast(`Created new ${isLoc ? 'Location' : 'Client Review'}.`);
      }
      setEditingItem(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    const isLoc = deleteTarget.type === 'location';
    const endpoint = isLoc ? `/api/locations/${deleteTarget.item.id}` : `/api/testimonials/${deleteTarget.item.id}`;

    try {
      await apiFetch(endpoint, { method: 'DELETE' });
      if (isLoc) {
        setLocations((prev) => prev.filter((l) => l.id !== deleteTarget.item.id));
      } else {
        setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.item.id));
      }
      showToast('Item deleted successfully.');
      setDeleteTarget(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenNew = () => {
    if (activeTab === 'locations') {
      setEditingItem({
        city: 'Jamshedpur',
        address: 'Floor 2, House 7, Dayal Apartment, Transport Nagar, Dimna Road, Mango, Jamshedpur, Jharkhand 831012',
        phone: '+91-9431515806',
        email: 'info@globalinfosoft.com',
        hours: 'Mon - Sat: 9:30 AM - 6:30 PM IST',
        isHeadquarters: false
      });
    } else {
      setEditingItem({
        clientName: '',
        company: '',
        role: 'Chief Technology Officer',
        quote: '',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {activeTab === 'locations' ? (
              <MapPin className="w-5 h-5 text-cyan-400" />
            ) : (
              <MessageSquareQuote className="w-5 h-5 text-amber-400" />
            )}
            Locations & Client Endorsements CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage physical office locations and client testimonials displayed on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'locations'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Offices & Locations ({locations.length})
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'testimonials'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Testimonials ({testimonials.length})
            </button>
          </div>

          <button
            onClick={handleOpenNew}
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'locations' ? 'Location' : 'Testimonial'}
          </button>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            Loading data records...
          </div>
        ) : activeTab === 'locations' ? (
          locations.map((loc) => (
            <div
              key={loc.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base font-bold text-white">{loc.city}</h3>
                  </div>
                  {loc.isHeadquarters && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Headquarters
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{loc.address}</p>

                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {loc.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {loc.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {loc.hours}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-1">
                <button
                  onClick={() => setEditingItem(loc)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {canDelete && (
                  <button
                    onClick={() => setDeleteTarget({ type: 'location', item: loc })}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          testimonials.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (test.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{test.quote}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={test.avatar}
                    alt={test.clientName}
                    className="w-9 h-9 rounded-full object-cover bg-slate-800"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{test.clientName}</h4>
                    <p className="text-[11px] text-slate-400">
                      {test.role}, <span className="text-cyan-400">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end gap-1">
                <button
                  onClick={() => setEditingItem(test)}
                  className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {canDelete && (
                  <button
                    onClick={() => setDeleteTarget({ type: 'testimonial', item: test })}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              {activeTab === 'locations' ? (
                <MapPin className="w-4 h-4 text-cyan-400" />
              ) : (
                <Star className="w-4 h-4 text-amber-400" />
              )}
              {editingItem.id ? 'Edit' : 'Add'} {activeTab === 'locations' ? 'Office Location' : 'Testimonial'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs mt-3">
              {activeTab === 'locations' ? (
                <>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">City / Branch Name</label>
                    <input
                      type="text"
                      required
                      value={editingItem.city || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, city: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Full Physical Address</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.address || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Phone</label>
                      <input
                        type="text"
                        value={editingItem.phone || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={editingItem.email || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Operating Hours</label>
                    <input
                      type="text"
                      value={editingItem.hours || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, hours: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isHqCheck"
                      checked={!!editingItem.isHeadquarters}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, isHeadquarters: e.target.checked })
                      }
                      className="rounded bg-slate-950 border-slate-800 text-cyan-500"
                    />
                    <label htmlFor="isHqCheck" className="text-slate-300 font-medium cursor-pointer">
                      Designate as Company Headquarters (HQ)
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Client Name</label>
                      <input
                        type="text"
                        required
                        value={editingItem.clientName || ''}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, clientName: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Company Name</label>
                      <input
                        type="text"
                        required
                        value={editingItem.company || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Client Title / Role</label>
                      <input
                        type="text"
                        value={editingItem.role || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                        placeholder="e.g. Managing Director"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Star Rating (1 - 5)</label>
                      <select
                        value={editingItem.rating || 5}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, rating: parseInt(e.target.value, 10) })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                      >
                        <option value={5}>5 Stars ★★★★★</option>
                        <option value={4}>4 Stars ★★★★☆</option>
                        <option value={3}>3 Stars ★★★☆☆</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Avatar Image URL</label>
                    <input
                      type="text"
                      value={editingItem.avatar || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Review Quote</label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.quote || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                      placeholder="Write client testimonial quote..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title={`Delete ${deleteTarget?.type === 'location' ? 'Location' : 'Testimonial'}?`}
        message="Are you sure you want to permanently remove this record from the website?"
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
