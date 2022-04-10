import * as d3 from 'd3'
import allMusics from '../../data/music.json'
import getYear from '../year.js'

const url = "https://www.youtube.com/embed/" //gH476CxJxfg
const urlEnd = "?autoplay=0&loop=1&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8080&widgetid=1"

let URL = 'https://www.youtube.com/embed/gH476CxJxfg?autoplay=0&loop=1&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8080&widgetid=1'


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
const audioLink = document.querySelector('#youtube-player')

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
    
    //constructURl
    URL = url + songOfTheYear[0].url + urlEnd
    console.log(URL)

    audioLink.src = URL
    console.log(audioLink)  
    
}

