import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Award, Clock, Play, CheckCircle2, AlertTriangle, HelpCircle, RefreshCw, Zap, Code2, ChevronRight, ShieldCheck, Cpu, Terminal, BookOpen, Star, Wand2, Copy, Check } from 'lucide-react';
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
  
  // Execution & Test Run States
  const [isRunningTest, setIsRunningTest] = useState<boolean>(false);
  const [testOutput, setTestOutput] = useState<string>('');
  const [testStderr, setTestStderr] = useState<string>('');
  const [testExitCode, setTestExitCode] = useState<number | undefined>(undefined);
  const [testExecutionTime, setTestExecutionTime] = useState<number | undefined>(undefined);

  // AI Auto-Fix State
  const [isAIFixing, setIsAIFixing] = useState<boolean>(false);

  // Submission State
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
    const starter = prob.starterCodes[selectedLang] || prob.starterCodes['python'] || '';
    setCode(starter);
    setUserInput(prob.defaultInput || '');
    setTimeRemaining(prob.timeLimitMinutes * 60);
    setTimerRunning(true);
    setEvaluation(null);
    setTestOutput('');
    setTestStderr('');
    setTestExitCode(undefined);
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
    setTestOutput('');
    setTestStderr('');
    setTestExitCode(undefined);
    setNotificationMessage('Starter code reset successfully!');
    setTimeout(() => setNotificationMessage(null), 2500);
  };

  // 1. Interactive Test Run Action with Custom STDIN Input
  const handleRunTest = async () => {
    if (!code.trim() || isRunningTest) return;
    setIsRunningTest(true);
    setTestOutput('');
    setTestStderr('');
    setTestExitCode(undefined);
    setNotificationMessage('⚡ Executing test run with current STDIN input...');

    try {
      const res = await api.post('/executions', {
        language: selectedLang,
        code,
        input: userInput
      });

      setTestOutput(res.data.stdout || '');
      setTestStderr(res.data.stderr || '');
      setTestExitCode(res.data.exitCode ?? (res.data.status === 'success' ? 0 : 1));
      setTestExecutionTime(res.data.executionTime);

      if (res.data.status === 'success' && (res.data.exitCode === 0 || res.data.exitCode === undefined)) {
        setNotificationMessage('✅ Test run completed successfully with Exit Code 0!');
      } else {
        setNotificationMessage('⚠️ Execution error detected in test run. Click "AI Auto-Fix" to repair.');
      }
    } catch (err: any) {
      setTestStderr(err.response?.data?.message || err.message || 'Execution error');
      setTestExitCode(1);
      setNotificationMessage('❌ Test run failed to execute.');
    } finally {
      setIsRunningTest(false);
      setTimeout(() => setNotificationMessage(null), 3500);
    }
  };

  // 2. 1-Click AI Auto-Fix & Re-Run in Interview Arena
  const handleAIFix = async () => {
    if (!code.trim() || isAIFixing) return;
    setIsAIFixing(true);
    setNotificationMessage('⚡ CodeForge AI is analyzing and repairing code errors...');

    try {
      const res = await api.post('/debug/auto-fix', {
        language: selectedLang,
        code,
        stdin: userInput,
        userInput: userInput
      });

      if (res.data.success && res.data.finalCode) {
        setCode(res.data.finalCode);
        setTestOutput(res.data.output || res.data.stdout || '');
        setTestStderr('');
        setTestExitCode(0);
        setNotificationMessage('✅ AI Auto-Fix Successful — Code repaired and verified with Exit Code 0!');
      } else {
        const errorMsg = res.data.errorMessage || res.data.message || 'Auto-fix could not fully resolve error.';
        setTestStderr(errorMsg);
        setNotificationMessage(`⚠️ AI Auto-Fix: ${errorMsg}`);
      }
    } catch (err: any) {
      setNotificationMessage('❌ AI Auto-Fix failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAIFixing(false);
      setTimeout(() => setNotificationMessage(null), 4000);
    }
  };

  // 3. Full Solution Submission to AI Interviewer
  const handleSubmitSolution = async () => {
    if (!selectedProblem || isSubmitting) return;

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
      setNotificationMessage('❌ Evaluation error: ' + (err.response?.data?.message || err.message));
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

                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
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

            {/* Right Column (7 cols): Monaco Editor, Custom Input & Output/Scorecard */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Code Editor Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
                
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
                      Reset Code
                    </button>

                    {/* Test Run Button */}
                    <button
                      onClick={handleRunTest}
                      disabled={isRunningTest || isSubmitting}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                      title="Run code with current STDIN input"
                    >
                      {isRunningTest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      {isRunningTest ? 'Running...' : 'Run Code (Test)'}
                    </button>

                    {/* Full Submit Button */}
                    <button
                      onClick={handleSubmitSolution}
                      disabled={isSubmitting || isRunningTest}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                      title="Submit solution for full AI evaluation"
                    >
                      {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Award className="w-3.5 h-3.5" />}
                      {isSubmitting ? 'Evaluating...' : 'Submit Solution'}
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
                  <div className="px-4 py-2 bg-slate-950/95 border-t border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      {notificationMessage}
                    </span>
                  </div>
                )}
              </div>

              {/* Editable Custom STDIN Input Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    Custom Input (STDIN) — Editable:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setUserInput(selectedProblem.defaultInput || '5')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-[11px] font-mono border border-slate-700 cursor-pointer transition-colors"
                    >
                      Reset Default Input
                    </button>
                    <button
                      type="button"
                      onClick={handleRunTest}
                      disabled={isRunningTest}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm shadow-amber-600/20"
                    >
                      <Play className="w-3 h-3 fill-current" /> Run with this Input
                    </button>
                  </div>
                </div>

                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs font-mono text-slate-100 rounded-xl p-3 focus:outline-none leading-relaxed resize-y"
                  placeholder="Enter input values separated by newlines (e.g. 5 or Pooja\n85\n75)..."
                />
              </div>

              {/* Live Test Run Output Card */}
              {(testOutput || testStderr || testExitCode !== undefined) && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-slate-200">Execution Output (Test Run):</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {testExecutionTime !== undefined && (
                        <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" /> {testExecutionTime} ms
                        </span>
                      )}

                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                        testExitCode === 0
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        Exit Code: {testExitCode ?? 0}
                      </span>
                    </div>
                  </div>

                  {testOutput && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Standard Output (stdout):</span>
                      <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {testOutput}
                      </pre>
                    </div>
                  )}

                  {testStderr && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider font-mono flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Standard Error (stderr):
                        </span>
                        
                        {/* 1-Click AI Auto-Fix Trigger */}
                        <button
                          onClick={handleAIFix}
                          disabled={isAIFixing}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
                        >
                          <Wand2 className={`w-3.5 h-3.5 text-amber-300 ${isAIFixing ? 'animate-spin' : ''}`} />
                          {isAIFixing ? 'Fixing Code...' : '⚡ AI Auto-Fix & Re-Run'}
                        </button>
                      </div>

                      <pre className="p-3 bg-slate-950 rounded-xl border border-rose-500/30 text-xs font-mono text-rose-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {testStderr}
                      </pre>
                    </div>
                  )}
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

                    {!evaluation.success && (
                      <button
                        onClick={handleAIFix}
                        disabled={isAIFixing}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Wand2 className="w-4 h-4 text-amber-300" />
                        AI Auto-Fix & Re-Evaluate
                      </button>
                    )}
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

                  {evaluation.stderr && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
                      <span className="text-xs font-bold text-rose-400 font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Errors Encountered:
                      </span>
                      <pre className="text-xs font-mono text-rose-300 whitespace-pre-wrap">{evaluation.stderr}</pre>
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
