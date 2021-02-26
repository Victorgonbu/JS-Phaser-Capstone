import 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: 800,
  height: 600,
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
