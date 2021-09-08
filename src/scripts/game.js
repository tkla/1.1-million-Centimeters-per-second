import Enemy from "./enemy/enemy";
import Level from "./level"
import PlayerShip from "./player_ship";
import Ship from "./ship"
//import Sprite from './animations/sprite'


export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.canvas = this.ctx.canvas;
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;

        //1 tick per roughly 16ms.
        this.TICK = 1000/60;
        this.delta = 1;
        
        //Level 
        const level = new Level(ctx);
        this.level = level;

        //Object arrays 
        this.objects = [];
        this.activeHitbox = [];
        this.sprites = [];

        //Player ship 
        const ship = new PlayerShip({
            ctx: this.ctx, 
            game: this,
            pos: [this.DIM_X/2, this.DIM_Y*.8]
        })
        this.player = ship;
        this.objects.push(ship);

        //Debug---------------------------------------
            const debug1 = new Enemy({
                ctx: this.ctx, 
                game: this, 
                pos: [this.DIM_X/2, this.DIM_Y/2]
            })
            const debug2 = new Ship({
                ctx: this.ctx, 
                game: this, 
                pos: [this.DIM_X/2, this.DIM_Y/3]
            })
            this.debug1 = debug1;
            this.debug2 = debug2;
            this.objects.push(debug1);
            this.objects.push(debug2);
        //--------------------------------------------
        //Setup listeners for keyboard and mouse. 
        this.key = {};
        this.mousePos = [0,0]
        this.setupListeners();
        //Game loop start
        this.secondsPassed = 0;
        this.oldTimeStamp= 0;
        window.requestAnimationFrame(this.gameStart.bind(this))
        //this.gameStart(this.TICK, this);
    }

    setupListeners(){
        document.addEventListener("keydown", e => this.key[e.code] = true, false);
        document.addEventListener("keyup", e => this.key[e.code] = false, false);
        document.getElementById("moon_game").addEventListener("mousedown", e => this.key[e.button] = true, false)
        document.getElementById("moon_game").addEventListener("mouseup", e => this.key[e.button] = false, false)
        this.ctx.canvas.addEventListener('mousemove', event => this.getMousePos(event))
    }

    drawBackground(){
        this.ctx.globalCompositeOperation = 'destination-over'
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
        this.ctx.globalCompositeOperation = 'source-over'
    }
    
    // Game, 60 ticks per second (roughly, not timing accurate). Put all necessary functions/logic per tick in here.
    gameStart(timeStamp){
        this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
        this.oldTimeStamp = timeStamp;
        this.update(this.secondsPassed, this.delta);
        this.draw();
        window.requestAnimationFrame(this.gameStart.bind(this))
    }

    update(secondsPassed, delta){
        this.checkKeys();
        //Calls each objects update function.
        //console.log(this.activeHitbox);
        this.objects.forEach( obj =>{
            obj.update(secondsPassed, delta );
        })
        
        this.activeHitbox.forEach( obj =>{
            obj.update(secondsPassed, delta);
        })
        
        this.sprites.forEach( obj =>{
            obj.update(secondsPassed, delta);
        })
    }

    draw(){
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.drawBackground();
        this.level.draw();

        this.objects.forEach( obj =>{
            obj.draw();
        })
        
        this.activeHitbox.forEach( obj =>{
            obj.draw();
        })

       

        this.sprites.forEach( obj =>{
            obj.draw();
        })
    }

    checkKeys(){
        let acc = .8;
        //Directional keys
        if (this.key['KeyA']){
            if (this.player.vel[0] > -this.player.speed){
                this.player.vel[0] -= this.player.speed*(acc);
            }
            if (this.player.vel[0] < -this.player.speed){
                this.player.vel[0] = -this.player.speed;
            }
        }
        
        if (this.key['KeyD']){
            if (this.player.vel[0] < this.player.speed){
                this.player.vel[0] += this.player.speed*(acc);
            }
            if (this.player.vel[0] > this.player.speed){
                this.player.vel[0] = this.player.speed;
            }
        }

        if (this.key['KeyW']){
            if (this.player.vel[1] > -this.player.speed){
                this.player.vel[1] -= this.player.speed*(acc);
            }

            if (this.player.vel[1] < -this.player.speed){
                this.player.vel[1] = -this.player.speed;
            }
        }
        
        if (this.key['KeyS']){
            if (this.player.vel[1] < this.player.speed){
                this.player.vel[1] += this.player.speed*(acc);
            }
            if (this.player.vel[1] > this.player.speed){
                this.player.vel[1] = this.player.speed;
            }
        }

        //Slows down the ship when ship is held.
        if (this.key['ShiftLeft']){
            this.player.focusMode();
        }else {
            this.player.unfocus();
        }
        //Left click = 0, Right click = 2
        if (this.key[0]){
            this.player.fire(this.mousePos);
            this.debug1.fire(this.mousePos);
        }

        if (this.key[2]){
            this.player.parry(this.mousePos);
        }
    }

    getMousePos(e) {
        var rect = this.ctx.canvas.getBoundingClientRect();
        
        this.mousePos[0] = e.clientX - rect.left,
        this.mousePos[1] = e.clientY - rect.top
        //console.log(this.mousePos);
    }
}