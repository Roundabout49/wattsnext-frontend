import React, { createContext, useState, useRef, RefObject, ReactNode, useContext } from 'react';
import FlyingCard from '../components/cards/FlyingCard';

const CardAnimationContext = createContext<CardAnimationContextType>({
  registerCardRef: () => {},
  getCardRef: () => null,
  startCardAnimation: (_fromId, _toId, _content, onDone) => onDone?.(),
});

interface CardAnimationContextType {
  registerCardRef: (
    id: string,
    ref: RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null
  ) => void;
  getCardRef: (id: string) => RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null;
  startCardAnimation: (
    fromId: string,
    toId: string,
    content: ReactNode,
    onDone?: () => void
  ) => void;
}

export const CardAnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cardRefs = useRef<
    Map<string, React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null> | null>
  >(new Map());
  const [animation, setAnimation] = useState<{
    fromRect: DOMRect;
    toRect: DOMRect;
    content: ReactNode;
    onDone?: () => void;
  } | null>(null);

  const registerCardRef = (
    id: string,
    ref: RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null
  ) => {
    cardRefs.current.set(id, ref);
  };

  const getCardRef = (id: string) => cardRefs.current.get(id) ?? null;

  const startCardAnimation = (
    fromId: string,
    toId: string,
    content: ReactNode,
    onDone?: () => void
  ) => {
    console.log('Starting card animation from', fromId, 'to', toId);
    const fromRef = getCardRef(fromId);
    const toRef = getCardRef(toId);
    console.log('From ref:', fromRef, 'To ref:', toRef);
    if (fromRef?.current && toRef?.current) {
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      setAnimation({ fromRect, toRect, content, onDone });
    } else {
      onDone?.(); // Fallback
    }
  };

  return (
    <CardAnimationContext.Provider
      value={{ registerCardRef, getCardRef, startCardAnimation: startCardAnimation }}
    >
      {children}
      {animation && (
        <FlyingCard
          fromRect={animation.fromRect}
          toRect={animation.toRect}
          content={animation.content}
          onDone={() => {
            setAnimation(null);
            animation.onDone?.();
          }}
        />
      )}
    </CardAnimationContext.Provider>
  );
};

export const useCardAnimation = () => {
  const context = useContext(CardAnimationContext);
  if (!context) {
    throw new Error('useCardAnimation must be used within an CardAnimationProvider');
  }
  return context;
};
