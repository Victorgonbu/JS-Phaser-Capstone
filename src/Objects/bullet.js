import Phaser from 'phaser';

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

  getBulletVelocity(facing) {
    let bulletVelocity = 2800;
    if (facing === 'left') {
      bulletVelocity *= -1;
    }
    return bulletVelocity  ;
  }

  fire(x, y, facing) {
    
    this.body.reset(x, y);
    this.setScale(0.2);
    this.setActive(true);

    this.setVisible(true);

    let bulletVelocity = this.getBulletVelocity(facing);

    this.setVelocityX(bulletVelocity);
  }
}

export default Bullet;