import Ship from "../ship"
import Sprite from '../animations/sprite'
import {Images} from '../animations/image_source'

export default class Projectile extends Ship{
    constructor(options){
        super(options);
        this.friction = 1;
        this.speed = 5;
        this.reflected = false;
        this.health = 10000;
        this.knockbackMax = 2;
        this.damage = 1;
        this.dir = options.dir; 

        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 100,
            sheight: 100,
            dy: this.pos[1],
            dx: this.pos[0],
            dwidth: 100,
            dheight: 100,
            image: Images.bulletImage
        });

        //Pathing
        this.pathTowards(this.pos, this.dir)
    }

    draw(){
        this.sprite.update();
        
        this.sprite.draw(this.pos, this.game.mousePos, false);
        
        // //DEBUG draw hitbox
        // this.ctx.beginPath(); 
        // this.ctx.arc(this.pos[0], this.pos[1], this.hitboxRadius, 0, Math.PI *2, false);
        // this.ctx.strokeStyle = "blue";
        // this.ctx.stroke(); 
        // if (this.hit){
        //     this.ctx.fillStyle = "pink"; 
        // } else {
        //     this.ctx.fillStyle = "white";
        // }
        // this.ctx.fill();
        
        // //Debug hurtbox
        // this.ctx.beginPath(); 
        // this.ctx.arc(this.pos[0], this.pos[1], this.hurtboxRadius, 0, Math.PI *2, false);
        
        // if (this.hit){
        //     this.ctx.fillStyle = "white"; 
        // } else {
        //     this.ctx.fillStyle = 'red'; 
        // }
        // this.ctx.fill();
        
    }

    spawnBulletFront(dist){
        var dx = (this.dir[0] - this.pos[0]);
        var dy = (this.dir[1] - this.pos[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);

        this.pos[0] += (dx / mag) * dist;
        this.pos[1] += (dy / mag) * dist;
    }

    checkCollisions(){
        if (this.reflected){
            if (this.checkHitEnemy()) this.removeSelf();
        } else {
            if (this.checkHitPlayer()) this.removeSelf();
        }
        
        // Boundary Collision
        let buffer = 0;
        (this.knockback)? buffer = 0 : buffer = 100;
       
        let right = (this.pos[0] > this.game.DIM_X + buffer);
        let left = (this.pos[0] < -buffer);
        let down = (this.pos[1] > this.game.DIM_Y + buffer);
        let up = (this.pos[1] < -buffer);

        if (!this.knockback || this.knockbackMax <= 0){
            if (right || left || down || up){
                this.removeSelf()
            }
        }else{
            if (up) {
                this.removeSelf()
            }
            if (right || left){
                this.knockbackMax--;
                this.vel[0] *= -1;
            }
            if (down){
                this.vel[1] *= -1;
                this.knockbackMax--;
            }
        }
        
    }

    removeSelf(){
        let idx = this.game.activeHitbox.indexOf(this);
        this.game.activeHitbox.splice(idx, 1);
    }
}