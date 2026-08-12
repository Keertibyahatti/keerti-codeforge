import React from 'react';
import { Code2, ShieldCheck, Cpu, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-10 px-4 lg:px-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-slate-100 text-base">CodeForge AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Intelligent Web-Based Code Editor with Real-Time Multi-Language Execution and AI-Assisted Error Optimization.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Supported Languages</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-emerald-400" /> Python (3.x)</li>
            <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-400" /> JavaScript / Node.js</li>
            <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-blue-400" /> C (GCC Compiler)</li>
            <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> C++ (G++ Compiler)</li>
            <li className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-rose-400" /> Java (Javac)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Features</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>Monaco VS-Code Editor</li>
            <li>Process Sandboxing & Timeouts</li>
            <li>AI Error Diagnosis & Fixes</li>
            <li>Code Performance Optimization</li>
            <li>Saved Code Versioning</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">Security & Architecture</h4>
          <p className="text-xs text-slate-400 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            Process isolation with 5s execution caps, max output limits, path traversal defenses, and sanitized runtimes.
          </p>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <span>© {new Date().getFullYear()} CodeForge AI. All rights reserved.</span>
        <span>Built for Production & Major Projects</span>
      </div>
    </footer>
  );
};
