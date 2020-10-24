import logger from '@shared/logger';

const RANDOM_ROOM_NAME_LENGTH = 6;

function generateRandomRoom(): string {
  const result = [];
  const characterSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const length = RANDOM_ROOM_NAME_LENGTH;

  for (let i = 0; i < length; i += 1) {
    result.push(characterSet[Math.floor(Math.random() * characterSet.length)]);
  }

  return result.join('');
}

const newGame = (socket: SocketIO.Socket): void => {
  const roomName = generateRandomRoom();
  logger.info(`New room: ${roomName}`);
  socket.join(roomName);

  socket.emit('joinCode', roomName);
};

export default {
  newGame,
};
