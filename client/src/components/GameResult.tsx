import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface GameResultProps {
  currentPlayer: 0 | 1;
  winner: 0 | 1;
}

function GameResult({ currentPlayer, winner }: GameResultProps): ReactElement {
  return <Typography variant="h4">{currentPlayer === winner ? 'You win!' : 'You lose'}</Typography>;
}

export default GameResult;
