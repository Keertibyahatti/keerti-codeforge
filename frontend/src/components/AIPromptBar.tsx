import React, { useState } from 'react';
import { Sparkles, Send, RefreshCw, Wand2, Zap, Code2, ArrowRight } from 'lucide-react';
import api from '../services/api';

interface AIPromptBarProps {
  currentLanguage: string;
  onCodeGenerated: (code: string, language: string, autoRun?: boolean) => void;
  onOpenFullGenerator?: () => void;
}

export const AIPromptBar: React.FC<AIPromptBarProps> = ({
  currentLanguage,
  onCodeGenerated,
  onOpenFullGenerator
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerate = async (presetPrompt?: string) => {
    const text = (presetPrompt || prompt).trim();
    if (!text) return;

    setIsLoading(true);
    try {
      const res = await api.post('/ai/generate-code', {
        prompt: text,
        language: currentLanguage
      });

      const generated = res.data?.data?.generatedCode || res.data?.generatedCode;
      const lang = res.data?.data?.language || res.data?.language || currentLanguage;

      if (generated) {
        onCodeGenerated(generated, lang, true);
        setPrompt('');
      }
    } catch (err) {
      console.error('AI code generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-500/30 p-2.5 rounded-2xl flex flex-col sm:flex-row items-center gap-2.5 shadow-lg font-sans text-xs">
      
      <div className="flex items-center gap-2 pl-2 text-purple-300 font-bold shrink-0">
        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
        <span className="hidden md:inline">AI Code Synthesizer:</span>
      </div>

      <div className="flex-1 w-full relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleGenerate();
          }}
          placeholder={`Ask AI to create any code in ${currentLanguage.toUpperCase()} (e.g., 'LRU Cache', 'Binary Search Tree', 'Merge Sort')...`}
          className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500 px-3.5 py-2 rounded-xl text-slate-100 placeholder-slate-500 text-xs outline-none pr-24 shadow-inner"
        />

        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            onClick={() => handleGenerate()}
            disabled={isLoading || !prompt.trim()}
            className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all disabled:opacity-40 cursor-pointer shadow-md text-[11px]"
          >
            {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3 text-amber-300" />}
            <span>{isLoading ? 'Generating...' : 'Generate & Run'}</span>
          </button>
        </div>
      </div>

      {onOpenFullGenerator && (
        <button
          onClick={onOpenFullGenerator}
          className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-[11px] border border-slate-800 transition-colors shrink-0 cursor-pointer flex items-center gap-1"
        >
          <span>Full Studio</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      )}

    </div>
  );
};
