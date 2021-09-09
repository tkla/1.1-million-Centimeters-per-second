import Level from "./level"
import PlayerShip from "./player_ship";
import {Images} from './animations/image_source'
import Sprite from './animations/sprite'


export default class Game{
    constructor(ctx){
        this.ctx = ctx; 
        this.canvas = this.ctx.canvas;
        this.DIM_X = ctx.canvas.width;
        this.DIM_Y = ctx.canvas.height;

        //1 tick per roughly 16ms. Use delta time for slowdown/speedup game clock
        this.delta = 1;

        //Setup listeners for keyboard and mouse. 
        this.key = {};
        this.mousePos = [0,0]
        this.setupListeners();
        
        //Object arrays 
        this.objects = [];
        this.activeHitbox = [];
        this.sprites = [];
       
        //Cursor 
        this.cursor = new Sprite({
            ctx: this.ctx,
            swidth: 32,
            sheight: 32,
            rotate: false,
            pos: this.mousePos,
            game: this,
            image: Images.crosshair
        });
        this.sprites.push(this.cursor)

        //Player ship 
        const ship = new PlayerShip({
            ctx: this.ctx, 
            game: this,
            pos: [this.DIM_X/2, this.DIM_Y*.8]
        })
        this.player = ship;
        this.objects.push(ship);

        //Level 
        this.level = new Level({
            ctx: this.ctx,
            game: this 
        });

        //Game loop start
        this.secondsPassed = 0;
        this.oldTimeStamp= 0;
        this.GameStartButton = {
            x:0,
            y:0,
            width:this.DIM_Y,
            height:this.DIM_X
        }
        this.background = Images.background;
        this.imgHeight= 0;
        this.scrollSpeed = 1;
        this.gameMenu();
        //window.requestAnimationFrame(this.gameStart.bind(this))
    }

    //Lord forgive me
    gameMenu(){
        if (this.player.health > 0){
            let moon_elem = document.getElementById('moon_game');
            moon_elem.style.cursor = 'auto'
            var f = new FontFace('pressStart', 'url(src/styles/pressStart.ttf)');
            f.load().then((font) => {
                document.fonts.add(font);
                this.ctx.fillStyle = "white";  
                this.ctx.font = '40px pressStart';
                this.ctx.fillText("Click to Start", this.DIM_X/2-275, this.DIM_Y/2); 
            });
        }else {
            this.GameStartButton = {
                x:0,
                y:0,
                width:this.DIM_Y,
                height:this.DIM_X
            }
            let moon_elem = document.getElementById('moon_game');
            moon_elem.style.cursor = 'auto'

            this.ctx.fillStyle = "white";  
            this.ctx.strokeStyle = 'black';

            this.ctx.font = '40px pressStart';
            this.ctx.fillText(`FINAL SCORE: ${this.player.score}` , this.DIM_X/2-300, this.DIM_Y/4 ); 

            this.ctx.font = '30px pressStart';
            this.ctx.fillText("GRADE: C-", this.DIM_X/2-120, this.DIM_Y/2); 
            this.ctx.fillText("Click to Restart?", this.DIM_X/2-240, this.DIM_Y/1.5); 
        }
        
    }

    loadGame(){
        if (this.player.health > 0){
            let moon_elem = document.getElementById('moon_game');
            moon_elem.style.cursor = 'none'
            this.GameStartButton = {}
            window.requestAnimationFrame(this.gameStart.bind(this))
            Images.doctor.play()
        }else {
            let moon_elem = document.getElementById('moon_game');
            moon_elem.style.cursor = 'none'
            this.GameStartButton = {};
            this.activeHitbox = [];
            this.objects = [];
            this.sprites = [];
            this.level = new Level({
                ctx: this.ctx,
                game: this 
            });
            this.secondsPassed = 0;
            this.oldTimeStamp= 0;
            this.player = new PlayerShip({
                ctx: this.ctx, 
                game: this,
                pos: [this.DIM_X/2, this.DIM_Y*.8]
            })
            this.sprites.push(this.cursor)
            this.objects.push(this.player);
            
        }
        
    }

    setupListeners(){
        document.addEventListener("keydown", e => this.key[e.code] = true, false);
        document.addEventListener("keyup", e => this.key[e.code] = false, false);
        document.getElementById("moon_game").addEventListener("mousedown", e => this.key[e.button] = true, false)
        document.getElementById("moon_game").addEventListener("mouseup", e => this.key[e.button] = false, false)
        document.addEventListener("click", e =>{ 
            if (this.isInside(this.mousePos, this.GameStartButton)){
               console.log("Starting")
               this.loadGame();
            } 
        })
        this.ctx.canvas.addEventListener('mousemove', event => this.getMousePos(event))
    }

    isInside(pos, rect){
        
        return pos[0] > rect.x && pos[0] < rect.x+rect.width && pos[1] < rect.y+rect.height && pos[1] > rect.y
    }

    drawBackground(){
        this.ctx.drawImage(this.background, 0, this.imgHeight, this.DIM_X, this.DIM_Y);
        this.ctx.drawImage(this.background, 0, this.imgHeight - this.DIM_Y, this.DIM_X, this.DIM_Y)
        this.imgHeight += this.scrollSpeed;
        if (this.imgHeight === this.DIM_Y) this.imgHeight = 0;
        this.ctx.fillStyle = "white";  
        this.ctx.font = '20px pressStart';
        let timer = (90 - this.level.time/60).toString().substring(0,5)
        this.ctx.fillText( `${timer}` , this.DIM_X/2-70, this.DIM_Y/10 );
    }
    
    // Game, 60 ticks per second (roughly, not timing accurate). Put all necessary functions/logic per tick in here.
    gameStart(timeStamp){
        if (this.player.health > 0){
            this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
            this.oldTimeStamp = timeStamp;
            this.update(this.secondsPassed, this.delta);
            this.draw();
        } else {
            this.gameMenu();
        }
        
        window.requestAnimationFrame(this.gameStart.bind(this))
    }



    update(secondsPassed, delta){
        this.checkKeys();
        //Calls each objects update function.
        this.level.update();
        //console.log(this.objects);
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

        //console.log(this.sprites);
        //this.cursor.draw(this.mousePos, this.mousePos, false)
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