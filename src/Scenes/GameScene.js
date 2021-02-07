import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    this.platformGroup = this.add.group({
      removeCallback: function(platform) {
        platform.scene.platformPool.add(platform);
      }
    });
    //pool

    this.platformPool = this.add.group({

      removeCallback: function(platform) {
        platform.scene.platformGroup.add(platform);
      }
    });

    //consecutive jumps
    this.playerJumps = 0;

    //add platforms to the game

    this.model = this.sys.game.globals.model;

    this.addPlatform(this.sys.game.config.width, this.sys.game.config.width/ 2, this.sys.game.config.height * this.model.gameOptions.platformVerticalLimit[1]);
    
    // adding the player

    this.player = this.physics.add.sprite(this.model.gameOptions.playerStartPosition, this.sys.game.config.height * 0.7, 'player');
    this.player.setGravityY(this.model.gameOptions.playerGravity);

    // player animation
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1
      }),
      frameRate: 8,
      repeat: -1
    });

    // collisions

    this.physics.add.collider(this.player, this.platformGroup, function () {
      // run fi the player is in the platform

      if(!this.player.anims.isPlaying){
        this.player.anims.play('run');
      }
    }, null, this);

    //checking fo input

    this.input.on('pointerdown', this.jump, this);

  }

  addPlatform(platformWidth, posX, posY) {
    let platform;
    if(this.platformPool.getLength()){
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    }else {
      platform = this.physics.add.sprite(posX, posY, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(Phaser.Math.Between(this.model.gameOptions.platformSpeedRange[0], this.model.gameOptions.platformSpeedRange[1]) * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(this.model.gameOptions.spawnRange[0], this.model.gameOptions.spawnRange[1]);

  }
  // jump method
  jump() {
    if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.model.gameOptions.jumps)){
      if(this.player.body.touching.down){
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.model.gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      //stops  animation  while jumping

      this.player.anims.stop();
    }
  }

  update() {
    // game over
    if(this.player.y > game.config.height){
      this.scene.start('Title');
    }
    this.player.x = this.model.gameOptions.playerStartPosition;

    //recycling platforms

    let minDistance = this.sys.game.config.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function(platform) {
      let platformDistance = this.sys.game.config.width - platform.x - platform.displayWidth / 2;
      if(platformDistance < minDistance){
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;

      }

      if(platform.x < - platform.displayWidth / 2){
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms

    if(minDistance > this.nextPlatformDistance){
      let nextPlatformWidth = Phaser.Math.Between(this.model.gameOptions.platformSizeRange[0], this.model.gameOptions.platformSizeRange[1]);
      let platformRandomHeight = this.model.gameOptions.platformHeighScale * Phaser.Math.Between(this.model.gameOptions.platformHeightRange[0], this.model.gameOptions.platformHeightRange[1]);
      let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      let minPlatformHeight = this.sys.game.config.height * this.model.gameOptions.platformVerticalLimit[0];
      let maxPlatformHeight = this.sys.game.config.height * this.model.gameOptions.platformVerticalLimit[1];
      let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
      this.addPlatform(nextPlatformWidth, this.sys.game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
    }
  }
};
