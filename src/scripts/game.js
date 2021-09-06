import Level from "./level"
import PlayerShip from "./player_ship";
import Ship from "./ship"
export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;
        //1 tick per roughly 16ms.
        this.TICK = 1000/60;
        
        //Level 
        
        const level = new Level(ctx);
        this.level = level;

        //Object array 
        this.objects = [];
        const ship = new PlayerShip({ctx: this.ctx, game: this, pos: [this.DIM_X/2, this.DIM_Y*.8]});
        const debug = new Ship({ctx: this.ctx, game: this, pos: [this.DIM_X/2, this.DIM_Y/2]});
        this.debug = debug;
        this.ship = ship;
        this.objects.push(debug);
        this.objects.push(ship);

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
        //Calls each objects update function.
        this.objects.forEach( obj =>{
            obj.update(this.objects);
        })
    }

    draw(){
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.drawBackground();
        this.level.draw();
        this.objects.forEach( obj =>{
            obj.draw();
        })
    }

    checkKeys(){
        let acc = .4;
        if (this.key['KeyA']){
            if (this.ship.vel[0] > -this.ship.speed){
                this.ship.vel[0] -= this.ship.speed*(acc);
            }
            if (this.ship.vel[0] < -this.ship.speed){
                this.ship.vel[0] = -this.ship.speed;
            }
        }
        
        if (this.key['KeyD']){
            if (this.ship.vel[0] < this.ship.speed){
                this.ship.vel[0] += this.ship.speed*(acc);
            }
            if (this.ship.vel[0] > this.ship.speed){
                this.ship.vel[0] = this.ship.speed;
            }
        }

        if (this.key['KeyW']){
            if (this.ship.vel[1] > -this.ship.speed){
                this.ship.vel[1] -= this.ship.speed*(acc);
            }

            if (this.ship.vel[1] < -this.ship.speed){
                this.ship.vel[1] = -this.ship.speed;
            }
        }
        
        if (this.key['KeyS']){
            if (this.ship.vel[1] < this.ship.speed){
                this.ship.vel[1] += this.ship.speed*(acc);
            }
            if (this.ship.vel[1] > this.ship.speed){
                this.ship.vel[1] = this.ship.speed;
            }
        }
    }

    keyDownHandler(e){
        this.key[e.code] = true; 
    }

    keyUpHandler(e){
        this.key[e.code] = false; 
    }
}