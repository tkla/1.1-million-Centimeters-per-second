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
        this.hitboxRadius = 35;
        this.health = 5;
        this.score = 0;
        this.player = true;
        //Movement
        this.speed = 8; 
        this.normalSpeed = this.speed;
        this.focus_speed = this.speed/2; 
        this.friction = .5;
        
        //Draw self sprite
        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 128,
            sheight: 128,
            dwidth: 128,
            dheight: 128,
            image: Images.playerShip
        });

        //Throttles
        this.fire = Util.throttle(this.fire, 100 / this.game.delta, this);
        this.parry = Util.throttle(this.parry, 1000 / this.game.delta, this);
        this.getHit = Util.throttle(this.getHit, 1000 / this.game.delta, this);
    }

    update(secondsPassed, delta){
        this.move(secondsPassed, delta);
        this.checkCollisions();
        //if (this.health <= 0) this.removeSelf();
    }

    checkCollisions(){
        let objects = this.game.objects;

        let life = document.getElementById('main-stats-life');
        let score = document.getElementById('main-stats-score'); 
        life.innerHTML  = `Life: ` + `${this.health}`.padStart(5, '0');
        score.innerHTML  = `Score: ` + `${this.score}`.padStart(5, 0);
        
        if (this.pos[0] > this.game.DIM_X) this.pos[0] = this.game.DIM_X;
        if (this.pos[0] < 0) this.pos[0] = 0;
        if (this.pos[1] > this.game.DIM_Y) this.pos[1] = this.game.DIM_Y;
        if (this.pos[1] < 0) this.pos[1] = 0;
    }

    getHit(){
        this.health--;
        this.game.delta = 0.5
        this.hit = true;
        
        const hit = new Sprite({
            ctx: this.ctx,
            swidth: 128,
            sheight: 128,
            rotate: true,
            pos: this.pos, 
            game: this.game,
            image: Images.hit,
            
            lifeTime: 200
        });
        this.game.sprites.push(hit)

        setTimeout ( () => {
            this.game.delta = 1;
        }, 250)
        setTimeout( () => {
            this.hit = false;
        }, 1000)
    }

    isCollideWith = function(other) {
        let x_1 = this.pos[0];
        let y_1 = this.pos[1];
        let x_2 = other.pos[0];
        let y_2 = other.pos[1];
        let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    
        return (dist < ((this.hitboxRadius + other.hurtboxRadius)));
    }
    focusMode(){
        this.speed = this.focus_speed;
        this.focus = true;
        // this.game.delta = 0.5;
    }

    unfocus(){
        this.focus = false;
        this.speed = this.normalSpeed;
        // this.game.delta = 1;
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
        this.game.activeHitbox.push(tmp);
    } 

    parry(pos){
        const tmp = new MeleeProjectile({
            ctx: this.ctx, 
            game: this.game, 
            pos: this.pos,
            color: "red",
            hurtboxRadius: 50,
            hitboxRadius: 75,
            dir: pos
        })
        this.game.activeHitbox.push(tmp);
    }
}