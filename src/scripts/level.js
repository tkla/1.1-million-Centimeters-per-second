//Handle drawing specific level layout/backgrounds, enemy spawning, and level related events.

export default class Level {
    constructor(ctx){
        this.ctx = ctx; 
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;
        this.loadLevel();
    }

    loadLevel(){
        
    }
}