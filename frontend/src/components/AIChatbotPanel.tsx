import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Copy, Check, Terminal, RefreshCw, Trash2, Code2, AlertTriangle, Play, Wand2, Cpu, FileCode, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import { FormattedAIResponse } from './FormattedAIResponse';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  language?: string;
}

interface AIChatbotPanelProps {
  currentCode: string;
  language: string;
  stderr?: string;
  stdout?: string;
  errorLine?: number;
  onApplyCode: (code: string) => void;
  onApplyAndRun?: (code: string) => void;
  onClose?: () => void;
}

export const AIChatbotPanel: React.FC<AIChatbotPanelProps> = ({
  currentCode,
  language,
  stderr,
  stdout,
  errorLine,
  onApplyCode,
  onApplyAndRun,
  onClose
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCodePreview, setShowCodePreview] = useState(false);

  const initialWelcomeText = stderr && stderr.trim().length > 0
    ? `⚠️ **Error Detected in your ${language.toUpperCase()} Code!**\n\nI noticed an execution error:\n\`\`\`\n${stderr.trim().split('\n')[0]}\n\`\`\`\n\nClick **"Fix & Generate Working Code"** or ask me how to fix it!`
    : `👋 Hello! I am your **CodeForge AI Code & Error Assistant**.\n\nI am connected to your active **${language.toUpperCase()}** editor. Ask me to:\n- 🔍 **Explain any errors or bugs** in your code\n- ⚡ **Fix and generate working code**\n- 🚀 **Optimize time/space complexity**\n- 🌐 **Convert to Python, JS, C++, or Java**`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: initialWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = (questionText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== 'welcome-1')
        .map(m => ({
          role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text
        }));

      const res = await api.post('/ai/chat', {
        question: textToSend,
        history,
        currentCode,
        language,
        stderr,
        stdout,
        errorLine
      });

      const replyText = res.data?.reply || res.data?.answer || "I have analyzed your code and error.";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ **AI Assistant Error**: ${err.response?.data?.errorMessage || err.message || 'Could not process query.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApply = (snippetCode: string, id: string, runNow: boolean = false) => {
    onApplyCode(snippetCode);
    setAppliedId(id);
    setTimeout(() => setAppliedId(null), 2000);
    if (runNow && onApplyAndRun) {
      onApplyAndRun(snippetCode);
    }
  };

  const extractCodeBlocks = (text: string) => {
    const codeRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const blocks: { lang: string; code: string }[] = [];
    let match;
    while ((match = codeRegex.exec(text)) !== null) {
      blocks.push({
        lang: match[1] || language || 'python',
        code: match[2].trim()
      });
    }
    return blocks;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              AI Code & Error Assistant
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {language}
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">Context-aware debugging & generation</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([{
              id: 'welcome-1',
              sender: 'ai',
              text: initialWelcomeText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code & Error Context Banner */}
      <div className="px-3.5 py-2 bg-slate-950/70 border-b border-slate-800/80 text-[11px] space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>Active Code Context:</span>
            <span className="text-indigo-300 font-mono text-[10px]">
              ({currentCode.split('\n').length} lines)
            </span>
          </div>
          <button
            onClick={() => setShowCodePreview(!showCodePreview)}
            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold underline cursor-pointer"
          >
            {showCodePreview ? 'Hide Code' : 'View Code'}
          </button>
        </div>

        {stderr && stderr.trim().length > 0 && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-mono truncate">
            <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="truncate">Error: {stderr.trim().split('\n')[0]}</span>
          </div>
        )}

        {showCodePreview && (
          <pre className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 max-h-28 overflow-y-auto whitespace-pre-wrap">
            {currentCode}
          </pre>
        )}
      </div>

      {/* Quick Action Pills */}
      <div className="px-3 py-2 bg-slate-950/40 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleSend("Explain all errors in my current code, tell why they occurred, and give the complete corrected code.")}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 text-[10px] font-medium shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <AlertTriangle className="w-3 h-3 text-rose-400" />
          Explain Errors
        </button>

        <button
          onClick={() => handleSend("Fix all bugs and return the complete, working, executable code with Exit Code 0.")}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Wand2 className="w-3 h-3 text-emerald-400" />
          Fix & Generate Code
        </button>

        <button
          onClick={() => handleSend("Analyze the Big-O time and space complexity of my code and suggest performance optimizations.")}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-[10px] font-medium shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Cpu className="w-3 h-3 text-teal-400" />
          Optimize Big-O
        </button>

        <button
          onClick={() => handleSend("Explain this code line-by-line with clean comments and step-by-step breakdown for a beginner.")}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 text-[10px] font-medium shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          Line-by-Line Guide
        </button>

        <button
          onClick={() => handleSend("Generate a comprehensive suite of edge-case unit test inputs and expected outputs for this code.")}
          disabled={loading}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-[10px] font-medium shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Terminal className="w-3 h-3 text-amber-400" />
          Edge-Case Tests
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="whitespace-pre-wrap font-sans font-medium">{msg.text}</div>
                ) : (
                  <FormattedAIResponse
                    content={msg.text}
                    defaultLang={language}
                    onApplyCode={(c) => onApplyCode(c)}
                    onApplyAndRun={onApplyAndRun ? (c) => onApplyAndRun(c) : undefined}
                  />
                )}

                <div className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-blue-950 border border-blue-700/50 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0">
              <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            </div>
            <div className="bg-slate-950 text-slate-400 text-xs px-3.5 py-2 rounded-2xl border border-slate-800 animate-pulse">
              Analyzing code & generating solutions...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about your ${language} code, errors, or request a fix...`}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-slate-200 placeholder-slate-500 rounded-xl px-3.5 py-2.5 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Ask
        </button>
      </form>
    </div>
  );
};
