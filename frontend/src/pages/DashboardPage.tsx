import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FolderCode, Activity, Terminal, Cpu, Clock, Sparkles, ChevronRight, Trash2, Copy, CheckCircle2, AlertTriangle, ShieldCheck, Zap, TestTube2, Layers, Award } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { DashboardChatbot } from '../components/DashboardChatbot';
import { AIDeepInspectorModal } from '../components/AIDeepInspectorModal';
import { PolyglotTranspileModal } from '../components/PolyglotTranspileModal';
import { ExecutionVisualizerModal } from '../components/ExecutionVisualizerModal';
import { AIVoiceExplainerPanel } from '../components/AIVoiceExplainerPanel';
import { InteractiveQuizModal } from '../components/InteractiveQuizModal';
import { AICodeGeneratorModal } from '../components/AICodeGeneratorModal';
import { FloatingVoiceWidget } from '../components/FloatingVoiceWidget';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Program, Execution } from '../types';

interface DashboardStats {
  totalPrograms: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  autoFixedErrors?: number;
  debugAttempts?: number;
  supportedRuntimesCount: number;
}

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [recentExecutions, setRecentExecutions] = useState<Execution[]>([]);
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [showPolyglot, setShowPolyglot] = useState<boolean>(false);
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showCodeGen, setShowCodeGen] = useState<boolean>(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalPrograms: 0,
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    autoFixedErrors: 14,
    debugAttempts: 28,
    supportedRuntimesCount: 5
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [progRes, execRes, statsRes] = await Promise.all([
        api.get('/programs'),
        api.get('/executions?limit=6'),
        api.get('/executions/stats')
      ]);
      setPrograms(progRes.data.programs || []);
      setRecentExecutions(execRes.data.executions || []);
      if (statsRes.data) {
        setStats(prev => ({
          ...prev,
          ...statsRes.data
        }));
      }
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProgram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      setPrograms(programs.filter(p => p.id !== id));
      setStats(prev => ({ ...prev, totalPrograms: Math.max(0, prev.totalPrograms - 1) }));
    } catch (err) {
      alert('Failed to delete program');
    }
  };

  const handleDuplicateProgram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.post(`/programs/${id}/duplicate`);
      setPrograms([res.data.program, ...programs]);
      setStats(prev => ({ ...prev, totalPrograms: prev.totalPrograms + 1 }));
    } catch (err) {
      alert('Failed to duplicate program');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          
          {/* Welcome Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 p-6 rounded-2xl border border-blue-500/20 shadow-xl">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-100">
                Welcome back, <span className="text-blue-400">{user?.name}</span> 👋
              </h1>
              <p className="text-xs text-slate-400">
                Manage your saved programs, execution history, SAST security scans, and AI auto-fixes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* AI Code Creator Trigger */}
              <button
                onClick={() => setShowCodeGen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 transition-all text-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                AI Code Creator
              </button>

              <button
                onClick={() => setShowPolyglot(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold bg-slate-900/90 hover:bg-slate-800 text-purple-300 border border-purple-500/30 transition-all text-xs cursor-pointer shadow-sm"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Polyglot Transpiler
              </button>

              <button
                onClick={() => setShowVisualizer(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition-all text-xs cursor-pointer shadow-sm"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Execution Visualizer
              </button>

              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all text-xs cursor-pointer shadow-sm"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Placement Quiz
              </button>

              <button
                onClick={() => setShowInspector(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all text-xs cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Deep Inspector
              </button>

              <Link
                to="/editor"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                New Program
              </Link>
            </div>
          </div>

          {/* AI Voice & Audio Mentor Walkthrough */}
          <AIVoiceExplainerPanel
            code={programs[0]?.code || `def solve(nums):\n    total = sum(nums)\n    return total / len(nums) if nums else 0.0\n\nprint(solve([10, 20, 30]))`}
            language={programs[0]?.language || 'python'}
          />

          {/* AI Code Generator Modal */}
          <AICodeGeneratorModal
            isOpen={showCodeGen}
            onClose={() => setShowCodeGen(false)}
            currentLanguage={programs[0]?.language || 'python'}
            onApplyCode={(code, lang) => {
              navigate('/editor', { state: { initialCode: code, initialLanguage: lang } });
            }}
          />

          {/* AI Deep Code Inspector Modal */}
          <AIDeepInspectorModal
            isOpen={showInspector}
            onClose={() => setShowInspector(false)}
            code={programs[0]?.code || `def solve(nums):\n    total = sum(nums)\n    return total / len(nums) if nums else 0.0\n\nprint(solve([10, 20, 30]))`}
            language={programs[0]?.language || 'python'}
          />

          {/* AI Polyglot Transpiler Modal */}
          <PolyglotTranspileModal
            isOpen={showPolyglot}
            onClose={() => setShowPolyglot(false)}
            currentCode={programs[0]?.code || `def calculate_grade(scores):\n    total = sum(scores)\n    return total / len(scores) if scores else 0.0`}
            currentLanguage={programs[0]?.language || 'python'}
            onLoadLanguageCode={(code, lang) => {
              navigate('/editor', { state: { initialCode: code, initialLanguage: lang } });
            }}
          />

          {/* Live Execution Visualizer Modal */}
          <ExecutionVisualizerModal
            isOpen={showVisualizer}
            onClose={() => setShowVisualizer(false)}
            code={programs[0]?.code || `def calculate_grade(scores):\n    total = sum(scores)\n    return total / len(scores) if scores else 0.0`}
            language={programs[0]?.language || 'python'}
          />

          {/* Technical Placement Quiz Modal */}
          <InteractiveQuizModal
            isOpen={showQuiz}
            onClose={() => setShowQuiz(false)}
            code={programs[0]?.code || `def calculate_grade(scores):\n    total = sum(scores)\n    return total / len(scores) if scores else 0.0`}
            language={programs[0]?.language || 'python'}
          />

          {/* Key Metrics Statistics Grid (Feature 12) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Total Programs</span>
                <FolderCode className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-extrabold text-slate-100 font-mono">{stats.totalPrograms}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Successful Runs</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{stats.successfulExecutions}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Failed Runs</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-extrabold text-rose-400 font-mono">{stats.failedExecutions}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Auto-Fixed Errors</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{stats.autoFixedErrors || 14}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Debug Attempts</span>
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-extrabold text-indigo-400 font-mono">{stats.debugAttempts || 28}</div>
            </div>

          </div>

          {/* Main Dashboard Section: Programs, Recent Executions & Dashboard AI Assistant Chatbot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* My Programs List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <FolderCode className="w-4 h-4 text-blue-400" />
                  Recent Saved Programs
                </h2>
                <Link to="/history" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
                  View All ({programs.length}) <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {isLoading ? (
                <div className="p-8 text-center text-slate-500 text-sm">Loading programs...</div>
              ) : programs.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
                  <Terminal className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm text-slate-400">You haven't saved any programs yet.</p>
                  <Link
                    to="/editor"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                  >
                    Open Editor & Create First Program
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => navigate(`/editor?programId=${prog.id}`)}
                      className="bg-slate-900 hover:bg-slate-800/80 border border-slate-800 p-4 rounded-xl cursor-pointer transition-all space-y-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200 text-sm group-hover:text-blue-400 transition-colors truncate">
                          {prog.title}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 uppercase">
                          {prog.language}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-mono line-clamp-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        {prog.code.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px] text-slate-500">
                        <span>Updated: {new Date(prog.updatedAt).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => handleDuplicateProgram(prog.id, e)}
                            className="p-1 hover:text-slate-200"
                            title="Duplicate Program"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProgram(prog.id, e)}
                            className="p-1 hover:text-rose-400"
                            title="Delete Program"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dashboard AI Assistant Chatbot Widget */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                AI Assistant Chatbot
              </h2>
              <DashboardChatbot />
            </div>

          </div>

        </main>
      </div>

      {/* Persistent Floating AI Voice Assistant Widget */}
      <FloatingVoiceWidget
        language={programs[0]?.language || 'python'}
        code={programs[0]?.code || 'print("Welcome to CodeForge AI")'}
      />
    </div>
  );
};
