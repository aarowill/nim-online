import React, { ReactElement } from 'react';
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
  return (
    <Box maxWidth="290px">
      <form>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" gutterBottom>
            Game Configuration
          </Typography>
          <FormControl>
            <FormLabel>First to move</FormLabel>
            <RadioGroup aria-label="First to move" name="firstToMove">
              <Box display="flex" justifyContent="space-between">
                <FormControlLabel value={0} control={<Radio />} label="Player 1 (You)" />
                <FormControlLabel value={1} control={<Radio />} label="Player 2" />
              </Box>
            </RadioGroup>
          </FormControl>
          <NumberPicker largerIncrement label="Number of sticks" />
          <NumberPicker label="Number of sticks in one turn" />
          <FormControl>
            <FormLabel>If you pick up the last stick you</FormLabel>
            <RadioGroup aria-label="If you pick up the lasts tick you" name="lastStickLoses">
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
