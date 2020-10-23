import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import NewGame from './pages/NewGame';
import JoinGame from './pages/JoinGame';
import Landing from './pages/Landing';

const App = (): ReactElement => {
  return (
    <>
      <CssBaseline />
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
    </>
  );
};

export default App;
