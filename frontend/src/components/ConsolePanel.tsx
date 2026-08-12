import React, { useState } from 'react';
import { Terminal, AlertTriangle, CheckCircle2, Clock, Trash2, Keyboard, Ban, Zap } from 'lucide-react';

interface ConsolePanelProps {
  stdout: string;
  stderr: string;
  status?: string;
  executionTime?: number;
  exitCode?: number | null;
  input: string;
  onInputChange: (val: string) => void;
  onClear: () => void;
  onFixAndReRun?: () => void;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({
  stdout,
  stderr,
  status,
  executionTime,
  exitCode,
  input,
  onInputChange,
  onClear,
  onFixAndReRun
}) => {
  const [activeTab, setActiveTab] = useState<'output' | 'input' | 'errors'>('output');

  const isErrorState = status === 'error' || status === 'syntax_error' || status === 'compilation_error' || status === 'runtime_error';

  const getStatusBadge = () => {
    if (!status) return null;
    switch (status) {
      case 'success':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Success (Exit code {exitCode ?? 0})
          </span>
        );
      case 'syntax_error':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            Syntax Error (Exit {exitCode ?? 1})
          </span>
        );
      case 'runtime_error':
      case 'error':
      case 'compilation_error':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            {status === 'compilation_error' ? 'Compilation Error' : 'Runtime Error'} (Exit {exitCode ?? 1})
          </span>
        );
      case 'timeout':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            Execution Timeout (5s Cap Exceeded)
          </span>
        );
      case 'output_limit':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <Ban className="w-3.5 h-3.5" />
            Output Limit Exceeded (1024 KB)
          </span>
        );
      case 'stopped':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-500/20 border border-slate-500/30 text-slate-300 text-xs font-semibold">
            <Ban className="w-3.5 h-3.5" />
            Process Terminated
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      
      {/* Console Tab Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-950/90 border-b border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'output'
                ? 'bg-slate-800 text-blue-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Output Console
            {stdout && <span className="w-2 h-2 rounded-full bg-blue-500" />}
          </button>

          <button
            onClick={() => setActiveTab('input')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'input'
                ? 'bg-slate-800 text-blue-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            Program Input (stdin)
            {input.trim() && <span className="w-2 h-2 rounded-full bg-amber-500" />}
          </button>

          <button
            onClick={() => setActiveTab('errors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'errors'
                ? 'bg-slate-800 text-rose-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Error Logs
            {stderr && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
          </button>
        </div>

        {/* Right Info Badges & Actions */}
        <div className="flex items-center gap-3">
          {getStatusBadge()}
          {executionTime !== undefined && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Clock className="w-3 h-3 text-slate-500" />
              {executionTime} ms
            </span>
          )}
          <button
            onClick={onClear}
            className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            title="Clear Console Output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Auto-Fix Error Banner in Console */}
      {isErrorState && onFixAndReRun && (
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 border-b border-rose-500/30 px-4 py-2 flex items-center justify-between gap-2 text-xs">
          <span className="text-rose-300 font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            Error detected in program execution.
          </span>
          <button
            onClick={onFixAndReRun}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md shadow-md transition-all border border-emerald-400/30 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
            ⚡ Auto-Fix & Re-Run Program
          </button>
        </div>
      )}

      {/* Tab Contents */}
      <div className="flex-1 p-4 font-mono text-xs overflow-auto bg-slate-950/60 min-h-[160px]">
        {activeTab === 'output' && (
          <div>
            {stdout ? (
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed select-text">{stdout}</pre>
            ) : (
              <div className="text-slate-600 italic py-6 text-center">
                Click "Run Code" to view program output stream.
              </div>
            )}
          </div>
        )}

        {activeTab === 'input' && (
          <div className="space-y-2">
            <p className="text-[11px] font-sans text-slate-400">
              Provide input data (stdin) passed to your program during execution:
            </p>
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="e.g. 10 20\nJohn Doe"
              className="w-full h-28 bg-slate-900 border border-slate-800 focus:border-blue-500 text-slate-200 p-2.5 rounded-lg focus:outline-none font-mono text-xs"
            />
          </div>
        )}

        {activeTab === 'errors' && (
          <div>
            {stderr ? (
              <pre className="text-rose-400 whitespace-pre-wrap leading-relaxed select-text">{stderr}</pre>
            ) : (
              <div className="text-slate-600 italic py-6 text-center">
                No error messages logged.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
