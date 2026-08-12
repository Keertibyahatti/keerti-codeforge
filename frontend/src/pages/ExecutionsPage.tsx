import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Terminal, AlertTriangle, CheckCircle2, Clock, Search, Play } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import api from '../services/api';
import { Execution } from '../types';

export const ExecutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [filterLang, setFilterLang] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchExecutions();
  }, [filterLang, filterStatus, searchTerm]);

  const fetchExecutions = async () => {
    try {
      setIsLoading(true);
      let url = '/executions?limit=50';
      if (filterLang) url += `&language=${filterLang}`;
      if (filterStatus) url += `&status=${filterStatus}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      const res = await api.get(url);
      setExecutions(res.data.executions || []);
    } catch (err) {
      console.error('Failed to fetch execution logs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenInEditor = (exec: Execution) => {
    if (exec.programId) {
      navigate(`/editor?programId=${exec.programId}`);
    } else {
      navigate(`/editor`, { state: { code: exec.code, language: exec.language } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-400" />
                Execution History Logs
              </h1>
              <p className="text-xs text-slate-400">
                Audit trail of code executions, status codes, execution durations, and standard outputs.
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 w-36 sm:w-48 font-sans"
                />
              </div>

              <select
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">All Languages</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="success">Success</option>
                <option value="syntax_error">Syntax Error</option>
                <option value="runtime_error">Runtime Error</option>
                <option value="compilation_error">Compilation Error</option>
                <option value="timeout">Timeout</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading execution logs...</div>
          ) : executions.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Terminal className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-300 font-semibold">No execution records match filter criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {executions.map((exec) => (
                <div key={exec.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-blue-400 uppercase">
                        {exec.language}
                      </span>
                      {exec.program ? (
                        <span className="text-xs font-semibold text-slate-300">
                          Program: {exec.program.title}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Ad-hoc Execution</span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {exec.executionTime} ms
                      </span>

                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                        exec.status === 'success'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : exec.status === 'syntax_error'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}>
                        {exec.status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {exec.status} (Exit {exec.exitCode})
                      </span>

                      <button
                        onClick={() => handleOpenInEditor(exec)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                        title="Load into Editor"
                      >
                        <Play className="w-3 h-3 text-blue-400 fill-current" />
                        Run Code
                      </button>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <pre className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto max-h-32 select-text">
                    <code>{exec.code}</code>
                  </pre>

                  {/* Output Preview */}
                  {exec.stdout && (
                    <div className="p-2.5 bg-slate-950/80 rounded-lg text-xs font-mono text-emerald-400 select-text">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">stdout:</span>
                      {exec.stdout}
                    </div>
                  )}

                  {exec.stderr && (
                    <div className="p-2.5 bg-slate-950/80 rounded-lg text-xs font-mono text-rose-400 select-text">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold mb-1">stderr:</span>
                      {exec.stderr}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
