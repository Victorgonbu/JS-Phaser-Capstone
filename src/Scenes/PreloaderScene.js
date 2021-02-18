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

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

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
    this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

  }

  create() {
     //player animation
  
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
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};
