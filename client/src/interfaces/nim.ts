/**
 * A state representing one step in a game of Nim.
 */
export interface NimGame {
  currentPlayerTurn: 0 | 1;
  remainingSticks: number;
  maxPickupPerTurn: number;
  lastStickOnTurnLoses: boolean;
  winner: 0 | 1 | undefined;
}

/**
 * Options for a new game of Nim.
 */
export interface NimOptions {
  firstTurn?: 0 | 1;
  numberOfSticks?: number;
  maxPickupPerTurn?: number;
  lastStickOnTurnLoses?: boolean;
}
