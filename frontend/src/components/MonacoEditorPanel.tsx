import React, { useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Play, Square, Save, Sparkles, Wand2, RefreshCw, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

interface MonacoEditorPanelProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onStop?: () => void;
  onSave: () => void;
  onAIAnalyze: () => void;
  onAIOptimize: () => void;
  onLanguageChange: (lang: string) => void;
  isRunning: boolean;
  isAILoading: boolean;
  programTitle?: string;
  onTitleChange?: (title: string) => void;
  status?: string;
  errorLine?: number;
  missingSymbol?: string;
  missingOperand?: string;
  wrongSymbol?: string;
  suggestedFixSymbol?: string;
  errorSnippet?: string;
  onApplyQuickFix?: () => void;
}

export const starterTemplates: Record<string, string> = {
  python: `# CodeForge AI — Python Runner

def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")
`,
  javascript: `// CodeForge AI — JavaScript / Node.js Runner
function processData(items) {
  const doubled = items.map(x => x * 2);
  return doubled.filter(x => x > 10);
}

const numbers = [2, 5, 8, 12, 15];
console.log("Input numbers:", numbers);
console.log("Filtered result:", processData(numbers));
`,
  c: `// CodeForge AI — C Language Runner
#include <stdio.h>

int main() {
    printf("Hello CodeForge AI from C!\\n");
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("Sum of 1 to 10 = %d\\n", sum);
    return 0;
}
`,
  cpp: `// CodeForge AI — C++ Runner
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::cout << "Hello CodeForge AI from C++17!" << std::endl;
    std::vector<int> data = {10, 20, 30, 40, 50};
    int total = std::accumulate(data.begin(), data.end(), 0);
    std::cout << "Vector total: " << total << std::endl;
    return 0;
}
`,
  java: `// CodeForge AI — Java Runner
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello CodeForge AI from Java!");
        String[] languages = {"Python", "JavaScript", "C", "C++", "Java"};
        System.out.println("Supported Runtimes:");
        for (String lang : languages) {
            System.out.println(" - " + lang);
        }
    }
}
`
};

