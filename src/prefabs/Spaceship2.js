class Spaceship2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  // add to existing scene
        this.points = pointValue;  // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;
    }
    
    update() {
        // move spaceship left
        this.x -= 2*game.settings.spaceshipSpeed;
        
        // wrap around from left to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }


}