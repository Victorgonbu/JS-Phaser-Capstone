import GameScene from '../Scenes/GameScene';
import model from '../Model';


describe('GameScene', () => {
    describe('scoreUp', () => {
        it('scores up everytime a zombie is killed', () => {
            let scene = new GameScene();
            let score = 0;
            expect(scene.scoreUp(score)).toEqual(10);
        });
    });
    describe('playerProperties', () => {
        describe('Return player current properties', () => {
            let scene = new GameScene();
            let gameModel = new model();
            gameModel = gameModel.gameOptions();
           it('When facing right', () => {
                expect(scene.playerProperties('left', gameModel)).toEqual({
                    velocity: -160,
                    offsetX: 270,
                    scale: -0.2
                });
           });

           it('When facing left', () => {
                expect(scene.playerProperties('right', gameModel)).toEqual({
                    velocity: 160,
                    offsetX: 50,
                    scale: 0.2
                });
           });
        });
    });
});