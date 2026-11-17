import React from 'react';
import { motion } from 'motion/react';
import { HardwareMountSettings } from '../types';
import { Smartphone, Camera, Lock, ShieldCheck, Zap, Activity, CheckCircle2 } from 'lucide-react';

interface HardwareMountSimulatorProps {
  settings: HardwareMountSettings;
  onChange: (newSettings: Partial<HardwareMountSettings>) => void;
  onOpenChecklistModal?: () => void;
}

export const HardwareMountSimulator: React.FC<HardwareMountSimulatorProps> = ({
  settings,
  onChange,
  onOpenChecklistModal
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-[#12151B] border border-slate-800 rounded-xl p-3 sm:p-4 shadow-xl text-slate-300 space-y-3"
    >
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
            <Smartphone className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Microscope Eyepiece & Section Alignment</h3>
            <p className="text-[10px] text-slate-500 font-mono">AUTOMATIC HIGHEST REFERENCE MAPPING SYSTEM</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-md font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Automatic Auto-Mode
          </span>

          {onOpenChecklistModal && (
            <button
              onClick={onOpenChecklistModal}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded font-mono font-bold transition-all"
            >
              Dev Spec Status
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        {/* Column 1: Automatic System Status */}
        <div className="space-y-2.5 bg-[#0A0C10] p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-emerald-400 block text-[10px] uppercase tracking-[0.15em] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Background Image Mapping Mode
          </span>

          <div className="bg-[#12151B] p-2.5 rounded border border-slate-800 text-[11px] space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>Section Reference Quality:</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Highest Precision
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              The system automatically processes uploaded slide images and camera feeds using background chromatic mapping and pixel-exact cell layer boundaries.
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px]">
            <span className="text-slate-400">AR Cell Highlight Format</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onChange({ detectionMode: 'pixel-exact-mask' })}
                className={`px-2 py-0.5 rounded font-bold border transition-all ${
                  settings.detectionMode === 'pixel-exact-mask'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Pixel Mask
              </button>
              <button
                onClick={() => onChange({ detectionMode: 'bounding-box' })}
                className={`px-2 py-0.5 rounded font-bold border transition-all ${
                  settings.detectionMode === 'bounding-box'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Highlight Box
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Lens Calibration & Eyepiece Alignment */}
        <div className="space-y-2 bg-[#0A0C10] p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-sky-400 block text-[10px] uppercase tracking-[0.15em] flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            Eyepiece Lens Controls
          </span>

          {/* Camera Controls Lock */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onChange({ autofocusLock: !settings.autofocusLock })}
              className={`py-1 px-2 rounded text-[10px] font-bold uppercase border flex items-center justify-center gap-1 transition-colors ${
                settings.autofocusLock
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Lock className="w-3 h-3" />
              {settings.autofocusLock ? 'AF Locked' : 'Autofocus Lock'}
            </button>

            <button
              onClick={() => onChange({ exposureLock: !settings.exposureLock })}
              className={`py-1 px-2 rounded text-[10px] font-bold uppercase border flex items-center justify-center gap-1 transition-colors ${
                settings.exposureLock
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Camera className="w-3 h-3" />
              {settings.exposureLock ? 'EV Locked' : 'Exposure Lock'}
            </button>
          </div>

          {/* Lens Offset X */}
          <div className="space-y-1.5 pt-1">
            <div>
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500">Eyepiece Center Offset</span>
                <span className="text-emerald-400 font-bold">{settings.offsetX} px</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={settings.offsetX}
                onChange={(e) => onChange({ offsetX: Number(e.target.value) })}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
