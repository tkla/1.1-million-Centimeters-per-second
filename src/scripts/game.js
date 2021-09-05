import Level from "./level"

export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;
        //1 tick per roughly 16ms.
        this.TICK = 1000/16;
        this.drawBackground();
        const level = new Level(ctx);
        this.level = level;
        this.gameStart(this.TICK, this.DIM_Y, ctx);
    }

    drawBackground(){
        this.ctx.globalCompositeOperation = 'destination-over'
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    }

    // Game, 60 ticks per second (roughly, not timing accurate). Put all necessary functions/logic per tick in here.
    gameStart(TICK, game, ctx){

        //Do necessary functions to set up objects for next frame(ie updating positions, check collisions,etc)
        setInterval(function(){
            game.gameTick();
        }, TICK);
        
        //Draw current frame
        setInterval(function(){
            game.draw(ctx);
        }, TICK);
    }

    gameTick(){
        this.moveObjects();
        //Do checks
        this.checkCollisions();
    }

    draw(){
    }

    moveObjects(){
    }

    checkCollisions(){
    }
}