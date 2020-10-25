import { Box, makeStyles, Theme, useTheme } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface GameBoardProps {
  sticks: number;
}

const useStyles = (theme: Theme) =>
  makeStyles({
    stick: {
      width: 7,
      height: 48,
      backgroundColor: theme.palette.text.primary,
    },
  });

function stick(key: number, className: string): ReactElement {
  return <div className={className} key={key} />;
}

function GameBoard({ sticks }: GameBoardProps): ReactElement {
  const theme = useTheme();
  const classes = useStyles(theme)();

  const stickList = Array(sticks)
    .fill(undefined)
    .map((_, key) => stick(key, classes.stick));

  return (
    <Box
      width="100%"
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
      justifyItems="center"
      gridRowGap={theme.spacing(4)}
      marginY={3}
      maxWidth="25rem"
    >
      {stickList}
    </Box>
  );
}

export default GameBoard;
