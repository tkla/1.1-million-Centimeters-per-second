import Ship from "./ship"
import PlayerBullet from './projectiles/playerBullet'
import MeleeProjectile from "./projectiles/meleeProjectile";
import {Util} from "./util"

export default class PlayerShip extends Ship{
    constructor(options){
        super(options);
        this.hurtboxRadius = 7;
        this.health = 3;
        //Movement
        this.speed = 8; 
        this.normalSpeed = this.speed;
        this.focus_speed = this.speed/2; 
        this.friction = .5;

        //Throttles
        this.fire = Util.throttle(this.fire, 100, this);
        this.parry = Util.throttle(this.parry, 1500, this);
    }

    checkCollisions(){
        let objects = this.game.objects;
        for (let i = 0; i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this){
                this.hit = true;
                //this.getHit()
            }
        }
        let life = document.getElementById('main-stats-life'); 
        life.innerHTML  = `Life: ${this.health}`
        if (this.pos[0] > this.game.DIM_X) this.pos[0] = this.game.DIM_X;
        if (this.pos[0] < 0) this.pos[0] = 0;
        if (this.pos[1] > this.game.DIM_Y) this.pos[1] = this.game.DIM_Y;
        if (this.pos[1] < 0) this.pos[1] = 0;
    }


    focusMode(){
        this.speed = this.focus_speed;
    }

    unfocus(){
        this.speed = this.normalSpeed;
    }

    fire(pos){
        //let vect = Util.vect(this.pos, pos);
        const tmp = new PlayerBullet({
            ctx: this.ctx, 
            game: this.game, 
            pos: this.pos,
            color: "yellow",
            hurtboxRadius: 10,
            hitboxRadius: 10,
            dir: pos
        })
        //console.log(this.game.objects);
        this.game.activeHitbox.push(tmp);
    } 

    parry(pos){
        const tmp = new MeleeProjectile({
            ctx: this.ctx, 
            game: this.game, 
            pos: this.pos,
            color: "green",
            hurtboxRadius: 17,
            hitboxRadius: 35,
            dir: pos
        })
        this.game.activeHitbox.push(tmp);
    }
}