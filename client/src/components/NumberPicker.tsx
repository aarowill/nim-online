import React, { ReactElement, FunctionComponent } from 'react';
import { FormControl, FormLabel, Button, Input, Grid, makeStyles, Box, Theme, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = (theme: Theme) =>
  makeStyles({
    smallButton: {
      minWidth: 0,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    centeredInput: {
      textAlign: 'center',
    },
  });

interface NumberPickerProps {
  largerIncrement?: boolean;
  label: string;
}

const NumberPicker: FunctionComponent<NumberPickerProps> = ({
  largerIncrement,
  label,
}: NumberPickerProps): ReactElement => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Box marginY={1}>
        <Grid container spacing={2}>
          <Grid item xs>
            {largerIncrement && (
              <Button className={classes.smallButton} fullWidth variant="contained" color="secondary">
                –5
              </Button>
            )}
          </Grid>
          <Grid item xs>
            <Button className={classes.smallButton} fullWidth variant="contained" color="secondary">
              <RemoveIcon />
            </Button>
          </Grid>
          <Grid item xs>
            <Input inputProps={{ className: classes.centeredInput }} type="number" />
          </Grid>
          <Grid item xs>
            <Button className={classes.smallButton} fullWidth variant="contained" color="secondary">
              <AddIcon />
            </Button>
          </Grid>
          <Grid item xs>
            {largerIncrement && (
              <Button className={classes.smallButton} fullWidth variant="contained" color="secondary">
                +5
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </FormControl>
  );
};

NumberPicker.defaultProps = {
  largerIncrement: false,
};

export default NumberPicker;
