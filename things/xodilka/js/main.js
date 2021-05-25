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
        frameCount: 80
    },
    walk: {
        src: './assets/walk.png',
        frameCount: 40
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
    frameCount: 0
};

function changeAnim(animName) {
    const anim = anims[animName];
    if (currentAnim.name !== animName) {
        currentAnim.name = animName;
        currentAnim.available = false;
        currentAnim.frameCount = anim.frameCount;
        loadImage(anim.src).then(img => {
            currentAnim.image = img;
            currentAnim.width = currentAnim.image.width / currentAnim.frameCount;
            currentAnim.available = true;
        })
    }
    
}
changeAnim("stand");

let curFrame = 0;

let x = 0;
let xSpeed = 0;

let flipped = false;

document.addEventListener("keydown", e => {
    if (e.repeat) return;
    switch (e.key) {
        case "ArrowRight":
            e.preventDefault();
            changeAnim("walk");
            xSpeed = 5;
            flipped = false;
            break;
        case "ArrowLeft":
            e.preventDefault();
            changeAnim("walk");
            xSpeed = -5;
            flipped = true;
            break;
    }
});

document.addEventListener("keyup", e => {
    switch (e.key) {
        case "ArrowRight":
            changeAnim("stand");
            xSpeed = 0;
            break;
        case "ArrowLeft":
            if (currentAnim.available) changeAnim("stand");
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
        if (curFrame >= currentAnim.frameCount) curFrame = 0;
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

function draw(t) {
    c.clearRect(0, 0, canv.width, canv.height);
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canv.width, canv.height);
    if (loaded && currentAnim.available) {
        let sx = curFrame * currentAnim.width;
        let sy = 0;
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