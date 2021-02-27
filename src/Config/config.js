import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: 800,
  height: 600,
  backgroundColor: 0x0c88c7,
  dom: {
    createContainer: true
  },
  physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 900 },
        debug: false
      }
  }
};
