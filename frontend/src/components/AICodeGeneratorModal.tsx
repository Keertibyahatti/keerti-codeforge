import React, { useState } from 'react';
import { X, Sparkles, Play, Copy, Check, Wand2, Terminal, Cpu, ArrowRight, BookOpen, Layers, CheckCircle2, RefreshCw, Send, Zap, Award, Volume2, Globe } from 'lucide-react';
import api from '../services/api';

interface AICodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string;
  onApplyCode: (generatedCode: string, lang: string, autoRun?: boolean) => void;
}

interface MultiLangCodes {
  python?: string;
  javascript?: string;
  typescript?: string;
  cpp?: string;
  c?: string;
  java?: string;
}

interface GeneratedResult {
  title: string;
  language: string;
  generatedCode: string;
  multiLangCodes?: MultiLangCodes;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  sampleInput: string;
  sampleOutput: string;
  keyFeatures: string[];
  testCases?: any[];
}

const SUPPORTED_LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷' },
  { id: 'cpp', label: 'C++', icon: '⚡' },
  { id: 'c', label: 'C', icon: '⚙️' },
  { id: 'java', label: 'Java', icon: '☕' }
];

export const AICodeGeneratorModal: React.FC<AICodeGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'python',
  onApplyCode
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<string>(currentLanguage);
  const [activeResultLang, setActiveResultLang] = useState<string>(currentLanguage);
  const [complexity, setComplexity] = useState<'optimal' | 'readable' | 'advanced'>('optimal');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'code' | 'guide' | 'tests'>('code');

  if (!isOpen) return null;

  const presetPrompts = [
    { label: 'Binary Search Tree', prompt: 'Create a Binary Search Tree with insert, search, and in-order traversal', lang: 'python' },
    { label: 'LRU Cache', prompt: 'Build a Least Recently Used (LRU) Cache with get and put in O(1) time', lang: 'python' },
    { label: 'Merge Sort', prompt: 'Implement Merge Sort divide-and-conquer algorithm with step-by-step comments', lang: 'cpp' },
    { label: 'Two Sum Optimal', prompt: 'Solve Two Sum problem using an optimal single-pass hash map', lang: 'javascript' },
    { label: 'Dijkstra Shortest Path', prompt: "Implement Dijkstra's shortest path algorithm using a priority queue min-heap", lang: 'python' },
    { label: 'Singly Linked List', prompt: 'Implement a singly linked list with node appending and in-place reversal', lang: 'python' },
    { label: 'Dynamic Fibonacci', prompt: 'Calculate nth Fibonacci number using top-down memoization dynamic programming', lang: 'java' },
    { label: 'Matrix Spiral Order', prompt: 'Traverse a 2D matrix in spiral clockwise order', lang: 'python' }
  ];

  const handleGenerate = async (customPrompt?: string, customLang?: string) => {
    const targetPrompt = (customPrompt || prompt).trim();
    const targetLang = customLang || language;

    if (!targetPrompt) return;
    setIsLoading(true);

    try {
      const res = await api.post('/ai/generate-code', {
        prompt: targetPrompt,
        language: targetLang,
        complexity
      });

      if (res.data?.data || res.data?.generatedCode) {
        const data = res.data.data || res.data;
        setResult(data);
        setActiveResultLang(data.language || targetLang);
      }
    } catch (err: any) {
      console.error('Failed to generate code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveCode = (): string => {
    if (!result) return '';
    if (result.multiLangCodes && result.multiLangCodes[activeResultLang as keyof MultiLangCodes]) {
      return result.multiLangCodes[activeResultLang as keyof MultiLangCodes]!;
    }
    return result.generatedCode;
  };

  const handleCopy = () => {
    const code = getActiveCode();
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                CodeForge AI — Universal Prompt-to-Code Studio
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-purple-400" />
                  6 Multi-Language Matrix
                </span>
              </h3>
              <p className="text-xs text-slate-400">Synthesizes complete, verified solutions across all languages with instant 1-click language conversion.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Prompt & Config Controls */}
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleGenerate();
                  }}
                  placeholder="E.g., Create a Binary Search Tree with insert and search methods..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-purple-500 px-4 py-3 rounded-xl text-slate-100 placeholder-slate-500 text-xs outline-none shadow-sm pr-10"
                />
                <button
                  onClick={() => handleGenerate()}
                  disabled={isLoading || !prompt.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg transition-all disabled:opacity-40 cursor-pointer shadow-md"
                >
                  {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Primary Target Language Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    if (result) setActiveResultLang(e.target.value);
                  }}
                  className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-3 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.id} value={l.id}>{l.icon} {l.label}</option>
                  ))}
                </select>

                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-3 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="optimal">Optimal Big-O</option>
                  <option value="readable">Clean & Readable</option>
                  <option value="advanced">Enterprise OOP</option>
                </select>
              </div>
            </div>

            {/* Quick 1-Click Prompt Badges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Popular Placement & Algorithm Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {presetPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(p.prompt);
                      setLanguage(p.lang);
                      handleGenerate(p.prompt, p.lang);
                    }}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-purple-950/60 hover:text-purple-300 text-slate-400 rounded-lg text-[11px] font-medium border border-slate-800 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-amber-400" />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <p className="text-slate-300 font-bold">CodeForge AI is synthesizing 6-language solutions...</p>
              <p className="text-slate-500 text-[11px]">Generating optimal data structures, boundary checks, and test harnesses</p>
            </div>
          )}

          {/* Generated Code Result View with Multi-Language Switcher */}
          {!isLoading && result && (
            <div className="bg-slate-950 border border-purple-500/30 rounded-2xl p-5 space-y-4 shadow-xl animate-in fade-in">
              
              {/* Result Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {result.title}
                  </h4>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-mono">
                    <span>Active: <strong className="text-purple-300 capitalize">{activeResultLang}</strong></span>
                    <span>•</span>
                    <span>Time: <strong className="text-emerald-300">{result.timeComplexity}</strong></span>
                    <span>•</span>
                    <span>Space: <strong className="text-cyan-300">{result.spaceComplexity}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-800"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>

                  <button
                    onClick={() => {
                      onApplyCode(getActiveCode(), activeResultLang, true);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-amber-300" />
                    ⚡ Apply ({activeResultLang.toUpperCase()}) & Run
                  </button>
                </div>
              </div>

              {/* Instant 6-Language Switcher Ribbon */}
              <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono pr-1 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  Language:
                </span>
                {SUPPORTED_LANGUAGES.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setActiveResultLang(l.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeResultLang === l.id
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 scale-105'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    <span>{l.icon}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>

              {/* View Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'code' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Source Code ({activeResultLang.toUpperCase()})
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTab === 'guide' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Algorithm Guide & Complexity
                </button>
              </div>

              {/* Code Tab */}
              {activeTab === 'code' && (
                <div className="relative">
                  <pre className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[380px]">
                    {getActiveCode()}
                  </pre>
                </div>
              )}

              {/* Guide Tab */}
              {activeTab === 'guide' && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-slate-300 leading-relaxed">{result.explanation}</p>
                  
                  {result.keyFeatures && result.keyFeatures.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Key Features:</span>
                      <ul className="space-y-1">
                        {result.keyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.sampleOutput && (
                    <div className="pt-2 space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Expected Output (stdout):</span>
                      <pre className="p-2.5 bg-slate-950 rounded-lg text-emerald-300 font-mono text-xs overflow-x-auto">
                        {result.sampleOutput}
                      </pre>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
