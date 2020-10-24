import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import io from 'socket.io-client';
import NewGame from './pages/NewGame';
import JoinGame from './pages/JoinGame';
import Landing from './pages/Landing';
import SocketContext from './SocketContext';

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'prodserver';

const socket = io(serverUrl, {
  path: '/api',
});

const App = (): ReactElement => {
  return (
    <>
      <CssBaseline />
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
            <Route path="/new-game">
              <NewGame />
            </Route>
            <Route path="/join-game">
              <JoinGame />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
          </Switch>
        </Router>
      </SocketContext.Provider>
    </>
  );
};

export default App;
