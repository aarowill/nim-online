import { NimGame } from './nim';

export interface GameRedirectState {
  game: NimGame;
  player: 0 | 1;
}
