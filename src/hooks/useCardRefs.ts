import { useRef, RefObject, useMemo, createRef } from 'react';

export function useCardRefs(cards: { id: string }[]) {
  const refs = useRef<Record<string, RefObject<HTMLDivElement | null>>>({});

  useMemo(() => {
    cards.forEach((card) => {
      if (!refs.current[card.id]) {
        refs.current[card.id] = createRef<HTMLDivElement>();
      }
    });
  }, [cards.map((c) => c.id).join(',')]);

  return refs.current;
}
