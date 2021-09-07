import Ship from "./ship"
import {Util} from "./util"

export default class PlayerShip extends Ship{
    constructor(options){
        super(options);
        this.hurtBoxRadius = 5;
        //Movement
        this.speed = 8; 
        this.normalSpeed = this.speed;
        this.focus_speed = this.speed/3; 
        this.friction = .5;

        //Throttles
        this.fire = Util.myThrottle(this.fire, 100);
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


    focusMode(){
        this.speed = this.focus_speed;
    }

    unfocus(){
        this.speed = this.normalSpeed;
    }

    fire(pos){
        console.log("Firing")
    }   
}