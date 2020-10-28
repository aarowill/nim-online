import { tryJoinGame } from '@src/game-manager';
import { ErrorResponse, JoinGameResponse } from './event-response';

interface JoinGameRequest {
  joinCode: string;
}

const joinGame = (socket: SocketIO.Socket) => (
  { joinCode }: JoinGameRequest,
  responseCallback: (result: JoinGameResponse | ErrorResponse) => void
): void => {
  const joinResult = tryJoinGame(joinCode, socket.id);

  if (joinResult instanceof Error) {
    responseCallback({ success: false, errorMessage: joinResult.message });
    return;
  }

  socket.join(joinCode);

  const [playerNumber, game] = joinResult;

  responseCallback({ success: true, playerNumber, game });

  socket.to(joinCode).emit('playerJoined');
};

export default joinGame;
