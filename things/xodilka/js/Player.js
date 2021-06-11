import Extensions from './Extensions.js';
import anims from './anims.js';

export default class Player {
    constructor(x, y, speed, maxX) {
        this.x = x || 0;
        this.y = y || 0;
        this.maxX = maxX;
        this.xSpeed = 0;
        this.setXSpeed = speed;
        this.runSpeed = this.setXSpeed * 7;
        this.isRunning = false;
        this.currentAnim = {
            name: "",
            image: null,
            width: 0,
            available: false,
            frameCount: 0,
            origin: [0, 0],
            waitUntilFinish: false
        };
        this.curFrame = 0;
        this.animCache = {};
    }

    _animTick() {
        this.x += this.xSpeed;
        if (this.x > this.maxX) this.x = -this.currentAnim.width;
        if (this.x < -this.currentAnim.width) this.x = this.maxX;
        if (this.currentAnim.available) {
            this.curFrame++;
            if (this.curFrame >= this.currentAnim.frameCount) {
                if (this.currentAnim.waitUntilFinish) {
                    if (this.xSpeed !== 0) {
                        if (this.isRunning) this.changeAnim(Extensions.findAnim(anims, "run"));
                        else this.changeAnim(Extensions.findAnim(anims, "walk"));
                    }
                    else this.changeAnim(Extensions.findAnim(anims, "stand"));
                }
                this.curFrame = 0;
            };
        }
    }

    changeAnim(anim) {
        if (this.currentAnim.name !== anim.name) {
            this.currentAnim.name = anim.name;
            this.currentAnim.available = false;
            this.currentAnim.frameCount = anim.frameCount;
            if (anim.origin) this.currentAnim.origin = anim.origin;
            else this.currentAnim.origin = [0, 0];
            if (anim.waitUntilFinish) this.currentAnim.waitUntilFinish = true;
            else this.currentAnim.waitUntilFinish = false;
            Extensions.loadImage(anim.src, this.animCache, null, this.setCache).then(img => {
                this.currentAnim.image = img;
                this.currentAnim.width = this.currentAnim.image.width / this.currentAnim.frameCount;
                this.currentAnim.available = true;
            })
        }
    }

    setCache(name, value) {
        Object.defineProperty(this.animCache, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
        });
    }

    checkForCollision(target) {
        if (this.x + this.currentAnim.width >= target.x && this.x <= target.x + target.w) return true;
    }
}