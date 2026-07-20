import { useEffect, useState } from 'react';
import { NUMBER_TICK_MS } from '../animationTimings';

/**
 * Returns a display value that follows `value` in steps of 1 (every `stepMs`
 * milliseconds) instead of jumping. The game state itself stays untouched;
 * only the rendered number animates.
 */
export function useAnimatedNumber(value: number, stepMs = NUMBER_TICK_MS): number {
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDisplayed((prev) => {
        if (prev === value) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + (value > prev ? 1 : -1);
      });
    }, stepMs);
    return () => window.clearInterval(interval);
  }, [value, stepMs]);

  return displayed;
}
