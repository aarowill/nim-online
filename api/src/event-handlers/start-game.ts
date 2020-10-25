import { startGame as managerStartGame } from '@src/game-manager';
import { NimOptions } from '@src/nim/nim';
import { ErrorResponse, StartGameResponse } from './event-response';

const startGame = (socket: SocketIO.Socket) => (
  options: NimOptions,
  responseCallback: (result: StartGameResponse | ErrorResponse) => void
): void => {
  const code = Object.keys(socket.rooms).filter((value) => value !== socket.id)[0];

  if (code == null || typeof code !== 'string') {
    responseCallback({ success: false, errorMessage: 'Could not find game room' });
    return;
  }

  try {
    const startResult = managerStartGame(code, options);

    if (startResult instanceof Error) {
      responseCallback({ success: false, errorMessage: startResult.message });
      return;
    }

    responseCallback({ success: true, game: startResult, gameCode: code });

    socket.to(code).emit('gameStarted', startResult);
  } catch (e) {
    responseCallback({ success: false, errorMessage: (e as Error).message });
  }
};

export default startGame;
