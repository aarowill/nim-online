import { tryJoinGame } from '@src/game-manager';
import { ErrorResponse, SuccessResponse } from './event-response';

interface JoinGameRequest {
  joinCode: string;
}

const joinGame = (socket: SocketIO.Socket) => (
  { joinCode }: JoinGameRequest,
  responseCallback: (result: SuccessResponse | ErrorResponse) => void
): void => {
  const joinResult = tryJoinGame(joinCode, socket.id);

  if (joinResult != null) {
    responseCallback({ success: false, errorMessage: joinResult.message });
    return;
  }

  socket.join(joinCode);

  responseCallback({ success: true });

  socket.to(joinCode).emit('playerJoined');
};

export default joinGame;
