let prefix = '../assets/';

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
    PCctx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    PCctx.beginPath();
    PCctx.arc(particleCanvas.width / 2, particleCanvas.height / 2, radius, 0, Math.PI * 2);
    PCctx.fill();
    let img = new Image(particleCanvas.width, particleCanvas.height);
    img.src = particleCanvas.toDataURL();
    return img;
}

/* let settings = {
    amount: 1000,
    maxSpeed: 10
}

let particles = [];
for (var i = 0; i < settings.amount; i++) {
    let randNums = [];
    for (var s; i < 4; i++) {
        randNums.push(Math.random())
    }
    particles.push(
        {
            x: Math.round(randNums[0] * pCanvas.width),
            y: Math.round(randNums[1] * pCanvas.height),
            xSpeed: Math.round(randNums[2] * settings.maxSpeed - settings.maxSpeed / 2),
            ySpeed: Math.round(randNums[3] * settings.maxSpeed - settings.maxSpeed / 2),
            image: makeParticle(
                i + 1,
                i,
                1
            )
        }
    )
} 

setInterval(() => {
    for (const p in particles) {
        particles[p].x += particles[p].xSpeed;
        particles[p].y += particles[p].ySpeed;
    }
}, 16)

function draw() {
    for (const p in particles) {
	particles[p].x += particles[p].xSpeed;
        particles[p].y += particles[p].ySpeed;
        pctx.drawImage(particles[p].image, particles[p].x, particles[p].y);
    }
}

draw() */