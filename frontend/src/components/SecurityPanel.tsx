import React from 'react';
import { ShieldAlert, AlertOctagon, AlertTriangle, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export interface SecurityIssue {
  id: string;
  vulnerability: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  file: string;
  line: number;
  explanation: string;
  suggestedFix: string;
  codeSnippet?: string;
  fixedCodeSnippet?: string;
}

interface SecurityPanelProps {
  securityScore: number;
  vulnerabilities: SecurityIssue[];
  isScanning: boolean;
  onRunScan: () => void;
  onApplyFix?: (issue: SecurityIssue) => void;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({
  securityScore,
  vulnerabilities,
  isScanning,
  onRunScan,
  onApplyFix
}) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold uppercase">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-[10px] font-extrabold uppercase">MEDIUM</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-extrabold uppercase">LOW</span>;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span className="font-bold text-slate-200 text-sm">Security Center & SAST Scanner</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-300">
            <span>Score:</span>
            <span className={`px-2 py-0.5 rounded ${securityScore >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
              {securityScore} / 100
            </span>
          </div>
          <button
            onClick={onRunScan}
            disabled={isScanning}
            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {isScanning ? 'Scanning...' : 'Run Security Scan'}
          </button>
        </div>
      </div>

      {vulnerabilities.length === 0 ? (
        <div className="py-8 text-center text-slate-400 space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
          <div className="font-bold text-slate-200">No Security Vulnerabilities Detected</div>
          <p className="text-[11px] text-slate-500">Your code passes SAST security checks for SQL injection, unsafe eval, and plaintext credentials.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {vulnerabilities.map((issue) => (
            <div key={issue.id} className="bg-slate-950/80 border border-rose-500/30 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  {issue.vulnerability}
                </span>
                {getSeverityBadge(issue.severity)}
              </div>
              <p className="text-[11px] text-slate-300">{issue.explanation}</p>
              <div className="text-[10px] text-slate-400 font-mono">
                Location: <span className="text-amber-300 font-bold">{issue.file}:{issue.line}</span>
              </div>
              {issue.suggestedFix && (
                <div className="p-2 bg-slate-900 rounded text-[11px] border border-slate-800 text-slate-300 space-y-1">
                  <div className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Fix Recommendation:
                  </div>
                  <div>{issue.suggestedFix}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
