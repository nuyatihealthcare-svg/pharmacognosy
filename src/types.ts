export type ObjectiveLens = '4x' | '10x' | '40x' | '100x';

export type StainType =
  | 'sudan3'
  | 'phloroglucinol'
  | 'iodine'
  | 'ruthenium_red'
  | 'ferric_chloride'
  | 'borntrager'
  | 'dragendorff'
  | 'vanillin_hcl'
  | 'potassium_hydroxide'
  | 'copper_sulfate'
  | 'safranin'
  | 'unstained';

export type FeatureCategory = 'Dermal' | 'Vascular' | 'Ground/Cortex' | 'Inclusions' | 'Secretory' | 'Pith';

export interface PhytochemicalTest {
  testName: string;
  reagentUsed: string;
  targetConstituent: string;
  visualReaction: string;
  chemicalMechanism: string;
  pharmacognosticSignificance: string;
}

export type EdgeModelArchitecture = 'YOLO26-Nano' | 'YOLOv11-Nano' | 'MobileSAM' | 'FastSAM' | 'TFLite-INT8';

export type InferenceEngine = 'TFLite (NNAPI/GPU)' | 'ONNX Runtime Mobile' | 'MediaPipe Tasks';

export type DetectionMode = 'bounding-box' | 'pixel-exact-mask';

export interface DomainAugmentations {
  hueShift: number; // -180 to 180 deg
  saturationJitter: number; // 50 to 150 %
  contrastJitter: number; // 50 to 150 %
  gaussianBlur: number; // 0 to 10 px
  chromaticAberration: boolean;
}

export interface AnatomicalFeature {
  id: string;
  name: string;
  botanicalTerm: string;
  category: FeatureCategory;
  confidence: number;
  x: number; // percentage coordinate 0-100 on canvas
  y: number; // percentage coordinate 0-100 on canvas
  radiusX: number;
  radiusY: number;
  bbox?: [number, number, number, number]; // [xmin, ymin, xmax, ymax] in percentage 0-100
  aspectRatio?: number;
  areaPixelSq?: number;
  polygonPoints?: [number, number][]; // relative polygon points
  description: string;
  diagnosticValue: string;
  stainingResponse: string;
  pharmacognosticRole: string;
  sizeMicrons: number;
}

export interface DeepAnalysisMetrics {
  totalCellCount: number;
  stomatalIndex?: string;
  meanLumenDiameterMicrons?: number;
  cellWallThicknessMicrons?: number;
  lignificationDegree?: string;
  purityScorePercent?: number;
  deepTissueSummary?: string;
  qualityGrade?: string;
  vascularBundleCount?: number;
  crystalInclusionDensity?: string;
}

export interface BotanicalSample {
  id: string;
  name: string;
  latinName: string;
  family: string;
  plantPart: string;
  organType: 'Leaf T.S.' | 'Bark T.S.' | 'Fruit T.S.' | 'Rhizome T.S.' | 'Stem T.S.' | 'Seed T.S.' | 'Root T.S.' | 'Powdered Drug' | string;
  description: string;
  keyFeatures: string[];
  features: AnatomicalFeature[];
  bgColor: string;
  chemicalConstituents: string[];
  adulterantMarker: string;
  histochemicalTest: string;
  imageUrl?: string;
  differentiatingMarkers?: string[];
  phytochemicalTests?: PhytochemicalTest[];
  deepAnalysisMetrics?: DeepAnalysisMetrics;
}

export interface OpticalSettings {
  magnification: ObjectiveLens;
  focusLevel: number; // 0 to 100 (50 is sharp)
  lightIntensity: number; // 0 to 100
  stain: StainType;
  contrast: number; // 80 to 120
  stageX: number; // -100 to 100
  stageY: number; // -100 to 100
  showGraticule: boolean;
  showDetectionOverlay: boolean;
  showPolygonMasks: boolean;
  confidenceFilter: number; // 0.5 to 0.95 (default 0.65)
  selectedCategories: FeatureCategory[];
}

export interface HardwareMountSettings {
  offsetX: number; // -20 to 20
  offsetY: number; // -20 to 20
  tilt: number; // -5 to 5
  vignette: number; // 0 to 100
  autofocusLock: boolean;
  exposureLock: boolean;
  fps: number;
  aiInferenceFps: number;
  inferenceLatencyMs: number;
  modelArchitecture: EdgeModelArchitecture;
  inferenceEngine: InferenceEngine;
  detectionMode: DetectionMode;
  useKalmanFilter: boolean;
  yuvTensorFormat: string;
  augmentations: DomainAugmentations;
}

export interface MeasurementLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lengthMicrons: number;
  label: string;
}

export interface QuizQuestion {
  id: string;
  sampleId: string;
  prompt: string;
  targetFeatureId: string;
  targetMagnification: ObjectiveLens;
  targetStain: StainType;
  explanation: string;
  options: string[];
  correctAnswer: string;
}

export interface LabReportData {
  studentName: string;
  institution: string;
  sampleName: string;
  magnification: ObjectiveLens;
  stainUsed: StainType;
  detectedCount: number;
  measurements: MeasurementLine[];
  notes: string;
  timestamp: string;
}

