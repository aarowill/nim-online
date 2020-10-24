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

function GameConfiguration(): ReactElement {
  const [firstToMove, setFirstToMove] = useState(0);
  const [numberOfSticks, setNumberOfSticks] = useState(20);
  const [oneTurnPickup, setOneTurnPickup] = useState(3);
  const [lastStickLoses, setLastStickLoses] = useState(true);

  return (
    <Box maxWidth="290px">
      <form>
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
            value={numberOfSticks}
            onChange={(newValue) => setNumberOfSticks(newValue)}
          />
          <NumberPicker
            label="Number of sticks in one turn"
            value={oneTurnPickup}
            onChange={(newValue) => setOneTurnPickup(newValue)}
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
            <Button variant="contained" color="primary">
              Start
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default GameConfiguration;
