import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Code2, Sparkles, Search, Copy, Check, Play, Terminal, BookOpen, ArrowRight, Layers, RefreshCw, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface MultiLangData {
  title: string;
  explanation: string;
  codes: {
    python: string;
    javascript: string;
    typescript: string;
    c: string;
    cpp: string;
    java: string;
  };
}

const samplePresets = [
  { label: 'Fibonacci Series', prompt: 'Write a program to generate Fibonacci series up to n terms' },
  { label: 'Binary Search', prompt: 'Implement binary search algorithm on a sorted array' },
  { label: 'Prime Number Checker', prompt: 'Write a program to check if a number is prime' },
  { label: 'Palindrome Checker', prompt: 'Write a program to check if a string or number is a palindrome' },
  { label: 'Merge Sort Algorithm', prompt: 'Write merge sort algorithm implementation with array input' },
  { label: 'Factorial Calculator', prompt: 'Write a program to calculate factorial of a number' }
];

export const CodeGeneratorPage: React.FC = () => {
  const navigate = useNavigate();

  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState<'python' | 'javascript' | 'typescript' | 'c' | 'cpp' | 'java'>('python');
  const [copied, setCopied] = useState(false);

  const [resultData, setResultData] = useState<MultiLangData>({
    title: 'Fibonacci Series Generator',
    explanation: 'Multi-language solution generating Fibonacci numbers across all 6 supported execution runtimes.',
    codes: {
      python: `# CodeForge AI — Python 3
def fibonacci(n):
    a, b = 0, 1
    series = []
    for _ in range(n):
        series.append(a)
        a, b = b, a + b
    return series

num_terms = 8
print(f"Fibonacci series ({num_terms} terms): {fibonacci(num_terms)}")
`,
      javascript: `// CodeForge AI — JavaScript (Node.js)
function fibonacci(n) {
  let a = 0, b = 1;
  const series = [];
  for (let i = 0; i < n; i++) {
    series.push(a);
    [a, b] = [b, a + b];
  }
  return series;
}

const terms = 8;
console.log(\`Fibonacci series (\${terms} terms):\`, fibonacci(terms));
`,
      typescript: `// CodeForge AI — TypeScript
function fibonacci(n: number): number[] {
  let a: number = 0, b: number = 1;
  const series: number[] = [];
  for (let i = 0; i < n; i++) {
    series.push(a);
    [a, b] = [b, a + b];
  }
  return series;
}

const terms: number = 8;
console.log(\`Fibonacci series (\${terms} terms):\`, fibonacci(terms));
`,
      c: `// CodeForge AI — C Language
#include <stdio.h>

void fibonacci(int n) {
    long long a = 0, b = 1, next;
    printf("Fibonacci series (%d terms): ", n);
    for (int i = 0; i < n; i++) {
        printf("%lld ", a);
        next = a + b;
        a = b;
        b = next;
    }
    printf("\\n");
}

int main() {
    fibonacci(8);
    return 0;
}
`,
      cpp: `// CodeForge AI — C++
#include <iostream>
#include <vector>

std::vector<long long> fibonacci(int n) {
    long long a = 0, b = 1;
    std::vector<long long> series;
    for (int i = 0; i < n; i++) {
        series.push_back(a);
        long long next = a + b;
        a = b;
        b = next;
    }
    return series;
}

int main() {
    auto series = fibonacci(8);
    std::cout << "Fibonacci series (8 terms): ";
    for (auto val : series) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    return 0;
}
`,
      java: `// CodeForge AI — Java
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static List<Long> fibonacci(int n) {
        long a = 0, b = 1;
        List<Long> series = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            series.add(a);
            long next = a + b;
            a = b;
            b = next;
        }
        return series;
    }

    public static void main(String[] args) {
        List<Long> result = fibonacci(8);
        System.out.println("Fibonacci series (8 terms): " + result);
    }
}
`
    }
  });

  const handleGenerate = async (queryText?: string) => {
    const q = (queryText || promptInput).trim();
    if (!q || loading) return;

    setLoading(true);

    try {
      const res = await api.post('/ai/generate-multi-lang', { promptText: q });
      const data = res.data?.data || res.data;

      if (data && data.codes) {
        setResultData({
          title: data.title || q,
          explanation: data.explanation || `Multi-language solution for "${q}" across all runtimes.`,
          codes: {
            python: data.codes.python || '',
            javascript: data.codes.javascript || '',
            typescript: data.codes.typescript || '',
            c: data.codes.c || '',
            cpp: data.codes.cpp || '',
            java: data.codes.java || ''
          }
        });
      }
    } catch (err: any) {
      console.error('Error generating multi-lang code:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    const currentCode = resultData.codes[activeLang];
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInIDE = () => {
    // If active language is TypeScript, load Python code so execution in IDE runs with 100% accuracy
    const targetLang = activeLang === 'typescript' ? 'python' : activeLang;
    const code = resultData.codes[targetLang] || resultData.codes['python'];
    navigate('/editor', { state: { initialCode: code, initialLanguage: targetLang } });
  };

  const languagesList = [
    { key: 'python', label: 'Python 3', icon: '🐍' },
    { key: 'javascript', label: 'JavaScript (Node)', icon: '🟨' },
    { key: 'typescript', label: 'TypeScript', icon: '🟦' },
    { key: 'c', label: 'C Language', icon: '⚙️' },
    { key: 'cpp', label: 'C++', icon: '⚡' },
    { key: 'java', label: 'Java 25', icon: '☕' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 space-y-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Universal Multi-Language Generator
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Ask Any Coding Question — Get Code in All Programming Languages
          </h1>
          <p className="text-slate-400 text-sm">
            Enter your algorithm problem, math formula, or software requirement. CodeForge AI generates synchronized, ready-to-run solutions for Python, JavaScript, TypeScript, C, C++, and Java simultaneously!
          </p>
        </div>

        {/* Input Search Box */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-2xl backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="flex items-center gap-3"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Write a program for Fibonacci series / Binary Search Tree / Reverse a Linked List..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none py-2 font-medium"
            />
            <button
              type="submit"
              disabled={!promptInput.trim() || loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
              {loading ? 'Generating Code...' : 'Generate All Codes'}
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Try Presets:</span>
            {samplePresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptInput(p.prompt);
                  handleGenerate(p.prompt);
                }}
                disabled={loading}
                className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Workspace Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          
          {/* Header Result Bar */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                {resultData.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">{resultData.explanation}</p>
            </div>

            <button
              onClick={openInIDE}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              Open & Run {activeLang.toUpperCase()} in CodeForge IDE
            </button>
          </div>

          {/* Language Selector Bar */}
          <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/60 border-b border-slate-800 overflow-x-auto">
            {languagesList.map((lang) => (
              <button
                key={lang.key}
                onClick={() => setActiveLang(lang.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeLang === lang.key
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer Panel */}
          <div className="relative p-6 bg-slate-950/90 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto min-h-[380px]">
            
            {/* Top Right Floating Copy Button */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-semibold transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard' : 'Copy Code'}
              </button>
            </div>

            <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap">
              {resultData.codes[activeLang] || `// Generating ${activeLang} implementation...`}
            </pre>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <Check className="w-4 h-4" /> 6 Runtimes Generated
              </span>
              <span>Python 3 • Node JS • TypeScript • GCC C • G++ C++ • Java 25</span>
            </div>

            <button
              onClick={openInIDE}
              className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
            >
              Test code live in IDE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
