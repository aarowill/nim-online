import { doGameTurn } from '@src/game-manager';
import { Socket } from 'socket.io';
import { DoTurnResponse, ErrorResponse } from './event-response';
import gameRoomLookup from './game-room-lookup';

interface DoTurnRequest {
  sticksTaken: number;
}

const doTurn =
  (socket: Socket) =>
  ({ sticksTaken }: DoTurnRequest, responseCallback: (result: DoTurnResponse | ErrorResponse) => void): void => {
    const code = gameRoomLookup(socket);

    if (code == null || typeof code !== 'string') {
      responseCallback({ success: false, errorMessage: 'Could not find game room' });
      return;
    }

    const result = doGameTurn(code, socket.id, sticksTaken);

    if (result instanceof Error) {
      responseCallback({ success: false, errorMessage: result.message });
      return;
    }

    responseCallback({ success: true, game: result });

    socket.to(code).emit('gameUpdate', { game: result });
  };

export default doTurn;
