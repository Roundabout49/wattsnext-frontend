import React, { createContext, useState, useRef, RefObject, ReactNode } from 'react';
import FlyingCard from '../components/cards/FlyingCard';

export const AnimationContext = createContext<AnimationContextType>({
  registerCardRef: () => {},
  getCardRef: () => null,
  startAnimation: (_fromId, _toId, _content, onDone) => onDone(),
});

interface AnimationContextType {
  registerCardRef: (
    id: string,
    ref: RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null
  ) => void;
  getCardRef: (id: string) => RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null;
  startAnimation: (fromId: string, toId: string, content: ReactNode, onDone: () => void) => void;
}

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cardRefs = useRef<
    Map<string, React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement | null> | null>
  >(new Map());
  const [animation, setAnimation] = useState<{
    fromRect: DOMRect;
    toRect: DOMRect;
    content: ReactNode;
    onDone: () => void;
  } | null>(null);

  const registerCardRef = (
    id: string,
    ref: RefObject<HTMLDivElement> | RefObject<HTMLDivElement | null> | null
  ) => {
    cardRefs.current.set(id, ref);
  };

  const getCardRef = (id: string) => cardRefs.current.get(id) ?? null;

  const startAnimation = (fromId: string, toId: string, content: ReactNode, onDone: () => void) => {
    const fromRef = getCardRef(fromId);
    const toRef = getCardRef(toId);
    if (fromRef?.current && toRef?.current) {
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();
      setAnimation({ fromRect, toRect, content, onDone });
    } else {
      onDone(); // Fallback
    }
  };

  return (
    <AnimationContext.Provider value={{ registerCardRef, getCardRef, startAnimation }}>
      {children}
      {animation && (
        <FlyingCard
          fromRect={animation.fromRect}
          toRect={animation.toRect}
          content={animation.content}
          onDone={() => {
            setAnimation(null);
            animation.onDone();
          }}
        />
      )}
    </AnimationContext.Provider>
  );
};
