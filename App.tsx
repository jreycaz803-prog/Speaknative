
import React, { useState, useEffect } from 'react';
import { PHRASES } from './constants';
import { QuizType, QuizState } from './types';
import StudyView from './components/StudyView';
import FillBlanksQuiz from './components/FillBlanksQuiz';
import SelectionQuiz from './components/SelectionQuiz';
import DragDropQuiz from './components/DragDropQuiz';
import ResultsView from './components/ResultsView';
import { BookOpen, Edit3, CheckCircle, Move, Home, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QuizType>(QuizType.STUDY);
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 0,
    score: 0,
    isFinished: false,
    history: []
  });

  const resetQuiz = (type: QuizType) => {
    setActiveTab(type);
    setQuizState({
      currentStep: 0,
      score: 0,
      isFinished: false,
      history: []
    });
  };

  const handleFinishStep = (correct: boolean, userAnswer: string) => {
    const currentPhrase = PHRASES[quizState.currentStep];
    const newHistory = [...quizState.history, { phraseId: currentPhrase.id, correct, userAnswer }];
    const newScore = correct ? quizState.score + 1 : quizState.score;
    const isFinished = quizState.currentStep === PHRASES.length - 1;

    setQuizState({
      ...quizState,
      currentStep: quizState.currentStep + 1,
      score: newScore,
      isFinished: isFinished,
      history: newHistory
    });
  };

  const renderContent = () => {
    if (quizState.isFinished) {
      return (
        <ResultsView 
          score={quizState.score} 
          total={PHRASES.length} 
          onReset={() => resetQuiz(QuizType.STUDY)} 
        />
      );
    }

    switch (activeTab) {
      case QuizType.STUDY:
        return <StudyView phrases={PHRASES} />;
      case QuizType.FILL_BLANKS:
        return (
          <FillBlanksQuiz 
            phrase={PHRASES[quizState.currentStep]} 
            onNext={handleFinishStep} 
            currentIndex={quizState.currentStep}
            total={PHRASES.length}
          />
        );
      case QuizType.SELECTION:
        return (
          <SelectionQuiz 
            phrase={PHRASES[quizState.currentStep]} 
            allPhrases={PHRASES}
            onNext={handleFinishStep} 
            currentIndex={quizState.currentStep}
            total={PHRASES.length}
          />
        );
      case QuizType.DRAG_DROP:
        return (
          <DragDropQuiz 
             onFinish={(score) => setQuizState(prev => ({ ...prev, score, isFinished: true }))}
          />
        );
      default:
        return <StudyView phrases={PHRASES} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => resetQuiz(QuizType.STUDY)}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Trophy size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">SpeakNative</h1>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Master Class</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <NavBtn 
              active={activeTab === QuizType.STUDY} 
              onClick={() => resetQuiz(QuizType.STUDY)} 
              icon={<BookOpen size={18} />} 
              label="Study" 
            />
            <NavBtn 
              active={activeTab === QuizType.FILL_BLANKS} 
              onClick={() => resetQuiz(QuizType.FILL_BLANKS)} 
              icon={<Edit3 size={18} />} 
              label="Fill" 
            />
            <NavBtn 
              active={activeTab === QuizType.SELECTION} 
              onClick={() => resetQuiz(QuizType.SELECTION)} 
              icon={<CheckCircle size={18} />} 
              label="Select" 
            />
            <NavBtn 
              active={activeTab === QuizType.DRAG_DROP} 
              onClick={() => resetQuiz(QuizType.DRAG_DROP)} 
              icon={<Move size={18} />} 
              label="Match" 
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <footer className="md:hidden bg-white border-t border-slate-200 sticky bottom-0 z-10 p-2">
        <div className="flex justify-around items-center">
          <MobileNavBtn 
            active={activeTab === QuizType.STUDY} 
            onClick={() => resetQuiz(QuizType.STUDY)} 
            icon={<BookOpen size={20} />} 
          />
          <MobileNavBtn 
            active={activeTab === QuizType.FILL_BLANKS} 
            onClick={() => resetQuiz(QuizType.FILL_BLANKS)} 
            icon={<Edit3 size={20} />} 
          />
          <MobileNavBtn 
            active={activeTab === QuizType.SELECTION} 
            onClick={() => resetQuiz(QuizType.SELECTION)} 
            icon={<CheckCircle size={20} />} 
          />
          <MobileNavBtn 
            active={activeTab === QuizType.DRAG_DROP} 
            onClick={() => resetQuiz(QuizType.DRAG_DROP)} 
            icon={<Move size={20} />} 
          />
        </div>
      </footer>
    </div>
  );
};

const NavBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
      active ? 'bg-white text-indigo-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const MobileNavBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all ${
      active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'
    }`}
  >
    {icon}
  </button>
);

export default App;
