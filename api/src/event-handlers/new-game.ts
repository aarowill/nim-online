import logger from '@shared/logger';

const newGame = (socket: SocketIO.Socket, ...args: unknown[]): void => {
  logger.warn(`socket id: ${socket.id}`);
  logger.warn(args);
  logger.warn('boom, new game');
  socket.send('new game!');
};

export default {
  newGame,
};
