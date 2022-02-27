import { Link, Typography, Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function PrivacyPolicyLink(): ReactElement {
  const location = useLocation();

  const currentLocationIsPrivacyPolicy = location.pathname === '/privacy-policy';

  return currentLocationIsPrivacyPolicy ? (
    <></>
  ) : (
    <Typography>
      <Link component={RouterLink} to="/privacy-policy">
        Privacy Policy
      </Link>
    </Typography>
  );
}

function Footer(): ReactElement {
  return (
    <Box marginTop={3} marginBottom={1}>
      <PrivacyPolicyLink />
    </Box>
  );
}

export default Footer;
