import {Images} from './image_source'

export default class Sprite{
    constructor(options){
        this.ctx = options.ctx;
        this.swidth = options.swidth;
        this.sheight = options.sheight;
        this.dwidth = options.dwidth || this.swidth;
        this.dheight = options.dheight || this.sheight;
        this.image = options.image;

        this.frameMax = options.frameMax || 1;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.angle = 0;
        this.rotate = true;

        //Default pos used for drawing tmp stationary particles
        this.pos = options.pos 
        //I hate this line
        this.offsetPos = null;
    }

    update(){   
        this.tickCount++;

        if (this.tickCount >= this.ticksPerFrame){
            this.tickCount = 0; 
            if (this.frameIndex < this.frameMax - 1){
                this.frameIndex++;
            }else{
                this.frameIndex = 0;
            }
        }
    }
    
    draw(pos=this.pos, mousePos=this.pos, rotateNext=true){
        this.ctx.setTransform(1, 0, 0, 1, pos[0], pos[1]);

        if (this.rotate){
            this.angle = Math.atan2(mousePos[0] - pos[0], -(mousePos[1] - pos[1]));
           
            if (!rotateNext){
                this.rotate = false;
            }
        } 
        
        this.ctx.rotate(this.angle)
        this.ctx.drawImage(
            this.image,
            this.frameIndex * (this.swidth / this.frameMax),
            0,
            this.swidth / this.frameMax,
            this.sheight,
            -this.dwidth / this.frameMax / 2,
            -this.dheight / this.frameMax / 2,
            this.dwidth / this.frameMax,
            this.dheight
        )
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
    }


    //Refactor later? It's a really jank workaround to offset a sprite by some distance. Like it's absolutely lazy hack.
    drawMelee(pos, mousePos, rotateNext=true){
        this.offsetPos = this.offset(pos, mousePos, 30);

        this.ctx.setTransform(1, 0, 0, 1, this.offsetPos[0], this.offsetPos[1]);

        if (this.rotate){
            this.angle = Math.atan2(mousePos[0] - this.offsetPos[0], -(mousePos[1] - this.offsetPos[1]));
            if (!rotateNext){
                this.rotate = false;
            }
        } 
        
        this.ctx.rotate(this.angle)
        this.ctx.drawImage(
            this.image,
            this.frameIndex * (this.swidth / this.frameMax),
            0,
            this.swidth / this.frameMax,
            this.sheight,
            -this.dwidth / this.frameMax / 2,
            -this.dheight / this.frameMax / 2,
            this.dwidth / this.frameMax,
            this.dheight
        )
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
    }

    offset(pos, dir, dist=90){
        let newPos = [0,0]
        newPos[0] = pos[0];
        newPos[1] = pos[1];
        var dx = (dir[0] - newPos[0]);
        var dy = (dir[1] - newPos[1]);
        var mag = Math.sqrt(dx * dx + dy * dy);

        newPos[0] += (dx / mag) * dist;
        newPos[1] += (dy / mag) * dist;
        return newPos;
    }
}