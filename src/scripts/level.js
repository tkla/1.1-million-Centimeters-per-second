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
        this.loadLevel();
    }

    loadLevel(){
        for (let i = 0; i < 5; i++){

            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [-100-(i*50), Util.getRandomArbitrary(100, 400)]
            })

            this.game.objects.push(enemy)
        }
    }

    //This is what they call HARD CODED. NO IQ, NO FORESIGHT.
    update(){
       
        if (this.game.delta > 0) this.time++;
        console.log(this.time)
        if (this.time == this.maxTime){}

        if (this.time >= 70 && this.time <= 200){
            
            let newPos = [2000, this.DIM_Y/3]
            for (let i = 1; i < this.game.objects.length; i++){
                this.game.objects[i].pathTowards(this.game.objects[i].pos, newPos, 3)
            }
        }


        if (this.time >= 201 && this.time <= 600){
            
            for (let i = 1; i < this.game.objects.length; i++){
                let newPos = [this.game.objects[i].pos[0], 100]
                this.game.objects[i].pathTowards(this.game.objects[i].pos, newPos, 1)
            }
        }

        if (this.time >= 120 && this.time <= 700){
            for (let i = 1; i < this.game.objects.length; i++){
                this.game.objects[i].fire(this.game.player.pos)
            }
        }

        if (this.time >= 700 && this.time <= 700){
            for (let i = 1; i < this.game.objects.length; i++){
                this.game.objects[i].pathTowards(this.game.objects[i].pos, this.game.player.pos, 8)
            }
        }
    }
    //Call draw functions on objects that will spawn in level.
    draw(){

    }
}