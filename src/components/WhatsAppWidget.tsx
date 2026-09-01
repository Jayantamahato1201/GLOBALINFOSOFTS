import React, { useState } from 'react';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import {
  MessageCircle,
  X,
  UserCheck,
  Zap,
  Building2,
  ExternalLink
} from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTarget, setSelectedTarget] = useState<'general' | 'ceo' | 'cto' | 'headoffice'>('general');

  const targets = [
    {
      id: 'general' as const,
      label: 'Sales & General Enquiry',
      phone: '+919431515806',
      icon: MessageCircle,
      preset: WHATSAPP_MESSAGES.general
    },
    {
      id: 'ceo' as const,
      label: 'Rajnish Kumar (CEO)',
      phone: '+919431515806',
      icon: UserCheck,
      preset: WHATSAPP_MESSAGES.ceo
    },
    {
      id: 'cto' as const,
      label: 'Manoj Mahato (CTO)',
      phone: '+919431515806',
      icon: Zap,
      preset: WHATSAPP_MESSAGES.cto
    },
    {
      id: 'headoffice' as const,
      label: 'Head Office (Jamshedpur)',
      phone: '+919431515806',
      icon: Building2,
      preset: WHATSAPP_MESSAGES.headOffice
    }
  ];

  const currentTarget = targets.find((t) => t.id === selectedTarget) || targets[0];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const msgToSend = customMessage.trim() || currentTarget.preset;
    const url = getWhatsAppUrl(currentTarget.phone, msgToSend);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded WhatsApp Modal / Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl glass-panel border border-emerald-500/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-['Outfit']">Chat on WhatsApp</h4>
                  <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span>Global InfoSoft Support • Jamshedpur</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Close WhatsApp widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-white dark:bg-slate-900 max-h-[70vh] overflow-y-auto text-left">
            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Select Contact for Pre-filled Message:
            </div>

            {/* Quick Contact Selector Buttons */}
            <div className="space-y-1.5">
              {targets.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedTarget === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedTarget(item.id);
                      setCustomMessage(item.preset);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' : 'bg-slate-200/60 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-slate-900 dark:text-white">{item.label}</div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{item.phone}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Message Box & Direct Action */}
            <form onSubmit={handleSendCustom} className="pt-2 space-y-2.5 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Message Preview:</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Editable</span>
              </div>
              <textarea
                value={customMessage || currentTarget.preset}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                className="w-full text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none font-sans leading-relaxed"
                placeholder="Type your enquiry message..."
              />

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open in WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>
            </form>

            <div className="text-[10px] text-center text-slate-400 dark:text-slate-500">
              Direct connection to Global InfoSoft team on WhatsApp.
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 py-3 px-4 sm:px-4.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
        aria-label="Open WhatsApp enquiry chat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-semibold">WhatsApp Enquiry</span>
      </button>
    </div>
  );
};
