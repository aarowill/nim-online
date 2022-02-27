import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewGame from './pages/NewGame';
import JoinGame from './pages/JoinGame';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Game from './pages/Game';
import PrivacyPolicy from './pages/PrivacyPolicy';
import useAnalytics from './hooks/useAnalytics';

export default function Routes(): ReactElement {
  useAnalytics();

  return (
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
      <Route exact path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
