
import React from 'react';
import { Phrase } from '../types';
import { ArrowRight, Volume2 } from 'lucide-react';

interface Props {
  phrases: Phrase[];
}

const StudyView: React.FC<Props> = ({ phrases }) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Speak Like a Native</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Common English expressions vs. what native speakers actually say in daily conversation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phrases.map((phrase) => (
          <div 
            key={phrase.id} 
            className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Formal / Basic</p>
              <p className="text-lg font-semibold text-slate-800">{phrase.standard}</p>
            </div>
            
            <div className="px-3">
              <ArrowRight className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </div>

            <div className="text-right space-y-1 flex-1">
              <p className="text-sm font-medium text-indigo-400 uppercase tracking-wider">Natural / Native</p>
              <div className="flex items-center justify-end gap-2">
                <p className="text-lg font-bold text-indigo-600">{phrase.native}</p>
                <button 
                  onClick={() => speak(phrase.native)}
                  className="p-1.5 rounded-full hover:bg-indigo-50 text-indigo-400 hover:text-indigo-600 transition-colors"
                  title="Listen"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyView;
