export default class Animation {
    constructor(name, imgurl, frameCount, origin, waitUntilFinish) {
        this.name = name;
        this.src = imgurl;
        this.frameCount = frameCount;
        this.origin = origin || [0, 0];
        this.waitUntilFinish = waitUntilFinish || false;
    }
}