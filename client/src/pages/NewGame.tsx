import React, { ReactElement, useEffect, useState } from 'react';
import LogoContainerView from '../components/LogoContainerView';
import GameConfiguration from '../components/GameConfiguration';
import JoinCodeDisplay from '../components/JoinCodeDisplay';
import SocketContext from '../SocketContext';

interface NewGameProps {
  socket: SocketIOClient.Socket | undefined;
}

function NewGame({ socket }: NewGameProps): ReactElement {
  const [player2Ready, setPlayer2Ready] = useState(false);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('playerJoined', () => setPlayer2Ready(true));
  }, [socket]);

  return (
    <LogoContainerView>
      <JoinCodeDisplay player2Ready={player2Ready} />
      <GameConfiguration player2Ready={player2Ready} />
    </LogoContainerView>
  );
}

function NewGameWithSocket(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <NewGame socket={socket} />}</SocketContext.Consumer>;
}

export default NewGameWithSocket;
