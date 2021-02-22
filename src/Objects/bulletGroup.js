class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 100,
            active: false,
            visible: false,
            key: 'bullet'
        });
    }

    fireBullet(x, y, facing) {
        // get fist available sprite in the group
        const bullet = this.getFirstDead(false);
        if(bullet) {
            bullet.fire(x, y, facing);
        }
    }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x ,y) {
        super(scene, x ,y, 'bullet');
    }

    fire(x, y, facing) {
        let bulletVelocity = 3200;
        this.body.reset(x, y);
        this.setScale(0.2);
        this.setActive(true);
        this.setVisible(true);
        
        if(facing === 'left'){
            bulletVelocity = bulletVelocity * -1;   
        }

        this.setVelocityX(bulletVelocity);
        
    }
}

export default BulletGroup;