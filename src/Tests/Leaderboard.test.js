
import Leaderboard from '../Scenes/Leaderboard';
import model from '../Model';

global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => Promise.resolve({user: 'victor', score: '500'}),
    });
});

describe('Leaderboard', () => {
    describe('requestScores', () => {
        it('get the top 10 best scores from api', () => {
            let scene = new Leaderboard();
            let gameModel = new model;
            gameModel = gameModel.gameOptions();
        
            scene.requestScores(gameModel, fetch);     
            
            expect(fetch).toHaveBeenCalledWith(gameModel.url, {method: "GET"});
            
        });
    });
});