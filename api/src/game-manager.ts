import logger from '@shared/logger';
import { newGameState, NimGame, NimOptions } from './nim/nim';

const RANDOM_ROOM_NAME_LENGTH = 6;

interface StoredGame {
  player1Id?: string;
  player2Id?: string;
  game?: NimGame;
  currentMembers: number;
}

const gameRooms = new Map<string, StoredGame>();

function generateRoomId(): string {
  const result = [];
  const characterSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const length = RANDOM_ROOM_NAME_LENGTH;

  for (let i = 0; i < length; i += 1) {
    result.push(characterSet[Math.floor(Math.random() * characterSet.length)]);
  }

  return result.join('');
}

/**
 * Prepare a new game.
 *
 * @param playerId The ID of the player creating the game (player 1)
 * @returns The code for the game
 */
export const createNewGame = (playerId: string): string => {
  let roomId = generateRoomId();

  while (gameRooms.has(roomId)) {
    roomId = generateRoomId();
  }

  const room: StoredGame = {
    player1Id: playerId,
    currentMembers: 1,
  };

  gameRooms.set(roomId, room);

  return roomId;
};

/**
 * Try to join a game.
 *
 * @param code The game code
 * @param playerId The ID of the player joining the game
 * @returns null or an Error if the join failed
 */
export const tryJoinGame = (code: string, playerId: string): Error | null => {
  const room = gameRooms.get(code);

  if (room == null) {
    return new Error('A game with that code does not exist');
  }

  if (room.currentMembers === 2) {
    return new Error('Game is already full');
  }

  room.player2Id = playerId;
  room.currentMembers = 2;

  return null;
};

/**
 * Start the game with the given parameters.
 *
 * @param code The code of the game to start
 * @param options The options to start the game with
 * @returns NimGame or Error if starting the game failed
 */
export const startGame = (code: string, options: NimOptions): NimGame | Error => {
  const room = gameRooms.get(code);

  if (room == null) {
    return new Error('A game with that code does not exist');
  }

  try {
    room.game = newGameState(options);
  } catch (e) {
    return e as Error;
  }

  return room.game;
};

export const updateGame = (code: string, game: NimGame): Error | void => {
  const room = gameRooms.get(code);

  if (room == null) {
    return new Error('A game with that code does not exist');
  }

  const storedGame = { ...game, currentMembers: room.currentMembers };

  gameRooms.set(code, storedGame);
};

export const userLeftGame = (code: string): void => {
  const game = gameRooms.get(code);

  if (game == null) {
    logger.warn('User left game that does not exist');
    return;
  }

  game.currentMembers -= 1;

  if (game.currentMembers <= 0) {
    gameRooms.delete(code);
  }
};
