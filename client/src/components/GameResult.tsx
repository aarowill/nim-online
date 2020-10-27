import { Box, Button, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface GameResultProps {
  currentPlayer: 0 | 1;
  winner: 0 | 1;
}

function GameResult({ currentPlayer, winner }: GameResultProps): ReactElement {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {currentPlayer === winner ? 'You win!' : 'You lose'}
      </Typography>
      <Box marginY={2} width="8rem">
        <Button variant="contained" size="large" color="primary" component={Link} to="/new-game" fullWidth>
          New Game
        </Button>
      </Box>
      <Box marginY={2} width="8rem">
        <Button variant="contained" size="large" color="primary" component={Link} to="/join-game" fullWidth>
          Join Game
        </Button>
      </Box>
    </>
  );
}

export default GameResult;
