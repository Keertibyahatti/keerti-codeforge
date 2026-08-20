import React, { useState } from 'react';
import { X, Award, Play, CheckCircle2, HelpCircle, Clock, Zap } from 'lucide-react';

interface ProblemItem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  timeLimitMinutes: number;
  description: string;
}

interface InterviewArenaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProblem: (code: string, stdinInput: string) => void;
}

export const InterviewArenaPanel: React.FC<InterviewArenaPanelProps> = ({
  isOpen,
  onClose,
  onLoadProblem
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [isHintMode, setIsHintMode] = useState<boolean>(true);

  if (!isOpen) return null;

  const sampleProblem: ProblemItem = {
    id: 'p_1',
    title: 'Student Grade Calculator & Ranker',
    difficulty: selectedDifficulty,
    category: 'Arrays & Logic',
    timeLimitMinutes: 15,
    description: 'Write a program that takes a student name, Maths marks, and Science marks via interactive input. Calculate Total, Average, and Grade (A+ for >=90, A for >=75, B for >=60, F otherwise).'
  };

  const handleLoad = () => {
    const starterCode = `print("=== Student Grade Calculator ===")

name = input("Enter student name: ")
marks1 = float(input("Enter Maths marks: "))
marks2 = float(input("Enter Science marks: "))

total = marks1 + marks2
average = total / 2

print("\\n=== RESULT ===")
print("Student:", name)
print("Maths:", marks1)
print("Science:", marks2)
print("Total:", total)
print("Average:", average)

if average >= 90:
    grade = "A+"
elif average >= 75:
    grade = "A"
elif average >= 60:
    grade = "B"
elif average >= 50:
    grade = "C"
else:
    grade = "F"

print("Grade:", grade)
print("\\nProgram completed successfully!")
`;
    onLoadProblem(starterCode, 'Pooja\n85\n75');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl font-sans text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-slate-100 text-sm">AI Interview Arena & DSA Challenge</h2>
              <p className="text-[11px] text-slate-400">Campus Placements & Technical Coding Interview Demonstrations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Difficulty Selection */}
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-slate-300">Select Difficulty Mode:</span>
          <div className="flex items-center gap-2">
            {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded font-bold transition-all text-xs cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Educational Hint vs Full Solution Toggle */}
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-slate-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            Learning Assistance Mode:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHintMode(true)}
              className={`px-3 py-1 rounded font-bold text-xs transition-all cursor-pointer ${
                isHintMode ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              💡 Socratic Hint Mode
            </button>
            <button
              onClick={() => setIsHintMode(false)}
              className={`px-3 py-1 rounded font-bold text-xs transition-all cursor-pointer ${
                !isHintMode ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
              }`}
            >
              ⚡ Full Solution Mode
            </button>
          </div>
        </div>

        {/* Active Problem Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-100 text-sm">{sampleProblem.title}</span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
              <Clock className="w-3.5 h-3.5" /> {sampleProblem.timeLimitMinutes} mins
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">{sampleProblem.description}</p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-2">
          <button
            onClick={handleLoad}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Load & Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
};
