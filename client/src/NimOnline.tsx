import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import io from 'socket.io-client';
import NewGame from './pages/NewGame';
import JoinGame from './pages/JoinGame';
import Landing from './pages/Landing';
import SocketContext from './SocketContext';
import NotFound from './pages/NotFound';
import Game from './pages/Game';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://nim-online.aarowill.ca';

const socket = io(serverUrl, {
  path: '/api/socket',
  reconnectionAttempts: 5,
  timeout: 10000,
});

const theme = createMuiTheme({
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
          <Switch>
            <Route exact path="/new-game">
              <NewGame />
            </Route>
            <Route exact path="/join-game">
              <JoinGame />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default App;
