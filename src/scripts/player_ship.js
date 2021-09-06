import Ship from "./ship"

export default class PlayerShip extends Ship{
    constructor(options){
        super(options);
        this.speed = 5; 
        this.xKey = 0;
        this.yKey = 0;
    }
}