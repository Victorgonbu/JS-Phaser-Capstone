/* eslint class-methods-use-this: ["error", { "exceptMethods": ["requestScores"] }] */
import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class Leaderboard extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  requestScores(gameOptions, fetchRequest) {
    const { url } = gameOptions;

    return fetchRequest(url, {
      method: 'GET',

    });
  }

  displayScore(user, verticalSpace, i) {
    if (i > 10) return;
    this.add.bitmapText(this.sys.game.config.width - 700, verticalSpace, 'gamma', `${i}. ${user.user.toUpperCase()}`);
    this.add.bitmapText(this.sys.game.config.width - 150, verticalSpace, 'gamma', `${user.score}`);
  }

  createScoreList(list) {
    let i = 1;
    let verticalSpace = 90;
    list.forEach(user => {
      this.displayScore(user, verticalSpace, i);
      verticalSpace += 30;
      i += 1;
    });
  }

  create() {
    const config = this.cache.json.get('gamma_json');
    this.cache.bitmapFont.add('gamma', Phaser.GameObjects.RetroFont.Parse(this, config));
    this.text = this.add.bitmapText(this.sys.game.config.width / 2 - 176 / 2, 10, 'gamma', 'LEADERBOARD');
    this.username = this.add.bitmapText(this.sys.game.config.width - 700, 50, 'gamma', 'USERNAME');
    this.score = this.add.bitmapText(this.sys.game.config.width - 150, 50, 'gamma', 'SCORE');

    const scoresRequest = this.requestScores(this.sys.game.globals.model.gameOptions(), fetch)
      .then((response) => response.json())
      .then((response) => response.result.sort((a, b) => b.score - a.score));


    scoresRequest.then((list) => {
      this.createScoreList(list);
    });


    this.titleButton = new Button(this, this.sys.game.config.width / 2, this.sys.game.config.height - 80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}