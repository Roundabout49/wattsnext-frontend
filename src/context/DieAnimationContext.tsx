// src/context/AnimationContext.tsx
import React, { createContext, useContext, useState } from 'react';

type DieAnimationStep = 'hidden' | 'rolling' | 'showResult';

type DieAnimationData = {
  playerName: string;
  result: number;
};

type DieAnimationContextType = {
  showDieAnimation: boolean;
  dieAnimationStep: DieAnimationStep;
  dieAnimationData: DieAnimationData | null;
  setShowDieAnimation: (show: boolean) => void;
  setDieAnimationStep: (step: DieAnimationStep) => void;
  setDieAnimationData: (data: DieAnimationData) => void;
};

const DieAnimationContext = createContext<DieAnimationContextType | undefined>(undefined);

export const DieAnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState<DieAnimationStep>('hidden');
  const [animationData, setAnimationData] = useState<DieAnimationData | null>(null);

  return (
    <DieAnimationContext.Provider
      value={{
        showDieAnimation: showAnimation,
        dieAnimationStep: animationStep,
        dieAnimationData: animationData,
        setShowDieAnimation: setShowAnimation,
        setDieAnimationStep: setAnimationStep,
        setDieAnimationData: setAnimationData,
      }}
    >
      {children}
    </DieAnimationContext.Provider>
  );
};

export const useDieAnimation = () => {
  const context = useContext(DieAnimationContext);
  if (!context) {
    throw new Error('useDieAnimation must be used within an DieAnimationProvider');
  }
  return context;
};
