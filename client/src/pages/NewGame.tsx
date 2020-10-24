import React, { ReactElement } from 'react';
import LogoContainerView from '../components/LogoContainerView';
import GameConfiguration from '../components/GameConfiguration';
import JoinCodeDisplay from '../components/JoinCodeDisplay';

function NewGame(): ReactElement {
  return (
    <LogoContainerView>
      <JoinCodeDisplay />
      <GameConfiguration />
    </LogoContainerView>
  );
}

export default NewGame;
