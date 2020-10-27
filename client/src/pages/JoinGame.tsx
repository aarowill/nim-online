import { Box, Button, TextField, Typography, useTheme } from '@material-ui/core';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import LogoContainerView from '../components/LogoContainerView';
import { ErrorResponse, SuccessResponse } from '../interfaces/eventResponse';
import { GameRedirectState } from '../interfaces/gameRedirectState';
import { NimGame } from '../interfaces/nim';
import SocketContext from '../SocketContext';
import emptyFunction from '../utilities/emptyFunction';

interface JoinGameWithSocketProps {
  socket: SocketIOClient.Socket | undefined;
}

const defaultHelperText = 'Enter code to join game';
const validCodeRegex = /^[ABCDEFGHJKLMNPQRSTUVWXYZ]*$/;

function JoinGameWithSocket({ socket }: JoinGameWithSocketProps) {
  // A little hacky to use refs here but it's the only way to accomplish the starting game variable
  // for clean on navigation (https://stackoverflow.com/a/53641229)
  const startingGame = useRef(false);
  const joinCode = useRef('');

  const history = useHistory();
  const theme = useTheme();

  const [isValid, setIsValid] = useState(true);
  const [helperText, setHelperText] = useState(defaultHelperText);
  const [gameJoined, setGameJoined] = useState(false);

  useEffect(() => {
    if (socket == null) {
      return emptyFunction;
    }

    const handleGameStarted = (gameState: NimGame) => {
      const redirectState: GameRedirectState = {
        game: gameState,
        player: 1,
      };

      startingGame.current = true;

      history.push(`/game?code=${joinCode.current}`, redirectState);
    };

    socket.on('gameStarted', handleGameStarted);

    return () => {
      socket.off('gameStarted', handleGameStarted);

      if (!startingGame.current) {
        socket.emit('playerLeft');
      }
    };
  }, [history, socket]);

  function tryJoin() {
    if (socket == null) {
      return;
    }

    socket.emit('joinGame', { joinCode }, (response: SuccessResponse | ErrorResponse) => {
      if (!response.success) {
        setIsValid(false);
        setHelperText(response.errorMessage);
        return;
      }

      setGameJoined(true);
    });
  }

  function updateJoinCode(value: string) {
    if (validCodeRegex.test(value)) {
      setIsValid(true);
      setHelperText(defaultHelperText);
    } else {
      setIsValid(false);
      setHelperText('Invalid join code');
    }

    joinCode.current = value;
  }

  return (
    <LogoContainerView>
      {gameJoined && (
        <>
          <Box marginY={2}>
            <Typography variant="h5">Waiting for player 1 to start the game...</Typography>
          </Box>
          <ClimbingBoxLoader color={theme.palette.primary.main} />
        </>
      )}
      {!gameJoined && (
        <Box marginTop={2}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              tryJoin();
            }}
            autoComplete="off"
          >
            <Box display="flex" flexDirection="column">
              <TextField
                variant="filled"
                label="Join Code"
                name="joinCode"
                error={!isValid}
                required
                autoFocus
                value={joinCode.current}
                onChange={(event) => updateJoinCode(event.target.value.toUpperCase().trim())}
                helperText={helperText}
              />
              <Box marginTop={2}>
                <Button
                  disabled={!isValid || joinCode.current === ''}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Join
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </LogoContainerView>
  );
}

function JoinGame(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <JoinGameWithSocket socket={socket} />}</SocketContext.Consumer>;
}

export default JoinGame;
