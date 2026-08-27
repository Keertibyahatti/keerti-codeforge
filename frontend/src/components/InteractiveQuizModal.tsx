import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ArrowRight, RotateCcw, Zap } from 'lucide-react';

interface InteractiveQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const InteractiveQuizModal: React.FC<InteractiveQuizModalProps> = ({
  isOpen,
  onClose,
  code,
  language
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const isLoop = code.includes('for') || code.includes('while');

  const questions: Question[] = [
    {
      id: 1,
      question: `What is the worst-case Time Complexity of the current ${language} algorithm?`,
      options: [
        isLoop ? 'O(N) - Linear Single Pass traversal' : 'O(1) - Constant Time direct calculation',
        'O(N²) - Quadratic Nested Loop',
        'O(2^N) - Exponential Growth',
        'O(N log N) - Divide and Conquer'
      ],
      correctIndex: 0,
      explanation: isLoop
        ? 'The algorithm traverses the input sequence once linearly, resulting in O(N) time complexity.'
        : 'The algorithm executes fixed arithmetic operations directly without loops, resulting in O(1) constant time.'
    },
    {
      id: 2,
      question: 'Which edge case is most critical to validate in this algorithm before production deployment?',
      options: [
        'Division by zero when the input collection is empty (length == 0)',
        'Unicode emoji rendering in variable names',
        'Operating system process thread affinity',
        'Compiler header duplication'
      ],
      correctIndex: 0,
      explanation: 'When inputs are empty or zero, computing averages or divisions raises ZeroDivisionError or NaN without guard checks.'
    },
    {
      id: 3,
      question: 'What is the Space Complexity (Auxiliary Memory) allocated on the heap/stack?',
      options: [
        'O(1) - Constant auxiliary memory with in-place scalar variables',
        'O(N!) - Factorial memory allocation',
        'O(N³) - Cubic matrix memory',
        'O(log N) - Recursive call frame tree'
      ],
      correctIndex: 0,
      explanation: 'Only a fixed number of scalar variables (total, average, grade) are stored, requiring minimal constant O(1) space.'
    }
  ];

  const handleSelect = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = (): number => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const score = calculateScore();

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col font-sans text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                AI Technical Interview Quiz & Assessment
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  DSA Placement Mock
                </span>
              </h2>
              <p className="text-xs text-slate-400">Test your mastery of complexity, edge cases, and memory models for this code</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Questions Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCorrect = selectedAnswers[q.id] === q.correctIndex;

            return (
              <div key={q.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-100 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-[10px] font-bold font-mono border border-indigo-500/30">
                      Q{idx + 1}
                    </span>
                    {q.question}
                  </h4>

                  {isSubmitted && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[q.id] === oIdx;
                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isSubmitted) {
                      if (oIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-bold shadow-sm';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelect(q.id, oIdx)}
                        disabled={isSubmitted}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !isSubmitted && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                      </button>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
                    <strong className="text-amber-300 font-semibold">Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {/* Score Card on Submission */}
          {isSubmitted && (
            <div className="p-5 bg-gradient-to-r from-indigo-950 to-purple-950 border border-indigo-500/40 rounded-2xl flex items-center justify-between shadow-xl animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-black text-xl flex items-center justify-center font-mono">
                  {score}/{questions.length}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-100 text-sm">
                    {score === 3 ? '🎉 Perfect Score! Placement Ready!' : (score >= 2 ? '👍 Good Knowledge! Minor Review Needed.' : '📚 Revision Recommended.')}
                  </h3>
                  <p className="text-[11px] text-slate-400">Technical DSA concept evaluation recorded.</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400 text-xs">
            Answered <strong className="text-slate-200">{Object.keys(selectedAnswers).length}</strong> of {questions.length} questions.
          </span>

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <button
                onClick={() => setIsSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-40 text-white font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-amber-600/20 text-xs flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl cursor-pointer text-xs"
              >
                Finish & Close
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
