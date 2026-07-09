import { useEffect, useRef } from 'react';
import { ActionState } from '../types/Actions';

/**
 * Runs `handler` exactly once each time the action state of the given `type`
 * enters the given `step`. Leaving the step (or the action ending) re-arms the
 * hook, so re-entering the same step triggers the handler again.
 *
 * Replaces the manual ref-guard pattern previously repeated in every action
 * handler component.
 */
export function useActionStep<T extends NonNullable<ActionState['type']>>(
  actionState: ActionState | null,
  type: T,
  step: Extract<ActionState, { type: T }>['step'],
  handler: (state: Extract<ActionState, { type: T }>) => void
) {
  const didHandleRef = useRef(false);

  // No dependency array on purpose: the ref guard makes the effect idempotent,
  // and the handler closure must see the values of the current render.
  useEffect(() => {
    if (actionState?.type !== type || actionState.step !== step) {
      didHandleRef.current = false;
      return;
    }
    if (didHandleRef.current) return;
    didHandleRef.current = true;
    handler(actionState as Extract<ActionState, { type: T }>);
  });
}
