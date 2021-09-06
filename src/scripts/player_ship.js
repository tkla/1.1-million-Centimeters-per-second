import Ship from "./ship"

export default class PlayerShip extends Ship{
    constructor(options){
        super(options);
        this.speed = 6; 
        this.friction = .85;
        this.xKey = 0;
        this.yKey = 0;
    }
}