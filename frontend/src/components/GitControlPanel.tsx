import React, { useState } from 'react';
import { GitBranch, GitCommit, GitPullRequest, GitMerge, FileDiff, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

interface GitControlPanelProps {
  currentBranch?: string;
  onCommit?: (message: string) => void;
  onGenerateCommitMsg?: () => void;
}

export const GitControlPanel: React.FC<GitControlPanelProps> = ({
  currentBranch = 'main',
  onCommit,
  onGenerateCommitMsg
}) => {
  const [branch, setBranch] = useState(currentBranch);
  const [commitMsg, setCommitMsg] = useState('feat: implement Student Grade Calculator logic');
  const [stagedFiles, setStagedFiles] = useState([
    { path: 'src/main.py', status: 'modified' },
    { path: 'src/utils.py', status: 'modified' },
    { path: 'tests/test_main.py', status: 'added' }
  ]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitHistory, setCommitHistory] = useState([
    { hash: 'a1b2c3d', msg: 'feat: add zero-division safety guard', time: '10 mins ago', author: 'Pooja' },
    { hash: 'e5f6g7h', hashShort: 'e5f6g7h', msg: 'init: create multi-file repository structure', time: '1 hour ago', author: 'Pooja' }
  ]);

  const handleCommitAction = () => {
    if (!commitMsg.trim()) return;
    setIsCommitting(true);
    setTimeout(() => {
      setCommitHistory(prev => [
        { hash: Math.random().toString(36).substring(2, 9), msg: commitMsg, time: 'Just now', author: 'Pooja' },
        ...prev
      ]);
      setCommitMsg('');
      setIsCommitting(false);
      if (onCommit) onCommit(commitMsg);
    }, 600);
  };

  const handleGenerateMsg = () => {
    setCommitMsg('feat(calculator): implement Student Grade & Ranker module with pytest assertions');
    if (onGenerateCommitMsg) onGenerateCommitMsg();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-200 text-sm">Source Control & Git Integration</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-300 font-mono">
          <GitBranch className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="bg-transparent text-xs font-bold text-slate-200 outline-none cursor-pointer"
          >
            <option value="main" className="bg-slate-900">main</option>
            <option value="feature/ai-agent" className="bg-slate-900">feature/ai-agent</option>
            <option value="dev" className="bg-slate-900">dev</option>
          </select>
        </div>
      </div>

      {/* Staged Changes List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
          <span>Staged Changes ({stagedFiles.length})</span>
          <FileDiff className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <div className="space-y-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
          {stagedFiles.map((f) => (
            <div key={f.path} className="flex items-center justify-between font-mono text-[11px] px-2 py-1 hover:bg-slate-900 rounded">
              <span className="text-slate-300">{f.path}</span>
              <span className={`text-[10px] font-bold uppercase ${f.status === 'modified' ? 'text-amber-400' : 'text-emerald-400'}`}>
                M
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Commit Input Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-300 text-[11px]">Commit Message:</span>
          <button
            onClick={handleGenerateMsg}
            className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" /> AI Commit Msg
          </button>
        </div>
        <input
          type="text"
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          placeholder="Enter commit message..."
          className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 px-3 py-1.5 rounded-lg text-slate-200 text-xs outline-none font-mono"
        />
        <button
          onClick={handleCommitAction}
          disabled={isCommitting}
          className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs shadow-md shadow-blue-600/20"
        >
          <GitCommit className="w-3.5 h-3.5" />
          {isCommitting ? 'Committing...' : 'Commit Changes'}
        </button>
      </div>

      {/* Commit History Timeline */}
      <div className="space-y-2">
        <div className="font-bold text-slate-300 text-[11px]">Commit History:</div>
        <div className="space-y-1.5">
          {commitHistory.map((c) => (
            <div key={c.hash} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">{c.hash}</span>
                <span className="text-slate-500 text-[10px]">{c.time}</span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{c.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
