import Level from "./level"
import PlayerShip from "./player_ship";
import Ship from "./ship"

export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.canvas = this.ctx.canvas;
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

        //Setup listeners for keyboard and mouse. 
        this.key = {};
        this.mousePos = [0,0]
        this.setupListeners();
        //Game loop start
        this.gameStart(this.TICK, this, ctx);
    }

    setupListeners(){
        document.addEventListener("keydown", e => this.key[e.code] = true, false);
        document.addEventListener("keyup", e => this.key[e.code] = false, false);
        document.getElementById("moon_game").addEventListener("mousedown", e => this.key["mousedown"] = true, false)
        document.getElementById("moon_game").addEventListener("mouseup", e => this.key["mousedown"] = false, false)
        this.ctx.canvas.addEventListener('mousemove', event => this.getMousePos(event))
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
        let acc = .8;
        //Directional keys
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

        //Slows down the ship when ship is held.
        if (this.key['ShiftLeft']){
            this.ship.focusMode();
        }else {
            this.ship.unfocus();
        }

        if (this.key['mousedown']){
            this.ship.fire(this.mousePos);
        }
    }

    getMousePos(e) {
        var rect = this.ctx.canvas.getBoundingClientRect();
        
        this.mousePos[0] = e.clientX - rect.left,
        this.mousePos[1] = e.clientY - rect.top
        console.log(this.mousePos);
    }
}