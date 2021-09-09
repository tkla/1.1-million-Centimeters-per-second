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
        //Max fire rate.
        this.fire = Util.throttle(this.fire, (50 / this.game.delta), this);
        //this.pathTowards(this.pos, this.dir)
        this.origPath = [0,0];
        this.destPos = [10000,10000];
        this.origSpeed = 0;
        this.pathing = false;
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
        this.fire = Util.throttle(this.fire, (rate / this.game.delta), this);
    }

    update(secondsPassed, delta){
        this.move(secondsPassed, delta);
        //If pathing and not knocked back, stop moving at roughly destination position
        let arriveX = (this.pos[0] <= this.destPos[0]+20 && this.pos[0] >= this.destPos[0]-20)
        let arriveY = (this.pos[1] <= this.destPos[1]+20 && this.pos[1] >= this.destPos[1]-20)
        if (!this.knockback && arriveX && arriveY && this.pathing){
            this.vel[0] = 0;
            this.vel[1] = 0;
        }
            
        this.checkCollisions();
        if (this.health <= 0 && !this.knockback){ 
            this.removeSelf();
            this.game.player.score += 100;
        }
    }

    pathTowards(pos1, pos2, speed = this.speed){
        this.pathing = true;
        this.destPos = pos2;
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

    //Event controllers

    //Go Straight up/down
    setEventPathVert(y, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            endPos = [this.game.objects[i].pos[0], y-((i-1)*70)]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Horizontal
    setEventPathHor(x, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            
            endPos = [x-((i-1)*70), this.game.objects[i].pos[1]]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Somewhere
    setEventPath(endPos, speed, time){
        setTimeout( ()=> {
            this.pathTowards(this.pos, endPos, speed)
        })
    }
}