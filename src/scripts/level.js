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
        
    }

    endLevel(){

    }
    /*  This is what they call HARD CODED. NO IQ, NO FORESIGHT.
        Events: spawnLeft(count, y, random, stagger, staggerNum)
                spawnRight(count, y, random, stagger, staggerNum)
                setEventPathVert(y, speed)
                setEventPathHor(x, speed)
                setEventPath(endPos, speed)
                setEventFire(pos)
                setFireRate(rate)   
    */
    update(){
        console.log(this.game.mousePos);
        if (this.game.delta > 0) this.time++;
        if (this.time == this.maxTime) endLevel();

        if (this.time == 1) this.spawnLeft(3, 80, false, true, 50);

        if (this.time == 70){
            this.setEventPathHor(225, 3)
            this.setFireRate(.7);
        }

        if (this.time >= 150 && this.time <= 3000){
            this.setEventFire(this.game.player.pos)
        }
        
        if (this.time == 180){
            //this.setEventPathVert(1000, 3)
        }

        


    }
    //Go Straight up/down
    setEventPathVert(y, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            endPos = [this.game.objects[i].pos[0], y-((i-1)*70)]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Horizontal
    setEventPathHor(x, speed){
        let endPos = [0,0]
        for (let i = 1; i < this.game.objects.length; i++){
            
            endPos = [x-((i-1)*70), this.game.objects[i].pos[1]]
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }
    //Go Somewhere
    setEventPath(endPos, speed){
        for (let i = 1; i < this.game.objects.length; i++){
            this.game.objects[i].pathTowards(this.game.objects[i].pos, endPos, speed)
        }
    }

    spawnLeft(count, y, random, stagger, staggerNum){
        let yLow = y - 200;
        let yHigh = y + 200
        for (let i = 0; i < count; i++){
            let yStaggered = y;
            if (random) {
                y = Util.getRandomArbitrary(yLow, yHigh);
            } else if (stagger){
                yStaggered = y + staggerNum*i
            }

            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [-100-(i*70), yStaggered]
            })
            this.game.objects.push(enemy)
        }
    }
    
    spawnRight(count, y, random, stagger, staggerNum){
        let yLow = y - 200;
        let yHigh = y + 200
        for (let i = 0; i < count; i++){
            let yStaggered = y;
            if (random) {
                y = Util.getRandomArbitrary(yLow, yHigh);
            } else if (stagger){
                yStaggered = y + staggerNum*i
            }

            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [this.DIM_X + 100 + (i*70), yStaggered]
            })
            this.game.objects.push(enemy)
        }
    }

    setEventFire(pos){
        for (let i = 1; i < this.game.objects.length; i++){
            this.game.objects[i].fire(pos)
        }
    }

    //Set how often the current group of enemies will fire. Arg is in seconds, will be converted to ms.
    setFireRate(rate){
        rate = rate*1000;
        for (let i = 1; i < this.game.objects.length; i++){
            this.game.objects[i].throttleFireRate(rate)
        }
    }
    //Call draw functions on objects that will spawn in level.
    draw(){

    }
}