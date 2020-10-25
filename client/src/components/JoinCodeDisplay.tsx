import React, { ReactElement, useEffect, useState } from 'react';
import { FormControl, TextField, Box, Typography } from '@material-ui/core';
import SocketContext from '../SocketContext';
import { NewGameResponse } from '../interfaces/event-response';

interface JoinCodeDisplayProps {
  player2Ready: boolean;
}

interface JoinCodeDisplayWithSocketProps extends JoinCodeDisplayProps {
  socket: SocketIOClient.Socket | undefined;
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

function JoinCodeDisplay({ socket, player2Ready }: JoinCodeDisplayWithSocketProps) {
  const [joinCode, setJoinCode] = useState<string | undefined>();

  useEffect(() => {
    if (socket == null) {
      return;
    }

    // Request a new game
    socket.emit('newGame', ({ joinCode: responseJoinCode }: NewGameResponse) => {
      setJoinCode(responseJoinCode);
    });
  }, [socket]);

  return player2Ready ? waitingToStart() : codeReady(joinCode);
}

function JoinCodeDisplayWithSocket(props: JoinCodeDisplayProps): ReactElement {
  // Justification: This is a higher order component
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <SocketContext.Consumer>{(socket) => <JoinCodeDisplay {...props} socket={socket} />}</SocketContext.Consumer>;
}

export default JoinCodeDisplayWithSocket;
