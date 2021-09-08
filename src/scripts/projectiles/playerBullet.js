import Projectile from "./projectile"

export default class PlayerBullet extends Projectile{
    constructor(options){
        super(options)
        this.speed = 30;
        this.hitboxRadius = 5;
        this.damage = 1;
        this.pathTowards(this.pos, this.dir)
        this.spawnBulletFront(30);
    }

    spawnBulletFront(dist){
        var dx = (this.dir[0] - this.pos[0]);
        var dy = (this.dir[1] - this.pos[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);
        
        
        this.pos[0] += (dx / mag) * dist; //* Math.random()* 3;
        this.pos[1] += (dy / mag) * dist; //* Math.random() * 3 ;
    }

    checkCollisions(){
        if (this.checkHitEnemy()) this.removeSelf();

        // Boundary Collision
        let right = (this.pos[0] > this.game.DIM_X);
        let left = (this.pos[0] < 0);
        let down = (this.pos[1] > this.game.DIM_Y);
        let up = (this.pos[1] < 0);
       
        if (left || right || up || down){
            let idx = this.game.activeHitbox.indexOf(this);
            this.game.activeHitbox.splice(idx,1);
        }
        
    }
}