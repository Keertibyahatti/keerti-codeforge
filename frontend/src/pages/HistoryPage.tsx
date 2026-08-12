import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderCode, Clock, Play, Trash2, History, Search, Filter, Copy } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import api from '../services/api';
import { Program } from '../types';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLang, setFilterLang] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, [searchTerm, filterLang]);

  const fetchPrograms = async () => {
    try {
      setIsLoading(true);
      let url = '/programs?';
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (filterLang) url += `language=${encodeURIComponent(filterLang)}`;

      const res = await api.get(url);
      const fetched: Program[] = res.data.programs || [];
      setPrograms(fetched);

      if (fetched.length > 0) {
        if (!selectedProgram || !fetched.some(p => p.id === selectedProgram.id)) {
          fetchProgramDetails(fetched[0].id);
        }
      } else {
        setSelectedProgram(null);
      }
    } catch (err) {
      console.error('Failed to fetch programs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProgramDetails = async (id: string) => {
    try {
      const res = await api.get(`/programs/${id}`);
      setSelectedProgram(res.data.program);
    } catch (err) {
      console.error('Failed to fetch program details:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      setPrograms(programs.filter(p => p.id !== id));
      if (selectedProgram?.id === id) {
        setSelectedProgram(null);
      }
    } catch (err) {
      alert('Failed to delete program');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const res = await api.post(`/programs/${id}/duplicate`);
      const dup = res.data.program;
      setPrograms([dup, ...programs]);
      fetchProgramDetails(dup.id);
    } catch (err) {
      alert('Failed to duplicate program');
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
                <FolderCode className="w-6 h-6 text-blue-400" />
                My Programs & Version Snapshots
              </h1>
              <p className="text-xs text-slate-400">
                Manage saved code files, inspect version snapshots, and load in the Monaco workbench.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search program title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 w-44 sm:w-56 font-sans"
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
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-500 text-sm">Loading code history...</div>
          ) : programs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <FolderCode className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-300 font-semibold">No saved programs found.</p>
              <button
                onClick={() => navigate('/editor')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20"
              >
                Create Program in Editor
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Program List (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Saved Programs ({programs.length})</h3>
                <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
                  {programs.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => fetchProgramDetails(p.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedProgram?.id === p.id
                          ? 'bg-blue-600/15 border-blue-500/50 text-slate-100 shadow-md'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm">{p.title}</h4>
                          <span className="text-[10px] font-semibold text-slate-500 uppercase">{p.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicate(p.id);
                            }}
                            className="p-1 text-slate-600 hover:text-blue-400"
                            title="Duplicate Program"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(p.id);
                            }}
                            className="p-1 text-slate-600 hover:text-rose-400"
                            title="Delete Program"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Version History & Code Preview (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {selectedProgram && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-100">{selectedProgram.title}</h2>
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">{selectedProgram.language}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicate(selectedProgram.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          Duplicate
                        </button>
                        <button
                          onClick={() => navigate(`/editor?programId=${selectedProgram.id}`)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Open in Editor
                        </button>
                      </div>
                    </div>

                    {/* Versions Accordion */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <History className="w-4 h-4 text-indigo-400" />
                        Code Version History ({selectedProgram.versions?.length || 0} Versions)
                      </h3>

                      <div className="space-y-4">
                        {selectedProgram.versions?.map((ver, idx) => (
                          <div key={ver.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span className="font-semibold text-indigo-400">Version #{selectedProgram.versions!.length - idx}</span>
                              <span className="flex items-center gap-1 text-[11px]">
                                <Clock className="w-3 h-3 text-slate-500" />
                                {new Date(ver.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <pre className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-slate-300 overflow-x-auto max-h-48 select-text">
                              <code>{ver.code}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
};
