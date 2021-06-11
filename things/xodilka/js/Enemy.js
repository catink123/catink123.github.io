import Extensions from './Extensions.js';

export default class Enemy {
    constructor(x, y, maxX, w, h, speed, anim) {
        this.x = x;
        this.maxX = maxX;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.curSpeed = speed;
        this.currentAnim = {
            name: "",
            image: null,
            width: 0,
            available: false,
            frameCount: 0,
            origin: [0, 0],
            waitUntilFinish: false
        };
        this.changeAnim(anim);
        this.curFrame = 0;
        this.animCache = {};
        this.flipped = false;
        this.direction = "right";
    }

    _animTick() {
        if (this.currentAnim.available) {
            this.curFrame++;
            if (this.curFrame >= this.currentAnim.frameCount) {
                /* if (this.currentAnim.waitUntilFinish) {
                    if (this.xSpeed !== 0) {
                        if (this.isRunning) this.changeAnim(Extensions.findAnim(anims, "run"));
                        else this.changeAnim(Extensions.findAnim(anims, "walk"));
                    }
                    else this.changeAnim(Extensions.findAnim(anims, "stand"));
                } */
                this.curFrame = 0;
            };
        }
    }

    _render(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        // ctx.strokeRect(this.x, this.y, this.w, this.h);

        if (this.currentAnim.image !== null) {
            let sx = this.curFrame * this.currentAnim.width - this.currentAnim.origin[0];
            let sy = this.currentAnim.origin[1];
            let sw = this.currentAnim.width;
            let sh = this.currentAnim.image.height;
    
            if (this.flipped) ctx.scale(-1, 1);
            else ctx.scale(1, 1);
    
            let drawingX = this.x - this.currentAnim.width / 2;
            if (this.flipped) drawingX = -this.x - this.currentAnim.width + this.currentAnim.width / 2;
            // drawingX -= this.currentAnim.width / 2;
    
            ctx.drawImage(this.currentAnim.image, sx, sy, sw, sh, drawingX, 0, this.currentAnim.width, this.currentAnim.image.height);
        }

        ctx.restore();
    }

    _move(playerX) {
        if (this.x >= playerX - 400 && this.x <= playerX + 400) {
            if (this.x > playerX) this.direction = "right";
            else if (this.x < playerX) this.direction = "left";
        }

        if (this.direction === "right") {
            this.x += this.curSpeed;
            this.flipped = false;
        } else if (this.direction === "left") {
            this.x -= this.curSpeed;
            this.flipped = true;
        }

        /* if (this.x > playerX + 400 || this.x < this.maxX - 100) {
            this.curSpeed = 0;
        } else {
            this.curSpeed = this.speed;
        }

        if (this.x < playerX - 400 || this.x > 100) {
            this.curSpeed = 0;
        } else {
            this.curSpeed = this.speed;
        } */

        if (this.x > this.maxX + this.currentAnim.width / 2) this.x = -this.currentAnim.width / 2;
        if (this.x < -this.currentAnim.width / 2) this.x = this.maxX + this.currentAnim.width / 2;

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
}