import React, { ReactElement, ReactNode } from 'react';
import { Container, makeStyles, Box } from '@material-ui/core';
import Logo from './Logo';
import Footer from './Footer';

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
});

const LogoContainerView = ({ children }: { children: ReactNode }): ReactElement => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Box className={classes.root} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="column" marginY="auto" alignItems="center">
          <Logo />
          {children}
          <Footer />
        </Box>
      </Box>
    </Container>
  );
};

export default LogoContainerView;
