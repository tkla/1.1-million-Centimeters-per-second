import Projectile from './projectile'
import {Images} from '../animations/image_source'
import Sprite from '../animations/sprite'
import PlayerBullet from './playerBullet';

export default class MeleeProjectile extends Projectile{
    constructor(options){
        super(options);
        this.speed = 0;
        
        this.pathTowards(this.pos, this.dir);
        this.spawnBulletFront(50);
        this.damage = 50;
        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 55,
            sheight: 55,
            dwidth: 110,
            dheight: 110,
            frameMax: 1,
            ticksPerFrame: 1,
            image: Images.axe
        });
        setTimeout(() => this.removeSelf(), 100 / this.game.delta);
    }
    
    move(){
         this.pos[0] = this.game.player.pos[0] + this.vel[0];
         this.pos[1] = this.game.player.pos[1] + this.vel[1];
    }

    draw(){
        this.sprite.update();
        //let offset = [this.pos[0]*.5, this.pos[1]*0.5];
        this.sprite.drawMelee(this.pos, this.game.mousePos, true);
        
        //DEBUG draw hitbox
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

    checkCollisions(){
        let objects = this.game.activeHitbox;
        for (let i = 0;  i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this && !(objects[i] instanceof(PlayerBullet)) ){
                this.hit = true;
                objects[i].hit = true;
                objects[i].damage = 100;
                this.game.player.score += 40;
                //objects[i].hitRadius = 40;
                this.reflect(objects[i]);
            }
        }

        objects = this.game.objects
        for (let i = 1;  i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this && !(objects[i] instanceof(PlayerBullet)) ){
                if (objects[i].knockback) continue;
                this.hit = true;
                objects[i].hit = true;
                objects[i].damage = 100;
                this.reflect(objects[i]);
                objects[i].recoverKnockback(this.damage);
            }
        }
        //this.checkHitEnemy();
    }

    reflect(object){
        object.knockback = true;
        object.reflected = true;
        object.pushTowards(object.pos, this.game.mousePos, 30/object.weight)
    }

    
}