import React, { useRef, useEffect, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Play, Square, Save, Sparkles, Wand2, RefreshCw, AlertTriangle, Zap, CheckCircle2, Info, Maximize2, Minimize2, Type, WrapText, Copy, Trash2, BookOpen } from 'lucide-react';

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
  notificationMessage?: string | null;
  onApplyQuickFix?: () => void;
  onLoadExample?: (code: string, defaultInput?: string) => void;
  onClearCode?: () => void;
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

export const demoExamples: Record<string, { label: string; lang: string; code: string; defaultInput: string }[]> = {
  python: [
    {
      label: 'Factorial Calculator',
      lang: 'python',
      defaultInput: '5',
      code: `def calculate_factorial(n):
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

num = int(input("Enter a number: "))
print(f"Factorial of {num} is {calculate_factorial(num)}")
`
    },
    {
      label: 'Fibonacci Series',
      lang: 'python',
      defaultInput: '8',
      code: `def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

n = int(input("Enter number of terms: "))
print(f"Fibonacci series ({n} terms): {fibonacci(n)}")
`
    },
    {
      label: 'Prime Number Checker',
      lang: 'python',
      defaultInput: '29',
      code: `def is_prime(num):
    if num <= 1:
        return False
    for i in range(2, int(num**0.5) + 1):
        if num % i == 0:
            return False
    return True

num = int(input("Enter a number: "))
if is_prime(num):
    print(f"{num} is a Prime Number!")
else:
    print(f"{num} is NOT a Prime Number.")
`
    },
    {
      label: 'Palindrome Checker',
      lang: 'python',
      defaultInput: 'madam',
      code: `text = input("Enter word: ")
cleaned = text.lower().replace(" ", "")
if cleaned == cleaned[::-1]:
    print(f"'{text}' is a Palindrome!")
else:
    print(f"'{text}' is NOT a Palindrome.")
`
    },
    {
      label: 'Interactive Calculator',
      lang: 'python',
      defaultInput: '10\n20',
      code: `a = float(input("Enter first number: "))
b = float(input("Enter second number: "))

print(f"Addition: {a + b}")
print(f"Subtraction: {a - b}")
print(f"Multiplication: {a * b}")
if b != 0:
    print(f"Division: {a / b}")
else:
    print("Division: Cannot divide by zero")
`
    }
  ],
  javascript: [
    {
      label: 'Array Processing',
      lang: 'javascript',
      defaultInput: '',
      code: `function processData(items) {
  const doubled = items.map(x => x * 2);
  return doubled.filter(x => x > 10);
}

const numbers = [2, 5, 8, 12, 15];
console.log("Input numbers:", numbers);
console.log("Filtered result:", processData(numbers));
`
    },
    {
      label: 'Interactive Calculator',
      lang: 'javascript',
      defaultInput: '15\n25',
      code: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Enter num1: ', (n1) => {
  rl.question('Enter num2: ', (n2) => {
    const a = Number(n1), b = Number(n2);
    console.log("Sum:", a + b);
    console.log("Product:", a * b);
    rl.close();
  });
});
`
    },
    {
      label: 'Palindrome Checker',
      lang: 'javascript',
      defaultInput: 'racecar',
      code: `const str = "racecar";
const reversed = str.split("").reverse().join("");
console.log("Original:", str);
console.log("Is Palindrome?:", str === reversed);
`
    }
  ],
  java: [
    {
      label: 'Student Grade Calculator',
      lang: 'java',
      defaultInput: '',
      code: `public class Main {
    public static void main(String[] args) {
        String name = "Pooja";
        double maths = 85.0;
        double science = 75.0;
        double total = maths + science;
        double avg = total / 2.0;

        System.out.println("=== Student Grade Calculator ===");
        System.out.println("Student: " + name);
        System.out.println("Total: " + total);
        System.out.println("Average: " + avg);
        System.out.println("Grade: " + (avg >= 75 ? "A" : "B"));
    }
}
`
    }
  ],
  c: [
    {
      label: 'Array Operations',
      lang: 'c',
      defaultInput: '',
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = 5;
    int sum = 0;
    for(int i = 0; i < n; i++) {
        sum += arr[i];
    }
    printf("Array Sum = %d\\n", sum);
    printf("Array Average = %.2f\\n", (float)sum / n);
    return 0;
}
`
    }
  ],
  cpp: [
    {
      label: 'Vector Sorting',
      lang: 'cpp',
      defaultInput: '',
      code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {45, 12, 89, 23, 7};
    std::sort(nums.begin(), nums.end());
    std::cout << "Sorted Vector: ";
    for(int n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    return 0;
}
`
    }
  ]
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
  notificationMessage,
  onApplyQuickFix,
  onLoadExample,
  onClearCode
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const [fontSize, setFontSize] = useState<number>(14);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    monaco.editor.defineTheme('codeforge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'function', foreground: 'DCDCAA' }
      ],
      colors: {
        'editor.background': '#0B0F19',
        'editor.foreground': '#E2E8F0',
        'editor.lineHighlightBackground': '#1E293B50',
        'editorCursor.foreground': '#38BDF8',
        'editorWhitespace.foreground': '#334155',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#94A3B8'
      }
    });

    monaco.editor.setTheme('codeforge-dark');
  };

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      if (!model) return;

      if (errorLine && errorLine > 0 && status !== 'success') {
        let msg = `Execution error on Line ${errorLine}`;

        if (status === 'syntax_error') {
          if (suggestedFixSymbol) {
            msg = `Syntax Error on Line ${errorLine}: Missing '${suggestedFixSymbol}' near '${errorSnippet || ''}'`;
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
        try {
          editorRef.current.revealLineInCenter(errorLine);
        } catch {}
      } else {
        monacoRef.current.editor.setModelMarkers(model, 'codeforge-syntax', []);
      }
    }
  }, [status, errorLine, missingSymbol, missingOperand, wrongSymbol, suggestedFixSymbol, errorSnippet]);

  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'c': return 'c';
      case 'cpp': case 'c++': return 'cpp';
      case 'java': return 'java';
      case 'javascript': case 'js': return 'javascript';
      case 'python': default: return 'python';
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentExamples = demoExamples[language.toLowerCase()] || demoExamples.python;

  return (
    <div className={`flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : ''}`}>
      
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

          {/* Load Demo Example Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <select
              onChange={(e) => {
                const idx = Number(e.target.value);
                if (isNaN(idx)) return;
                const ex = currentExamples[idx];
                if (ex && onLoadExample) {
                  onLoadExample(ex.code, ex.defaultInput);
                } else if (ex) {
                  onChange(ex.code);
                }
              }}
              defaultValue=""
              className="bg-transparent text-xs font-semibold text-slate-300 focus:outline-none cursor-pointer max-w-[140px]"
            >
              <option value="" disabled className="bg-slate-900">Load Example...</option>
              {currentExamples.map((ex, i) => (
                <option key={ex.label} value={i} className="bg-slate-900">
                  {ex.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex items-center gap-2">
          
          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            title="Copy Code"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            <Copy className={`w-3.5 h-3.5 ${copied ? 'text-emerald-400' : ''}`} />
          </button>

          {/* Clear Code */}
          <button
            onClick={() => onClearCode ? onClearCode() : onChange('')}
            title="Clear Code"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg text-slate-300 text-xs">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value={12} className="bg-slate-900">12px</option>
              <option value={14} className="bg-slate-900">14px</option>
              <option value={16} className="bg-slate-900">16px</option>
              <option value={18} className="bg-slate-900">18px</option>
            </select>
          </div>

          {/* Word Wrap Toggle */}
          <button
            onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
            title="Toggle Word Wrap"
            className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              wordWrap === 'on'
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Run Code Button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            title="Run Code (Ctrl+Enter)"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-bold text-xs shadow-md transition-all ${
              isRunning
                ? 'bg-emerald-700 text-slate-300 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 cursor-pointer'
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
                Run
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-blue-400" />
            Save
          </button>

          {/* AI Debug Button */}
          <button
            onClick={onAIAnalyze}
            disabled={isAILoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI Debug
          </button>
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize,
            wordWrap,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            renderLineHighlight: 'all'
          }}
        />
      </div>

      {/* Toast Notification Bar */}
      {notificationMessage && (
        <div className="px-4 py-2 bg-blue-900/90 border-t border-blue-700 text-blue-100 text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-300" />
            {notificationMessage}
          </span>
        </div>
      )}
    </div>
  );
};
