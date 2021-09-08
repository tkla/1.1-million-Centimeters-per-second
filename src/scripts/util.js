export const Util = {

    throttle(fn, interval, context){
        let tooSoon = false;
        let that = fn;
        
        return (...args)=> {
            if(!tooSoon){
                tooSoon = true;
                setTimeout( function(){tooSoon = false}, interval)
                that.call(context, ...args);
            }
        }
    },

    dist(pos1, pos2) {
        return Math.sqrt(
          Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    },


    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

