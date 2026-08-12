import React, { useState } from 'react';
import { Sparkles, Check, Copy, AlertCircle, Cpu, ArrowRight, X, Play } from 'lucide-react';
import { AIAnalysisResponse } from '../types';

interface AIPanelProps {
  analysis: AIAnalysisResponse | null;
  onApplyFix: (code: string) => void;
  onApplyFixAndRun?: (code: string) => void;
  onClose: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({ analysis, onApplyFix, onApplyFixAndRun, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!analysis) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.correctedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/95 border border-indigo-500/30 rounded-xl p-5 shadow-2xl space-y-4 backdrop-blur-lg transition-all animate-in fade-in slide-in-from-bottom-4">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              CodeForge AI Intelligent Assistant
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                {analysis.errorType}
              </span>
            </h3>
            <p className="text-xs text-slate-400">{analysis.summary}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Explanation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Explanation & Cause */}
        <div className="space-y-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Beginner Explanation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{analysis.explanation}</p>
          </div>

          {analysis.possibleCause && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Root Cause:
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{analysis.possibleCause}</p>
            </div>
          )}
        </div>

        {/* Suggested Fix Guide */}
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            Recommended Fix
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">{analysis.suggestedFix}</p>

          {analysis.optimizationSuggestions && analysis.optimizationSuggestions.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <h5 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Optimizations:
              </h5>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                {analysis.optimizationSuggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* Corrected Code Block & Actions */}
      {analysis.correctedCode && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-300">Suggested Corrected Code:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={() => onApplyFix(analysis.correctedCode)}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Apply Fix
              </button>

              {onApplyFixAndRun && (
                <button
                  onClick={() => onApplyFixAndRun(analysis.correctedCode)}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  ⚡ Fix & Run Code Now
                </button>
              )}
            </div>
          </div>

          <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-48">
            <code>{analysis.correctedCode}</code>
          </pre>
        </div>
      )}

    </div>
  );
};
