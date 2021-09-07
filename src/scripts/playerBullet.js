import Projectile from "./projectile"

export default class PlayerBullet extends Projectile{
    constructor(options){
        super(options)
        this.speed = 30;
    }

    checkCollisions(objects){
        for (let i = 0; i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this && objects[i] != this.game.player){
                this.hit = true;
                objects[i].hit = true;
            }
        }
    }

    isCollideWith = function(other) {
        let x_1 = this.pos[0];
        let y_1 = this.pos[1];
        let x_2 = other.pos[0];
        let y_2 = other.pos[1];
        let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    
        return (dist < ((this.hurtboxRadius + other.hitboxRadius)));
    }
}