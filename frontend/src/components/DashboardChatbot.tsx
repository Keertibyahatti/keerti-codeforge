import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, Copy, Check, Terminal, RefreshCw, Trash2, Code2, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: string;
  language?: string;
}

const defaultSuggestions = [
  "How does Python list comprehension work?",
  "Explain async/await in JavaScript",
  "Write a function for Fibonacci Series",
  "What is Binary Search time complexity?",
  "How to handle errors in C/C++ memory allocation?"
];

export const DashboardChatbot: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hello! I am **CodeForge AI Assistant**. Ask me any coding question, programming concept, algorithm detail, or code generation request and I'll help you solve it!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
        history
      });

      const replyText = res.data?.reply || res.data?.answer || "I have analyzed your query.";

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
        text: `⚠️ **Connection Error**: ${err.message || 'Could not connect to AI Chat Service.'}`,
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

  const extractCodeBlock = (text: string) => {
    const match = text.match(/```([a-zA-Z0-9_]*)\n([\s\S]*?)```/);
    if (match) {
      return {
        lang: match[1] || 'python',
        code: match[2].trim()
      };
    }
    return null;
  };

  const openInEditor = (code: string, lang: string = 'python') => {
    let targetLang = lang.toLowerCase();
    if (targetLang === 'typescript' || targetLang === 'ts') {
      targetLang = 'python';
    }
    navigate('/editor', { state: { initialCode: code, initialLanguage: targetLang } });
  };

  return (
    <div className="flex flex-col h-[640px] bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Dashboard AI Assistant
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Ask any programming question & get instant answers</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([{
            id: 'welcome-1',
            sender: 'ai',
            text: "Hello! I am **CodeForge AI Assistant**. Ask me any coding question, programming concept, algorithm detail, or code generation request and I'll help you solve it!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }])}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear Chat History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const codeInfo = msg.sender === 'ai' ? extractCodeBlock(msg.text) : null;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {/* Render code snippet button bar if present */}
                {codeInfo && (
                  <div className="mt-3 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950 text-[11px] text-slate-400 border-b border-slate-800">
                      <span className="font-mono text-indigo-400 font-bold uppercase">{codeInfo.lang}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(codeInfo.code, msg.id)}
                          className="flex items-center gap-1 hover:text-slate-200 transition-colors"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {copiedId === msg.id ? 'Copied' : 'Copy Code'}
                        </button>
                        <button
                          onClick={() => openInEditor(codeInfo.code, codeInfo.lang)}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                          <Terminal className="w-3 h-3" />
                          Open in IDE
                        </button>
                      </div>
                    </div>
                    <pre className="p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto bg-slate-950/50">
                      {codeInfo.code}
                    </pre>
                  </div>
                )}

                <div className={`text-[10px] ${msg.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-700/50 flex items-center justify-center shrink-0">
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
              CodeForge AI is generating answer...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">Suggestions:</span>
        {defaultSuggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s)}
            disabled={loading}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 transition-colors"
          >
            {s}
          </button>
        ))}
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
          placeholder="Ask any programming question, algorithm problem, or request code..."
          className="flex-1 bg-slate-900 border border-slate-800 focus:border-indigo-500 text-xs text-slate-200 placeholder-slate-500 rounded-xl px-4 py-2.5 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          Ask
        </button>
      </form>
    </div>
  );
};
