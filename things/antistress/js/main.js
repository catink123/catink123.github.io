let prefix = 'assets/';

let soundList = [
    'KillerCalling1.wav',
    'KillerCalling2.wav',
    'KillerCalling6.wav',
    'KillerShout1.wav',
    'Scream_Killer_ViciousSister 139746.wav',
    'SCS_39.wav',
    'SCS_77_Shout.wav',
    'SCS_82.wav',
    'SCS_83.wav',
    'SCS_84.wav',
    'SCS_85.wav'
];

let startSoundName = 'SCS_92_kabluki.wav';

let musicFilename = 'bg.mp3';

let music = new Audio(prefix + musicFilename);
music.loop = true;
music.volume = 0.1;

let firstTime = localStorage.firstTime;
if (firstTime === undefined) firstTime = 1;
let bs = document.querySelector("div.blackScreen");
if (firstTime === 1) {
    let startSound = new Audio(prefix + startSoundName);
    startSound.addEventListener("ended", () => {
        music.play();
        bs.classList.add("gone");
        setTimeout(() => {
            bs.remove();
        }, 1000);
    });
    startSound.play();
    localStorage.firstTime = 1;
} else {
    bs.remove();
    music.play();
}

let hitSound = new Audio();
function getRandomHitSound() {
    let randomIndex = Math.floor(Math.random() * soundList.length);
    return prefix + soundList[randomIndex];
}


document.querySelector("#figure").addEventListener("click", () => {
    hitSound.src = getRandomHitSound();
    hitSound.play();
});


// Particles

let pCanvas = document.querySelector("#bgParticles");
let pctx = pCanvas.getContext("2d");

pCanvas.width = window.innerWidth;
pCanvas.height = window.innerHeight;

let particleCanvas = document.createElement("canvas");
let PCctx = particleCanvas.getContext("2d");

function makeParticle(radius, blurRadius, opacity) {
	PCctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particleCanvas.width = radius * 2 + blurRadius * 4;
    particleCanvas.height = radius * 2 + blurRadius * 4;
    PCctx.filter = "blur(" + blurRadius + "px)";
    PCctx.fillStyle = "rgba(255, 100, 100, " + opacity + ")";
    PCctx.beginPath();
    PCctx.arc(particleCanvas.width / 2, particleCanvas.height / 2, radius, 0, Math.PI * 2);
    PCctx.fill();
    let img = new Image(particleCanvas.width, particleCanvas.height);
    img.src = particleCanvas.toDataURL();
    return img;
}

let settings = {
    amount: 30,
    maxSpeed: 0.5
}

let particles = [];
let randNums = [];
for (var i = 0; i < settings.amount; i++) {
    randNums = [];
    for (var s = 0; s < 4; s++) {
        randNums[s] = Math.random()
    }
    particles.push(
        {
            x: Math.round(randNums[0] * pCanvas.width),
            y: Math.round(randNums[1] * pCanvas.height),
            xSpeed: randNums[2] * settings.maxSpeed - settings.maxSpeed / 2,
            ySpeed: randNums[3] * settings.maxSpeed - settings.maxSpeed / 2,
            image: makeParticle(
                Math.round((i + 1) / 20) + 1,
                Math.round(i / 20),
                1 - (i / 50)
            )
        }
    )
} 

setInterval(() => {
    for (const p in particles) {
        particles[p].x += particles[p].xSpeed;
        if (particles[p].x > pCanvas.width) particles[p].x = -particles[p].image.width;
        if (particles[p].x + particles[p].image.width < 0) particles[p].x = pCanvas.width;
        particles[p].y += particles[p].ySpeed;
        if (particles[p].y > pCanvas.height) particles[p].y = -particles[p].image.height;
        if (particles[p].y + particles[p].image.height < 0) particles[p].y = pCanvas.height;
    }
}, 16)

function draw() {
    pctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    for (let p in particles) {
        pctx.drawImage(particles[p].image, particles[p].x, particles[p].y);
    }
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);