var currentSong = 0
var songList = ['music/Unspoken%20Words.mp3', 'music/The%20Love%20That%20Binds%20Us.mp3', 'music/Unspoken%20Words.mp3']

player.volume = 0.1

player.addEventListener('ended', () => {
  currentSong++
  player.src = songList[currentSong]
  player.currentTime = 0
  player.play()
})
