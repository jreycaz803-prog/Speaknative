
import React, { useState, useEffect } from 'react';
import { Phrase } from '../types';
import ProgressBar from './ProgressBar';
import { Check, X, ArrowRight } from 'lucide-react';

interface Props {
  phrase: Phrase;
  currentIndex: number;
  total: number;
  onNext: (correct: boolean, userAnswer: string) => void;
}

const FillBlanksQuiz: React.FC<Props> = ({ phrase, currentIndex, total, onNext }) => {
  const [inputValue, setInputValue] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset local state when phrase changes
  useEffect(() => {
    setInputValue('');
    setShowFeedback(false);
  }, [phrase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || showFeedback) return;

    const normalizedUser = inputValue.trim().toLowerCase().replace(/['’]/g, "'");
    const normalizedTarget = phrase.native.trim().toLowerCase().replace(/['’]/g, "'");
    
    const correct = normalizedUser === normalizedTarget;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in slide-in-from-right duration-300">
      <ProgressBar current={currentIndex} total={total} />
      
      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-50 border border-slate-100 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-slate-400 font-semibold tracking-widest uppercase text-xs">How do you say naturally?</p>
          <h3 className="text-3xl font-extrabold text-slate-800">"{phrase.standard}"</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={showFeedback}
              placeholder="Type the native phrase..."
              className={`w-full text-center py-4 px-6 text-xl font-bold rounded-2xl border-2 transition-all outline-none ${
                showFeedback 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-slate-200 focus:border-indigo-500 bg-slate-50'
              }`}
            />
            {showFeedback && (
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? <Check size={28} /> : <X size={28} />}
              </div>
            )}
          </div>

          {!showFeedback ? (
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              {!isCorrect && (
                <p className="text-center text-slate-600 font-medium">
                  The correct answer is: <span className="text-indigo-600 font-bold">"{phrase.native}"</span>
                </p>
              )}
              <button
                type="button"
                onClick={() => onNext(isCorrect, inputValue)}
                className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Next Question <ArrowRight size={20} />
              </button>
            </div>
          )}
        </form>
      </div>
      
      <p className="text-center text-slate-400 text-sm font-medium">
        Hint: Remember the phrases from the study section!
      </p>
    </div>
  );
};

export default FillBlanksQuiz;
