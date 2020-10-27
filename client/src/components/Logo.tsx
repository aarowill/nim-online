import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  size?: 'normal' | 'small';
}

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

const useStylesLink = makeStyles({
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

function LogoSmall(): ReactElement {
  return (
    <Typography variant="h5" gutterBottom>
      NIM Online
    </Typography>
  );
}

function LogoNormal() {
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <Typography className={classes.root} variant="h1" gutterBottom>
      NIM
      <Typography className={classes.subtitle} variant="h5" component="span">
        Online
      </Typography>
    </Typography>
  );
}

function LinkLogo({ children }: { children: ReactNode }) {
  const classes = useStylesLink();
  const location = useLocation();

  const currentLocationIsHome = location.pathname === '/' || location.pathname === '';

  return currentLocationIsHome ? (
    <>{children}</>
  ) : (
    <Link className={classes.logoLink} to="/">
      {children}
    </Link>
  );
}

const Logo: FunctionComponent<LogoProps> = ({ size }: LogoProps): ReactElement => {
  return <LinkLogo>{size === 'normal' ? <LogoNormal /> : <LogoSmall />}</LinkLogo>;
};

Logo.defaultProps = {
  size: 'normal',
};

export default Logo;
