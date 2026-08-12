import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Sparkles, Cpu, ShieldCheck, Zap, History, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 lg:px-8 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-cyan-500/20 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Web Code Engine & AI Diagnostics
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Code, Execute, and Optimize with <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Real-Time AI Intelligence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Full-stack online code workspace with multi-language runtimes (Python, JS, C, C++, Java), instant execution feedback, and automated error diagnostics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/editor"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              Launch Code Editor
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all hover:border-slate-700"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </Link>
          </div>

          {/* Interactive Feature Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-400" /> 5+ Language Runtimes</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-400" /> VS-Code Monaco Editor</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-indigo-400" /> Sandboxed Execution</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-cyan-400" /> Code History Logs</span>
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Engineered for Modern Developers</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Everything required to write, debug, and perfect code right inside your web browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-blue-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">Multi-Language Runtimes</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Native execution support for Python, JavaScript, C, C++, and Java with process limits, isolated environments, and stdout/stderr stream capture.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-indigo-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">AI Diagnostics & Fixing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Automated error detection translates cryptic stack traces into beginner-friendly explanations and produces 1-click apply code fixes.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <History className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-slate-100">Code & Version History</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Save programs, record execution logs with precise timing and exit codes, and restore previous code snapshots seamlessly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Safe & Sandboxed Architecture</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
          CodeForge AI enforces strict execution safety: 5-second process timeouts, 1MB output buffer caps, path traversal defenses, and temporary directory cleanup on every run.
        </p>
      </section>

      <Footer />
    </div>
  );
};
