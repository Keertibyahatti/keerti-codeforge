import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 mx-auto flex items-center justify-center text-blue-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100">Reset Password</h1>
            <p className="text-xs text-slate-400">Enter your email address to receive password reset instructions</p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
              <p className="font-semibold text-sm">Reset Link Sent!</p>
              <p className="text-slate-300">If an account exists for <span className="font-bold">{email}</span>, a password reset link has been dispatched.</p>
              <div className="pt-2">
                <Link to="/login" className="inline-flex items-center gap-1 text-blue-400 font-semibold hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@example.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/20 transition-all"
              >
                Send Password Reset Email
              </button>

              <div className="text-center pt-2">
                <Link to="/login" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200">
                  <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
};
