import React, { ReactElement, useEffect, useState } from 'react';
import { FormControl, TextField, Box, Typography } from '@material-ui/core';
import SocketContext from '../SocketContext';

interface JoinCodeDisplayProps {
  socket?: SocketIOClient.Socket;
}

function codeReady(code: string | undefined) {
  return (
    <Box marginTop={-2} marginBottom={1}>
      <FormControl>
        <TextField
          label="Join Code"
          inputProps={{ readOnly: true }}
          variant="filled"
          disabled={code == null}
          value={code || 'Loading join code...'}
        />
      </FormControl>
    </Box>
  );
}

function waitingToStart() {
  return (
    <Box display="flex" alignItems="center" minHeight="56px" marginTop={-2} marginBottom={1}>
      <Typography variant="body1">Player 2 is ready!</Typography>
    </Box>
  );
}

function JoinCodeDisplay({ socket }: JoinCodeDisplayProps) {
  const [joinCode, setJoinCode] = useState<string | undefined>();
  const [player2Ready] = useState(false);

  useEffect(() => {
    if (socket == null) {
      return;
    }

    // Request a new game
    socket.emit('newGame');

    // After requesting a new game, server responds with join code
    socket.on('joinCode', (gameJoinCode: string) => {
      setJoinCode(gameJoinCode);
    });
  }, [socket]);

  return player2Ready ? waitingToStart() : codeReady(joinCode);
}

function JoinCodeDisplayWithSocket(): ReactElement {
  return <SocketContext.Consumer>{(socket) => <JoinCodeDisplay socket={socket} />}</SocketContext.Consumer>;
}

export default JoinCodeDisplayWithSocket;
