import React, { useState } from 'react';
import { Copy, Check, Play, ExternalLink, Code2, Sparkles, CheckCircle2, AlertTriangle, Zap, Terminal, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormattedAIResponseProps {
  content: string;
  onApplyCode?: (code: string) => void;
  onApplyAndRun?: (code: string) => void;
  defaultLang?: string;
}

export const FormattedAIResponse: React.FC<FormattedAIResponseProps> = ({
  content,
  onApplyCode,
  onApplyAndRun,
  defaultLang = 'python'
}) => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOpenInEditor = (codeText: string) => {
    if (onApplyCode) {
      onApplyCode(codeText);
    } else {
      localStorage.setItem('codeforge_shared_code', codeText);
      localStorage.setItem('codeforge_shared_lang', defaultLang);
      navigate('/editor');
    }
  };

  // Split content into regular markdown segments and code blocks
  const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }
    parts.push({
      type: 'code',
      language: match[1] || defaultLang,
      content: match[2].trim()
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  // Helper to render text with markdown features
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={lIdx} className="h-1" />;

          // 1. Headings (###, ##, #)
          if (trimmed.startsWith('### ')) {
            const title = trimmed.replace(/^###\s+/, '');
            const isError = title.includes('🔴') || title.includes('Error');
            const isGuide = title.includes('📝') || title.includes('Walkthrough') || title.includes('Guide');
            const isOptim = title.includes('🚀') || title.includes('Optimization');
            const isSuccess = title.includes('💡') || title.includes('Solution') || title.includes('Fix');

            return (
              <div
                key={lIdx}
                className={`flex items-center gap-2 font-extrabold text-sm pt-2 pb-1 border-b ${
                  isError
                    ? 'text-rose-400 border-rose-500/20'
                    : isGuide
                    ? 'text-sky-400 border-sky-500/20'
                    : isOptim
                    ? 'text-amber-400 border-amber-500/20'
                    : isSuccess
                    ? 'text-emerald-400 border-emerald-500/20'
                    : 'text-slate-100 border-slate-800'
                }`}
              >
                <span>{title}</span>
              </div>
            );
          }

          if (trimmed.startsWith('#### ')) {
            return (
              <h5 key={lIdx} className="font-bold text-slate-200 text-xs pt-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                {trimmed.replace(/^####\s+/, '')}
              </h5>
            );
          }

          // 2. Line-by-Line Highlight Items (e.g. **Line 1:** `code`)
          const lineMatch = trimmed.match(/^\*\*Line\s+(\d+):\*\*\s+`([^`]+)`/);
          if (lineMatch) {
            const lineNum = lineMatch[1];
            const lineCode = lineMatch[2];
            return (
              <div key={lIdx} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1 my-1.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                    Line {lineNum}
                  </span>
                  <code className="font-mono text-[11px] text-amber-300 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {lineCode}
                  </code>
                </div>
              </div>
            );
          }

          // 3. Category explanation sub-item (e.g. - **[Interactive STDIN]** explanation...)
          const catMatch = trimmed.match(/^-\s+\*\*\[(.*?)\]\*\*\s+(.*)$/);
          if (catMatch) {
            const category = catMatch[1];
            const explanation = catMatch[2];
            return (
              <div key={lIdx} className="pl-3 py-1 flex items-start gap-2 text-slate-300 text-xs">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                  {category}
                </span>
                <span className="text-slate-300 leading-relaxed">{renderInlineMarkdown(explanation)}</span>
              </div>
            );
          }

          // 4. Bullet Points (- Item)
          if (trimmed.startsWith('- ')) {
            return (
              <div key={lIdx} className="flex items-start gap-2 text-slate-300 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{renderInlineMarkdown(trimmed.replace(/^-\s+/, ''))}</span>
              </div>
            );
          }

          // 5. Numbered List (1. Item)
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            return (
              <div key={lIdx} className="flex items-start gap-2.5 text-slate-300 pl-1">
                <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span className="leading-relaxed">{renderInlineMarkdown(numMatch[2])}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={lIdx} className="text-slate-300 leading-relaxed">
              {renderInlineMarkdown(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Inline markdown renderer: **bold**, `code`, links
  const renderInlineMarkdown = (text: string) => {
    const inlineParts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

    return inlineParts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-slate-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={pIdx} className="font-mono text-[11px] bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 border border-slate-800">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  let codeBlockCounter = 0;

  return (
    <div className="space-y-4 font-sans text-xs">
      {parts.map((part, idx) => {
        if (part.type === 'text') {
          return <div key={idx}>{renderFormattedText(part.content)}</div>;
        }

        if (part.type === 'code') {
          const currentCodeIdx = codeBlockCounter++;
          const isCopied = copiedIndex === currentCodeIdx;

          return (
            <div key={idx} className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 my-3 shadow-lg">
              {/* Code Header Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                    {part.language || defaultLang}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(part.content, currentCodeIdx)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-semibold transition-colors cursor-pointer border border-slate-700"
                    title="Copy code"
                  >
                    {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? 'Copied' : 'Copy'}
                  </button>

                  <button
                    onClick={() => handleOpenInEditor(part.content)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[10px] font-semibold transition-colors cursor-pointer"
                    title="Apply code to Editor"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {onApplyCode ? 'Apply to Editor' : 'Open in IDE'}
                  </button>

                  {onApplyAndRun && (
                    <button
                      onClick={() => onApplyAndRun(part.content)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold transition-colors cursor-pointer shadow-sm"
                      title="Apply code and execute immediately"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Fix & Run
                    </button>
                  )}
                </div>
              </div>

              {/* Code Body */}
              <pre className="p-3.5 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre selection:bg-blue-600 selection:text-white">
                {part.content}
              </pre>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
