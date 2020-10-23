import React, { ReactElement } from 'react';
import LogoContainerView from '../components/LogoContainerView';

function NewGame(): ReactElement {
  return (
    <LogoContainerView>
      <h1>New game!</h1>
    </LogoContainerView>
  );
}

export default NewGame;
