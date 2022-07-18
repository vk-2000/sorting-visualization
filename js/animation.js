
export default class Animation {
    constructor(animationInfo, arrayDiv, speed){
        this.animationInfo = animationInfo;
        this.arrayDiv = arrayDiv;
        this.speed = speed;
    }
    setSortedArray(sortedArray){
        this.sortedArray = sortedArray;
    }
    setArrayCopy(arrayCopy){
        this.arrayCopy = arrayCopy;
    }
    increaseSpeed(by){
        this.speed-=by;
    }
    decreaseSpeed(by){
        this.speed+=by;
    }

    #sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async animateCompareAndSwap(){
        let n = this.animationInfo.length;
        for(let i=0; i<n; i++){
            let x = this.animationInfo[i][1];
            let y = this.animationInfo[i][2];
            let op = this.animationInfo[i][0];
    
            if(i !== 0) {
                let p_x = this.animationInfo[i-1][1];
                let p_y = this.animationInfo[i-1][2];
    
                $(this.arrayDiv[p_x]).css({"backgroundColor":"black"});
                $(this.arrayDiv[p_y]).css({"backgroundColor":"black"});
    
                if($(this.arrayDiv[p_x]).height() == this.sortedArray[p_x]){
                    $(this.arrayDiv[p_x]).css({"backgroundColor":"green"});
                }
                if($(this.arrayDiv[p_y]).height() == this.sortedArray[p_y]){
                    $(this.arrayDiv[p_y]).css({"backgroundColor":"green"});
                }
                
            }
    
            if(op === 1){
                let h = $(this.arrayDiv[x]).height();
                $(this.arrayDiv[x]).height($(this.arrayDiv[y]).height());
                $(this.arrayDiv[y]).height(h);
                $(this.arrayDiv[x]).css({"backgroundColor":"red"});
                $(this.arrayDiv[y]).css({"backgroundColor":"red"});
    
                
            }
            else {
                $(this.arrayDiv[x]).css({"backgroundColor":"red"});
                $(this.arrayDiv[y]).css({"backgroundColor":"red"});
            }
    
            await this.#sleep(this.speed);
    
        }
    
    
    }
    // merge positions and previous state of the array stored in info
    async animateMerge(){
        let n = this.animationInfo.length;
        let arr = []
        for(let i=0; i<n; i++){
    
            if(i !== 0){
                arr = this.animationInfo[i-1][0];
                let merges = this.animationInfo[i-1][1];
                for(let k=0; k<merges.length; k++){
                    $(this.arrayDiv[merges[k][0]]).css({"backgroundColor":"black"});
                }
            }
            else{
                arr = Array.from(this.arrayCopy)
            }
            let merges = this.animationInfo[i][1];
    
            for(let k=0; k<merges.length; k++){
                let a = merges[k][0];
                let b = merges[k][1];
                $(this.arrayDiv[a]).height(arr[b]);
                $(this.arrayDiv[a]).css({"backgroundColor":"red"});
            }
            await this.#sleep(this.speed);
        }
        for(let i=0; i<this.arrayDiv.length; i++){
            $(this.arrayDiv[i]).css({"backgroundColor":"green"});
        }
    }
    
    async animationInsertion(){
        let n = this.animationInfo.length;
        for(let i=0; i<n; i++){
    
            if(i !== 0){
                let x = this.animationInfo[i-1][0];
                let y = this.animationInfo[i-1][1];
                $(this.arrayDiv[x]).css({"backgroundColor":"black"});
                $(this.arrayDiv[y]).css({"backgroundColor":"black"});
    
            }
    
            
            let x = this.animationInfo[i][0];
            let y = this.animationInfo[i][1];
            let val = this.animationInfo[i][2];
    
            $(this.arrayDiv[y]).height(val);
            $(this.arrayDiv[x]).css({"backgroundColor":"red"});
            $(this.arrayDiv[y]).css({"backgroundColor":"red"});
    
            await this.#sleep(this.speed);
    
        }
    }



}


