import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorResponse, NewGameResponse, StartGameResponse } from '../interfaces/eventResponse';
import { NimOptions } from '../interfaces/nim';
import { GameRedirectState } from '../interfaces/gameRedirectState';
import emptyFunction from '../utilities/emptyFunction';
import LogoContainerView from '../components/LogoContainerView';
import GameConfiguration from '../components/GameConfiguration';
import JoinCodeDisplay from '../components/JoinCodeDisplay';
import SocketContext from '../SocketContext';

interface NewGameWithSocketProps {
  socket: SocketIOClient.Socket | undefined;
}

function NewGameWithSocket({ socket }: NewGameWithSocketProps) {
  // A little hacky to use a ref here but it's the only way to accomplish the starting game variable
  // for clean on navigation (https://stackoverflow.com/a/53641229)
  const startingGame = useRef(false);

  const history = useHistory();

  const [player2Ready, setPlayer2Ready] = useState(false);
  const [joinCode, setJoinCode] = useState<string | undefined>();

  const startGame = (config: NimOptions) => {
    if (socket == null) {
      return;
    }

    socket.emit('startGame', config, (response: StartGameResponse | ErrorResponse) => {
      if (!response.success) {
        // TODO: do something with this error
        return;
      }

      startingGame.current = true;

      const redirectState: GameRedirectState = {
        game: response.game,
        player: 0,
      };

      history.push(`/game?code=${response.gameCode}`, redirectState);
    });
  };

  useEffect(() => {
    if (socket == null) {
      return emptyFunction;
    }

    const handlePlayer2Ready = () => {
      setPlayer2Ready(true);
    };

    socket.on('playerJoined', handlePlayer2Ready);

    // Request a new game
    socket.emit('newGame', ({ joinCode: responseJoinCode }: NewGameResponse) => {
      setJoinCode(responseJoinCode);
    });

    return () => {
      socket.off('playerJoined', handlePlayer2Ready);

      if (!startingGame.current) {
        socket.emit('playerLeft');
      }
    };
  }, [socket, startingGame]);

  return (
    <LogoContainerView>
      <JoinCodeDisplay player2Ready={player2Ready} joinCode={joinCode} />
      <GameConfiguration player2Ready={player2Ready} onStartGame={startGame} />
    </LogoContainerView>
  );
}

function NewGame(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <NewGameWithSocket socket={socket} />}</SocketContext.Consumer>;
}

export default NewGame;
