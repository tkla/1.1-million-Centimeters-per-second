import {Images} from './animations/image_source'
import Sprite from "./animations/sprite"
export default class Ship{

    constructor(options){
        this.ctx = options.ctx;
        this.health = 40;
        this.hitboxRadius = options.hitboxRadius || 25;
        this.hurtboxRadius = options.hurtboxRadius || 25;
        this.color = options.color || "red";
        this.game = options.game;
        this.pos = [options.pos[0], options.pos[1]];
        this.focus = false;
        this.player = false;
        //Movement
        this.vel = [0, 0];
        this.speed = 1;
        this.friction = 0.8;
        this.knockbackFriction = 0.9;
        this.knockback = false;
        this.weight = 1;

        //Drawing self sprite
        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 128,
            sheight: 128,
            dwidth: 64,
            dheight: 64,
            image: Images.defaultShip
        });

        this.hitSprite = new Sprite({
            ctx: this.ctx,
            swidth: 128,
            sheight: 128,
            dwidth: 64,
            dheight: 64,
            image: Images.playerShip
        })

        this.currSprite = this.sprite;
        this.hit = false; 
        
    }

    draw(){
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
        
        //Sprite drawing
        this.currSprite.update();
        this.currSprite.draw(this.pos, this.game.mousePos);
        
        if (this.Hit){
            this.currSprite = this.hitSprite;
        } else {
            this.currSprite = this.sprite;
        }
        //Draw hurtbox when focus mode
        if (this.focus){
            this.ctx.beginPath(); 
            this.ctx.arc(this.pos[0], this.pos[1], this.hurtboxRadius, 0, Math.PI *2, false);
            
            if (this.hit){
                this.ctx.fillStyle = "white"; 
            } else {
                this.ctx.fillStyle = this.color; 
            }
            this.ctx.fill();
        }
    }

    move(secondsPassed, delta){
        let norm = this.speed * .7101;
        //Reduce diagonal speed
        if ( (Math.abs(this.vel[0]) >= norm) && (Math.abs(this.vel[1]) >= norm) ){
            this.vel[0] *= .7101;
            this.vel[1] *= .7101;
        }
        
        this.pos[0] += (this.vel[0] * delta);
        this.pos[1] += (this.vel[1] * delta);
        if (this.knockback) {
            this.vel[1] *= this.knockbackFriction;
            this.vel[0] *= this.knockbackFriction;
        }else { 
            this.vel[1] *= this.friction;
            this.vel[0] *= this.friction;
        }
       
    }

    update(secondsPassed, delta){
        //this.hit = false;
        this.move(secondsPassed, delta);
        this.checkCollisions();
        if (this.health <= 0 && !this.knockback) this.removeSelf();
    }

    checkCollisions(){
        if (!this.knockback) this.checkHitPlayer()
        else this.checkHitEnemy();
    }

    checkHitEnemy(){
        let objects = this.game.objects;
        let result = false; 
        for (let i = 0; i < objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this && objects[i] != this.game.player){
                this.hit = true;
                objects[i].hit = true;
                objects[i].health -= this.damage;
                result = true;
            }
        }
        return result;
    }

    checkHitPlayer(){
        let result = false; 
        if (this.isCollideWith(this.game.player)){
            this.hit = true;
            this.game.player.getHit();
            result = true;
        } 
        return result;
    }

    //Go towards pos2. Updates this.speed to new speed arg if given.
    pathTowards(pos1, pos2, speed = this.speed){
        this.speed = speed;
        var dx = (pos2[0] - pos1[0]);
        var dy = (pos2[1] - pos1[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);


        this.vel[0] = (dx / mag) * speed;
        this.vel[1] = (dy / mag) * speed;
    }

    isCollideWith = function(other) {
        let x_1 = this.pos[0];
        let y_1 = this.pos[1];
        let x_2 = other.pos[0];
        let y_2 = other.pos[1];
        let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
        if (other.player){
            if (dist < (this.hitboxRadius + other.hitboxRadius) ) other.score+= 2;
        }
        return (dist < ((this.hitboxRadius + other.hurtboxRadius)));
    }
    
    removeSelf(){
        let idx = this.game.objects.indexOf(this);
        this.game.objects.splice(idx, 1);
    }
}