import * as d3 from 'd3'
import allMusics from '../../data/music.json'
import getYear from '../year.js'

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
const audioPlayer = document.querySelector('#youtube-audio')

// tab for music
let songOfTheYear = []



export default function playSong(year) {
   
    // Get music of the year 
    songOfTheYear = allMusics.filter(music => music.id == year)

    // replace info in the HTML tags
    playerSongTitle.innerText = songOfTheYear[0].song
    playerArtistName.innerText = songOfTheYear[0].artist
    
    // replace song url in the HTML dataset
    audioPlayer.dataset.video = songOfTheYear[0].url
    
}

