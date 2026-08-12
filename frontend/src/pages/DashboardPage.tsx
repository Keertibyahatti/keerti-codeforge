import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FolderCode, Activity, Terminal, Cpu, Clock, Sparkles, ChevronRight, Trash2, Copy, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Program, Execution } from '../types';

interface DashboardStats {
  totalPrograms: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  supportedRuntimesCount: number;
}

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [recentExecutions, setRecentExecutions] = useState<Execution[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalPrograms: 0,
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
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
        setStats(statsRes.data);
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
    <div className="min-h-screen bg-slate-950 flex flex-col">
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
                Select a language template or manage your saved programs from your CodeForge workspace.
              </p>
            </div>

            <Link
              to="/editor"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all shrink-0 w-fit"
            >
              <Plus className="w-4 h-4" />
              New Program
            </Link>
          </div>

          {/* Key Metrics Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Saved Programs</span>
                <FolderCode className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-slate-100">{stats.totalPrograms}</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Total Executions</span>
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-100">{stats.totalExecutions}</span>
                {stats.totalExecutions > 0 && (
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 inline" /> {stats.successfulExecutions} ok
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Supported Runtimes</span>
                <Cpu className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-slate-100">{stats.supportedRuntimesCount} Languages</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">AI Optimizer</span>
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-sm font-semibold text-emerald-400">Active & Ready</div>
            </div>

          </div>

          {/* Main Dashboard Section: Programs & Recent Executions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* My Programs List (2 Columns) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FolderCode className="w-5 h-5 text-blue-400" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {programs.slice(0, 6).map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => navigate(`/editor?programId=${prog.id}`)}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/40 p-4 rounded-xl space-y-3 cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
                            {prog.title}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                            {prog.language}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleDuplicateProgram(prog.id, e)}
                            className="p-1 rounded text-slate-600 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                            title="Duplicate Program"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProgram(prog.id, e)}
                            className="p-1 rounded text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Program"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(prog.updatedAt).toLocaleDateString()}
                        </span>
                        <span>{prog._count?.versions || 1} versions</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Execution History Snippet (1 Column) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Recent Executions
                </h2>
                <Link to="/executions" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
                  All Logs <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                {recentExecutions.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">No recent execution logs found.</p>
                ) : (
                  recentExecutions.map((exec) => (
                    <div key={exec.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-300 capitalize">{exec.language}</div>
                        <div className="text-[10px] text-slate-500">{new Date(exec.createdAt).toLocaleTimeString()}</div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        exec.status === 'success' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                      }`}>
                        {exec.status === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        {exec.status} ({exec.executionTime}ms)
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
