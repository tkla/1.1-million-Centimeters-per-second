import Level from "./level"
import PlayerShip from "./player_ship";
import Ship from "./ship"
export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;
        //1 tick per roughly 16ms.
        this.TICK = 1000/16;
        
        //Level 
        
        const level = new Level(ctx);
        this.level = level;

        //Object array 
        
        const ship = new PlayerShip({ctx: this.ctx, game: this, pos: [this.DIM_X/2, this.DIM_Y*.8]});
        const debug = new Ship({ctx: this.ctx, game: this, pos: [this.DIM_X/2, this.DIM_Y/2]});
        this.debug = debug;
        this.ship = ship;

        //Key listeners
        this.key = {};
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);

        //Game loop start
        this.gameStart(this.TICK, this, ctx);
    }

    drawBackground(){
        this.ctx.globalCompositeOperation = 'destination-over'
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
        this.ctx.globalCompositeOperation = 'source-over'
    }

    // Game, 60 ticks per second (roughly, not timing accurate). Put all necessary functions/logic per tick in here.
    gameStart(TICK, game){

        //Do necessary functions to set up objects for next frame(ie updating positions, check collisions,etc)
        setInterval(function(){
            game.update();
        }, TICK);
        
        //Draw current frame
        setInterval(function(){
            game.draw();
        }, TICK);
    }

    update(){
        this.checkKeys();
        this.moveObjects();
        //Do checks
        this.checkCollisions();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.drawBackground();
        this.level.draw();
        this.ship.draw();
        this.debug.draw();
    }

    moveObjects(){
        this.ship.move();
        this.debug.move();
    }

    checkCollisions(){
    }

    checkKeys(){
        let right = 0;
        let left = 0;
        let up = 0;
        let down = 0;
        
        if (this.key['KeyA']){
            left = -1;
        } else {
            left = 0;
        }
        
        if (this.key['KeyD']){
            right = 1;
        } else {
            right = 0;
        }

        if (this.key['KeyW']){
            up = -1;
        } else {
            up = 0;
        }
        
        if (this.key['KeyS']){
            down = 1;
        } else {
            down = 0;
        }

        this.ship.vel[0] = (right + left)*this.ship.speed;
        this.ship.vel[1] = (up + down)*this.ship.speed;
    }

    keyDownHandler(e){
        this.key[e.code] = true; 
    }

    keyUpHandler(e){
        this.key[e.code] = false; 
    }
}