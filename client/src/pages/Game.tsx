import { Box, Container, makeStyles } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import GameControls from '../components/GameControls';
import GameResult from '../components/GameResult';
import LogoSmall from '../components/LogoSmall';
import { DoTurnResponse, ErrorResponse } from '../interfaces/event-response';
import { GameRedirectState } from '../interfaces/game-redirect-state';
import { NimGame } from '../interfaces/nim';
import SocketContext from '../SocketContext';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

interface GameWithSocketProps {
  socket: SocketIOClient.Socket | undefined;
}

function Game({ socket }: GameWithSocketProps): ReactElement {
  const history = useHistory<GameRedirectState>();
  const classes = useStyles();

  const { game: initialGame, player } = history.location.state;

  const [gameState, setGameState] = useState(initialGame);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('gameUpdate', ({ game: gameUpdate }: { game: NimGame }) => {
      setGameState(gameUpdate);
    });
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
          <LogoSmall />
          <GameBoard sticks={gameState.remainingSticks} />
          {gameState.winner === undefined && (
            <GameControls
              sticks={gameState.remainingSticks}
              maxPerTurn={gameState.maxPickupPerTurn}
              currentPlayer={player}
              currentTurn={gameState.currentPlayerTurn}
              submitTurn={submitTurn}
            />
          )}
          {gameState.winner !== undefined && <GameResult currentPlayer={player} winner={gameState.winner} />}
        </Box>
      </Box>
    </Container>
  );
}

function GameWithSocket(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <Game socket={socket} />}</SocketContext.Consumer>;
}

export default GameWithSocket;
