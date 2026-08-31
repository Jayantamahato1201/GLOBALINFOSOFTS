import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { PRODUCT_3D_MODELS } from '../data/product3DModelsData';
import { Product3DCanvas } from './3d/Product3DCanvas';
import { X, CheckCircle2, ArrowRight, Box, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
  onExplore3D?: (modelId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
  onExplore3D
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | '3d'>('overview');
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'xray'>('solid');
  const [exploded, setExploded] = useState<boolean>(false);

  if (!service) return null;

  const matched3DModel = PRODUCT_3D_MODELS.find((m) => m.serviceId === service.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="btn-close-service-modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-card text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 mesh-bg border-b border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold glass-card text-indigo-300">
              Practice: {service.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 glass-card">
              {service.metrics}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            {service.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Navigation Tabs if 3D model exists */}
          {matched3DModel && (
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'btn-primary text-white shadow-md'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
              >
                Specifications & Scope
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === '3d'
                    ? 'btn-primary text-white shadow-md'
                    : 'glass-card text-indigo-300 hover:text-white border-indigo-500/30'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Interactive 3D Model</span>
              </button>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
          {activeTab === '3d' && matched3DModel ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white font-['Outfit']">
                  {matched3DModel.title}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setExploded(!exploded)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] ${
                      exploded ? 'bg-indigo-600 text-white' : 'glass-card text-slate-300'
                    }`}
                  >
                    {exploded ? 'Collapsed View' : 'Explode Layers'}
                  </button>
                  <button
                    onClick={() => setRenderMode(renderMode === 'solid' ? 'wireframe' : 'solid')}
                    className="px-2.5 py-1 rounded-lg glass-card text-slate-300 text-[11px]"
                  >
                    Mode: {renderMode.toUpperCase()}
                  </button>
                </div>
              </div>

              {/* Mini 3D Canvas */}
              <div className="h-[320px] rounded-2xl glass-card border border-white/10 overflow-hidden relative">
                <Product3DCanvas
                  modelConfig={matched3DModel}
                  renderMode={renderMode}
                  exploded={exploded}
                  explodeAmount={0.8}
                  autoRotate={true}
                  activeHotspotId={null}
                  cameraPreset="iso"
                  onSelectHotspot={() => {}}
                  className="w-full h-full"
                />
              </div>

              {/* Subsystem Hotspots list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matched3DModel.hotspots.map((hs) => (
                  <div key={hs.id} className="p-2.5 rounded-xl glass-card text-xs">
                    <div className="font-bold text-indigo-300">{hs.name}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{hs.summary}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Practice Overview & Architecture Scope:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {service.longDesc}
                </p>
              </div>

              {/* Deliverables */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Comprehensive Phase Deliverables:
                </h4>
                <div className="space-y-2">
                  {service.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl glass-card text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Core Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl glass-card text-xs font-mono text-indigo-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Includes 6 months complimentary warranty & SLA guarantee.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {matched3DModel && onExplore3D && (
              <button
                onClick={() => {
                  onClose();
                  onExplore3D(matched3DModel.id);
                }}
                className="px-4 py-3 rounded-xl glass-card hover:bg-white/10 text-indigo-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Cpu className="w-4 h-4" />
                <span>Architecture Specs</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onInquire(service.title);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl btn-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Inquire About {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
