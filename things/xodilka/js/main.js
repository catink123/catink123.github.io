let canv = document.querySelector("canvas");
let showWall = false;

function updateCanvasSize() {
    canv.width = window.innerWidth - 15;
    canv.height = 350;
    if (window.innerWidth < 850) showWall = false;
    else showWall = true;

    if (showWall) document.body.className = "showWall";
    else document.body.className = "";
}

updateCanvasSize();

document.body.onresize = updateCanvasSize;

let c = canv.getContext("2d");

let anims = {
    stand: {
        src: './assets/stand.png',
        frameCount: 40,
        origin: [50, 93]
    },
    walk: {
        src: './assets/walk.png',
        frameCount: 40
    },
    appear: {
        src: './assets/appear.png',
        frameCount: 46,
        origin: [0, 322],
        waitUntilFinish: true
    },
    attack: {
        src: './assets/attack.png',
        frameCount: 30,
        waitUntilFinish: true
    },
    run: {
        src: './assets/run.png',
        frameCount: 50
    }
}

let cache = {}
let prog = document.querySelector("progress"); 
let progP = document.querySelector("#loadingP");

function loadImage(path) {
    return new Promise((resolve, reject) => {
        if (cache[path] !== undefined) {
            prog.value++;
            progP.innerHTML = `Loading: ${prog.value} / ${prog.max}`;
            resolve(cache[path]);
        }
        else {
            let img = new Image();
            img.src = path;
            img.onload = function() {
                Object.defineProperty(cache, path, {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: img
                });
                prog.value++;
                progP.innerHTML = `Loading: ${prog.value} / ${prog.max}`;
                resolve(img);
            }
        }
    })
}

let loaded = false;

let imagePromises = [];
for (const i in anims) {
    imagePromises.push(loadImage(anims[i].src));
}
prog.max = imagePromises.length;
prog.value = 0;
progP.innerHTML = `Loading: ${prog.value} / ${prog.max}`;
Promise.all(imagePromises).then(images => {
    loaded = true;
    document.querySelector(".loadingContainer").classList.add("loaded");
})

let currentAnim = {
    name: "",
    image: null,
    width: 0,
    available: false,
    frameCount: 0,
    origin: [0, 0],
    waitUntilFinish: false
};

function changeAnim(animName) {
    const anim = anims[animName];
    if (currentAnim.name !== animName) {
        currentAnim.name = animName;
        currentAnim.available = false;
        currentAnim.frameCount = anim.frameCount;
        if (anim.origin) currentAnim.origin = anim.origin;
        else currentAnim.origin = [0, 0];
        if (anim.waitUntilFinish) currentAnim.waitUntilFinish = true;
        else currentAnim.waitUntilFinish = false;
        loadImage(anim.src).then(img => {
            currentAnim.image = img;
            currentAnim.width = currentAnim.image.width / currentAnim.frameCount;
            currentAnim.available = true;
        })
    }
    
}
changeAnim("appear");

let curFrame = 0;

let x = 0;
let xSpeed = 0;
let setXSpeed = 5;
let setXAnim = "walk";

let flipped = false;

let attacking = false;

document.addEventListener("keydown", e => {
    if (e.repeat) return;
    if (e.getModifierState("Shift")) {
        setXAnim = "run";
        setXSpeed = 35;
        if (xSpeed !== 0) {
            changeAnim(setXAnim);
            xSpeed = setXSpeed * (flipped ? -1 : 1);
        }
    }
    switch (e.code) {
        case "KeyD":
            e.preventDefault();
            if (!currentAnim.waitUntilFinish) {
                changeAnim(setXAnim);
                xSpeed = setXSpeed;
            }
            flipped = false;
            break;
        case "KeyA":
            e.preventDefault();
            if (!currentAnim.waitUntilFinish) {
                changeAnim(setXAnim);
                xSpeed = -setXSpeed;
            }
            flipped = true;
            break;
        case "Space":
            e.preventDefault();
            xSpeed = 0;
            curFrame = 0;
            changeAnim("attack");
            break;
    }
});

document.addEventListener("keyup", e => {
    if (!e.getModifierState("Shift")) {
        setXAnim = "walk";
        setXSpeed = 5;
        if (xSpeed !== 0) {
            changeAnim(setXAnim);
            xSpeed = setXSpeed * (flipped ? -1 : 1)
        }
    }
    switch (e.code) {
        case "KeyD":
            if (!currentAnim.waitUntilFinish) changeAnim("stand");
            xSpeed = 0;
            break;
        case "KeyA":
            if (!currentAnim.waitUntilFinish) changeAnim("stand");
            xSpeed = 0;
            break;
    }
});

setInterval(() => {
    x += xSpeed;
    if (x > canv.width) x = -currentAnim.width;
    if (x < -currentAnim.width) x = canv.width;
    if (currentAnim.available) {
        curFrame++;
        if (curFrame >= currentAnim.frameCount) {
            if (currentAnim.waitUntilFinish) {
                if (xSpeed !== 0) changeAnim(setXSpeed); 
                else changeAnim("stand");
            }
            curFrame = 0;
        };
    }
}, 33);

canv.addEventListener("contextmenu", e => {e.preventDefault()});

canv.addEventListener("touchstart", e => {
    e.preventDefault();
    let playerX = x + currentAnim.width / 2;
    let touchX = e.touches[0].clientX;
    let animate = false;
    if (touchX < playerX - 50) {xSpeed = -5; flipped = true; animate = true;}
    if (touchX > playerX + 50) {xSpeed = 5; flipped = false; animate = true;}
    if (animate) changeAnim("walk");
})

canv.addEventListener("touchmove", e => {
    e.preventDefault();
    let playerX = x + currentAnim.width / 2;
    let touchX = e.touches[0].clientX;
    let animate = false;
    if (touchX < playerX - 50) {xSpeed = -5; flipped = true; animate = true;}
    if (touchX > playerX + 50) {xSpeed = 5; flipped = false; animate = true;}
    if (animate) changeAnim("walk");
})

canv.addEventListener("touchend", e => {
    xSpeed = 0;
    changeAnim("stand");
})

let globalOffset = [0, 30];

function draw(t) {
    c.clearRect(0, 0, canv.width, canv.height);
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canv.width, canv.height);
    if (loaded && currentAnim.available) {
        let sx = curFrame * currentAnim.width - currentAnim.origin[0] + globalOffset[0];
        let sy = currentAnim.origin[1] - globalOffset[1];
        let sw = currentAnim.width;
        let sh = currentAnim.image.height;

        c.save();

        if (flipped) c.scale(-1, 1);
        else c.scale(1, 1);

        let drawingX = x;
        if (flipped) drawingX = -x - currentAnim.width;

        c.drawImage(currentAnim.image, sx, sy, sw, sh, drawingX, 0, currentAnim.width, currentAnim.image.height);

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