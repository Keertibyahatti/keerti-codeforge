import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Code2, FolderCode, Activity, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/editor', label: 'Code Editor', icon: Code2 },
    { path: '/history', label: 'My Programs', icon: FolderCode },
    { path: '/executions', label: 'Execution History', icon: Activity },
    { path: '/profile', label: 'Profile & Settings', icon: User }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          Workspace Navigation
        </div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800/80">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
        >
          <LogOut className="w-4 h-4 text-slate-500 hover:text-rose-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
