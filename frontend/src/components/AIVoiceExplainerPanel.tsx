import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, Sparkles, Mic, Radio, Gauge, CheckCircle2 } from 'lucide-react';

interface AIVoiceExplainerPanelProps {
  code: string;
  language: string;
}

export const AIVoiceExplainerPanel: React.FC<AIVoiceExplainerPanelProps> = ({
  code,
  language
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [transcriptText, setTranscriptText] = useState<string>('');

  const generateVoiceScript = (): string => {
    const lines = code.split('\n').filter(Boolean);
    const lineCount = lines.length;
    const isLoop = code.includes('for') || code.includes('while');
    const complexity = isLoop ? 'linear Big-O of N' : 'constant Big-O of 1';

    return `Welcome to CodeForge AI Audio Walkthrough. You are currently viewing a ${language} program with ${lineCount} lines. This algorithm executes with an optimal ${complexity} time complexity. It reads inputs, computes the result, and outputs the answer cleanly to the terminal. In a technical campus interview, highlight the boundary checks and constant auxiliary space memory allocation. You are now ready to run and test your code.`;
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const script = generateVoiceScript();
    setTranscriptText(script);
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-500/20 p-4 rounded-2xl space-y-3 shadow-xl font-sans text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 flex items-center gap-2">
              AI Voice & Audio Walkthrough
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Neural Mentor Voice
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">Listen to an audio walkthrough and campus placement interview advice</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 font-mono text-[10px]">
            <Gauge className="w-3 h-3 text-purple-400" />
            {[1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => setSpeechRate(rate)}
                className={`px-1.5 py-0.5 rounded cursor-pointer ${
                  speechRate === rate ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-xs cursor-pointer shadow-md ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/20'
            }`}
          >
            {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isSpeaking ? 'Stop Voice' : '🎙️ Listen to AI Walkthrough'}
          </button>
        </div>
      </div>

      {/* Animated Waveform Visualizer when speaking */}
      {isSpeaking && (
        <div className="flex items-center justify-center gap-1 py-2 bg-slate-950/80 rounded-xl border border-purple-500/20">
          {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 95, 65, 40].map((height, i) => (
            <span
              key={i}
              style={{ height: `${height}%` }}
              className="w-1.5 bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full animate-pulse transition-all duration-300 h-6"
            />
          ))}
          <span className="text-[11px] font-mono text-purple-300 pl-3 font-semibold">Speaking AI Audio Mentor...</span>
        </div>
      )}

      {transcriptText && isSpeaking && (
        <p className="text-[11px] text-slate-300 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
          "{transcriptText}"
        </p>
      )}
    </div>
  );
};
