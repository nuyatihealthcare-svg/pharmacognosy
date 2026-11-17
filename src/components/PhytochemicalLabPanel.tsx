import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BotanicalSample, PhytochemicalTest, StainType } from '../types';
import {
  FlaskConical,
  TestTube,
  Sparkles,
  Droplets,
  CheckCircle2,
  Info,
  Beaker,
  Zap,
  Atom,
  Flame,
  BookOpen
} from 'lucide-react';

interface PhytochemicalLabPanelProps {
  sample: BotanicalSample;
  onApplyStain?: (stain: StainType) => void;
  activeStain?: StainType;
}

export const PHYTOCHEMICAL_TEST_CATALOG: (PhytochemicalTest & {
  stainKey: StainType;
  colorClass: string;
  badgeBg: string;
  iconColor: string;
})[] = [
  {
    stainKey: 'sudan3',
    testName: 'Sudan III / IV Lipophilic Test',
    reagentUsed: 'Sudan III Alcoholic Solution (0.5% in 70% ethanol)',
    targetConstituent: 'Lipids, Cutin, Suberin, Volatile Essential Oils & Resins',
    visualReaction: 'Brilliant Scarlet Orange-Red Staining on Cuticle, Cork & Secretory Oil Ducts',
    chemicalMechanism: 'Azo-dye Sudan III is a lipophilic stain that dissolves preferentially in non-polar fatty, cutinized, suberized wall layers and volatile oil droplets.',
    pharmacognosticSignificance: 'Distinguishes foliar cuticles, suberized bark phellem, and essential oil ducts (e.g. Fennel vittae, Peppermint glands) from un-cutinized root tissues.',
    colorClass: 'border-orange-500/50 bg-orange-950/20 text-orange-300',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    iconColor: 'text-orange-400'
  },
  {
    stainKey: 'phloroglucinol',
    testName: 'Phloroglucinol + HCl Lignification Test',
    reagentUsed: 'Phloroglucinol (1% in 90% EtOH) + Concentrated HCl (1:1 ratio)',
    targetConstituent: 'Lignin in Xylem Vessels, Sclerenchyma Fibers & Stone Cells',
    visualReaction: 'Deep Cherry-Red / Magenta Reaction on Lignified Secondary Walls',
    chemicalMechanism: 'Hydrochloric acid catalyzes reaction between phloroglucinol and cinnamaldehyde moieties in lignin to form a crimson phloroglucide chromophore.',
    pharmacognosticSignificance: 'Official pharmacopoeial verification for conducting xylem vessels, stone cells (Cinchona, Cinnamon), and pericyclic fiber caps.',
    colorClass: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    iconColor: 'text-rose-400'
  },
  {
    stainKey: 'iodine',
    testName: 'Iodine Solution (KI/I2) Starch Test',
    reagentUsed: 'Iodine-Potassium Iodide Solution (5% KI + 0.5% I2)',
    targetConstituent: 'Amyloplast Starch Granules & Aleurone Protein Bodies',
    visualReaction: 'Deep Indigo Blue-Black Staining on Starch; Golden-Brown on Aleurone',
    chemicalMechanism: 'Polyiodide ions (I3- and I5-) intercalate into helical amylose polysaccharide chains, producing an intense indigo inclusion complex.',
    pharmacognosticSignificance: 'Verifies reserve starch hilum morphology (e.g. Ginger, Potato, Cassia) and detects cereal flour pulverization adulterants.',
    colorClass: 'border-indigo-500/50 bg-indigo-950/20 text-indigo-300',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    iconColor: 'text-indigo-400'
  },
  {
    stainKey: 'ruthenium_red',
    testName: 'Ruthenium Red Mucilage & Pectin Test',
    reagentUsed: 'Ruthenium Red Ammoniacal Solution (0.08% in H2O)',
    targetConstituent: 'Plant Mucilage, Pectic Compounds & Gums',
    visualReaction: 'Vibrant Magenta-Pink / Bright Crimson Staining on Mucilage Cells',
    chemicalMechanism: 'Inorganic cationic coordination complex binds ionic carboxylate groups of acidic galacturonic polysaccharides in pectin and mucilage.',
    pharmacognosticSignificance: 'Specific identification test for mucilaginous drugs such as Ispaghula, Senna, Linseed, and Marshmallow root.',
    colorClass: 'border-fuchsia-500/50 bg-fuchsia-950/20 text-fuchsia-300',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    iconColor: 'text-fuchsia-400'
  },
  {
    stainKey: 'ferric_chloride',
    testName: 'Ferric Chloride (5% FeCl3) Tannin Test',
    reagentUsed: 'Neutral Ferric Chloride Aqueous Solution (5% w/v)',
    targetConstituent: 'Phenolic Compounds, Hydrolysable & Condensed Tannins',
    visualReaction: 'Blue-Black (Pyrogallol Tannins) or Greenish-Black (Catechol Tannins)',
    chemicalMechanism: 'Fe3+ ions form coordination complexes with ortho-dihydroxy phenolic groups of tannin molecules in cortical cells.',
    pharmacognosticSignificance: 'Differentiates astringent pyrogallol tannins (Rhubarb, Oak galls) from catechol tannins (Cinchona, Catechu, Green Tea).',
    colorClass: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    iconColor: 'text-cyan-400'
  },
  {
    stainKey: 'borntrager',
    testName: 'Bornträger\'s Anthraquinone Test',
    reagentUsed: 'Dilute H2SO4 + Benzene/Chloroform Extraction + 10% Ammonia Solution',
    targetConstituent: 'Free & Bound Anthraquinone Glycosides',
    visualReaction: 'Rose-Pink to Cherry-Red Coloration in Ammoniacal Layer',
    chemicalMechanism: 'Hydrolysis and oxidation of anthraquinone glycosides yields hydroxyanthraquinones, forming red enolate salt anions in alkaline ammonia.',
    pharmacognosticSignificance: 'Official pharmacopoeial confirmation for stimulant laxatives including Senna leaves, Rhubarb rhizome, Cascara bark, and Aloes.',
    colorClass: 'border-pink-500/50 bg-pink-950/20 text-pink-300',
    badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    iconColor: 'text-pink-400'
  },
  {
    stainKey: 'dragendorff',
    testName: 'Dragendorff\'s Alkaloid Precipitate Test',
    reagentUsed: 'Potassium Bismuth Iodide Reagent (Bismuth Nitrate + KI)',
    targetConstituent: 'Alkaloid Bases (Tropane, Quinoline, Indole, Isoquinoline)',
    visualReaction: 'Reddish-Orange Flocculent Precipitate / Intense Cell Stain',
    chemicalMechanism: 'Bismuth tetraiodide complex anion [BiI4]- pairs with protonated basic nitrogen of alkaloid cations to form an insoluble ion-pair.',
    pharmacognosticSignificance: 'Primary general screening reagent for plant alkaloids in Datura, Belladonna, Cinchona, Rauvolfia, Nux Vomica, and Ipecac.',
    colorClass: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    iconColor: 'text-amber-400'
  },
  {
    stainKey: 'vanillin_hcl',
    testName: 'Vanillin + HCl Oleo-Resin Pungency Test',
    reagentUsed: 'Vanillin Reagent (1% in EtOH) + Concentrated HCl (1:1 ratio)',
    targetConstituent: 'Pungent Oleo-Resins, Gingerols, Curcuminoids & Catechins',
    visualReaction: 'Deep Violet-Red / Intense Magenta Color Reaction',
    chemicalMechanism: 'Electrophilic aromatic substitution of vanillin aldehyde with phloroglucinol ring systems of gingerols and flavan-3-ols.',
    pharmacognosticSignificance: 'Specific pungency and resin marker for Ginger rhizome, Turmeric, Capsicum, and Catechu.',
    colorClass: 'border-violet-500/50 bg-violet-950/20 text-violet-300',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    iconColor: 'text-violet-400'
  },
  {
    stainKey: 'potassium_hydroxide',
    testName: 'Potassium Hydroxide (KOH 5%) Eugenol Test',
    reagentUsed: 'Potassium Hydroxide Aqueous Solution (5% w/v)',
    targetConstituent: 'Phenolic Volatile Oil Eugenol (Clove Bud Schizolysigenous Oil Glands)',
    visualReaction: 'Precipitation of Needle-Shaped Crystals of Potassium Eugenate inside Oil Glands',
    chemicalMechanism: 'Strong alkali KOH reacts with phenolic hydroxyl group of eugenol to yield insoluble crystalline potassium eugenate needles.',
    pharmacognosticSignificance: 'Pathognomonic B.Pharm practical test for official Clove Flower Bud (Syzygium aromaticum) vs exhausted cloves.',
    colorClass: 'border-yellow-500/50 bg-yellow-950/20 text-yellow-300',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    iconColor: 'text-yellow-400'
  },
  {
    stainKey: 'copper_sulfate',
    testName: 'Copper Sulfate + NaOH (Ephedra Biuret Test)',
    reagentUsed: 'CuSO4 (12%) + NaOH (20%) + Diethyl Ether',
    targetConstituent: 'Protoalkaloids Ephedrine & Pseudoephedrine (Ephedra Stem)',
    visualReaction: 'Deep Violet-Purple Color in Aqueous Layer & Red in Ether Layer',
    chemicalMechanism: 'Cu2+ ions form a coordination complex with secondary ethanolamine nitrogen of ephedrine in alkaline solution.',
    pharmacognosticSignificance: 'Diagnostic assay for Ephedra stem (Ephedra gerardiana / E. sinica) protoalkaloids in pharmacy syllabus.',
    colorClass: 'border-teal-500/50 bg-teal-950/20 text-teal-300',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    iconColor: 'text-teal-400'
  }
];

