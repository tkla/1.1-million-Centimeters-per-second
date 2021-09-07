export const Util = {
    myThrottle(orig, interval){
        let tooSoon = false;
        let that = orig;
        return function(){
            if(!tooSoon){
                tooSoon = true;
                setTimeout( function(){tooSoon = false}, interval)
                that(arguments);
            }
        }
    }
}

