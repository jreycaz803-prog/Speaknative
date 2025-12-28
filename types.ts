
export interface Phrase {
  id: number;
  standard: string;
  native: string;
}

export enum QuizType {
  STUDY = 'STUDY',
  FILL_BLANKS = 'FILL_BLANKS',
  SELECTION = 'SELECTION',
  DRAG_DROP = 'DRAG_DROP'
}

export interface QuizState {
  currentStep: number;
  score: number;
  isFinished: boolean;
  history: {
    phraseId: number;
    correct: boolean;
    userAnswer: string;
  }[];
}
