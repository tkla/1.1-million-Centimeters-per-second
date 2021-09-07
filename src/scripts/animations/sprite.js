import {Image} from './image_source'

export default class Sprite{
    constructor(options){
        this.context = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
    }
}