import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2, AlertTriangle, Cpu, FileText, Activity } from 'lucide-react';

interface ReadinessBreakdown {
  score: number;
  status: string;
  details: string;
}

interface ProductionReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  overallScore: number;
  breakdown: Record<string, ReadinessBreakdown>;
}

export const ProductionReadinessModal: React.FC<ProductionReadinessModalProps> = ({
  isOpen,
  onClose,
  overallScore,
  breakdown
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-slate-100 text-base">Production Readiness Index (0–100)</h2>
              <p className="text-[11px] text-slate-400">National-Level Software Quality & Security Benchmark</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score Badge */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-950 to-emerald-950 border border-indigo-500/30 p-5 rounded-xl flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold text-indigo-300 tracking-wider">Overall Project Readiness</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">{overallScore} / 100</div>
            <div className="text-[11px] text-slate-300">Passed national demonstration benchmarks for major project evaluation.</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 font-bold text-lg font-mono">
            {overallScore}%
          </div>
        </div>

        {/* Category Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-auto pr-1">
          {Object.entries(breakdown).map(([category, item]) => (
            <div key={category} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold capitalize text-slate-200 text-xs">{category}</span>
                <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  item.score >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {item.score} / 100
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all text-xs cursor-pointer shadow-md shadow-indigo-600/20"
          >
            Close Benchmark Report
          </button>
        </div>
      </div>
    </div>
  );
};
