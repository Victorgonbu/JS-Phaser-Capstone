import 'phaser';
import Button from '../Objects/Button';

export default class Leaderboard extends Phaser.Scene {
  constructor () {
    super('Leaderboard');
  }

  requestScores() {
      let url = this.sys.game.globals.model.gameOptions.url;
      return fetch(url, {
          method: 'GET'
      });
  }

  create () {
    let config = this.cache.json.get('gamma_json');
    this.cache.bitmapFont.add('gamma', Phaser.GameObjects.RetroFont.Parse(this, config));
    this.text = this.add.bitmapText(this.sys.game.config.width/2 - 176/2, 10, 'gamma', 'LEADERBOARD');
    console.log(this.text.width);
    let scores = this.requestScores();
    scores.then((response) => {
        return response.json();
    }).then((response) => {
        return response.result.sort((a, b) => {
            return b.score - a.score
        });
    }).then((response) => {
        let i = 1
        let verticalSpace = 60
        response.forEach(user => {
        
            if(i < 11) {
                this.add.bitmapText(this.sys.game.config.width - 700, verticalSpace, 'gamma', `${i}. ${user.user.toUpperCase()}`);
                this.add.bitmapText(this.sys.game.config.width - 150, verticalSpace, 'gamma', `${user.score}`);
            }
           
            verticalSpace += 30;
            i += 1;
        });
    });

    this.titleButton = new Button(this, this.sys.game.config.width/2, this.sys.game.config.height- 80, 'blueButton1', 'blueButton2', 'Menu', 'Title');


  }
};