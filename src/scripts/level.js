//Handle drawing specific level layout/backgrounds, enemy spawning, and level related events.
import Enemy from './enemy/enemy'
import {Util} from './util'
export default class Level {
    constructor(options){
        this.ctx = options.ctx; 
        this.game = options.game;
        this.time = 0;
        this.maxTime = 3600;
        this.DIM_X = this.ctx.canvas.width;
        this.DIM_Y = this.ctx.canvas.height;

        //this.game.objects.push( this.debug)
        this.loadLevel();
    }

    loadLevel(){
        this.spawnLeft(3, false);
    }

    endLevel(){

    }
    //This is what they call HARD CODED. NO IQ, NO FORESIGHT.
    update(){
       
        if (this.game.delta > 0) this.time++;
        //console.log(this.time)
        if (this.time == this.maxTime) endLevel();

        if (this.time == 70){
            let newPos = [2000, this.DIM_Y/3]
            this.setEventPathHor(1000, 3)
        }

        if (this.time == 300){
            this.setEventPathVert(1000, 3)
        }

        if (this.time >= 150 && this.time <= 3000){
            this.setEventFire(this.game.player.pos)
        }

        // if (this.time >= 700 && this.time <= 1000){
        //     for (let i = 1; i < this.game.objects.length; i++){
        //         let newPos = [this.game.objects[i].pos[0], 1000]
        //         this.game.objects[i].pathTowards(this.game.objects[i].pos, newPos, 8)
        //     }
        // }


    }
    //Go Straight up/down
    setEventPathVert(y, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            endPos = [this.game.objects[i].pos[0], y-(i*50)]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Horizontal
    setEventPathHor(x, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            endPos = [x-(i*50), this.game.objects[i].pos[1]]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Somewhere
    setEventPath(endPos, speed){
        for (let i = 1; i < this.game.objects.length; i++){
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }

    spawnLeft(count, random, yLow, yHigh){
        let y = 0;
        for (let i = 0; i < count; i++){
            if (random) {
                y = Util.getRandomArbitrary(yLow, yHigh);
            } else {
                y = i + 50;
            }

            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [-100-(i*70), y]
            })
            this.game.objects.push(enemy)
        }
    }
    

    setEventFire(pos){
        for (let i = 1; i < this.game.objects.length; i++){
            this.game.objects[i].fire(pos)
        }
    }
    //Call draw functions on objects that will spawn in level.
    draw(){

    }
}