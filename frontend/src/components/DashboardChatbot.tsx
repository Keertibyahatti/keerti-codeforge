import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Copy, Check, Terminal, RefreshCw, Trash2, Code2, AlertTriangle, Wand2, Cpu, FileCode, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const sampleCodeStarter = `def calculate_student_grade(scores):
    if not scores:
        return "N/A"
    total = sum(scores)
    # Bug: Division by zero or typo
    average = total / len(scores)
    
    if average >= 90:
        return "A+"
    elif average >= 75:
        return "A"
    elif average >= 60:
        return "B"
    else:
        return "F"

# Test run
print("Result:", calculate_student_grade([85, 92, 78, 90]))`;

export const DashboardChatbot: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeCode, setActiveCode] = useState<string>(sampleCodeStarter);
  const [activeLang, setActiveLang] = useState<string>('python');
  const [showCodeEditor, setShowCodeEditor] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **CodeForge AI Code & Error Intelligence is Online!**\n\nI am tailored specifically to analyze code, explain compiler/runtime errors, and generate multi-language code solutions.\n\nChoose an action below or ask me any question about the current code snippet!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
        currentCode: activeCode,
        language: activeLang
      });

      const replyText = res.data?.reply || res.data?.answer || "I have analyzed your code query.";

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
        text: `⚠️ **Connection Error**: ${err.response?.data?.errorMessage || err.message || 'Could not connect to AI Chat Service.'}`,
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

  const extractCodeBlocks = (text: string) => {
    const codeRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    const blocks: { lang: string; code: string }[] = [];
    let match;
    while ((match = codeRegex.exec(text)) !== null) {
      blocks.push({
        lang: match[1] || activeLang || 'python',
        code: match[2].trim()
      });
    }
    return blocks;
  };

  const openInEditor = (codeSnippet: string, lang: string = 'python') => {
    let targetLang = lang.toLowerCase();
    if (targetLang === 'typescript' || targetLang === 'ts') {
      targetLang = 'python';
    }
    navigate('/editor', { state: { initialCode: codeSnippet, initialLanguage: targetLang } });
  };

  return (
    <div className="flex flex-col h-[680px] bg-slate-900/95 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              AI Code & Error Intelligence
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Llama 3.1 70B Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Ask about code, diagnose errors, and generate solutions</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([{
            id: 'welcome-1',
            sender: 'ai',
            text: `👋 **CodeForge AI Code & Error Intelligence is Online!**\n\nI am tailored specifically to analyze code, explain compiler/runtime errors, and generate multi-language code solutions.\n\nChoose an action below or ask me any question about the current code snippet!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }])}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Code Context Accordion Bar */}
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Target Code Context</span>
            <select
              value={activeLang}
              onChange={(e) => setActiveLang(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-indigo-300 text-[11px] font-mono px-2 py-0.5 rounded outline-none font-bold"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>

          <button
            onClick={() => setShowCodeEditor(!showCodeEditor)}
            className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
          >
            {showCodeEditor ? 'Collapse Code' : 'Edit Target Code'}
            {showCodeEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showCodeEditor && (
          <div className="mt-2 space-y-1.5 animate-in fade-in">
            <textarea
              value={activeCode}
              onChange={(e) => setActiveCode(e.target.value)}
              rows={5}
              placeholder="Paste or type code snippet here for AI to analyze..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-mono text-[11px] outline-none focus:border-indigo-500 resize-y"
            />
          </div>
        )}
      </div>

      {/* Quick Action Pills */}
      <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Quick Actions:</span>
        
        <button
          onClick={() => handleSend("Explain all errors in this code, tell why they occurred, and give the complete corrected code.")}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <AlertTriangle className="w-3 h-3 text-rose-400" />
          Explain Errors in Code
        </button>

        <button
          onClick={() => handleSend("Fix all bugs and return the complete, working, executable code solution.")}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Wand2 className="w-3 h-3 text-emerald-400" />
          Fix & Generate Code
        </button>

        <button
          onClick={() => handleSend("Analyze time and space complexity (Big-O) and optimize this algorithm.")}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Cpu className="w-3 h-3 text-teal-400" />
          Optimize Big-O
        </button>

        <button
          onClick={() => handleSend("Explain this code line-by-line with clean comments and step-by-step breakdown for a beginner.")}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 shrink-0 transition-colors shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          Line-by-Line Guide
        </button>

        <button
          onClick={() => handleSend("Generate a comprehensive suite of edge-case unit test inputs and expected outputs for this code.")}
          disabled={loading}
          className="flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 shrink-0 transition-colors shadow-sm cursor-pointer"
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
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-slate-950/95 text-slate-200 border border-slate-800 rounded-bl-none shadow-xl'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="whitespace-pre-wrap font-sans font-medium">{msg.text}</div>
                ) : (
                  <FormattedAIResponse
                    content={msg.text}
                    defaultLang={activeLang}
                  />
                )}

                <div className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-700/50 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
            </div>
            <div className="bg-slate-950/90 text-slate-400 text-xs px-4 py-2.5 rounded-2xl border border-slate-800 animate-pulse">
              CodeForge AI is diagnosing code & generating answer...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
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
          placeholder={`Ask about this ${activeLang} code, errors, or request generation...`}
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Ask
        </button>
      </form>
    </div>
  );
};
