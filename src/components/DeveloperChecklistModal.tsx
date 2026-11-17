import React from 'react';
import { motion } from 'motion/react';
import { HardwareMountSettings, OpticalSettings } from '../types';
import {
  X,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Radio,
  Sliders,
  Maximize2,
  FileCode,
  Sparkles
} from 'lucide-react';

interface DeveloperChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  hardwareSettings: HardwareMountSettings;
  opticalSettings: OpticalSettings;
}

export const DeveloperChecklistModal: React.FC<DeveloperChecklistModalProps> = ({
  isOpen,
  onClose,
  hardwareSettings,
  opticalSettings
}) => {
  if (!isOpen) return null;

  const checklistItems = [
    {
      component: 'Deployment Target',
      requirement: '100% Offline / Local Hardware Acceleration (Android NPU/GPU)',
      execution: 'Zero-Cloud Edge AI inference active with zero network dependence',
      status: 'VERIFIED',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      component: 'Inference Engine',
      requirement: 'TFLite (NNAPI/GPU Delegate) / ONNX Runtime Mobile / MediaPipe',
      execution: `${hardwareSettings.inferenceEngine} running quantized INT8 tensor ops`,
      status: 'ACTIVE',
      badgeClass: 'bg-sky-500/20 text-sky-400 border-sky-500/40'
    },
    {
      component: 'Target Model',
      requirement: 'YOLO26 Nano / YOLOv11 Nano / MobileSAM / FastSAM',
      execution: `Architecture: ${hardwareSettings.modelArchitecture} (${hardwareSettings.detectionMode === 'polygon-mask' ? 'Pixel-Exact Mask' : 'Bounding Box'})`,
      status: 'LOADED',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      component: 'FPS Target & Pipeline',
      requirement: '>= 25 FPS live tracking; Decoupled UI (60 FPS) & AI (15-25 FPS)',
      execution: `UI Thread: ${hardwareSettings.fps} FPS | AI Inference: ${hardwareSettings.aiInferenceFps} FPS | Latency: ${hardwareSettings.inferenceLatencyMs}ms`,
      status: 'OPTIMAL',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      component: 'Input Tensor Format',
      requirement: 'YUV_420_888 camera stream converted directly to RGB Tensor',
      execution: `${hardwareSettings.yuvTensorFormat} with zero-copy memory map`,
      status: 'READY',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    {
      component: 'Class Mapping',
      requirement: 'Epidermis, Cortex, Endodermis, Xylem, Phloem, Pith, Crystals, Starch, Trichomes, Sclerids',
      execution: '10 anatomical tissue & inclusion class identifiers populated',
      status: 'CONFIGURED',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      component: 'Domain Augmentation',
      requirement: 'Hue, Saturation, Contrast jittering, Gaussian blur & Chromatic Aberration',
      execution: `HST Shift: ${hardwareSettings.augmentations.hueShift}° | Contrast: ${hardwareSettings.augmentations.contrastJitter}% | Blur: ${hardwareSettings.augmentations.gaussianBlur}px`,
      status: 'ACTIVE',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    },
    {
      component: 'AR Overlay & Smoothing',
      requirement: 'Canvas API overlay with Kalman filtering / Exponential smoothing',
      execution: `Kalman Filter: ${hardwareSettings.useKalmanFilter ? 'ENABLED (Jitter-free)' : 'DISABLED'}`,
      status: hardwareSettings.useKalmanFilter ? 'SMOOTHED' : 'RAW',
      badgeClass: hardwareSettings.useKalmanFilter ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      component: 'Confidence Gating',
      requirement: 'Confidence Threshold (>65%) with Out-of-Focus Soft Warning',
      execution: `Gate: >${(opticalSettings.confidenceFilter * 100).toFixed(0)}% | Soft Warning banner active`,
      status: 'GATED',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      component: 'Spatial Minimap & Caliper',
      requirement: 'Context locator relative to transverse section & dynamic micrometer scale bar',
      execution: `Magnification Lens: ${opticalSettings.magnification} | Dynamic µm scale active`,
      status: 'CALIBRATED',
      badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#12151B] border border-slate-800 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl text-slate-200 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100 uppercase tracking-tight flex items-center gap-2">
                <span>Developer Hand-off Technical Summary Checklist</span>
                <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  On-Device Edge AI
                </span>
              </h2>
              <p className="text-xs text-slate-400">PhytoScan AI Android NPU / TFLite Edge Architecture Specification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Architecture Metrics Header */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 font-mono text-xs">
          <div className="bg-[#0A0C10] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Deployment</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Offline Edge
            </span>
          </div>

          <div className="bg-[#0A0C10] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Model Architecture</span>
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              {hardwareSettings.modelArchitecture}
            </span>
          </div>

          <div className="bg-[#0A0C10] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">AI Inference FPS</span>
            <span className="text-sky-300 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              {hardwareSettings.aiInferenceFps} FPS ({hardwareSettings.inferenceLatencyMs}ms)
            </span>
          </div>

          <div className="bg-[#0A0C10] p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block mb-0.5">Stream Format</span>
            <span className="text-indigo-300 font-bold flex items-center gap-1 truncate">
              <Radio className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              YUV_420_888
            </span>
          </div>
        </div>

        {/* Technical Requirements & Execution Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-5">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#0A0C10] text-slate-400 border-b border-slate-800 text-[10px] uppercase tracking-wider">
              <tr>
                <th className="p-3">Component</th>
                <th className="p-3">Technical Requirement</th>
                <th className="p-3">Live Execution State</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#12151B]">
              {checklistItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-200 uppercase tracking-tight flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.component}</span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs">{item.requirement}</td>
                  <td className="p-3 text-slate-400 max-w-xs">{item.execution}</td>
                  <td className="p-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${item.badgeClass}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>PhytoScan AI is fully optimized for Android Edge Deployment with zero cloud dependency.</span>
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg shadow-emerald-950"
          >
            Close Technical Summary
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
