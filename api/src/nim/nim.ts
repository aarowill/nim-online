/**
 * A state representing one step in a game of Nim.
 */
export interface NimGame {
  currentPlayerTurn: 0 | 1;
  remainingSticks: number;
  maxPickupPerTurn: number;
  lastStickOnTurnLoses: boolean;
}

interface NimOptions {
  firstTurn?: 0 | 1;
  numberOfSticks?: number;
  maxPickupPerTurn?: number;
  lastStickOnTurnLoses?: boolean;
}

/**
 * Create a new game state with optional configuration.
 *
 * @returns A new game state
 */
export const newGameState = (
  { firstTurn: firstToMove = 0, numberOfSticks = 20, maxPickupPerTurn = 3, lastStickOnTurnLoses = true }: NimOptions = {
    firstTurn: 0,
    numberOfSticks: 20,
    maxPickupPerTurn: 3,
    lastStickOnTurnLoses: true
  }
): NimGame => {
  return {
    currentPlayerTurn: firstToMove,
    remainingSticks: numberOfSticks,
    maxPickupPerTurn,
    lastStickOnTurnLoses
  };
};
