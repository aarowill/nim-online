import { Box, Button, TextField, Typography, useTheme } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import LogoContainerView from '../components/LogoContainerView';
import { ErrorResponse, SuccessResponse } from '../interfaces/event-response';
import { NimGame } from '../interfaces/nim';
import SocketContext from '../SocketContext';

interface JoinGameProps {
  socket: SocketIOClient.Socket | undefined;
}

const defaultHelperText = 'Enter code to join game';
const validCodeRegex = /^[ABCDEFGHJKLMNPQRSTUVWXYZ]*$/;

function JoinGame({ socket }: JoinGameProps) {
  const history = useHistory();
  const theme = useTheme();

  const [joinCode, setJoinCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [helperText, setHelperText] = useState(defaultHelperText);
  const [gameJoined, setGameJoined] = useState(false);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on('gameStarted', (gameState: NimGame) => {
      history.push(`/game?code=${joinCode}`, { game: gameState });
    });
  });

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

    setJoinCode(value);
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
                value={joinCode}
                onChange={(event) => updateJoinCode(event.target.value.toUpperCase().trim())}
                helperText={helperText}
              />
              <Box marginTop={2}>
                <Button
                  disabled={!isValid || joinCode === ''}
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

function JoinGameWithSocket(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <JoinGame socket={socket} />}</SocketContext.Consumer>;
}

export default JoinGameWithSocket;
