import Level from "./level"
import PlayerShip from "./player_ship";
import { Images, MasterVolume } from './animations/image_source'
import Sprite from './animations/sprite'
import { Util } from './util'

export default class Game {
   constructor(ctx) {
      this.ctx = ctx;
      this.canvas = this.ctx.canvas;
      this.ctx.canvas.width  = window.innerHeight * .9;
      this.ctx.canvas.height = window.innerHeight * .9;
      this.DIM_X = ctx.canvas.width;
      this.DIM_Y = ctx.canvas.height;

      //1 tick per roughly 16ms. Use delta time for slowdown/speedup game clock
      this.delta = 1;

      //Setup listeners for keyboard and mouse. 
      this.key = {};
      this.mousePos = [0, 0]
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
         pos: [this.DIM_X / 2, this.DIM_Y * .8]
      })
      this.player = ship;
      this.objects.push(ship);

      //Level 
      this.level = new Level({
         ctx: this.ctx,
         game: this
      });

      //Game loop start
      this.frameRate = (1000 / 60) - .001;   // Frames per ms
      this.secondsPassed = 0;                // Time since last windows frame request
      this.timeStartOffset = 0;              // timeStart in gameStart will begin ticking immediately on browser load. Add offset to timer to compensate.      
      this.oldTimeStamp = 0;
      this.updateInterval = 0;               // Time since last game update
      this.background = Images.background;
      this.imgHeight = 0;
      this.scrollSpeed = 1;

      // In need of heavy refactoring.
      this.GameStartButton = {
         x: 0,
         y: 0,
         width: this.DIM_Y,
         height: this.DIM_X
      }

      // Audio handling
      // Base starting volume. Use as a baseline for multiplying with the val from volume slider.                     
      this.baseVolume = .05;                   
      // Master volume controls all sound
      this.masterVolume = (window.localStorage.volume ? window.localStorage.volume / 100 * this.baseVolume : .05);
      document.getElementById('volume').value = window.localStorage.volume;
      this.gameMenu();
      //window.requestAnimationFrame(this.gameStart.bind(this))
   }

   gameStart(timeStamp) {
      if (this.player.health > 0 && !this.level.levelComplete) {
         this.secondsPassed = (timeStamp - this.oldTimeStamp);
         let deltaRatio = this.secondsPassed / this.frameRate;
         this.oldTimeStamp = timeStamp;
         this.update(deltaRatio, this.delta);
         this.draw();
      } else {
         this.gameMenu();
      }

      window.requestAnimationFrame(this.gameStart.bind(this))
   }

   
   loadGame() {
      if (this.player.health > 0 && !this.level.levelComplete) {
         let moon_elem = document.getElementById('moon_game');
         moon_elem.style.cursor = 'none'
         this.GameStartButton = {}
         window.requestAnimationFrame(this.gameStart.bind(this))
         this.level.loadLevel();

         Images.doctor.volume = this.baseVolume;
         Images.bgm.volume = this.baseVolume;
         Images.explode.volume = this.baseVolume;
         Images.doctor.play();
         Images.bgm.play();
      } else {
         window.location.reload();
         // let moon_elem = document.getElementById('moon_game');
         // moon_elem.style.cursor = 'none'

         // this.GameStartButton = {};
         // this.activeHitbox = [];
         // this.objects = [];
         // this.sprites = [];
         // this.level.time = 0;
         // this.level.currEnemy = [];

         // this.secondsPassed = 0;
         // this.oldTimeStamp= 0;
         // this.player = new PlayerShip({
         //     ctx: this.ctx, 
         //     game: this,
         //     pos: [this.DIM_X/2, this.DIM_Y*.8]
         // })
         // this.sprites.push(this.cursor)
         // this.objects.push(this.player);
         // window.cancelAnimationFrame()
      }
   }

   update(deltaRatio, delta) {
      // Update audio vol
      Images.doctor.volume = this.masterVolume;
      Images.bgm.volume = this.masterVolume;
      Images.explode.volume = this.masterVolume;
      this.checkKeys();

      //Calls each objects update function.
      this.level.update(this.deltaRatio);

      this.objects.forEach(obj => {
         obj.update(deltaRatio, delta);
      })
      this.activeHitbox.forEach(obj => {
         obj.update(deltaRatio, delta);
      })
      this.sprites.forEach(obj => {
         obj.update(deltaRatio, delta);
      })
   }
   
   // Need heavy refactor
   gameMenu() {
      if (this.player.health > 0 && !this.level.levelComplete) {
         let moon_elem = document.getElementById('moon_game');
         moon_elem.style.cursor = 'auto'
         var f = new FontFace('pressStart', 'url(src/styles/pressStart.ttf)');
         f.load().then((font) => {
            document.fonts.add(font);
            this.ctx.fillStyle = "white";
            this.ctx.font = '40px pressStart';
            this.ctx.fillText("Click to Start", this.DIM_X / 2 - 275, this.DIM_Y / 2);
         });
      } else {
         this.GameStartButton = {
            x: 0,
            y: 0,
            width: this.DIM_Y,
            height: this.DIM_X
         }
         let moon_elem = document.getElementById('moon_game');
         moon_elem.style.cursor = 'auto'

         this.ctx.fillStyle = "white";
         this.ctx.strokeStyle = 'black';

         this.ctx.font = '40px pressStart';
         this.ctx.fillText(`FINAL SCORE: ${this.player.score}`, this.DIM_X / 2 - 300, this.DIM_Y / 4);

         this.ctx.font = '30px pressStart';
         this.ctx.fillText("GRADE: C-", this.DIM_X / 2 - 120, this.DIM_Y / 2);
         this.ctx.fillText("Click to Restart?", this.DIM_X / 2 - 240, this.DIM_Y / 1.5);
      }
   }
   
   draw() {
      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

      this.drawBackground();
      this.level.draw();

      this.objects.forEach(obj => {
         obj.draw();
      })

      this.activeHitbox.forEach(obj => {
         obj.draw();
      })

      this.sprites.forEach(obj => {
         obj.draw();
      })
   }

   drawBackground() {
      this.ctx.drawImage(this.background, 0, this.imgHeight, this.DIM_X, this.DIM_Y);
      this.ctx.drawImage(this.background, 0, this.imgHeight - this.DIM_Y, this.DIM_X, this.DIM_Y)
      this.imgHeight += this.scrollSpeed;
      if (this.imgHeight === this.DIM_Y) this.imgHeight = 0;
      this.ctx.fillStyle = "white";
      this.ctx.font = '20px pressStart';

      // Draw ingame timer
      this.timeStartOffset ||= this.oldTimeStamp; 
      var time = (75 - (this.oldTimeStamp - this.timeStartOffset) / 1000);
      if (time < 1) time = 0;
      let timer = time.toString().substring(0, 5);
      this.ctx.fillText(`${timer}`, this.DIM_X / 2 - 70, this.DIM_Y / 10);
   }

   setupListeners() {
      document.addEventListener("keydown", e => this.key[e.code] = true, false);
      document.addEventListener("keyup", e => this.key[e.code] = false, false);
      document.getElementById("moon_game").addEventListener("mousedown", e => this.key[e.button] = true, false)
      document.getElementById("moon_game").addEventListener("mouseup", e => this.key[e.button] = false, false)
      document.addEventListener("click", e => {
         if (this.isInside(this.mousePos, this.GameStartButton)) {
            console.log("Starting")
            this.loadGame();
         }
      })
      document.getElementById('volume').addEventListener('input', e => this.setVolume(e));
      this.ctx.canvas.addEventListener('mousemove', event => this.getMousePos(event))
   }

   isInside(pos, rect) {
      return pos[0] > rect.x && pos[0] < rect.x + rect.width && pos[1] < rect.y + rect.height && pos[1] > rect.y
   }

   checkKeys() {
      let acc = .8;
      //Directional keys
      if (this.key['KeyA']) {
         if (this.player.vel[0] > -this.player.speed) {
            this.player.vel[0] -= this.player.speed * (acc);
         }
         if (this.player.vel[0] < -this.player.speed) {
            this.player.vel[0] = -this.player.speed;
         }
      }

      if (this.key['KeyD']) {
         if (this.player.vel[0] < this.player.speed) {
            this.player.vel[0] += this.player.speed * (acc);
         }
         if (this.player.vel[0] > this.player.speed) {
            this.player.vel[0] = this.player.speed;
         }
      }

      if (this.key['KeyW']) {
         if (this.player.vel[1] > -this.player.speed) {
            this.player.vel[1] -= this.player.speed * (acc);
         }

         if (this.player.vel[1] < -this.player.speed) {
            this.player.vel[1] = -this.player.speed;
         }
      }

      if (this.key['KeyS']) {
         if (this.player.vel[1] < this.player.speed) {
            this.player.vel[1] += this.player.speed * (acc);
         }
         if (this.player.vel[1] > this.player.speed) {
            this.player.vel[1] = this.player.speed;
         }
      }

      //Slows down the ship when ship is held.
      if (this.key['ShiftLeft']) {
         this.player.focusMode();
      } else {
         this.player.unfocus();
      }
      //Left click = 0, Right click = 2
      if (this.key[0]) {
         this.player.fire(this.mousePos);
      }

      if (this.key[2]) {
         this.player.parry(this.mousePos);
      }
   }

   getMousePos(e) {
      var rect = this.ctx.canvas.getBoundingClientRect();
      this.mousePos[0] = e.clientX - rect.left;
      this.mousePos[1] = e.clientY - rect.top;
   }

   setVolume(e) {
      window.localStorage.setItem('volume', e.currentTarget.value);
      var sliderVal = e.currentTarget.value / 100;
      this.masterVolume = sliderVal * this.baseVolume;
      if (this.masterVolume <= .01) this.masterVolume = 0;
   }
}