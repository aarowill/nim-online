import logger from '@shared/logger';

const newGame = (socket: SocketIO.Socket, data: string /* , ack: (...ackArgs: unknown[]) => void */): void => {
  logger.warn(`socket id: ${socket.id}`);
  logger.warn(`got dataa: ${data}`);
  logger.warn('sending new game message');
  // ack('new game!');
};

export default {
  newGame,
};
