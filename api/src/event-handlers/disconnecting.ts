import logger from '@shared/logger';
import { playerLeftRoom } from '@src/game-manager';
import gameRoomLookup from './game-room-lookup';

const disconnecting = (socket: SocketIO.Socket) => (): void => {
  const code = gameRoomLookup(socket);

  if (code == null || typeof code !== 'string') {
    return;
  }

  socket.leave(code, (err?: Error) => {
    if (err) {
      logger.warn(`Error leaving room: ${err.message}`);
    }
  });

  const result = playerLeftRoom(code, socket.id);

  if (result !== null) {
    socket.to(code).emit('playerLeft', { player: result });
  }
};

export default disconnecting;
