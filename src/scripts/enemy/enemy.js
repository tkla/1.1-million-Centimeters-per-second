import Ship from '../ship'
import Projectile from '../projectiles/projectile'
import {Util} from '../util'

export default class Enemy extends Ship{
    constructor(options){
        super(options)
        this.fire = Util.throttle(this.fire, (100 / this.game.delta), this);
    }

    fire(pos){
        const tmp = new Projectile({
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
}