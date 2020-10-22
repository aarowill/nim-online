import { newGameState } from './nim';

describe('nim', () => {
  describe('newGameState', () => {
    it('returns default game state when given no options', () => {
      const game = newGameState();

      expect(game.currentPlayerTurn).toBe(0);
      expect(game.remainingSticks).toBe(20);
      expect(game.maxPickupPerTurn).toBe(3);
      expect(game.lastStickOnTurnLoses).toBe(true);
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

      it('sets the maximum pickup per turn', () => {
        const expectedPickupPerTurn = 10;

        const game = newGameState({ maxPickupPerTurn: expectedPickupPerTurn });

        expect(game.maxPickupPerTurn).toEqual(expectedPickupPerTurn);
      });

      it('sets whether the last stick on player turn loses', () => {
        const expectedLastStickLoses = false;

        const game = newGameState({ lastStickOnTurnLoses: expectedLastStickLoses });

        expect(game.lastStickOnTurnLoses).toEqual(expectedLastStickLoses);
      });
    });
  });
});
