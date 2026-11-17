import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BotanicalSample, OpticalSettings, AnatomicalFeature, MeasurementLine, HardwareMountSettings } from '../types';
import { Camera, CameraOff, Sparkles, RefreshCw, SwitchCamera, Upload, AlertTriangle, Download, CheckCircle2, Focus, Compass, Maximize2, Ratio } from 'lucide-react';

export type AspectRatioMode = '1:1' | '4:3' | '16:9' | '3:4' | 'auto';

interface MicroscopeViewportProps {
  sample: BotanicalSample;
  opticalSettings: OpticalSettings;
  hardwareSettings?: HardwareMountSettings;
  selectedFeature: AnatomicalFeature | null;
  onSelectFeature: (feature: AnatomicalFeature | null) => void;
  measurements: MeasurementLine[];
  onAddMeasurement: (line: MeasurementLine) => void;
  isMeasuringMode: boolean;
  onCaptureAndAnalyze?: (base64Image: string) => void;
  isAnalyzing?: boolean;
  onOpenDeepWindow?: () => void;
}

export const MicroscopeViewport: React.FC<MicroscopeViewportProps> = ({
  sample,
  opticalSettings,
  hardwareSettings,
  selectedFeature,
  onSelectFeature,
  measurements,
  onAddMeasurement,
  isMeasuringMode,
  onCaptureAndAnalyze,
  isAnalyzing = false,
  onOpenDeepWindow
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);

  const [isLiveCamera, setIsLiveCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string>('');
  const [currentFacingMode, setCurrentFacingMode] = useState<'environment' | 'user'>('environment');

  const [measureStart, setMeasureStart] = useState<{ x: number; y: number } | null>(null);
  const [currentMeasureEnd, setCurrentMeasureEnd] = useState<{ x: number; y: number } | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<AnatomicalFeature | null>(null);
  const [isDownloadingSnapshot, setIsDownloadingSnapshot] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [aspectRatioMode, setAspectRatioMode] = useState<AspectRatioMode>('auto');
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  // Load custom image when sample.imageUrl is provided
  useEffect(() => {
    if (sample.imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = sample.imageUrl;
      img.onload = () => setLoadedImage(img);
      img.onerror = () => setLoadedImage(null);
    } else {
      setLoadedImage(null);
    }
  }, [sample.imageUrl]);

  const getContainerAspectRatioClass = () => {
    switch (aspectRatioMode) {
      case '1:1':
        return 'aspect-square max-w-[620px] h-auto';
      case '4:3':
        return 'aspect-[4/3] max-w-[680px] h-auto';
      case '16:9':
        return 'aspect-[16/9] max-w-[760px] h-auto';
      case '3:4':
        return 'aspect-[3/4] max-w-[480px] h-auto';
      case 'auto':
      default:
        return 'aspect-[4/3] sm:aspect-square max-w-[620px] h-auto max-h-[50vh] sm:max-h-none';
    }
  };

  // Zoom scale based on magnification
  const getZoomFactor = () => {
    switch (opticalSettings.magnification) {
      case '4x': return 1.2;
      case '10x': return 2.2;
      case '40x': return 4.5;
      case '100x': return 9.0;
      default: return 2.0;
    }
  };

  // Micrometer calibration factor (microns per pixel)
  const getMicronsPerPixel = () => {
    const zoom = getZoomFactor();
    return 10 / zoom;
  };

  // Focus blur level calculation (50 = sharp)
  const blurPixels = Math.abs(opticalSettings.focusLevel - 50) * 0.18;

  // Analysis confidence score calculation based on sample base confidence and focus level
  const baseConfidence = sample.features.length > 0
    ? sample.features.reduce((acc, f) => acc + f.confidence, 0) / sample.features.length
    : 0.88;
  const focusDeviation = Math.abs(opticalSettings.focusLevel - 50);
  const focusPenalty = focusDeviation * 0.012;
  const analysisConfidence = Math.max(0.2, Math.min(0.99, baseConfidence - focusPenalty));
  const isOptimalFocus = analysisConfidence >= 0.65 && focusDeviation <= 12;

  // Domain Augmentation CSS filter generator
  const getCombinedFilterStyle = () => {
    let stainFilter = '';
    switch (opticalSettings.stain) {
      case 'sudan3':
        stainFilter = 'sepia(0.5) hue-rotate(-20deg) saturate(2.3) contrast(1.15)';
        break;
      case 'phloroglucinol':
        stainFilter = 'sepia(0.4) hue-rotate(-60deg) saturate(2.0) contrast(1.1)';
        break;
      case 'iodine':
        stainFilter = 'sepia(0.7) hue-rotate(190deg) saturate(1.8) contrast(1.2)';
        break;
      case 'ruthenium_red':
        stainFilter = 'sepia(0.3) hue-rotate(-40deg) saturate(2.1)';
        break;
      case 'ferric_chloride':
        stainFilter = 'brightness(0.7) contrast(1.4) sepia(0.5) hue-rotate(150deg) saturate(1.3)';
        break;
      case 'borntrager':
        stainFilter = 'sepia(0.4) hue-rotate(-45deg) saturate(1.9)';
        break;
      case 'dragendorff':
        stainFilter = 'sepia(0.6) hue-rotate(-15deg) saturate(2.0)';
        break;
      case 'vanillin_hcl':
        stainFilter = 'sepia(0.3) hue-rotate(-55deg) saturate(2.3)';
        break;
      case 'potassium_hydroxide':
        stainFilter = 'brightness(1.1) contrast(1.25) sepia(0.4) hue-rotate(20deg) saturate(1.7)';
        break;
      case 'copper_sulfate':
        stainFilter = 'sepia(0.5) hue-rotate(160deg) saturate(2.2) contrast(1.2)';
        break;
      case 'safranin':
        stainFilter = 'sepia(0.3) hue-rotate(-30deg) saturate(1.5)';
        break;
      case 'unstained':
      default:
        stainFilter = 'none';
        break;
    }

    // Apply Domain Augmentation overrides if provided
    let augFilter = '';
    if (hardwareSettings?.augmentations) {
      const { hueShift, saturationJitter, contrastJitter, gaussianBlur } = hardwareSettings.augmentations;
      augFilter = `hue-rotate(${hueShift}deg) saturate(${saturationJitter}%) contrast(${contrastJitter}%) blur(${blurPixels + gaussianBlur}px)`;
    } else {
      augFilter = `blur(${blurPixels}px) brightness(${opticalSettings.lightIntensity / 50}) contrast(${opticalSettings.contrast}%)`;
    }

    return `${augFilter} ${stainFilter}`;
  };

  // Spatial Context Location Estimation based on stage coordinates & sample
  const getSpatialLocationName = () => {
    const dist = Math.hypot(opticalSettings.stageX, opticalSettings.stageY);
    if (dist < 25) return 'Central Pith / Stele Core';
    if (dist < 60) return 'Vascular Ring / Middle Cortex';
    return 'Outer Dermal Margin / Cuticle';
  };

  // Start Live Camera
  const startCamera = async (targetDeviceId?: string, forceFacingMode?: 'environment' | 'user') => {
    setCameraError(null);
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }

    const modeToUse = forceFacingMode || currentFacingMode;

    const constraintOptions: MediaStreamConstraints[] = [];
    if (targetDeviceId) {
      constraintOptions.push({ video: { deviceId: { exact: targetDeviceId } } });
    }
    constraintOptions.push({
      video: {
        facingMode: { exact: modeToUse },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });
    constraintOptions.push({
      video: {
        facingMode: { ideal: modeToUse },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });
    constraintOptions.push({ video: { facingMode: modeToUse } });
    constraintOptions.push({ video: true });

    let stream: MediaStream | null = null;
    let errorToReport: any = null;

    for (const option of constraintOptions) {
      try {
        stream = await navigator.mediaDevices.getUserMedia(option);
        if (stream) break;
      } catch (err) {
        errorToReport = err;
      }
    }

    if (stream) {
      setCameraStream(stream);
      setIsLiveCamera(true);
      setCurrentFacingMode(modeToUse);
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        setVideoDevices(videoInputs);
        const currentTrack = stream.getVideoTracks()[0];
        if (currentTrack && currentTrack.getSettings().deviceId) {
          setActiveDeviceId(currentTrack.getSettings().deviceId!);
        }
      } catch (enumErr) {
        console.warn('Device enumeration warning:', enumErr);
      }
    } else {
      setIsLiveCamera(false);
      const isDenied = errorToReport && (errorToReport.name === 'NotAllowedError' || errorToReport.name === 'PermissionDeniedError');
      if (isDenied) {
        setCameraError('Camera access was blocked by browser permissions. Tap "Snap Photo" below to take a picture using your mobile camera app!');
      } else {
        setCameraError('Unable to connect to live video stream. Tap "Snap Photo" to take a direct picture with your device camera!');
      }
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsLiveCamera(false);
    setCameraError(null);
  };

  const toggleCameraStream = () => {
    if (isLiveCamera) stopCamera();
    else startCamera();
  };

  const handleSwitchCamera = () => {
    if (videoDevices.length > 1) {
      const currentIndex = videoDevices.findIndex((d) => d.deviceId === activeDeviceId);
      const nextIndex = (currentIndex + 1) % videoDevices.length;
      const nextDevice = videoDevices[nextIndex];
      if (nextDevice?.deviceId) {
        startCamera(nextDevice.deviceId);
        return;
      }
    }
    // Toggle facing mode if device enumeration returned single device
    const nextFacing = currentFacingMode === 'environment' ? 'user' : 'environment';
    startCamera(undefined, nextFacing);
  };

  useEffect(() => {
    if (isLiveCamera && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((err) => console.log('Video play error:', err));
    }
  }, [isLiveCamera, cameraStream]);

  useEffect(() => {
    return () => {
      if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream]);

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = videoRef.current.videoWidth || 640;
    tempCanvas.height = videoRef.current.videoHeight || 480;
    const ctx = tempCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, tempCanvas.width, tempCanvas.height);
      const base64 = tempCanvas.toDataURL('image/jpeg', 0.85);
      if (onCaptureAndAnalyze) onCaptureAndAnalyze(base64);
    }
  };

  const handleNativeCameraSnap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result && onCaptureAndAnalyze) {
        onCaptureAndAnalyze(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // High-Resolution PNG Export Handler
  const handleDownloadHighResSnapshot = () => {
    setIsDownloadingSnapshot(true);
    setDownloadSuccess(false);

    try {
      const exportWidth = 1200;
      const exportHeight = 1200;
      const scale = exportWidth / 600;

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = exportWidth;
      offscreenCanvas.height = exportHeight;
      const ctx = offscreenCanvas.getContext('2d');
      if (!ctx) {
        setIsDownloadingSnapshot(false);
        return;
      }

      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, exportWidth, exportHeight);

      if (isLiveCamera && videoRef.current) {
        ctx.save();
        ctx.filter = getCombinedFilterStyle();
        ctx.drawImage(videoRef.current, 0, 0, exportWidth, exportHeight);
        ctx.restore();
      } else if (canvasRef.current) {
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(canvasRef.current, 0, 0, exportWidth, exportHeight);
        ctx.restore();
      }

      const zoom = getZoomFactor();
      const centerX = exportWidth / 2;
      const centerY = exportHeight / 2;

      // Draw active feature detection overlays
      if (opticalSettings.showDetectionOverlay && sample.features) {
        sample.features.forEach((feat) => {
          if (opticalSettings.confidenceFilter > feat.confidence) return;
          if (
            opticalSettings.selectedCategories.length > 0 &&
            !opticalSettings.selectedCategories.includes(feat.category)
          ) {
            return;
          }

          const featPxX = centerX + (feat.x - 50) * 8 * zoom * scale;
          const featPxY = centerY + (feat.y - 50) * 8 * zoom * scale;
          const rx = Math.max(feat.radiusX * 6 * zoom, 16) * scale;
          const ry = Math.max(feat.radiusY * 6 * zoom, 16) * scale;

          const isSelected = selectedFeature?.id === feat.id;

          let strokeColor = '#eab308';
          let fillColor = 'rgba(234, 179, 8, 0.18)';
          let badgeBg = '#854d0e';

          if (feat.category === 'Vascular') {
            strokeColor = '#f43f5e';
            fillColor = 'rgba(244, 63, 94, 0.22)';
            badgeBg = '#9f1239';
          } else if (feat.category === 'Inclusions') {
            strokeColor = '#f59e0b';
            fillColor = 'rgba(245, 158, 11, 0.28)';
            badgeBg = '#78350f';
          } else if (feat.category === 'Dermal') {
            strokeColor = '#06b6d4';
            fillColor = 'rgba(6, 182, 212, 0.22)';
            badgeBg = '#155e75';
          } else if (feat.category === 'Ground/Cortex') {
            strokeColor = '#10b981';
            fillColor = 'rgba(16, 185, 129, 0.2)';
            badgeBg = '#065f46';
          } else if (feat.category === 'Secretory') {
            strokeColor = '#a855f7';
            fillColor = 'rgba(168, 85, 247, 0.25)';
            badgeBg = '#6b21a8';
          }

          if (isSelected) {
            strokeColor = '#3b82f6';
            fillColor = 'rgba(59, 130, 246, 0.35)';
            badgeBg = '#1d4ed8';
          }

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(featPxX, featPxY, rx, ry, 0, 0, Math.PI * 2);
          ctx.fillStyle = fillColor;
          ctx.fill();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = (isSelected ? 3 : 2) * scale;
          ctx.stroke();
          ctx.restore();

          // Floating Label Badge
          ctx.save();
          const labelText = `${feat.name} (${feat.sizeMicrons}µm)`;
          ctx.font = `bold ${11 * scale}px sans-serif`;
          const textMetrics = ctx.measureText(labelText);
          const badgeWidth = textMetrics.width + 20 * scale;
          const badgeHeight = 24 * scale;
          const badgeX = featPxX - badgeWidth / 2;
          const badgeY = featPxY - ry - badgeHeight - 6 * scale;

          ctx.fillStyle = badgeBg;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 6 * scale);
          } else {
            ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
          }
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, featPxX, badgeY + badgeHeight / 2);
          ctx.restore();
        });
      }

      // Watermark Header
      ctx.save();
      ctx.fillStyle = 'rgba(18, 21, 27, 0.9)';
      ctx.fillRect(0, 0, exportWidth, 64 * scale);

      ctx.fillStyle = '#10b981';
      ctx.font = `bold ${14 * scale}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('PhytoScan AI • Edge Botanical Scanner', 20 * scale, 24 * scale);

      ctx.fillStyle = '#94a3b8';
      ctx.font = `${11 * scale}px sans-serif`;
      ctx.fillText(`Sample: ${sample.name} (${sample.latinName})`, 20 * scale, 46 * scale);

      ctx.textAlign = 'right';
      ctx.fillText(new Date().toLocaleDateString(), exportWidth - 20 * scale, 35 * scale);
      ctx.restore();

      offscreenCanvas.toBlob((blob) => {
        if (!blob) {
          setIsDownloadingSnapshot(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `PhytoScan-${sample.id}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsDownloadingSnapshot(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 'image/png');
    } catch (err) {
      console.error('High-res snapshot export error:', err);
      setIsDownloadingSnapshot(false);
    }
  };

  // Canvas Drawing Procedure for Procedural Viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLiveCamera) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const zoom = getZoomFactor();

    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Apply filters
    ctx.filter = getCombinedFilterStyle();

    // Background Canvas
    ctx.fillStyle = sample.bgColor || '#1a2421';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    if (loadedImage) {
      const imgAspect = loadedImage.width / loadedImage.height;
      let drawW = width * zoom;
      let drawH = (width / imgAspect) * zoom;
      if (imgAspect < 1) {
        drawH = height * zoom;
        drawW = height * imgAspect * zoom;
      }
      const drawX = centerX - drawW / 2 + opticalSettings.stageX * 3 * zoom;
      const drawY = centerY - drawH / 2 + opticalSettings.stageY * 3 * zoom;
      ctx.drawImage(loadedImage, drawX, drawY, drawW, drawH);
    } else {
      // Background Cellular Pattern Simulation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      const cellSize = 18 * zoom;
      const startX = (centerX % cellSize) - cellSize;
      const startY = (centerY % cellSize) - cellSize;

      for (let x = startX; x < width + cellSize; x += cellSize) {
        for (let y = startY; y < height + cellSize; y += cellSize) {
          ctx.beginPath();
          ctx.arc(x, y, cellSize * 0.45, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    // Anatomical Feature Shapes
    sample.features.forEach((feat) => {
      const fx = centerX + (feat.x - 50) * 8 * zoom;
      const fy = centerY + (feat.y - 50) * 8 * zoom;
      const rx = feat.radiusX * 6 * zoom;
      const ry = feat.radiusY * 6 * zoom;

      ctx.save();
      ctx.translate(fx, fy);

      let fillColor = 'rgba(100, 200, 120, 0.25)';
      let strokeColor = 'rgba(120, 220, 140, 0.8)';

      if (feat.category === 'Inclusions') {
        fillColor = 'rgba(255, 230, 100, 0.4)';
        strokeColor = 'rgba(255, 240, 160, 0.9)';
      } else if (feat.category === 'Vascular') {
        fillColor = opticalSettings.stain === 'phloroglucinol' ? 'rgba(255, 60, 100, 0.5)' : 'rgba(220, 80, 80, 0.4)';
        strokeColor = 'rgba(255, 100, 120, 0.9)';
      } else if (feat.category === 'Secretory') {
        fillColor = 'rgba(255, 180, 50, 0.45)';
        strokeColor = 'rgba(255, 200, 80, 0.9)';
      } else if (feat.category === 'Dermal') {
        fillColor = 'rgba(80, 180, 220, 0.3)';
        strokeColor = 'rgba(100, 200, 255, 0.8)';
      }

      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2 * zoom;

      if (hardwareSettings?.detectionMode === 'pixel-exact-mask' && feat.polygonPoints) {
        ctx.beginPath();
        feat.polygonPoints.forEach(([px, py], idx) => {
          const ptX = (px - feat.x) * 6 * zoom;
          const ptY = (py - feat.y) * 6 * zoom;
          if (idx === 0) ctx.moveTo(ptX, ptY);
          else ctx.lineTo(ptX, ptY);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    });

    ctx.restore();
  }, [sample, opticalSettings, hardwareSettings, blurPixels, isLiveCamera, loadedImage]);

  // Touch & Mouse Event Handlers for Caliper Measurement
  const handleStart = (clientX: number, clientY: number) => {
    if (!isMeasuringMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) * (600 / rect.width);
    const y = (clientY - rect.top) * (600 / rect.height);
    setMeasureStart({ x, y });
    setCurrentMeasureEnd({ x, y });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isMeasuringMode || !measureStart || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) * (600 / rect.width);
    const y = (clientY - rect.top) * (600 / rect.height);
    setCurrentMeasureEnd({ x, y });
  };

  const handleEnd = () => {
    if (!isMeasuringMode || !measureStart || !currentMeasureEnd) return;
    const distPx = Math.hypot(currentMeasureEnd.x - measureStart.x, currentMeasureEnd.y - measureStart.y);
    if (distPx > 10) {
      const lengthMicrons = Math.round(distPx * getMicronsPerPixel());
      onAddMeasurement({
        id: `m-${Date.now()}`,
        x1: measureStart.x,
        y1: measureStart.y,
        x2: currentMeasureEnd.x,
        y2: currentMeasureEnd.y,
        lengthMicrons,
        label: `${lengthMicrons} µm`
      });
    }
    setMeasureStart(null);
    setCurrentMeasureEnd(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Hidden file input for native camera snap */}
      <input
        type="file"
        ref={nativeCameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleNativeCameraSnap}
        className="hidden"
      />

      {/* Live Camera Stream Toggle Bar & Mobile Aspect Ratio Selector */}
      <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-[#12151B] p-2 rounded-xl border border-slate-800 text-xs gap-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleCameraStream}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              isLiveCamera
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-950 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold'
            }`}
          >
            {isLiveCamera ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            <span>{isLiveCamera ? 'Stop Camera' : 'Live Camera'}</span>
          </button>

          {isLiveCamera && (
            <button
              onClick={handleSwitchCamera}
              className="px-2.5 py-1.5 min-h-[36px] sm:min-h-0 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1 font-semibold text-xs border border-slate-700"
              title={`Switch camera view (${currentFacingMode === 'environment' ? 'Rear' : 'Front'})`}
            >
              <SwitchCamera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flip</span>
            </button>
          )}

          <button
            onClick={() => nativeCameraInputRef.current?.click()}
            className="px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold rounded-lg flex items-center gap-1.5 border border-emerald-500/30 transition-all text-xs"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Snap Photo</span>
          </button>

          {onOpenDeepWindow && (
            <button
              onClick={onOpenDeepWindow}
              className="px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md transition-all text-xs"
              title="Open larger screen window for image processing and cell decoding"
            >
              <Maximize2 className="w-3.5 h-3.5 text-slate-950" />
              <span>Large Window</span>
            </button>
          )}

          <button
            onClick={handleDownloadHighResSnapshot}
            disabled={isDownloadingSnapshot}
            className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all text-xs border ${
              downloadSuccess
                ? 'bg-emerald-600 text-slate-950 border-emerald-400'
                : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-sky-500/40'
            }`}
          >
            {isDownloadingSnapshot ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-300" />
            ) : downloadSuccess ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
            ) : (
              <Download className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span>{downloadSuccess ? 'Downloaded!' : isDownloadingSnapshot ? 'Exporting...' : 'Export PNG'}</span>
          </button>
        </div>

        {/* Flexible Mobile View Aspect Ratio Control Chips */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 text-[11px] font-mono overflow-x-auto shrink-0 justify-between sm:justify-start">
          <div className="flex items-center gap-1 text-slate-400 px-1 text-[10px] uppercase font-bold shrink-0">
            <Ratio className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Ratio:</span>
          </div>
          {(
            [
              { id: 'auto', label: 'Fluid', shortLabel: 'Fluid' },
              { id: '1:1', label: '1:1', shortLabel: '1:1' },
              { id: '4:3', label: '4:3', shortLabel: '4:3' },
              { id: '16:9', label: '16:9', shortLabel: '16:9' },
              { id: '3:4', label: '3:4', shortLabel: '3:4' },
            ] as const
          ).map((ratio) => (
            <button
              key={ratio.id}
              onClick={() => setAspectRatioMode(ratio.id)}
              className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-all shrink-0 ${
                aspectRatioMode === ratio.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={`Change aspect ratio frame to ${ratio.label}`}
            >
              {ratio.shortLabel}
            </button>
          ))}
        </div>

        {isLiveCamera && (
          <button
            onClick={handleCaptureSnapshot}
            disabled={isAnalyzing}
            className="px-3 py-1.5 min-h-[36px] sm:min-h-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all disabled:opacity-50 text-xs shrink-0"
          >
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <Sparkles className="w-4 h-4 text-slate-950" />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'Identify Cells'}</span>
          </button>
        )}
      </div>

      {cameraError && (
        <div className="w-full text-xs text-rose-200 bg-rose-500/15 border border-rose-500/30 p-3 rounded-xl flex items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{cameraError}</span>
          </div>
          <button
            onClick={() => startCamera()}
            className="px-2.5 py-1 bg-rose-500 text-white rounded font-bold uppercase tracking-wider text-[10px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Out-of-Focus Soft Warning Banner */}
      {!isOptimalFocus && (
        <div className="w-full bg-amber-500/15 border border-amber-500/40 text-amber-200 px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 font-mono animate-pulse shadow-lg">
          <div className="flex items-center gap-2">
            <Focus className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Out of Focus: Adjust fine-focus knob for clearer cellular structure.</span>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold uppercase border border-amber-500/30">
            Confidence &lt; 65%
          </span>
        </div>
      )}

      {/* Main Microscopic Viewport Box */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onMouseUp={handleEnd}
        onTouchStart={(e) => {
          if (e.touches.length > 0) handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onTouchEnd={handleEnd}
        className={`relative w-full mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 select-none cursor-crosshair touch-none transition-all duration-300 ${getContainerAspectRatioClass()}`}
      >
        {isLiveCamera ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ filter: getCombinedFilterStyle() }}
          />
        ) : sample.imageUrl ? (
          <img
            src={sample.imageUrl}
            alt={sample.name}
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{ filter: getCombinedFilterStyle() }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        )}

        {/* AI Cell Overlays - Bounding Boxes or Polygon Masks */}
        {opticalSettings.showDetectionOverlay && (
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {sample.features.map((feat) => {
              if (opticalSettings.confidenceFilter > feat.confidence) return null;
              if (
                opticalSettings.selectedCategories.length > 0 &&
                !opticalSettings.selectedCategories.includes(feat.category)
              ) return null;

              const zoom = getZoomFactor();
              const centerX = 300;
              const centerY = 300;

              const featPxX = centerX + (feat.x - 50) * 8 * zoom;
              const featPxY = centerY + (feat.y - 50) * 8 * zoom;
              const rx = Math.max(feat.radiusX * 6 * zoom, 16);
              const ry = Math.max(feat.radiusY * 6 * zoom, 16);

              const isSelected = selectedFeature?.id === feat.id;

              let strokeColor = '#eab308';
              let fillColor = 'rgba(234, 179, 8, 0.18)';
              let badgeBg = '#854d0e';

              if (feat.category === 'Vascular') {
                strokeColor = '#f43f5e';
                fillColor = 'rgba(244, 63, 94, 0.22)';
                badgeBg = '#9f1239';
              } else if (feat.category === 'Inclusions') {
                strokeColor = '#f59e0b';
                fillColor = 'rgba(245, 158, 11, 0.28)';
                badgeBg = '#78350f';
              } else if (feat.category === 'Dermal') {
                strokeColor = '#06b6d4';
                fillColor = 'rgba(6, 182, 212, 0.22)';
                badgeBg = '#155e75';
              } else if (feat.category === 'Ground/Cortex') {
                strokeColor = '#10b981';
                fillColor = 'rgba(16, 185, 129, 0.2)';
                badgeBg = '#065f46';
              } else if (feat.category === 'Secretory') {
                strokeColor = '#a855f7';
                fillColor = 'rgba(168, 85, 247, 0.25)';
                badgeBg = '#6b21a8';
              }

              if (isSelected) {
                strokeColor = '#3b82f6';
                fillColor = 'rgba(59, 130, 246, 0.35)';
                badgeBg = '#1d4ed8';
              }

              const usePolygons = hardwareSettings?.detectionMode === 'pixel-exact-mask' && feat.polygonPoints;
              const bx = featPxX - rx;
              const by = featPxY - ry;
              const bw = rx * 2;
              const bh = ry * 2;
              const cornerLen = Math.min(10, Math.min(bw, bh) / 3);

              return (
                <g key={feat.id} className="transition-all duration-200">
                  {/* Bounding Box Base Fill & Border */}
                  {usePolygons ? (
                    <polygon
                      points={feat.polygonPoints!.map(([px, py]) => {
                        const ptX = centerX + (px - 50) * 8 * zoom;
                        const ptY = centerY + (py - 50) * 8 * zoom;
                        return `${ptX},${ptY}`;
                      }).join(' ')}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 3 : 1.5}
                    />
                  ) : (
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
                  )}

                  {/* OCR Bracket Corner Notches */}
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

                  {/* Centroid Crosshair Reticle */}
                  <g>
                    <line
                      x1={featPxX - 6}
                      y1={featPxY}
                      x2={featPxX + 6}
                      y2={featPxY}
                      stroke={strokeColor}
                      strokeWidth={1.5}
                    />
                    <line
                      x1={featPxX}
                      y1={featPxY - 6}
                      x2={featPxX}
                      y2={featPxY + 6}
                      stroke={strokeColor}
                      strokeWidth={1.5}
                    />
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
                  <g transform={`translate(${bx}, ${by - 20})`}>
                    <rect
                      x={0}
                      y={0}
                      width={Math.max(bw, 110)}
                      height={18}
                      rx={3}
                      fill={badgeBg}
                      className="shadow-lg opacity-95"
                    />
                    <text
                      x={6}
                      y={12}
                      fill="#ffffff"
                      fontSize={8.5}
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="start"
                    >
                      {feat.name.length > 13 ? feat.name.slice(0, 11) + '…' : feat.name} ({Math.round(feat.confidence * 100)}%)
                    </text>
                  </g>

                  {/* Micro Coordinate Tag */}
                  {isSelected && (
                    <g transform={`translate(${bx}, ${by + bh + 4})`}>
                      <rect
                        x={0}
                        y={0}
                        width={Math.max(bw, 120)}
                        height={14}
                        rx={2}
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth={0.8}
                      />
                      <text
                        x={4}
                        y={10}
                        fill="#38bdf8"
                        fontSize={7.5}
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        BBOX [{Math.round(bx)},{Math.round(by)},{Math.round(bw)},{Math.round(bh)}]
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* OCR Deep Scanning HUD Overlay when analyzing */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-emerald-400 font-mono pointer-events-auto">
            {/* Animated Scanning Laser Beam Sweep Line */}
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981]"
            />

            {/* OCR Targeting Frame Reticles */}
            <div className="absolute inset-8 border border-emerald-500/30 rounded-2xl pointer-events-none flex justify-between p-2">
              <div className="w-6 h-6 border-t-2 border-l-2 border-emerald-400" />
              <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400" />
            </div>

            {/* Scanning Progress & Phase Info Box */}
            <div className="bg-[#0A0C10]/90 border border-emerald-500/40 p-4 sm:p-5 rounded-2xl shadow-2xl max-w-sm w-full text-center space-y-3 z-10">
              <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm tracking-wider uppercase">
                <RefreshCw className="w-5 h-5 animate-spin text-emerald-400" />
                <span>OCR Deep Bounding Scan</span>
              </div>

              <div className="space-y-1.5 text-left text-[11px] text-slate-300 bg-[#12151B] p-3 rounded-xl border border-slate-800">
                <p className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Phase 1: Spatial Contour Binarization</span>
                </p>
                <p className="flex items-center gap-2 text-amber-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Phase 2: Cell Feature Token Segmentation</span>
                </p>
                <p className="flex items-center gap-2 text-sky-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Phase 3: Histological Morphometry Decoding</span>
                </p>
              </div>

              <p className="text-[10px] text-slate-400 animate-pulse">
                Extracting bounding box coordinates [X, Y, W, H] & anatomical tags...
              </p>
            </div>
          </div>
        )}
        {opticalSettings.showGraticule && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-70">
            <div className="w-full h-full relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-400/80" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-emerald-400/80" />
            </div>
          </div>
        )}

        {/* Dynamic Micrometer Scale Bar Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-emerald-300 flex items-center gap-2 z-20">
          <div className="w-12 h-1 bg-emerald-400 rounded relative flex justify-between">
            <div className="w-[1px] h-2 bg-emerald-400 -mt-0.5" />
            <div className="w-[1px] h-2 bg-emerald-400 -mt-0.5" />
          </div>
          <span className="font-bold">{Math.round(100 / getZoomFactor())} µm</span>
        </div>

        {/* Spatial Context Locator Overlay */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 z-20">
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>{getSpatialLocationName()}</span>
        </div>

        {/* Active Measurements */}
        <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none">
          {measurements.map((m) => (
            <g key={m.id}>
              <line
                x1={m.x1}
                y1={m.y1}
                x2={m.x2}
                y2={m.y2}
                stroke="#ec4899"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <circle cx={m.x1} cy={m.y1} r={3} fill="#ec4899" />
              <circle cx={m.x2} cy={m.y2} r={3} fill="#ec4899" />
              <text
                x={(m.x1 + m.x2) / 2}
                y={(m.y1 + m.y2) / 2 - 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize={10}
                fontWeight="bold"
                className="font-mono bg-black/80 px-1 rounded"
              >
                {m.label}
              </text>
            </g>
          ))}
          {measureStart && currentMeasureEnd && (
            <g>
              <line
                x1={measureStart.x}
                y1={measureStart.y}
                x2={currentMeasureEnd.x}
                y2={currentMeasureEnd.y}
                stroke="#f43f5e"
                strokeWidth={2}
              />
              <text
                x={(measureStart.x + currentMeasureEnd.x) / 2}
                y={(measureStart.y + currentMeasureEnd.y) / 2 - 8}
                textAnchor="middle"
                fill="#fb7185"
                fontSize={11}
                fontWeight="bold"
                className="font-mono bg-black/80 px-1 rounded"
              >
                {Math.round(
                  Math.hypot(
                    currentMeasureEnd.x - measureStart.x,
                    currentMeasureEnd.y - measureStart.y
                  ) * getMicronsPerPixel()
                )}{' '}
                µm
              </text>
            </g>
          )}
        </svg>

        {/* Reticle Focus Indicator */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <div className="relative flex flex-col items-center">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle
                cx="35"
                cy="35"
                r="24"
                fill="none"
                stroke={isOptimalFocus ? '#34d399' : '#f59e0b'}
                strokeWidth="1.5"
                strokeDasharray={isOptimalFocus ? 'none' : '4 3'}
              />
              <circle cx="35" cy="35" r="2.5" fill={isOptimalFocus ? '#34d399' : '#f59e0b'} />
            </svg>
            <div
              className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-1 border backdrop-blur-md ${
                isOptimalFocus
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
                  : 'bg-amber-950/90 text-amber-300 border-amber-500/50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOptimalFocus ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>CONFIDENCE: {(analysisConfidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
