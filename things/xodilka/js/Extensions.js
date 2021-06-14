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
                resolve(cache[path]);
            } else {
                let imgID = Math.round(Math.random() * 1000);
                if (loadTick) loadTick({
                    index: imgID,
                    value: 0
                })
                let img = new Image();
                if (loadTick) img.load(path);
                else img.src = path;
                var delta = 0;
                let id;
                if (loadTick) id = setInterval(() => {
                    loadTick({
                        index: imgID,
                        value: img.completedPercentage
                    })
                }, 10);
                img.onload = function () {
                    if (loadTick) clearInterval(id);
                    if (cache !== undefined && cache[path] === undefined) cacheCallback(path, img);
                    resolve(img);
                }
            }
        })
    }

    static findAnim(animList, animName) {
        return animList.find(val => {
            if (val.name === animName) return true;
            return false;
        });
    }

    static findSound(sfxList, soundEffectName) {
        return sfxList.find(val => {
            if (val.name === soundEffectName) return true;
            return false;
        }).data;
    }
}