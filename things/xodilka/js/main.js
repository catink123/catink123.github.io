import Extensions from './Extensions.js';
import Player from './Player.js';
import anims from './anims.js';

let canv = document.querySelector("canvas");
let showWall = false;

let player = new Player(0, 0, 5, canv.width);

function updateCanvasSize() {
    canv.width = window.innerWidth - 15;
    canv.height = 350;
    player.maxX = canv.width;
    if (window.innerWidth < 850) showWall = false;
    else showWall = true;

    if (showWall) document.body.className = "showWall";
    else document.body.className = "";
}

updateCanvasSize();

document.body.onresize = updateCanvasSize;

let c = canv.getContext("2d");

let prog = document.querySelector("progress");
let progP = document.querySelector("#loadingP");

let loaded = false;

// let lds = []; It's defined in the <head> script tag.

let imagePromises = [];
for (const i in anims) {
    imagePromises.push(Extensions.loadImage(anims[i].src, player.animCache, (percObj) => {
        let ldIndex = lds.findIndex(val => {
            if (val.index === percObj.index) return true;
            return false;
        });
        if (lds[ldIndex] !== undefined) lds[ldIndex] = percObj;
        else {
            lds.push(percObj);
        }
        var total = 0;
        for (var i in lds) {
            total += lds[i].value;
        }
        prog.value = total;
        var valRound = Math.round(prog.value * 100) / 100;
        var percentage = Math.round(valRound / prog.max * 10000) / 100;
        progP.innerHTML = `Loading: ${percentage}% (${valRound} / ${prog.max})`;
    }, (n, v) => {
        player.setCache(n, v);
    }));
}
prog.max = imagePromises.length;
prog.value = 0;
progP.innerHTML = `Loading: ${prog.value} / ${prog.max}`;
Promise.all(imagePromises).then(images => {
    loaded = true;
    document.querySelector(".loadingContainer").classList.add("loaded");
    player.changeAnim(Extensions.findAnim(anims, "appear"));
});

let flipped = false;

document.addEventListener("keydown", e => {
    if (e.repeat) return;
    if (e.getModifierState("Shift")) {
        player.isRunning = true;
        if (player.xSpeed !== 0) {

            var anim = "walk";
            if (player.isRunning) anim = "run";
            player.changeAnim(Extensions.findAnim(anims, anim));
            var speed = player.setXSpeed;
            if (player.isRunning) speed = player.runSpeed;
            player.xSpeed = speed * (flipped ? -1 : 1);
        }
    }
    switch (e.code) {
        case "KeyD":
            e.preventDefault();
            if (!player.currentAnim.waitUntilFinish) {
                var anim = "walk";
                if (player.isRunning) anim = "run";
                player.changeAnim(Extensions.findAnim(anims, anim));
                var speed = player.setXSpeed;
                if (player.isRunning) speed = player.runSpeed;
                player.xSpeed = speed;
            }
            flipped = false;
            break;
        case "KeyA":
            e.preventDefault();
            if (!player.currentAnim.waitUntilFinish) {
                var anim = "walk";
                if (player.isRunning) anim = "run";
                player.changeAnim(Extensions.findAnim(anims, anim));
                var speed = player.setXSpeed;
                if (player.isRunning) speed = player.runSpeed;
                player.xSpeed = -speed;
            }
            flipped = true;
            break;
        case "Space":
            e.preventDefault();
            player.xSpeed = 0;
            player.curFrame = 0;
            player.changeAnim(Extensions.findAnim(anims, "attack"));
            break;
    }
});

document.addEventListener("keyup", e => {
    if (!e.getModifierState("Shift")) {
        player.isRunning = false;
        if (player.xSpeed !== 0) {
            var anim = "walk";
            if (player.isRunning) anim = "run";
            player.changeAnim(Extensions.findAnim(anims, anim));
            var speed = player.setXSpeed;
            if (player.isRunning) speed = player.runSpeed;
            player.xSpeed = speed * (flipped ? -1 : 1);
        }
    }
    switch (e.code) {
        case "KeyD":
            if (!player.currentAnim.waitUntilFinish) player.changeAnim(Extensions.findAnim(anims, "stand"));
            player.xSpeed = 0;
            break;
        case "KeyA":
            if (!player.currentAnim.waitUntilFinish) player.changeAnim(Extensions.findAnim(anims, "stand"));
            player.xSpeed = 0;
            break;
    }
});

setInterval(() => {
    player._animTick();
}, 33);

canv.addEventListener("contextmenu", e => { e.preventDefault() });

canv.addEventListener("touchstart", e => {
    e.preventDefault();
    let playerX = player.x + player.currentAnim.width / 2;
    let touchX = e.touches[0].clientX;
    let animate = false;
    if (touchX < playerX - 50) { player.xSpeed = -player.setXSpeed; flipped = true; animate = true; }
    if (touchX > playerX + 50) { player.xSpeed = player.setXSpeed; flipped = false; animate = true; }
    if (animate) player.changeAnim(Extensions.findAnim(anims, "walk"));
})

canv.addEventListener("touchmove", e => {
    e.preventDefault();
    let playerX = player.x + player.currentAnim.width / 2;
    let touchX = e.touches[0].clientX;
    let animate = false;
    if (touchX < playerX - 50) { player.xSpeed = -player.setXSpeed; flipped = true; animate = true; }
    if (touchX > playerX + 50) { player.xSpeed = player.setXSpeed; flipped = false; animate = true; }
    if (animate) player.changeAnim(Extensions.findAnim(anims, "walk"));
})

canv.addEventListener("touchend", e => {
    player.xSpeed = 0;
    player.changeAnim(Extensions.findAnim(anims, "stand"));
})

let globalOffset = [0, 30];

function draw(t) {
    c.clearRect(0, 0, canv.width, canv.height);
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canv.width, canv.height);
    if (loaded && player.currentAnim.available) {
        let sx = player.curFrame * player.currentAnim.width - player.currentAnim.origin[0] + globalOffset[0];
        let sy = player.currentAnim.origin[1] - globalOffset[1];
        let sw = player.currentAnim.width;
        let sh = player.currentAnim.image.height;

        c.save();

        if (flipped) c.scale(-1, 1);
        else c.scale(1, 1);

        let drawingX = player.x;
        if (flipped) drawingX = -player.x - player.currentAnim.width;

        c.drawImage(player.currentAnim.image, sx, sy, sw, sh, drawingX, 0, player.currentAnim.width, player.currentAnim.image.height);

        c.restore();
    }

    if (showWall) {
        c.clearRect(canv.width / 2 - 100, 0, 200, canv.height);
        c.lineWidth = 2;
        c.strokeRect(1, 1, canv.width / 2 - 100 - 2, canv.height - 2);
        c.strokeRect(canv.width / 2 + 100 + 1, 1, canv.width / 2 - 100 - 2, canv.height - 2);
    } else {
        c.strokeRect(1, 1, canv.width - 2, canv.height - 2);
    }
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);