import { Box, Link, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LogoContainerView from '../components/LogoContainerView';

function PrivacyPolicy(): ReactElement {
  return (
    <LogoContainerView>
      <Box marginTop={2}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography paragraph>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit{' '}
          <Link component={RouterLink} to="/">
            https://nim-online.aarowill.ca
          </Link>{' '}
          (the “Site”).
        </Typography>
        <Typography variant="h6" gutterBottom>
          Personal Information We Collect
        </Typography>
        <Typography paragraph>
          When you visit the Site, we automatically collect certain anonymous information about your device, web
          browser, country, and region. Additionally, as you browse the Site, we collect information about the
          individual web pages that you view, what websites referred you to the Site, and information about how you
          interact with the Site. We refer to this automatically-collected information as “Device Information.”
        </Typography>
        <Typography>We collect Device Information using the following technologies:</Typography>
        <Typography>
          <ul>
            <li>
              “Log files” track actions occurring on the Site, and collect data including your IP address, browser type,
              referring/exit pages, and date/time stamps.
            </li>
            <li>“Web analytics” to track page views and anonymous information about how you interact with the Site.</li>
          </ul>
        </Typography>
        <Typography variant="h6" gutterBottom>
          How Do We Use Your Device Information?
        </Typography>
        <Typography paragraph>
          We use the Device Information that we collect to optimize and improve our Site. We do not share any
          information with third parties.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Changes
        </Typography>
        <Typography paragraph>
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices
          or for other operational, legal or regulatory reasons.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          For more information about our privacy practices, if you have questions, or if you would like to make a
          complaint, please contact us by e-mail at{' '}
          <Link target="_blank" rel="noopener noreferrer" href="mailto:nim-online@aarowill.ca">
            nim-online@aarowill.ca
          </Link>
          .
        </Typography>
      </Box>
    </LogoContainerView>
  );
}

export default PrivacyPolicy;
