
import React, { useEffect } from 'react';
import { Trophy, RefreshCcw, Home, Sparkles } from 'lucide-react';

interface Props {
  score: number;
  total: number;
  onReset: () => void;
}

const ResultsView: React.FC<Props> = ({ score, total, onReset }) => {
  const percentage = Math.round((score / total) * 100);
  
  // Basic interpretation of score
  let title = "Keep Practicing!";
  let subtitle = "You're on your way to becoming a native speaker.";
  let color = "text-orange-500";

  if (percentage >= 90) {
    title = "Excellent Work!";
    subtitle = "You sound like a true native speaker!";
    color = "text-green-500";
  } else if (percentage >= 70) {
    title = "Great Job!";
    subtitle = "You've mastered most of these expressions.";
    color = "text-indigo-500";
  }

  return (
    <div className="max-w-xl mx-auto py-8 space-y-12 animate-in zoom-in duration-500">
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-200 rotate-6">
            <Trophy size={64} />
          </div>
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 animate-pulse" size={40} />
        </div>
        
        <div className="space-y-2">
          <h2 className={`text-4xl font-black ${color}`}>{title}</h2>
          <p className="text-slate-500 text-lg font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-indigo-50 grid grid-cols-2 divide-x divide-slate-100">
        <div className="text-center space-y-1">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Your Score</p>
          <p className="text-4xl font-black text-slate-800">{score}<span className="text-slate-300 text-2xl font-bold">/{total}</span></p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Accuracy</p>
          <p className="text-4xl font-black text-slate-800">{percentage}%</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onReset}
          className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3"
        >
          <RefreshCcw size={24} /> Try Another Quiz
        </button>
        <button
          onClick={onReset}
          className="w-full py-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3"
        >
          <Home size={24} /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
