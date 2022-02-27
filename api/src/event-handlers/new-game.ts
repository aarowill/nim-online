import { createNewGame } from '@src/game-manager';
import { Socket } from 'socket.io';
import { NewGameResponse } from './event-response';

const newGame =
  (socket: Socket) =>
  (responseCallback: (response: NewGameResponse) => void): void => {
    const roomName = createNewGame(socket.id);

    // The in-memory adapter returns void here, not a promise
    void socket.join(roomName);

    responseCallback({ success: true, joinCode: roomName });
  };

export default newGame;