export const PhytochemicalLabPanel: React.FC<PhytochemicalLabPanelProps> = ({
  sample,
  onApplyStain,
  activeStain
}) => {
  const [selectedTestKey, setSelectedTestKey] = useState<StainType>(activeStain || 'sudan3');

  const selectedCatalogTest =
    PHYTOCHEMICAL_TEST_CATALOG.find((t) => t.stainKey === selectedTestKey) ||
    PHYTOCHEMICAL_TEST_CATALOG[0];

  // Match test against current sample's phytochemicalTests
  const sampleSpecificTest = sample.phytochemicalTests?.find(
    (t) =>
      t.testName.toLowerCase().includes(selectedCatalogTest.stainKey) ||
      t.reagentUsed.toLowerCase().includes(selectedCatalogTest.stainKey) ||
      (selectedCatalogTest.stainKey === 'sudan3' && t.testName.toLowerCase().includes('sudan')) ||
      (selectedCatalogTest.stainKey === 'phloroglucinol' && t.testName.toLowerCase().includes('phloroglucinol')) ||
      (selectedCatalogTest.stainKey === 'iodine' && t.testName.toLowerCase().includes('iodine')) ||
      (selectedCatalogTest.stainKey === 'ferric_chloride' && (t.testName.toLowerCase().includes('ferric') || t.testName.toLowerCase().includes('tannin'))) ||
      (selectedCatalogTest.stainKey === 'vanillin_hcl' && (t.testName.toLowerCase().includes('vanillin') || t.testName.toLowerCase().includes('gingerol'))) ||
      (selectedCatalogTest.stainKey === 'dragendorff' && (t.testName.toLowerCase().includes('dragendorff') || t.testName.toLowerCase().includes('alkaloid')))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-[#12151B] border border-slate-800 rounded-xl p-3 sm:p-4 shadow-2xl text-slate-300 space-y-4"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
            <FlaskConical className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <span>Phytochemical & Histochemical Test Suite</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">
              SPECIFIC CHEMICAL REAGENT TESTING & MECHANISMS
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
          {sample.phytochemicalTests?.length || 3} Active Tests
        </span>
      </div>

      {/* Test Buttons Selector Horizontal Scroll Rack */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1">
          <Beaker className="w-3.5 h-3.5 text-emerald-400" />
          Select Reagent & Test Protocol:
        </span>

        <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5">
          {PHYTOCHEMICAL_TEST_CATALOG.map((test) => {
            const isSelected = selectedTestKey === test.stainKey;
            return (
              <button
                key={test.stainKey}
                onClick={() => {
                  setSelectedTestKey(test.stainKey);
                  if (onApplyStain) onApplyStain(test.stainKey);
                }}
                className={`p-2 rounded-lg border text-left font-mono transition-all flex flex-col justify-between ${
                  isSelected
                    ? `${test.badgeBg} ring-1 ring-emerald-400/50 shadow-md`
                    : 'bg-[#0A0C10] hover:bg-slate-800/80 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] font-bold uppercase truncate">{test.testName.split(' ')[0]}</span>
                  <Droplets className={`w-3 h-3 ${isSelected ? test.iconColor : 'text-slate-500'}`} />
                </div>
                <span className="text-[9px] text-slate-400 truncate block">
                  {test.targetConstituent.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Selected Test Detailed Breakdown Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCatalogTest.stainKey}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={`p-3.5 rounded-xl border space-y-3 ${selectedCatalogTest.colorClass}`}
        >
          {/* Card Top Banner */}
          <div className="flex items-start justify-between border-b border-slate-800/80 pb-2.5">
            <div>
              <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${selectedCatalogTest.badgeBg}`}>
                Reagent Protocol: {selectedCatalogTest.stainKey.toUpperCase()}
              </span>
              <h4 className="text-sm font-extrabold text-slate-100 mt-1">{selectedCatalogTest.testName}</h4>
              <p className="text-[10px] text-slate-400 font-mono italic mt-0.5">
                Reagent Formula: {selectedCatalogTest.reagentUsed}
              </p>
            </div>

            {onApplyStain && (
              <button
                onClick={() => onApplyStain(selectedCatalogTest.stainKey)}
                className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded font-mono shadow-md flex items-center gap-1 shrink-0"
              >
                <Droplets className="w-3 h-3 text-slate-950" />
                <span>Simulate Stain</span>
              </button>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            {/* Target Compound */}
            <div className="bg-[#0A0C10]/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Atom className="w-3 h-3 text-emerald-400" />
                Target Phytochemical Constituent
              </span>
              <p className="text-slate-200 font-semibold text-[11px]">{selectedCatalogTest.targetConstituent}</p>
            </div>

            {/* Visual Reaction */}
            <div className="bg-[#0A0C10]/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Expected Chromatic Reaction
              </span>
              <p className="text-emerald-300 font-bold text-[11px]">{selectedCatalogTest.visualReaction}</p>
            </div>
          </div>

          {/* Chemical Mechanism */}
          <div className="bg-[#0A0C10]/80 p-2.5 rounded-lg border border-slate-800/80 text-xs space-y-1">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-mono flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              Chemical Mechanism & Reaction Kinetics
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">{selectedCatalogTest.chemicalMechanism}</p>
          </div>

          {/* Pharmacognostic Significance */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-lg text-xs space-y-1">
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block font-mono flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-emerald-400" />
              Official Pharmacopoeia Diagnostic Role
            </span>
            <p className="text-emerald-100/90 text-[11px] leading-relaxed">{selectedCatalogTest.pharmacognosticSignificance}</p>
          </div>

          {/* Current Loaded Sample-Specific Reaction Banner */}
          {sampleSpecificTest ? (
            <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Specific Result for {sample.name}:
                </span>
                <span className="text-emerald-400 uppercase">AUTHENTIC REACTION</span>
              </div>
              <p className="text-slate-200 text-[11px] font-semibold">{sampleSpecificTest.visualReaction}</p>
              <p className="text-slate-400 text-[10px]">{sampleSpecificTest.pharmacognosticSignificance}</p>
            </div>
          ) : (
            <div className="bg-slate-900/50 border border-slate-800 p-2.5 rounded-lg text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                To test this specific reagent on {sample.name}, click "Simulate Stain" above to view chromatic shifts in the microscope viewport!
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* All Phytochemical Tests List for Current Sample */}
      {sample.phytochemicalTests && sample.phytochemicalTests.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center gap-1">
            <Beaker className="w-3.5 h-3.5 text-emerald-400" />
            All Pharmacopoeial Tests for {sample.name}:
          </span>

          <div className="space-y-2">
            {sample.phytochemicalTests.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0A0C10] border border-slate-800 rounded-lg p-2.5 text-xs font-mono space-y-1"
              >
                <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                  <span>{t.testName}</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Reagent: {t.reagentUsed}
                  </span>
                </div>
                <div className="text-slate-300 text-[10px]">
                  <strong className="text-slate-400">Target:</strong> {t.targetConstituent}
                </div>
                <div className="text-amber-300 text-[10px] font-semibold">
                  <strong className="text-slate-400">Reaction:</strong> {t.visualReaction}
                </div>
                <div className="text-slate-400 text-[10px] leading-relaxed">
                  <strong className="text-slate-500">Mechanism:</strong> {t.chemicalMechanism}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
