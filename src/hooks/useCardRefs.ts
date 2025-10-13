import { useRef, RefObject, useMemo, createRef } from 'react';

export function useCardRefs(cards: { name: string }[]) {
  const refs = useRef<Record<string, RefObject<HTMLDivElement | null>>>({});

  // TODO: Cards should not be used anymore (and also not their names to identify them), refactoring needed!

  useMemo(() => {
    cards.forEach((card) => {
      if (!refs.current[card.name]) {
        refs.current[card.name] = createRef<HTMLDivElement>();
      }
    });
  }, [cards.map((c) => c.name).join(',')]);

  return refs.current;
}
