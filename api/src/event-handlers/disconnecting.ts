import { playerLeftRoom } from '@src/game-manager';
import { Socket } from 'socket.io';
import gameRoomLookup from './game-room-lookup';

const disconnecting = (socket: Socket) => (): void => {
  const code = gameRoomLookup(socket);

  if (code == null || typeof code !== 'string') {
    return;
  }

  // The in-memory adapter returns void here, not a promise
  void socket.leave(code);

  const result = playerLeftRoom(code, socket.id);

  if (result !== null) {
    socket.to(code).emit('playerLeft', { player: result });
  }
};

export default disconnecting;
