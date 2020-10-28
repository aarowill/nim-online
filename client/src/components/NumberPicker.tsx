import React, { ReactElement, FunctionComponent, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Grid,
  makeStyles,
  Box,
  Theme,
  useTheme,
  FormHelperText,
} from '@material-ui/core';
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
  label?: string | undefined;
  defaultHelperText?: string;
  margin?: 'none' | 'dense' | 'normal';
  name: string;
  min: number;
  max: number;
  value: number;
  valid: boolean;
  onChange: (newValue: number) => void;
  setIsValid: (newValue: boolean) => void;
}

const NumberPicker: FunctionComponent<NumberPickerProps> = ({
  largerIncrement,
  label,
  name,
  min,
  max,
  value,
  valid,
  defaultHelperText = '',
  margin,
  onChange,
  setIsValid,
}: NumberPickerProps): ReactElement => {
  const theme = useTheme();
  const classes = useStyles(theme)();
  const [helperText, setHelperText] = useState<string>(defaultHelperText);

  const updateValue = (change: number) => {
    let newValue = value + change;

    if (newValue > max) {
      newValue = max;
    } else if (newValue < min) {
      newValue = min;
    }

    setIsValid(true);
    setHelperText(defaultHelperText);
    onChange(newValue);
  };

  return (
    <FormControl error={!valid} margin={margin}>
      {label !== undefined && (
        <Box marginBottom={1}>
          <FormLabel>{label}</FormLabel>
        </Box>
      )}
      <Grid container spacing={2}>
        <Grid item xs>
          {largerIncrement && (
            <Button
              aria-label="Minus five sticks"
              className={classes.smallButton}
              fullWidth
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => updateValue(-5)}
            >
              –5
            </Button>
          )}
        </Grid>
        <Grid item xs>
          <Button
            className={classes.smallButton}
            fullWidth
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => {
              updateValue(-1);
            }}
          >
            <RemoveIcon aria-label="Minus one stick" />
          </Button>
        </Grid>
        <Grid item xs>
          <Input
            inputProps={{ className: classes.centeredInput }}
            type="number"
            name={name}
            value={value}
            onChange={(event) => {
              const result = Number.parseInt(event.target.value, 10);

              if (Number.isNaN(result)) {
                setHelperText('Not a number. This must be a number.');
                setIsValid(false);
              } else if (result > max) {
                setHelperText(`Maximum is ${max}`);
                setIsValid(false);
              } else if (result < min) {
                setHelperText(`Minimum is ${min}`);
                setIsValid(false);
              } else {
                setHelperText(defaultHelperText);
                setIsValid(true);
              }

              onChange(result);
            }}
          />
        </Grid>
        <Grid item xs>
          <Button
            className={classes.smallButton}
            fullWidth
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => {
              updateValue(1);
            }}
          >
            <AddIcon aria-label="Plus one stick" />
          </Button>
        </Grid>
        <Grid item xs>
          {largerIncrement && (
            <Button
              aria-label="Plus five sticks"
              className={classes.smallButton}
              fullWidth
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => updateValue(5)}
            >
              +5
            </Button>
          )}
        </Grid>
      </Grid>
      <Box minHeight="1.5rem" display="flex" justifyContent="center">
        <FormHelperText>{helperText}</FormHelperText>
      </Box>
    </FormControl>
  );
};

NumberPicker.defaultProps = {
  largerIncrement: false,
  label: undefined,
  defaultHelperText: '',
  margin: 'dense',
};

export default NumberPicker;
