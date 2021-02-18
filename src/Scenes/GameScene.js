import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
      this.bg_1 = this.add.tileSprite(0, 0, this.sys.game.config.width , this.sys.game.config.height, 'bg_1');
      this.bg_1.scaleX = 1.5;
      this.bg_1.scaleY = 2.3;
      this.bg_1.setOrigin(0, 0);
      this.bg_1.setScrollFactor(0);

      this.bg_2 = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg_2');
      this.bg_2.scaleX = 1.5;
      this.bg_2.scaleY = 2.3;
      this.bg_2.setOrigin(0, 0);
      this.bg_2.setScrollFactor(0);

      this.ground = this.add.tileSprite(0, 0, this.sys.game.config.width, 48, 'ground');
      this.ground.setScale(1.5);
      this.ground.setOrigin(0, 0);
      this.ground.setScrollFactor(0);

      let coin = this.physics.add.sprite(500, 500, 'coin');

      coin.setImmovable(true);
      coin.anims.play('rotate');
      coin.setDepth(2);
     

      

      this.ground.y = 528;

      // add player

      this.player = this.add.sprite(this.sys.game.config.width - 700, 518,'idle_gun_0');
      this.player.setScale(0.2);
      this.anims.create({
        key: 'idle-gun', 
        frames: [
          { key: 'idle_gun_0' },
          { key: 'idle_gun_1' },
          { key: 'idle_gun_2' },
          { key: 'idle_gun_3' },
          { key: 'idle_gun_4' },
          { key: 'idle_gun_5' },
          { key: 'idle_gun_6' },
          { key: 'idle_gun_7' },
          { key: 'idle_gun_8' },
          { key: 'idle_gun_9' }
        ],
        frameRate: 20,
        repeat: -1
      });

      this.player.play('idle-gun');

      // create cursors

      this.cursors = this.input.keyboard.createCursorKeys();

      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, this.sys.game.config.width * 3, this.sys.game.config.height);

      this.myCam.startFollow(this.player);

      
  }

  update() {
    // player movement
    
    if(this.cursors.left.isDown && this.player.x > 0) {
      this.player.x -= 3;
      this.player.scaleX = -0.2;

    }else if(this.cursors.right.isDown && this.player.x < this.sys.game.config.width * 3) {
      this.player.x += 3;
      this.player.scaleX = 0.2;
    }

    // texture scroll

    this.bg_1.tilePositionX = this.myCam.scrollX * .3;
    this.bg_2.tilePositionX = this.myCam.scrollX * .6;
    this.ground.tilePositionX = this.myCam.scrollX;
  }
};
