import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { EventCard } from '../types/EventCards';
import { CardEffectInformation } from '../ws/MessageTypes';

export interface EventToShow {
  card: EventCard;
  effects: CardEffectInformation[];
}

interface EventAnimationContextType {
  activeEvent: EventToShow | null;
  // Show `event`; `onDone` fires once the overlay has finished and been dismissed.
  playEvent: (event: EventToShow, onDone?: () => void) => void;
  // Called by the overlay when its animation is complete.
  dismiss: () => void;
}

const EventAnimationContext = createContext<EventAnimationContextType | undefined>(undefined);

export const EventAnimationProvider = ({ children }: { children: ReactNode }) => {
  const [activeEvent, setActiveEvent] = useState<EventToShow | null>(null);
  const onDoneRef = useRef<(() => void) | undefined>(undefined);

  const playEvent = (event: EventToShow, onDone?: () => void) => {
    onDoneRef.current = onDone;
    setActiveEvent(event);
  };

  const dismiss = () => {
    setActiveEvent(null);
    const onDone = onDoneRef.current;
    onDoneRef.current = undefined;
    onDone?.();
  };

  return (
    <EventAnimationContext.Provider value={{ activeEvent, playEvent, dismiss }}>
      {children}
    </EventAnimationContext.Provider>
  );
};

export const useEventAnimation = () => {
  const context = useContext(EventAnimationContext);
  if (!context) {
    throw new Error('useEventAnimation must be used within an EventAnimationProvider');
  }
  return context;
};
