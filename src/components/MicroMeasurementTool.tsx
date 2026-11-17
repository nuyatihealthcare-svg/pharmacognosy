import React from 'react';
import { MeasurementLine, ObjectiveLens } from '../types';
import { Ruler, Trash2, Plus, Info } from 'lucide-react';

interface MicroMeasurementToolProps {
  measurements: MeasurementLine[];
  isMeasuringMode: boolean;
  onToggleMeasuringMode: () => void;
  onClearMeasurements: () => void;
  onDeleteMeasurement: (id: string) => void;
  magnification: ObjectiveLens;
}

export const MicroMeasurementTool: React.FC<MicroMeasurementToolProps> = ({
  measurements,
  isMeasuringMode,
  onToggleMeasuringMode,
  onClearMeasurements,
  onDeleteMeasurement,
  magnification
}) => {
  return (
    <div className="bg-[#12151B] border border-slate-800 rounded-lg p-4 shadow-xl text-slate-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-500/10 text-rose-400 rounded">
            <Ruler className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Digital Caliper</h3>
            <p className="text-[10px] text-slate-500 font-mono">CALIBRATED AT {magnification}</p>
          </div>
        </div>

        <button
          onClick={onToggleMeasuringMode}
          className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all border ${
            isMeasuringMode
              ? 'bg-rose-500 text-slate-950 border-rose-400 font-bold shadow-md shadow-rose-950 animate-pulse'
              : 'bg-slate-800/80 border-slate-700 text-rose-300 hover:bg-slate-700'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          {isMeasuringMode ? 'Drag in FOV...' : 'Measure'}
        </button>
      </div>

      {/* Measurement List */}
      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
        {measurements.length === 0 ? (
          <div className="text-center py-4 bg-[#0A0C10] rounded border border-dashed border-slate-800 text-[11px] text-slate-500">
            No measurements drawn. Click "Measure" and drag across features in the eyepiece view.
          </div>
        ) : (
          measurements.map((m, idx) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-[#0A0C10] p-2.5 rounded border border-slate-800 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center text-[10px] font-bold">
                  #{idx + 1}
                </span>
                <div>
                  <span className="font-bold text-rose-300 text-sm">{m.lengthMicrons} µm</span>
                  <span className="text-[10px] text-slate-500 block">
                    ({(m.lengthMicrons / 1000).toFixed(3)} mm)
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDeleteMeasurement(m.id)}
                className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                title="Delete Measurement"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {measurements.length > 0 && (
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 text-[11px] uppercase">
            AVERAGE: <strong className="text-rose-300">
              {Math.round(measurements.reduce((acc, curr) => acc + curr.lengthMicrons, 0) / measurements.length)} µm
            </strong>
          </span>

          <button
            onClick={onClearMeasurements}
            className="text-slate-500 hover:text-rose-300 text-[11px] uppercase tracking-wider font-bold"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
