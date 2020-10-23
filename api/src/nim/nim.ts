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
interface NimOptions {
  firstTurn?: 0 | 1;
  numberOfSticks?: number;
  maxPickupPerTurn?: number;
  lastStickOnTurnLoses?: boolean;
}

/**
 * Get the next player given a current player.
 *
 * @returns the next player
 */
export const nextPlayer = (currentPlayer: 0 | 1): 0 | 1 => {
  return (1 - currentPlayer) as 0 | 1;
};

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
    lastStickOnTurnLoses: true,
  }
): NimGame => {
  if (numberOfSticks > 30) {
    throw new Error('Too many sticks. Max is 30');
  }

  if (numberOfSticks < 5) {
    throw new Error('Too few sticks. Min is 5');
  }

  if (maxPickupPerTurn > 5) {
    throw new Error('Max pickup per turn is too high. Max is 5');
  }

  if (maxPickupPerTurn < 2) {
    throw new Error('Max pickup per turn is too low. Min is 2');
  }

  return {
    currentPlayerTurn: firstToMove,
    remainingSticks: numberOfSticks,
    maxPickupPerTurn,
    lastStickOnTurnLoses,
    winner: undefined,
  };
};

/**
 * Perform a turn of the game.
 *
 * @returns a new game state
 */
export const doTurn = (gameState: NimGame, numberOfSticks: number): NimGame => {
  const newGame = { ...gameState };

  if (numberOfSticks < 1) {
    throw new Error('Tried to take too few sticks. Min is 1');
  }

  if (numberOfSticks > gameState.maxPickupPerTurn) {
    throw new Error(`Tried to take too many sticks. Max is ${gameState.maxPickupPerTurn}`);
  }

  if (numberOfSticks > gameState.remainingSticks) {
    throw new Error(`Not enough sticks remaining. Only ${gameState.remainingSticks} left`);
  }

  newGame.remainingSticks -= numberOfSticks;

  if (newGame.remainingSticks === 0) {
    newGame.winner = newGame.lastStickOnTurnLoses ? nextPlayer(newGame.currentPlayerTurn) : newGame.currentPlayerTurn;
  } else if (newGame.remainingSticks === 1) {
    newGame.winner = newGame.lastStickOnTurnLoses ? newGame.currentPlayerTurn : nextPlayer(newGame.currentPlayerTurn);
  }

  newGame.currentPlayerTurn = nextPlayer(newGame.currentPlayerTurn);

  return newGame;
};
