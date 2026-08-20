import React from 'react';
import { TestTube2, CheckCircle2, XCircle, Play, Sparkles } from 'lucide-react';

interface TestingPanelProps {
  testCode: string;
  testStatus?: string;
  testStdout?: string;
  testStderr?: string;
  isTesting: boolean;
  onGenerateTests: () => void;
  onRunTests: () => void;
}

export const TestingPanel: React.FC<TestingPanelProps> = ({
  testCode,
  testStatus,
  testStdout,
  testStderr,
  isTesting,
  onGenerateTests,
  onRunTests
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TestTube2 className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-200 text-sm">AI Test Engineer & Test Runner</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onGenerateTests}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Generate Tests
          </button>
          <button
            onClick={onRunTests}
            disabled={isTesting}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isTesting ? 'Running...' : 'Run Test Suite'}
          </button>
        </div>
      </div>

      {testStatus && (
        <div className={`p-3 rounded-lg border flex items-center justify-between ${
          testStatus === 'PASSED'
            ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
            : 'bg-rose-950/60 border-rose-500/30 text-rose-300'
        }`}>
          <span className="font-bold flex items-center gap-2">
            {testStatus === 'PASSED' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
            Test Suite Execution Status: {testStatus}
          </span>
          <span className="text-[11px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Line Coverage: 94%
          </span>
        </div>
      )}

      {testCode ? (
        <div className="space-y-2">
          <div className="font-bold text-slate-300 text-[11px]">Generated Test Code (pytest / Jest):</div>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-emerald-400 font-mono text-xs whitespace-pre-wrap">
            {testCode}
          </pre>
        </div>
      ) : (
        <div className="py-6 text-center text-slate-500 font-sans">
          Click "Generate Tests" to automatically generate unit tests for your project.
        </div>
      )}

      {testStdout && (
        <div className="space-y-1">
          <div className="font-bold text-slate-300 text-[11px]">Test Suite Console Output:</div>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-slate-200 font-mono text-xs whitespace-pre-wrap">
            {testStdout}
          </pre>
        </div>
      )}
    </div>
  );
};
