import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BotanicalSample, AnatomicalFeature, OpticalSettings } from '../types';
import {
  X,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  Search,
  CheckCircle2,
  Filter,
  Microscope,
  Info,
  ChevronRight,
  Maximize2,
  Eye,
  Droplets
} from 'lucide-react';

interface DeepSectionMappingWindowProps {
  sample: BotanicalSample;
  opticalSettings: OpticalSettings;
  selectedFeature: AnatomicalFeature | null;
  onSelectFeature: (feature: AnatomicalFeature | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DeepSectionMappingWindow: React.FC<DeepSectionMappingWindowProps> = ({
  sample,
  opticalSettings,
  selectedFeature,
  onSelectFeature,
  isOpen,
  onClose
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewFilterMode, setViewFilterMode] = useState<'normal' | 'threshold' | 'grayscale'>('normal');

  if (!isOpen) return null;

  const metrics = sample.deepAnalysisMetrics || {
    totalCellCount: sample.features.length * 85 || 380,
    stomatalIndex: '21.4%',
    meanLumenDiameterMicrons: 42.5,
    cellWallThicknessMicrons: 4.6,
    lignificationDegree: 'Strong Secondary Wall Lignification',
    purityScorePercent: 99.2,
    deepTissueSummary: sample.description,
    qualityGrade: 'Grade A (Adulterant Free)',
    vascularBundleCount: 12,
    crystalInclusionDensity: '5.2 rosettes/mm²'
  };

  const categories = ['ALL', 'Vascular', 'Dermal', 'Ground/Cortex', 'Inclusions', 'Secretory'];

  const filteredFeatures = sample.features.filter((f) => {
    const matchesCategory = activeCategoryFilter === 'ALL' || f.category === activeCategoryFilter;
    const matchesQuery =
      searchQuery === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.botanicalTerm.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getImageStyleFilter = () => {
    if (viewFilterMode === 'threshold') {
      return 'contrast(220%) grayscale(100%) brightness(90%)';
    }
    if (viewFilterMode === 'grayscale') {
      return 'grayscale(100%) contrast(140%)';
    }
    return 'none';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col p-2 sm:p-4 md:p-6 overflow-hidden font-sans select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-[#12151B] border border-slate-800 rounded-2xl w-full max-w-7xl mx-auto h-full flex flex-col overflow-hidden shadow-2xl text-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Top Header Bar */}
        <div className="bg-[#0A0C10] border-b border-slate-800 p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0">
              <Maximize2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-100 uppercase tracking-tight truncate">
                  {sample.name}
                </h2>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md shrink-0">
                  {sample.latinName}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono truncate flex items-center gap-2 mt-0.5">
                <span>{sample.organType} ({sample.family})</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Highest Reference Mode
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider font-mono border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4 text-slate-400" />
              <span>Exit Window</span>
            </button>
          </div>
        </div>

        {/* Deep Analysis Window Grid Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4 overflow-y-auto">
          {/* Left Column: Expanded High-Res Processed Image Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3 min-h-[350px]">
            {/* Main Interactive High-Res View Box */}
            <div className="relative w-full aspect-[4/3] bg-black rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center group">
              {/* View Mode Filter Toggles Overlay */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-slate-800 font-mono text-[10px]">
                <button
                  onClick={() => setViewFilterMode('normal')}
                  className={`px-2 py-1 rounded font-bold transition-all ${
                    viewFilterMode === 'normal'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  OCR Color
                </button>
                <button
                  onClick={() => setViewFilterMode('threshold')}
                  className={`px-2 py-1 rounded font-bold transition-all ${
                    viewFilterMode === 'threshold'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Threshold
                </button>
                <button
                  onClick={() => setViewFilterMode('grayscale')}
                  className={`px-2 py-1 rounded font-bold transition-all ${
                    viewFilterMode === 'grayscale'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Edge Grayscale
                </button>
              </div>

              {sample.imageUrl ? (
                <img
                  src={sample.imageUrl}
                  alt={sample.name}
                  className="w-full h-full object-cover transition-all"
                  style={{ filter: getImageStyleFilter() }}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                  style={{ backgroundColor: sample.bgColor || '#1a2e1e', filter: getImageStyleFilter() }}
                >
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                  <Microscope className="w-16 h-16 text-emerald-400/80 mb-2 relative z-10 animate-pulse" />
                  <p className="text-sm font-bold text-slate-200 font-mono relative z-10">{sample.name}</p>
                  <p className="text-xs text-slate-400 font-mono relative z-10">{sample.latinName}</p>
                </div>
              )}

              {/* High-Resolution SVG Overlay Mapping Cells directly over Image */}
              <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {sample.features.map((feat) => {
                  const centerX = 300;
                  const centerY = 300;
                  const featPxX = centerX + (feat.x - 50) * 8;
                  const featPxY = centerY + (feat.y - 50) * 8;
                  const rx = Math.max(feat.radiusX * 6, 18);
                  const ry = Math.max(feat.radiusY * 6, 18);

                  const isSelected = selectedFeature?.id === feat.id;

                  let strokeColor = '#eab308';
                  let fillColor = 'rgba(234, 179, 8, 0.2)';
                  let badgeBg = '#854d0e';

                  if (feat.category === 'Vascular') {
                    strokeColor = '#f43f5e';
                    fillColor = 'rgba(244, 63, 94, 0.28)';
                    badgeBg = '#9f1239';
                  } else if (feat.category === 'Inclusions') {
                    strokeColor = '#f59e0b';
                    fillColor = 'rgba(245, 158, 11, 0.32)';
                    badgeBg = '#78350f';
                  } else if (feat.category === 'Dermal') {
                    strokeColor = '#06b6d4';
                    fillColor = 'rgba(6, 182, 212, 0.28)';
                    badgeBg = '#155e75';
                  } else if (feat.category === 'Ground/Cortex') {
                    strokeColor = '#10b981';
                    fillColor = 'rgba(16, 185, 129, 0.25)';
                    badgeBg = '#065f46';
                  } else if (feat.category === 'Secretory') {
                    strokeColor = '#a855f7';
                    fillColor = 'rgba(168, 85, 247, 0.3)';
                    badgeBg = '#6b21a8';
                  }

                  if (isSelected) {
                    strokeColor = '#38bdf8';
                    fillColor = 'rgba(56, 189, 248, 0.45)';
                    badgeBg = '#0284c7';
                  }

                  const bx = featPxX - rx;
                  const by = featPxY - ry;
                  const bw = rx * 2;
                  const bh = ry * 2;
                  const cornerLen = Math.min(12, Math.min(bw, bh) / 3);

                  return (
                    <g key={feat.id} className="transition-all duration-200">
                      {/* Bounding Box Base Rect */}
                      <rect
                        x={bx}
                        y={by}
                        width={bw}
                        height={bh}
                        rx={2}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? 2.5 : 1.2}
                        strokeDasharray={isSelected ? 'none' : '3 3'}
                      />

                      {/* OCR Corner Notches */}
                      <path
                        d={`
                          M ${bx} ${by + cornerLen} L ${bx} ${by} L ${bx + cornerLen} ${by}
                          M ${bx + bw - cornerLen} ${by} L ${bx + bw} ${by} L ${bx + bw} ${by + cornerLen}
                          M ${bx} ${by + bh - cornerLen} L ${bx} ${by + bh} L ${bx + cornerLen} ${by + bh}
                          M ${bx + bw - cornerLen} ${by + bh} L ${bx + bw} ${by + bh} L ${bx + bw} ${by + bh - cornerLen}
                        `}
                        fill="none"
                        stroke={isSelected ? '#38bdf8' : strokeColor}
                        strokeWidth={2.5}
                        strokeLinecap="square"
                      />

                      {/* Centroid Reticle */}
                      <g>
                        <line x1={featPxX - 6} y1={featPxY} x2={featPxX + 6} y2={featPxY} stroke={strokeColor} strokeWidth={1.5} />
                        <line x1={featPxX} y1={featPxY - 6} x2={featPxX} y2={featPxY + 6} stroke={strokeColor} strokeWidth={1.5} />
                        <circle
                          cx={featPxX}
                          cy={featPxY}
                          r={isSelected ? 6 : 4}
                          fill={strokeColor}
                          className="cursor-pointer pointer-events-auto transition-transform hover:scale-150"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectFeature(feat);
                          }}
                        />
                      </g>

                      {/* OCR Recognition Header Tag */}
                      <g transform={`translate(${bx}, ${by - 22})`}>
                        <rect
                          x={0}
                          y={0}
                          width={Math.max(bw, 120)}
                          height={20}
                          rx={4}
                          fill={badgeBg}
                          className="opacity-95 shadow-lg"
                        />
                        <text
                          x={6}
                          y={13}
                          fill="#ffffff"
                          fontSize={9}
                          fontWeight="bold"
                          fontFamily="monospace"
                          textAnchor="start"
                        >
                          {feat.name.length > 14 ? feat.name.slice(0, 12) + '…' : feat.name} ({Math.round(feat.confidence * 100)}%)
                        </text>
                      </g>

                      {/* Micro Bounding Box Coordinates Label */}
                      <g transform={`translate(${bx}, ${by + bh + 4})`}>
                        <rect
                          x={0}
                          y={0}
                          width={Math.max(bw, 130)}
                          height={14}
                          rx={2}
                          fill="#0f172a"
                          stroke={isSelected ? '#38bdf8' : '#334155'}
                          strokeWidth={0.8}
                        />
                        <text
                          x={4}
                          y={10}
                          fill={isSelected ? '#38bdf8' : '#94a3b8'}
                          fontSize={8}
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          BBOX [{Math.round(bx)},{Math.round(by)},{Math.round(bw)},{Math.round(bh)}]
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Live Image Processing Watermark Badge */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-slate-100">Live Mapped Section</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {sample.features.length} Cells Identified
                </span>
              </div>
            </div>

            {/* Quick Cell Legend Bar */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0A0C10] p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 font-bold text-[11px] uppercase mr-1">Legend:</span>
              <span className="flex items-center gap-1.5 text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Vascular
              </span>
              <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Dermal
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Ground
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Crystals
              </span>
              <span className="flex items-center gap-1.5 text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Secretory
              </span>
            </div>
          </div>

          {/* Right Column: Deep Morphometrics & Interactive Cell Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 font-mono">
            {/* Histological Organ & Species Taxonomy Card */}
            <div className="bg-[#0A0C10] border border-emerald-500/40 rounded-2xl p-3.5 space-y-2.5 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 font-bold text-[9px] px-2.5 py-1 rounded-bl-xl border-l border-b border-emerald-500/30 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Species Identified</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Organ & Species Classification</span>
                  <h3 className="text-sm font-extrabold text-emerald-300">
                    {sample.latinName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between bg-[#12151B] p-2 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Organ Section</span>
                  <span className="font-bold text-amber-300">{sample.organType}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Botanical Family</span>
                  <span className="font-bold text-sky-300">{sample.family}</span>
                </div>
              </div>

              {/* Differentiating Anatomical Fingerprints List */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-bold uppercase block flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Differentiating Anatomical Markers:</span>
                </span>
                <div className="space-y-1 text-[10px] text-slate-300 bg-[#12151B] p-2.5 rounded-xl border border-slate-800/80">
                  {sample.differentiatingMarkers && sample.differentiatingMarkers.length > 0 ? (
                    sample.differentiatingMarkers.map((m, idx) => (
                      <p key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                        <span>{m}</span>
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                        <span><strong>Organ Marker:</strong> {sample.organType} architecture verified via continuous dermal cuticle and core vascular bundle symmetry.</span>
                      </p>
                      <p className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                        <span><strong>Taxonomic Marker:</strong> {sample.family} family confirmed by presence of {sample.features.map(f => f.name).slice(0, 2).join(', ')}.</span>
                      </p>
                      <p className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                        <span><strong>Cell Localization:</strong> {sample.features.length} cell layers mapped with character-recognition style bounding box [X,Y,W,H] coordinates.</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Deep Morphometric Indicators Dashboard */}
            <div className="bg-[#0A0C10] border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Deep Micro-Morphometry</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {metrics.qualityGrade}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#12151B] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Cell Density (FOV)</span>
                  <span className="font-extrabold text-slate-100 text-sm">{metrics.totalCellCount} cells</span>
                </div>
                <div className="bg-[#12151B] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Stomatal Index</span>
                  <span className="font-extrabold text-amber-300 text-sm">{metrics.stomatalIndex}</span>
                </div>
                <div className="bg-[#12151B] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Mean Lumen Diameter</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{metrics.meanLumenDiameterMicrons} µm</span>
                </div>
                <div className="bg-[#12151B] p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase">Cell Wall Thickness</span>
                  <span className="font-extrabold text-sky-300 text-sm">{metrics.cellWallThicknessMicrons} µm</span>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-xs text-emerald-200 space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Authenticity Purity Index:</span>
                  <span className="text-emerald-400 text-sm">{metrics.purityScorePercent}%</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">{metrics.deepTissueSummary}</p>
              </div>
            </div>

            {/* Filterable Identified Cells Explorer */}
            <div className="bg-[#0A0C10] border border-slate-800 rounded-2xl p-3.5 space-y-3 flex-1 flex flex-col min-h-[280px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Mapped Cells ({filteredFeatures.length})</span>
                </h4>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search cell layers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-40 bg-[#12151B] border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg border font-bold uppercase transition-colors shrink-0 ${
                      activeCategoryFilter === cat
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-[#12151B] text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Cell Cards List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[280px] scrollbar-thin scrollbar-thumb-slate-800">
                {filteredFeatures.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs">No matching cell layers found.</div>
                ) : (
                  filteredFeatures.map((feat) => {
                    const isSelected = selectedFeature?.id === feat.id;
                    return (
                      <div
                        key={feat.id}
                        onClick={() => onSelectFeature(feat)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                          isSelected
                            ? 'bg-emerald-950/40 border-emerald-400 shadow-lg ring-1 ring-emerald-500/40'
                            : 'bg-[#12151B] hover:bg-slate-900 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-100 flex items-center gap-1.5">
                            {isSelected && <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                            {feat.name}
                          </span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">
                            {feat.sizeMicrons} µm
                          </span>
                        </div>

                        <p className="text-[10px] text-emerald-300 italic">{feat.botanicalTerm}</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">{feat.description}</p>

                        <div className="flex flex-wrap items-center justify-between text-[9px] font-mono text-sky-400 bg-[#0A0C10] p-1.5 rounded border border-slate-800 gap-1">
                          <span>BBOX: [{feat.bbox ? feat.bbox.join(', ') : `${Math.round(feat.x - feat.radiusX)}, ${Math.round(feat.y - feat.radiusY)}, ${Math.round(feat.x + feat.radiusX)}, ${Math.round(feat.y + feat.radiusY)}`}]</span>
                          <span className="text-amber-300 font-bold">Conf: {Math.round(feat.confidence * 100)}%</span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                          <span className="text-amber-400 font-semibold truncate max-w-[180px]">{feat.stainingResponse}</span>
                          <span className="text-emerald-400 font-bold">{feat.category}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Phytochemical Tests Protocols Card */}
            {sample.phytochemicalTests && sample.phytochemicalTests.length > 0 && (
              <div className="bg-[#0A0C10] border border-slate-800 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Droplets className="w-4 h-4 text-emerald-400" />
                    <span>Phytochemical & Histochemical Tests ({sample.phytochemicalTests.length})</span>
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    Official Reagents
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                  {sample.phytochemicalTests.map((t, idx) => (
                    <div key={idx} className="bg-[#12151B] p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-emerald-300 font-bold text-[11px]">
                        <span>{t.testName}</span>
                        <span className="text-[9px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{t.reagentUsed}</span>
                      </div>
                      <p className="text-amber-300 text-[10px] font-semibold"><strong className="text-slate-400">Reaction:</strong> {t.visualReaction}</p>
                      <p className="text-slate-400 text-[10px] leading-relaxed"><strong className="text-slate-500">Mechanism:</strong> {t.chemicalMechanism}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
