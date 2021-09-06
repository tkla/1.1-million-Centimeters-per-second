export default class Ship{

    constructor(options){
        this.ctx = options.ctx;
        //Movement
        this.vel = [0, 0];
        this.speed = 1;
        this.friction = 0.8;
        this.knockbackFriction = 0.9;
        this.weight = 1;

        this.hitboxRadius = 25;
        this.hurtboxRadious = 5;
        this.game = options.game;
        this.pos = [options.pos[0], options.pos[1]];
        
        //Debug 
        this.color = "black"
        this.hit = true; 
    }

    draw(){
        
        //DEBUG ONLY
        this.ctx.beginPath(); 
        this.ctx.arc(this.pos[0], this.pos[1], 25, 0, Math.PI *2, false);
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke(); 
        if (this.hit){
            this.ctx.fillStyle = "pink"; 
        } else {
            this.ctx.fillStyle = "black";
        }
        
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
        let norm = this.speed * .7101;
        //Normalize diagonal vector
        if ( (Math.abs(this.vel[0]) >= norm) && (Math.abs(this.vel[1]) >= norm) ){
            this.vel[0] *= .7101;
            this.vel[1] *= .7101;
        }

        
        console.log(this.vel);
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.vel[1] *= this.friction;
        this.vel[0] *= this.friction;
        
    }

    update(objects){
        this.hit = false;
        this.move();
        this.checkCollisions(objects);
    }

    checkCollisions(objects){
        for (let i = 0; i< objects.length; i++){
            if (this.isCollideWith(objects[i]) && objects[i] != this){
                this.hit = true;
            }
        }
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