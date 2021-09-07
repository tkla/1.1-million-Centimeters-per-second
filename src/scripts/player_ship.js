import Ship from "./ship"
import PlayerBullet from './projectiles/playerBullet'
import MeleeProjectile from "./projectiles/meleeProjectile";
import {Util} from "./util"
import {Images} from './animations/image_source'
import Sprite from "./animations/sprite"

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
        //Draw self sprite
        this.selfSprite = Images.playerShip
        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 128,
            sheight: 128,
            dwidth: 128,
            dheight: 128,
            image: this.selfSprite
        });

        //Throttles
        console.log(this.game.delta)
        this.fire = Util.throttle(this.fire, 100 / this.game.delta, this);
        this.parry = Util.throttle(this.parry, 1500 / this.game.delta, this);
    }

    checkCollisions(){
        let objects = this.game.objects;
        //this.checkHitEnemy();
        if (this.hit){
            //todo
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
        this.game.delta = 0.5;
    }

    unfocus(){
        this.speed = this.normalSpeed;
        this.game.delta = 1;
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