import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Video,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  AlertTriangle,
  Tag,
  List,
  Grid,
  Sparkles,
  Flame,
  Users,
  Briefcase
} from 'lucide-react';
import { useAdminAuth } from '../AdminAuthContext';
import { CmsEvent } from '../cmsTypes';

export const CalendarEventManager: React.FC = () => {
  const { apiFetch, showToast } = useAdminAuth();
  const [events, setEvents] = useState<CmsEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'agenda'>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<Partial<CmsEvent> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch('/api/events');
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch calendar events', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: Array<{
    dateStr: string;
    dayNum: number;
    isCurrentMonth: boolean;
    isToday: boolean;
  }> = [];

  // Previous month padding days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, dayNum);
    const dateStr = prevMonthDate.toISOString().split('T')[0];
    calendarDays.push({
      dateStr,
      dayNum,
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Current month days
  const todayStr = new Date().toISOString().split('T')[0];
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    calendarDays.push({
      dateStr,
      dayNum: day,
      isCurrentMonth: true,
      isToday: dateStr === todayStr
    });
  }

  // Next month padding days to complete grid (42 cells = 6 weeks)
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    const nextMonthDate = new Date(year, month + 1, day);
    const dateStr = nextMonthDate.toISOString().split('T')[0];
    calendarDays.push({
      dateStr,
      dayNum: day,
      isCurrentMonth: false,
      isToday: false
    });
  }

  // Get events on a specific date string (YYYY-MM-DD)
  const getEventsForDate = (dateStr: string) => {
    return events.filter((e) => {
      if (filterCategory !== 'all' && e.category !== filterCategory) return false;
      const start = e.startDate;
      const end = e.endDate || e.startDate;
      return dateStr >= start && dateStr <= end;
    });
  };

  const handleOpenCreateModal = (presetDate?: string) => {
    setEditingEvent({
      title: '',
      description: '',
      startDate: presetDate || selectedDate,
      endDate: presetDate || selectedDate,
      startTime: '10:00',
      endTime: '11:00',
      isAllDay: true,
      category: 'meeting',
      location: '',
      meetingUrl: '',
      color: 'indigo',
      status: 'scheduled'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: CmsEvent) => {
    setEditingEvent({ ...event });
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title?.trim()) {
      showToast('Event title is required', 'error');
      return;
    }
    if (!editingEvent?.startDate) {
      showToast('Event start date is required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingEvent.id) {
        await apiFetch(`/api/events/${editingEvent.id}`, {
          method: 'PUT',
          body: JSON.stringify(editingEvent)
        });
        showToast('Event updated successfully!', 'success');
      } else {
        await apiFetch('/api/events', {
          method: 'POST',
          body: JSON.stringify(editingEvent)
        });
        showToast('Event scheduled successfully!', 'success');
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      await fetchEvents();
    } catch (err: any) {
      showToast(err.message || 'Failed to save event', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await apiFetch(`/api/events/${id}`, {
        method: 'DELETE'
      });
      showToast('Event deleted', 'info');
      setDeleteConfirmId(null);
      await fetchEvents();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete event', 'error');
    }
  };

  // Color mappings
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30';
      case 'emerald':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30';
      case 'rose':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30';
      case 'cyan':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30';
      case 'purple':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30';
      case 'indigo':
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'festival':
        return <Flame className="w-3.5 h-3.5 text-amber-400" />;
      case 'release':
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400" />;
      case 'company':
        return <Briefcase className="w-3.5 h-3.5 text-rose-400" />;
      case 'meeting':
      default:
        return <Users className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Event Calendar & Scheduler
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Plan company milestones, Diwali & festive schedules, client demos, software launches, and team deliverables.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Month</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'agenda'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Agenda List</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleOpenCreateModal()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Filter and Month Navigation Bar */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base sm:text-lg font-bold text-white min-w-[180px] text-center">
            {monthName}
          </h2>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goToToday}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 ml-2"
          >
            Today
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'festival', label: 'Festivals & Holidays 🪔' },
            { id: 'meeting', label: 'Client Meetings' },
            { id: 'release', label: 'Releases 🚀' },
            { id: 'company', label: 'Company Events' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat.id
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View: Calendar Grid + Selected Day Sidebar */}
      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid (3 columns on desktop) */}
          <div className="lg:col-span-3 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-xl overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-slate-400 pb-2 border-b border-slate-800">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                <div
                  key={day}
                  className={`py-1.5 ${idx === 0 || idx === 6 ? 'text-amber-400/80' : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Cells (7 x 6) */}
            <div className="grid grid-cols-7 gap-1 pt-2">
              {calendarDays.map((cell, index) => {
                const dayEvents = getEventsForDate(cell.dateStr);
                const isSelected = selectedDate === cell.dateStr;

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(cell.dateStr)}
                    className={`min-h-[85px] sm:min-h-[105px] p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                        : cell.isCurrentMonth
                        ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                        : 'bg-slate-950/10 border-slate-900/40 opacity-40 hover:opacity-75'
                    }`}
                  >
                    {/* Day Number Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          cell.isToday
                            ? 'bg-indigo-600 text-white font-extrabold shadow'
                            : cell.isCurrentMonth
                            ? 'text-slate-300'
                            : 'text-slate-600'
                        }`}
                      >
                        {cell.dayNum}
                      </span>

                      {/* Quick Add Event on hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCreateModal(cell.dateStr);
                        }}
                        className="opacity-0 hover:opacity-100 p-0.5 rounded text-slate-400 hover:text-indigo-400 hover:bg-slate-800"
                        title="Add event on this day"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Event Badges in Cell */}
                    <div className="space-y-1 mt-1 overflow-y-auto max-h-16 custom-scrollbar">
                      {dayEvents.slice(0, 3).map((ev) => (
                        <div
                          key={ev.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(ev);
                          }}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate font-medium border ${getColorClasses(
                            ev.color
                          )}`}
                          title={`${ev.title} (${ev.startTime || 'All Day'})`}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[9px] text-slate-400 font-mono pl-1">
                          +{dayEvents.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Details Sidebar */}
          <div className="lg:col-span-1 rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono font-semibold">
                    Schedule for
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {new Date(`${selectedDate}T00:00:00`).toLocaleDateString('default', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenCreateModal(selectedDate)}
                  className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border border-indigo-500/30"
                  title="Add event for this date"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Events List for Selected Date */}
              {selectedDateEvents.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-dashed border-slate-800 space-y-2">
                  <CalendarIcon className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">No events scheduled for this day.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenCreateModal(selectedDate)}
                    className="text-xs text-indigo-400 hover:underline font-medium inline-block mt-1"
                  >
                    + Schedule an event
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                  {selectedDateEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          {getCategoryIcon(ev.category)}
                          <h4 className="text-sm font-bold text-white leading-snug">{ev.title}</h4>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(ev)}
                            className="p-1 rounded text-slate-400 hover:text-white"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(ev.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {ev.description && (
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {ev.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-1">
                        <div className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>{ev.isAllDay ? 'All Day' : `${ev.startTime || ''} - ${ev.endTime || ''}`}</span>
                        </div>

                        {ev.location && (
                          <div className="flex items-center gap-1 text-slate-300 truncate max-w-[140px]">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span>{ev.location}</span>
                          </div>
                        )}

                        {ev.meetingUrl && (
                          <a
                            href={ev.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-cyan-400 hover:underline"
                          >
                            <Video className="w-3 h-3" />
                            <span>Meeting Link</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Summary Footnote */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
              Total {events.length} upcoming events scheduled across calendar
            </div>
          </div>
        </div>
      ) : (
        /* Agenda List View */
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">All Scheduled Events ({events.length})</h3>
            <button
              type="button"
              onClick={() => handleOpenCreateModal()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>

          {events.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <CalendarIcon className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm">No events scheduled yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {events
                .slice()
                .sort((a, b) => a.startDate.localeCompare(b.startDate))
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 px-3 rounded-xl transition-colors"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider ${getColorClasses(
                            ev.color
                          )}`}
                        >
                          {ev.category}
                        </span>
                        <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                      </div>

                      {ev.description && (
                        <p className="text-xs text-slate-400 max-w-xl">{ev.description}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1 font-mono">
                        <span>📅 {ev.startDate}{ev.endDate && ev.endDate !== ev.startDate ? ` to ${ev.endDate}` : ''}</span>
                        <span>⏰ {ev.isAllDay ? 'All Day' : `${ev.startTime || ''} - ${ev.endTime || ''}`}</span>
                        {ev.location && <span>📍 {ev.location}</span>}
                        {ev.meetingUrl && (
                          <a
                            href={ev.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 font-sans"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Join Link</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(ev)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="Edit event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(ev.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-950/60 text-slate-400 hover:text-red-400"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Schedule / Edit Event Modal */}
      {isModalOpen && editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  {editingEvent.id ? 'Edit Scheduled Event' : 'Schedule New Event'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Event Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Office Puja & Client Festive Call 🪔"
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Category and Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={editingEvent.category || 'meeting'}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, category: e.target.value as any })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="festival">Festival / Holiday 🪔</option>
                    <option value="meeting">Client Meeting / Demo 🤝</option>
                    <option value="release">Product Release / Deployment 🚀</option>
                    <option value="company">Company Event / Townhall 🏢</option>
                    <option value="other">Other Activity 📌</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Color Tag</label>
                  <select
                    value={editingEvent.color || 'indigo'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, color: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="amber">Warm Amber / Gold (Diwali / Festive)</option>
                    <option value="indigo">Royal Indigo (Meetings / Corporate)</option>
                    <option value="emerald">Emerald Green (Releases / Launches)</option>
                    <option value="rose">Rose Pink (Celebrations)</option>
                    <option value="cyan">Ocean Cyan (Tech)</option>
                    <option value="purple">Violet Purple</option>
                  </select>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Start Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={editingEvent.startDate || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">End Date</label>
                  <input
                    type="date"
                    value={editingEvent.endDate || editingEvent.startDate || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, endDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* All Day Toggle & Time Row */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">All Day Event</span>
                  <input
                    type="checkbox"
                    checked={editingEvent.isAllDay ?? true}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, isAllDay: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                {!editingEvent.isAllDay && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Start Time</label>
                      <input
                        type="time"
                        value={editingEvent.startTime || '10:00'}
                        onChange={(e) =>
                          setEditingEvent({ ...editingEvent, startTime: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">End Time</label>
                      <input
                        type="time"
                        value={editingEvent.endTime || '11:00'}
                        onChange={(e) =>
                          setEditingEvent({ ...editingEvent, endTime: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Location & Virtual Meeting Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Physical Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Jamshedpur Head Office / Client Site"
                    value={editingEvent.location || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, location: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Meeting URL (Google Meet / Zoom)</label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={editingEvent.meetingUrl || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, meetingUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Event Description / Agenda</label>
                <textarea
                  rows={3}
                  placeholder="Notes, agenda, attendees or festive details..."
                  value={editingEvent.description || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingEvent.id ? 'Update Event' : 'Schedule Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Scheduled Event?</h3>
            </div>
            <p className="text-xs text-slate-400">
              Are you sure you want to remove this event from the calendar?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteEvent(deleteConfirmId)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
