
import React, { useState, useEffect, useMemo } from 'react';
import { Phrase } from '../types';
import ProgressBar from './ProgressBar';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  phrase: Phrase;
  allPhrases: Phrase[];
  currentIndex: number;
  total: number;
  onNext: (correct: boolean, userAnswer: string) => void;
}

const SelectionQuiz: React.FC<Props> = ({ phrase, allPhrases, currentIndex, total, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const options = useMemo(() => {
    // Pick 3 random wrong answers
    const otherPhrases = allPhrases.filter(p => p.id !== phrase.id);
    const shuffled = [...otherPhrases].sort(() => 0.5 - Math.random());
    const distractors = shuffled.slice(0, 3).map(p => p.native);
    
    return [...distractors, phrase.native].sort(() => 0.5 - Math.random());
  }, [phrase.id, allPhrases]);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [phrase]);

  const handleSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-in slide-in-from-right duration-300">
      <ProgressBar current={currentIndex} total={total} />

      <div className="bg-white rounded-3xl p-8 shadow-xl shadow-indigo-50 border border-slate-100 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-slate-400 font-semibold tracking-widest uppercase text-xs">Pick the native equivalent</p>
          <h3 className="text-3xl font-extrabold text-slate-800">"{phrase.standard}"</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {options.map((option, idx) => {
            const isCorrect = option === phrase.native;
            const isSelected = selectedOption === option;
            
            let btnClass = "w-full p-4 text-left rounded-2xl border-2 font-bold text-lg transition-all flex items-center justify-between ";
            if (!showFeedback) {
              btnClass += "border-slate-100 bg-slate-50 hover:border-indigo-300 hover:bg-white text-slate-700";
            } else if (isCorrect) {
              btnClass += "border-green-500 bg-green-50 text-green-700";
            } else if (isSelected && !isCorrect) {
              btnClass += "border-red-500 bg-red-50 text-red-700";
            } else {
              btnClass += "border-slate-100 bg-slate-50 opacity-40 text-slate-400";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={showFeedback}
                className={btnClass}
              >
                <span>{option}</span>
                {showFeedback && isCorrect && <CheckCircle2 size={24} className="text-green-500" />}
                {showFeedback && isSelected && !isCorrect && <XCircle size={24} className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => onNext(selectedOption === phrase.native, selectedOption || '')}
              className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionQuiz;
