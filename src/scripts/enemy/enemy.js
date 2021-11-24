import Ship from '../ship'
import Projectile from '../projectiles/projectile'
import { Util } from '../util'
import EnemyProjectile from '../projectiles/enemyProjectile';

export default class Enemy extends Ship {
   constructor(options) {
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
      this.targetDir = 0;
      this.targetFirePos = this.game.player.pos;
      //Max lifetime of an enemy ship is 25 secs. Used for easy cleanup.
      setTimeout(() => {
         this.removeSelf();
      }, 50000)

      //bad hack
      this.homing = false;
   }

   fire(pos) {
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

   throttleFireRate(rate) {
      this.fire = Util.throttle(this.fire, (rate / this.game.delta), this);
   }

   update(secondsPassed, delta) {
      this.move(secondsPassed, delta);
      //If pathing and not knocked back, stop moving at roughly destination position
      let arriveX = (this.pos[0] <= this.destPos[0] + 20 && this.pos[0] >= this.destPos[0] - 20)
      let arriveY = (this.pos[1] <= this.destPos[1] + 20 && this.pos[1] >= this.destPos[1] - 20)
      if (!this.knockback && arriveX && arriveY && this.pathing && !this.homing) {
         this.vel[0] = 0;
         this.vel[1] = 0;
      }

      if (this.firing) {
         if (this.targetDir === 1) this.targetFirePos = [this.pos[0], 2000]
         if (this.targetDir === 2) this.targetFirePos = [1000, this.pos[1]]
         if (this.targetDir === 3) this.targetFirePos = [-1000, this.pos[1]]
         this.fire(this.targetFirePos)

      }

      this.checkCollisions();
      if (this.health <= 0 && !this.knockback) {
         this.removeSelf();
         this.game.player.score += 100;
      }
   }

   repath() {
      this.knockback = false;
      this.currSprite.rotate = true;
      this.pathTowards(this.pos, this.destPos, this.origSpeed)
   }

   recoverKnockback(damage) {
      setTimeout(() => {
         if (this) {
            this.repath();
            this.health -= damage;
         }

      }, 1000 * this.game.delta)
   }

   draw() {
      //Sprite drawing
      //console.log(this.currSprite.image)
      if (this.Hit) {
         this.currSprite = this.hitSprite;
      } else {
         this.currSprite = this.sprite;
      }

      this.currSprite.update();
      //Awful hack to make sure ship is facing where it's firing or going.
      if (this.firing) {
         this.currSprite.rotate = true;
         this.homing = false;
         this.currSprite.draw(this.pos, this.targetFirePos);
      } else if (this.homing) {
         this.currSprite.draw(this.pos, this.destPos, false);
      } else {
         this.currSprite.rotate = true;
         this.currSprite.draw(this.pos, this.destPos);
      }
   }

   //Event controllers

   //Go Straight up/down
   setEventPathVert(endY, speed, time) {
      setTimeout(() => {
         this.homing = false;
         this.pathTowards(this.pos, [this.pos[0], endY], speed)
      }, time)
   }

   //Go Horizontal
   setEventPathHor(endX, speed, time) {
      setTimeout(() => {
         this.homing = false;
         this.pathTowards(this.pos, [endX, this.pos[1]], speed)
      }, time)

   }

   //Go Somewhere
   setEventPath(endPos, speed, time, homing) {
      setTimeout(() => {
         this.homing = false;
         if (homing) this.homing = true;
         this.pathTowards(this.pos, endPos, speed)
      }, time)
   }

   //Fire at pos for X duration at X time
   setEventFire(pos, time, duration, direction) {
      let targetPos = pos;


      setTimeout(() => {
         this.firing = true;
         this.targetDir = 0;
         if (direction === 0) targetPos = this.game.player.pos
         else if (direction === 1) this.targetDir = 1;
         else if (direction === 2) this.targetDir = 2;
         else if (direction === 3) this.targetDir = 3;
         this.targetFirePos = targetPos;
      }, time)

      setTimeout(() => {
         this.firing = false;
      }, time + duration)
   }

   setEventFireRate(rate, time) {
      setTimeout(() => {
         this.throttleFireRate(rate)
      }, time)
   }
}