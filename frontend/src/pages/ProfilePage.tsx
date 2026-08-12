import React from 'react';
import { User as UserIcon, Mail, Calendar, ShieldCheck, Cpu } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-blue-400" />
              User Profile & Environment Settings
            </h1>
            <p className="text-xs text-slate-400">
              Manage user session parameters, environment execution features, and account security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Account Details Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <UserIcon className="w-4 h-4 text-blue-400" />
                Account Credentials
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-500 font-semibold block uppercase tracking-wider mb-1">Full Name</label>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-medium">
                    {user?.name || 'Developer'}
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 font-semibold block uppercase tracking-wider mb-1">Email Address</label>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    {user?.email || 'user@codeforge.ai'}
                  </div>
                </div>

                <div>
                  <label className="text-slate-500 font-semibold block uppercase tracking-wider mb-1">Account Created</label>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Runtime & Sandbox Settings */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Execution Environment & Security Caps
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300">Process Timeout Cap:</span>
                  <span className="font-bold text-amber-400">5000 ms (5 sec)</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300">Max Standard Output Buffer:</span>
                  <span className="font-bold text-blue-400">1024 KB (1 MB)</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300">AI Provider Integration:</span>
                  <span className="font-bold text-indigo-400">Google Gemini / Local Smart Engine</span>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Process Isolation:
                  </span>
                  <span className="font-bold text-emerald-400">Active</span>
                </div>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
