import Phaser from 'phaser';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.velocity = 2800;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.y >= 600) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  BulletVelocity(facing) {
    let bulletVelocity = this.velocity;
    if (facing === 'left') {
      bulletVelocity *= -1;
    }
    return bulletVelocity;
  }

  fire(x, y, facing) {
    this.body.reset(x, y);
    this.setScale(0.2);
    this.setActive(true);

    this.setVisible(true);

    const bulletVelocity = this.BulletVelocity(facing);

    this.setVelocityX(bulletVelocity);
  }
}

export default Bullet;