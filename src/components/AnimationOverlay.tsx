// src/components/AnimationOverlay.tsx
import React from 'react';
import Die from './Die';
import { useDieAnimation } from '../context/DieAnimationContext';

const AnimationOverlay: React.FC = () => {
  const { showDieAnimation, dieAnimationStep, dieAnimationData } = useDieAnimation();

  if (!showDieAnimation || !dieAnimationData || dieAnimationStep === 'hidden') {
    return null;
  }

  return (
    <Die
      playerName={dieAnimationData.playerName}
      result={dieAnimationData.result}
      step={dieAnimationStep}
    />
  );
};

export default AnimationOverlay;
