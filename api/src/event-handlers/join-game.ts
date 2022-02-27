import { tryJoinGame } from '@src/game-manager';
import { Socket } from 'socket.io';
import { ErrorResponse, JoinGameResponse } from './event-response';

interface JoinGameRequest {
  joinCode: string;
}

const joinGame =
  (socket: Socket) =>
  ({ joinCode }: JoinGameRequest, responseCallback: (result: JoinGameResponse | ErrorResponse) => void): void => {
    const joinResult = tryJoinGame(joinCode, socket.id);

    if (joinResult instanceof Error) {
      responseCallback({ success: false, errorMessage: joinResult.message });
      return;
    }

    // The in-memory adapter returns void here, not a promise
    void socket.join(joinCode);

    const [playerNumber, game] = joinResult;

    responseCallback({ success: true, playerNumber, game });

    socket.to(joinCode).emit('playerJoined');
  };

export default joinGame;
