import 'phaser';
import BulletGroup from '../Objects/bulletGroup';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.bulletGroup;
  }

  create () {
  
      // background

      this.bg_1 = this.add.tileSprite(0, 0, this.sys.game.config.width , this.sys.game.config.height, 'bg_1');
      this.bg_1.setOrigin(0, 0);
      this.bg_1.setScrollFactor(0);

      this.bg_2 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_2');
      this.bg_2.setOrigin(0, 0);
      this.bg_2.setScrollFactor(0);

      this.bg_2.y = -200;

     this.bg_3 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_3');
     this.bg_3.setOrigin(0, 0);
     this.bg_3.setScrollFactor(0);

     this.bg_3.y = -200;

     this.bg_4 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_4');
     this.bg_4.setOrigin(0, 0);
     this.bg_4.setScrollFactor(0);

     this.bg_4.y = -200;

     this.bg_5 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_5');
     this.bg_5.setOrigin(0, 0);
     this.bg_5.setScrollFactor(0);
    
     this.bg_5.y = -200;

     this.bg_6 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_6');
     this.bg_6.setOrigin(0, 0);
     this.bg_6.setScrollFactor(0);

     this.bg_6.y = -200;

     this.bg_7 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_7');
     this.bg_7.setOrigin(0, 0);
     this.bg_7.setScrollFactor(0);

     this.bg_7.y = -200;

     this.bg_8 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_8');
     this.bg_8.setOrigin(0, 0);
     this.bg_8.setScrollFactor(0);

     this.bg_8.y = -200;

     this.bg_9 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_9');
     this.bg_9.setOrigin(0, 0);
     this.bg_9.setScrollFactor(0);

     this.bg_9.y = -200;

     this.bg_10 = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg_10');
     this.bg_10.setOrigin(0, 0);
     this.bg_10.setScrollFactor(0);

     this.bg_11 = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, 'bg_11');
     this.bg_11.setOrigin(0, 0);
     this.bg_11.setScrollFactor(0);
     

      // ground tilemap 

      this.map = this.add.tilemap("tilemap");
      let tileSet = this.map.addTilesetImage('BrownGround', 'brown_tile');

      this.groundLayer = this.map.createLayer('GroundLayer', tileSet);
      
      this.groundLayer.setCollisionByExclusion(-1, true);
     
      
      
      let coin = this.physics.add.sprite(500, 500, 'coin');

      coin.setImmovable(true);
      coin.anims.play('rotate');
      coin.setDepth(2);
    

      // add player

      this.player = this.physics.add.sprite(this.sys.game.config.width - 100, 400,'idle_gun_0');
    
      this.player.setScale(0.2);
      this.isWaking = false;
      this.facing = 'right';
      // create cursors

       this.cursors = this.input.keyboard.createCursorKeys();
       this.shotKeyObject = this.input.keyboard.addKey('SPACE');

      // bullets

      this.bulletGroup = new BulletGroup(this);
      this.addShotEvent();
     
    // tile map collider
    this.physics.add.collider(this.player, this.groundLayer);
  
     

      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, this.sys.game.config.width * 3, this.sys.game.config.height);

      this.myCam.startFollow(this.player);

      
      
      
  }

  addShotEvent() {
    this.input.keyboard.on('keydown-SPACE', function() {
          this.shootBullet();
    }, this);
  }

  shootBullet() {
    if(!this.isWaking){
      if(this.facing === 'right'){
        this.bulletGroup.fireBullet(this.player.x + 46, this.player.y + 10, 'right');
      }else {
        this.bulletGroup.fireBullet(this.player.x - 46, this.player.y + 10, 'left');
      }
      
    }
  }

  update() {
      
    // player movement
 
    if(this.cursors.left.isDown && this.player.x > 0) {
      this.isWaking = true;
      this.facing = 'left';
      this.player.setVelocityX(-160);
      this.player.anims.play('run-gun', true);
      this.player.scaleX = -0.2;

    }else if(this.cursors.right.isDown && this.player.x < this.sys.game.config.width * 3) {
      this.isWaking = true;
      this.facing = 'right';
      this.player.setVelocityX(160);
      this.player.anims.play('run-gun', true);
      this.player.scaleX = 0.2;
    }else if(!this.shotKeyObject.isDown){
      this.isWaking = false;
      this.player.anims.play('idle-gun', true);
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown){
      this.player.anims.play('jump-gun');
      this.player.setVelocityY(-160);
    }

    this.shotKeyObject.on('down', function() {
      this.player.setVelocityX(0);
      this.player.anims.play('shot-gun', false);
    }, this);
    

    // texture scroll
    
    this.bg_1.tilePositionX = this.myCam.scrollX * .3;
    this.bg_2.tilePositionX = this.myCam.scrollX * .6;
    
  
  }
};
