import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    // Game

    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'greenButton', 'greenButton', 'Play', 'Game');
  

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');
 

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

  

    this.model = this.sys.game.globals.model;
    
    if(this.model.musicOn === true  && this.model.bgMusicPlaying === false) {
      this.model.bgMusicPlaying = true;
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.sys.game.globals.bgMusic = this.bgMusic;
      
    }

    this.input.on('pointerover', function (event, gameObjects) {

      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', function (event, gameObjects) {
      
      gameObjects[0].setTexture('blueButton1');
    });


  }
  
};
