Image.prototype.load = function(url){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisImg.src = window.URL.createObjectURL(blob);
    };
    xmlHTTP.onprogress = function(e) {
        thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100) / 100;
    };
    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
    };
    xmlHTTP.send();
};

Image.prototype.completedPercentage = 0;

export default class Extensions {
    static loadImage(path, cache, loadTick, cacheCallback) {
        return new Promise((resolve, reject) => {
            if (cache !== undefined && Object.values(cache).length !== 0 && cache[path] !== undefined) {
                // if (loadTick) loadTick(1);
                resolve(cache[path]);
            } else {
                let img = new Image();
                if (loadTick) img.load(path);
                else img.src = path;
                let delta = 0;
                let id;
                if (loadTick) id = setInterval(() => {
                    delta = img.completedPercentage - delta;
                    loadTick(parseInt(delta * 100) / 100);
                }, 10);
                img.onload = function () {
                    if (loadTick) clearInterval(id);
                    // console.log(cache)
                    if (cache !== undefined && cache[path] === undefined) cacheCallback(path, img);
                    // if (loadTick) loadTick(1, true);
                    resolve(img);
                }
            }
        })
    }

    static findAnim(animList, animName) {
        return animList.find(val => {
            if (val.name === animName) return true;
            return false;
        })
    }
}