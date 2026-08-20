import React from 'react';
import { Code2, FileCheck2, TestTube2, ShieldCheck, Cpu, Box, CloudUpload, CheckCircle2 } from 'lucide-react';

export const PipelineBar: React.FC = () => {
  const stages = [
    { name: 'CODE', icon: Code2, status: 'PASSED', color: 'text-blue-400' },
    { name: 'LINT', icon: FileCheck2, status: 'PASSED', color: 'text-teal-400' },
    { name: 'UNIT TEST', icon: TestTube2, status: 'PASSED', color: 'text-emerald-400' },
    { name: 'SECURITY SCAN', icon: ShieldCheck, status: 'PASSED', color: 'text-rose-400' },
    { name: 'BUILD', icon: Cpu, status: 'PASSED', color: 'text-purple-400' },
    { name: 'CONTAINER', icon: Box, status: 'PASSED', color: 'text-amber-400' },
    { name: 'DEPLOY', icon: CloudUpload, status: 'READY', color: 'text-sky-400' }
  ];

  return (
    <div className="bg-slate-900/90 border-t border-slate-800 px-4 py-2 flex items-center justify-between overflow-x-auto text-xs font-sans">
      <div className="flex items-center gap-1 font-bold text-slate-400 text-[11px] uppercase tracking-wider shrink-0 mr-2">
        <span>DevSecOps Pipeline:</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto">
        {stages.map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={st.name} className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                <Icon className={`w-3.5 h-3.5 ${st.color}`} />
                <span className="font-bold text-slate-200">{st.name}</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              </div>
              {i < stages.length - 1 && <span className="text-slate-600 font-bold">&rarr;</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
