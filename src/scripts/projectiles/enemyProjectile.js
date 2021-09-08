
import Projectile from './projectile'
import {Images} from '../animations/image_source'
import Sprite from '../animations/sprite'


export default class EnemyProjectile extends Projectile{

    constructor(options){
        super(options)
        this.sprite = new Sprite({
            ctx: this.ctx,
            swidth: 100,
            sheight: 100,
            dy: this.pos[1],
            dx: this.pos[0],
            image: Images.bulletImage
        });
        this.pathTowards(this.pos, this.dir)
        this.spawnBulletFront(50);
    }

}