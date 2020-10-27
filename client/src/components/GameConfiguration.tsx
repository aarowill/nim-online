import React, { ReactElement, useState } from 'react';
import {
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from '@material-ui/core';
import NumberPicker from './NumberPicker';
import { NimOptions } from '../interfaces/nim';

const MAX_NUMBER_OF_STICKS = 35;
const MIN_NUMBER_OF_STICKS = 5;
const MAX_PICKUP_PER_TURN = 5;
const MIN_PICKUP_PER_TURN = 2;

interface GameConfigurationProps {
  player2Ready: boolean;
  onStartGame: (config: NimOptions) => void;
}

function GameConfiguration({ player2Ready, onStartGame }: GameConfigurationProps): ReactElement {
  const [firstToMove, setFirstToMove] = useState(0);
  const [numberOfSticks, setNumberOfSticks] = useState(20);
  const [perTurnPickup, setPerTurnPickup] = useState(3);
  const [lastStickLoses, setLastStickLoses] = useState(true);
  const [numberOfSticksValid, setNumberOfSticksValid] = useState(true);
  const [perTurnPickupValid, setPerTurnPickupValid] = useState(true);

  const formIsValid = numberOfSticksValid && perTurnPickupValid && player2Ready;

  const startGame = () => {
    if (!formIsValid) {
      return;
    }

    const gameConfig: NimOptions = {
      firstTurn: firstToMove as 0 | 1,
      numberOfSticks,
      maxPickupPerTurn: perTurnPickup,
      lastStickOnTurnLoses: lastStickLoses,
    };

    onStartGame(gameConfig);
  };

  return (
    <Box maxWidth="24rem">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          startGame();
        }}
        autoComplete="off"
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Game Configuration
          </Typography>
          <FormControl>
            <FormLabel>First to move</FormLabel>
            <RadioGroup
              aria-label="First to move"
              name="firstToMove"
              value={firstToMove}
              onChange={(event) => setFirstToMove(Number.parseInt(event.target.value, 10))}
            >
              <Box display="flex" justifyContent="space-between">
                <FormControlLabel value={0} control={<Radio />} label="Player 1 (You)" />
                <FormControlLabel value={1} control={<Radio />} label="Player 2" />
              </Box>
            </RadioGroup>
          </FormControl>
          <NumberPicker
            largerIncrement
            label="Number of sticks"
            name="numberOfSticks"
            value={numberOfSticks}
            min={MIN_NUMBER_OF_STICKS}
            max={MAX_NUMBER_OF_STICKS}
            valid={numberOfSticksValid}
            onChange={(newValue) => setNumberOfSticks(newValue)}
            setIsValid={(isValid) => setNumberOfSticksValid(isValid)}
          />
          <NumberPicker
            label="You can pick up 1 to this many sticks"
            value={perTurnPickup}
            name="perTurnPickup"
            min={MIN_PICKUP_PER_TURN}
            max={MAX_PICKUP_PER_TURN}
            valid={perTurnPickupValid}
            onChange={(newValue) => setPerTurnPickup(newValue)}
            setIsValid={(isValid) => setPerTurnPickupValid(isValid)}
          />
          <FormControl>
            <FormLabel>If you pick up the last stick you</FormLabel>
            <RadioGroup
              aria-label="If you pick up the lasts tick you"
              name="lastStickLoses"
              value={lastStickLoses}
              onChange={({ target: { value } }) => {
                if (value == null || typeof value !== 'string') {
                  return;
                }

                if (value.toLowerCase() === 'true') {
                  setLastStickLoses(true);
                }

                if (value.toLowerCase() === 'false') {
                  setLastStickLoses(false);
                }
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <FormControlLabel value={false} control={<Radio />} label="Win" />
                <FormControlLabel value control={<Radio />} label="Lose" />
              </Box>
            </RadioGroup>
          </FormControl>
          <Box display="flex" justifyContent="center" marginTop={0.5}>
            <Button disabled={!formIsValid} variant="contained" color="primary" type="submit">
              Start
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default GameConfiguration;
