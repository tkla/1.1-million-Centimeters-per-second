//Handle drawing specific level layout/backgrounds, enemy spawning, and level related events.
import Enemy from './enemy/enemy'
import {Util} from './util'
export default class Level {
    constructor(options){
        this.ctx = options.ctx; 
        this.game = options.game;
        this.player = this.game.player;
        this.playerPos = this.game.player.pos;
        this.time = 0;
        this.maxTime = 4000;
        this.DIM_X = this.ctx.canvas.width;
        this.DIM_Y = this.ctx.canvas.height;

        //Current enemy set to give instructions to
        this.currEnemy = [];
        //this.game.objects.push( this.debug)
        //this.loadLevel();
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
                setEventPath(endPos, speed, time, homing)
                setEventFire(pos, time, duration, direction) // If direction arg, 0 = player.pos, 1 = down, 2 = right, 3 = left
                setEventFireRate(rate, time=1)               //Set how often the current group of enemies will fire.
    */
    update(){
        if (this.game.delta > 0) this.time++;
        if (this.time === this.maxTime) this.player.health = 0; //Implement proper end game later

        if (this.time === 1){
            this.spawnLeft(3, 80, false, true, 50);
            this.setEventFireRate(.5) 

            this.setEventPathHor(225, 3, 1.1);
            this.setEventFire(this.playerPos, 3, 3, 0)
            this.setEventPath(this.playerPos, 5, 6, true)
        }

        if (this.time === 200){
            this.spawnRight(3, 80, false, true, 50);
            this.setEventFireRate(.5) 

            this.setEventPathHor(625, 3, 1.1);
            this.setEventFire(this.playerPos, 3, 3, 0)
            this.setEventPath(this.playerPos, 5, 6, true)
        }


        if (this.time === 560){
            this.spawnLeft(5, 80, false, true, 50);
            this.setEventFireRate(1) 
            this.setEventPathHor(2000, 3, 1.1);
            this.setEventFire(this.playerPos, 3, 6, 1)
        }

        if (this.time === 560){
            this.spawnRight(5, 80, false, true, 50);
            this.setEventFireRate(1) 
            this.setEventPathHor(-2000, 3, 1.1);
            this.setEventFire(this.playerPos, 3, 6, 1)

        }
        //spawnTop(count, x, random, stagger, ystagger, staggerNum){
        if (this.time === 900){
            this.spawnTop(8, 50, false, true, 0, 125);
            this.setEventPathVert(2000, 2, 1);
            this.setEventFireRate(.2);
            this.setEventFire([this.DIM_X/2, this.DIM_Y/2], 1, 1.5)
            this.setEventFire(this.playerPos, 4, 10, 1)
        }

        // if (this.time === 1200){
        //     this.spawnTop(9, 50, false, false);
        //     this.setEventPathVert(2000, 2, 1);
        //     this.setEventFireRate(.75);
        //     this.setEventFire(this.playerPos, 4, 10, 2)
        // }

        if (this.time === 1300){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 7, true)
            this.setEventFire(this.playerPos, 8, 5)

            
        }

        if (this.time === 1400){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 1500){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 1600){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 1700){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 1800){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 1900){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 2000){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 2100){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventFire(this.playerPos, 2, 3, 1)
            this.setEventPath(this.playerPos, 8, 3, true)
        }

        if (this.time === 2200){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 5, 2.2, true);
            this.setEventPath(this.playerPos, 8, 3, true)
            this.setEventFire(this.playerPos, 8, 2)
        }

