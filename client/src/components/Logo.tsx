import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core';

const useStyles = (theme: Theme) =>
  makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    subtitle: {
      marginTop: theme.spacing(-2),
    },
  });

const Logo = (): ReactElement => {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <Typography className={classes.root} variant="h1">
      NIM
      <Typography className={classes.subtitle} variant="h5" component="span">
        Online
      </Typography>
    </Typography>
  );
};

export default Logo;
