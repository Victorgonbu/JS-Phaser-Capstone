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
      this.physics.add.existing(this.ground, false);
      this.ground.body.allowGravity = false;
      this.ground.body.setImmovable(true);
     
      this.ground.setScale(1);
      this.ground.setOrigin(0, 0);

      this.ground2 = this.add.tileSprite(0, 0, this.sys.game.config.width, 48, 'ground');
      this.physics.add.existing(this.ground2, false);
      this.ground2.body.allowGravity = false;
      this.ground2.body.setImmovable(true);
     
      this.ground2.setScale(1);
      this.ground2.setOrigin(0, 0);
    
      

      let coin = this.physics.add.sprite(500, 500, 'coin');

      coin.setImmovable(true);
      coin.anims.play('rotate');
      coin.setDepth(2);
     

      this.ground2.x = this.sys.game.config.width + 190;
      this.ground2.y = 528;

      this.ground.y = 528;

      // add player

      this.player = this.physics.add.sprite(this.sys.game.config.width - 100, 400,'idle_gun_0');
    
      this.player.setScale(0.2);
     

      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(this.player, this.ground2);
      
      // create cursors

      this.cursors = this.input.keyboard.createCursorKeys();
      this.shotKeyObject = this.input.keyboard.addKey('SPACE');

      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, this.sys.game.config.width * 3, this.sys.game.config.height);

      this.myCam.startFollow(this.player);

      
      
      
  }

  update() {
    // player movement
 
    if(this.cursors.left.isDown && this.player.x > 0) {
  
      this.player.setVelocityX(-160);
      this.player.anims.play('run-gun', true);
      this.player.scaleX = -0.2;

    }else if(this.cursors.right.isDown && this.player.x < this.sys.game.config.width * 3) {
      
      this.player.setVelocityX(160);
      this.player.anims.play('run-gun', true);
      this.player.scaleX = 0.2;
    }else if(!this.shotKeyObject.isDown){
      this.player.anims.play('idle-gun', true);
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown){
      this.player.anims.stop();
      this.player.setVelocityY(-160);
    }
    
    if(this.shotKeyObject.isDown) {
      this.player.setVelocityX(0);
      this.player.anims.play('shot-gun', true);
    }

    // texture scroll
    
    this.bg_1.tilePositionX = this.myCam.scrollX * .3;
    this.bg_2.tilePositionX = this.myCam.scrollX * .6;
    
  
  }
};
