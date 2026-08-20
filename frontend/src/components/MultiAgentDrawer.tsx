import React from 'react';
import { Bot, Cpu, ShieldCheck, Zap, Code2, TestTube2, FileCheck2, FileText, CheckCircle2 } from 'lucide-react';

interface MultiAgentDrawerProps {
  onRunAgentTask: (agentName: string) => void;
  activeAgent?: string | null;
}

export const MultiAgentDrawer: React.FC<MultiAgentDrawerProps> = ({ onRunAgentTask, activeAgent }) => {
  const agents = [
    { name: 'Planner Agent', role: 'Architecture & Task Breakdown', icon: Cpu, color: 'text-indigo-400', desc: 'Breaks complex user requirements into actionable technical plans.' },
    { name: 'Coding Agent', role: 'Feature Implementation', icon: Code2, color: 'text-blue-400', desc: 'Writes modular, multi-file code for new features and refactoring.' },
    { name: 'Debugging Agent', role: 'Root Cause & Auto-Fix', icon: Zap, color: 'text-amber-400', desc: 'Inspects error stack traces and executes verified auto-re-runs.' },
    { name: 'Testing Agent', role: 'Automated Test Engineer', icon: TestTube2, color: 'text-emerald-400', desc: 'Generates unit & integration tests and calculates line coverage.' },
    { name: 'Security Agent', role: 'SAST Vulnerability Scanner', icon: ShieldCheck, color: 'text-rose-400', desc: 'Scans for code vulnerabilities, hardcoded secrets, and injection risks.' },
    { name: 'Performance Agent', role: 'Profiling & Complexity', icon: Cpu, color: 'text-purple-400', desc: 'Estimates time complexity O(n log n) and optimizes memory footprints.' },
    { name: 'Reviewer Agent', role: 'Code Quality Auditor', icon: FileCheck2, color: 'text-teal-400', desc: 'Reviews SOLID design principles, maintainability, and code smells.' },
    { name: 'Documentation Agent', role: 'API & README Generator', icon: FileText, color: 'text-sky-400', desc: 'Automatically maintains project READMEs and technical API docs.' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="flex items-center gap-2 font-bold text-slate-200 text-sm">
          <Bot className="w-4 h-4 text-indigo-400" />
          AI Multi-Agent Orchestrator
        </span>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          8 Active Agents
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((ag) => {
          const Icon = ag.icon;
          const isRunning = activeAgent === ag.name;
          return (
            <div
              key={ag.name}
              className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${ag.color} shrink-0`} />
                  <div>
                    <div className="font-bold text-slate-200">{ag.name}</div>
                    <div className="text-[10px] text-slate-400">{ag.role}</div>
                  </div>
                </div>
                {isRunning && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ag.desc}</p>
              <button
                onClick={() => onRunAgentTask(ag.name)}
                className="mt-1 w-full py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3 h-3 text-amber-400 fill-current" />
                Run {ag.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
