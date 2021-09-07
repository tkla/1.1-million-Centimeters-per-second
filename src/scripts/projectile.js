import Ship from "./ship"

export default class Projectile extends Ship{
    constructor(options){
        super(options);
        this.friction = 1;
        this.speed = 5;
        this.dir = options.dir; 
        
        this.pathTowards(this.pos, this.dir)
    }

    pathTowards(pos1, pos2){
        var dx = (pos2[0] - pos1[0]);
        var dy = (pos2[1] - pos1[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);


        this.vel[0] = (dx / mag) * this.speed;
        this.vel[1] = (dy / mag) * this.speed;
    }

    checkCollisions(objects){
        if (this.isCollideWith(this.game.player)){
            this.hit = true;
            this.game.player.hit = true;
        }

        // Boundary Collision
        let buffer = 0;
        (this.knockback)? buffer = 0 : buffer = 100;
       
        let right = (this.pos[0] > this.game.DIM_X + buffer);
        let left = (this.pos[0] < -buffer);
        let down = (this.pos[1] > this.game.DIM_Y + buffer);
        let up = (this.pos[1] < -buffer);

        if (!this.knockback){
            if (right || left || down || up){
                let idx = this.game.activeHitbox.indexOf(this);
                this.game.activeHitbox.splice(idx,1);
            }
        }else {
            if (up) {
                let idx = this.game.activeHitbox.indexOf(this);
                this.game.activeHitbox.splice(idx,1);
            }
            if (right || left){
                this.vel[0] *= -1;
            }
            if (down){
                this.vel[1] *= -1;
            }
        }
        
    }

    isCollideWith = function(other) {
        let x_1 = this.pos[0];
        let y_1 = this.pos[1];
        let x_2 = other.pos[0];
        let y_2 = other.pos[1];
        let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    
        return (dist < ((this.hitboxRadius + other.hurtboxRadius)));
    }
}