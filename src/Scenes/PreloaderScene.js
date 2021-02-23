import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    // load assets needed in our game
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    // background

    this.load.image('bg_1', 'assets/Background/Layer_0010_1.png');
    this.load.image('bg_2', 'assets/Background/Layer_0009_2.png');
    this.load.image('bg_3', 'assets/Background/Layer_0008_3.png');
    this.load.image('bg_4', 'assets/Background/Layer_0007_Lights.png');
    this.load.image('bg_5', 'assets/Background/Layer_0006_4.png');
    this.load.image('bg_6', 'assets/Background/Layer_0005_5.png');
    this.load.image('bg_7', 'assets/Background/Layer_0004_Lights.png');
    this.load.image('bg_8', 'assets/Background/Layer_0003_6.png');
    this.load.image('bg_9', 'assets/Background/Layer_0002_7.png');
    this.load.image('bg_10', 'assets/Background/Layer_0001_8.png');
    this.load.image('bg_11', 'assets/Background/Layer_0000_9.png');

    // tilemaps
    // tiles
    this.load.image('gray_ground_tile', 'assets/jungle/tile_jungle_ground_grey.png');
    this.load.image('object_tile', 'assets/jungle/tile_jungle_plants_objects.png');
    this.load.image('gray_bottom_tile', 'assets/jungle/tile_jungle_bottom_grey.png');
    this.load.image('water_tile', 'assets/jungle/tile_jungle_water.png');
    this.load.image('bridge_tile', 'assets/jungle/tile_jungle_bridge.png');
    this.load.image('treelimb_tile', 'assets/jungle/tile_jungle_treelimb.png');
    this.load.image('color_tile', 'assets/jungle/bg_solid_colors.png');
    // tilemap
    this.load.tilemapTiledJSON('tilemap', 'assets/GrayGround.json');

    // background tilemap
 
    this.load.tilemapTiledJSON('backgroundTilemap', 'assets/BackgroundTile.json');
    
    this.load.spritesheet('coin', 'assets/coin.png', {
      frameWidth: 20,
      frameHeight: 20
    });
    // player gun mode
    // idle
    this.load.image('idle_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_000.png');
    this.load.image('idle_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_001.png');
    this.load.image('idle_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_002.png');
    this.load.image('idle_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_003.png');
    this.load.image('idle_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_004.png');
    this.load.image('idle_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_005.png');
    this.load.image('idle_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_006.png');
    this.load.image('idle_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_007.png');
    this.load.image('idle_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_008.png');
    this.load.image('idle_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/01-Idle/E_E_Gun__Idle_009.png');

    // run

    this.load.image('run_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_000.png');
    this.load.image('run_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_001.png');
    this.load.image('run_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_002.png');
    this.load.image('run_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_003.png');
    this.load.image('run_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_004.png');
    this.load.image('run_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_005.png');
    this.load.image('run_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_006.png');
    this.load.image('run_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_007.png');
    this.load.image('run_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_008.png');
    this.load.image('run_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/02-Run/E_E_Gun__Run_000_009.png');

    // shot
    this.load.image('shot_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_000.png');
    this.load.image('shot_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_001.png');
    this.load.image('shot_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_002.png');
    this.load.image('shot_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_003.png');
    this.load.image('shot_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_004.png');
    this.load.image('shot_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_005.png');
    this.load.image('shot_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_006.png');
    this.load.image('shot_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_007.png');
    this.load.image('shot_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_008.png');
    this.load.image('shot_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/03-Shot/E_E_Gun__Attack_009.png');

    // jump´
    this.load.image('jump_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/05-Jump/E_E_Gun__Jump_000.png');
  
    // hurt 
    this.load.image('hurt_gun_0', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_000.png');
    this.load.image('hurt_gun_1', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_001.png');
    this.load.image('hurt_gun_2', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_002.png');
    this.load.image('hurt_gun_3', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_003.png');
    this.load.image('hurt_gun_4', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_004.png');
    this.load.image('hurt_gun_5', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_005.png');
    this.load.image('hurt_gun_6', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_006.png');
    this.load.image('hurt_gun_7', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_007.png');
    this.load.image('hurt_gun_8', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_008.png');
    this.load.image('hurt_gun_9', 'assets/Soldier-Guy-PNG/_Mode-Gun/04-Hurt/E_E_Gun__Hurt_009.png');

    // Zombie Enemies

    // idle

    this.load.image('zombie_idle_0', 'assets/Zombie/Zombie1/animation/Idle1.png');
    this.load.image('zombie_idle_1', 'assets/Zombie/Zombie1/animation/Idle2.png');
    this.load.image('zombie_idle_2', 'assets/Zombie/Zombie1/animation/Idle3.png');
    this.load.image('zombie_idle_3', 'assets/Zombie/Zombie1/animation/Idle4.png');

    // walk

    this.load.image('zombie_walk_0', 'assets/Zombie/Zombie1/animation/Walk1.png');
    this.load.image('zombie_walk_1', 'assets/Zombie/Zombie1/animation/Walk2.png');
    this.load.image('zombie_walk_2', 'assets/Zombie/Zombie1/animation/Walk3.png');
    this.load.image('zombie_walk_3', 'assets/Zombie/Zombie1/animation/Walk4.png');
    this.load.image('zombie_walk_4', 'assets/Zombie/Zombie1/animation/Walk5.png');
    this.load.image('zombie_walk_5', 'assets/Zombie/Zombie1/animation/Walk6.png');

    // run

    this.load.image('zombie_run_0', 'assets/Zombie/Zombie1/animation/Run1.png');
    this.load.image('zombie_run_1', 'assets/Zombie/Zombie1/animation/Run2.png');
    this.load.image('zombie_run_2', 'assets/Zombie/Zombie1/animation/Run3.png');
    this.load.image('zombie_run_3', 'assets/Zombie/Zombie1/animation/Run4.png');
    this.load.image('zombie_run_4', 'assets/Zombie/Zombie1/animation/Run5.png');
    this.load.image('zombie_run_5', 'assets/Zombie/Zombie1/animation/Run6.png');
    this.load.image('zombie_run_6', 'assets/Zombie/Zombie1/animation/Run7.png');
    this.load.image('zombie_run_7', 'assets/Zombie/Zombie1/animation/Run8.png');
    this.load.image('zombie_run_8', 'assets/Zombie/Zombie1/animation/Run9.png');
    this.load.image('zombie_run_9', 'assets/Zombie/Zombie1/animation/Run10.png');

    // hurt


    this.load.image('zombie_hurt_0', 'assets/Zombie/Zombie1/animation/Hurt1.png');
    this.load.image('zombie_hurt_1', 'assets/Zombie/Zombie1/animation/Hurt2.png');
    this.load.image('zombie_hurt_2', 'assets/Zombie/Zombie1/animation/Hurt3.png');
    this.load.image('zombie_hurt_3', 'assets/Zombie/Zombie1/animation/Hurt4.png');
    this.load.image('zombie_hurt_4', 'assets/Zombie/Zombie1/animation/Hurt5.png');

    // dead

    this.load.image('zombie_dead_0', 'assets/Zombie/Zombie1/animation/Dead1.png');
    this.load.image('zombie_dead_1', 'assets/Zombie/Zombie1/animation/Dead2.png');
    this.load.image('zombie_dead_2', 'assets/Zombie/Zombie1/animation/Dead3.png');
    this.load.image('zombie_dead_3', 'assets/Zombie/Zombie1/animation/Dead4.png');
    this.load.image('zombie_dead_4', 'assets/Zombie/Zombie1/animation/Dead5.png');
    this.load.image('zombie_dead_5', 'assets/Zombie/Zombie1/animation/Dead6.png');
    this.load.image('zombie_dead_6', 'assets/Zombie/Zombie1/animation/Dead7.png');
    this.load.image('zombie_dead_7', 'assets/Zombie/Zombie1/animation/Dead8.png');




    this.load.spritesheet('zombie_idle','assets/Zombie/Zombie1/animation/idle_zombie.png', {
      frameWidth: 32,
      frameHeight: 64
    });

    // other

    // bullet texture
    this.load.image('bullet', 'assets/Soldier-Guy-PNG/_Weapon/Bullet.png');
    


    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

  }

  create() {

    // zombie animation

    // idle
    this.anims.create({
      key: 'idle-zombie', 
      frames: [
        { key: 'zombie_idle_0' },
        { key: 'zombie_idle_1' },
        { key: 'zombie_idle_2' },
        { key: 'zombie_idle_3' },
        { key: 'zombie_idle_3' },
        { key: 'zombie_idle_2' },
        { key: 'zombie_idle_1' },
        { key: 'zombie_idle_0' },
      ],
      frameRate: 16,
      repeat: -1
    });

    // walk

    this.anims.create({
      key: 'walk-zombie', 
      frames: [
        { key: 'zombie_walk_0' },
        { key: 'zombie_walk_0' },
        { key: 'zombie_walk_1' },
        { key: 'zombie_walk_1' },
        { key: 'zombie_walk_2' },
        { key: 'zombie_walk_2' },
        { key: 'zombie_walk_3' },
        { key: 'zombie_walk_3' },
        { key: 'zombie_walk_4' },
        { key: 'zombie_walk_4' },
        { key: 'zombie_walk_5' },
        { key: 'zombie_walk_5' },
      ],
      yoyo: false,
      frameRate: 18,
      repeat: -1
    });

    // run

    this.anims.create({
      key: 'run-zombie', 
      frames: [
    
        { key: 'zombie_run_3' },
        { key: 'zombie_run_4' },
        { key: 'zombie_run_5' },
        { key: 'zombie_run_6' },
        { key: 'zombie_run_7' },
        { key: 'zombie_run_8' },
        { key: 'zombie_run_9' },
        
      ],
      yoyo: false,
      frameRate: 18,
      repeat: -1
    });


    // hurt

    this.anims.create({
      key: 'hurt-zombie', 
      frames: [
        { key: 'zombie_hurt_0' },
        { key: 'zombie_hurt_1' },
        { key: 'zombie_hurt_2' },
        { key: 'zombie_hurt_3' },
        { key: 'zombie_hurt_4' },
      
        
      ],
      frameRate: 20,
      repeat: 0
    });

    // dead

    this.anims.create({
      key: 'dead-zombie', 
      frames: [
        { key: 'zombie_dead_0' },
        { key: 'zombie_dead_1' },
        { key: 'zombie_dead_2' },
        { key: 'zombie_dead_3' },
        { key: 'zombie_dead_4' },
        { key: 'zombie_dead_5' },
        { key: 'zombie_dead_6' },
        { key: 'zombie_dead_7' },
      
        
      ],
      yoyo: false,
      frameRate: 20,
      repeat: 0
    });


     //player animation
     // gun mode
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

    this.anims.create({
      key: 'run-gun',
      frames: [
        { key: 'run_gun_0'},
        { key: 'run_gun_1'},
        { key: 'run_gun_2'},
        { key: 'run_gun_3'},
        { key: 'run_gun_4'},
        { key: 'run_gun_5'},
        { key: 'run_gun_6'},
        { key: 'run_gun_7'},
        { key: 'run_gun_8'},
        { key: 'run_gun_9'},
      ],
      frameRate: 20, 
      repeat: -1
    });

    this.anims.create({
      key: 'shot-gun',
      frames: [
        { key: 'shot_gun_0' },
        { key: 'shot_gun_1' },
        { key: 'shot_gun_2' },
        { key: 'shot_gun_3' },
        { key: 'shot_gun_4' },
        { key: 'shot_gun_5' },
        { key: 'shot_gun_6' },
        { key: 'shot_gun_7' },
        { key: 'shot_gun_8' },
        { key: 'shot_gun_9' },

      ],
      frameRate: 40,
      repeat: 0
    });
    

    this.anims.create({
      key: 'jump-gun',
      frames: [
        { key: 'jump_gun_0' }
      ],
      frameRate: 1,
      repeat: 1

    });

    this.anims.create({
      key: 'hurt-gun',
      frames: [
        { key: 'hurt_gun_0' },
        { key: 'hurt_gun_1' },
        { key: 'hurt_gun_2' },
        { key: 'hurt_gun_3' },
        { key: 'hurt_gun_4' },
        { key: 'hurt_gun_5' },
        { key: 'hurt_gun_6' },
        { key: 'hurt_gun_7' },
        { key: 'hurt_gun_8' },
        { key: 'hurt_gun_9' },
      ],
      frameRate: 40,
      repeat: 1,
    });
  

     // coin animation
     this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });

    // fire animation

  
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 1) {
      this.scene.start('Title');
    }
  }
};
