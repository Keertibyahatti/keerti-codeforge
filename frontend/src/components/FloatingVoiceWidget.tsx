import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Square, Sparkles, AlertTriangle, Play } from 'lucide-react';
import { VoiceAssistant } from '../utils/voiceHelper';

interface FloatingVoiceWidgetProps {
  language: string;
  code: string;
  stderr?: string;
  errorLine?: number;
}

export const FloatingVoiceWidget: React.FC<FloatingVoiceWidgetProps> = ({
  language,
  code,
  stderr,
  errorLine
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [autoVoice, setAutoVoice] = useState<boolean>(VoiceAssistant.isAutoVoiceEnabled());

  const hasError = !!(stderr && stderr.trim().length > 0);

  const handleSpeak = () => {
    if (isSpeaking) {
      VoiceAssistant.stop();
      setIsSpeaking(false);
      return;
    }

    if (hasError) {
      const errType = stderr?.includes('ZeroDivisionError') ? 'ZeroDivisionError'
        : stderr?.includes('NameError') ? 'NameError'
        : stderr?.includes('SyntaxError') ? 'SyntaxError'
        : stderr?.includes('IndexError') ? 'IndexError'
        : stderr?.includes('TypeError') ? 'TypeError' : 'RuntimeError';

      VoiceAssistant.speakError({
        language,
        errorType: errType,
        errorLine,
        stderr,
        code
      }, () => setIsSpeaking(true), () => setIsSpeaking(false));
    } else {
      if (!('speechSynthesis' in window)) return;
      const lines = code.split('\n').filter(Boolean);
      const isLoop = code.includes('for') || code.includes('while');
      const complexity = isLoop ? 'linear Big-O of N' : 'constant Big-O of 1';
      const text = `Welcome to CodeForge AI Audio Walkthrough. You are currently viewing a ${language} program with ${lines.length} lines executing with an optimal ${complexity} time complexity. Click Run or AI Auto-Fix to test your code.`;

      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = 1.05;
      utt.onstart = () => setIsSpeaking(true);
      utt.onend = () => setIsSpeaking(false);
      utt.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 font-sans text-xs">
      
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="bg-slate-900/95 backdrop-blur-md border border-purple-500/40 p-4 rounded-2xl shadow-2xl space-y-3 w-80 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Mic className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-xs">AI Voice Assistant</h4>
                <p className="text-[10px] text-slate-400">Neural mentor speech for code & errors</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                const next = !autoVoice;
                setAutoVoice(next);
                VoiceAssistant.setAutoVoiceEnabled(next);
              }}
              className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                autoVoice ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
              title="Auto-speak when errors occur"
            >
              {autoVoice ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>

          {hasError ? (
            <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/20 space-y-1">
              <span className="text-rose-400 font-bold text-[11px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Error Detected
              </span>
              <p className="text-[11px] text-slate-300 line-clamp-2">{stderr?.trim().split('\n')[0]}</p>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Click the button below to listen to an AI audio explanation of your active {language} code.
            </p>
          )}

          {/* Equalizer animation */}
          {isSpeaking && (
            <div className="flex items-center justify-center gap-1 py-1 bg-slate-950/80 rounded-xl border border-purple-500/20">
              {[30, 80, 100, 60, 95, 40, 85, 100, 70, 45].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse h-4"
                />
              ))}
              <span className="text-[10px] font-mono text-purple-300 pl-2">Speaking...</span>
            </div>
          )}

          <button
            onClick={handleSpeak}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                : hasError
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white shadow-rose-600/30'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30'
            }`}
          >
            {isSpeaking ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            {isSpeaking ? 'Stop Voice' : (hasError ? '🎙️ Listen to Error & Solution' : '🎙️ Listen to Code Walkthrough')}
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          if (!isExpanded) {
            setIsExpanded(true);
            handleSpeak();
          } else {
            setIsExpanded(false);
          }
        }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold shadow-2xl border transition-all cursor-pointer ${
          isSpeaking
            ? 'bg-rose-600 hover:bg-rose-500 text-white border-rose-400 animate-pulse shadow-rose-600/40'
            : hasError
            ? 'bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 text-white border-rose-400 shadow-rose-600/40 animate-bounce'
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white border-purple-400/50 shadow-purple-600/30'
        }`}
        title="Click to toggle AI Voice Assistant"
      >
        <Mic className="w-4 h-4" />
        <span className="text-xs font-extrabold">
          {isSpeaking ? 'AI Voice Speaking...' : hasError ? '🚨 Speak Error & Fix' : '🎙️ AI Voice Mentor'}
        </span>
        {isSpeaking && (
          <span className="flex items-center gap-0.5 ml-1">
            <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-white rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-white rounded-full animate-pulse delay-150" />
          </span>
        )}
      </button>

    </div>
  );
};
