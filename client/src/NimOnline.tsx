import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { Manager } from 'socket.io-client';
import Routes from './Routes';
import SocketContext from './contexts/SocketContext';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://nim-online2.aarowill.ca';

const manager = new Manager(serverUrl, {
  path: '/api/socket',
  reconnectionAttempts: 5,
  timeout: 10000,
});
const socket = manager.socket('/');

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#00bcd4',
    },
  },
});

const App = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes />
        </Router>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default App;
