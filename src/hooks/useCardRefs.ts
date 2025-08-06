import { useRef, RefObject, useMemo, createRef } from 'react';

export function useCardRefs(cards: { title: string }[]) {
  const refs = useRef<Record<string, RefObject<HTMLDivElement | null>>>({});

  useMemo(() => {
    cards.forEach((card) => {
      if (!refs.current[card.title]) {
        refs.current[card.title] = createRef<HTMLDivElement>();
      }
    });
  }, [cards.map((c) => c.title).join(',')]); // sicherstellen, dass es sich nur bei Karten-Änderung aktualisiert

  return refs.current;
}
