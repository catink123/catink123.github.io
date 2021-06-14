export default class SoundEffect {
    constructor(sounds, play, volume) {
        this.sounds = sounds;
        this.timerIDs = [];
        this.volume = volume || 1;
        this.isPlaying = play;
        if (this.isPlaying) this.play();
    }

    play() {
        this.isPlaying = true;
        var times = [];
        for (const i in this.sounds) {
            times.push(this.sounds[i].time);
        }
        for (const i in this.sounds) {
            this.timerIDs.push(setTimeout(() => {
                let player = new Audio(this.sounds[i].sound);
                player.volume = this.volume;
                player.addEventListener("ended", () => {
                    player.remove();
                    if (Math.max(...times) === this.sounds[i].time) this.isPlaying = false;
                });
                player.play();
            }, this.sounds[i].time));
        }
    }

    stop() {
        this.isPlaying = false;
        for (const i in this.timerIDs) {
            clearInterval(this.timerIDs[i]);
        }
    }

    add(sound, time) {
        this.sounds.push({
            sound,
            time
        });
    }
}