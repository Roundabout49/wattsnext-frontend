// Central place for animation durations (milliseconds) so timings can be
// tuned in one spot instead of being scattered as magic numbers.
export const DIE_ROLLING_MS = 2000; // die rolls before the result shows
export const DIE_SHOWING_RESULT_MS = 2000; // result stays visible before the overlay hides
export const CARD_FLIGHT_MS = 500; // a card flies between two board/hand positions
export const NUMBER_TICK_MS = 250; // step interval when a displayed number counts towards its target
export const NUMBER_TREND_HOLD_MS = 400; // how long the final number keeps its green/red colour after settling

export const EVENT_ENTER_MS = 400; // event card scales/fades into the centre
export const EVENT_HOLD_MS = 7000; // event card stays centred and readable
export const EVENT_EXIT_MS = 400; // event card fades out again (fallback when no slot to fly to)
export const EVENT_FLY_MS = 700; // event card flies from the centre onto its board slot
