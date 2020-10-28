import { NimGame } from './nim';

interface SuccessResponse {
  success: true;
}

export interface NewGameResponse extends SuccessResponse {
  joinCode: string;
}

export interface JoinGameResponse extends SuccessResponse {
  game?: NimGame;
  playerNumber: 0 | 1;
}

export interface StartGameResponse extends SuccessResponse {
  game: NimGame;
  gameCode: string;
}

export interface DoTurnResponse extends SuccessResponse {
  game: NimGame;
}

export interface ErrorResponse {
  success: false;
  errorMessage: string;
}
