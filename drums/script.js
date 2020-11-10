var prepath = "sounds/";

var sounds = {
	kicks: [
		"kick1.wav",
		"kick2.wav",
		"kick3.wav",
		"kick4.wav",
	],
	snares: [
		"snare1.wav",
		"snare2.wav"
	],
	snareoffs: [
		"snareoff1.wav",
		"snareoff2.wav",
		"snareoff3.wav"
	],
	closehats: [
		"closehat1.wav",
		"closehat2.wav",
		"closehat3.wav"
	],
	openhats: [
		"openhat.wav"
	]
};

var binds = {
	"z": sounds.kicks,
	"a": sounds.snares,
	"x": sounds.snareoffs,
	"/": sounds.closehats,
	"'": sounds.openhats
}

var volume = 0.5;

/* var kickButt = document.querySelector("#kick");
var snareButt = document.querySelector("#snare");
var closehatButt = document.querySelector("#closehat");
var openhatButt = document.querySelector("#openhat"); */

/* var buttBinds = {
	"kicks": kickButt,
	"snares": snareButt,
	"closehats": closehatButt,
	"openhats": openhatButt
} */

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

function play(set) {
	var rand = Math.floor(Math.random() * set.length);
	var player = new Audio(prepath + set[rand]);
	player.volume = volume;
	player.play();
}

/* document.addEventListener("keydown", e => {
	for (key in binds) {
		if (e.key == key) {
			play(binds[key]);
			buttBinds[getKeyByValue(sounds, key)].className = "button pressed";
		}
	}
})

document.addEventListener("keyup", e => {
	for (key in binds) {
		if (e.key == key) {
			buttBinds[getKeyByValue(sounds, key)].className = "button";
		}
	}
}) */