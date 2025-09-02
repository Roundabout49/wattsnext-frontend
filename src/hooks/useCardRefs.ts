import { useRef, RefObject, useMemo, createRef } from 'react';

export function useCardRefs(cards: { name: string }[]) {
  const refs = useRef<Record<string, RefObject<HTMLDivElement | null>>>({});

  useMemo(() => {
    cards.forEach((card) => {
      if (!refs.current[card.name]) {
        refs.current[card.name] = createRef<HTMLDivElement>();
      }
    });
  }, [cards.map((c) => c.name).join(',')]); // sicherstellen, dass es sich nur bei Karten-Änderung aktualisiert

  return refs.current;
}
