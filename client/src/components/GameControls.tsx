import { Box, Button, makeStyles, Popover, Theme, Typography, useTheme } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React, { ReactElement, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import NumberPicker from './NumberPicker';

interface GameControlsProps {
  sticks: number;
  maxPerTurn: number;
  lastStickOnTurnLoses: boolean;
  currentPlayer: 0 | 1;
  currentTurn: 0 | 1;
  submitTurn: (numberToTake: number) => void;
}

const useStyles = (theme: Theme) =>
  makeStyles({
    smallButton: {
      minWidth: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  });

function GameControls({
  sticks,
  maxPerTurn,
  lastStickOnTurnLoses,
  currentPlayer,
  currentTurn,
  submitTurn,
}: GameControlsProps): ReactElement {
  const theme = useTheme();
  const classes = useStyles(theme)();

  const currentTurnNumber: number = currentTurn;
  const isCurrentTurn = currentPlayer === currentTurn;

  const turnMessage = isCurrentTurn ? 'Your turn!' : `Player ${currentTurnNumber + 1}'s turn. Please wait.`;

  const [numberPicked, setNumberPicked] = useState(1);
  const [numberPickedValid, setNumberPickedValid] = useState(true);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | undefined>(undefined);

  const numberPickedText = Number.isNaN(numberPicked) ? '?' : numberPicked.toString();
  const rulesPopoverOpen = Boolean(popoverAnchor);
  const id = rulesPopoverOpen ? 'rules-popover' : undefined;

  const handleRulesPopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => setPopoverAnchor(event.currentTarget);

  const handleRulesPopoverClose = () => setPopoverAnchor(undefined);

  useEffect(() => {
    setNumberPicked((n) => Math.min(n, maxPerTurn, sticks));
  }, [currentTurn, maxPerTurn, sticks]);

  return (
    <>
      <Box marginBottom={1} display="flex" alignItems="center">
        <Typography variant="body1">{turnMessage}</Typography>
        <Box marginLeft={2}>
          <Button
            className={classes.smallButton}
            aria-describedby={id}
            variant="outlined"
            color="secondary"
            onClick={handleRulesPopoverClick}
          >
            <InfoIcon aria-label="Game information" />
          </Button>
          <Popover
            id={id}
            open={rulesPopoverOpen}
            anchorEl={popoverAnchor}
            onClose={handleRulesPopoverClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Box padding={2}>
              <Typography>
                Sticks remaining: <strong>{sticks}</strong>
              </Typography>
              <Typography>
                Each turn, you can pick up: <strong>1 to {maxPerTurn}</strong> sticks
              </Typography>
              <Typography>
                If you pick up the last stick you: <strong>{lastStickOnTurnLoses ? 'lose' : 'win'}</strong>
              </Typography>
            </Box>
          </Popover>
        </Box>
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
