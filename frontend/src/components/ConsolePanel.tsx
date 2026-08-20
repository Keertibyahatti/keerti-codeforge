import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, XCircle, Sparkles, Clock, ArrowRight, Wand2, RefreshCw, Terminal, Ban, FileText, Cpu, CheckSquare, Plus, Trash2, Edit3, Save, X, Activity } from 'lucide-react';
import { AIAnalysisResponse } from '../types';
import api from '../services/api';

export interface TestCaseItem {
  id: string;
  name: string;
  category: 'NORMAL' | 'BOUNDARY' | 'EDGE' | 'INVALID INPUT' | 'EMPTY INPUT' | 'LARGE INPUT';
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  status?: 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL' | 'ERROR' | 'TIMEOUT';
  executionTime?: number;
  error?: string;
}

interface ConsolePanelProps {
  stdout: string;
  stderr: string;
  status?: string;
  workflowState: 'idle' | 'running' | 'error_detected' | 'fixing' | 'fix_applied' | 'rerunning' | 'fixed_successfully' | 'fix_failed';
  executionTime?: number;
  exitCode?: number;
  language: string;
  input: string;
  errorLine?: number;
  errorSnippet?: string;
  aiAnalysis: AIAnalysisResponse | null;
  isAILoading: boolean;
  onInputChange: (val: string) => void;
  onSendLiveStdin?: (val: string) => void;
  onClear: () => void;
  onRunCode: () => void;
  onFixAndReRun: () => void;
  onRunAIAnalyze: () => void;
  onRunAIOptimize: () => void;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({
  stdout,
  stderr,
  status,
  workflowState,
  executionTime,
  exitCode,
  language,
  input,
  errorLine,
  errorSnippet,
  aiAnalysis,
  isAILoading,
  onInputChange,
  onSendLiveStdin,
  onClear,
  onRunCode,
  onFixAndReRun,
  onRunAIAnalyze,
  onRunAIOptimize
}) => {
  const [activeTab, setActiveTab] = useState<'output' | 'errors' | 'ai' | 'performance' | 'cases' | 'stdin'>('output');
  const [liveStdinVal, setLiveStdinVal] = useState<string>('');

  // Test Cases State
  const [testCases, setTestCases] = useState<TestCaseItem[]>([
    { id: 'TC-001', name: 'Normal Factorial (5)', category: 'NORMAL', input: '5', expectedOutput: '120' },
    { id: 'TC-002', name: 'Boundary Factorial (0)', category: 'BOUNDARY', input: '0', expectedOutput: '1' },
    { id: 'TC-003', name: 'Edge Factorial (1)', category: 'EDGE', input: '1', expectedOutput: '1' }
  ]);
  const [testSummary, setTestSummary] = useState<any | null>(null);
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // New Test Input State
  const [newTcName, setNewTcName] = useState('');
  const [newTcCategory, setNewTcCategory] = useState<'NORMAL' | 'BOUNDARY' | 'EDGE' | 'INVALID INPUT' | 'EMPTY INPUT' | 'LARGE INPUT'>('NORMAL');
  const [newTcInput, setNewTcInput] = useState('');
  const [newTcExpected, setNewTcExpected] = useState('');

  // Editing Test Case State
  const [editingTcId, setEditingTcId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');
  const [editExpected, setEditExpected] = useState('');

  const isErrorState = (stderr && stderr.trim().length > 0) || (exitCode !== undefined && exitCode !== 0 && status !== 'stopped');

  // AI Test Generation
  const handleGenerateTestCases = async () => {
    setIsGeneratingTests(true);
    try {
      const res = await api.post('/tests/generate', { language });
      if (res.data.testCases) {
        setTestCases(res.data.testCases);
        setTestSummary(null);
      }
    } catch (err) {
      console.error('Error generating test cases:', err);
    } finally {
      setIsGeneratingTests(false);
    }
  };

  // Run All Test Cases
  const handleRunAllTestCases = async () => {
    setIsRunningTests(true);
    try {
      const res = await api.post('/tests/run-all', {
        language,
        testCases
      });
      if (res.data.testResults) {
        setTestCases(res.data.testResults);
        setTestSummary(res.data.summary);
      }
    } catch (err) {
      console.error('Error running test cases:', err);
    } finally {
      setIsRunningTests(false);
    }
  };

  const handleAddTestCase = () => {
    if (!newTcExpected.trim()) return;
    const newTc: TestCaseItem = {
      id: `TC-${Date.now().toString().substring(7)}`,
      name: newTcName.trim() || `Custom Test ${testCases.length + 1}`,
      category: newTcCategory,
      input: newTcInput,
      expectedOutput: newTcExpected,
      status: 'PENDING'
    };
    setTestCases(prev => [...prev, newTc]);
    setNewTcName('');
    setNewTcInput('');
    setNewTcExpected('');
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCases(prev => prev.filter(tc => tc.id !== id));
  };

  const handleSaveEditTestCase = (id: string) => {
    setTestCases(prev => prev.map(tc => tc.id === id ? { ...tc, input: editInput, expectedOutput: editExpected, status: 'PENDING' } : tc));
    setEditingTcId(null);
  };

  const parseErrorType = (): string => {
    if (!stderr) return 'Unknown Error';
    if (stderr.includes('ZeroDivisionError')) return 'ZeroDivisionError';
    if (stderr.includes('NameError')) return 'NameError';
    if (stderr.includes('TypeError')) return 'TypeError';
    if (stderr.includes('SyntaxError')) return 'SyntaxError';
    if (stderr.includes('IndentationError')) return 'IndentationError';
    if (stderr.includes('AttributeError')) return 'AttributeError';
    if (stderr.includes('IndexError')) return 'IndexError';
    if (stderr.includes('KeyError')) return 'KeyError';
    if (stderr.includes('ValueError')) return 'ValueError';
    const firstLine = stderr.trim().split('\n')[0];
    return firstLine.substring(0, 40);
  };

  const getStatusBadge = () => {
    if (workflowState === 'fixed_successfully') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          ✅ FIX VERIFIED (Exit Code: {exitCode ?? 0})
        </span>
      );
    }

    if (workflowState === 'fix_failed') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold shadow-sm">
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          ❌ FIX VERIFICATION FAILED (Exit Code: {exitCode ?? 1})
        </span>
      );
    }

    if (workflowState === 'rerunning') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          ⚡ VERIFYING FIX...
        </span>
      );
    }

    if (workflowState === 'fixing') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          ⚡ AI ANALYZING...
        </span>
      );
    }

    if (workflowState === 'running') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold animate-pulse">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          RUNNING...
        </span>
      );
    }

    if (status === 'success') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          SUCCESS (Exit Code: {exitCode ?? 0})
        </span>
      );
    }

    if (status === 'stopped') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold">
          <Ban className="w-3.5 h-3.5 text-slate-400" />
          STOPPED
        </span>
      );
    }

    if (isErrorState) {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          EXECUTION FAILED
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-xs font-medium">
        READY
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl font-sans text-xs">
      
      {/* Console Header Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-950/90 border-b border-slate-800">
        
        <div className="flex items-center gap-1 font-bold text-xs">
          <button
            onClick={() => setActiveTab('output')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'output'
                ? 'bg-slate-800 text-blue-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Output
          </button>
          
          <button
            onClick={() => setActiveTab('errors')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'errors'
                ? 'bg-slate-800 text-rose-400 border border-slate-700'
                : isErrorState
                ? 'text-rose-400 animate-pulse font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Errors
            {isErrorState && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
          </button>
          
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Analysis
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'performance'
                ? 'bg-slate-800 text-teal-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-teal-400" /> Performance
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cases'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> Test Cases
          </button>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <button
            onClick={onClear}
            className="p-1 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Clear Console"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Console Content Body */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 font-mono">
        
        {/* Output Tab */}
        {activeTab === 'output' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans border-b border-slate-800/60 pb-1">
              <span>Standard Output Stream (stdout)</span>
              {executionTime !== undefined && (
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {executionTime} ms
                </span>
              )}
            </div>

            {stdout && stdout.trim().length > 0 ? (
              <pre className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed text-xs">
                {stdout}
              </pre>
            ) : (
              <div className="py-8 text-center font-sans text-slate-500 space-y-2">
                <Terminal className="w-8 h-8 text-slate-700 mx-auto" />
                <p>No output generated yet. Click "Run" to execute program.</p>
              </div>
            )}

            {/* Live Terminal Stdin Stream Input */}
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 font-sans">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> Terminal Live Stdin Stream:
                </span>
                <span className="text-[10px] text-slate-500 font-mono">input() / readline</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={liveStdinVal}
                  onChange={(e) => setLiveStdinVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSendLiveStdin) {
                      onSendLiveStdin(liveStdinVal);
                      setLiveStdinVal('');
                    }
                  }}
                  placeholder="Type input value & press Enter..."
                  className="flex-1 bg-slate-900 border border-slate-800 focus:border-blue-500 px-3 py-1.5 rounded-lg text-slate-200 font-mono text-xs outline-none"
                />
                <button
                  onClick={() => {
                    if (onSendLiveStdin) {
                      onSendLiveStdin(liveStdinVal);
                      setLiveStdinVal('');
                    }
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Send Stdin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Errors Tab */}
        {activeTab === 'errors' && (
          <div className="space-y-3 font-sans">
            {isErrorState ? (
              <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                  <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    {parseErrorType()}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">
                    {errorLine ? `Line: ${errorLine}` : 'Runtime Failure'}
                  </span>
                </div>

                {stderr && (
                  <pre className="text-rose-300 font-mono text-xs bg-slate-900/90 p-3 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap">
                    {stderr}
                  </pre>
                )}

                {/* Beginner Explanation */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-indigo-300">💡 Beginner-Friendly Explanation:</div>
                  {(() => {
                    const errType = parseErrorType();
                    if (errType === 'TypeError' && stderr.includes('missing') && stderr.includes('positional argument')) {
                      const missingArgMatch = stderr.match(/missing \d+ required positional argument: '([^']+)'/);
                      const funcMatch = stderr.match(/TypeError:\s*([a-zA-Z0-9_]+)\(\)\s*missing/);
                      const argName = missingArgMatch ? missingArgMatch[1] : 'quantity';
                      const funcName = funcMatch ? funcMatch[1] : 'calculate_total';
                      return (
                        <>
                          <p className="text-slate-300">
                            <strong>What happened:</strong> Function <code className="text-amber-300">{funcName}()</code> missing required argument <code className="text-amber-300">'{argName}'</code>.
                          </p>
                          <p className="text-slate-300">
                            <strong>Why it happened:</strong> The function definition requires 2 arguments (price, {argName}), but call supplied only 1 argument.
                          </p>
                          <p className="text-slate-300">
                            <strong>How to fix:</strong> Update call to <code className="text-emerald-300">{funcName}(price, {argName})</code>.
                          </p>
                        </>
                      );
                    }
                    if (errType === 'TypeError' && stderr.includes('unsupported operand type') && stderr.includes('int') && stderr.includes('str')) {
                      return (
                        <>
                          <p className="text-slate-300">
                            <strong>What happened:</strong> The list contains a string value <code className="text-amber-300">"100"</code> instead of an integer.
                          </p>
                          <p className="text-slate-300">
                            <strong>Why it happened:</strong> The <code className="text-amber-300">sum()</code> function expects numeric values, but attempted to add an integer and a string.
                          </p>
                          <p className="text-slate-300">
                            <strong>How to fix:</strong> Change string <code className="text-emerald-300">"100"</code> to integer <code className="text-emerald-300">100</code> in the list.
                          </p>
                        </>
                      );
                    }
                    if (errType === 'NameError') {
                      const nameErrMatch = stderr.match(/NameError:\s*name\s*'([^']+)'\s*is not defined/);
                      const didYouMeanMatch = stderr.match(/Did you mean:\s*'([^']+)'\?/);
                      const undefVar = nameErrMatch ? nameErrMatch[1] : 'quntity';
                      const suggVar = didYouMeanMatch ? didYouMeanMatch[1] : (undefVar === 'quntity' ? 'quantity' : 'numbers');
                      return (
                        <>
                          <p className="text-slate-300">
                            <strong>What happened:</strong> Python found a variable called <code className="text-amber-300">'{undefVar}'</code> that was never declared.
                          </p>
                          <p className="text-slate-300">
                            <strong>Why it happened:</strong> The program declared <code className="text-emerald-300">'{suggVar}'</code>, but line uses <code className="text-amber-300">'{undefVar}'</code> (spelling mistake).
                          </p>
                          <p className="text-slate-300">
                            <strong>How to fix:</strong> Replace <code className="text-amber-300">'{undefVar}'</code> with <code className="text-emerald-300">'{suggVar}'</code>.
                          </p>
                        </>
                      );
                    }
                    return (
                      <>
                        <p className="text-slate-300">
                          <strong>What happened:</strong> Python encountered a <strong className="text-rose-300">{errType}</strong> on line {errorLine || 1}.
                        </p>
                        <p className="text-slate-300">
                          <strong>Why it happened:</strong> {stderr.trim().split('\n')[0]}
                        </p>
                      </>
                    );
                  })()}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={onFixAndReRun}
                    disabled={isAILoading}
                    className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                    AI Fix & Auto Re-Run
                  </button>
                  <button
                    onClick={onRunAIAnalyze}
                    disabled={isAILoading}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg transition-all cursor-pointer text-xs"
                  >
                    AI Debug
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p>No errors detected! Program executed cleanly with Exit Code 0.</p>
              </div>
            )}
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-3 font-sans">
            {aiAnalysis ? (
              <div className="p-4 bg-slate-900 rounded-xl border border-indigo-500/30 space-y-3">
                <div className="font-bold text-indigo-300 text-sm">{aiAnalysis.summary}</div>
                <p className="text-slate-300 leading-relaxed text-xs">{aiAnalysis.explanation}</p>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500">
                Click "AI Debug" to generate beginner-friendly error explanations.
              </div>
            )}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-3 font-sans">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Time Complexity</div>
                <div className="font-mono text-indigo-400 font-bold text-sm">O(n)</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Space Complexity</div>
                <div className="font-mono text-teal-400 font-bold text-sm">O(1)</div>
              </div>
            </div>
          </div>
        )}

        {/* Test Cases Tab — AI Test Generator & Automated Test Runner */}
        {activeTab === 'cases' && (
          <div className="space-y-4 font-sans text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> AI Test Engineer & Automated Test Runner
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateTestCases}
                  disabled={isGeneratingTests}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-xs shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {isGeneratingTests ? 'Generating...' : 'Generate Test Cases'}
                </button>
                <button
                  onClick={handleRunAllTestCases}
                  disabled={isRunningTests}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer text-xs shadow-md shadow-emerald-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isRunningTests ? 'Running Tests...' : 'Run All Test Cases'}
                </button>
              </div>
            </div>

            {/* Test Summary Dashboard Card */}
            {testSummary && (
              <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 font-sans">
                  <span className="font-bold text-slate-200 text-xs">TEST SUITE EXECUTION SUMMARY</span>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold ${
                    testSummary.passRate === 100 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {testSummary.passRate}% PASS RATE
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">TOTAL</span>
                    <span className="text-white font-bold text-sm">{testSummary.totalTests}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-emerald-400 block text-[10px]">PASSED</span>
                    <span className="text-emerald-400 font-bold text-sm">{testSummary.passed}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-rose-400 block text-[10px]">FAILED</span>
                    <span className="text-rose-400 font-bold text-sm">{testSummary.failed}</span>
                  </div>
                  <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                    <span className="text-amber-400 block text-[10px]">TIME</span>
                    <span className="text-amber-300 font-bold text-xs">{testSummary.totalExecutionTime} ms</span>
                  </div>
                </div>
              </div>
            )}

            {/* Test Cases List Cards */}
            <div className="space-y-2.5">
              {testCases.map((tc) => (
                <div key={tc.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 text-[11px]">{tc.id}</span>
                      <span className="font-bold text-slate-200">{tc.name}</span>
                      <span className="px-2 py-0.5 bg-slate-950 text-slate-400 font-mono text-[9px] font-bold rounded border border-slate-800">
                        {tc.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold flex items-center gap-1 ${
                        tc.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        tc.status === 'FAIL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        tc.status === 'ERROR' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {tc.status === 'PASS' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {tc.status === 'FAIL' && <XCircle className="w-3 h-3 text-rose-400" />}
                        {tc.status === 'ERROR' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                        {tc.status || 'UNTESTED'}
                      </span>

                      <button
                        onClick={() => handleDeleteTestCase(tc.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                        title="Delete Test Case"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expected vs Actual Output Block */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-0.5">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Input:</span>
                      <span className="text-amber-300 block font-semibold">{tc.input || '(None)'}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-0.5">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase">Expected Output:</span>
                      <span className="text-emerald-300 block font-semibold">{tc.expectedOutput}</span>
                    </div>
                  </div>

                  {tc.actualOutput !== undefined && (
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-bold uppercase">Actual Output:</span>
                        {tc.executionTime !== undefined && <span className="text-slate-500">{tc.executionTime} ms</span>}
                      </div>
                      <div className={`font-semibold ${tc.status === 'PASS' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tc.actualOutput || '(No Output)'}
                      </div>
                    </div>
                  )}

                  {/* Failed Test AI Repair Triggers */}
                  {(tc.status === 'FAIL' || tc.status === 'ERROR') && (
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                      <button
                        onClick={onFixAndReRun}
                        className="flex-1 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-md transition-all cursor-pointer flex items-center justify-center gap-1 text-[11px]"
                      >
                        <Wand2 className="w-3 h-3 text-amber-300" /> AI Fix & Re-Test
                      </button>
                      <button
                        onClick={onRunAIAnalyze}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-md transition-all cursor-pointer text-[11px]"
                      >
                        AI Debug
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Custom Test Case Box */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="font-bold text-slate-300 text-[11px] flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-blue-400" /> Add Custom Test Case:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono text-xs">
                <input
                  type="text"
                  value={newTcName}
                  onChange={(e) => setNewTcName(e.target.value)}
                  placeholder="Test Name (e.g. Edge Case)"
                  className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 outline-none text-xs"
                />
                <input
                  type="text"
                  value={newTcInput}
                  onChange={(e) => setNewTcInput(e.target.value)}
                  placeholder="Input (e.g. 5)"
                  className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 outline-none text-xs font-mono"
                />
                <input
                  type="text"
                  value={newTcExpected}
                  onChange={(e) => setNewTcExpected(e.target.value)}
                  placeholder="Expected output (e.g. 120)"
                  className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 outline-none text-xs font-mono"
                />
              </div>
              <button
                onClick={handleAddTestCase}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors text-xs cursor-pointer shadow-md shadow-blue-600/20"
              >
                Add Test Case
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
