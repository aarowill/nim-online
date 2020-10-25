import { NimGame } from '@src/nim/nim';

export interface SuccessResponse {
  success: true;
}

export interface NewGameResponse extends SuccessResponse {
  joinCode: string;
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
