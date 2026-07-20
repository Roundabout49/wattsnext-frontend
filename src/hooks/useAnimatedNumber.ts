import { useEffect, useRef, useState } from 'react';
import { NUMBER_TICK_MS, NUMBER_TREND_HOLD_MS } from '../animationTimings';

export type NumberTrend = 'up' | 'down' | 'none';

export interface AnimatedNumber {
  value: number;
  trend: NumberTrend;
}

/**
 * Returns a display value that follows `value` in steps of 1 (every `stepMs`
 * milliseconds) instead of jumping, together with the direction it is moving in.
 * The game state itself stays untouched; only the rendered number animates.
 */
export function useAnimatedNumber(value: number, stepMs = NUMBER_TICK_MS): AnimatedNumber {
  const [displayed, setDisplayed] = useState(value);
  const [trend, setTrend] = useState<NumberTrend>('none');
  const displayedRef = useRef(displayed);
  displayedRef.current = displayed;

  useEffect(() => {
    if (displayedRef.current === value) return;

    const direction: NumberTrend = value > displayedRef.current ? 'up' : 'down';
    let holdTimer: number | undefined;

    const interval = window.setInterval(() => {
      const current = displayedRef.current;
      const next = current + (value > current ? 1 : -1);
      displayedRef.current = next;
      setDisplayed(next);
      // Colour only from the first step on, so the starting number stays plain.
      setTrend(direction);

      if (next === value) {
        window.clearInterval(interval);
        holdTimer = window.setTimeout(() => setTrend('none'), NUMBER_TREND_HOLD_MS);
      }
    }, stepMs);

    return () => {
      window.clearInterval(interval);
      if (holdTimer !== undefined) window.clearTimeout(holdTimer);
    };
  }, [value, stepMs]);

  return { value: displayed, trend };
}
