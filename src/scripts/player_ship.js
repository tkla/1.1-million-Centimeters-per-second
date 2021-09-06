import Ship from "./ship"

export default class PlayerShip extends Ship{
    constructor(options){
        super(options);
        this.speed = 6; 
        this.friction = .85;
        this.xKey = 0;
        this.yKey = 0;
    }

    checkCollisions(objects){
        for (let i = 0; i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this){
                this.hit = true;
            }
        }

        if (this.pos[0] > this.game.DIM_X) this.pos[0] = this.game.DIM_X;
        if (this.pos[0] < 0) this.pos[0] = 0;
        if (this.pos[1] > this.game.DIM_Y) this.pos[1] = this.game.DIM_Y;
        if (this.pos[1] < 0) this.pos[1] = 0;
    }
}