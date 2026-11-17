import React from 'react';
import { motion } from 'motion/react';
import { AnatomicalFeature } from '../types';
import { CheckCircle2, ShieldAlert, Sparkles, Droplets, Microscope, BookOpen } from 'lucide-react';

interface FeatureInspectorPanelProps {
  feature: AnatomicalFeature | null;
  onClose: () => void;
}

export const FeatureInspectorPanel: React.FC<FeatureInspectorPanelProps> = ({ feature, onClose }) => {
  if (!feature) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#12151B] border border-slate-800 rounded-xl p-4 shadow-xl text-slate-300 space-y-3"
      >
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Microscope className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
            Cellular T.S. Auto-Detection System
          </h3>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          When scanning a plant Transverse Section (T.S.), the system autodetects key cellular structures using computer vision and places glowing <strong className="text-emerald-300">Highlight Circles</strong> around target cells.
        </p>

        <div className="space-y-2 text-[11px]">
          <div className="bg-[#0A0C10] p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">
              1
            </span>
            <div>
              <span className="font-bold text-slate-200 block">Stain Chromatic Response</span>
              <span className="text-slate-400 text-[10px]">
                Detects cell wall thickening (e.g., Lignin in Xylem turns red with Phloroglucinol).
              </span>
            </div>
          </div>

          <div className="bg-[#0A0C10] p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">
              2
            </span>
            <div>
              <span className="font-bold text-slate-200 block">Highlight Circle Reticles</span>
              <span className="text-slate-400 text-[10px]">
                Locates cell centroids and draws target reticle circles with micron size badges (µm).
              </span>
            </div>
          </div>

          <div className="bg-[#0A0C10] p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 font-mono text-[10px]">
              3
            </span>
            <div>
              <span className="font-bold text-slate-200 block">Student Interactive Inspection</span>
              <span className="text-slate-400 text-[10px]">
                Tap any highlight circle or pin on the slide to reveal diagnostic pharmacognostic data.
              </span>
            </div>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg text-[10px] text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Tap any circle or label in the viewport to view detailed cellular diagnostics.</span>
        </div>
      </motion.div>
    );
  }

  // Category badge color
  const getCategoryBadge = () => {
    switch (feature.category) {
      case 'Inclusions': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'Vascular': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'Secretory': return 'bg-orange-500/10 text-orange-300 border-orange-500/30';
      case 'Dermal': return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      default: return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <motion.div
      key={feature.id}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-[#12151B] border border-slate-800 rounded-lg p-4 shadow-xl text-slate-300 space-y-3 relative"
    >
      <div className="flex items-start justify-between border-b border-slate-800 pb-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase ${getCategoryBadge()}`}>
              {feature.category}
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold">
              AI {Math.round(feature.confidence * 100)}%
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-100">{feature.name}</h3>
          <p className="text-xs text-emerald-400 font-mono italic">{feature.botanicalTerm}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-300 text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Dimensions */}
        <div className="flex items-center justify-between bg-[#0A0C10] p-2 rounded border border-slate-800 font-mono">
          <span className="text-slate-500 uppercase text-[10px] tracking-wider">Cell Dimension:</span>
          <span className="text-slate-100 font-bold">{feature.sizeMicrons} µm</span>
        </div>

        {/* Anatomical Description */}
        <div className="bg-[#0A0C10] p-2.5 rounded border border-slate-800">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Anatomical Structure</span>
          <p className="text-slate-300 leading-relaxed text-[11px]">{feature.description}</p>
        </div>

        {/* Pharmacognostic Diagnostic Value */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded">
          <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Diagnostic Identification</span>
          </div>
          <p className="text-emerald-100/90 text-[11px] leading-relaxed">{feature.diagnosticValue}</p>
        </div>

        {/* Histochemical Staining Response */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1 text-[11px] uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5 text-amber-400" />
            <span>Histochemical Staining</span>
          </div>
          <p className="text-amber-100/90 text-[11px] leading-relaxed">{feature.stainingResponse}</p>
        </div>
      </div>
    </motion.div>
  );
};
