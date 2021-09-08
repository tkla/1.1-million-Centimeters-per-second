import Ship from '../ship'
import Projectile from '../projectiles/projectile'
import {Util} from '../util'
import EnemyProjectile from '../projectiles/enemyProjectile';

export default class Enemy extends Ship{
    constructor(options){
        super(options)
        this.friction = 0;
        this.hurtboxRadius = 20;
        this.fire = Util.throttle(this.fire, (200 / this.game.delta), this);
        //this.pathTowards(this.pos, this.dir)
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
    
    draw(){
        //Sprite drawing
        this.sprite.update();
        this.sprite.draw(this.pos, this.game.player.pos);
    }
}