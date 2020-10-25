import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NimGame } from '../interfaces/nim';

function Game(): ReactElement {
  const history = useHistory<{ game: NimGame }>();

  const initialGame = history.location.state.game as NimGame;

  const [gameState] = useState(initialGame);

  return (
    <>
      <h1>Game!</h1>
      <p>{JSON.stringify(gameState, null, 2)}</p>
    </>
  );
}

export default Game;
