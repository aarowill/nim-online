import { Box, Button, Typography, useTheme } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import NumberPicker from './NumberPicker';

interface GameControlsProps {
  sticks: number;
  maxPerTurn: number;
  currentPlayer: 0 | 1;
  currentTurn: 0 | 1;
  submitTurn: (numberToTake: number) => void;
}

function GameControls({ sticks, maxPerTurn, currentPlayer, currentTurn, submitTurn }: GameControlsProps): ReactElement {
  const theme = useTheme();

  const currentTurnNumber: number = currentTurn;
  const isCurrentTurn = currentPlayer === currentTurn;

  const turnMessage = isCurrentTurn ? 'Your turn!' : `Player ${currentTurnNumber + 1}'s turn. Please wait.`;

  const [numberPicked, setNumberPicked] = useState(1);
  const [numberPickedValid, setNumberPickedValid] = useState(true);

  const numberPickedText = Number.isNaN(numberPicked) ? '?' : numberPicked.toString();

  useEffect(() => {
    setNumberPicked((n) => Math.min(n, maxPerTurn, sticks));
  }, [currentTurn, maxPerTurn, sticks]);

  return (
    <>
      <Box marginBottom={1}>
        <Typography variant="body1">{turnMessage}</Typography>
      </Box>

      {isCurrentTurn && (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!numberPickedValid) {
              return;
            }

            submitTurn(numberPicked);
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <NumberPicker
              max={Math.min(maxPerTurn, sticks)}
              min={1}
              name="numberPicked"
              value={numberPicked}
              valid={numberPickedValid}
              onChange={setNumberPicked}
              margin="none"
              setIsValid={setNumberPickedValid}
            />
            <Box width="10rem" marginTop={1}>
              <Button disabled={!numberPickedValid} fullWidth type="submit" variant="contained" color="primary">
                Take {numberPickedText} stick{numberPicked > 1 && 's'}
              </Button>
            </Box>
          </Box>
        </form>
      )}
      {!isCurrentTurn && <PuffLoader color={theme.palette.primary.main} />}
    </>
  );
}

export default GameControls;
