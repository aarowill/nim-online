import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import LogoContainerView from '../components/LogoContainerView';

function NotFound(): ReactElement {
  return (
    <LogoContainerView>
      <Typography align="center" variant="h4">
        404 - Page Not Found
      </Typography>
    </LogoContainerView>
  );
}

export default NotFound;
