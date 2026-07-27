import { createContext, ReactNode, useContext, useState } from 'react';
import { Game } from '../types/Game';

// The revealed result of a quiz, arriving in the answer response. Carries the new game state so the
// overlay can apply it once the reveal is dismissed (applying it earlier would clear pendingQuiz and
// hide the overlay before the team has seen the solution).
export interface QuizReveal {
  chosenIndex: number;
  correctIndex: number;
  wasCorrect: boolean;
  moneyDelta: number;
  explanation: string;
  newGameState: Game;
}

interface QuizAnimationContextType {
  reveal: QuizReveal | null;
  // True once the local (active) player has submitted, before the reveal arrives.
  answering: boolean;
  markAnswering: () => void;
  showReveal: (reveal: QuizReveal) => void;
  clear: () => void;
}

const QuizAnimationContext = createContext<QuizAnimationContextType | undefined>(undefined);

export const QuizAnimationProvider = ({ children }: { children: ReactNode }) => {
  const [reveal, setReveal] = useState<QuizReveal | null>(null);
  const [answering, setAnswering] = useState(false);

  const markAnswering = () => setAnswering(true);
  const showReveal = (r: QuizReveal) => {
    setAnswering(false);
    setReveal(r);
  };
  const clear = () => {
    setReveal(null);
    setAnswering(false);
  };

  return (
    <QuizAnimationContext.Provider value={{ reveal, answering, markAnswering, showReveal, clear }}>
      {children}
    </QuizAnimationContext.Provider>
  );
};

export const useQuizAnimation = () => {
  const context = useContext(QuizAnimationContext);
  if (!context) {
    throw new Error('useQuizAnimation must be used within a QuizAnimationProvider');
  }
  return context;
};
