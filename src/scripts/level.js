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

        //Current enemy set to give instructions to
        this.currEnemy = [];
        //this.game.objects.push( this.debug)
        this.loadLevel();
    }

    loadLevel(){
        
    }

    endLevel(){

    }
    /*  This is what they call HARD CODED. NO IQ, NO FORESIGHT.
        Time is in seconds. Will be converted to MS for SetTimeout
        Events: spawnLeft(count, y, random, stagger, staggerNum)
                spawnRight(count, y, random, stagger, staggerNum)
                setEventPathHor(x, speed, time)
                setEventPathVert(y, speed, time)
                setEventPath(endPos, speed, time)
                setEventFire(pos)
                setFireRate(rate)   
    */
    update(){
        //console.log(this.game.mousePos);
        if (this.game.delta > 0) this.time++;
        if (this.time == this.maxTime) endLevel();

        if (this.time == 1){
            this.spawnLeft(3, 80, false, true, 50);
            this.setEventPathHor(225, 3, 1.1);
            this.setEventPathVert(1000, 2, 4)
            this.setEventPath(this.game.player.pos, 6, 6)
        }

    }
    //Go Straight up/down
    //this.setEventPathVert(this.game.player.pos[1], 5, 5)
    setEventPathVert(y, speed, time){
        time *= 1000;
        let endY = 0;
        for (let i = 0; i < this.currEnemy.length; i++){
            endY = y-((i-1)*70)
            this.currEnemy[i].setEventPathVert(endY, speed, time)
        }
    }
    //Go Horizontal
    setEventPathHor(x, speed, time){
        time *= 1000;
        let endX = 0;
        for (let i = 0; i < this.currEnemy.length; i++){
            endX = x-((i-1)*70)
                 
            this.currEnemy[i].setEventPathHor(endX, speed, time)
        }
    }
    //Go Somewhere
    setEventPath(endPos, speed, time){
        time *= 1000;
        for (let i = 0; i < this.currEnemy.length; i++){
            this.currEnemy[i].setEventPath(endPos, speed, time);
        }
    }

    spawnLeft(count, y, random, stagger, staggerNum){
        this.currEnemy = []
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
            this.currEnemy.push(enemy)
            this.game.objects.push(enemy)
        }
    }
    
    spawnRight(count, y, random, stagger, staggerNum){
        this.currEnemy = [];
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
            this.currEnemy.push(enemy)
            this.game.objects.push(enemy)
        }
    }
    //If direction arg, 1 = down, 2 = right, 3 = left
    setEventFire(pos, time, duration, player, direction){
        time *= 1000;
        duration *= 1000;
        
        for (let i = 0; i < this.currEnemy.length; i++){
            this.currEnemy[i].setEventFire(pos, time, duration, player, fireDown, fireLeft, fireRight)
        }
    }

    //Set how often the current group of enemies will fire. Arg is in seconds, will be converted to ms.
    setFireRate(rate, time=1){
        time *= 1000;
        rate *= 1000;
        for (let i = 0; i < this.currEnemy.length; i++){
            this.currEnemy[i].setEventFireRate(rate, time);
        }
    }
    //Call draw functions on objects that will spawn in level.
    draw(){

    }
}