import React, { useState } from 'react';
import { Folder, FileCode, Plus, Trash2, Edit3, ChevronRight, ChevronDown, FileText, Code2 } from 'lucide-react';

export interface ProjectFileItem {
  id: string;
  path: string;
  name: string;
  isFolder?: boolean;
  content: string;
  language: string;
}

interface FileExplorerPanelProps {
  files: ProjectFileItem[];
  activeFilePath: string;
  onSelectFile: (file: ProjectFileItem) => void;
  onCreateFile: (name: string, isFolder: boolean) => void;
  onDeleteFile: (id: string) => void;
}

export const FileExplorerPanel: React.FC<FileExplorerPanelProps> = ({
  files,
  activeFilePath,
  onSelectFile,
  onCreateFile,
  onDeleteFile
}) => {
  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isFolderCreating, setIsFolderCreating] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({ src: true, tests: true });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
  };

  const handleCreate = () => {
    if (!newFileName.trim()) return;
    onCreateFile(newFileName.trim(), isFolderCreating);
    setNewFileName('');
    setIsCreating(false);
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300 font-sans text-xs">
      {/* Explorer Header */}
      <div className="p-3 border-b border-slate-800 flex items-center justify-between font-bold text-slate-200 tracking-wide uppercase text-[11px]">
        <span className="flex items-center gap-1.5">
          <Folder className="w-3.5 h-3.5 text-blue-400" />
          Project Explorer
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setIsCreating(true); setIsFolderCreating(false); }}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
            title="New File"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* New File Creation Input */}
      {isCreating && (
        <div className="p-2 border-b border-slate-800 bg-slate-950 flex items-center gap-1">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="filename.py or src/utils.py"
            autoFocus
            className="flex-1 bg-slate-900 border border-slate-700 px-2 py-1 text-xs text-slate-200 rounded outline-none focus:border-blue-500"
          />
          <button onClick={handleCreate} className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold">
            Add
          </button>
        </div>
      )}

      {/* File Tree List */}
      <div className="flex-1 overflow-auto p-2 space-y-1">
        {files.map((file) => {
          const isActive = file.path === activeFilePath;
          return (
            <div
              key={file.id || file.path}
              onClick={() => onSelectFile(file)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors group ${
                isActive
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 font-semibold'
                  : 'hover:bg-slate-800/60 text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2 truncate">
                {file.name.endsWith('.py') && <FileCode className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                {file.name.endsWith('.js') && <FileCode className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                {file.name.endsWith('.md') && <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                {!file.name.endsWith('.py') && !file.name.endsWith('.js') && !file.name.endsWith('.md') && (
                  <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
                <span className="truncate">{file.path}</span>
              </span>

              {files.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(file.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-400 transition-opacity"
                  title="Delete File"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
