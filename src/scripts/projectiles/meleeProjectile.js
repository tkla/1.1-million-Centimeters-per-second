import Projectile from './projectile'

export default class MeleeProjectile extends Projectile{
    constructor(options){
        super(options);
        this.speed = 30;
        this.pathTowards(this.pos, this.dir);
        setTimeout(() => this.removeSelf(), 100 / this.game.delta);
    }

    move(){
        this.pos[0] = this.game.player.pos[0] + this.vel[0];
        this.pos[1] = this.game.player.pos[1] + this.vel[1];
    }

    checkCollisions(){
        let objects = this.game.activeHitbox;
        for (let i = 0;  i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this){
                this.hit = true;
                objects[i].hit = true;
                this.reflect(objects[i]);
            }
        }
        
        this.checkHitEnemy();
    }

    reflect(object){
        object.knockback = true;
        object.reflected = true;
        object.pathTowards(object.pos, this.game.mousePos, 30)
    }

    removeSelf(){
        console.log(this)
        let idx = this.game.activeHitbox.indexOf(this);
        this.game.activeHitbox.splice(idx, 1);
    }
}