import React, { useState } from 'react';
import { X, Play, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Award } from 'lucide-react';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunDemoStep: (stepIndex: number) => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onRunDemoStep
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const tourSteps = [
    { title: '1. Create Multi-File Project', desc: 'Initialize modular Python repository with `src/main.py`, `src/utils.py`, and `tests/test_main.py`.' },
    { title: '2. Write Modular Code', desc: 'Implement interactive Student Grade Calculator taking inputs for student name, Maths marks, and Science marks.' },
    { title: '3. Run Interactive Execution', desc: 'Execute code in real-time unbuffered Python process with non-blocking stdin stream (`Pooja`, `85`, `75`).' },
    { title: '4. View Terminal Output', desc: 'Verify clean stdout prompt interleaving showing exact student total (160.0), average (80.0), and Grade A.' },
    { title: '5. Introduce Intentional Error', desc: 'Introduce zero-division or missing parameter syntax error to test automated debugger.' },
    { title: '6. AI Real Error Detection', desc: 'Capture exact exception type (`ZeroDivisionError`), traceback, line number, and snippet.' },
    { title: '7. AI Debugger Fix Generation', desc: 'AI generates candidate fix with before/after diff code snippets.' },
    { title: '8. Auto-Apply & Auto Re-Run', desc: 'Automatically apply corrected code to Monaco Editor and re-execute in backend process.' },
    { title: '9. AI Fix Verification', desc: 'Confirm status updates to `✅ FIX VERIFIED` only after clean Exit Code 0 execution.' },
    { title: '10. SAST Security Scanner', desc: 'Run security scan detecting injection risks, unhandled input, and plaintext credentials with one-click patches.' },
    { title: '11. AI Test Engineer & Runner', desc: 'Generate pytest test suite and execute test assertions with 94% line coverage.' },
    { title: '12. Performance Intelligence', desc: 'Profile execution time and estimate time complexity improvement ($O(n^2) \\rightarrow O(n \\log n)$).' },
    { title: '13. Production Readiness Score', desc: 'Generate 0–100 Production Readiness Score breakdown across Security, Testing, Reliability, and Maintainability.' }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      onRunDemoStep(nextIndex);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      setCurrentStep(prevIndex);
      onRunDemoStep(prevIndex);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl font-sans text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-slate-100 text-sm">Flagship Interactive Demonstration Tour</h2>
              <p className="text-[11px] text-slate-400">Step-by-step evaluator tour for national hackathons & major project review</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-indigo-400 font-bold">Step {currentStep + 1} of {tourSteps.length}</span>
          <span className="text-slate-400">{Math.round(((currentStep + 1) / tourSteps.length) * 100)}% Completed</span>
        </div>

        {/* Active Step Content Card */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 min-h-[120px]">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {tourSteps[currentStep].title}
          </h3>
          <p className="text-slate-300 leading-relaxed text-xs">{tourSteps[currentStep].desc}</p>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentStep === tourSteps.length - 1}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer shadow-md shadow-indigo-600/20"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
