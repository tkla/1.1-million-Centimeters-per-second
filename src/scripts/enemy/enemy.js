import Ship from '../ship'
import Projectile from '../projectiles/projectile'
import {Util} from '../util'
import EnemyProjectile from '../projectiles/enemyProjectile';

export default class Enemy extends Ship{
    constructor(options){
        super(options)
        this.friction = 1;
        this.knockbackFriction = .95;
        this.hurtboxRadius = 20;
        this.reflected = false;
        this.health = 50;
        this.weight = 2;
        this.fire = Util.throttle(this.fire, (500 / this.game.delta), this);
        //this.pathTowards(this.pos, this.dir)
        this.origPath = [0,0];
        this.origSpeed = 0;
    }

    fire(pos){
        const tmp = new EnemyProjectile({
            ctx: this.ctx, 
            game: this.game, 
            pos: this.pos,
            color: "yellow",
            hurtboxRadius: 10,
            hitboxRadius: 10,
            dir: pos
        })
        
        this.game.activeHitbox.push(tmp);
    }

    throttleFireRate(rate){
        this.fire = Util.throttle(this.fire, (500 / this.game.delta), this);
    }

    pathTowards(pos1, pos2, speed = this.speed){
        this.speed = speed;
        var dx = (pos2[0] - pos1[0]);
        var dy = (pos2[1] - pos1[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);


        this.vel[0] = (dx / mag) * speed;
        this.vel[1] = (dy / mag) * speed;
        if (!this.knockback) {
            this.origPath = pos2;
            this.origSpeed = speed;
        }
        
    }
  
    repath(){
        this.knockback = false;
        this.pathTowards(this.pos, this.origPath, this.origSpeed)
    }
    
    recoverKnockback(damage){
        setTimeout( ()=>{ 
            if (this){
                this.repath();
                this.health -= damage;
            } 
            
        }, 1000*this.game.delta)
    }
    draw(){
        //Sprite drawing
        //console.log(this.currSprite.image)
        if (this.Hit){
            this.currSprite = this.hitSprite;
        } else {
            this.currSprite = this.sprite;
        }

        this.currSprite.update();
        this.currSprite.draw(this.pos, this.game.player.pos);
    }
}