        if (this.time === 2500){
            this.spawnTop(16, 5, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            //this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 2, 2.2, true);
            this.setEventFire(this.playerPos, 1, 20)
        }

        if (this.time === 2900){
            this.spawnTop(16, this.DIM_X/2+50, false, true, 0, 30);
            this.setEventPathVert(50, 5, 1, true);
            this.setEventFireRate(.5);
            //this.setEventFire(this.playerPos, 2, .5, 1)
            this.setEventPathVert(2000, 1, 2.2, true);
            this.setEventPath(this.playerPos, 3, 3, true)
            this.setEventFire(this.playerPos, 1, 25)
        }

        if (this.time === 3200){
            this.spawnLeft(15, -400, false, true, 100, true)
            this.setEventFireRate(1)
            this.setEventPathHor(40, 5, 1, true)
            this.setEventPathVert(2000, 1, 2.2, true)
            this.setEventFire(this.playerPos, 2, 20, 2)
        }

        if (this.time === 3200){
            this.spawnRight(15, -450, false, true, 100, true)
            this.setEventFireRate(1)
            this.setEventPathHor(this.DIM_X-40, 5, 1, true)
            this.setEventPathVert(2000, 1, 2.2, true)
            this.setEventFire(this.playerPos, 2, 20, 3)
        }

    }
    //Go Straight up/down
    //this.setEventPathVert(this.game.player.pos[1], 5, 5)
    setEventPathVert(y, speed, time, noStagger){
        time *= 1000;
        let endY = 0;
        for (let i = 0; i < this.currEnemy.length; i++){
            if (noStagger) endY = y
            else endY = y-((i-1)*70)
            this.currEnemy[i].setEventPathVert(endY, speed, time)
        }
    }
    //Go Horizontal
    setEventPathHor(x, speed, time, noStagger){
        time *= 1000;
        let endX = 0;
        for (let i = 0; i < this.currEnemy.length; i++){
            if (x > this.currEnemy[i].pos[0]) endX = x-((i-1)*70)
            else endX = x+((i-1)*70)
            
            if (noStagger) endX = x;
            this.currEnemy[i].setEventPathHor(endX, speed, time)
        }
    }
    //Go Somewhere. Homing is a hack, don't use.
    setEventPath(endPos, speed, time, homing){
        time *= 1000;
        for (let i = 0; i < this.currEnemy.length; i++){
            this.currEnemy[i].setEventPath(endPos, speed, time, homing);
        }
    }

    spawnLeft(count, y, random, stagger, staggerNum, unstaggerX){
        this.currEnemy = []
        let yLow = y - 200;
        let yHigh = y + 200
        for (let i = 0; i < count; i++){
            let yStaggered = y;
            let xStaggered = y; 
            if (random) {
                y = Util.getRandomArbitrary(yLow, yHigh);
            } else if (stagger){
                yStaggered = y + staggerNum*i
            }
            
            if (unstaggerX) xStaggered = -100;
            else xStaggered = -100-(i*70)    
            
            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [xStaggered, yStaggered]
            })
            this.currEnemy.push(enemy)
            this.game.objects.push(enemy)
        }
    }

    spawnRight(count, y, random, stagger, staggerNum, unstaggerX){
        this.currEnemy = [];
        let yLow = y - 200;
        let yHigh = y + 200
        for (let i = 0; i < count; i++){
            let yStaggered = y;
            let xStaggered = y; 
            if (random) {
                y = Util.getRandomArbitrary(yLow, yHigh);
            } else if (stagger){
                yStaggered = y + staggerNum*i
            }

            if (unstaggerX) xStaggered = this.DIM_X + 100;
            else xStaggered = this.DIM_X + 100 + (i*70) 
            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [xStaggered, yStaggered]
            })
            this.currEnemy.push(enemy)
            this.game.objects.push(enemy)
        }
    }

    spawnTop(count, x, random, stagger, ystagger, staggerNum){
        this.currEnemy = []
        let xLow = x - 200;
        let xHigh = x + 200;
        for (let i = 0; i < count; i++){
            let xStaggered = x;
            let yStaggered = -100;
            if (random) {
                x = Util.getRandomArbitrary(xLow, xHigh);
            } else if (stagger){
                xStaggered = x + staggerNum*i
            }

            if (ystagger) yStaggered = -100-(i*70);

            if (!stagger && !ystagger) yStaggered = -100-(i*70);
            const enemy = new Enemy({
                ctx: this.ctx, 
                game: this.game, 
                pos: [xStaggered, yStaggered]
            })
            this.currEnemy.push(enemy)
            this.game.objects.push(enemy)
        }
    }
    
    //setEventFire(this.game.player.pos, 2, 5, 3)
    //If direction arg, 0= player.pos, 1 = down, 2 = right, 3 = left
    setEventFire(pos, time, duration, direction){
        time *= 1000;
        duration *= 1000;
        
        for (let i = 0; i < this.currEnemy.length; i++){
            this.currEnemy[i].setEventFire(pos, time, duration, direction)
        }
    }

    //Set how often the current group of enemies will fire. Arg is in seconds, will be converted to ms.
    setEventFireRate(rate, time=1){
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