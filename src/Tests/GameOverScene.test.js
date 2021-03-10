import GameOverScene from '../Scenes/GameOverScene';
import Model from '../Model';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve({ user: 'victor', score: '500' }),
  });
});
describe('GameOverScene', () => {
  describe('setScoreInLeaderboard', () => {
    it('make request to set score in leaderbaord', () => {
      const scene = new GameOverScene();
      let gameModel = new Model();
      gameModel = gameModel.gameOptions();
      scene.setScoreInLeaderboard('victor', '10', gameModel);
      expect(fetch).toHaveBeenCalledWith(gameModel.url, {
        body: '{"user":"victor","score":"10"}',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    });
  });
});