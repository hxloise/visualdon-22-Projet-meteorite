import * as d3 from 'd3'
import allMusics from '../../data/music.json'
import getYear from '../year.js'
import badDay from '../../music/BoBAirplanes.mp3'


const url = '../../music/'

// Song infos
const playerSection = document.querySelector('#player')
const playerSongTitle = playerSection.querySelector('#player-infos-song-title')
const playerArtistName = playerSection.querySelector('#player-infos-artist-name')

// Controls
const playerPrev = document.querySelector('#player-control-previous')
const playerPlay = document.querySelector('#player-control-play')
const playerPlayIcon = document.querySelector('#player-control-play .material-icons')
const playerNext = document.querySelector('#player-control-next')

// Tag audio
const audioPlayer = document.querySelector('#audio-player')
// tab for music
let songOfTheYear = []

export default function playSong(year) {

    // Get music of the year 
    songOfTheYear = allMusics.filter(music => music.id == year)
    // replace info in the HTML tags
    playerSongTitle.innerText = songOfTheYear[0].song
    playerArtistName.innerText = songOfTheYear[0].artist

    // replace song url in the HTML dataset
    audioPlayer.setAttribute =("src",url+songOfTheYear[0].url)
    console.log(audioPlayer.src)
  //  audioPlayer.load()
    audioPlayer.play()
}

// Play next song 
function playNextSong() {
    const index = allMusics.id
    const newIndex = index + 1
    // If we get out of the array we restart from the begining
    if (newIndex < allMusics.length)     
        playSong(allMusics[newIndex].id)
    else
        playSong(allMusics[0].id)
}

// play previous song
function playPreviousSong() {
    const index = allMusics.id
    const newIndex = index - 1
   
    // If we get out of the array we restart from the begining
    if (newIndex >= 0)
        playSong(allMusics[newIndex].id)
       // console.log(allMusics[newIndex].id)
    else
        playSong(allMusics[allMusics.length - 1].id)
}

// On click we send the instruction to the player
playerPlay.addEventListener('click', () => {
    if (audioPlayer.paused)
        audioPlayer.play()
    else
        audioPlayer.pause()
})

// Bouton précédent
playerPrev.addEventListener('click', playPreviousSong)

// Bouton suivant
playerNext.addEventListener('click', playNextSong)
