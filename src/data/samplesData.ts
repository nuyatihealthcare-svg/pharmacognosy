import { BotanicalSample, QuizQuestion } from '../types';

export const BOTANICAL_SAMPLES: BotanicalSample[] = [
  {
    id: 'universal-leaf-ts',
    name: 'Universal Leaf T.S.',
    latinName: 'Folium Transverse Section Standard',
    family: 'Angiospermae',
    plantPart: 'Transverse Section of Foliar Tissue',
    organType: 'Leaf T.S.',
    description: 'Universal foliar cross-section showing upper and lower dermal cuticles, photosynthetic palisade mesophyll, spongy parenchyma, calcium oxalate inclusions, and vascular bundle.',
    differentiatingMarkers: [
      'Organ Type (Leaf T.S.): Uniseriate cuticular epidermis with compact vertical palisade cells confirms dorsiventral foliar lamina.',
      'Species Fingerprint: Cluster rosettes of calcium oxalate in spongy mesophyll idioblasts indicate Solanaceous leaf taxonomy.',
      'Cell Localization: Midrib crescent vascular bundle with radially aligned xylem vessels at [X: 50%, Y: 68%].'
    ],
    chemicalConstituents: ['Chlorophyll a/b', 'Flavonoid Glycosides', 'Calcium Oxalate Crystals', 'Cutin'],
    adulterantMarker: 'Presence of foreign starch granules or stone cell clusters indicates extraneous matter or pulverization adulteration.',
    histochemicalTest: 'Sudan III stains cuticular membrane orange-red; Phloroglucinol + HCl colors lignified xylem vessels red.',
    phytochemicalTests: [
      {
        testName: 'Sudan III / IV Cuticular Test',
        reagentUsed: 'Sudan III Alcoholic Solution (0.5%)',
        targetConstituent: 'Lipophilic Cutin & Outer Epidermal Cuticle',
        visualReaction: 'Brilliant Scarlet Orange-Red Staining on Outer Epidermal Cell Walls',
        chemicalMechanism: 'Lipophilic azo-dye Sudan III dissolves preferentially into fatty non-polar cutin and suberized membrane structures.',
        pharmacognosticSignificance: 'Verifies intact dermal cuticle layer and differentiates foliar drugs from subterranean uncutinized roots.'
      },
      {
        testName: 'Phloroglucinol + HCl Lignin Test',
        reagentUsed: 'Phloroglucinol (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Lignin in Xylem Vessels & Sclerenchyma Fibers',
        visualReaction: 'Deep Cherry-Red / Crimson Coloration in Midrib Vascular Ring',
        chemicalMechanism: 'Hydrochloric acid reacts with coniferaldehyde groups in lignin to form a bright crimson-red phloroglucide complex.',
        pharmacognosticSignificance: 'Diagnostic verification of lignified conducting xylem vessels and pericyclic fiber caps in foliar midrib.'
      },
      {
        testName: 'Iodine Solution Starch Check',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2) Solution',
        targetConstituent: 'Starch Granules (Amyloplasts)',
        visualReaction: 'No Reaction in Mesophyll (Remains Pale Yellow); Staining confirms cereal flour adulteration.',
        chemicalMechanism: 'Iodine molecules intercalate into helical amylose chains to yield a dark blue-black polyiodide inclusion complex.',
        pharmacognosticSignificance: 'Crucial purity screen to detect extraneous cereal or flour adulterants in powdered leaf drugs.'
      }
    ],
    bgColor: '#1a2e1e',
    deepAnalysisMetrics: {
      totalCellCount: 420,
      stomatalIndex: '21.4 - 23.2%',
      meanLumenDiameterMicrons: 45.0,
      cellWallThicknessMicrons: 4.2,
      lignificationDegree: 'Strong Midrib Xylem Lignification',
      purityScorePercent: 99.4,
      deepTissueSummary: 'Bifacial foliar cross-section displaying continuous uniseriate upper cuticle, single-layer compact palisade mesophyll, spongy mesophyll with calcium oxalate rosette inclusions, and crescentic vascular bundle.',
      qualityGrade: 'Grade A (Adulterant Free)',
      vascularBundleCount: 8,
      crystalInclusionDensity: '6.1 rosettes/mm²'
    },
    keyFeatures: [
      'Cuticular Dermal Layer & Stomata',
      'Photosynthetic Palisade Mesophyll',
      'Spongy Parenchyma with Idioblasts',
      'Concentric Vascular Arc & Xylem'
    ],
    features: [
      {
        id: 'leaf-rosette',
        name: 'Calcium Oxalate Rosette Crystal',
        botanicalTerm: 'Cluster Crystal (Rosette)',
        category: 'Inclusions',
        confidence: 0.97,
        x: 48,
        y: 52,
        radiusX: 6,
        radiusY: 6,
        polygonPoints: [
          [48, 46], [52, 48], [54, 52], [51, 56], [46, 57], [43, 53], [44, 48]
        ],
        sizeMicrons: 25,
        description: 'Star-like rosette cluster crystal of calcium oxalate inside spongy mesophyll idioblast cells.',
        diagnosticValue: 'Crucial diagnostic inclusion marker used in plant identification and purity verification.',
        stainingResponse: 'Insoluble in acetic acid; soluble in dilute HCl without effervescence.',
        pharmacognosticRole: 'Inorganic cellular waste byproduct accumulation.'
      },
      {
        id: 'leaf-epidermis-upper',
        name: 'Upper Cuticular Epidermis',
        botanicalTerm: 'Epidermis Superior',
        category: 'Dermal',
        confidence: 0.95,
        x: 50,
        y: 18,
        radiusX: 38,
        radiusY: 4,
        polygonPoints: [
          [12, 16], [88, 16], [88, 22], [12, 22]
        ],
        sizeMicrons: 18,
        description: 'Single continuous outer layer of tabular epidermal cells with protective cuticular layer.',
        diagnosticValue: 'Defines outer boundary and transpiration regulation barrier.',
        stainingResponse: 'Cuticle stains light pinkish-orange with Sudan III stain.',
        pharmacognosticRole: 'Protective dermal barrier resisting mechanical damage and water loss.'
      },
      {
        id: 'leaf-palisade',
        name: 'Palisade Parenchyma',
        botanicalTerm: 'Palisade Mesophyll',
        category: 'Ground/Cortex',
        confidence: 0.94,
        x: 50,
        y: 29,
        radiusX: 36,
        radiusY: 6,
        polygonPoints: [
          [14, 23], [86, 23], [86, 35], [14, 35]
        ],
        sizeMicrons: 65,
        description: 'Compacting column of elongated cylindrical photosynthetic palisade cells.',
        diagnosticValue: 'Palisade ratio and layer depth serve as species-specific diagnostic metrics.',
        stainingResponse: 'Chloroplast-rich cellulose walls stain bright pale green with Fast Green.',
        pharmacognosticRole: 'Primary light-harvesting photosynthetic zone.'
      },
      {
        id: 'leaf-trichome',
        name: 'Glandular / Covering Trichome',
        botanicalTerm: 'Trichoma Secretorium',
        category: 'Secretory',
        confidence: 0.92,
        x: 25,
        y: 12,
        radiusX: 5,
        radiusY: 7,
        polygonPoints: [
          [22, 6], [28, 6], [29, 14], [25, 18], [21, 14]
        ],
        sizeMicrons: 85,
        description: 'Outgrowth of epidermal cell forming protective or essential-oil secreting hair.',
        diagnosticValue: 'Morphology (unicellular, multicellular, warty, or branched) is a primary taxonomic key.',
        stainingResponse: 'Essential oils stain yellow-brown with Iodine or Sudan III.',
        pharmacognosticRole: 'Defensive trichome layer secreting secondary metabolites.'
      },
      {
        id: 'leaf-xylem',
        name: 'Vascular Xylem Vessels',
        botanicalTerm: 'Vasa Lignosa (Xylem)',
        category: 'Vascular',
        confidence: 0.98,
        x: 50,
        y: 68,
        radiusX: 12,
        radiusY: 8,
        polygonPoints: [
          [38, 62], [62, 62], [62, 74], [38, 74]
        ],
        sizeMicrons: 45,
        description: 'Lignified spiral and annular xylem vessels arranged in radial rows within midrib bundle.',
        diagnosticValue: 'Xylem vessel diameter and thickening patterns distinguish plant families.',
        stainingResponse: 'Stains intense cherry red with Phloroglucinol + concentrated HCl.',
        pharmacognosticRole: 'Conduction of water and dissolved minerals.'
      }
    ]
  },

  {
    id: 'universal-stem-ts',
    name: 'Universal Stem T.S.',
    latinName: 'Caulis Transverse Section Standard',
    family: 'Angiospermae',
    plantPart: 'Transverse Section of Stem Axis',
    organType: 'Stem T.S.',
    description: 'Universal stem section displaying concentric arrangement of dermal epidermis, cortical parenchyma, pericyclic sclerenchyma caps, open collateral vascular bundles with cambium, and central pith.',
    differentiatingMarkers: [
      'Organ Type (Stem T.S.): Concentric ring of open collateral vascular bundles around a large parenchymatous central pith confirms dicotyledonous stem axis.',
      'Species Fingerprint: Crescentic pericyclic sclerenchyma caps atop vascular bundles indicate robust herbaceous/woody stem.',
      'Cell Localization: Pericycle sclerenchyma cap at [X: 50%, Y: 42%], vascular bundle at [X: 50%, Y: 58%], central pith at [X: 50%, Y: 80%].'
    ],
    chemicalConstituents: ['Lignin', 'Cellulose', 'Tannins', 'Starch Reserves'],
    adulterantMarker: 'Disrupted ring arrangement or irregular vessel distribution signifies foreign herbaceous adulterants.',
    histochemicalTest: 'Phloroglucinol + HCl colors pericycle fiber caps and xylem vessels deep magenta red; Sudan III stains outer cuticle.',
    phytochemicalTests: [
      {
        testName: 'Phloroglucinol + HCl Lignified Ring Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Lignin in Xylem Vessels & Pericyclic Fiber Caps',
        visualReaction: 'Deep Cherry-Red / Crimson Ring Formation in Vascular Circle',
        chemicalMechanism: 'Reaction with coniferaldehyde linkages in heavily lignified xylem vessels and mechanical pericyclic sclerenchyma caps.',
        pharmacognosticSignificance: 'Confirms dicotyledonous stem architecture and pericyclic fiber cap density.'
      },
      {
        testName: 'Sudan III Dermal Cuticle Test',
        reagentUsed: 'Sudan III Solution (0.5% in EtOH)',
        targetConstituent: 'Outer Stem Epidermal Cuticle & Suberin',
        visualReaction: 'Scarlet Orange-Red Staining on Epidermal Margin',
        chemicalMechanism: 'Lipophilic dye partition into fatty cutinized epidermal wall layers.',
        pharmacognosticSignificance: 'Verifies outer protective stem boundary.'
      },
      {
        testName: 'Iodine Solution Pith Starch Check',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2)',
        targetConstituent: 'Parenchymatous Starch Grains in Cortical & Pith Cells',
        visualReaction: 'Dark Blue-Black Staining in Parenchyma Matrix',
        chemicalMechanism: 'Triiodide polyanion intercalation into helical amylose chains.',
        pharmacognosticSignificance: 'Evaluates carbohydrate storage reserves in stem axis.'
      }
    ],
    bgColor: '#1d2e28',
    keyFeatures: [
      'Concentric Open Collateral Bundles',
      'Lignified Pericycle Sclerenchyma Cap',
      'Active Cambium Ring Zone',
      'Expansive Central Pith Parenchyma'
    ],
    features: [
      {
        id: 'stem-bundle',
        name: 'Collateral Vascular Bundle',
        botanicalTerm: 'Fasciculus Vascularis Collateralis',
        category: 'Vascular',
        confidence: 0.98,
        x: 50,
        y: 58,
        radiusX: 14,
        radiusY: 12,
        polygonPoints: [
          [36, 46], [64, 46], [64, 70], [36, 70]
        ],
        sizeMicrons: 180,
        description: 'Wedge-shaped collateral bundle with outer phloem, inner xylem vessels, and intervascular cambium.',
        diagnosticValue: 'Ring arrangement (eustele) confirms dicotyledonous stem architecture.',
        stainingResponse: 'Lignified xylem stains bright red with Phloroglucinol; phloem stains green.',
        pharmacognosticRole: 'Conduction of organic nutrients (phloem) and mineral water (xylem).'
      },
      {
        id: 'stem-pericycle',
        name: 'Pericycle Sclerenchyma Cap',
        botanicalTerm: 'Hard Bast (Pericyclic Fibers)',
        category: 'Vascular',
        confidence: 0.95,
        x: 50,
        y: 42,
        radiusX: 12,
        radiusY: 5,
        polygonPoints: [
          [38, 37], [62, 37], [62, 47], [38, 47]
        ],
        sizeMicrons: 50,
        description: 'Crescent cap of thick-walled, heavily lignified sclerenchymatous mechanical fibers.',
        diagnosticValue: 'Provides structural rigidity and protects soft phloem elements.',
        stainingResponse: 'Stains bright crimson red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Mechanical support cap reinforcing stem vascular ring.'
      },
      {
        id: 'stem-pith',
        name: 'Central Pith Parenchyma',
        botanicalTerm: 'Medulla Parenchymatosa',
        category: 'Pith',
        confidence: 0.96,
        x: 50,
        y: 80,
        radiusX: 28,
        radiusY: 12,
        polygonPoints: [
          [22, 68], [78, 68], [78, 92], [22, 92]
        ],
        sizeMicrons: 120,
        description: 'Large polyhedral parenchymatous cells occupying central core of stem.',
        diagnosticValue: 'Relative pith diameter and presence of inclusions indicate stem maturity.',
        stainingResponse: 'Unlignified cellulose walls stain green with Fast Green stain.',
        pharmacognosticRole: 'Storage of water, starch, and soluble metabolites.'
      }
    ]
  },

  {
    id: 'universal-bark-ts',
    name: 'Universal Bark T.S.',
    latinName: 'Cortex et Phloem Transverse Section',
    family: 'Spermatophyta',
    plantPart: 'Transverse Section of Secondary Bark',
    organType: 'Bark T.S.',
    description: 'Universal secondary bark section showing suberized phellem cork rows, cortical parenchyma, secondary phloem, thick-walled sclerenchyma phloem fibers, and crystal sand/prisms.',
    chemicalConstituents: ['Suberin', 'Phlobaphenes', 'Alkaloid Tannates', 'Lignified Fibers'],
    adulterantMarker: 'Presence of continuous stone cell rings or wood xylem vessel fragments indicates adulteration or poor debarking.',
    histochemicalTest: 'Sudan III colors suberized cork layer red; Phloroglucinol + HCl turns phloem fibers crimson.',
    phytochemicalTests: [
      {
        testName: 'Sudan III Suberin Cork Test',
        reagentUsed: 'Sudan III Solution (0.5% in EtOH)',
        targetConstituent: 'Suberized Radial Cork Rows (Phellem)',
        visualReaction: 'Scarlet Orange-Red Staining on Stratified Outer Cork Layer',
        chemicalMechanism: 'Azo-dye partition into fatty suberized polymers in cork cell walls.',
        pharmacognosticSignificance: 'Verifies intact outer cork protective tissue in official bark drugs.'
      },
      {
        testName: 'Phloroglucinol + HCl Phloem Fiber Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Secondary Phloem Sclerenchyma Fibers',
        visualReaction: 'Intense Crimson-Red / Magenta Color Reaction',
        chemicalMechanism: 'Reaction with coniferaldehyde linkages in heavily lignified fiber walls.',
        pharmacognosticSignificance: 'Diagnostic verification of phloem fibers vs unlignified parenchymatous tissue.'
      },
      {
        testName: 'Ferric Chloride Cortical Tannin Test',
        reagentUsed: 'Ferric Chloride (5% FeCl3 aqueous)',
        targetConstituent: 'Condensed & Hydrolysable Cortical Tannins',
        visualReaction: 'Dark Blue-Black or Greenish-Black Coloration in Cortex',
        chemicalMechanism: 'Fe3+ complexation with phenolic hydroxyl groups in bark parenchyma.',
        pharmacognosticSignificance: 'Assesses astringent tannin content in medicinal bark samples.'
      }
    ],
    bgColor: '#331f16',
    keyFeatures: [
      'Suberized Stratified Cork (Phellem)',
      'Isolated Lignified Phloem Fibers',
      'Cortical Parenchyma with Tannins',
      'Calcium Oxalate Micro-crystals'
    ],
    features: [
      {
        id: 'bark-fiber',
        name: 'Lignified Phloem Fiber',
        botanicalTerm: 'Phloem Sclerenchyma Fiber',
        category: 'Vascular',
        confidence: 0.99,
        x: 45,
        y: 55,
        radiusX: 12,
        radiusY: 10,
        polygonPoints: [
          [33, 46], [57, 46], [58, 64], [32, 64]
        ],
        sizeMicrons: 90,
        description: 'Thick-walled, heavily lignified secondary phloem fiber with narrow lumen and pit canals.',
        diagnosticValue: 'Fiber arrangement (isolated vs grouped in tangential bands) is a key diagnostic.',
        stainingResponse: 'Turns intense crimson red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Structural reinforcement of secondary phloem.'
      },
      {
        id: 'bark-cork',
        name: 'Outer Cork Layer (Phellem)',
        botanicalTerm: 'Phellem Suberiosum',
        category: 'Dermal',
        confidence: 0.96,
        x: 50,
        y: 15,
        radiusX: 42,
        radiusY: 6,
        polygonPoints: [
          [8, 8], [92, 8], [92, 22], [8, 22]
        ],
        sizeMicrons: 30,
        description: 'Radial rows of suberized cork cells containing brown pigment and tannins.',
        diagnosticValue: 'Suberized protective tissue layer characteristic of woody barks.',
        stainingResponse: 'Suberin walls stain orange-red with Sudan III.',
        pharmacognosticRole: 'Outer protective bark layer resisting pathogens and desiccation.'
      }
    ]
  },

  {
    id: 'universal-fruit-ts',
    name: 'Universal Fruit/Seed T.S.',
    latinName: 'Fructus et Semen Transverse Section',
    family: 'Angiospermae',
    plantPart: 'Transverse Section of Fruit Pericarp & Seed',
    organType: 'Fruit T.S.',
    description: 'Universal fruit and seed section showing epicarp dermal layer, mesocarp with secretory oil ducts (vittae), lignified endocarp, and endosperm packed with aleurone grains and fixed fats.',
    chemicalConstituents: ['Essential Volatile Oils', 'Aleurone Proteins', 'Fixed Triglycerides', 'Calcium Oxalate'],
    adulterantMarker: 'Exhausted fruits show collapsed epithelial oil canals and absence of volatile oil staining.',
    histochemicalTest: 'Sudan III stains volatile oil drops inside vittae bright orange-red; Iodine turns aleurone proteins brown.',
    phytochemicalTests: [
      {
        testName: 'Sudan III Volatile Oil Vitta Test',
        reagentUsed: 'Sudan III Alcoholic Solution (0.5%)',
        targetConstituent: 'Essential Volatile Oils in Secretory Vittae',
        visualReaction: 'Scarlet Orange-Red Droplets inside Oil Ducts',
        chemicalMechanism: 'Lipophilic dye partition into non-polar volatile essential oil drops in schizogenous canals.',
        pharmacognosticSignificance: 'Verifies presence of volatile oils in fruit pericarp.'
      },
      {
        testName: 'Iodine Solution Aleurone Protein Test',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2)',
        targetConstituent: 'Aleurone Protein Bodies in Endosperm Cells',
        visualReaction: 'Golden Yellow-Brown Staining of Reserve Endosperm',
        chemicalMechanism: 'Iodine reaction with protein matrix peptide bonds.',
        pharmacognosticSignificance: 'Diagnostic verification of seed endosperm reserve protein bodies.'
      }
    ],
    bgColor: '#332a18',
    keyFeatures: [
      'Secretory Epithelial Oil Ducts (Vittae)',
      'Lignified Pericarp Vascular Ridges',
      'Endosperm with Aleurone Protein Grains',
      'Fixed Fat Globules'
    ],
    features: [
      {
        id: 'fruit-vitta',
        name: 'Secretory Oil Duct (Vitta)',
        botanicalTerm: 'Schizogenous Oleo-Resin Canal',
        category: 'Secretory',
        confidence: 0.99,
        x: 32,
        y: 48,
        radiusX: 10,
        radiusY: 10,
        polygonPoints: [
          [22, 38], [42, 38], [42, 58], [22, 58]
        ],
        sizeMicrons: 220,
        description: 'Large elliptical oil duct lined with secretory epithelial cells containing volatile essential oils.',
        diagnosticValue: 'Number and arrangement of oil ducts serve as key diagnostic features for fruit identification.',
        stainingResponse: 'Oil content turns bright orange-red with Sudan III stain.',
        pharmacognosticRole: 'Secretory synthesis and storage of aromatic volatile oils.'
      },
      {
        id: 'fruit-endosperm',
        name: 'Endosperm with Aleurone Grains',
        botanicalTerm: 'Endospermium Proteinaceum',
        category: 'Ground/Cortex',
        confidence: 0.95,
        x: 65,
        y: 60,
        radiusX: 20,
        radiusY: 15,
        polygonPoints: [
          [45, 45], [85, 45], [85, 75], [45, 75]
        ],
        sizeMicrons: 35,
        description: 'Nutritive parenchymatous tissue packed with aleurone protein bodies and fixed oil droplets.',
        diagnosticValue: 'Contains protein reserves and micro-rosette inclusions.',
        stainingResponse: 'Proteins stain golden brown with Iodine; fixed oils stain red with Sudan III.',
        pharmacognosticRole: 'Nutritive reserve storage for seed embryo.'
      }
    ]
  },

  {
    id: 'universal-rhizome-ts',
    name: 'Universal Rhizome T.S.',
    latinName: 'Rhizoma Transverse Section Standard',
    family: 'Monocotyledoneae / Dicotyledoneae',
    plantPart: 'Transverse Section of Subterranean Rhizome',
    organType: 'Rhizome T.S.',
    description: 'Universal subterranean rhizome section showing cortex, endodermis boundary, stele with vascular bundles, abundant starch grains, and oleo-resin secretory cells.',
    chemicalConstituents: ['Starch Granules', 'Pungent Oleo-Resins', 'Essential Oils', 'Phenolic Compounds'],
    adulterantMarker: 'Presence of gelatinized or foreign cereal starches indicates adulteration or overheating.',
    histochemicalTest: 'Iodine solution colors starch grains dark blue-black; Vanillin-HCl colors oleo-resin cells purple-violet.',
    phytochemicalTests: [
      {
        testName: 'Iodine Solution Reserve Starch Test',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2) Solution',
        targetConstituent: 'Amyloplast Starch Granules with Eccentric Hilum',
        visualReaction: 'Deep Indigo Blue-Black Staining on Parenchymatous Starch Granules',
        chemicalMechanism: 'Helical amylose inclusion complex with triiodide anions.',
        pharmacognosticSignificance: 'Verifies subterranean carbohydrate storage reserves and starch grain morphology.'
      },
      {
        testName: 'Vanillin + HCl Oleo-Resin Pungency Test',
        reagentUsed: 'Vanillin (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Oleo-Resin Secretory Idioblasts',
        visualReaction: 'Intense Red-Violet / Deep Purple Coloration',
        chemicalMechanism: 'Acid condensation of vanillin with phenolic oleo-resin components.',
        pharmacognosticSignificance: 'Confirmation of active pungent oleo-resin idioblasts in rhizome parenchymatous tissue.'
      },
      {
        testName: 'Sudan III Secretory Oil Drop Test',
        reagentUsed: 'Sudan III Solution (0.5% in EtOH)',
        targetConstituent: 'Lipids & Volatile Essential Oil Drops',
        visualReaction: 'Scarlet Orange-Red Droplets inside Oleo-Resin Idioblasts',
        chemicalMechanism: 'Dye partition into non-polar essential oil droplets.',
        pharmacognosticSignificance: 'Shows unextracted volatile oil content.'
      }
    ],
    bgColor: '#362e1c',
    keyFeatures: [
      'Abundant Characteristic Starch Granules',
      'Oleo-Resin Secretory Parenchyma Cells',
      'Unlignified or Lignified Vascular Bundles',
      'Distinct Cortical & Stelar Boundary'
    ],
    features: [
      {
        id: 'rhizome-starch',
        name: 'Reserve Starch Granules',
        botanicalTerm: 'Amylum Granules',
        category: 'Inclusions',
        confidence: 0.99,
        x: 42,
        y: 48,
        radiusX: 12,
        radiusY: 9,
        polygonPoints: [
          [30, 39], [54, 39], [54, 57], [30, 57]
        ],
        sizeMicrons: 40,
        description: 'Characteristic simple starch grains with eccentric hilum and delicate growth striations.',
        diagnosticValue: 'Starch shape, size, and hilum position are pathognomonic diagnostic identifiers.',
        stainingResponse: 'Stains deep indigo blue-black with Iodine solution.',
        pharmacognosticRole: 'Primary carbohydrate storage in subterranean plant organs.'
      },
      {
        id: 'rhizome-oleoresin',
        name: 'Oleo-Resin Secretory Cell',
        botanicalTerm: 'Secretory Idioblast',
        category: 'Secretory',
        confidence: 0.96,
        x: 65,
        y: 35,
        radiusX: 8,
        radiusY: 8,
        polygonPoints: [
          [57, 27], [73, 27], [73, 43], [57, 43]
        ],
        sizeMicrons: 60,
        description: 'Isolated rounded parenchymatous cell filled with golden essential oil and resinous drops.',
        diagnosticValue: 'Provides characteristic aroma, pungency, and active medicinal properties.',
        stainingResponse: 'Stains red with Sudan III; turns violet-pink with Vanillin + HCl.',
        pharmacognosticRole: 'Synthesis and storage of active oleo-resins and terpenes.'
      }
    ]
  },

  {
    id: 'datura-stramonium-leaf',
    name: 'Datura Stramonium Leaf T.S.',
    latinName: 'Datura stramonium L.',
    family: 'Solanaceae',
    plantPart: 'Crude Foliar Drug (Thornapple Leaf)',
    organType: 'Leaf T.S.',
    description: 'Bifacial leaf cross-section showing single layer palisade, anisocytic stomata, uniseriate covering trichomes, micro-rosette calcium oxalate crystals in spongy mesophyll, and bicollateral vascular bundles.',
    differentiatingMarkers: [
      'Anisocytic Stomata: 3 guard cells where 1 cell is conspicuously smaller than other two.',
      'Crystal Rosettes: Solanaceous calcium oxalate rosettes in spongy mesophyll idioblasts.',
      'Bicollateral Midrib Bundle: Phloem situated both adaxially and abaxially to central xylem.'
    ],
    chemicalConstituents: ['Hyoscyamine', 'Scopolamine (Hyoscine)', 'Atropine', 'Calcium Oxalate'],
    adulterantMarker: 'Presence of micro-spheroidal crystals or double row palisade indicates Xanthium or Solanum dulcamara adulterants.',
    histochemicalTest: 'Vitali-Morin test yields violet-purple coloration for tropane alkaloids; Sudan III stains cuticle orange-red.',
    phytochemicalTests: [
      {
        testName: 'Vitali-Morin Tropane Alkaloid Test',
        reagentUsed: 'Fuming Nitric Acid (HNO3) + 3% Alcoholic KOH',
        targetConstituent: 'Tropane Alkaloids (Hyoscyamine, Scopolamine, Atropine)',
        visualReaction: 'Intense Violet-Purple Ring / Solution Coloration',
        chemicalMechanism: 'Nitration of benzene ring of tropic acid residue followed by resonance-stabilized quinonoid anion formation in alkaline medium.',
        pharmacognosticSignificance: 'Official pharmacopoeial confirmation for Solanaceous tropane alkaloid crude drugs.'
      },
      {
        testName: 'Sudan III Cutin Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Dermal Cutin Membrane & Warty Trichome Walls',
        visualReaction: 'Brilliant Scarlet Orange-Red Staining on Epidermis and Trichomes',
        chemicalMechanism: 'Lipophilic dye partition into fatty cutinized cell walls.',
        pharmacognosticSignificance: 'Verifies leaf surface cuticle and multicellular warty covering hair structures.'
      },
      {
        testName: 'Dragendorff Reagent Precipitation Test',
        reagentUsed: 'Potassium Bismuth Iodide (Dragendorff Reagent)',
        targetConstituent: 'Total Solanaceous Alkaloid Bases',
        visualReaction: 'Dense Orange-Red Flocculent Precipitate',
        chemicalMechanism: 'Bismuth tetraiodide complex anion pairs with protonated tertiary amine alkaloid cations.',
        pharmacognosticSignificance: 'Rapid qualitative screening test for total alkaloidal strength in Datura leaf.'
      }
    ],
    bgColor: '#162b1b',
    deepAnalysisMetrics: {
      totalCellCount: 480,
      stomatalIndex: '20.2 - 22.8%',
      meanLumenDiameterMicrons: 38.0,
      cellWallThicknessMicrons: 3.8,
      lignificationDegree: 'Moderate Midrib Xylem Lignification',
      purityScorePercent: 99.6,
      deepTissueSummary: 'Authentic Datura stramonium leaf section displaying single-layer palisade mesophyll (palisade ratio 4-7), anisocytic stomata, cluster rosette crystals, and bicollateral vascular midrib arc.',
      qualityGrade: 'Grade A IP/BP Pharmacopoeia Grade',
      vascularBundleCount: 6,
      crystalInclusionDensity: '7.8 rosettes/mm²'
    },
    keyFeatures: [
      'Anisocytic Stomatal Apparatus',
      'Calcium Oxalate Cluster Rosettes',
      'Uniseriate Multicellular Trichomes',
      'Bicollateral Vascular Bundle Arc'
    ],
    features: [
      {
        id: 'datura-rosette',
        name: 'Calcium Oxalate Cluster Rosette',
        botanicalTerm: 'Rosette Idioblast',
        category: 'Inclusions',
        confidence: 0.98,
        x: 45,
        y: 52,
        radiusX: 7,
        radiusY: 7,
        polygonPoints: [[38,45],[52,45],[52,59],[38,59]],
        sizeMicrons: 28,
        description: 'Star-like rosette crystal of calcium oxalate lying inside parenchymatous spongy mesophyll cell.',
        diagnosticValue: 'Key inclusions marker distinguishing Datura from Hyoscyamus (micro-prisms).',
        stainingResponse: 'Soluble in dilute HCl without gas effervescence.',
        pharmacognosticRole: 'Metabolic byproduct accumulation in Solanaceous leaves.'
      },
      {
        id: 'datura-palisade',
        name: 'Palisade Mesophyll Layer',
        botanicalTerm: 'Palisade Parenchyma',
        category: 'Ground/Cortex',
        confidence: 0.96,
        x: 50,
        y: 28,
        radiusX: 38,
        radiusY: 6,
        polygonPoints: [[12,22],[88,22],[88,34],[12,34]],
        sizeMicrons: 60,
        description: 'Single continuous layer of closely packed columnar cells rich in chloroplasts.',
        diagnosticValue: 'Palisade ratio (4 to 7) serves as official pharmacopoeial diagnostic metric.',
        stainingResponse: 'Stains light green with Fast Green solution.',
        pharmacognosticRole: 'Photosynthetic light conversion layer.'
      },
      {
        id: 'datura-trichome',
        name: 'Multicellular Warty Trichome',
        botanicalTerm: 'Trichoma Non-secretorium',
        category: 'Dermal',
        confidence: 0.94,
        x: 28,
        y: 12,
        radiusX: 5,
        radiusY: 8,
        polygonPoints: [[23,4],[33,4],[33,20],[23,20]],
        sizeMicrons: 110,
        description: 'Conical 3-to-5 celled uniseriate covering hair with coarse warty cuticular wall.',
        diagnosticValue: 'Warty outer cuticle hair is pathognomonic for Datura stramonium.',
        stainingResponse: 'Cuticle stains light red with Sudan III.',
        pharmacognosticRole: 'Defensive epidermal hair barrier.'
      }
    ]
  },

  {
    id: 'cinchona-calisaya-bark',
    name: 'Cinchona Bark T.S.',
    latinName: 'Cinchona calisaya Wedd.',
    family: 'Rubiaceae',
    plantPart: 'Crude Bark Drug (Quinine Bark)',
    organType: 'Bark T.S.',
    description: 'Secondary bark section showing dark red suberized cork, phelloderm with phlobaphenes, secondary phloem with large isolated spindle-shaped phloem fibers, medullary rays, and micro-crystal sand.',
    differentiatingMarkers: [
      'Phloem Fibers: Large (up to 90µm wide), isolated or in pairs, spindle-shaped with funnel pit canals and narrow lumen.',
      'Crystal Sand: Parenchyma cells filled with micro-sphenoidal calcium oxalate sand.',
      'Phlobaphenes: Reddish-brown tannin derivative deposits in cortical layers.'
    ],
    chemicalConstituents: ['Quinine', 'Quinidine', 'Cinchonine', 'Cinchonidine', 'Cinchotannic Acid'],
    adulterantMarker: 'Presence of continuous stone cell rings indicates Cinchona lansa or false barks.',
    histochemicalTest: 'Phloroglucinol + HCl colors phloem fibers crimson; Sudan III stains cork layers red; FeCl3 gives blue-black tannin test.',
    phytochemicalTests: [
      {
        testName: 'Thalleioquin Reaction (Quinine Specific)',
        reagentUsed: 'Bromine Water + Dilute Ammonia (NH4OH)',
        targetConstituent: 'Quinine & Quinidine Alkaloids',
        visualReaction: 'Vibrant Emerald Green (Thalleioquin) Coloration',
        chemicalMechanism: 'Bromination of methoxy-quinoline nucleus followed by oxidative condensation to emerald green thalleioquin dye.',
        pharmacognosticSignificance: 'Pathognomonic confirmation for official 6-methoxy cinchona alkaloids.'
      },
      {
        testName: 'Phloroglucinol + HCl Lignified Fiber Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Isolated Spindle-Shaped Phloem Fibers',
        visualReaction: 'Intense Crimson-Red / Magenta Reaction on Giant Phloem Fibers',
        chemicalMechanism: 'Reaction with lignin coniferaldehyde linkages in heavy secondary cell walls.',
        pharmacognosticSignificance: 'Diagnostic verification of isolated thick-walled phloem fibers with funnel pits.'
      },
      {
        testName: 'Sudan III Cork Suberin Test',
        reagentUsed: 'Sudan III Solution (0.5% in EtOH)',
        targetConstituent: 'Outer Phellem Cork Suberin',
        visualReaction: 'Scarlet Orange-Red Staining on Outer Radial Cork Rows',
        chemicalMechanism: 'Dye absorption into lipophilic suberin polymers in cork cell walls.',
        pharmacognosticSignificance: 'Verifies outer protective bark layers in unpeeled cinchona drug.'
      },
      {
        testName: 'Ferric Chloride Tannin Test',
        reagentUsed: 'Ferric Chloride (5% FeCl3 aqueous)',
        targetConstituent: 'Cinchotannic Acid & Phlobaphenes',
        visualReaction: 'Bluish-Black Precipitate / Solution In Cortex',
        chemicalMechanism: 'Fe3+ ions complex with ortho-dihydroxy phenolic groups of cinchotannic acid.',
        pharmacognosticSignificance: 'Determines presence of astringent tannin constituents.'
      }
    ],
    bgColor: '#381c15',
    deepAnalysisMetrics: {
      totalCellCount: 390,
      stomatalIndex: 'N/A (Bark Organ)',
      meanLumenDiameterMicrons: 22.0,
      cellWallThicknessMicrons: 14.5,
      lignificationDegree: 'Extremely High (Phloem Sclereids & Fibers)',
      purityScorePercent: 99.5,
      deepTissueSummary: 'Authentic Cinchona bark display featuring characteristic large isolated thick-walled phloem fibers, suberized cork rows, micro-sphenoidal crystal sand, and phlobaphene deposits.',
      qualityGrade: 'Grade A Official Quinine Bark Standard',
      vascularBundleCount: 0,
      crystalInclusionDensity: '12.4 sand-clusters/mm²'
    },
    keyFeatures: [
      'Isolated Spindle Phloem Fibers',
      'Micro-sphenoidal Calcium Oxalate Sand',
      'Reddish-Brown Phlobaphene Deposits',
      'Suberized Stratified Cork Layers'
    ],
    features: [
      {
        id: 'cinchona-fiber',
        name: 'Isolated Spindle Phloem Fiber',
        botanicalTerm: 'Sclerenchyma Phloem Fiber',
        category: 'Vascular',
        confidence: 0.99,
        x: 48,
        y: 54,
        radiusX: 14,
        radiusY: 10,
        polygonPoints: [[34,44],[62,44],[62,64],[34,64]],
        sizeMicrons: 85,
        description: 'Thick-walled, heavily lignified spindle-shaped fiber with striations and funnel-shaped pit canals.',
        diagnosticValue: 'Isolated distribution and funnel pits are pathognomonic for authentic Cinchona bark.',
        stainingResponse: 'Turns deep cherry red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Structural mechanical reinforcement of secondary bark.'
      },
      {
        id: 'cinchona-cork',
        name: 'Suberized Cork Layers (Phellem)',
        botanicalTerm: 'Phellem Suberiosum',
        category: 'Dermal',
        confidence: 0.96,
        x: 50,
        y: 16,
        radiusX: 40,
        radiusY: 6,
        polygonPoints: [[10,10],[90,10],[90,22],[10,22]],
        sizeMicrons: 32,
        description: 'Radial rows of tabular cork cells impregnated with suberin and red-brown phlobaphenes.',
        diagnosticValue: 'Protective outer cork barrier characteristic of official cinchona barks.',
        stainingResponse: 'Suberin stains orange-red with Sudan III.',
        pharmacognosticRole: 'Outer protective bark layer.'
      },
      {
        id: 'cinchona-sand',
        name: 'Micro-sphenoidal Crystal Sand',
        botanicalTerm: 'Micro-crystal Sand Idioblast',
        category: 'Inclusions',
        confidence: 0.95,
        x: 68,
        y: 42,
        radiusX: 8,
        radiusY: 8,
        polygonPoints: [[60,34],[76,34],[76,50],[60,50]],
        sizeMicrons: 18,
        description: 'Parenchyma idioblast completely filled with minute sphenoidal calcium oxalate micro-crystals.',
        diagnosticValue: 'Key crystal marker distinguishing Cinchona from other medicinal barks.',
        stainingResponse: 'Dissolves in dilute HCl without gas bubbles.',
        pharmacognosticRole: 'Inorganic cellular byproduct accumulation.'
      }
    ]
  },

  {
    id: 'zingiber-officinale-rhizome',
    name: 'Ginger (Zingiber) Rhizome T.S.',
    latinName: 'Zingiber officinale Roscoe',
    family: 'Zingiberaceae',
    plantPart: 'Crude Subterranean Rhizome Drug',
    organType: 'Rhizome T.S.',
    description: 'Subterranean rhizome section displaying wide cortex, narrow endodermis boundary, stele filled with simple sack-shaped starch grains with eccentric hilum, oleo-resin cells, and unlignified thin-walled vascular bundles.',
    differentiatingMarkers: [
      'Starch Morphology: Simple sack-shaped/flat lenticular starch grains with beak-like projection and eccentric hilum at apex.',
      'Oleo-Resin Cells: Abundant bright yellow circular idioblasts containing volatile gingerol oil and resin.',
      'Vascular Bundles: Closed collateral bundles without sclerenchymatous fiber caps in inner stele.'
    ],
    chemicalConstituents: ['Gingerol', 'Shogaol', 'Zingiberene', 'Curcumene', 'Reserve Starch'],
    adulterantMarker: 'Presence of gelatinized starch or excessive lignified fibers indicates exhausted or heat-damaged ginger.',
    histochemicalTest: 'Sudan III stains oleo-resin cells orange-red; Vanillin-HCl turns gingerols purple; Iodine colors starch indigo.',
    phytochemicalTests: [
      {
        testName: 'Sudan III / IV Essential Oil Test',
        reagentUsed: 'Sudan III Alcoholic Solution (0.5%)',
        targetConstituent: 'Volatile Essential Oils & Oleo-Resin Idioblasts',
        visualReaction: 'Vibrant Scarlet Orange-Red Droplets inside Oleo-Resin Parenchyma Cells',
        chemicalMechanism: 'Lipophilic dye partitions into fatty essential oil and terpene droplets contained in oleo-resin idioblasts.',
        pharmacognosticSignificance: 'Verifies presence of unexhausted volatile gingerol oil in authentic Zingiber rhizome.'
      },
      {
        testName: 'Vanillin + HCl Gingerol Pungency Test',
        reagentUsed: 'Vanillin Reagent (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Pungent Phenolic Gingerols & Shogaols',
        visualReaction: 'Intense Red-Violet / Deep Magenta Color Reaction',
        chemicalMechanism: 'Acid-catalyzed condensation of vanillin aldehyde with ortho-methoxyphenol moiety of gingerols.',
        pharmacognosticSignificance: 'Official chemical proof of therapeutic pungency and active gingerol content.'
      },
      {
        testName: 'Iodine Solution Apical Starch Test',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2) Solution',
        targetConstituent: 'Sack-Shaped Starch Granules with Apical Eccentric Hilum',
        visualReaction: 'Deep Indigo Blue-Black Staining on Sack-Shaped Granules',
        chemicalMechanism: 'Triiodide polyanion (I3-) inclusion into amylose helical cavities.',
        pharmacognosticSignificance: 'Verifies characteristic sack-shaped starch grains with apical beak hilum.'
      }
    ],
    bgColor: '#332917',
    deepAnalysisMetrics: {
      totalCellCount: 520,
      stomatalIndex: 'N/A (Subterranean Organ)',
      meanLumenDiameterMicrons: 35.0,
      cellWallThicknessMicrons: 2.2,
      lignificationDegree: 'Low Lignification (Unlignified Vascular Bundles)',
      purityScorePercent: 99.8,
      deepTissueSummary: 'Authentic Zingiber officinale section packed with simple sack-shaped starch grains with apical eccentric hilum, bright yellow oleo-resin idioblasts, and clear endodermal ring boundary.',
      qualityGrade: 'Grade A Official Ginger Rhizome Standard',
      vascularBundleCount: 24,
      crystalInclusionDensity: '0.0 (No Calcium Oxalate Crystals)'
    },
    keyFeatures: [
      'Apical Eccentric Hilum Sack Starch Grains',
      'Golden Yellow Oleo-Resin Idioblasts',
      'Distinct Endodermal Ring Boundary',
      'Unlignified Collateral Vascular Bundles'
    ],
    features: [
      {
        id: 'ginger-starch',
        name: 'Sack-shaped Starch Granule',
        botanicalTerm: 'Amylum Sack-Granule',
        category: 'Inclusions',
        confidence: 0.99,
        x: 42,
        y: 50,
        radiusX: 11,
        radiusY: 8,
        polygonPoints: [[31,42],[53,42],[53,58],[31,58]],
        sizeMicrons: 42,
        description: 'Flat, ovate to sack-shaped starch grain featuring a prominent beak-like apex with eccentric terminal hilum.',
        diagnosticValue: 'Apical eccentric hilum is pathognomonic diagnostic proof for authentic Zingiber officinale.',
        stainingResponse: 'Stains deep indigo blue-black with Iodine solution.',
        pharmacognosticRole: 'Primary carbohydrate energy store.'
      },
      {
        id: 'ginger-oleoresin',
        name: 'Oleo-Resin Secretory Idioblast',
        botanicalTerm: 'Secretory Idioblastus',
        category: 'Secretory',
        confidence: 0.97,
        x: 64,
        y: 38,
        radiusX: 8,
        radiusY: 8,
        polygonPoints: [[56,30],[72,30],[72,46],[56,46]],
        sizeMicrons: 65,
        description: 'Spherical parenchymatous cell filled with golden essential oil containing gingerol and shogaol.',
        diagnosticValue: 'Imparts characteristic aromatic odour and pungent therapeutic action.',
        stainingResponse: 'Stains intense violet-pink with Vanillin + HCl reagent.',
        pharmacognosticRole: 'Synthesis of active pungent gingerols.'
      }
    ]
  },

  {
    id: 'foeniculum-vulgare-fruit',
    name: 'Fennel (Foeniculum) Fruit T.S.',
    latinName: 'Foeniculum vulgare Mill.',
    family: 'Apiaceae (Umbelliferae)',
    plantPart: 'Crude Cremocarp Fruit Drug',
    organType: 'Fruit T.S.',
    description: 'Cremocarp fruit cross section showing 5 prominent primary ridges, 6 schizogenous vittae (4 dorsal, 2 commissural), reticulate lignified pericarp parenchyma, carpophore, and endosperm packed with aleurone grains and micro-rosettes.',
    differentiatingMarkers: [
      'Vittae Count: Exactly 6 large elliptical oil ducts (4 on dorsal surface, 2 on commissural surface).',
      'Endosperm Inclusions: Aleurone protein grains containing minute calcium oxalate rosette crystals.',
      'Pericarp Ridges: 5 prominent primary ridges containing bicollateral vascular bundles with reticulate lignified cells.'
    ],
    chemicalConstituents: ['trans-Anethole', 'Fenchone', 'Estragole', 'Fixed Oil', 'Aleurone Protein'],
    adulterantMarker: 'Exhausted fruits show dark collapsed vittae lacking volatile oil stain response.',
    histochemicalTest: 'Sudan III stains essential oil inside vittae bright orange-red; Iodine stains aleurone grains golden brown.',
    phytochemicalTests: [
      {
        testName: 'Sudan III / IV Volatile Oil Vitta Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Volatile Essential Oils (trans-Anethole & Fenchone) inside Vittae',
        visualReaction: 'Brilliant Scarlet Orange-Red Staining inside 6 Schizogenous Oil Canals',
        chemicalMechanism: 'Lipophilic dye partition into non-polar volatile essential oil droplets contained in epithelial vittae.',
        pharmacognosticSignificance: 'Diagnostic confirmation of unexhausted aromatic Umbelliferous cremocarp fruit.'
      },
      {
        testName: 'Iodine Solution Protein & Aleurone Test',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2) Solution',
        targetConstituent: 'Aleurone Protein Bodies in Endosperm',
        visualReaction: 'Golden Yellow-Brown Staining of Endosperm Cells',
        chemicalMechanism: 'Iodine reaction with peptide chains in reserve aleurone protein bodies.',
        pharmacognosticSignificance: 'Verifies intact endosperm protein reserves and micro-rosette calcium oxalate inclusions.'
      },
      {
        testName: 'Phloroglucinol + HCl Pericarp Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Lignified Reticulate Pericarp Parenchyma & Vascular Bundles',
        visualReaction: 'Cherry-Red Coloration in Primary Ridge Vascular Cores',
        chemicalMechanism: 'Acid reaction with coniferaldehyde linkages in lignified pericarp cell walls.',
        pharmacognosticSignificance: 'Highlights 5 primary vascular ridges of cremocarp pericarp.'
      }
    ],
    bgColor: '#312918',
    deepAnalysisMetrics: {
      totalCellCount: 460,
      stomatalIndex: 'N/A (Fruit Pericarp)',
      meanLumenDiameterMicrons: 110.0,
      cellWallThicknessMicrons: 4.0,
      lignificationDegree: 'Moderate Lignification (Reticulate Pericarp)',
      purityScorePercent: 99.3,
      deepTissueSummary: 'Authentic Foeniculum vulgare fruit section showcasing 6 prominent schizogenous vittae, reticulate lignified pericarp cells, carpophore, and endosperm with aleurone grains containing micro-rosettes.',
      qualityGrade: 'Grade A Official Fennel Cremocarp Standard',
      vascularBundleCount: 5,
      crystalInclusionDensity: '18.5 micro-rosettes/mm²'
    },
    keyFeatures: [
      '6 Schizogenous Secretory Vittae',
      'Reticulate Lignified Pericarp Cells',
      'Endosperm Aleurone Grains with Micro-rosettes',
      'Central Bifid Carpophore'
    ],
    features: [
      {
        id: 'fennel-vitta',
        name: 'Schizogenous Secretory Vitta',
        botanicalTerm: 'Vitta Secretoria (Oil Canal)',
        category: 'Secretory',
        confidence: 0.99,
        x: 32,
        y: 46,
        radiusX: 11,
        radiusY: 11,
        polygonPoints: [[21,35],[43,35],[43,57],[21,57]],
        sizeMicrons: 220,
        description: 'Large elliptical schizogenous oil canal lined with brown epithelial cells filled with anethole and fenchone.',
        diagnosticValue: 'Size, location, and vitta count (6) are pathognomonic diagnostic proof for Umbelliferous fruits.',
        stainingResponse: 'Volatile oil content stains vibrant orange-red with Sudan III.',
        pharmacognosticRole: 'Secretory synthesis and storage of volatile essential oil.'
      },
      {
        id: 'fennel-aleurone',
        name: 'Endosperm with Aleurone Protein Grains',
        botanicalTerm: 'Endospermium Proteinaceum',
        category: 'Ground/Cortex',
        confidence: 0.96,
        x: 68,
        y: 58,
        radiusX: 18,
        radiusY: 14,
        polygonPoints: [[50,44],[86,44],[86,72],[50,72]],
        sizeMicrons: 25,
        description: 'Thick polyhedral endosperm cells densely packed with aleurone protein bodies containing minute calcium oxalate rosette crystals.',
        diagnosticValue: 'Contains nutritive reserve proteins and micro-rosettes.',
        stainingResponse: 'Proteins stain golden brown with Iodine solution.',
        pharmacognosticRole: 'Nutritive reserve storage.'
      }
    ]
  },

  {
    id: 'strychnos-nux-vomica-seed',
    name: 'Nux Vomica (Strychnos) Seed T.S.',
    latinName: 'Strychnos nux-vomica L.',
    family: 'Loganiaceae',
    plantPart: 'Crude Seed Drug (Button Seed)',
    organType: 'Seed T.S.',
    description: 'Disc-like seed section showing prominent epidermis composed of closely appressed, lignified, radiating trichomes with bent bases, thick-walled endosperm with plasmodesmata, and strychnine/brucine alkaloids.',
    differentiatingMarkers: [
      'Appressed Lignified Trichomes: Epidermis covered by closely appressed, silky, lignified trichomes bent at 90° with 10-12 longitudinal rib ridges.',
      'Endosperm Plasmodesmata: Extremely thick hemicellulosic endosperm cell walls displaying fine plasmodesmata threads.',
      'Alkaloid Reactions: Nitric acid turns endosperm section yellow-orange (brucine); Sulfuric acid + Potassium dichromate turns section violet-blue (strychnine).'
    ],
    chemicalConstituents: ['Strychnine', 'Brucine', 'Vomicine', 'Loganic Acid', 'Hemicellulose'],
    adulterantMarker: 'Presence of erect unlignified trichomes or calcium oxalate crystals indicates Strychnos nux-blanda or S. potatorum adulteration.',
    histochemicalTest: 'Nitric acid yields intense crimson-orange color with brucine; Phloroglucinol + HCl turns appressed trichomes deep red.',
    phytochemicalTests: [
      {
        testName: 'Concentrated Nitric Acid Brucine Color Test',
        reagentUsed: 'Concentrated Nitric Acid (HNO3 68%)',
        targetConstituent: 'Brucine Alkaloid in Endosperm Cells',
        visualReaction: 'Intense Crimson-Orange / Blood-Red Coloration',
        chemicalMechanism: 'Oxidative nitration of dimethoxy-strychnine (brucine) to form bright crimson cacotheline derivative.',
        pharmacognosticSignificance: 'Pathognomonic color test for brucine alkaloid in Strychnos seeds.'
      },
      {
        testName: 'Sulfuric Acid + Potassium Dichromate Strychnine Test',
        reagentUsed: 'Concentrated H2SO4 + K2Cr2O7 Crystal Trace',
        targetConstituent: 'Strychnine Alkaloid in Endosperm Cells',
        visualReaction: 'Transient Deep Violet-Blue Streak changing to Red and Yellow',
        chemicalMechanism: 'Oxidation of strychnine to quinonoid chromophore producing transient violet-blue color.',
        pharmacognosticSignificance: 'Official pharmacopoeial confirmation for toxic central stimulant strychnine.'
      },
      {
        testName: 'Phloroglucinol + HCl Lignified Trichome Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Lignified Radiating Appressed Epidermal Trichomes',
        visualReaction: 'Vibrant Magenta-Red Staining on Silky Trichome Hair Coat',
        chemicalMechanism: 'Acid reaction with coniferaldehyde groups in heavy trichome cell wall ribs.',
        pharmacognosticSignificance: 'Verifies characteristic appressed lignified trichome hair layer.'
      },
      {
        testName: 'Sudan III Fixed Fatty Oil Test',
        reagentUsed: 'Sudan III Solution (0.5% in EtOH)',
        targetConstituent: 'Fixed Fatty Triglyceride Oil in Endosperm',
        visualReaction: 'Scarlet Red Droplets inside Endosperm Cells',
        chemicalMechanism: 'Lipophilic dye partition into non-polar fixed seed oil.',
        pharmacognosticSignificance: 'Shows presence of reserve fixed fat in hemicellulosic endosperm.'
      }
    ],
    bgColor: '#2b2318',
    deepAnalysisMetrics: {
      totalCellCount: 360,
      stomatalIndex: 'N/A (Seed Organ)',
      meanLumenDiameterMicrons: 18.0,
      cellWallThicknessMicrons: 16.0,
      lignificationDegree: 'Extremely High (Lignified Trichomes)',
      purityScorePercent: 99.7,
      deepTissueSummary: 'Authentic Strychnos nux-vomica seed section showing appressed lignified silky trichomes with ribbed walls, thick hemicellulosic endosperm with plasmodesmata, and absence of calcium oxalate crystals.',
      qualityGrade: 'Grade A Official Nux Vomica Seed Standard',
      vascularBundleCount: 0,
      crystalInclusionDensity: '0.0 (Absence of Calcium Oxalate)'
    },
    keyFeatures: [
      'Appressed Lignified Silky Trichomes',
      'Thick Hemicellulosic Endosperm Walls',
      'Intercellular Plasmodesmata Pits',
      'Nitric Acid Brucine Orange Color Reaction'
    ],
    features: [
      {
        id: 'nux-trichome',
        name: 'Appressed Lignified Seed Trichome',
        botanicalTerm: 'Trichoma Lignosum Appressum',
        category: 'Dermal',
        confidence: 0.99,
        x: 48,
        y: 20,
        radiusX: 38,
        radiusY: 7,
        polygonPoints: [[10,13],[86,13],[86,27],[10,27]],
        sizeMicrons: 600,
        description: 'Radiating, closely appressed, thick-walled lignified hair with bent bulbous base and 10-12 longitudinal wall ribs.',
        diagnosticValue: 'Lignified appressed trichome coat with wall ribs is pathognomonic proof for authentic Strychnos nux-vomica.',
        stainingResponse: 'Turns intense magenta red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Protective silky hair coat of button seed.'
      },
      {
        id: 'nux-endosperm',
        name: 'Hemicellulosic Endosperm with Plasmodesmata',
        botanicalTerm: 'Endospermium Hemicellulosum',
        category: 'Ground/Cortex',
        confidence: 0.97,
        x: 50,
        y: 62,
        radiusX: 32,
        radiusY: 15,
        polygonPoints: [[18,47],[82,47],[82,77],[18,77]],
        sizeMicrons: 55,
        description: 'Large polyhedral cells with hugely thickened hemicellulose walls containing pit channels and plasmodesmata.',
        diagnosticValue: 'Contains active poisonous tropane-like alkaloids brucine and strychnine.',
        stainingResponse: 'Turns deep orange-red when treated with concentrated Nitric Acid (Brucine test).',
        pharmacognosticRole: 'Endosperm nutrient and alkaloid storage.'
      }
    ]
  },

  {
    id: 'glycyrrhiza-glabra-root',
    name: 'Liquorice (Glycyrrhiza) Root T.S.',
    latinName: 'Glycyrrhiza glabra L.',
    family: 'Fabaceae (Leguminosae)',
    plantPart: 'Crude Subterranean Root Drug',
    organType: 'Root T.S.',
    description: 'Subterranean root section displaying suberized cork rows, phelloderm, wide yellow secondary xylem with prominent medullary rays, crystal sheaths of monoclinic calcium oxalate prisms surrounding thick phloem and xylem fibers.',
    differentiatingMarkers: [
      'Crystal Sheath: Parenchyma cells surrounding wood and phloem fibers filled with monoclinic prisms of calcium oxalate.',
      'Yellow Xylem: Massive radially arranged yellow xylem vessels with pitted walls and sweet glycyrrhizin content.',
      'Absence of Pith: Root section is completely filled by xylem core at center without central parenchymatous pith.'
    ],
    chemicalConstituents: ['Glycyrrhizin', 'Liquiritin', 'Isoliquiritin', 'Flavonoids', 'Calcium Oxalate Prisms'],
    adulterantMarker: 'Presence of central pith indicates stolon/stem parts; starch degradation indicates exhausted root.',
    histochemicalTest: 'Sulfuric acid (80%) produces bright yellow color with glycyrrhizin; Phloroglucinol + HCl turns xylem fibers crimson.',
    phytochemicalTests: [
      {
        testName: 'Sulfuric Acid 80% Glycyrrhizin Test',
        reagentUsed: 'Sulfuric Acid (80% H2SO4 v/v)',
        targetConstituent: 'Triterpenoid Saponin Glycyrrhizin',
        visualReaction: 'Vibrant Deep Golden-Yellow Color Reaction',
        chemicalMechanism: 'Dehydration and acid hydrolysis of glycyrrhizic acid to yield yellow glycyrrhetinic acid chromophore.',
        pharmacognosticSignificance: 'Official pharmacopoeial identity test for sweet saponin glycyrrhizin.'
      },
      {
        testName: 'Shinoda Test (Magnesium + HCl) Flavonoid Test',
        reagentUsed: 'Magnesium Ribbon + Concentrated HCl',
        targetConstituent: 'Flavonoid Glycosides (Liquiritin & Isoliquiritin)',
        visualReaction: 'Cherry Red / Magenta Solution Coloration',
        chemicalMechanism: 'Reduction of flavanone nucleus by nascent hydrogen to form anthocyanidin chromophore.',
        pharmacognosticSignificance: 'Diagnostic verification of yellow flavonoid constituents in Glycyrrhiza root.'
      },
      {
        testName: 'Phloroglucinol + HCl Lignified Wood Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Pitted Xylem Vessels & Crystal Sheath Fibers',
        visualReaction: 'Deep Crimson-Red Coloration in Radially Aligned Wood Vessels',
        chemicalMechanism: 'Acid reaction with coniferaldehyde linkages in xylem vessel walls and sclerenchyma sheath.',
        pharmacognosticSignificance: 'Highlights prominent yellow radially arranged secondary xylem vessels.'
      },
      {
        testName: 'Sudan III Cork Suberin Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Suberized Radial Cork Rows (Phellem)',
        visualReaction: 'Scarlet Orange-Red Staining on Outer Cork Cells',
        chemicalMechanism: 'Lipophilic dye partition into suberin wall polymers.',
        pharmacognosticSignificance: 'Verifies outer suberized protective layer in unpeeled liquorice root.'
      }
    ],
    bgColor: '#332a13',
    deepAnalysisMetrics: {
      totalCellCount: 500,
      stomatalIndex: 'N/A (Subterranean Root)',
      meanLumenDiameterMicrons: 52.0,
      cellWallThicknessMicrons: 8.5,
      lignificationDegree: 'High Lignification (Xylem Vessels & Fiber Bundles)',
      purityScorePercent: 99.4,
      deepTissueSummary: 'Authentic Glycyrrhiza glabra root section featuring radially aligned yellow xylem vessels, crystal sheaths containing monoclinic calcium oxalate prisms, secondary phloem fiber groups, and total absence of central pith.',
      qualityGrade: 'Grade A Official Liquorice Root Standard',
      vascularBundleCount: 16,
      crystalInclusionDensity: '14.2 monoclinic prisms/mm²'
    },
    keyFeatures: [
      'Monoclinic Prism Crystal Sheath',
      'Bright Yellow Lignified Xylem Rays',
      'Suberized Outer Cork Phellem',
      'Absence of Central Pith Parenchyma'
    ],
    features: [
      {
        id: 'liquorice-prism',
        name: 'Monoclinic Calcium Oxalate Prism Sheath',
        botanicalTerm: 'Vagina Crystallina (Prism Sheath)',
        category: 'Inclusions',
        confidence: 0.99,
        x: 48,
        y: 48,
        radiusX: 10,
        radiusY: 8,
        polygonPoints: [[38,40],[58,40],[58,56],[38,56]],
        sizeMicrons: 22,
        description: 'Single layer of parenchymatous cells each containing a solitary monoclinic prism crystal encasing fiber bundles.',
        diagnosticValue: 'Crystal sheath surrounding fiber groups is pathognomonic diagnostic proof for Glycyrrhiza glabra.',
        stainingResponse: 'Soluble in dilute HCl without effervescence.',
        pharmacognosticRole: 'Inorganic cellular byproduct accumulation.'
      },
      {
        id: 'liquorice-xylem',
        name: 'Pitted Yellow Secondary Xylem Vessel',
        botanicalTerm: 'Vasa Lignosa Flava',
        category: 'Vascular',
        confidence: 0.98,
        x: 52,
        y: 68,
        radiusX: 15,
        radiusY: 10,
        polygonPoints: [[37,58],[67,58],[67,78],[37,78]],
        sizeMicrons: 65,
        description: 'Large, thick-walled, radially aligned yellow xylem vessels with bordered pits.',
        diagnosticValue: 'Vessel alignment and yellow color from flavonoids are characteristic of liquorice root.',
        stainingResponse: 'Turns vibrant magenta red with Phloroglucinol + HCl; yellow with H2SO4.',
        pharmacognosticRole: 'Water conduction and storage of sweet glycyrrhizin.'
      }
    ]
  },

  {
    id: 'clove-flower-bud-ts',
    name: 'Clove (Syzygium aromaticum) Flower Bud T.S.',
    latinName: 'Syzygium aromaticum (L.) Merr. & L.M.Perry',
    family: 'Myrtaceae',
    plantPart: 'Dried Unexpanded Flower Bud (Hypanthium)',
    organType: 'Flower Bud / Hypanthium T.S.',
    description: 'Transverse section through the hypanthium of clove flower bud showing uniseriate cuticular epidermis with stomata, heavy parenchymatous outer cortex embedded with 2-3 zonal rows of large schizolysigenous essential oil glands filled with eugenol, collenchymatous middle cortex containing calcium oxalate sphaeraphides (cluster crystals), bicollateral vascular ring, and central aerenchymatous columella.',
    differentiatingMarkers: [
      'Schizolysigenous Oil Cavities: Large oval cavities embedded in 2-3 rows in outer cortex containing volatile eugenol essential oil.',
      'Potassium Eugenate Needle Test: Slide treatment with 5% KOH yields insoluble needle-shaped crystals of potassium eugenate.',
      'Sphaeraphides (Cluster Crystals): Rosette clusters of calcium oxalate scattered throughout parenchymatous cortex.',
      'Bicollateral Vascular Ring & Central Columella: Ring of bicollateral vascular bundles enclosing a spongy aerenchymatous central core.'
    ],
    chemicalConstituents: ['Eugenol (80-90%)', 'Eugenol Acetate', 'beta-Caryophyllene', 'Gallotannins', 'Calcium Oxalate Cluster Crystals'],
    adulterantMarker: 'Presence of starch grains, stone cells, or thick fibers indicates adulteration with clove stalks or mother cloves.',
    histochemicalTest: '5% KOH forms potassium eugenate needle crystals; 5% FeCl3 produces dark blue-black color with eugenol/tannins; Sudan III stains oil glands red.',
    phytochemicalTests: [
      {
        testName: 'Potassium Hydroxide (KOH 5%) Eugenol Needle Test',
        reagentUsed: 'Potassium Hydroxide Aqueous Solution (5% w/v)',
        targetConstituent: 'Phenolic Volatile Oil Eugenol in Schizolysigenous Glands',
        visualReaction: 'Rapid Formation of Characteristic Needle-Shaped Potassium Eugenate Crystals inside Oil Glands',
        chemicalMechanism: 'Phenolic hydroxyl group (-OH) of eugenol reacts with strong base KOH to form crystalline potassium eugenate salt.',
        pharmacognosticSignificance: 'Pathognomonic B.Pharm practical test confirming authentic Clove Bud eugenol content vs exhausted cloves.'
      },
      {
        testName: 'Ferric Chloride (5% FeCl3) Phenolic Eugenol Test',
        reagentUsed: 'Neutral Ferric Chloride Aqueous Solution (5% w/v)',
        targetConstituent: 'Phenolic Eugenol & Ellagitannins',
        visualReaction: 'Intense Dark Blue-Black / Greenish-Black Coloration in Cortex & Glands',
        chemicalMechanism: 'Fe3+ ions form coordination complexes with phenolic hydroxyl groups of eugenol and gallotannin structures.',
        pharmacognosticSignificance: 'Diagnostic verification of volatile phenolic eugenol and astringent tannins in clove hypanthium.'
      },
      {
        testName: 'Sudan III Volatile Oil Cavity Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Eugenol Essential Oil in Schizolysigenous Cavities',
        visualReaction: 'Brilliant Scarlet Orange-Red Droplets Filling Oil Glands',
        chemicalMechanism: 'Lipophilic dye partitions into non-polar volatile essential oil droplets inside schizolysigenous cavities.',
        pharmacognosticSignificance: 'Highlights 2-3 outer cortical rows of schizolysigenous oil ducts.'
      },
      {
        testName: 'Phloroglucinol + HCl Vascular Lignin Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Pericyclic Fiber Arcs & Bicollateral Xylem Vessels',
        visualReaction: 'Cherry-Red Coloration in Bicollateral Vascular Ring',
        chemicalMechanism: 'Acid condensation of phloroglucinol with cinnamaldehyde linkages in lignified pericyclic fibers and xylem vessel walls.',
        pharmacognosticSignificance: 'Verifies inner vascular bundle arc surrounding central columella.'
      }
    ],
    bgColor: '#311b15',
    deepAnalysisMetrics: {
      totalCellCount: 480,
      stomatalIndex: '7.8 - 9.2%',
      meanLumenDiameterMicrons: 110.0,
      cellWallThicknessMicrons: 6.0,
      lignificationDegree: 'Moderate (Bicollateral Vascular Ring)',
      purityScorePercent: 99.8,
      deepTissueSummary: 'Authentic Syzygium aromaticum flower bud cross section displaying 2-3 outer rows of schizolysigenous oil cavities filled with eugenol, calcium oxalate sphaeraphides in collenchymatous middle cortex, bicollateral vascular ring, and central columella without foreign starch or stone cells.',
      qualityGrade: 'Grade A Official Clove Flower Bud Standard',
      vascularBundleCount: 15,
      crystalInclusionDensity: '18.4 cluster crystals/mm²'
    },
    keyFeatures: [
      'Schizolysigenous Oil Cavities (2-3 Rows)',
      'Potassium Eugenate Crystalline Needles (KOH Test)',
      'Calcium Oxalate Sphaeraphides (Cluster Crystals)',
      'Bicollateral Vascular Ring & Central Columella'
    ],
    features: [
      {
        id: 'clove-oil-gland',
        name: 'Schizolysigenous Essential Oil Cavity',
        botanicalTerm: 'Cavitas Oleosa Schizolysigena',
        category: 'Secretory',
        confidence: 0.99,
        x: 48,
        y: 28,
        radiusX: 20,
        radiusY: 14,
        polygonPoints: [[28,14],[68,14],[68,42],[28,42]],
        sizeMicrons: 120,
        description: 'Large oval secretory cavity lined by degenerating epithelial cells, filled with volatile eugenol essential oil.',
        diagnosticValue: '2-3 rows of schizolysigenous oil cavities in outer cortex are pathognomonic for clove hypanthium.',
        stainingResponse: 'Yields needle crystals with 5% KOH; dark blue-black with 5% FeCl3; orange-red with Sudan III.',
        pharmacognosticRole: 'Synthesis and storage of volatile antiseptic eugenol oil.'
      },
      {
        id: 'clove-sphaeraphide',
        name: 'Calcium Oxalate Sphaeraphide (Cluster Crystal)',
        botanicalTerm: 'Sphaeraphidium Calcii Oxalatis',
        category: 'Inclusions',
        confidence: 0.97,
        x: 52,
        y: 54,
        radiusX: 8,
        radiusY: 8,
        polygonPoints: [[44,46],[60,46],[60,62],[44,62]],
        sizeMicrons: 25,
        description: 'Star-like rosette cluster crystal of calcium oxalate embedded in collenchymatous middle cortex parenchyma cells.',
        diagnosticValue: 'Sphaeraphides scattered in cortex confirm Myrtaceous hypanthium structure.',
        stainingResponse: 'Soluble in dilute HCl without effervescence.',
        pharmacognosticRole: 'Cellular inorganic waste storage.'
      }
    ]
  },

  {
    id: 'ephedra-sinica-stem',
    name: 'Ephedra Stem (Ephedra sinica) T.S.',
    latinName: 'Ephedra sinica Stapf / Ephedra gerardiana Wall.',
    family: 'Ephedraceae (Gymnospermae)',
    plantPart: 'Sub-aerial Jointed Green Stem Axis',
    organType: 'Stem T.S. (Gymnosperm Axis)',
    description: 'Transverse section of jointed sub-aerial stem showing prominent heavily cutinized outer epidermal ridges with sunken stomata situated exclusively in inter-ridge furrows, outer cortex featuring radially elongated palisade-like chlorenchyma cells, pericyclic sclerenchymatous fiber caps capping a ring of 8-10 open collateral vascular bundles (eustele), narrow uniseriate medullary rays, and central pith containing brown resinous masses.',
    differentiatingMarkers: [
      'Epidermal Ridges & Sunken Stomata: Wavy thick cuticular ridges with stomata sunken inside inter-ridge furrows.',
      'Palisade Chlorenchyma: Radial palisade-like outer cortical cells packed with chloroplasts for photosynthetic function.',
      'Pericyclic Fiber Arcs: Lignified fiber caps capping each of the 8-10 open collateral vascular bundles.',
      'Ephedrine Biuret Reaction: Copper sulfate + NaOH test yields purple-violet color in aqueous layer and red in ether layer.'
    ],
    chemicalConstituents: ['Ephedrine (75-80%)', 'Pseudoephedrine', 'N-methylephedrine', 'Tannins', 'Flavonoids'],
    adulterantMarker: 'Absence of palisade chlorenchyma or presence of non-gymnospermous vessel elements indicates foreign stem adulteration.',
    histochemicalTest: 'Copper sulfate + NaOH + ether produces purple-violet aqueous layer and red ether layer; Phloroglucinol + HCl turns ridges and fibers red.',
    phytochemicalTests: [
      {
        testName: 'Copper Sulfate + NaOH (Ephedra Biuret Ephedrine Test)',
        reagentUsed: 'CuSO4 Solution (12%) + NaOH (20%) + Diethyl Ether',
        targetConstituent: 'Protoalkaloids Ephedrine & Pseudoephedrine in Cortex & Pith',
        visualReaction: 'Aqueous Layer turns Intense Purple-Violet; Ether Layer turns Deep Red upon Shaking',
        chemicalMechanism: 'Secondary ethanolamine nitrogen of ephedrine coordinates with Cu2+ ions in strongly alkaline solution to form a colored complex.',
        pharmacognosticSignificance: 'Official B.Pharm / D.Pharm syllabus identity test for authentic Ephedra stem protoalkaloids.'
      },
      {
        testName: 'Ninhydrin Reagent Amino-Alkaloid Test',
        reagentUsed: 'Ninhydrin Solution (0.2% in acetone) + Heat',
        targetConstituent: 'Secondary Amino-Alkaloid Ephedrine',
        visualReaction: 'Deep Bluish-Purple / Violet Coloration upon Gentle Heating',
        chemicalMechanism: 'Oxidative deamination and condensation of ninhydrin with secondary amino group of ephedrine forming Ruhemann\'s purple.',
        pharmacognosticSignificance: 'Verifies protoalkaloid nitrogen content in Ephedra stem tissue.'
      },
      {
        testName: 'Phloroglucinol + HCl Cuticular Ridge & Fiber Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Lignified Cuticular Ridges, Pericyclic Fiber Caps & Xylem Ring',
        visualReaction: 'Cherry-Red Coloration on Outer Ridges, Pericyclic Fiber Caps & Vascular Ring',
        chemicalMechanism: 'Acid condensation with coniferaldehyde linkages in heavy cuticular wall ridges and lignified pericyclic fibers.',
        pharmacognosticSignificance: 'Highlights 8-10 open collateral vascular bundle caps and epidermal ridge architecture.'
      },
      {
        testName: 'Sudan III Heavy Cuticle Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Thick Outer Stem Epidermal Cuticle',
        visualReaction: 'Bright Scarlet Orange-Red Staining on Outer Wavy Cuticular Ridges',
        chemicalMechanism: 'Lipophilic dye partitions into thick cutin polymer layer on stem surface.',
        pharmacognosticSignificance: 'Confirms thick cuticular protection adaptation in xerophytic Ephedra stem.'
      }
    ],
    bgColor: '#1c2e22',
    deepAnalysisMetrics: {
      totalCellCount: 440,
      stomatalIndex: '11.2 - 12.8% (Sunken in Furrows)',
      meanLumenDiameterMicrons: 32.0,
      cellWallThicknessMicrons: 7.2,
      lignificationDegree: 'Strong (Pericyclic Fiber Caps & Xylem Ring)',
      purityScorePercent: 99.6,
      deepTissueSummary: 'Authentic Ephedra sinica stem cross section displaying wavy cuticular ridges, sunken stomata in furrows, radially elongated palisade chlorenchyma, pericyclic fiber caps, 8-10 open collateral vascular bundles in a ring, and central pith with resinous contents.',
      qualityGrade: 'Grade A Official Ephedra Stem Standard',
      vascularBundleCount: 10,
      crystalInclusionDensity: '0.0 (Absence of Calcium Oxalate Crystals)'
    },
    keyFeatures: [
      'Wavy Cuticular Ridges & Sunken Furrow Stomata',
      'Photosynthetic Radial Palisade Chlorenchyma',
      'Pericyclic Sclerenchyma Fiber Caps',
      'Copper Sulfate + NaOH Ephedrine Test Reaction'
    ],
    features: [
      {
        id: 'ephedra-ridge',
        name: 'Cuticular Epidermal Ridge & Sunken Stoma',
        botanicalTerm: 'Crista Epidermalis et Stoma Submersum',
        category: 'Dermal',
        confidence: 0.99,
        x: 50,
        y: 18,
        radiusX: 38,
        radiusY: 6,
        polygonPoints: [[12,14],[88,14],[88,22],[12,22]],
        sizeMicrons: 45,
        description: 'Prominent outer epidermal ridge coated with thick cuticle, with guard cells of sunken stomata situated in adjacent furrows.',
        diagnosticValue: 'Wavy cuticular ridges with sunken stomata in furrows are pathognomonic proof for xerophytic Ephedra stem.',
        stainingResponse: 'Turns orange-red with Sudan III; crimson red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Transpiration prevention and physical defense.'
      },
      {
        id: 'ephedra-palisade',
        name: 'Palisade-like Cortical Chlorenchyma',
        botanicalTerm: 'Chlorenchyma Palisadicum Corticale',
        category: 'Ground/Cortex',
        confidence: 0.97,
        x: 50,
        y: 35,
        radiusX: 35,
        radiusY: 10,
        polygonPoints: [[15,26],[85,26],[85,44],[15,44]],
        sizeMicrons: 60,
        description: 'Radially elongated parenchymatous cells densely packed with chloroplasts performing stem photosynthesis.',
        diagnosticValue: 'Palisade-like cortical layer compensates for reduced scale-like leaves in Ephedra.',
        stainingResponse: 'Stains green naturally; positive biuret reaction with CuSO4 + NaOH for ephedrine.',
        pharmacognosticRole: 'Photosynthetic carbohydrate assimilation and alkaloid synthesis.'
      }
    ]
  },

  {
    id: 'senna-leaf-isobilateral-ts',
    name: 'Senna Leaf (Cassia angustifolia) T.S.',
    latinName: 'Cassia angustifolia Vahl / Cassia acutifolia Delile',
    family: 'Fabaceae (Leguminosae)',
    plantPart: 'Dried Leaflet (Isobilateral Lamina)',
    organType: 'Leaf T.S. (Isobilateral)',
    description: 'Transverse section of isobilateral leaf lamina showing palisade mesophyll cells arranged beneath both upper and lower epidermal layers, paracytic (rubiaceous) stomata, uniseriate unicellular non-glandular warty conical trichomes with curved apex, and central midrib vascular bundle encased in a complete crystal sheath of parenchymatous cells containing monoclinic calcium oxalate prisms.',
    differentiatingMarkers: [
      'Isobilateral Mesophyll: Single long palisade cell layer under upper epidermis and shorter palisade layer under lower epidermis.',
      'Warty Non-glandular Trichomes: Uniseriate unicellular conical trichomes with thick warty cuticle and curved apex.',
      'Monoclinic Crystal Sheath: Parenchymatous sheath filled with solitary monoclinic prisms of calcium oxalate encasing fiber groups.',
      'Bornträger Anthraquinone Reaction: Alkaline ammonia treatment of organic extract yields rose-pink to cherry-red color (Sennosides).'
    ],
    chemicalConstituents: ['Sennoside A', 'Sennoside B', 'Sennoside C & D', 'Rhein', 'Aloe-Emodin', 'Mucilage', 'Calcium Oxalate Prisms'],
    adulterantMarker: 'Presence of anomocytic stomata, smooth trichomes, or absence of lower palisade indicates Cassia auriculata adulteration.',
    histochemicalTest: 'Bornträger\'s test produces cherry-red ammoniacal layer; Ruthenium Red stains sub-epidermal mucilage pink; Phloroglucinol + HCl turns fiber sheath red.',
    phytochemicalTests: [
      {
        testName: 'Bornträger\'s Anthraquinone Glycoside Test',
        reagentUsed: 'Dilute H2SO4 + Benzene/Ether + 10% Ammonia Solution',
        targetConstituent: 'Dianthrone Glycosides Sennosides A & B and Free Anthraquinones',
        visualReaction: 'Ammoniacal Layer turns Vibrant Rose-Pink / Cherry-Red',
        chemicalMechanism: 'Acid hydrolysis and oxidation yield free hydroxyanthraquinones, which form soluble red enolate anions in alkaline ammonia.',
        pharmacognosticSignificance: 'Official pharmacopoeial identity test for laxative sennosides in Senna leaflets.'
      },
      {
        testName: 'Ruthenium Red Sub-Epidermal Mucilage Test',
        reagentUsed: 'Ruthenium Red Ammoniacal Solution (0.08% w/v)',
        targetConstituent: 'Acidic Polysaccharide Mucilage in Sub-Epidermal Epidermis Cells',
        visualReaction: 'Vibrant Magenta-Pink / Bright Crimson Coloration in Epidermal Layer',
        chemicalMechanism: 'Ruthenium red cationic complex coordinates with carboxylate groups of galacturonic mucilage polymers.',
        pharmacognosticSignificance: 'Verifies sub-epidermal mucilage cells characteristic of Cassia leaflets.'
      },
      {
        testName: 'Phloroglucinol + HCl Crystal Sheath Fiber Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Pericyclic Fiber Caps & Midrib Xylem Vessels',
        visualReaction: 'Cherry-Red Coloration in Pericyclic Fiber Bundles',
        chemicalMechanism: 'Acid reaction with coniferaldehyde linkages in lignified fiber walls.',
        pharmacognosticSignificance: 'Highlights pericyclic fiber groups surrounded by monoclinic crystal sheath.'
      },
      {
        testName: 'Sudan III Warty Trichome & Cuticle Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Warty Cuticle of Non-Glandular Trichomes & Dermal Layer',
        visualReaction: 'Bright Scarlet Orange-Red Staining on Warty Hair Surface',
        chemicalMechanism: 'Lipophilic dye partitions into rough warty cuticular projections on hair wall.',
        pharmacognosticSignificance: 'Diagnostic verification of conical warty trichomes.'
      }
    ],
    bgColor: '#1d2d1e',
    deepAnalysisMetrics: {
      totalCellCount: 460,
      stomatalIndex: '17.1 - 20.0% (Paracytic Stomata)',
      meanLumenDiameterMicrons: 38.0,
      cellWallThicknessMicrons: 4.5,
      lignificationDegree: 'Moderate (Midrib Fiber Caps)',
      purityScorePercent: 99.5,
      deepTissueSummary: 'Authentic Cassia angustifolia leaflet section displaying isobilateral palisade mesophyll, paracytic stomata, uniseriate unicellular warty conical trichomes with curved apex, and midrib vascular bundle with monoclinic calcium oxalate crystal sheath.',
      qualityGrade: 'Grade A Official Senna Leaf Standard',
      vascularBundleCount: 6,
      crystalInclusionDensity: '12.8 monoclinic prisms/mm²'
    },
    keyFeatures: [
      'Isobilateral Palisade Mesophyll',
      'Warty Unicellular Conical Trichomes with Curved Apex',
      'Monoclinic Calcium Oxalate Crystal Sheath',
      'Bornträger Rose-Pink Anthraquinone Test'
    ],
    features: [
      {
        id: 'senna-trichome',
        name: 'Warty Unicellular Conical Trichome',
        botanicalTerm: 'Trichoma Unicellulare Verrucosum',
        category: 'Dermal',
        confidence: 0.99,
        x: 48,
        y: 16,
        radiusX: 12,
        radiusY: 8,
        polygonPoints: [[42,8],[54,8],[50,24],[44,24]],
        sizeMicrons: 150,
        description: 'Single-celled conical non-glandular trichome with thick warty cuticular wall and characteristic bent/curved apex.',
        diagnosticValue: 'Warty cuticle and curved apex on unicellular trichome are pathognomonic diagnostic markers for Senna.',
        stainingResponse: 'Stains orange-red with Sudan III.',
        pharmacognosticRole: 'Mechanical protection and moisture retention.'
      },
      {
        id: 'senna-sheath',
        name: 'Monoclinic Calcium Oxalate Prism Sheath',
        botanicalTerm: 'Vagina Crystallina Monoclinica',
        category: 'Inclusions',
        confidence: 0.98,
        x: 50,
        y: 62,
        radiusX: 18,
        radiusY: 8,
        polygonPoints: [[32,54],[68,54],[68,70],[32,70]],
        sizeMicrons: 20,
        description: 'Parenchymatous cell sheath completely encircling pericyclic fiber bundles, containing single monoclinic prisms of calcium oxalate.',
        diagnosticValue: 'Crystal sheath surrounding fibers is diagnostic proof for Cassia angustifolia leaflets.',
        stainingResponse: 'Soluble in dilute HCl without effervescence.',
        pharmacognosticRole: 'Inorganic cellular waste deposit.'
      }
    ]
  },

  {
    id: 'cinnamon-bark-inner-ts',
    name: 'Cinnamon (Cinnamomum zeylanicum) Bark T.S.',
    latinName: 'Cinnamomum zeylanicum Blume / Cinnamomum verum',
    family: 'Lauraceae',
    plantPart: 'Dried Inner Bark of Shoots (Peeled Bark)',
    organType: 'Bark T.S. (Inner Bark)',
    description: 'Transverse section of peeled inner bark showing complete absence of outer cork and primary cortex, continuous 3-4 cell wide band of sclerenchymatous pericyclic stone cells with characteristic horseshoe (U-shaped) wall thickenings, isolated thick-walled phloem fibers with narrow lumens, large rounded secretory oil cells containing volatile cinnamaldehyde essential oil, mucilage cells, and micro-acicular needle crystals of calcium oxalate in phloem parenchyma.',
    differentiatingMarkers: [
      'Continuous Horseshoe Stone Cell Ring: Continuous pericyclic ring of stone cells with U-shaped thickened outer/radial walls.',
      'Absence of Cork & Cortex: Peeled inner bark completely lacks suberized cork layers and primary cortex.',
      'Large Secretory Oil Cells: Isolated rounded cells containing volatile cinnamaldehyde essential oil.',
      'Micro-acicular Needles: Tiny needle-like calcium oxalate crystals scattered in phloem parenchyma.'
    ],
    chemicalConstituents: ['Cinnamaldehyde (65-75%)', 'Eugenol', 'Cinnamyl Acetate', 'Condensed Tannins', 'Calcium Oxalate Needles'],
    adulterantMarker: 'Presence of cork rows or thick cell walls with starch (Cassia bark / C. cassia) indicates substitution.',
    histochemicalTest: 'Vanillin + HCl turns cinnamaldehyde in oil cells violet-red; 5% FeCl3 gives pale green-black color; Sudan III stains oil cells orange-red.',
    phytochemicalTests: [
      {
        testName: 'Vanillin + HCl Cinnamaldehyde Test',
        reagentUsed: 'Vanillin Reagent (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Volatile Essential Oil Cinnamaldehyde in Secretory Oil Cells',
        visualReaction: 'Intense Violet-Red / Deep Magenta Color Reaction inside Oil Cells',
        chemicalMechanism: 'Electrophilic condensation of vanillin aldehyde with cinnamaldehyde aromatic system in acid medium.',
        pharmacognosticSignificance: 'Official identity test for authentic Ceylon Cinnamon (C. zeylanicum) vs Cassia bark.'
      },
      {
        testName: 'Ferric Chloride (5% FeCl3) Condensed Tannin Test',
        reagentUsed: 'Neutral Ferric Chloride Aqueous Solution (5% w/v)',
        targetConstituent: 'Condensed Phlobatannins in Phloem Parenchyma',
        visualReaction: 'Pale Greenish-Black Coloration in Phloem Matrix',
        chemicalMechanism: 'Fe3+ ions form coordination complex with catechol tannin phenolic hydroxyl groups.',
        pharmacognosticSignificance: 'Confirms presence of condensed astringent tannins in phloem parenchyma.'
      },
      {
        testName: 'Phenylhydrazine Cinnamaldehyde Crystal Test',
        reagentUsed: 'Phenylhydrazine Hydrochloride (1% in H2O)',
        targetConstituent: 'Volatile Cinnamaldehyde Oil',
        visualReaction: 'Formation of Characteristic Yellow Needle Crystals of Cinnamaldehyde Phenylhydrazone on Slide',
        chemicalMechanism: 'Nucleophilic addition of phenylhydrazine to aldehyde carbonyl of cinnamaldehyde to form crystalline hydrazone derivative.',
        pharmacognosticSignificance: 'Classic micro-chemical confirmation for cinnamaldehyde in cinnamon bark.'
      },
      {
        testName: 'Phloroglucinol + HCl Stone Cell & Fiber Lignin Test',
        reagentUsed: 'Phloroglucinol + Concentrated HCl (1:1)',
        targetConstituent: 'Horseshoe Stone Cell Ring & Isolated Phloem Fibers',
        visualReaction: 'Deep Cherry-Red / Magenta Reaction on Stone Cell Ring & Phloem Fibers',
        chemicalMechanism: 'Acid condensation with cinnamaldehyde linkages in heavy lignified walls of stone cells and phloem fibers.',
        pharmacognosticSignificance: 'Highlights continuous pericyclic stone cell ring with horseshoe thickenings.'
      }
    ],
    bgColor: '#331e12',
    deepAnalysisMetrics: {
      totalCellCount: 420,
      stomatalIndex: 'N/A (Peeled Inner Bark)',
      meanLumenDiameterMicrons: 28.0,
      cellWallThicknessMicrons: 14.0,
      lignificationDegree: 'High (Continuous Stone Cell Band & Fibers)',
      purityScorePercent: 99.7,
      deepTissueSummary: 'Authentic Cinnamomum zeylanicum peeled inner bark section featuring continuous pericyclic ring of stone cells with horseshoe wall thickenings, isolated phloem fibers, large cinnamaldehyde oil cells, calcium oxalate micro-needles, and total absence of cork.',
      qualityGrade: 'Grade A Official Ceylon Cinnamon Bark Standard',
      vascularBundleCount: 0,
      crystalInclusionDensity: '22.0 micro-acicular needles/mm²'
    },
    keyFeatures: [
      'Continuous Horseshoe Stone Cell Ring',
      'Large Secretory Cinnamaldehyde Oil Cells',
      'Isolated Thick-walled Phloem Fibers',
      'Vanillin + HCl Violet-Red Cinnamaldehyde Reaction'
    ],
    features: [
      {
        id: 'cinnamon-stone-cell',
        name: 'Horseshoe Lignified Stone Cell Ring',
        botanicalTerm: 'Sclereida cum Thickenatione U-Formi',
        category: 'Ground/Cortex',
        confidence: 0.99,
        x: 50,
        y: 28,
        radiusX: 38,
        radiusY: 8,
        polygonPoints: [[12,20],[88,20],[88,36],[12,36]],
        sizeMicrons: 40,
        description: 'Continuous band of stone cells showing characteristic U-shaped (horseshoe) wall thickening where inner and radial walls are heavily lignified while outer wall remains thin.',
        diagnosticValue: 'Continuous stone cell ring with horseshoe thickenings is pathognomonic diagnostic proof for Ceylon cinnamon bark.',
        stainingResponse: 'Turns vibrant cherry-red with Phloroglucinol + HCl.',
        pharmacognosticRole: 'Mechanical support ring for inner bark.'
      },
      {
        id: 'cinnamon-oil-cell',
        name: 'Secretory Cinnamaldehyde Oil Cell',
        botanicalTerm: 'Cellula Secretoria Oleosa',
        category: 'Secretory',
        confidence: 0.98,
        x: 48,
        y: 58,
        radiusX: 14,
        radiusY: 12,
        polygonPoints: [[34,46],[62,46],[62,70],[34,70]],
        sizeMicrons: 75,
        description: 'Large isolated rounded parenchymatous cell containing volatile essential oil rich in cinnamaldehyde.',
        diagnosticValue: 'Large oil cells in phloem parenchyma synthesize aromatic volatile cinnamon oil.',
        stainingResponse: 'Turns violet-red with Vanillin + HCl; orange-red with Sudan III.',
        pharmacognosticRole: 'Synthesis and storage of volatile cinnamaldehyde oil.'
      }
    ]
  },

  {
    id: 'mentha-piperita-leaf',
    name: 'Peppermint (Mentha piperita) Leaf T.S.',
    latinName: 'Mentha x piperita L.',
    family: 'Lamiaceae (Labiatae)',
    plantPart: 'Dried Leaf',
    organType: 'Leaf T.S. (Dorsiventral)',
    description: 'Transverse section of dorsiventral foliar lamina showing uniseriate cuticular epidermis with diacytic stomata, single-layered palisade mesophyll, characteristic labiate glandular trichomes featuring a short 1-celled stalk and a large 8-celled head filled with menthol volatile oil, non-glandular uniseriate 3-8 celled trichomes with thin warty walls, and collenchyma in midrib angles.',
    differentiatingMarkers: [
      'Labiate Glandular Trichomes: Sunken glands with short 1-celled stalk and large 8-celled head filled with menthol oil.',
      'Diacytic Stomata: Stomata enclosed by two subsidiary cells whose shared wall lies perpendicular to the guard cells.',
      'Vanillin + HCl Pink-Violet Test: Menthol oil inside 8-celled head reacts with vanillin + HCl to form deep violet-pink color.'
    ],
    chemicalConstituents: ['l-Menthol (35-55%)', 'Menthone', 'Menthyl Acetate', 'Cineole', 'Flavonoid Glycosides'],
    adulterantMarker: 'Presence of multicellular glandular trichomes with 4-celled heads indicates adulteration with Mentha spicata or spearmint.',
    histochemicalTest: 'Vanillin + HCl colors 8-celled glandular heads deep violet-pink; Sudan III stains volatile menthol oil orange-red.',
    phytochemicalTests: [
      {
        testName: 'Vanillin + HCl Menthol Gland Test',
        reagentUsed: 'Vanillin Reagent (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Monoterpene Alcohol l-Menthol in 8-Celled Glandular Trichome Heads',
        visualReaction: 'Deep Pink-Violet / Intense Magenta Coloration in Glandular Heads',
        chemicalMechanism: 'Acid condensation of vanillin with monoterpene menthol nucleus to form a colored carbonium ion chromophore.',
        pharmacognosticSignificance: 'Official B.Pharm practical test confirming volatile menthol in Mentha piperita.'
      },
      {
        testName: 'Sudan III Volatile Menthol Oil Test',
        reagentUsed: 'Sudan III Solution (0.5% in 70% EtOH)',
        targetConstituent: 'Volatile Essential Oil inside Labiate Glandular Heads',
        visualReaction: 'Brilliant Scarlet Orange-Red Staining in 8-Celled Trichome Heads',
        chemicalMechanism: 'Lipophilic dye partitions into non-polar volatile essential oil droplets contained beneath cuticular membrane of gland.',
        pharmacognosticSignificance: 'Highlights characteristic labiate glandular trichomes.'
      },
      {
        testName: 'Nitric Acid + Glacial Acetic Acid Menthol Test',
        reagentUsed: 'Concentrated HNO3 + Glacial Acetic Acid (1:3) + Gentle Heat',
        targetConstituent: 'Volatile Menthol Monoterpenes',
        visualReaction: 'Transient Deep Blue Coloration turning Golden Yellow upon Standing',
        chemicalMechanism: 'Oxidative nitration of menthol monoterpene skeleton producing a blue nitrated chromophore.',
        pharmacognosticSignificance: 'Diagnostic identity test for peppermint volatile oil.'
      }
    ],
    bgColor: '#172e21',
    deepAnalysisMetrics: {
      totalCellCount: 400,
      stomatalIndex: '18.0 - 21.5% (Diacytic Stomata)',
      meanLumenDiameterMicrons: 35.0,
      cellWallThicknessMicrons: 3.8,
      lignificationDegree: 'Low (Midrib Xylem Vessels)',
      purityScorePercent: 99.6,
      deepTissueSummary: 'Authentic Mentha piperita leaf section showing diacytic stomata, uniseriate palisade mesophyll, characteristic labiate glandular trichomes with 8-celled heads containing menthol oil, and non-glandular warty multicellular trichomes.',
      qualityGrade: 'Grade A Official Peppermint Leaf Standard',
      vascularBundleCount: 4,
      crystalInclusionDensity: '0.0 (Absence of Calcium Oxalate Crystals)'
    },
    keyFeatures: [
      'Labiate 8-Celled Head Glandular Trichomes',
      'Diacytic Stomata & Single Palisade Layer',
      'Vanillin + HCl Violet-Pink Menthol Reaction',
      'Multicellular Thin-Wavy Non-Glandular Hairs'
    ],
    features: [
      {
        id: 'mentha-gland',
        name: 'Labiate 8-Celled Head Glandular Trichome',
        botanicalTerm: 'Trichoma Glanduliferum Octocellulare',
        category: 'Secretory',
        confidence: 0.99,
        x: 48,
        y: 20,
        radiusX: 12,
        radiusY: 10,
        polygonPoints: [[36,10],[60,10],[60,30],[36,30]],
        sizeMicrons: 65,
        description: 'Sunken glandular trichome with a short 1-celled stalk and a large disc-shaped 8-celled head filled with menthol essential oil under raised cuticle.',
        diagnosticValue: '8-celled glandular head is pathognomonic diagnostic marker for Lamiaceae / Mentha piperita.',
        stainingResponse: 'Turns deep violet-pink with Vanillin + HCl; orange-red with Sudan III.',
        pharmacognosticRole: 'Synthesis and storage of volatile menthol oil.'
      }
    ]
  },

  {
    id: 'rauvolfia-serpentina-root',
    name: 'Rauvolfia (Sarpagandha) Root T.S.',
    latinName: 'Rauvolfia serpentina (L.) Benth. ex Kurz',
    family: 'Apocynaceae',
    plantPart: 'Dried Root Axis',
    organType: 'Root T.S.',
    description: 'Transverse section of dried root showing stratified suberized cork consisting of alternating rows of large thin-walled cells and small compressed cells, wide secondary phloem composed of parenchyma and sieve tubes completely devoid of sclerenchyma fibers or stone cells, large pitted secondary xylem vessels, and abundant rounded starch granules in wood and phloem parenchyma.',
    differentiatingMarkers: [
      'Total Absence of Sclerenchyma: Phloem and cortex are completely devoid of sclerenchyma fibers or stone cells (key diagnostic negative marker!).',
      'Stratified Suberized Cork: Alternating rows of large thin-walled cells and small compressed suberized cells.',
      'Dragendorff Orange-Red Reaction: Section/extract treated with Dragendorff\'s reagent produces intense reddish-orange alkaloid precipitate (Reserpine).'
    ],
    chemicalConstituents: ['Reserpine (0.1-0.15%)', 'Rescinnamine', 'Ajmaline', 'Ajmalicine', 'Serpentine', 'Starch Granules'],
    adulterantMarker: 'Presence of sclerenchymatous phloem fibers or stone cells indicates substitution with Rauvolfia tetraphylla or Rauvolfia vomitoria.',
    histochemicalTest: 'Dragendorff reagent gives orange-red precipitate; Vanillin + HCl produces deep rose-red color with reserpine; Iodine turns starch blue-black.',
    phytochemicalTests: [
      {
        testName: 'Dragendorff\'s Reagent Alkaloid Test',
        reagentUsed: 'Potassium Bismuth Iodide Reagent (Bismuth Nitrate + KI)',
        targetConstituent: 'Indole Alkaloids Reserpine, Ajmaline & Serpentine in Phloem & Wood Parenchyma',
        visualReaction: 'Intense Reddish-Orange Flocculent Precipitate / Deep Cell Staining',
        chemicalMechanism: 'Heavy metal tetraiodobismutate anion [BiI4]- pairs with protonated tertiary indole alkaloid cations to form insoluble reddish-orange ion-pair.',
        pharmacognosticSignificance: 'Primary B.Pharm / D.Pharm syllabus identity test for authentic Rauvolfia serpentina alkaloids.'
      },
      {
        testName: 'Vanillin + HCl Indole Alkaloid Test',
        reagentUsed: 'Vanillin Reagent (1% in EtOH) + Concentrated HCl (1:1)',
        targetConstituent: 'Indole Nucleus of Reserpine & Rescinnamine',
        visualReaction: 'Deep Rose-Red / Magenta Color Reaction',
        chemicalMechanism: 'Electrophilic substitution of vanillin aldehyde at C-3 position of indole ring system in reserpine.',
        pharmacognosticSignificance: 'Specific confirmation for reserpine indole alkaloids in root parenchyma.'
      },
      {
        testName: 'Sulfuric Acid + Sodium Nitrite Reserpine Test',
        reagentUsed: 'Concentrated H2SO4 + NaNO2 Traces',
        targetConstituent: 'Tranquilizer Alkaloid Reserpine',
        visualReaction: 'Dark Green Coloration in Phloem Parenchyma Cells',
        chemicalMechanism: 'Oxidative nitration of reserpine trimethoxybenzoate ester to yield green nitro chromophore.',
        pharmacognosticSignificance: 'Official pharmacopoeial reaction for reserpine in Rauvolfia root.'
      },
      {
        testName: 'Iodine Solution Reserve Starch Test',
        reagentUsed: 'Iodine-Potassium Iodide (KI/I2)',
        targetConstituent: 'Abundant Simple & Compound Starch Granules with Star-shaped Hilum',
        visualReaction: 'Deep Indigo Blue-Black Staining in Wood & Phloem Parenchyma',
        chemicalMechanism: 'Triiodide anion inclusion complex with helical amylose in starch granules.',
        pharmacognosticSignificance: 'Verifies reserve starch granules in authentic Rauvolfia root.'
      }
    ],
    bgColor: '#2a2216',
    deepAnalysisMetrics: {
      totalCellCount: 450,
      stomatalIndex: 'N/A (Subterranean Root)',
      meanLumenDiameterMicrons: 48.0,
      cellWallThicknessMicrons: 6.5,
      lignificationDegree: 'Moderate (Xylem Vessels & Wood Rays)',
      purityScorePercent: 99.8,
      deepTissueSummary: 'Authentic Rauvolfia serpentina root section showing stratified suberized cork rows, wide secondary phloem, pitted xylem vessels, abundant starch granules, and total absence of sclerenchyma fibers or stone cells.',
      qualityGrade: 'Grade A Official Rauvolfia Root Standard',
      vascularBundleCount: 12,
      crystalInclusionDensity: '0.0 (Absence of Calcium Oxalate Crystals)'
    },
    keyFeatures: [
      'Stratified Suberized Outer Cork Rows',
      'Total Absence of Sclerenchyma Fibers & Stone Cells',
      'Dragendorff Orange-Red Reserpine Alkaloid Reaction',
      'Abundant Starch Granules in Wood Parenchyma'
    ],
    features: [
      {
        id: 'rauvolfia-cork',
        name: 'Stratified Suberized Cork Phellem',
        botanicalTerm: 'Phellem Stratificatum Suberatosum',
        category: 'Dermal',
        confidence: 0.99,
        x: 50,
        y: 18,
        radiusX: 38,
        radiusY: 6,
        polygonPoints: [[12,12],[88,12],[88,24],[12,24]],
        sizeMicrons: 35,
        description: 'Stratified cork consisting of alternating zones of large thin-walled cells and small compressed suberized cells.',
        diagnosticValue: 'Stratified cork structure is diagnostic for Rauvolfia root.',
        stainingResponse: 'Turns scarlet red with Sudan III.',
        pharmacognosticRole: 'Protective outer cork boundary.'
      },
      {
        id: 'rauvolfia-phloem',
        name: 'Phloem Parenchyma Devoid of Sclerenchyma',
        botanicalTerm: 'Parenchyma Phloemis Sine Sclerenchymate',
        category: 'Ground/Cortex',
        confidence: 0.98,
        x: 50,
        y: 42,
        radiusX: 35,
        radiusY: 10,
        polygonPoints: [[15,32],[85,32],[85,52],[15,52]],
        sizeMicrons: 30,
        description: 'Wide secondary phloem composed of parenchymatous cells and sieve tubes, completely lacking sclerenchyma fibers or stone cells.',
        diagnosticValue: 'Absence of sclerenchyma in phloem is pathognomonic proof distinguishing R. serpentina from adulterants.',
        stainingResponse: 'Gives orange-red precipitate with Dragendorff reagent; rose-red with Vanillin + HCl.',
        pharmacognosticRole: 'Alkaloid synthesis and nutrient translocation.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    sampleId: 'universal-leaf-ts',
    prompt: 'When examining a Leaf T.S. under 40x magnification, star-like rosette crystals are observed in the spongy mesophyll. Which reagent test confirms their calcium oxalate composition?',
    targetFeatureId: 'leaf-rosette',
    targetMagnification: '40x',
    targetStain: 'phloroglucinol',
    explanation: 'Calcium oxalate rosette crystals are insoluble in acetic acid but dissolve readily in dilute hydrochloric acid (HCl) without effervescence.',
    options: [
      'Dissolves in dilute HCl without effervescence; insoluble in acetic acid',
      'Turns blue-black immediately when Iodine solution is added',
      'Stains bright cherry-red with Phloroglucinol + HCl',
      'Dissolves completely in alcohol'
    ],
    correctAnswer: 'Dissolves in dilute HCl without effervescence; insoluble in acetic acid'
  },
  {
    id: 'q2',
    sampleId: 'universal-bark-ts',
    prompt: 'Under the microscope, isolated thick-walled sclerenchyma phloem fibers with narrow lumens are spotted in a Bark T.S. What color reaction occurs with Phloroglucinol + HCl?',
    targetFeatureId: 'bark-fiber',
    targetMagnification: '40x',
    targetStain: 'phloroglucinol',
    explanation: 'Phloroglucinol in the presence of concentrated HCl reacts specifically with lignin in secondary cell walls to produce a bright magenta/cherry-red color.',
    options: [
      'Turns deep cherry-red due to reaction with lignin',
      'Turns dark blue due to starch content',
      'Dissolves completely into gas bubbles',
      'Turns bright yellow due to suberin'
    ],
    correctAnswer: 'Turns deep cherry-red due to reaction with lignin'
  },
  {
    id: 'q3',
    sampleId: 'universal-rhizome-ts',
    prompt: 'In a Rhizome T.S., Parenchyma cells are densely packed with starch granules. Which histochemical stain instantly identifies starch inclusions?',
    targetFeatureId: 'rhizome-starch',
    targetMagnification: '40x',
    targetStain: 'iodine',
    explanation: 'Iodine solution forms a starch-polyiodide complex that imparts an intense dark blue-black color to amylaceous starch granules.',
    options: [
      'Iodine solution produces an intense dark blue-black coloration',
      'Sudan III turns starch granules brilliant orange',
      'Phloroglucinol turns starch bright pink',
      'Fast Green turns starch bright purple'
    ],
    correctAnswer: 'Iodine solution produces an intense dark blue-black coloration'
  },
  {
    id: 'q4',
    sampleId: 'universal-fruit-ts',
    prompt: 'In a Fruit T.S., how are schizogenous oil ducts (vittae) highlighted to confirm the presence of essential volatile oils?',
    targetFeatureId: 'fruit-vitta',
    targetMagnification: '10x',
    targetStain: 'iodine',
    explanation: 'Sudan III reagent is lipophilic and stains essential volatile oils and fixed fats inside secretory vittae a vibrant orange-red color.',
    options: [
      'Lipophilic Sudan III stains volatile oil drops bright orange-red',
      'Iodine stains essential oil dark blue',
      'Phloroglucinol dissolves the oil canal',
      'Ferric chloride turns the oil white'
    ],
    correctAnswer: 'Lipophilic Sudan III stains volatile oil drops bright orange-red'
  },
  {
    id: 'q5',
    sampleId: 'clove-flower-bud-ts',
    prompt: 'When testing a Clove Flower Bud (Hypanthium) T.S. slide, treating the section with 5% Potassium Hydroxide (KOH) produces which characteristic micro-chemical result?',
    targetFeatureId: 'clove-oil-gland',
    targetMagnification: '40x',
    targetStain: 'potassium_hydroxide',
    explanation: '5% Potassium Hydroxide (KOH) reacts with the phenolic hydroxyl group of eugenol contained in the schizolysigenous oil glands to form needle-shaped crystals of Potassium Eugenate.',
    options: [
      'Precipitation of needle-shaped crystals of Potassium Eugenate inside oil glands',
      'Effervescence with release of carbon dioxide gas bubbles',
      'Blue-black coloration of cellulose cell walls',
      'Complete dissolution of the columella central tissue'
    ],
    correctAnswer: 'Precipitation of needle-shaped crystals of Potassium Eugenate inside oil glands'
  },
  {
    id: 'q6',
    sampleId: 'ephedra-sinica-stem',
    prompt: 'Which chemical reagent test is used in the pharmacognosy practical syllabus to identify the secondary amino protoalkaloid Ephedrine in Ephedra stem T.S.?',
    targetFeatureId: 'ephedra-palisade',
    targetMagnification: '40x',
    targetStain: 'copper_sulfate',
    explanation: 'Treating the Ephedra extract/section with Copper Sulfate (12%) + Sodium Hydroxide (20%) and shaking with ether produces a violet-purple color in the aqueous layer and a red color in the ether layer.',
    options: [
      'Copper Sulfate (12%) + NaOH (20%) produces a purple-violet aqueous layer and red ether layer',
      'Phloroglucinol + HCl turns the pith bright yellow',
      'Sudan III turns ephedrine alkaloids indigo blue',
      'Iodine solution produces a cherry-red precipitate'
    ],
    correctAnswer: 'Copper Sulfate (12%) + NaOH (20%) produces a purple-violet aqueous layer and red ether layer'
  },
  {
    id: 'q7',
    sampleId: 'senna-leaf-isobilateral-ts',
    prompt: 'Which official chemical test is used to confirm the presence of dianthrone laxative glycosides (Sennosides A & B) in Senna leaflet sections?',
    targetFeatureId: 'senna-trichome',
    targetMagnification: '40x',
    targetStain: 'borntrager',
    explanation: 'Bornträger\'s test involves heating with dilute H2SO4, filtering, shaking with benzene/chloroform, and adding 10% ammonia solution, which yields a rose-pink to cherry-red color in the ammoniacal layer.',
    options: [
      'Bornträger\'s test yields a rose-pink to cherry-red color in the ammoniacal layer',
      'Shinoda test yields a bright yellow solution',
      'Vitali-Morin test produces a violet-blue color',
      'Thalleioquin test produces an emerald green color'
    ],
    correctAnswer: 'Bornträger\'s test yields a rose-pink to cherry-red color in the ammoniacal layer'
  },
  {
    id: 'q8',
    sampleId: 'cinnamon-bark-inner-ts',
    prompt: 'In Cinnamon Bark T.S., what happens when Vanillin + Concentrated HCl (1:1) reagent is applied to the section under the microscope?',
    targetFeatureId: 'cinnamon-oil-cell',
    targetMagnification: '40x',
    targetStain: 'vanillin_hcl',
    explanation: 'Vanillin + HCl reagent reacts specifically with cinnamaldehyde contained inside large secretory oil cells to produce an intense violet-red / deep magenta coloration.',
    options: [
      'Secretory oil cells turn deep violet-red due to cinnamaldehyde reaction',
      'Stone cells dissolve completely into solution',
      'Micro-acicular crystals turn deep blue-black',
      'Phloem fibers turn pale yellow'
    ],
    correctAnswer: 'Secretory oil cells turn deep violet-red due to cinnamaldehyde reaction'
  },
  {
    id: 'q9',
    sampleId: 'rauvolfia-serpentina-root',
    prompt: 'Which general alkaloid reagent produces an intense reddish-orange flocculent precipitate when applied to Rauvolfia root T.S. containing reserpine?',
    targetFeatureId: 'rauvolfia-phloem',
    targetMagnification: '40x',
    targetStain: 'dragendorff',
    explanation: 'Dragendorff\'s reagent (Potassium Bismuth Iodide) reacts with basic nitrogen of indole alkaloids (reserpine) in Rauvolfia root to form a insoluble reddish-orange precipitate.',
    options: [
      'Dragendorff\'s reagent (Potassium Bismuth Iodide) produces an orange-red precipitate',
      'Ruthenium red produces a bright green precipitate',
      'Lead acetate produces a deep blue coloration',
      'Millon\'s reagent turns the tissue dark brown'
    ],
    correctAnswer: 'Dragendorff\'s reagent (Potassium Bismuth Iodide) produces an orange-red precipitate'
  }
];
