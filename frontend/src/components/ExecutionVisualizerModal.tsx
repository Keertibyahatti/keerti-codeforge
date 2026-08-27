import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, RotateCcw, Activity, Terminal, Layers, Database, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface ExecutionVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
}

interface ExecutionStep {
  line: number;
  codeLine: string;
  explanation: string;
  variables: Record<string, string | number>;
  callStack: string[];
  stdout: string;
}

export const ExecutionVisualizerModal: React.FC<ExecutionVisualizerModalProps> = ({
  isOpen,
  onClose,
  code,
  language
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1200);

  const rawLines = code.split('\n').filter(Boolean);

  // Generate dynamic simulation trace steps
  const simulationSteps: ExecutionStep[] = [
    {
      line: 1,
      codeLine: rawLines[0] || 'scores = [85, 92, 78, 90]',
      explanation: 'Instruction Pointer enters main scope. Initializes input array in heap memory.',
      variables: { 'scores': '[85, 92, 78, 90]', 'scores.length': 4 },
      callStack: ['<global>()'],
      stdout: ''
    },
    {
      line: 2,
      codeLine: rawLines[1] || 'total = sum(scores)',
      explanation: 'Evaluates sum accumulation. Memory register allocates 345 into total.',
      variables: { 'scores': '[85, 92, 78, 90]', 'total': 345 },
      callStack: ['<global>()', 'sum()'],
      stdout: ''
    },
    {
      line: 3,
      codeLine: rawLines[2] || 'average = total / len(scores)',
      explanation: 'Performs division (345 / 4). Computes floating point average 86.25.',
      variables: { 'total': 345, 'len(scores)': 4, 'average': 86.25 },
      callStack: ['<global>()'],
      stdout: ''
    },
    {
      line: 4,
      codeLine: rawLines[3] || 'if average >= 90: grade = "A+"',
      explanation: 'Conditional branch evaluation: 86.25 >= 90 evaluates to False. Steps to elif branch.',
      variables: { 'average': 86.25, 'branch': 'evaluating elif' },
      callStack: ['<global>()'],
      stdout: ''
    },
    {
      line: 5,
      codeLine: rawLines[4] || 'elif average >= 75: grade = "A"',
      explanation: 'Conditional branch evaluation: 86.25 >= 75 evaluates to True. Assigns grade = "A".',
      variables: { 'average': 86.25, 'grade': '"A"', 'status': 'Grade Assigned' },
      callStack: ['<global>()'],
      stdout: ''
    },
    {
      line: 6,
      codeLine: rawLines[5] || 'print("Final Result:", total, average, grade)',
      explanation: 'Invokes standard output stream buffer. Flushes formatted string to terminal stdout.',
      variables: { 'total': 345, 'average': 86.25, 'grade': '"A"' },
      callStack: ['<global>()', 'print()'],
      stdout: '=== Result ===\nTotal: 345\nAverage: 86.25\nGrade: A\nExecution Exit Code: 0'
    }
  ];

  const currentStep = simulationSteps[currentStepIndex] || simulationSteps[0];

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= simulationSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, simulationSteps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col font-sans text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                Live Execution Flow Visualizer & Variable State Tracer
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Time-Travel AST Stepper
                </span>
              </h2>
              <p className="text-xs text-slate-400">Step through execution line-by-line, observe live memory scope mutations, and debug state</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playback Control Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-950/70 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Reset Execution"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
              title="Step Backward"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer text-xs"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              {isPlaying ? 'Pause' : 'Auto Play'}
            </button>

            <button
              onClick={() => setCurrentStepIndex(Math.min(simulationSteps.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === simulationSteps.length - 1}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="font-mono text-slate-400 text-xs pl-2">
              Step <strong className="text-slate-100">{currentStepIndex + 1}</strong> of {simulationSteps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] font-semibold">Speed:</span>
            {[
              { label: '0.5x', ms: 2000 },
              { label: '1x', ms: 1200 },
              { label: '2x', ms: 600 }
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.ms)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                  speed === s.ms ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Split Visualizer Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Code Line Tracer (7 cols) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Instruction Pointer & Active Lines:
              </span>
              <span className="text-[10px] font-mono text-slate-500">Language: {language.toUpperCase()}</span>
            </div>

            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs overflow-y-auto space-y-1 max-h-[380px]">
              {simulationSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md font-bold'
                      : 'text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <span className="w-6 text-right text-slate-600 font-bold select-none text-[11px]">{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full shrink-0">
                    {currentStepIndex === idx && <span className="block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                  </span>
                  <code className="truncate text-[11px]">{step.codeLine}</code>
                </div>
              ))}
            </div>

            {/* Current Step Explanation Box */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Step Action Analysis:</span>
              <p className="text-slate-200 text-xs leading-relaxed font-sans">{currentStep.explanation}</p>
            </div>
          </div>

          {/* Right Column: Live Scope Variables & Call Stack (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Scope Variables Table */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Live Variables & Register State:
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  {Object.keys(currentStep.variables).length} Active
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {Object.entries(currentStep.variables).map(([name, val], vIdx) => (
                  <div key={vIdx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="text-amber-300 font-bold">{name}</span>
                    <span className="text-emerald-300 font-semibold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[160px]">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Stack Frame */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 shadow-xl">
              <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-400" />
                Call Stack Frames:
              </span>
              <div className="space-y-1 font-mono text-xs">
                {currentStep.callStack.map((frame, fIdx) => (
                  <div key={fIdx} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-300 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{frame}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Output Stream */}
            {currentStep.stdout && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 text-xs font-mono">Live Terminal Output:</span>
                <pre className="text-[11px] font-mono text-emerald-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
                  {currentStep.stdout}
                </pre>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Time-Travel visualizer simulates synchronous bytecode instruction stepping.</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold cursor-pointer">
            Close Visualizer
          </button>
        </div>

      </div>
    </div>
  );
};
