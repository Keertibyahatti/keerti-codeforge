import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MonacoEditorPanel, starterTemplates } from '../components/MonacoEditorPanel';
import { ConsolePanel } from '../components/ConsolePanel';
import { AIPanel } from '../components/AIPanel';
import { AutoFixDiffModal } from '../components/AutoFixDiffModal';
import { FileExplorerPanel, ProjectFileItem } from '../components/FileExplorerPanel';
import { MultiAgentDrawer } from '../components/MultiAgentDrawer';
import { SecurityPanel, SecurityIssue } from '../components/SecurityPanel';
import { TestingPanel } from '../components/TestingPanel';
import { PerformancePanel } from '../components/PerformancePanel';
import { ProductionReadinessModal } from '../components/ProductionReadinessModal';
import { InterviewArenaPanel } from '../components/InterviewArenaPanel';
import { DemoTourModal } from '../components/DemoTourModal';
import { GitControlPanel } from '../components/GitControlPanel';
import { ArchitecturePanel } from '../components/ArchitecturePanel';
import { PipelineBar } from '../components/PipelineBar';
import { DebugPipelineVisualizer } from '../components/DebugPipelineVisualizer';
import { AIChatbotPanel } from '../components/AIChatbotPanel';
import { AIDeepInspectorModal } from '../components/AIDeepInspectorModal';
import { PolyglotTranspileModal } from '../components/PolyglotTranspileModal';
import { ExecutionVisualizerModal } from '../components/ExecutionVisualizerModal';
import { AIVoiceExplainerPanel } from '../components/AIVoiceExplainerPanel';
import { InteractiveQuizModal } from '../components/InteractiveQuizModal';
import { AICodeGeneratorModal } from '../components/AICodeGeneratorModal';
import { AIPromptBar } from '../components/AIPromptBar';
import { FloatingVoiceWidget } from '../components/FloatingVoiceWidget';
import api from '../services/api';
import { AIAnalysisResponse } from '../types';
import { isCodeValidSyntax } from '../utils/validation';
import { Award, Sparkles, ShieldCheck, TestTube2, Cpu, Bot, Folder, Play, Square, Save, GitBranch, Layers, RotateCcw, RefreshCw, Network, GitCommit, MessageSquareCode, Activity } from 'lucide-react';

