export default class Ship{

    constructor(options){
        this.ctx = options.ctx;
        // Movement = (x += xVel, y += yVel)
        // xVel = xKey * friction * speed
        // yVel = yKey * friction * speed
        this.vel = [0, 0];
        this.speed = 1;
        this.friction = 1;
        this.knockbackFriction = 0.4;
        this.weight = 1;

        this.hitboxRadius = 5;
        this.hurtboxRadious = 5;
        this.game = options.game;
        this.pos = [options.pos[0], options.pos[1]];
        
    }

    draw(){
        
        //DEBUG ONLY
        this.ctx.beginPath(); 
        this.ctx.arc(this.pos[0], this.pos[1], 25, 0, Math.PI *2, false);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke(); 
        this.ctx.fillStyle = "black"; 
        this.ctx.fill();

        //DEBUG ONLY
        this.ctx.beginPath(); 
        this.ctx.arc(this.pos[0], this.pos[1], this.hurtboxRadious, 0, Math.PI *2, false);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke(); 
        this.ctx.fillStyle = "red"; 
        this.ctx.fill();
    }

    move(){
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    }

    isCollideWith = function(other) {
        let x_1 = this.pos[0];
        let y_1 = this.pos[1];
        let x_2 = other.pos[0];
        let y_2 = other.pos[1];
        let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    
        return (dist < ((this.hurtboxRadious + other.hitboxRadius)));
    }
}