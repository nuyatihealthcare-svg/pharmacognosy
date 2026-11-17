import React from 'react';
import { BotanicalSample, OpticalSettings } from '../types';
import { Compass, MapPin } from 'lucide-react';

interface SpatialMinimapProps {
  sample: BotanicalSample;
  opticalSettings: OpticalSettings;
  onResetStage: () => void;
}

export const SpatialMinimap: React.FC<SpatialMinimapProps> = ({ sample, opticalSettings, onResetStage }) => {
  // Normalize stage X & Y (-100 to 100) to map percentage (0 to 100%)
  const viewportXPercent = 50 + opticalSettings.stageX * 0.25;
  const viewportYPercent = 50 + opticalSettings.stageY * 0.25;

  return (
    <div className="bg-[#12151B] border border-slate-800 rounded-lg p-3 shadow-lg text-slate-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Spatial Minimap</span>
        </div>
        <button
          onClick={onResetStage}
          className="text-[10px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded transition-colors uppercase font-mono font-bold"
        >
          Center
        </button>
      </div>

      <div className="relative w-full aspect-video bg-[#0A0C10] rounded overflow-hidden border border-slate-800 flex items-center justify-center p-2">
        {/* Organ Diagram Outline */}
        <div className="w-full h-full relative border border-dashed border-emerald-900/60 rounded flex items-center justify-center">
          {/* Organ schematic drawing */}
          {sample.organType === 'Leaf T.S.' && (
            <div className="w-4/5 h-2/3 bg-emerald-500/10 border border-emerald-500/30 rounded relative flex items-center justify-center">
              <span className="text-[9px] text-emerald-500 font-mono uppercase tracking-wider">Leaf Mesophyll</span>
            </div>
          )}

          {sample.organType === 'Bark T.S.' && (
            <div className="w-full h-3/4 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center">
              <span className="text-[9px] text-amber-500 font-mono uppercase tracking-wider">Secondary Phloem Bark</span>
            </div>
          )}

          {sample.organType === 'Fruit T.S.' && (
            <div className="w-2/3 h-5/6 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
              <span className="text-[9px] text-amber-500 font-mono uppercase tracking-wider">Mericarp Pericarp</span>
            </div>
          )}

          {sample.organType === 'Rhizome T.S.' && (
            <div className="w-3/4 h-3/4 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
              <span className="text-[9px] text-amber-400 font-mono uppercase tracking-wider">Central Stele</span>
            </div>
          )}

          {sample.organType === 'Stem T.S.' && (
            <div className="w-3/4 h-3/4 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center relative">
              <div className="w-1/2 h-1/2 rounded-full border border-dashed border-emerald-500/40" />
              <span className="absolute text-[9px] text-emerald-500 font-mono uppercase tracking-wider">Vascular Ring</span>
            </div>
          )}

          {/* Current Camera Viewport Rect Marker */}
          <div
            className="absolute border-2 border-emerald-400 bg-emerald-500/20 rounded pointer-events-none transition-all duration-150"
            style={{
              left: `${Math.max(10, Math.min(85, viewportXPercent))}%`,
              top: `${Math.max(10, Math.min(85, viewportYPercent))}%`,
              width: '28%',
              height: '35%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span className="absolute -top-3.5 -left-1 text-[8px] bg-emerald-500 text-slate-950 font-bold px-1 rounded font-mono">FOV</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>ORGAN: <strong className="text-slate-300">{sample.organType}</strong></span>
        <span>STAGE: <strong className="text-emerald-400">({opticalSettings.stageX}, {opticalSettings.stageY})</strong></span>
      </div>
    </div>
  );
};
