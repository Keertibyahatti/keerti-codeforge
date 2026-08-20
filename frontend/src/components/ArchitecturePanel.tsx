import React from 'react';
import { Layers, Network, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const ArchitecturePanel: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-slate-200 text-sm">Architecture & Dependency Graph</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300">
          <span>Health Score:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            92 / 100
          </span>
        </div>
      </div>

      {/* Module Relationship Graph Card */}
      <div className="space-y-2">
        <div className="font-bold text-slate-300 text-[11px]">Module Relationships & Import Flow:</div>
        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-blue-400 font-bold">src/main.py</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="text-emerald-400 font-bold">src/utils.py</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-purple-400 font-bold">tests/test_main.py</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="text-emerald-400 font-bold">src/utils.py</span>
          </div>
        </div>
      </div>

      {/* Architecture Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Circular Dependencies</div>
          <div className="font-mono text-emerald-400 font-bold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> None Detected
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Coupling Metric</div>
          <div className="font-mono text-indigo-400 font-bold text-xs">Loose Coupling (0.18)</div>
        </div>
      </div>
    </div>
  );
};
