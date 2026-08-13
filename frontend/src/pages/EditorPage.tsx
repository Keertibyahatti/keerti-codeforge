import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { MonacoEditorPanel, starterTemplates } from '../components/MonacoEditorPanel';
import { ConsolePanel } from '../components/ConsolePanel';
import { AIPanel } from '../components/AIPanel';
import api from '../services/api';
import { AIAnalysisResponse } from '../types';
import { isCodeValidSyntax } from '../utils/validation';

export const EditorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const programIdParam = searchParams.get('programId');

  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>(starterTemplates.python);
  const [input, setInput] = useState<string>('1');
  const [programTitle, setProgramTitle] = useState<string>('Untitled Program');
  const [currentProgramId, setCurrentProgramId] = useState<string | null>(programIdParam);

  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [executionTime, setExecutionTime] = useState<number | undefined>(undefined);
  const [exitCode, setExitCode] = useState<number | undefined>(undefined);
  const [lastExecutionId, setLastExecutionId] = useState<string | undefined>(undefined);

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

  // Clear toast notifications after 5 seconds
  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => setNotificationMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  // Check state from navigation (e.g. from Executions Page rerun)
  useEffect(() => {
    if (location.state && (location.state as any).code) {
      const stateObj = location.state as { code: string; language: string };
      if (stateObj.code) setCode(stateObj.code);
      if (stateObj.language) setLanguage(stateObj.language.toLowerCase());
    }
  }, [location.state]);

  // Load existing program if programId URL parameter is provided
  useEffect(() => {
    if (programIdParam) {
      const fetchProgram = async () => {
        try {
          const res = await api.get(`/programs/${programIdParam}`);
          const prog = res.data.program;
          if (prog) {
            setProgramTitle(prog.title);
            setLanguage(prog.language);
            setCode(prog.code);
            setCurrentProgramId(prog.id);
          }
        } catch (err) {
          console.error('Failed to load program:', err);
        }
      };
      fetchProgram();
    }
  }, [programIdParam]);

  // Smart Language Auto-Detection helper
  const detectAndGetTargetLanguage = (inputCode: string, currentLang: string): string => {
    const trimmed = inputCode.trim();
    if (trimmed.includes('console.log') || trimmed.includes('const ') || trimmed.includes('let ') || (trimmed.includes('function ') && !trimmed.includes('def '))) {
      return 'javascript';
    }
    if (trimmed.includes('#include <stdio.h>') || trimmed.includes('printf(')) {
      return 'c';
    }
    if (trimmed.includes('#include <iostream>') || trimmed.includes('std::cout')) {
      return 'cpp';
    }
    if (trimmed.includes('public class') || trimmed.includes('System.out.println')) {
      return 'java';
    }
    return currentLang;
  };

  // Execute Code Core Action
  const executeCodePayload = async (targetCode: string, targetLanguage: string) => {
    setIsRunning(true);
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
    setAiAnalysis(null);

    const activeLanguage = detectAndGetTargetLanguage(targetCode, targetLanguage);
    if (activeLanguage !== language) {
      setLanguage(activeLanguage);
    }

    try {
      const res = await api.post('/executions', {
        language: activeLanguage,
        code: targetCode,
        input,
        programId: currentProgramId || undefined
      });

      const {
        executionId,
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
    } catch (err: any) {
      setStatus('error');
      setStderr(err.response?.data?.message || err.message || 'Execution error');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunCode = () => {
    executeCodePayload(code, language);
  };

  // Quick Auto-Fix Action for incomplete lines, missing parameters & mistake symbols
  const getFixedCode = (): string | null => {
    let candidate: string | null = null;

    // Fix truncated factorial line if present
    if (code.includes('print(f"Factorial of {num} is {calculate_factor')) {
      candidate = code.replace(/print\(f"Factorial of \{num\} is \{calculate_factor.*/, 'print(f"Factorial of {num} is {calculate_factorial(num)}")');
    } else if (code.includes('def calculate_factorial():')) {
      candidate = code.replace('def calculate_factorial():', 'def calculate_factorial(n):');
    } else if (errorLine && errorLine > 0) {
      const lines = code.split('\n');
      const targetIdx = errorLine - 1;

      if (targetIdx < lines.length) {
        let lineText = lines[targetIdx];

        if (lineText.includes('def calculate_factorial():')) {
          lineText = lineText.replace('def calculate_factorial():', 'def calculate_factorial(n):');
        } else if (wrongSymbol && suggestedFixSymbol) {
          if (wrongSymbol === '=' && suggestedFixSymbol === '==') {
            lineText = lineText.replace(/=\s*/g, '== ');
          } else {
            lineText = lineText.replace(wrongSymbol, suggestedFixSymbol);
          }
        } else if (wrongSymbol && (wrongSymbol === 'nu' || wrongSymbol === 'num' || status === 'runtime_error')) {
          if (lineText.trim() === 'nu') {
            lineText = 'num = int(input("Enter a number: "))';
          } else {
            lineText = 'num = int(input("Enter a number: "))\n' + lineText;
          }
        } else if (missingOperand) {
          lineText = lineText.trimEnd() + ' 1' + (missingSymbol || ')');
        } else if (missingSymbol) {
          lineText = lineText + missingSymbol;
        }

        lines[targetIdx] = lineText;
        candidate = lines.join('\n');
      }
    }

    if (candidate && isCodeValidSyntax(candidate)) {
      return candidate;
    }
    return null;
  };

  const handleApplyQuickFix = () => {
    const fixed = getFixedCode();
    if (fixed) {
      setCode(fixed);
      setErrorLine(undefined);
      setMissingSymbol(undefined);
      setMissingOperand(undefined);
      setWrongSymbol(undefined);
      setSuggestedFixSymbol(undefined);
    } else {
      setNotificationMessage('Auto-Fix generated incomplete code. Your original code was preserved.');
    }
  };

  // ⚡ Fix & Re-Run Program Handler
  const handleFixAndReRun = async () => {
    const quickFixedCode = getFixedCode();
    if (quickFixedCode) {
      setCode(quickFixedCode);
      await executeCodePayload(quickFixedCode, language);
      return;
    }

    // Fallback to AI Analysis Fix & Run
    setIsAILoading(true);
    try {
      const res = await api.post('/ai/analyze', {
        language,
        code,
        stderr: stderr || 'Error occurred during execution.',
        stdout,
        userInput: input,
        executionId: lastExecutionId
      });
      const aiResult: AIAnalysisResponse = res.data;
      if (aiResult.correctedCode && isCodeValidSyntax(aiResult.correctedCode)) {
        setCode(aiResult.correctedCode);
        setAiAnalysis(null);
        await executeCodePayload(aiResult.correctedCode, language);
      } else {
        setNotificationMessage('AI suggested fix failed syntax validation. Your original code was preserved.');
      }
    } catch (err: any) {
      setNotificationMessage('Auto-Fix failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  // AI Error Analysis Action
  const handleAIAnalyze = async () => {
    setIsAILoading(true);
    try {
      const res = await api.post('/ai/analyze', {
        language,
        code,
        stderr: stderr || 'No error logged.',
        stdout,
        userInput: input,
        executionId: lastExecutionId
      });
      setAiAnalysis(res.data);
    } catch (err: any) {
      setNotificationMessage('AI Analysis failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  // AI Optimization Action
  const handleAIOptimize = async () => {
    setIsAILoading(true);
    try {
      const res = await api.post('/ai/optimize', {
        language,
        code,
        stdout,
        userInput: input
      });
      setAiAnalysis(res.data);
    } catch (err: any) {
      setNotificationMessage('AI Optimization failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsAILoading(false);
    }
  };

  // Save Program Action
  const handleSaveProgram = async () => {
    try {
      if (currentProgramId) {
        await api.put(`/programs/${currentProgramId}`, {
          title: programTitle,
          language,
          code,
          createNewVersion: true
        });
        setNotificationMessage('Program and new code version saved!');
      } else {
        const res = await api.post('/programs', {
          title: programTitle,
          language,
          code
        });
        setCurrentProgramId(res.data.program.id);
        setNotificationMessage('New program saved to your account!');
      }
    } catch (err: any) {
      setNotificationMessage('Failed to save program. Make sure you are logged in.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 lg:p-6 space-y-4 max-w-[1700px] w-full mx-auto flex flex-col">
        
        {/* Main Split Grid: Editor (Top / Left) and Console (Bottom / Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[700px]">
          
          {/* Monaco Editor Container (8 cols on large screens) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full min-h-[500px]">
            <MonacoEditorPanel
              language={language}
              code={code}
              onChange={(newCode) => {
                setCode(newCode);
                if (errorLine) setErrorLine(undefined);
              }}
              onRun={handleRunCode}
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
              onApplyQuickFix={handleApplyQuickFix}
            />
          </div>

          {/* Console & Input Panel (5 cols on large screens) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full min-h-[500px]">
            <ConsolePanel
              stdout={stdout}
              stderr={stderr}
              status={status}
              executionTime={executionTime}
              exitCode={exitCode}
              input={input}
              onInputChange={setInput}
              onClear={() => {
                setStdout('');
                setStderr('');
                setStatus(undefined);
                setExecutionTime(undefined);
                setErrorLine(undefined);
                setNotificationMessage(null);
              }}
              onFixAndReRun={handleFixAndReRun}
            />
          </div>

        </div>

        {/* AI Analysis Drawer / Card Component */}
        {aiAnalysis && (
          <AIPanel
            analysis={aiAnalysis}
            onApplyFix={(corrected) => {
              if (isCodeValidSyntax(corrected)) {
                setCode(corrected);
                setErrorLine(undefined);
                setAiAnalysis(null);
              } else {
                setNotificationMessage('AI suggested fix failed syntax validation. Code was not modified.');
              }
            }}
            onApplyFixAndRun={async (corrected) => {
              if (isCodeValidSyntax(corrected)) {
                setCode(corrected);
                setErrorLine(undefined);
                setAiAnalysis(null);
                await executeCodePayload(corrected, language);
              } else {
                setNotificationMessage('AI suggested fix failed syntax validation. Code was not modified.');
              }
            }}
            onClose={() => setAiAnalysis(null)}
          />
        )}

      </main>
    </div>
  );
};
