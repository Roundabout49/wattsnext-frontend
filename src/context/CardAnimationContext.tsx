import React, { createContext, useState, useRef, ReactNode, useContext } from 'react';
import FlyingCard from '../components/cards/FlyingCard';

const CardAnimationContext = createContext<CardAnimationContextType>({
  registerCardRef: () => {},
  getCardRef: () => null,
  startCardAnimation: (_fromId, _toId, _content, onDone) => onDone?.(),
});

interface CardAnimationContextType {
  registerCardRef: (id: string, el: HTMLDivElement | null) => void;
  getCardRef: (id: string) => HTMLDivElement | null;
  startCardAnimation: (
    fromId: string,
    toId: string,
    content: ReactNode,
    onDone?: () => void
  ) => void;
}

export const CardAnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cardRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const [animation, setAnimation] = useState<{
    fromRect: DOMRect;
    toRect: DOMRect;
    content: ReactNode;
    onDone?: () => void;
  } | null>(null);

  const registerCardRef = (id: string, el: HTMLDivElement | null) => {
    cardRefs.current.set(id, el);
  };

  const getCardRef = (id: string) => cardRefs.current.get(id) ?? null;

  const startCardAnimation = (
    fromId: string,
    toId: string,
    content: ReactNode,
    onDone?: () => void
  ) => {
    console.log('Starting card animation from', fromId, 'to', toId);
    const fromEl = getCardRef(fromId);
    const toEl = getCardRef(toId);
    console.log('From ref:', fromEl, 'To ref:', toEl);
    if (fromEl && toEl) {
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      setAnimation({ fromRect, toRect, content, onDone });
    } else {
      onDone?.();
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
