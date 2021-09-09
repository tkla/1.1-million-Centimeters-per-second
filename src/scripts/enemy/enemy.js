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
        this.firing = false;
        this.targetFirePos = this.game.player.pos;
        //Max lifetime of an enemy ship is 20 secs. Used for easy cleanup.
        setTimeout(() => {
            this.removeSelf();
        }, 20000)
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
        
        if (this.firing) this.fire(this.targetFirePos)
            
        this.checkCollisions();
        if (this.health <= 0 && !this.knockback){ 
            this.removeSelf();
            this.game.player.score += 100;
        }
    }
  
    repath(){
        this.knockback = false;
        this.pathTowards(this.pos, this.destPos, this.origSpeed)
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
    setEventPathVert(endY, speed, time){
        setTimeout( () => {
            this.pathTowards(this.pos, [this.pos[0], endY], speed)
        }, time)
    }

    //Go Horizontal
    setEventPathHor(endX, speed, time){
        setTimeout( () => {
            this.pathTowards(this.pos, [endX, this.pos[1]], speed)
        }, time)
        
    }

    //Go Somewhere
    setEventPath(endPos, speed, time){
        setTimeout( ()=> {
            this.pathTowards(this.pos, endPos, speed)
        }, time)
    }

    //Fire at pos for X duration at X time
    setEventFire(pos, time, duration, player, direction){
        let targetPos = pos;
        
        
        setTimeout( ()=> {
            this.firing = true;
            if (player) targetPos = this.game.player.pos
            else if (direction === 1) targetPos[this.pos[0], 2000]
            else if (direction === 2) targetPos[1000, this.pos[1]]
            else if (direction === 3) targetPos[-1000, this.pos[1]]

            this.targetFirePos = targetPos;
        }, time)

        setTimeout( ()=> {
            this.firing = false;
        }, time + duration)
    }

    setEventFireRate(rate, time){
        setTimeout( ()=> {
            this.throttleFireRate(rate)
        }, time)
        
    }
}