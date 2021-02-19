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
    this.load.image('bg_1', 'assets/bg-1.png');
    this.load.image('bg_2', 'assets/bg-2.png');
    this.load.image('ground', 'assets/ground.png');
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


    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

  }

  create() {
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
      repeat: -1
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
