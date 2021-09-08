
import Projectile from './projectile'
import {Images} from '../animations/image_source'
import Sprite from '../animations/sprite'


export default class EnemyProjectile extends Projectile{

    constructor(options){
        super(options)
        // this.sprite = new Sprite({
        //     ctx: this.ctx,
        //     swidth: 100,
        //     sheight: 100,
        //     dy: this.pos[1],
        //     dx: this.pos[0],
        //     image: Images.bulletImage
        // });

        
        this.pathTowards(this.pos, this.dir)
        this.spawnBulletFront(50);
    }

    draw(){
        this.ctx.beginPath(); 
        this.ctx.arc(this.pos[0], this.pos[1], this.hitboxRadius, 0, Math.PI *2, false);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke(); 
        if (this.hit){
            this.ctx.fillStyle = "pink"; 
        } else {
            this.ctx.fillStyle = this.color;
        }
        this.ctx.fill();
    }
}