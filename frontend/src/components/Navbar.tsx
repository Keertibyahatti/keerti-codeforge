import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Code2, Terminal, History, PlaySquare, User as UserIcon, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              CodeForge <span className="text-blue-500">AI</span>
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
              Execution Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          <Link
            to="/editor"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isActive('/editor')
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Editor
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/history"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive('/history')
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <History className="w-4 h-4" />
                Programs
              </Link>
              <Link
                to="/executions"
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive('/executions')
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <PlaySquare className="w-4 h-4" />
                Executions
              </Link>
            </>
          )}
        </div>

        {/* User Auth Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-sm font-medium text-slate-200 transition-colors"
              >
                <UserIcon className="w-4 h-4 text-blue-400" />
                <span className="max-w-[120px] truncate">{user?.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-800 hover:border-rose-500/30 transition-all"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition-all hover:shadow-blue-600/40"
              >
                Start Coding
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};
