import logger from '@shared/logger';
import { doTurn, newGameState, NimGame, NimOptions } from './nim/nim';

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

/**
 * Do a turn in the game with the given code on behalf of the player with the given ID.
 * @param code The code of the game to do the turn in
 * @param playerId The ID of the player doing the turn
 * @param sticksToPickUp How many sticks the player is picking up
 * @returns NimGame or Error if doing the turn failed
 */
export const doGameTurn = (code: string, playerId: string, sticksToPickUp: number): NimGame | Error => {
  const room = gameRooms.get(code);

  if (room == null) {
    return new Error('A game with that code does not exist');
  }

  if (room.player1Id == null || room.player2Id == null) {
    return new Error('The room is missing players');
  }

  if (room.game == null) {
    return new Error('The room with that code has not started its game yet');
  }

  const targetPlayerId = room.game.currentPlayerTurn === 0 ? room.player1Id : room.player2Id;

  if (playerId !== targetPlayerId) {
    return new Error('Player tried to do turn out of order');
  }

  try {
    room.game = doTurn(room.game, sticksToPickUp);
  } catch (e) {
    return e as Error;
  }

  return room.game;
};

/**
 * Update the room when a player leaves. Automatically remove rooms that have no players left.
 *
 * @param code The code of the room being left
 * @param playerId The id of the player leaving the room
 */
export const playerLeftRoom = (code: string, playerId: string): 0 | 1 | null => {
  const game = gameRooms.get(code);

  if (game == null) {
    logger.warn('User left game that does not exist');
    return null;
  }

  let playerNumber: 0 | 1;

  if (playerId === game.player1Id) {
    playerNumber = 0;
    game.player1Id = undefined;
  } else if (playerId === game.player2Id) {
    playerNumber = 1;
    game.player2Id = undefined;
  } else {
    logger.warn('User left game they were not in');
    return null;
  }

  game.currentMembers -= 1;

  // Clean up empty rooms
  if (game.currentMembers <= 0) {
    gameRooms.delete(code);
  }

  return playerNumber;
};
