import { createNewGame } from '@src/game-manager';
import { NewGameResponse } from './event-response';

const newGame = (socket: SocketIO.Socket) => (responseCallback: (response: NewGameResponse) => void): void => {
  const roomName = createNewGame(socket.id);

  socket.join(roomName);

  responseCallback({ success: true, joinCode: roomName });
};

export default newGame;
