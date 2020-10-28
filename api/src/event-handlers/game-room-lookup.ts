import logger from '@shared/logger';

/**
 * Look up the game room that a socket is in.
 *
 * @param socket The socket to use for the lookup
 * @returns The room code or undefined if it could not be found
 */
const gameRoomLookup = (socket: SocketIO.Socket): string | undefined => {
  logger.info(Object.keys(socket.rooms).join());
  return Object.keys(socket.rooms).filter((value) => value !== socket.id)[0];
};

export default gameRoomLookup;
