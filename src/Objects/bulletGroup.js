import Phaser from 'phaser';
import Bullet from './bullet';

class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    console.log(scene.physics.world);
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Bullet,
      frameQuantity: 10,
      active: false,
      visible: false,
      collide: true,
      key: 'bullet',
    });
  }

  fireBullet(x, y, facing) {
    // get fist available sprite in the group
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y, facing);
    }
  }
}


export default BulletGroup;