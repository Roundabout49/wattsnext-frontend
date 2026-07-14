// Only the standard variant is implemented; recycling belongs to a possible
// future advanced mode. If that mode becomes real, the variant must move into
// the shared game state (chosen at game creation, like GameMode).
export type GameVariant = 'standard' | 'advanced';

export const GAME_VARIANT: GameVariant = 'standard';