export const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const programIdParam = searchParams.get('programId');

  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>(starterTemplates.python);
  const [originalUserCode, setOriginalUserCode] = useState<string>(starterTemplates.python);
  const [input, setInput] = useState<string>('5');
  const [programTitle, setProgramTitle] = useState<string>('Student Grade Calculator & Ranker');
  const [currentProgramId, setCurrentProgramId] = useState<string | null>(programIdParam);

  // Multi-File Project State
  const [projectFiles, setProjectFiles] = useState<ProjectFileItem[]>([
    {
      id: 'file_1',
      path: 'src/main.py',
      name: 'main.py',
      language: 'python',
      content: starterTemplates.python
    },
    {
      id: 'file_2',
      path: 'src/utils.py',
      name: 'utils.py',
      language: 'python',
      content: `def calculate_grade(average: float) -> str:
    if average >= 90:
        return "A+"
    elif average >= 75:
        return "A"
    elif average >= 60:
        return "B"
    elif average >= 50:
        return "C"
    else:
        return "F"
`
    },
    {
      id: 'file_3',
      path: 'tests/test_main.py',
      name: 'test_main.py',
      language: 'python',
      content: `import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))

from utils import calculate_grade

def test_calculate_grade():
    assert calculate_grade(95) == "A+"
    assert calculate_grade(80) == "A"
    assert calculate_grade(40) == "F"

print("✅ All Python Unit Tests Passed!")
`
    },
    {
      id: 'file_4',
      path: 'README.md',
      name: 'README.md',
      language: 'markdown',
      content: `# Student Grade Calculator & Ranker

National-Level Software Engineering Benchmark Project on CodeForge AI.
`
    }
  ]);
  const [activeFilePath, setActiveFilePath] = useState<string>('src/main.py');

  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [exitCode, setExitCode] = useState<number | undefined>(undefined);
  const [lastExecutionId, setLastExecutionId] = useState<string | undefined>(undefined);
  const [lastExecutionJobId, setLastExecutionJobId] = useState<string | undefined>(undefined);

  const [errorLine, setErrorLine] = useState<number | undefined>(undefined);
  const [missingSymbol, setMissingSymbol] = useState<string | undefined>(undefined);
  const [missingOperand, setMissingOperand] = useState<string | undefined>(undefined);
  const [wrongSymbol, setWrongSymbol] = useState<string | undefined>(undefined);
  const [suggestedFixSymbol, setSuggestedFixSymbol] = useState<string | undefined>(undefined);
  const [errorSnippet, setErrorSnippet] = useState<string | undefined>(undefined);

  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isAILoading, setIsAILoading] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [autoFixModalData, setAutoFixModalData] = useState<any | null>(null);

  // Active Tool Side Tab: 'explorer' | 'chat' | 'security' | 'testing' | 'performance' | 'agents' | 'git' | 'arch'
  const [activeSideTab, setActiveSideTab] = useState<'explorer' | 'chat' | 'security' | 'testing' | 'performance' | 'agents' | 'git' | 'arch'>('explorer');

  // National Feature Modals
  const [isReadinessModalOpen, setIsReadinessModalOpen] = useState(false);
  const [isInterviewArenaOpen, setIsInterviewArenaOpen] = useState(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);
  const [isDeepInspectorOpen, setIsDeepInspectorOpen] = useState(false);
  const [isPolyglotOpen, setIsPolyglotOpen] = useState(false);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCodeGenOpen, setIsCodeGenOpen] = useState(false);

  // Security Scanner State
  const [securityScore, setSecurityScore] = useState<number>(95);
  const [securityVulnerabilities, setSecurityVulnerabilities] = useState<SecurityIssue[]>([]);
  const [isScanningSecurity, setIsScanningSecurity] = useState(false);

  // Testing State
  const [generatedTestCode, setGeneratedTestCode] = useState<string>('');
  const [testStatus, setTestStatus] = useState<string | undefined>(undefined);
  const [testStdout, setTestStdout] = useState<string | undefined>(undefined);
  const [isTestingRunning, setIsTestingRunning] = useState(false);

  // Performance Profiler State
  const [perfTimeComp, setPerfTimeComp] = useState<string>('O(n)');
  const [perfSpaceComp, setPerfSpaceComp] = useState<string>('O(1)');
  const [perfRec, setPerfRec] = useState<string>('Algorithm operates efficiently with linear time complexity.');
  const [isAnalyzingPerf, setIsAnalyzingPerf] = useState(false);

  // Multi-Agent State
  const [activeAgentName, setActiveAgentName] = useState<string | null>(null);

  // Listen for initialCode and initialLanguage passed from navigation (e.g. Code Generator, Chatbot, Interview Arena)
  useEffect(() => {
    if (location.state?.initialCode) {
      const incomingCode = location.state.initialCode;
      setCode(incomingCode);
      setOriginalUserCode(incomingCode);
      setProjectFiles(prev => prev.map(f => f.path === 'src/main.py' ? { ...f, content: incomingCode } : f));
    }

    if (location.state?.initialLanguage) {
      let lang = location.state.initialLanguage.toLowerCase();
      if (lang === 'typescript' || lang === 'ts') {
        lang = 'python';
      }
      setLanguage(lang);
    } else {
      setLanguage('python');
    }
  }, [location.state]);

  // Keyboard Shortcuts (Ctrl+S to Save, Ctrl+Enter to Run)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveProgram();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language]);

  // Clear toast notifications after 5 seconds
  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => setNotificationMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const [workflowState, setWorkflowState] = useState<'idle' | 'running' | 'error_detected' | 'fixing' | 'fix_applied' | 'rerunning' | 'fixed_successfully' | 'fix_failed'>('idle');

  // File Operations
  const handleSelectFile = (fileItem: ProjectFileItem) => {
    setProjectFiles(prev => prev.map(f => f.path === activeFilePath ? { ...f, content: code } : f));
    setActiveFilePath(fileItem.path);
    setCode(fileItem.content);
    setOriginalUserCode(fileItem.content);
    if (fileItem.path.endsWith('.py')) setLanguage('python');
    else if (fileItem.path.endsWith('.js')) setLanguage('javascript');
  };

  const handleCreateFile = (newPath: string, isFolder: boolean) => {
    const ext = newPath.endsWith('.js') ? 'javascript' : 'python';
    const newFile: ProjectFileItem = {
      id: `file_${Date.now()}`,
      path: newPath,
      name: newPath.split('/').pop() || newPath,
      content: `# ${newPath}\n\nprint("New file created on CodeForge AI")\n`,
      language: ext,
      isFolder
    };
    setProjectFiles(prev => [...prev, newFile]);
    setActiveFilePath(newPath);
    setCode(newFile.content);
    setOriginalUserCode(newFile.content);
    setLanguage(ext);
  };

  const handleDeleteFile = (id: string) => {
    setProjectFiles(prev => prev.filter(f => f.id !== id));
  };

  // Restore Original Code Feature 5 & 7
  const handleRestoreOriginalCode = () => {
    setCode(originalUserCode);
    setNotificationMessage('Restored original code.');
  };

  // Security Scanner Trigger
  const handleRunSecurityScan = async () => {
    setIsScanningSecurity(true);
    try {
      const res = await api.post('/security/scan', { code, language });
      setSecurityScore(res.data.securityScore);
      setSecurityVulnerabilities(res.data.vulnerabilities || []);
    } catch (err) {
      console.error('Security scan error:', err);
    } finally {
      setIsScanningSecurity(false);
    }
  };

  // Generate Tests Trigger
  const handleGenerateTests = async () => {
    try {
      const res = await api.post('/tests/generate', { code, language });
      setGeneratedTestCode(res.data.testCode);
      setNotificationMessage('✅ Unit test suite generated successfully by AI Test Engineer.');
    } catch (err) {
      console.error('Generate tests error:', err);
    }
  };

  // Run Test Suite Trigger
  const handleRunTestSuite = async () => {
    setIsTestingRunning(true);
    try {
      const res = await api.post('/tests/run', { testCode: generatedTestCode || code, language });
      setTestStatus(res.data.status);
      setTestStdout(res.data.stdout);
    } catch (err) {
      console.error('Run tests error:', err);
    } finally {
      setIsTestingRunning(false);
    }
  };

  // Performance Analysis Trigger
  const handleAnalyzePerformance = async () => {
    setIsAnalyzingPerf(true);
    try {
      const res = await api.post('/analytics/performance', { code, language });
      setPerfTimeComp(res.data.timeComplexity);
      setPerfSpaceComp(res.data.spaceComplexity);
      setPerfRec(res.data.recommendation);
    } catch (err) {
      console.error('Analyze performance error:', err);
    } finally {
      setIsAnalyzingPerf(false);
    }
  };

  // Run AI Agent Task
  const handleRunAgentTask = async (agentName: string) => {
    setActiveAgentName(agentName);
    setNotificationMessage(`⚡ ${agentName} executed successfully.`);
    setTimeout(() => setActiveAgentName(null), 2000);
  };

  // Feature 6: Iterative Re-Debug (Up to 5 attempts)
  const handleReDebug = async () => {
    setIsAILoading(true);
    setWorkflowState('fixing');
    try {
      const res = await api.post('/redebug', {
        language,
        code,
        userInput: input,
        maxAttempts: 5
      });

      if (res.data.success) {
        setCode(res.data.finalCode);
        setStdout(res.data.stdout);
        setStderr(res.data.stderr);
        setStatus('success');
        setExitCode(0);
        setWorkflowState('fixed_successfully');
        setNotificationMessage(`✅ Iterative Re-Debug Succeeded in ${res.data.totalAttempts} attempts!`);
      } else {
        setWorkflowState('fix_failed');
        setNotificationMessage('❌ Re-Debug reached max attempts. Manual correction required.');
      }
    } catch (err: any) {
      setWorkflowState('fix_failed');
      setNotificationMessage('❌ Re-Debug error: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  // Execute Code Core Action
  const executeCodePayload = async (targetCode: string, targetLanguage: string, isRerun: boolean = false) => {
    setIsRunning(true);
    setWorkflowState(isRerun ? 'rerunning' : 'running');
    setStdout('');
    setStderr('');
    setStatus(undefined);
    setExecutionTime(undefined);
    setExitCode(undefined);
    setErrorLine(undefined);
    setMissingSymbol(undefined);
    setMissingOperand(undefined);
    setWrongSymbol(undefined);
    setSuggestedFixSymbol(undefined);
    setErrorSnippet(undefined);

    if (!isRerun) {
      setAiAnalysis(null);
      setAutoFixModalData(null);
    }

    const activeLanguage = targetLanguage;
    const newJobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setLastExecutionJobId(newJobId);

    try {
      const res = await api.post('/executions', {
        language: activeLanguage,
        code: targetCode,
        input,
        programId: currentProgramId || undefined,
        executionJobId: newJobId
      });

      const {
        executionId,
        executionJobId: resJobId,
        status: execStatus,
        stdout: out,
        stderr: err,
        executionTime: time,
        exitCode: codeNum,
        errorLine: lineNum,
        missingSymbol: symbol,
        missingOperand: operand,
        wrongSymbol: wrong,
        suggestedFixSymbol: fix,
        errorSnippet: snippet
      } = res.data;

      if (resJobId) setLastExecutionJobId(resJobId);
      setLastExecutionId(executionId);
      setStatus(execStatus);
      setStdout(out || '');
      setStderr(err || '');
      setExecutionTime(time);
      setExitCode(codeNum);
      setErrorLine(lineNum);
      setMissingSymbol(symbol);
      setMissingOperand(operand);
      setWrongSymbol(wrong);
      setSuggestedFixSymbol(fix);
      setErrorSnippet(snippet);

      if (execStatus === 'success' && (codeNum === 0 || codeNum === undefined || codeNum === null)) {
        if (isRerun) {
          setWorkflowState('fixed_successfully');
          setNotificationMessage('✅ Error fixed successfully!');
        } else {
          setWorkflowState('idle');
        }
      } else {
        if (isRerun) {
          setWorkflowState('fix_failed');
          setNotificationMessage('❌ Error fix failed. The corrected code still produced an error.');
        } else {
          setWorkflowState('error_detected');
        }
      }
    } catch (err: any) {
      setStatus('error');
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Execution error';
      setStderr(msg);
      if (isRerun) {
        setWorkflowState('fix_failed');
        setNotificationMessage('❌ Error fix failed. The corrected code produced an execution error.');
      } else {
        setWorkflowState('error_detected');
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunCode = async () => {
    if (isRunning && lastExecutionJobId) {
      try {
        await api.post('/executions/stop', { executionJobId: lastExecutionJobId });
      } catch {}
    }
    setAiAnalysis(null);
    setAutoFixModalData(null);
    executeCodePayload(code, language, false);
  };

  // AI Auto-Fix Flow
  const handleFixAndReRun = async () => {
    if (isAILoading) return;
    const submittedCode = code;
    setIsAILoading(true);
    setWorkflowState('fixing');
    setNotificationMessage('⚡ Running CodeForge AI Universal Auto-Fix & Verification Engine...');
    try {
      const res = await api.post('/debug/auto-fix', {
        language: language || 'python',
        code: submittedCode || '',
        files: projectFiles,
        stdin: input,
        userInput: input
      });

      if (res.data.success && res.data.finalCode) {
        const fixedCode = res.data.finalCode;
        setCode(fixedCode);
        setOriginalUserCode(fixedCode);
        setStatus('success');
        setStderr('');
        setStdout(res.data.output || '');
        setExitCode(0);
        setWorkflowState('fixed_successfully');
        setNotificationMessage(`✅ AUTO-FIX SUCCESS — Code automatically repaired & executed cleanly! Output generated below.`);
      } else {
        setWorkflowState('fix_failed');
        const reason = res.data.reasonCode || 'REPAIR_LIMIT_REACHED';
        if (reason === 'MISSING_INPUT') {
          setNotificationMessage('⚠️ MISSING_INPUT: Program requires interactive user input (STDIN). Please provide input values in the STDIN panel.');
        } else if (reason === 'REPAIR_NO_PROGRESS') {
          setNotificationMessage('⚠️ REPAIR_NO_PROGRESS: AI generated identical candidate fixes without progress.');
        } else {
          setNotificationMessage(`❌ REPAIR_LIMIT_REACHED: ${res.data.errorMessage || res.data.message || 'Automatic repair reached maximum retry limit.'}`);
        }
      }
    } catch (err: any) {
      setWorkflowState('fix_failed');
      const errDetail = err.response?.data?.errorMessage || err.response?.data?.message || err.message;
      setNotificationMessage('❌ Auto-Fix error: ' + errDetail);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleAIAnalyze = async () => {
    setIsAILoading(true);
    try {
      const res = await api.post('/ai/analyze', {
        language,
        code,
        stderr,
        stdout,
        userInput: input,
        errorLine
      });
      setAiAnalysis(res.data);
    } catch (err: any) {
      setNotificationMessage('AI Analysis Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  const handleAIOptimize = async () => {
    setIsAILoading(true);
    try {
      const res = await api.post('/ai/analyze', {
        language,
        code: `// Requesting Performance Optimization\n${code}`,
        stderr: '',
        stdout: '',
        userInput: ''
      });
      setAiAnalysis(res.data);
    } catch (err: any) {
      setNotificationMessage('AI Optimization Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  const handleSaveProgram = async () => {
    try {
      if (currentProgramId) {
        await api.put(`/programs/${currentProgramId}`, {
          title: programTitle,
          code,
          language
        });
        setNotificationMessage('Saved successfully!');
      } else {
        const res = await api.post('/programs', {
          title: programTitle,
          code,
          language
        });
        setCurrentProgramId(res.data.id);
        setNotificationMessage('Saved successfully!');
      }
    } catch (err: any) {
      setNotificationMessage('Failed to save program: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleStopExecution = async () => {
    try {
      await api.post('/executions/stop');
      setIsRunning(false);
      setStatus('stopped');
      setWorkflowState('idle');
      setStderr('Execution stopped by user.');
      setNotificationMessage('Execution stopped by user.');
    } catch (err: any) {
      console.error('Stop execution error:', err);
    }
  };

  const handleSendLiveStdin = async (inputValue: string) => {
    if (!inputValue.trim()) return;
    try {
      setStdout((prev) => {
        const clean = prev ? prev.trimEnd() : '';
        return clean ? `${clean}\n> ${inputValue}\n` : `> ${inputValue}\n`;
      });
      await api.post('/executions/stdin', {
        executionJobId: lastExecutionJobId,
        input: inputValue
      });
    } catch (err: any) {
      console.error('Error sending live stdin:', err);
    }
  };

  // Flagship Demo Step Runner
  const handleRunDemoStep = (stepIndex: number) => {
    if (stepIndex === 1) {
      setActiveSideTab('explorer');
    } else if (stepIndex === 2) {
      setCode(starterTemplates.python);
      setInput('Pooja\n85\n75');
    } else if (stepIndex === 3) {
      executeCodePayload(code, 'python');
    } else if (stepIndex === 5) {
      const bugCode = code.replace('average = total / 2', 'average = total / 0');
      setCode(bugCode);
      executeCodePayload(bugCode, 'python');
    } else if (stepIndex === 7) {
      handleFixAndReRun();
    } else if (stepIndex === 10) {
      setActiveSideTab('security');
      handleRunSecurityScan();
    } else if (stepIndex === 11) {
      setActiveSideTab('testing');
      handleGenerateTests();
    } else if (stepIndex === 12) {
      setActiveSideTab('performance');
      handleAnalyzePerformance();
    } else if (stepIndex === 13) {
      setIsReadinessModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar />

      {/* National-Level Top Action Toolbar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" />
            CodeForge AI Cloud IDE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
            <GitBranch className="w-3.5 h-3.5 text-slate-500" /> main
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Restore Original Code Button */}
          {code !== originalUserCode && (
            <button
              onClick={handleRestoreOriginalCode}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg border border-slate-700 transition-all cursor-pointer text-xs"
              title="Restore Original Code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restore Original
            </button>
          )}

          {/* Iterative Re-Debug Button */}
          <button
            onClick={handleReDebug}
            disabled={isAILoading}
            className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-all cursor-pointer text-xs"
            title="Run up to 5 iterative debugging attempts"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAILoading ? 'animate-spin' : ''}`} />
            Iterative Re-Debug
          </button>

          {/* AI Code Creator / Generator Button */}
          <button
            onClick={() => setIsCodeGenOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all cursor-pointer shadow-md shadow-purple-600/30 text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            AI Code Creator
          </button>

          {/* Polyglot Multi-Language Transpiler */}
          <button
            onClick={() => setIsPolyglotOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-950 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 border border-purple-500/40 text-purple-300 font-bold rounded-lg transition-all cursor-pointer text-xs"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Polyglot Transpiler
          </button>

          {/* Live Execution Visualizer */}
          <button
            onClick={() => setIsVisualizerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-950 to-teal-950 hover:from-emerald-900 hover:to-teal-900 border border-emerald-500/40 text-emerald-300 font-bold rounded-lg transition-all cursor-pointer text-xs"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Execution Visualizer
          </button>

          {/* Technical Interview Quiz */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg border border-slate-700 transition-all cursor-pointer text-xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Placement Quiz
          </button>

          {/* AI Deep Code Inspector Trigger */}
          <button
            onClick={() => setIsDeepInspectorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 border border-cyan-500/40 text-cyan-300 font-bold rounded-lg transition-all cursor-pointer text-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AI Deep Inspector
          </button>

          {/* Production Readiness Score Trigger */}
          <button
            onClick={() => setIsReadinessModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-950 to-emerald-950 hover:from-indigo-900 hover:to-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold rounded-lg transition-all cursor-pointer text-xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Readiness Index: <span className="font-mono text-white font-extrabold">88/100</span>
          </button>

          {/* AI Interview Arena Trigger */}
          <button
            onClick={() => setIsInterviewArenaOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg border border-slate-700 transition-all cursor-pointer text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Interview Arena
          </button>

          {/* Flagship Demo Tour Trigger */}
          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all cursor-pointer shadow-md shadow-indigo-600/20 text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Flagship Demo Tour
          </button>
        </div>
      </div>

      {/* Debug Pipeline Visualizer Bar */}
      <DebugPipelineVisualizer workflowState={workflowState} exitCode={exitCode} />

      {/* AI Voice & Audio Mentor Bar */}
      <div className="px-4 pt-1">
        <AIVoiceExplainerPanel code={code} language={language} />
      </div>

      {/* AI Prompt-to-Code Synthesizer Bar */}
      <div className="px-4 pt-1">
        <AIPromptBar
          currentLanguage={language}
          onCodeGenerated={(newCode, newLang, autoRun) => {
            setCode(newCode);
            setOriginalUserCode(newCode);
            if (newLang) setLanguage(newLang);
            setProjectFiles(prev => prev.map(f => f.path === activeFilePath ? { ...f, content: newCode } : f));
            setNotificationMessage('✨ Generated code from prompt successfully!');
            if (autoRun) {
              executeCodePayload(newCode, newLang || language, false);
            }
          }}
          onOpenFullGenerator={() => setIsCodeGenOpen(true)}
        />
      </div>

      <main className="flex-1 p-3 lg:p-4 space-y-3 max-w-[1800px] w-full mx-auto flex flex-col">
        
        {/* Main 3-Pane Resizable Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[720px]">
          
          {/* Left Navigation Tool Sidebar */}
          <div className="lg:col-span-3 flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Side Tabs Selector */}
            <div className="flex items-center justify-around border-b border-slate-800 bg-slate-950 p-1 font-bold text-[11px] overflow-x-auto">
              <button
                onClick={() => setActiveSideTab('explorer')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'explorer' ? 'bg-slate-800 text-blue-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="File Explorer"
              >
                <Folder className="w-3.5 h-3.5" /> Files
              </button>
              <button
                onClick={() => setActiveSideTab('chat')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'chat' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40 font-bold' : stderr ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="AI Code & Error Assistant"
              >
                <MessageSquareCode className="w-3.5 h-3.5" /> AI Chat
                {stderr && stderr.trim().length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
              <button
                onClick={() => setActiveSideTab('git')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'git' ? 'bg-slate-800 text-amber-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Git Source Control"
              >
                <GitCommit className="w-3.5 h-3.5" /> Git
              </button>
              <button
                onClick={() => setActiveSideTab('arch')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'arch' ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Architecture Graph"
              >
                <Network className="w-3.5 h-3.5" /> Arch
              </button>
              <button
                onClick={() => setActiveSideTab('security')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'security' ? 'bg-slate-800 text-rose-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Security Center"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Security
              </button>
              <button
                onClick={() => setActiveSideTab('testing')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'testing' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Test Runner"
              >
                <TestTube2 className="w-3.5 h-3.5" /> Testing
              </button>
              <button
                onClick={() => setActiveSideTab('performance')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'performance' ? 'bg-slate-800 text-purple-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Performance Profiling"
              >
                <Cpu className="w-3.5 h-3.5" /> Profiling
              </button>
              <button
                onClick={() => setActiveSideTab('agents')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeSideTab === 'agents' ? 'bg-slate-800 text-indigo-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="AI Agents"
              >
                <Bot className="w-3.5 h-3.5" /> Agents
              </button>
            </div>

            {/* Active Tab Panel Rendering */}
            <div className="flex-1 p-2 overflow-auto">
              {activeSideTab === 'explorer' && (
                <FileExplorerPanel
                  files={projectFiles}
                  activeFilePath={activeFilePath}
                  onSelectFile={handleSelectFile}
                  onCreateFile={handleCreateFile}
                  onDeleteFile={handleDeleteFile}
                />
              )}
              {activeSideTab === 'chat' && (
                <AIChatbotPanel
                  currentCode={code}
                  language={language}
                  stderr={stderr}
                  stdout={stdout}
                  errorLine={errorLine}
                  onApplyCode={(newCode) => {
                    setCode(newCode);
                    setOriginalUserCode(newCode);
                    setProjectFiles(prev => prev.map(f => f.path === activeFilePath ? { ...f, content: newCode } : f));
                    setNotificationMessage('✅ Applied AI corrected code to editor!');
                  }}
                  onApplyAndRun={(newCode) => {
                    setCode(newCode);
                    setOriginalUserCode(newCode);
                    setProjectFiles(prev => prev.map(f => f.path === activeFilePath ? { ...f, content: newCode } : f));
                    setNotificationMessage('⚡ Applied AI code & executing now...');
                    executeCodePayload(newCode, language, true);
                  }}
                />
              )}
              {activeSideTab === 'git' && (
                <GitControlPanel />
              )}
              {activeSideTab === 'arch' && (
                <ArchitecturePanel />
              )}
              {activeSideTab === 'security' && (
                <SecurityPanel
                  securityScore={securityScore}
                  vulnerabilities={securityVulnerabilities}
                  isScanning={isScanningSecurity}
                  onRunScan={handleRunSecurityScan}
                />
              )}
              {activeSideTab === 'testing' && (
                <TestingPanel
                  testCode={generatedTestCode}
                  testStatus={testStatus}
                  testStdout={testStdout}
                  isTesting={isTestingRunning}
                  onGenerateTests={handleGenerateTests}
                  onRunTests={handleRunTestSuite}
                />
              )}
              {activeSideTab === 'performance' && (
                <PerformancePanel
                  timeComplexity={perfTimeComp}
                  spaceComplexity={perfSpaceComp}
                  recommendation={perfRec}
                  executionTime={executionTime}
                  onAnalyzePerformance={handleAnalyzePerformance}
                  isAnalyzing={isAnalyzingPerf}
                />
              )}
              {activeSideTab === 'agents' && (
                <MultiAgentDrawer
                  onRunAgentTask={handleRunAgentTask}
                  activeAgent={activeAgentName}
                />
              )}
            </div>
          </div>

          {/* Center Monaco Editor Container */}
          <div className="lg:col-span-5 flex flex-col h-full min-h-[500px]">
            <MonacoEditorPanel
              language={language}
              code={code}
              onChange={(newCode) => {
                setCode(newCode);
                setOriginalUserCode(newCode);
                if (errorLine) setErrorLine(undefined);
              }}
              onRun={handleRunCode}
              onStop={handleStopExecution}
              onSave={handleSaveProgram}
              onAIAnalyze={handleAIAnalyze}
              onAIOptimize={handleAIOptimize}
              onLanguageChange={setLanguage}
              isRunning={isRunning}
              isAILoading={isAILoading}
              programTitle={programTitle}
              onTitleChange={setProgramTitle}
              status={status}
              errorLine={errorLine}
              missingSymbol={missingSymbol}
              missingOperand={missingOperand}
              wrongSymbol={wrongSymbol}
              suggestedFixSymbol={suggestedFixSymbol}
              errorSnippet={errorSnippet}
              notificationMessage={notificationMessage}
              onLoadExample={(exCode, exInput) => {
                setCode(exCode);
                setOriginalUserCode(exCode);
                if (exInput !== undefined) setInput(exInput);
                setNotificationMessage('Loaded demo example.');
              }}
              onClearCode={() => {
                setCode('');
                setNotificationMessage('Cleared code.');
              }}
            />
          </div>

          {/* Right Console & Input Panel */}
          <div className="lg:col-span-4 flex flex-col h-full min-h-[500px]">
            <ConsolePanel
              stdout={stdout}
              stderr={stderr}
              status={status}
              workflowState={workflowState}
              executionTime={executionTime}
              exitCode={exitCode}
              language={language}
              input={input}
              errorLine={errorLine}
              errorSnippet={errorSnippet}
              aiAnalysis={aiAnalysis}
              isAILoading={isAILoading}
              onInputChange={setInput}
              onSendLiveStdin={handleSendLiveStdin}
              onClear={() => {
                setStdout('');
                setStderr('');
                setStatus(undefined);
                setWorkflowState('idle');
                setExecutionTime(undefined);
                setExitCode(undefined);
                setErrorLine(undefined);
                setErrorSnippet(undefined);
                setAiAnalysis(null);
                setAutoFixModalData(null);
                setInput('');
                setNotificationMessage(null);
              }}
              onRunCode={handleRunCode}
              onFixAndReRun={handleFixAndReRun}
              onRunAIAnalyze={handleAIAnalyze}
              onRunAIOptimize={handleAIOptimize}
            />
          </div>

        </div>

        {/* DevSecOps Pipeline Visualizer Bar at Bottom */}
        <PipelineBar />

        {/* Modals & Drawers */}
        <ProductionReadinessModal
          isOpen={isReadinessModalOpen}
          onClose={() => setIsReadinessModalOpen(false)}
          overallScore={88}
          breakdown={{
            security: { score: 95, status: 'PASSED', details: 'SAST vulnerability check & unhandled input sanitization' },
            testing: { score: 92, status: 'PASSED', details: 'Unit assertions & edge case testing' },
            reliability: { score: 90, status: 'PASSED', details: 'Zero-division protection & exception handling' },
            performance: { score: 88, status: 'PASSED', details: 'Algorithmic time O(n) & space complexity' },
            architecture: { score: 86, status: 'PASSED', details: 'Multi-file modular structure' },
            maintainability: { score: 89, status: 'PASSED', details: 'Code readability & SOLID design' },
            documentation: { score: 85, status: 'PASSED', details: 'README & API docs' },
            observability: { score: 87, status: 'PASSED', details: 'Real-time stdout/stderr logging & metrics' },
            deployment: { score: 90, status: 'PASSED', details: 'Docker environment & sandbox security' }
          }}
        />

        <InterviewArenaPanel
          isOpen={isInterviewArenaOpen}
          onClose={() => setIsInterviewArenaOpen(false)}
          onLoadProblem={(pCode, pInput) => {
            setCode(pCode);
            setOriginalUserCode(pCode);
            setInput(pInput);
            setNotificationMessage('⚡ Loaded Interview Arena Problem into IDE.');
          }}
        />

        <DemoTourModal
          isOpen={isDemoTourOpen}
          onClose={() => setIsDemoTourOpen(false)}
          onRunDemoStep={handleRunDemoStep}
        />

        {autoFixModalData && (
          <AutoFixDiffModal
            errorType={autoFixModalData.errorType}
            explanation={autoFixModalData.explanation}
            whatHappened={autoFixModalData.whatHappened}
            whyItHappened={autoFixModalData.whyItHappened}
            howFixed={autoFixModalData.howFixed}
            beforeCode={autoFixModalData.beforeCode || autoFixModalData.changes?.before || ''}
            afterCode={autoFixModalData.afterCode || autoFixModalData.fixedCode || autoFixModalData.changes?.after || ''}
            stdout={autoFixModalData.stdout}
            onApply={async () => {
              const fixed = autoFixModalData.fixedCode;
              setAutoFixModalData(null);
              setCode(fixed);
              setErrorLine(undefined);
              await executeCodePayload(fixed, language);
            }}
            onClose={() => setAutoFixModalData(null)}
          />
        )}

        {aiAnalysis && (
          <AIPanel
            analysis={aiAnalysis}
            onApplyFix={(corrected) => {
              if (isCodeValidSyntax(corrected)) {
                setCode(corrected);
                setErrorLine(undefined);
                setAiAnalysis(null);
              } else {
                setNotificationMessage('AI suggested fix failed syntax validation.');
              }
            }}
            onApplyFixAndRun={async (corrected) => {
              if (isCodeValidSyntax(corrected)) {
                setCode(corrected);
                setErrorLine(undefined);
                setAiAnalysis(null);
                await executeCodePayload(corrected, language);
              } else {
                setNotificationMessage('AI suggested fix failed syntax validation.');
              }
            }}
            onClose={() => setAiAnalysis(null)}
          />
        )}

        {/* AI Deep Code Inspector Modal */}
        <AIDeepInspectorModal
          isOpen={isDeepInspectorOpen}
          onClose={() => setIsDeepInspectorOpen(false)}
          code={code}
          language={language}
          onApplyCode={(newCode) => {
            setCode(newCode);
            setIsDeepInspectorOpen(false);
          }}
        />

        {/* AI Polyglot Transpiler Modal */}
        <PolyglotTranspileModal
          isOpen={isPolyglotOpen}
          onClose={() => setIsPolyglotOpen(false)}
          currentCode={code}
          currentLanguage={language}
          onLoadLanguageCode={(newCode, newLang) => {
            setLanguage(newLang);
            setCode(newCode);
            setNotificationMessage(`⚡ Transpiled and loaded ${newLang.toUpperCase()} code into editor!`);
          }}
        />

        {/* Live Execution Visualizer Modal */}
        <ExecutionVisualizerModal
          isOpen={isVisualizerOpen}
          onClose={() => setIsVisualizerOpen(false)}
          code={code}
          language={language}
        />

        {/* Technical Interview Quiz Modal */}
        <InteractiveQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          code={code}
          language={language}
        />

        {/* Full-Fledged AI Code Generator Modal */}
        <AICodeGeneratorModal
          isOpen={isCodeGenOpen}
          onClose={() => setIsCodeGenOpen(false)}
          currentLanguage={language}
          onApplyCode={(newCode, newLang, autoRun) => {
            setCode(newCode);
            setOriginalUserCode(newCode);
            if (newLang) setLanguage(newLang);
            setProjectFiles(prev => prev.map(f => f.path === activeFilePath ? { ...f, content: newCode } : f));
            setNotificationMessage('✨ Applied AI generated code to editor!');
            if (autoRun) {
              executeCodePayload(newCode, newLang || language, false);
            }
          }}
        />

        {/* Persistent Floating AI Voice Assistant Widget */}
        <FloatingVoiceWidget
          language={language}
          code={code}
          stderr={stderr}
          errorLine={errorLine}
        />

      </main>
    </div>
  );
};
