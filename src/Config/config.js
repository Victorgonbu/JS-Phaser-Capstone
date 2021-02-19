import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: 800,
  height: 600,
  backgroundColor: 0x87CEEB,
  physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
        debug: false
      }
  }
};
