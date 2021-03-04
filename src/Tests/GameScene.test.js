import GameScene from '../Scenes/GameScene';
import Model from '../Model';


describe('GameScene', () => {
  describe('scoreUp', () => {
    it('scores up everytime a zombie is killed', () => {
      const scene = new GameScene();
      const score = 0;
      expect(scene.scoreUp(score)).toEqual(10);
    });
  });
  describe('playerProperties', () => {
    describe('Return player current properties', () => {
      const scene = new GameScene();
      let gameModel = new Model();
      gameModel = gameModel.gameOptions();
      it('When facing right', () => {
        expect(scene.playerProperties('left', gameModel)).toEqual({
          velocity: -160,
          offsetX: 270,
          scale: -0.2,
        });
      });

      it('When facing left', () => {
        expect(scene.playerProperties('right', gameModel)).toEqual({
          velocity: 160,
          offsetX: 50,
          scale: 0.2,
        });
      });
    });
  });
});