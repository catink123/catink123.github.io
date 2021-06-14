import SoundEffect from "./SoundEffect.js";

var sfx = [];

sfx.push({
    name: 'hit',
    data: new SoundEffect(
        [
            {
                sound: './assets/sounds/KillerCapture.wav',
                time: 0
            },
            {
                sound: './assets/sounds/KillerKill.wav',
                time: 1000
            }
        ]
    )
});

sfx.push({
    name: 'footstep1',
    data: new SoundEffect([{sound: './assets/sounds/footstep1.wav', time: 0}])
});

sfx.push({
    name: 'footstep2',
    data: new SoundEffect([{sound: './assets/sounds/footstep2.wav', time: 0}])
});

export default sfx;