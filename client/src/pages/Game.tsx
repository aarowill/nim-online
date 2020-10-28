import { Box, Container, makeStyles } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import GameResult from '../components/GameResult';
import Logo from '../components/Logo';
import { DoTurnResponse, ErrorResponse, JoinGameResponse } from '../interfaces/eventResponse';
import { NimGame } from '../interfaces/nim';
import SocketContext from '../SocketContext';
import emptyFunction from '../utilities/emptyFunction';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

interface GameWithSocketProps {
  socket: SocketIOClient.Socket | undefined;
}

function Game({ socket }: GameWithSocketProps): ReactElement {
  const history = useHistory();
  const { search } = history.location;
  const classes = useStyles();

  const joinCode = new URLSearchParams(search).get('code');

  const [gameState, setGameState] = useState<NimGame | undefined>(undefined);
  const [player, setPlayer] = useState<0 | 1 | undefined>(undefined);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    if (gameState === undefined) {
      socket.emit('joinGame', { joinCode }, (response: JoinGameResponse | ErrorResponse) => {
        if (!response.success) {
          // TODO use error here
          history.push('/');
          return;
        }

        if (response.game === undefined) {
          // TODO signal some kind of error here
          history.push('/');
          return;
        }

        setGameState(response.game);
        setPlayer(response.playerNumber);
      });
    }
  });

  useEffect(() => {
    if (socket == null) {
      return emptyFunction;
    }

    const handleGameUpdate = ({ game: gameUpdate }: { game: NimGame }) => {
      setGameState(gameUpdate);
    };

    socket.on('gameUpdate', handleGameUpdate);

    return () => {
      socket.off('gameUpdate', handleGameUpdate);

      socket.emit('playerLeft');
    };
  }, [socket]);

  function submitTurn(sticksTaken: number) {
    if (socket == null) {
      return;
    }

    socket.emit('doTurn', { sticksTaken }, (result: DoTurnResponse | ErrorResponse) => {
      if (result.success === false) {
        // TODO: do something with this error
        return;
      }

      setGameState(result.game);
    });
  }

  return (
    <Container maxWidth="sm">
      <Box className={classes.root} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" marginY="auto" alignItems="center">
          <Logo size="small" />
          {gameState !== undefined && player !== undefined && (
            <>
              <GameBoard sticks={gameState.remainingSticks} />
              {gameState && gameState.winner === undefined && (
                <GameControls
                  sticks={gameState.remainingSticks}
                  maxPerTurn={gameState.maxPickupPerTurn}
                  currentPlayer={player}
                  currentTurn={gameState.currentPlayerTurn}
                  submitTurn={submitTurn}
                />
              )}
            </>
          )}
          {player !== undefined && gameState?.winner !== undefined && (
            <GameResult currentPlayer={player} winner={gameState.winner} />
          )}
        </Box>
      </Box>
    </Container>
  );
}

function GameWithSocket(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <Game socket={socket} />}</SocketContext.Consumer>;
}

export default GameWithSocket;
