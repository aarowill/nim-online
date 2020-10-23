import { newGameState, doTurn, NimGame } from './nim';

describe('nim', () => {
  describe('newGameState', () => {
    it('returns default game state when given no options', () => {
      const game = newGameState();

      expect(game.currentPlayerTurn).toBe(0);
      expect(game.remainingSticks).toBe(20);
      expect(game.maxPickupPerTurn).toBe(3);
      expect(game.lastStickOnTurnLoses).toEqual(true);
      expect(game.winner).toBeUndefined();
    });

    describe('when configured', () => {
      it('sets first turn', () => {
        const expectedTurn = 1;

        const game = newGameState({ firstTurn: 1 });

        expect(game.currentPlayerTurn).toEqual(expectedTurn);
      });

      it('sets the initial number of sticks', () => {
        const expectedNumberOfSticks = 15;

        const game = newGameState({ numberOfSticks: expectedNumberOfSticks });

        expect(game.remainingSticks).toEqual(expectedNumberOfSticks);
      });

      it('fails to create a board with too many sticks', () => {
        expect(() => newGameState({ numberOfSticks: 31 })).toThrow(/too many sticks/i);
      });

      it('fails to create a board with too few sticks', () => {
        expect(() => newGameState({ numberOfSticks: 3 })).toThrow(/too few sticks/i);
      });

      it('sets the maximum pickup per turn', () => {
        const expectedPickupPerTurn = 5;

        const game = newGameState({ maxPickupPerTurn: expectedPickupPerTurn });

        expect(game.maxPickupPerTurn).toEqual(expectedPickupPerTurn);
      });

      it('fails to create a board with too high max pickup', () => {
        expect(() => newGameState({ maxPickupPerTurn: 6 })).toThrow(/too high/i);
      });

      it('fails to create a board with too low max pickup', () => {
        expect(() => newGameState({ maxPickupPerTurn: 1 })).toThrow(/too low/i);
      });

      it('sets whether the last stick on player turn loses', () => {
        const expectedLastStickLoses = false;

        const game = newGameState({ lastStickOnTurnLoses: expectedLastStickLoses });

        expect(game.lastStickOnTurnLoses).toEqual(expectedLastStickLoses);
      });
    });

    describe('doTurn', () => {
      let game: NimGame;

      beforeEach(() => {
        game = newGameState();
      });

      it('updates the stick count and player turn', () => {
        const newGame = doTurn(game, 3);

        expect(newGame.remainingSticks).toEqual(game.remainingSticks - 3);
        expect(newGame.currentPlayerTurn).toEqual(1);
      });

      it('fails when too many sticks are taken', () => {
        expect(() => doTurn(game, 4)).toThrow(/too many/i);
      });

      it('fails when too few sticks are taken', () => {
        expect(() => doTurn(game, 0)).toThrow(/too few/i);
      });

      it('fails when trying to take more sticks than remain in the game', () => {
        game.remainingSticks = 2;

        expect(() => doTurn(game, 3)).toThrow(/not enough sticks remaining/i);
      });

      describe('on the last turn', () => {
        beforeEach(() => {
          game.remainingSticks = 4;
        });

        describe('when there is one stick left', () => {
          it('identifies the end of the game', () => {
            const newGame = doTurn(game, 3);

            expect(newGame.winner).not.toBeUndefined();
          });

          it('identifies the winner of the game', () => {
            game.currentPlayerTurn = 0;
            game.lastStickOnTurnLoses = true;
            const newGame = doTurn(game, 3);

            expect(newGame.winner).toEqual(0);
          });

          it('identifies the winner of a alternate rules game', () => {
            game.lastStickOnTurnLoses = false;
            game.currentPlayerTurn = 0;
            const newGame = doTurn(game, 3);

            expect(newGame.winner).toEqual(1);
          });
        });

        describe('when there are zero sticks left', () => {
          beforeEach(() => {
            game.remainingSticks = 3;
          });

          it('identifies the end of the game', () => {
            const newGame = doTurn(game, 3);

            expect(newGame.winner).not.toBeUndefined();
          });

          it('identifies the winner of the game', () => {
            game.currentPlayerTurn = 0;
            game.lastStickOnTurnLoses = true;
            const newGame = doTurn(game, 3);

            expect(newGame.winner).toEqual(1);
          });

          it('identifies the winner of a alternate rules game', () => {
            game.lastStickOnTurnLoses = false;
            game.currentPlayerTurn = 0;
            const newGame = doTurn(game, 3);

            expect(newGame.winner).toEqual(0);
          });
        });
      });
    });
  });
});
