import 'phaser';
import BulletGroup from '../Objects/bulletGroup';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.bulletGroup;
    this.backgroundLayers = [];
    this.scrollMultiply = 0.1;
  }

  addHud() {
    this.scoreText = this.add.text(16, 20, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  }

  addSfxSounds() {
    this.bgMusic = this.sound.add('bg_sound', { volume: 0.2, loop: true, delay: 5000 });
    this.gunShot = this.sound.add('gun_shot', { volume: 0.4, loop: false });
    this.zombieEffect = this.sound.add('zombie_idle_sound', {
      volume: 0.1, loop: true, mute: false, rate: 0.7, detune: 0, delay: 0,
    });
  }

  addParallaxBackground() {
    for (let i = 1; i < 10; i += 1) {
      const background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.model.backgroundHeight, `bg_${i}`).setOrigin(0, 0).setScrollFactor(0).setY(this.model.backgroundOffset);
      this.backgroundLayers.push(background);
    }
  }

  addTilemapLayers() {
    const groundSet = this.map.addTilesetImage('GrayGround', 'gray_ground_tile');
    const bottomGroundSet = this.map.addTilesetImage('GrayBottom', 'gray_bottom_tile');
    const waterSet = this.map.addTilesetImage('WaterTile', 'water_tile');
    const ObjectSet = this.map.addTilesetImage('PlantObjects', 'object_tile');
    const bridgeSet = this.map.addTilesetImage('BridgeTile', 'bridge_tile');
    const treelimbSet = this.map.addTilesetImage('TreeLimb', 'treelimb_tile');
    const colorSet = this.map.addTilesetImage('SolidColors', 'color_tile');

    this.groundLayer = this.map.createLayer('GroundLayer', [groundSet, bottomGroundSet, treelimbSet, bridgeSet, colorSet]);
    this.backgroundLayer = this.map.createLayer('BackgroundGround', [waterSet, groundSet, treelimbSet]);
    this.waterLayer = this.map.createLayer('WaterLayer', waterSet);
    this.objectLayer = this.map.createLayer('Objects', [bridgeSet, ObjectSet]);
  }

  addPlayer() {
    this.player = this.physics.add.sprite(this.model.playerStartPositionX, this.model.playerStartPositionY, 'idle_gun_0');
    this.player.setSize(this.player.width / 2, this.player.height);
    this.player.isDead = false;
    this.player.setScale(this.model.playerScale);
    this.playerHealth = 1;
    this.canDoubleJump = true;
    this.isWaking = false;
    this.facing = 'right';
  }

  addZombieSound(zombie) {
    if ((zombie.anims.currentAnim.key === 'walk-zombie' || zombie.anims.currentAnim.key === 'run-zombie') && zombie.isWaking === false && zombie.dead === false) {
      this.zombieEffect.play();
      zombie.isWaking = true;
    }
  }

  addEnemies() {
    this.zombieLayer = this.map.getObjectLayer('ZombiesLayer');
    this.zombieLayer.objects.forEach(zombieObj => {
      const zombie = this.zombies.get(zombieObj.x, zombieObj.y, 'zombie_idle_0').setScale(0.23);
      zombie.play('idle-zombie');
      zombie.health = 20;
      zombie.dead = false;
      zombie.hurt = false;
      zombie.isWaking = false;
      zombie.on('animationrepeat', () => {
        this.addZombieSound(zombie);
      });
    });
  }

  create() {
    // score
    this.score = 0;
    // model for game options
    this.model = this.sys.game.globals.model.gameOptions;
    this.sys.game.globals.bgMusic.stop();


    this.addSfxSounds();

    // play bgmusic

    this.bgMusic.play();

    this.addParallaxBackground();

    // score hud

    this.addHud();


    // ground tilemap


    this.map = this.add.tilemap('tilemap');


    this.addTilemapLayers();


    // add collision to some tile layers

    this.groundLayer.setCollisionByExclusion(-1, true);
    this.waterLayer.setCollisionByExclusion(-1, true);

    // add player

    this.addPlayer();


    // add enemies group

    this.zombies = this.physics.add.group();


    this.addEnemies();

    // create cursors

    this.cursors = this.input.keyboard.createCursorKeys();
    this.shotKeyObject = this.input.keyboard.addKey('SPACE');

    // bullets

    this.bulletGroup = new BulletGroup(this);
    this.addShotEvent();

    // add colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.physicsLayer);
    this.physics.add.collider(this.groundLayer, this.zombies);
    this.physics.add.collider(this.player, this.waterLayer, (player, water) => {
      player.isDead = true;
    });
    this.physics.add.collider(this.player, this.zombies, (player, zombie) => {
      player.isDead = true;
    });
    this.physics.add.collider(this.zombies, this.bulletGroup, (zombie, bullet) => {
      // zombie collide with bullets
      zombie.health -= 1;


      if (zombie.health <= 0 && zombie.dead === false) {
        zombie.play('dead-zombie');
        zombie.setSize(zombie.width * 2, zombie.height / 2 - 20);
        zombie.dead = true;
      } else if (zombie.dead === false) {
        zombie.hurt = true;
      }
    });

    // create main camera

    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, this.sys.game.config.width * 24, this.sys.game.config.height);

    this.myCam.startFollow(this.player);
  }

  scoreUp() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  addShotEvent() {
    this.input.keyboard.on('keydown-SPACE', function () {
      this.shootBullet();
    }, this);
  }

  shootBullet() {
    if (!this.isWaking) {
      this.gunShot.play();
      if (this.facing === 'right') {
        this.bulletGroup.fireBullet(this.player.x + 5, this.player.y + 10, 'right');
      } else {
        this.bulletGroup.fireBullet(this.player.x - 5, this.player.y + 10, 'left');
      }
    }
  }

  setEnemyScaleAndVelocity(zombieVelocity, zombie) {
    if (this.player.x > zombie.x) {
      if (zombie.dead === false) {
        zombie.setOffset(0, 0);
        zombie.scaleX = 0.23;
        zombie.setVelocityX(zombieVelocity);
      }
    } else if (zombie.dead === false) {
      zombie.setOffset(222, 0);
      zombie.scaleX = -0.23;
      zombie.setVelocityX(zombieVelocity * -1);
    } else {
      zombie.setOffset(400, 0);
    }
  }

  backgroundScroll() {
    this.backgroundLayers.forEach(background => {
      background.tilePositionX = this.myCam.scrollX * this.scrollMultiply;
      this.scrollMultiply += 0.1;
    });
    this.scrollMultiply = 0.1;
  }

  playerProperties(side) {
    let velocity = this.model.playerVelocity;
    let scale = this.model.playerScale;
    let offsetX;

    if (side === 'left') {
      velocity *= -1;
      scale *= -1;
      offsetX = this.model.leftPlayerOffset;
    } else {
      offsetX = this.model.rightPlayerOffset;
    }
    return {
      velocity,
      offsetX,
      scale,
    };
  }

  playerIdle() {
    this.isWaking = false;
    this.player.play('idle-gun', true);
    this.player.setVelocityX(0);
  }

  playerWalkAnimation() {
    if (this.player.body.onFloor()) {
      this.player.anims.play('run-gun', true);
    }
  }

  playerMove(side) {
    const playerSideProperties = this.playerProperties(side);
    this.isWaking = true;
    this.facing = side;
    this.player.setVelocityX(playerSideProperties.velocity);
    this.player.setOffset(playerSideProperties.offsetX, 0);
    this.player.scaleX = playerSideProperties.scale;
  }

  killGame(boolean) {
    this.backgroundLayers = [];

    this.scene.start('GameOver', {
      complete: boolean,
      score: this.score,
    });
    this.bgMusic.stop();
    this.zombieEffect.stop();
  }


  killPlayer() {
    this.player.setVelocity(0);
    this.player.play('hurt-gun', true);
    this.player.on('animationcomplete', () => {
      this.killGame(false);
    });
  }

  playerJump(jumpPressed) {
    if (!jumpPressed) return;
    if (this.player.body.onFloor()) {
      this.canDoubleJump = true;
      this.player.anims.play('jump-gun');
      this.player.body.setVelocityY(-200);
    } else if (this.canDoubleJump) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play('jump-gun');
      this.canDoubleJump = false;
    }
  }

  killZombie(zombie) {
    this.zombies.killAndHide(zombie);
    this.zombies.remove(zombie);
    this.zombieEffect.stop();
  }

  update() {
    // player movement

    if (this.cursors.left.isDown && this.player.x > 0 && this.player.isDead === false) {
      this.playerMove('left');
      this.playerWalkAnimation();
    } else if (this.cursors.right.isDown && this.player.x < this.sys.game.config.width * 24 && this.player.isDead === false) {
      this.playerMove('right');
      this.playerWalkAnimation();
    } else if (!this.shotKeyObject.isDown && this.player.isDead === false) {
      this.playerIdle();
    } else if (this.player.isDead === true) {
      this.killPlayer();
    }

    if (this.player.x > this.sys.game.config.width * 24) {
      this.killGame(true);
    }


    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);

    this.playerJump(jumpPressed);


    this.shotKeyObject.on('down', function () {
      this.player.setVelocityX(0);
      this.player.anims.play('shot-gun', false);
    }, this);


    this.zombies.children.each(function (zombie) {
      if (this.myCam.scrollX + 800 > zombie.x) {
        if (zombie.y >= 600) {
          this.killZombie(zombie);
        }

        const zombieVelocity = 20;

        this.setEnemyScaleAndVelocity(zombieVelocity, zombie);


        if (zombie.dead == true) {
          zombie.setVelocityX(0);
          zombie.on('animationcomplete', () => {
            this.killZombie(zombie);
            this.scoreUp();
          });
        } else if (Math.abs(this.player.x - zombie.x) < 300 && zombie.health > 0 && zombie.hurt == false) {
          const zombieSprintVelocity = 100;
          this.setEnemyScaleAndVelocity(zombieSprintVelocity, zombie);
          zombie.anims.play('run-zombie', true);
        } else if (zombie.hurt === true) {
          zombie.anims.play('hurt-zombie', true);
          zombie.on('animationcomplete', () => {
            zombie.hurt = false;
          });
        } else {
          zombie.anims.play('walk-zombie', true);
        }
      }
    }, this);


    this.scoreText.setX(this.myCam.scrollX + 20);

    this.backgroundScroll();
  }
}
