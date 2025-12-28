
import React, { useState, useMemo } from 'react';
import { PHRASES } from '../constants';
import { Phrase } from '../types';
import { GripVertical, Check, RefreshCw } from 'lucide-react';

interface Props {
  onFinish: (score: number) => void;
}

interface MatchState {
  phraseId: number;
  standard: string;
  native: string;
  status: 'empty' | 'correct' | 'incorrect';
}

const DragDropQuiz: React.FC<Props> = ({ onFinish }) => {
  // Use a smaller subset for drag-and-drop to keep it manageable on screen
  const subsetSize = 6;
  const initialPhrases = useMemo(() => {
    return [...PHRASES].sort(() => 0.5 - Math.random()).slice(0, subsetSize);
  }, []);

  const shuffledNatives = useMemo(() => {
    return initialPhrases.map(p => ({ id: p.id, native: p.native }))
      .sort(() => 0.5 - Math.random());
  }, [initialPhrases]);

  const [matches, setMatches] = useState<Record<number, string | null>>(() => {
    const obj: any = {};
    initialPhrases.forEach(p => obj[p.id] = null);
    return obj;
  });

  const [draggedItem, setDraggedItem] = useState<{id: number, native: string} | null>(null);

  const handleDragStart = (id: number, native: string) => {
    setDraggedItem({ id, native });
  };

  const handleDrop = (targetPhraseId: number) => {
    if (!draggedItem) return;
    
    // Check if this native item is already used elsewhere and clear it
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach(key => {
      if (newMatches[Number(key)] === draggedItem.native) {
        newMatches[Number(key)] = null;
      }
    });

    newMatches[targetPhraseId] = draggedItem.native;
    setMatches(newMatches);
    setDraggedItem(null);
  };

  const handleReset = (phraseId: number) => {
    setMatches({ ...matches, [phraseId]: null });
  };

  const checkResults = () => {
    let score = 0;
    initialPhrases.forEach(p => {
      if (matches[p.id] === p.native) {
        score++;
      }
    });
    // Scale score to full phrases length if we want consistent results
    const scaledScore = Math.round((score / subsetSize) * PHRASES.length);
    onFinish(scaledScore);
  };

  const allMatched = Object.values(matches).every(v => v !== null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900">Match the Pairs</h2>
        <p className="text-slate-500">Drag the native phrases to their formal equivalents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Targets */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Formal Expression</p>
          {initialPhrases.map(p => (
            <div 
              key={p.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(p.id)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-[80px] flex flex-col justify-center gap-2 ${
                matches[p.id] 
                  ? 'border-indigo-200 bg-white shadow-sm' 
                  : 'border-dashed border-slate-200 bg-slate-50'
              }`}
            >
              <span className="text-sm font-bold text-slate-700">{p.standard}</span>
              {matches[p.id] ? (
                <div className="flex items-center justify-between bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 animate-in zoom-in-95">
                  <span className="text-indigo-700 font-bold">{matches[p.id]}</span>
                  <button onClick={() => handleReset(p.id)} className="text-indigo-400 hover:text-indigo-600">
                    <RefreshCw size={14} />
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium italic">Drop here...</div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Options */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Native Phrases</p>
          <div className="grid grid-cols-1 gap-3">
            {shuffledNatives.map(item => {
              const isUsed = Object.values(matches).includes(item.native);
              return (
                <div
                  key={item.id}
                  draggable={!isUsed}
                  onDragStart={() => handleDragStart(item.id, item.native)}
                  className={`p-4 rounded-xl border-2 border-white shadow-sm font-bold text-center transition-all flex items-center gap-3 cursor-grab active:cursor-grabbing ${
                    isUsed 
                      ? 'bg-slate-100 text-slate-300 opacity-50 select-none grayscale' 
                      : 'bg-white text-indigo-600 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <GripVertical size={18} className={isUsed ? 'text-slate-200' : 'text-slate-400'} />
                  {item.native}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={checkResults}
          disabled={!allMatched}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
        >
          Complete Matching <Check size={20} />
        </button>
      </div>
    </div>
  );
};

export default DragDropQuiz;
