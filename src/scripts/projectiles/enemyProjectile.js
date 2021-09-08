
import Projectile from './projectile'
import {Images} from '../animations/image_source'
import Sprite from '../animations/sprite'


export default class EnemyProjectile extends Projectile{

    constructor(options){
        super(options)
        
        this.pathTowards(this.pos, this.dir)
        this.spawnBulletFront(50);
    }

}