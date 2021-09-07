import {Images} from './image_source'

export default class Sprite{
    constructor(options){
        this.ctx = options.ctx;
        this.swidth = options.swidth;
        this.sheight = options.sheight;
        this.dwidth = options.dwidth;
        this.dheight = options.dheight;
        this.image = options.image;

        this.angle = 0;
        this.rotate = true;
    }

    update(){

    }

    draw(pos, mousePos, rotateNext=true){
        //Magic
        //var angle = Math.atan2(mousePos[0] - pos[0], -(mousePos[1] - pos[1]));
        
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
            0,
            0,
            this.swidth,
            this.sheight,
            -this.dwidth/2,
            -this.dheight/2,
            this.dwidth,
            this.dheight
        )
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); 
        
    }
}