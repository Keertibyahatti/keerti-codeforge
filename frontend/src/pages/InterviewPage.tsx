import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Award, Clock, Play, CheckCircle2, AlertTriangle, HelpCircle, RefreshCw, Zap, Code2, ChevronRight, ShieldCheck, Cpu, Terminal, BookOpen, Star } from 'lucide-react';
import Editor from '@monaco-editor/react';
import api from '../services/api';

interface ProblemItem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  timeLimitMinutes: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  hints: string[];
  starterCodes: Record<string, string>;
  defaultInput: string;
}

interface EvaluationResult {
  success: boolean;
  score: number;
  problemTitle: string;
  difficulty: string;
  passedHiddenTestCases: number;
  totalHiddenTestCases: number;
  feedback: {
    correctness: string;
    timeComplexity: string;
    spaceComplexity: string;
    codeQuality: string;
  };
  stdout?: string;
  stderr?: string;
}

export const InterviewPage: React.FC = () => {
  const [problems, setProblems] = useState<ProblemItem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>('python');
  const [code, setCode] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeRemaining]);

  const loadProblems = async () => {
    try {
      const res = await api.get('/interview/problems');
      const data: ProblemItem[] = res.data || [];
      setProblems(data);
      if (data.length > 0) {
        selectProblemItem(data[0]);
      }
    } catch (err) {
      console.error('Failed to load interview problems:', err);
    }
  };

  const selectProblemItem = (prob: ProblemItem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCodes[selectedLang] || prob.starterCodes['python'] || '');
    setUserInput(prob.defaultInput || '');
    setTimeRemaining(prob.timeLimitMinutes * 60);
    setTimerRunning(true);
    setEvaluation(null);
    setActiveHintIndex(-1);
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    if (selectedProblem) {
      const starter = selectedProblem.starterCodes[lang] || selectedProblem.starterCodes['python'] || '';
      setCode(starter);
    }
  };

  const handleResetCode = () => {
    if (!selectedProblem) return;
    const starter = selectedProblem.starterCodes[selectedLang] || selectedProblem.starterCodes['python'] || '';
    setCode(starter);
    setUserInput(selectedProblem.defaultInput || '');
    setEvaluation(null);
    setNotificationMessage('Starter code reset successfully!');
    setTimeout(() => setNotificationMessage(null), 2500);
  };

  const handleSubmitSolution = async () => {
    if (!selectedProblem || isSubmitting) return;

    // Check if user has actually written code (not just unedited starter code / pass / TODO)
    const starter = selectedProblem.starterCodes[selectedLang] || selectedProblem.starterCodes['python'] || '';
    const cleanCode = code.replace(/#.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').trim();
    
    if (
      code.trim() === starter.trim() ||
      cleanCode.length === 0 ||
      cleanCode === 'pass' ||
      (code.includes('TODO') && !code.includes('return ') && !code.includes('print(') && !code.includes('='))
    ) {
      setEvaluation(null);
      setNotificationMessage('⚠️ Please write your solution code before submitting to the AI Interviewer!');
      setTimeout(() => setNotificationMessage(null), 3500);
      return;
    }

    setIsSubmitting(true);
    setEvaluation(null);

    try {
      const res = await api.post('/interview/submit', {
        problemId: selectedProblem.id,
        language: selectedLang,
        code,
        userInput
      });
      setEvaluation(res.data);
    } catch (err: any) {
      console.error('Error submitting interview solution:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTimer = () => {
    if (timeRemaining === 0) {
      const defaultMins = selectedProblem?.timeLimitMinutes || 15;
      setTimeRemaining(defaultMins * 60);
      setTimerRunning(true);
      setNotificationMessage(`Timer restarted (${defaultMins} mins)!`);
      setTimeout(() => setNotificationMessage(null), 2500);
    } else {
      setTimerRunning(!timerRunning);
    }
  };

  const handleResetTimer = () => {
    const defaultMins = selectedProblem?.timeLimitMinutes || 15;
    setTimeRemaining(defaultMins * 60);
    setTimerRunning(true);
    setNotificationMessage(`Timer reset to ${defaultMins} mins!`);
    setTimeout(() => setNotificationMessage(null), 2500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMonacoLang = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'c': return 'c';
      case 'cpp': case 'c++': return 'cpp';
      case 'java': return 'java';
      case 'javascript': case 'js': return 'javascript';
      case 'python': default: return 'python';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-6 space-y-6">
        
        {/* Top Challenge Navigation Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
                AI Technical Interview Arena & LeetCode Practice
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Live Coding Round
                </span>
              </h1>
              <p className="text-xs text-slate-400">Campus Placements, Technical DSA Challenges & Real-time AI Evaluation</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono">
              <Clock className={`w-4 h-4 ${timeRemaining < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
              <span className={`text-sm font-extrabold ${timeRemaining < 300 ? 'text-rose-400' : 'text-slate-200'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            <button
              onClick={handleToggleTimer}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer shadow-sm"
            >
              {timeRemaining === 0 ? 'Restart Timer' : (timerRunning ? 'Pause' : 'Resume')}
            </button>

            <button
              onClick={handleResetTimer}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-800 transition-all cursor-pointer"
              title="Reset Timer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Problem Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Select Challenge:</span>
          {problems.map((prob) => (
            <button
              key={prob.id}
              onClick={() => selectProblemItem(prob)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedProblem?.id === prob.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                prob.difficulty === 'Easy' ? 'bg-emerald-400' : (prob.difficulty === 'Medium' ? 'bg-amber-400' : 'bg-rose-400')
              }`} />
              <span>{prob.title}</span>
            </button>
          ))}
        </div>

        {/* Main Split Grid Workspace */}
        {selectedProblem && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (5 cols): Problem Statement & Hints */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Problem Details Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
                
                {/* Meta Badges */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                    selectedProblem.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : (selectedProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20')
                  }`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                    {selectedProblem.category}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-100">{selectedProblem.title}</h2>

                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  {selectedProblem.description}
                </p>

                {/* Example Cards */}
                {selectedProblem.examples && selectedProblem.examples.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Example Test Cases:</h3>
                    {selectedProblem.examples.map((ex, idx) => (
                      <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs space-y-1.5">
                        <div><span className="text-slate-500 font-bold">Input:</span> <span className="text-slate-200">{ex.input}</span></div>
                        <div><span className="text-slate-500 font-bold">Output:</span> <span className="text-emerald-400 font-bold">{ex.output}</span></div>
                        {ex.explanation && <div className="text-[11px] text-slate-400 font-sans italic pt-1 border-t border-slate-800">{ex.explanation}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {selectedProblem.constraints && selectedProblem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Constraints:</h3>
                    <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 font-mono">
                      {selectedProblem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Socratic AI Hints Accordion */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  Socratic AI Progressive Hints:
                </h3>
                <div className="space-y-2">
                  {selectedProblem.hints.map((hint, hIdx) => (
                    <div key={hIdx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => setActiveHintIndex(activeHintIndex === hIdx ? -1 : hIdx)}
                        className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between"
                      >
                        <span>💡 Hint {hIdx + 1}</span>
                        <span className="text-sky-400 text-xs">{activeHintIndex === hIdx ? 'Hide' : 'Reveal'}</span>
                      </button>
                      {activeHintIndex === hIdx && (
                        <div className="px-4 py-3 text-xs text-slate-300 border-t border-slate-800/80 bg-slate-900/50 leading-relaxed">
                          {hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (7 cols): Monaco Editor & Evaluation Scorecard */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Code Editor Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]">
                
                {/* Editor Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-slate-400">Language:</label>
                    <select
                      value={selectedLang}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400 rounded-lg px-3 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="python">Python 3</option>
                      <option value="javascript">JavaScript (Node)</option>
                      <option value="cpp">C++ (G++)</option>
                      <option value="java">Java 25</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetCode}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-semibold transition-all cursor-pointer"
                      title="Reset to Starter Template"
                    >
                      Reset Starter Code
                    </button>
                    <button
                      onClick={handleSubmitSolution}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      {isSubmitting ? 'Evaluating...' : 'Submit to AI Interviewer'}
                    </button>
                  </div>
                </div>

                {/* Monaco Editor Container */}
                <div className="flex-1 relative">
                  <Editor
                    height="100%"
                    language={getMonacoLang(selectedLang)}
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 4,
                      fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace"
                    }}
                  />
                </div>

                {/* Toast Notification Bar */}
                {notificationMessage && (
                  <div className="px-4 py-2 bg-emerald-950/90 border-t border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {notificationMessage}
                  </div>
                )}
              </div>

              {/* Interactive STDIN input panel for interactive problems */}
              {selectedProblem.defaultInput && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-blue-400" />
                    Interactive Input (STDIN):
                  </label>
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 text-xs font-mono text-slate-200 rounded-xl p-3 focus:outline-none"
                    placeholder="Enter input values separated by newlines..."
                  />
                </div>
              )}

              {/* AI Interviewer Evaluation & Score Card */}
              {evaluation && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl animate-fade-in">
                  
                  {/* Header Result */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg ${
                        evaluation.success ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {evaluation.score}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                          AI Interviewer Score: {evaluation.score} / 100
                          {evaluation.success ? (
                            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> PASSED
                            </span>
                          ) : (
                            <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" /> REVISION NEEDED
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400">
                          Hidden Test Cases: <span className="text-emerald-400 font-bold">{evaluation.passedHiddenTestCases} / {evaluation.totalHiddenTestCases} Passed</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Correctness
                      </span>
                      <p className="text-slate-200 font-medium">{evaluation.feedback.correctness}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-blue-400" /> Time Complexity
                      </span>
                      <p className="text-slate-200 font-mono font-bold">{evaluation.feedback.timeComplexity}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> Space Complexity
                      </span>
                      <p className="text-slate-200 font-mono font-bold">{evaluation.feedback.spaceComplexity}</p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Code Quality
                      </span>
                      <p className="text-slate-200 font-medium">{evaluation.feedback.codeQuality}</p>
                    </div>
                  </div>

                  {/* Execution Output */}
                  {evaluation.stdout && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-400 font-mono">Terminal Stdout Output:</span>
                      <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap">{evaluation.stdout}</pre>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
