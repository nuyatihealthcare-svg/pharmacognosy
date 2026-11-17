import React, { useRef, useState } from 'react';
import { BotanicalSample } from '../types';
import { BOTANICAL_SAMPLES } from '../data/samplesData';
import { Upload, Camera, Layers, Sparkles, CheckCircle2, ChevronRight, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';

interface SampleSelectorBarProps {
  selectedSample: BotanicalSample;
  onSelectSample: (sample: BotanicalSample) => void;
  onUploadCustomImage: (base64Image: string, targetSpecimenName?: string) => void;
}

export const SampleSelectorBar: React.FC<SampleSelectorBarProps> = ({
  selectedSample,
  onSelectSample,
  onUploadCustomImage
}) => {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showSlideRack, setShowSlideRack] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [targetSpecimen, setTargetSpecimen] = useState<string>('AUTO');

  const filteredSamples = BOTANICAL_SAMPLES.filter(s => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'LEAF') return s.organType.toLowerCase().includes('leaf');
    if (activeCategoryFilter === 'BARK') return s.organType.toLowerCase().includes('bark');
    if (activeCategoryFilter === 'RHIZOME_ROOT') return s.organType.toLowerCase().includes('rhizome') || s.organType.toLowerCase().includes('root');
    if (activeCategoryFilter === 'FRUIT_SEED') return s.organType.toLowerCase().includes('fruit') || s.organType.toLowerCase().includes('seed') || s.organType.toLowerCase().includes('flower') || s.organType.toLowerCase().includes('bud') || s.organType.toLowerCase().includes('hypanthium');
    if (activeCategoryFilter === 'STEM') return s.organType.toLowerCase().includes('stem');
    return true;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        const specName = targetSpecimen === 'AUTO' ? undefined : targetSpecimen;
        onUploadCustomImage(evt.target.result as string, specName);
      }
    };
    reader.readAsDataURL(file);
  };

  const isCustomScanned = selectedSample.id.startsWith('analyzed-');

  return (
    <header className="bg-[#12151C] border-b border-slate-800/80 px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl sticky top-0 z-20 backdrop-blur-xl bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Universal Technical Header */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center text-slate-950 font-bold font-mono text-base shadow-lg shadow-emerald-950/80 shrink-0 ring-1 ring-emerald-300/40">
              Φ
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-100 tracking-tight uppercase flex items-center gap-2">
                <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-emerald-300 bg-clip-text text-transparent">PhytoScan AI</span>
                <span className="text-emerald-400 text-[10px] sm:text-[11px] font-bold font-mono bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Universal Scanner
                </span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-mono">Real-time Plant T.S. Cellular Simulator</p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-5 text-[11px] tracking-wider font-mono border-l border-slate-800/80 pl-5">
            <div className="flex flex-col items-start">
              <span className="text-slate-500 text-[9px] uppercase tracking-wider">Scope</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                Any T.S. Slide
              </span>
            </div>
            <div className="flex flex-col items-start border-l border-slate-800/80 pl-5">
              <span className="text-slate-500 text-[9px] uppercase tracking-wider">Detection</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Auto Cell ID
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Slide Gallery Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800/80 pt-2.5 md:pt-0">
          
          {/* Active Slide Specimen Button */}
          <button
            onClick={() => setShowSlideRack(!showSlideRack)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
              showSlideRack
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
            }`}
            title="Click to browse prepared histological slides"
          >
            <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex items-center gap-1.5 truncate max-w-[160px] sm:max-w-[200px]">
              <span className="text-slate-400 font-sans text-[11px]">Slide:</span>
              <span className={`font-bold truncate ${isCustomScanned ? 'text-amber-300' : 'text-emerald-400'}`}>
                {selectedSample.name}
              </span>
            </div>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1 shrink-0" />
          </button>

          {/* Action Buttons: Target Specimen Selector, Camera Snap & Upload Custom Image */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Target Specimen Classifier Select Dropdown */}
            <div className="relative flex items-center">
              <select
                value={targetSpecimen}
                onChange={(e) => setTargetSpecimen(e.target.value)}
                className="bg-slate-900 border border-slate-700/80 hover:border-emerald-500/60 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                title="Select target crude drug for image scanning or auto-detect"
              >
                <option value="AUTO">🔍 Target: Auto-Detect (Gemini 2.5 Flash)</option>
                <option value="Clove">🌸 Target: Clove Flower Bud (Hypanthium) T.S.</option>
                <option value="Ephedra">🌿 Target: Ephedra Stem T.S.</option>
                <option value="Senna">🍃 Target: Senna Leaflet T.S.</option>
                <option value="Fennel">🌾 Target: Fennel Fruit T.S.</option>
                <option value="Cinnamon">🪵 Target: Cinnamon Bark T.S.</option>
                <option value="Peppermint">🌱 Target: Peppermint Leaf T.S.</option>
                <option value="Rauvolfia">🪴 Target: Rauvolfia Root T.S.</option>
                <option value="Datura">🌺 Target: Datura Leaf T.S.</option>
                <option value="Ginger">🫚 Target: Ginger Rhizome T.S.</option>
                <option value="Cinchona">🌳 Target: Cinchona Bark T.S.</option>
                <option value="Liquorice">🌱 Target: Liquorice Root T.S.</option>
                <option value="Nux Vomica">🌰 Target: Nux Vomica Seed T.S.</option>
              </select>
            </div>

            {/* Direct Camera Photo Snap */}
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center gap-1.5 shrink-0 shadow-lg shadow-emerald-950/50"
              title="Snap any plant cross-section slide using camera"
            >
              <Camera className="w-3.5 h-3.5 text-slate-950" />
              <span>Snap Slide</span>
            </button>

            {/* Upload Custom Slide Image */}
            <input
              type="file"
              ref={uploadInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => uploadInputRef.current?.click()}
              className="px-3 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold transition-all bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shrink-0"
              title="Upload custom image file of plant cross section"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload Slide</span>
            </button>
          </div>

        </div>
      </div>

      {/* Visual Slide Rack Carousel (Toggleable/Expandable) */}
      {showSlideRack && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/80 animate-fadeIn space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              Pharmacognosy Crude Drug Slide Library ({BOTANICAL_SAMPLES.length} Samples)
            </span>

            {/* Organ Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 bg-[#0A0C10] p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
              {[
                { id: 'ALL', label: 'All Crude Drugs' },
                { id: 'LEAF', label: 'Leaves (Foliar)' },
                { id: 'BARK', label: 'Barks' },
                { id: 'RHIZOME_ROOT', label: 'Roots & Rhizomes' },
                { id: 'FRUIT_SEED', label: 'Flowers, Fruits & Seeds' },
                { id: 'STEM', label: 'Stems & Woods' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    activeCategoryFilter === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredSamples.map((s) => {
              const isSelected = selectedSample.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectSample(s);
                    setShowSlideRack(false);
                  }}
                  className={`flex flex-col items-start p-2.5 rounded-xl border transition-all text-left shrink-0 w-48 sm:w-56 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="w-full flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{s.organType}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 truncate w-full">{s.name}</h4>
                  <p className="text-[10px] text-slate-400 italic truncate w-full">{s.latinName}</p>
                  <div className="mt-2 flex items-center justify-between w-full text-[9px] font-mono text-slate-500 pt-1.5 border-t border-slate-800/60">
                    <span>{s.features.length} Cell Types Mapped</span>
                    <span className="text-amber-400 font-bold">{s.family}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

