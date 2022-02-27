import { startGame as managerStartGame } from '@src/game-manager';
import { NimOptions } from '@src/nim/nim';
import { Socket } from 'socket.io';
import { ErrorResponse, StartGameResponse } from './event-response';
import gameRoomLookup from './game-room-lookup';

const startGame =
  (socket: Socket) =>
  (options: NimOptions, responseCallback: (result: StartGameResponse | ErrorResponse) => void): void => {
    const code = gameRoomLookup(socket);

    if (code == null || typeof code !== 'string') {
      responseCallback({ success: false, errorMessage: 'Could not find game room' });
      return;
    }

    const startResult = managerStartGame(code, options);

    if (startResult instanceof Error) {
      responseCallback({ success: false, errorMessage: startResult.message });
      return;
    }

    responseCallback({ success: true, game: startResult, gameCode: code });

    socket.to(code).emit('gameStarted', startResult);
  };

export default startGame;