export const MonacoEditorPanel: React.FC<MonacoEditorPanelProps> = ({
  language,
  code,
  onChange,
  onRun,
  onStop,
  onSave,
  onAIAnalyze,
  onAIOptimize,
  onLanguageChange,
  isRunning,
  isAILoading,
  programTitle,
  onTitleChange,
  status,
  errorLine,
  missingSymbol,
  missingOperand,
  wrongSymbol,
  suggestedFixSymbol,
  errorSnippet,
  onApplyQuickFix
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    monaco.editor.setTheme('vs-dark');

    // Register Keybindings: Ctrl+Enter (Run) & Ctrl+S (Save)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave();
    });
  };

  // Dynamically set Error Line markers in Monaco Editor when an error occurs
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (!model) return;

      if (errorLine && errorLine > 0) {
        let msg = `Error on Line ${errorLine}`;
        if (status === 'syntax_error') {
          if (missingOperand && missingSymbol) {
            msg = `Syntax Error on Line ${errorLine}: Incomplete expression — missing number '${missingOperand}' and closing symbol '${missingSymbol}'`;
          } else if (wrongSymbol && suggestedFixSymbol) {
            msg = `Syntax Error on Line ${errorLine}: Invalid symbol '${wrongSymbol}'. Did you mean '${suggestedFixSymbol}'?`;
          } else if (missingSymbol) {
            msg = `Syntax Error on Line ${errorLine}: Missing closing symbol '${missingSymbol}'`;
          } else {
            msg = `Syntax Error on Line ${errorLine}: Check statement syntax`;
          }
        } else if (status === 'runtime_error') {
          if (wrongSymbol) {
            msg = `Runtime Error (NameError) on Line ${errorLine}: Variable '${wrongSymbol}' is not defined`;
          } else {
            msg = `Runtime Error on Line ${errorLine}: Unhandled exception during execution`;
          }
        } else if (status === 'compilation_error') {
          msg = `Compilation Error on Line ${errorLine}`;
        }

        monacoRef.current.editor.setModelMarkers(model, 'codeforge-syntax', [
          {
            startLineNumber: errorLine,
            endLineNumber: errorLine,
            startColumn: 1,
            endColumn: 100,
            message: msg,
            severity: monacoRef.current.MarkerSeverity.Error
          }
        ]);
        editorRef.current.revealLineInCenter(errorLine);
      } else {
        monacoRef.current.editor.setModelMarkers(model, 'codeforge-syntax', []);
      }
    }
  }, [status, errorLine, missingSymbol, missingOperand, wrongSymbol, suggestedFixSymbol]);

  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'c': return 'c';
      case 'cpp': case 'c++': return 'cpp';
      case 'java': return 'java';
      case 'javascript': case 'js': return 'javascript';
      case 'python': default: return 'python';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      
      {/* Editor Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
        
        {/* Title & Language Selector */}
        <div className="flex items-center gap-3">
          {onTitleChange && (
            <input
              type="text"
              value={programTitle || 'Untitled Program'}
              onChange={(e) => onTitleChange(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-blue-500 text-xs font-semibold px-2.5 py-1 rounded-md text-slate-200 focus:outline-none max-w-[180px]"
            />
          )}

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-400">Language:</label>
            <select
              value={language}
              onChange={(e) => {
                const newLang = e.target.value;
                onLanguageChange(newLang);
                if (!code || code === starterTemplates[language]) {
                  onChange(starterTemplates[newLang] || '');
                }
              }}
              className="bg-slate-900 border border-slate-700 text-xs font-bold text-blue-400 rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="python">Python 3</option>
              <option value="javascript">JavaScript (Node)</option>
              <option value="c">C (GCC)</option>
              <option value="cpp">C++ (G++)</option>
              <option value="java">Java 25</option>
            </select>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2">
          
          {/* Run Code Button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            title="Run Code (Ctrl+Enter)"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs shadow-md transition-all ${
              isRunning
                ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Code
              </>
            )}
          </button>

          {/* Stop Button */}
          {isRunning && onStop && (
            <button
              onClick={onStop}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
              title="Terminate Execution Process"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              Stop
            </button>
          )}

          {/* Save Button */}
          <button
            onClick={onSave}
            title="Save Program (Ctrl+S)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            Save
          </button>

          {/* AI Analyze Button */}
          <button
            onClick={onAIAnalyze}
            disabled={isAILoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Analyze
          </button>

          {/* AI Optimize Button */}
          <button
            onClick={onAIOptimize}
            disabled={isAILoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-cyan-300" />
            Optimize
          </button>
        </div>

      </div>

      {/* Interactive Error Highlight Banner */}
      {errorLine && errorLine > 0 && (
        <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-b border-rose-500/40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold text-white bg-rose-600 px-2 py-0.5 rounded text-[11px] mr-2">
                Line {errorLine}
              </span>
              {status === 'syntax_error' ? (
                missingOperand && missingSymbol ? (
                  <span>
                    Syntax Error — Missing number <code className="bg-amber-900 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">{missingOperand}</code> after operator and closing symbol <code className="bg-amber-900 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">{missingSymbol}</code>
                  </span>
                ) : wrongSymbol && suggestedFixSymbol ? (
                  <span>
                    Syntax Error — Invalid symbol <code className="bg-rose-900 px-1.5 py-0.5 rounded text-rose-300 font-mono font-bold">{wrongSymbol}</code> — Did you mean <code className="bg-emerald-900 px-1.5 py-0.5 rounded text-emerald-300 font-mono font-bold">{suggestedFixSymbol}</code>?
                  </span>
                ) : missingSymbol ? (
                  <span>
                    Syntax Error — Missing closing symbol <code className="bg-amber-900 px-1.5 py-0.5 rounded text-amber-300 font-mono font-bold">{missingSymbol}</code> in statement
                  </span>
                ) : (
                  <span>Syntax error detected on Line {errorLine}</span>
                )
              ) : status === 'runtime_error' ? (
                wrongSymbol ? (
                  <span>
                    Runtime Error (NameError) — Variable <code className="bg-rose-900 px-1.5 py-0.5 rounded text-rose-300 font-mono font-bold">{wrongSymbol}</code> is undefined
                  </span>
                ) : (
                  <span>Runtime Error detected on Line {errorLine}</span>
                )
              ) : status === 'compilation_error' ? (
                <span>Compilation Error detected on Line {errorLine}</span>
              ) : (
                <span>Execution error on Line {errorLine}</span>
              )}
            </div>
          </div>

          {/* Quick Auto-Fix Action Button */}
          {onApplyQuickFix && (suggestedFixSymbol || missingSymbol || missingOperand || wrongSymbol) && (
            <button
              onClick={onApplyQuickFix}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all border border-emerald-400/30 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              Auto-Fix Line {errorLine} ({wrongSymbol && !suggestedFixSymbol ? `Declare '${wrongSymbol}'` : missingOperand ? `Add '${missingOperand}${missingSymbol || ''}'` : suggestedFixSymbol ? `'${wrongSymbol}' → '${suggestedFixSymbol}'` : `Add '${missingSymbol}'`})
            </button>
          )}
        </div>
      )}

      {/* Editor Main Canvas */}
      <div className="flex-1 min-h-[400px] relative">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true }
          }}
        />
      </div>

    </div>
  );
};
