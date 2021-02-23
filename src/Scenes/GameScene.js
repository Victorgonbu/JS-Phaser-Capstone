import 'phaser';
import BulletGroup from '../Objects/bulletGroup';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.bulletGroup;
   
  }

  create () {
  
      // background

      this.bg_1 = this.add.tileSprite(0, 0, this.sys.game.config.width , 793, 'bg_1');
      this.bg_1.setOrigin(0, 0);
      this.bg_1.setScrollFactor(0);

      this.bg_1.y = -185;

      this.bg_2 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_2');
      this.bg_2.setOrigin(0, 0);
      this.bg_2.setScrollFactor(0);

      this.bg_2.y = -185;

     this.bg_3 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_3');
     this.bg_3.setOrigin(0, 0);
     this.bg_3.setScrollFactor(0);

     this.bg_3.y = -185;

     this.bg_4 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_4');
     this.bg_4.setOrigin(0, 0);
     this.bg_4.setScrollFactor(0);

     this.bg_4.y = -185;

     this.bg_5 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_5');
     this.bg_5.setOrigin(0, 0);
     this.bg_5.setScrollFactor(0);
    
     this.bg_5.y = -185;

     this.bg_6 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_6');
     this.bg_6.setOrigin(0, 0);
     this.bg_6.setScrollFactor(0);

     this.bg_6.y = -185;

     this.bg_7 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_7');
     this.bg_7.setOrigin(0, 0);
     this.bg_7.setScrollFactor(0);

     this.bg_7.y = -185;

     this.bg_8 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_8');
     this.bg_8.setOrigin(0, 0);
     this.bg_8.setScrollFactor(0);

     this.bg_8.y = -185;

     this.bg_9 = this.add.tileSprite(0, 0, this.sys.game.config.width, 793, 'bg_9');
     this.bg_9.setOrigin(0, 0);
     this.bg_9.setScrollFactor(0);

     this.bg_9.y = -185;

   
    

      // ground tilemap 

      this.map = this.add.tilemap("tilemap");

      let groundSet = this.map.addTilesetImage('GrayGround', 'gray_ground_tile');
      let bottomGroundSet = this.map.addTilesetImage('GrayBottom', 'gray_bottom_tile');
      let waterSet = this.map.addTilesetImage('WaterTile', 'water_tile');
      let ObjectSet = this.map.addTilesetImage('PlantObjects', 'object_tile');
      let bridgeSet = this.map.addTilesetImage('BridgeTile', 'bridge_tile');
      let treelimbSet = this.map.addTilesetImage('TreeLimb', 'treelimb_tile');
      let colorSet = this.map.addTilesetImage('SolidColors', 'color_tile');
      this.groundLayer = this.map.createLayer('GroundLayer', [groundSet, bottomGroundSet, treelimbSet, bridgeSet, colorSet]);
      this.backgroundLayer = this.map.createLayer('BackgroundGround', [waterSet, groundSet, treelimbSet]);
      this.waterLayer = this.map.createLayer('WaterLayer', waterSet);
      this.objectLayer = this.map.createLayer('Objects', [bridgeSet, ObjectSet]);
      this.physicsLayer = this.map.createLayer('PhysicsOn', [groundSet, bottomGroundSet ,bridgeSet]);

    // add physcis ñayer to the physics group

  
     
      this.physicsLayer.setCollisionByExclusion(-1, true);
      this.groundLayer.setCollisionByExclusion(-1, true);
     
      
      
      let coin = this.physics.add.sprite(500, 500, 'coin');

      coin.setImmovable(true);
      coin.anims.play('rotate');
      coin.setDepth(2);
    

      // add player

      this.player = this.physics.add.sprite(100, 400,'idle_gun_0');
      this.player.setSize(this.player.width/2, this.player.height);
      
      this.player.setScale(0.2);
      this.isWaking = false;
      this.facing = 'right';

      // add enemies group

      this.zombies = this.physics.add.group();
      
     
     console.log(this.map.objects[0].objects);
      
     this.zombieLayer = this.map.getObjectLayer('ZombiesLayer');
     this.zombieLayer.objects.forEach(zombieObj => {
     this.zombies.get(zombieObj.x, zombieObj.y, 'zombie_idle_0').setScale(0.23);
    });
      // create cursors

       this.cursors = this.input.keyboard.createCursorKeys();
       this.shotKeyObject = this.input.keyboard.addKey('SPACE');

      // bullets

      this.bulletGroup = new BulletGroup(this);
      this.addShotEvent();
     
    // tile map collider
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.physicsLayer);
    this.physics.add.collider(this.groundLayer, this.zombies);
    this.physics.add.collider(this.player, this.zombies);
      this.myCam = this.cameras.main;
      this.myCam.setBounds(0, 0, this.sys.game.config.width * 24, this.sys.game.config.height);

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
        this.bulletGroup.fireBullet(this.player.x + 5, this.player.y + 10, 'right');
      }else {
        this.bulletGroup.fireBullet(this.player.x - 5, this.player.y + 10, 'left');
      }
      
    }
  }

  setEnemyScaleAndVelocity(zombieVelocity, zombie) {
    if(this.player.x > zombie.x){
      zombie.setOffset(0, 0);
      zombie.scaleX = 0.23;
      zombie.setVelocityX(zombieVelocity);
    }else{
      zombie.setOffset(222, 0);
      zombie.scaleX = -0.23;
      zombie.setVelocityX(zombieVelocity * -1);
    }
  }

  update() {
    
    // zombie 

    
      
    // player movement
 
    if(this.cursors.left.isDown && this.player.x > 0) {
      this.isWaking = true;
      this.facing = 'left';
      this.player.setVelocityX(-160);
      this.player.anims.play('run-gun', true);
      this.player.setOffset(270, 0);
      this.player.scaleX = -0.2;
      

    }else if(this.cursors.right.isDown && this.player.x < this.sys.game.config.width * 24) {
      this.isWaking = true;
      this.facing = 'right';
      this.player.setVelocityX(160);
      this.player.anims.play('run-gun', true);
      this.player.setOffset(50, 0);
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
  
    this.zombies.children.each(function(zombie) {
      if(this.myCam.scrollX + 800 > zombie.x){
        
        let zombieVelocity = 20;

        this.setEnemyScaleAndVelocity(zombieVelocity, zombie);
      

        if(Math.abs(this.player.x - zombie.x) < 300){
          let zombieSprintVelocity = 100;
          this.setEnemyScaleAndVelocity(zombieSprintVelocity, zombie);
          zombie.anims.play('run-zombie', true);

        }else
        {
          zombie.anims.play('walk-zombie', true);
        }
        
      }else {
        zombie.anims.play('idle-zombie', true);
      }
    }, this);
    
    
    
    this.bg_1.tilePositionX = this.myCam.scrollX * .1;
    this.bg_2.tilePositionX = this.myCam.scrollX * .2;
    this.bg_3.tilePositionX = this.myCam.scrollX * .3;
    this.bg_4.tilePositionX = this.myCam.scrollX * .4;
    this.bg_5.tilePositionX = this.myCam.scrollX * .5;
    this.bg_6.tilePositionX = this.myCam.scrollX * .6;
    this.bg_7.tilePositionX = this.myCam.scrollX * .7;
    this.bg_8.tilePositionX = this.myCam.scrollX * .8;
    this.bg_9.tilePositionX = this.myCam.scrollX * .9;


    
  
  }


};
