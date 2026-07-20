import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { EventCard } from '../types/EventCards';
import { CardEffectInformation } from '../ws/MessageTypes';

export interface EventToShow {
  card: EventCard;
  effects: CardEffectInformation[];
  // DOM id of the board slot the card flies to when the overlay finishes.
  slotDomId: string;
}

interface EventAnimationContextType {
  activeEvent: EventToShow | null;
  // Whether the event's effects should already be reflected in the status
  // display. Stays false while the card is centred so the numbers only count up
  // once the card starts flying to the board.
  effectsReleased: boolean;
  // Show `event`; `onDone` fires once the overlay has finished and been dismissed.
  playEvent: (event: EventToShow, onDone?: () => void) => void;
  // Release the event's effects into the status display (called on flight start).
  releaseEffects: () => void;
  // Called by the overlay when its animation is complete.
  dismiss: () => void;
}

const EventAnimationContext = createContext<EventAnimationContextType | undefined>(undefined);

/** Sum of the amounts of a given effect type in an event's effect list. */
export function sumEventEffect(
  effects: CardEffectInformation[],
  type: CardEffectInformation['type']
): number {
  return effects.reduce(
    (sum, effect) => (effect.type === type && 'amount' in effect ? sum + (effect.amount ?? 0) : sum),
    0
  );
}

export const EventAnimationProvider = ({ children }: { children: ReactNode }) => {
  const [activeEvent, setActiveEvent] = useState<EventToShow | null>(null);
  const [effectsReleased, setEffectsReleased] = useState(false);
  const onDoneRef = useRef<(() => void) | undefined>(undefined);

  const playEvent = (event: EventToShow, onDone?: () => void) => {
    onDoneRef.current = onDone;
    setEffectsReleased(false);
    setActiveEvent(event);
  };

  const releaseEffects = () => setEffectsReleased(true);

  const dismiss = () => {
    setActiveEvent(null);
    setEffectsReleased(false);
    const onDone = onDoneRef.current;
    onDoneRef.current = undefined;
    onDone?.();
  };

  return (
    <EventAnimationContext.Provider
      value={{ activeEvent, effectsReleased, playEvent, releaseEffects, dismiss }}
    >
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
