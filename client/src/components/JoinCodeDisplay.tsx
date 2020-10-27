import React, { ReactElement } from 'react';
import { FormControl, TextField, Box, Typography } from '@material-ui/core';

interface JoinCodeDisplayProps {
  player2Ready: boolean;
  joinCode: string | undefined;
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
    <Box display="flex" alignItems="center" minHeight="3.5rem" marginTop={-2} marginBottom={1}>
      <Typography variant="body1">Player 2 is ready!</Typography>
    </Box>
  );
}

function JoinCodeDisplay({ player2Ready, joinCode }: JoinCodeDisplayProps): ReactElement {
  return player2Ready ? waitingToStart() : codeReady(joinCode);
}

export default JoinCodeDisplay;
