import React from 'react';
import { CheckCircle2, ArrowRight, X, ShieldCheck } from 'lucide-react';

export interface AutoFixDiffModalProps {
  errorType: string;
  explanation: string;
  whatHappened: string;
  whyItHappened: string;
  howFixed: string;
  beforeCode: string;
  afterCode: string;
  stdout?: string;
  onApply: () => void;
  onClose: () => void;
}

export const AutoFixDiffModal: React.FC<AutoFixDiffModalProps> = ({
  errorType,
  whatHappened,
  whyItHappened,
  howFixed,
  beforeCode,
  afterCode,
  stdout,
  onApply,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col p-5 shadow-2xl space-y-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Error Fixed & Validated</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> py_compile Passed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{errorType}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Content Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 custom-scrollbar">
          
          {/* Diagnosis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">What Happened</span>
              <p className="text-slate-300 leading-relaxed">{whatHappened || 'Detected syntax mismatch on line.'}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">Why It Happened</span>
              <p className="text-slate-300 leading-relaxed">{whyItHappened || 'Incomplete statement or missing syntax token.'}</p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">How It Was Fixed</span>
              <p className="text-slate-300 leading-relaxed">{howFixed || 'Updated statement structure and verified compiler.'}</p>
            </div>
          </div>

          {/* Before vs After Snippet Diff */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span>Proposed Change Diff</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              
              {/* Before Box */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase">Original Code</span>
                <pre className="text-rose-200 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed max-h-44 overflow-y-auto custom-scrollbar">
                  {beforeCode || 'Original Code'}
                </pre>
              </div>

              {/* After Box */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Fixed Code</span>
                <pre className="text-emerald-200 whitespace-pre-wrap overflow-x-auto text-[11px] leading-relaxed max-h-44 overflow-y-auto custom-scrollbar">
                  {afterCode || 'Fixed Code'}
                </pre>
              </div>

            </div>
          </div>

          {/* Output Stream Preview */}
          {stdout && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Test Execution Output</span>
              <pre className="font-mono text-xs text-slate-200 max-h-28 overflow-y-auto custom-scrollbar">{stdout}</pre>
            </div>
          )}

        </div>

        {/* Sticky Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 shrink-0 bg-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Keep Original Code
          </button>
          <button
            onClick={onApply}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span>Apply Fix & Re-Run</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
