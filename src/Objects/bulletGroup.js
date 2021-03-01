class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
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

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y >= 600) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  fire(x, y, facing) {
    let bulletVelocity = 2800;
    this.body.reset(x, y);
    this.setScale(0.2);
    this.setActive(true);

    this.setVisible(true);

    if (facing === 'left') {
      bulletVelocity *= -1;
    }

    this.setVelocityX(bulletVelocity);
  }
}

export default BulletGroup;