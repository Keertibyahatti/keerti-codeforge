import React from 'react';
import { Code2, AlertTriangle, Sparkles, Wand2, CheckCircle2, Play, Check, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface DebugPipelineVisualizerProps {
  workflowState: 'idle' | 'running' | 'error_detected' | 'fixing' | 'fix_applied' | 'rerunning' | 'fixed_successfully' | 'fix_failed';
  exitCode?: number | null;
  currentAttempt?: number;
  maxAttempts?: number;
}

export const DebugPipelineVisualizer: React.FC<DebugPipelineVisualizerProps> = ({
  workflowState,
  exitCode,
  currentAttempt = 1,
  maxAttempts = 5
}) => {
  const steps = [
    { id: 'submitted', label: 'Code Submitted', icon: Code2, activeState: ['running', 'error_detected', 'fixing', 'fix_applied', 'rerunning', 'fixed_successfully', 'fix_failed'] },
    { id: 'error', label: 'Error Detected', icon: AlertTriangle, activeState: ['error_detected', 'fixing', 'fix_applied', 'rerunning', 'fixed_successfully', 'fix_failed'] },
    { id: 'analysis', label: 'AI Analysis', icon: Sparkles, activeState: ['fixing', 'fix_applied', 'rerunning', 'fixed_successfully', 'fix_failed'] },
    { id: 'fix', label: 'Fix Generated', icon: Wand2, activeState: ['fix_applied', 'rerunning', 'fixed_successfully', 'fix_failed'] },
    { id: 'verify', label: 'Code Verify', icon: CheckCircle2, activeState: ['rerunning', 'fixed_successfully', 'fix_failed'] },
    { id: 'reexecute', label: 'Re-Execute', icon: Play, activeState: ['fixed_successfully', 'fix_failed'] },
    { id: 'success', label: workflowState === 'fix_failed' ? '❌ FAILED' : '✓ SUCCESS', icon: workflowState === 'fix_failed' ? XCircle : Check, activeState: ['fixed_successfully', 'fix_failed'] }
  ];

  return (
    <div className="bg-slate-950/90 border-b border-indigo-500/20 px-4 py-2 flex items-center justify-between overflow-x-auto text-xs font-sans">
      <div className="flex items-center gap-2 font-bold text-slate-400 text-[11px] uppercase tracking-wider shrink-0 mr-3">
        <span>Debug Pipeline</span>
        {workflowState !== 'idle' && (
          <span className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full text-[10px] font-mono">
            <RotateCcw className="w-3 h-3 animate-spin" />
            Attempt {currentAttempt}/{maxAttempts}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        {steps.map((st, i) => {
          const Icon = st.icon;
          const isActive = st.activeState.includes(workflowState);
          const isCurrent = (
            (st.id === 'error' && workflowState === 'error_detected') ||
            (st.id === 'analysis' && workflowState === 'fixing') ||
            (st.id === 'fix' && workflowState === 'fix_applied') ||
            (st.id === 'verify' && workflowState === 'rerunning') ||
            (st.id === 'success' && (workflowState === 'fixed_successfully' || workflowState === 'fix_failed'))
          );

          return (
            <div key={st.id} className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                isCurrent
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md animate-pulse font-bold'
                  : isActive
                  ? 'bg-slate-900 border-emerald-500/40 text-emerald-400 font-semibold'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? (st.id === 'success' && workflowState === 'fix_failed' ? 'text-rose-400' : 'text-emerald-400') : 'text-slate-600'}`} />
                <span>{st.label}</span>
              </div>
              {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
