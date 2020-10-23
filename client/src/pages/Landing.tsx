import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import LogoContainerView from '../components/LogoContainerView';

function Landing(): ReactElement {
  return (
    <LogoContainerView>
      <Box display="flex" flexDirection="column" marginTop={4} maxWidth="xs" alignItems="center">
        <Box marginY={2} width="8rem">
          <Button variant="contained" size="large" color="primary" component={Link} to="/new-game" fullWidth>
            New Game
          </Button>
        </Box>
        <Box marginY={2} width="8rem">
          <Button variant="contained" size="large" color="primary" component={Link} to="/join-game" fullWidth>
            Join Game
          </Button>
        </Box>
      </Box>
    </LogoContainerView>
  );
}

export default Landing;
