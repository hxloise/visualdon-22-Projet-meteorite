import * as d3 from 'd3'
import allMusics from '../../data/music.json'
import { getYear } from '../year.js'

const url = './music/'

// Song infos
const playerSection = document.querySelector('#player')
const playerSongTitle = playerSection.querySelector('#player-infos-song-title')
const playerArtistName = playerSection.querySelector('#player-infos-artist-name')
const label = document.getElementById('year-select')


// Controls
const playerPrev = document.querySelector('#player-control-previous')
// const playerPlay = document.querySelector('#player-control-play')
const playerPlayIcon = document.querySelector('#player-control-play .material-icons')
const playerNext = document.querySelector('#player-control-next')

// Tag audio
const audioPlayer = document.querySelector('#audio-player')

// tab for music
let songOfTheYear = []

function playSong(year) {
    
    label.value = year
    // Get music of the year 
    songOfTheYear = allMusics.filter(music => music.id == year)

    // replace info in the HTML tags
    playerSongTitle.innerText = songOfTheYear[0].song
    playerArtistName.innerText = songOfTheYear[0].artist

    //replace song url in the HTML dataset
    audioPlayer.src = url + songOfTheYear[0].url

    //-------------------------------------------------------------------
    //use function to load and play music
    //-------------------------------------------------------------------

    audioPlayer.load()
    audioPlayer.play()
}

//-------------------------------------------------------------------

// Play next song 
function playNextSong() {
    let currentyear = label.value
    // Get music of the year 
    songOfTheYear = allMusics.filter(music => music.id == currentyear)
    //stock id of current music
    const index = songOfTheYear[0].id
    //go to the next id song
    const newIndex = index + 1
    let i = allMusics.length -1 
    // If we get out of the array we restart from the begining
    if (newIndex <= allMusics[i].id)
        playSong(newIndex)
    else
        playSong(allMusics[0].id)
}

//-------------------------------------------------------------------

// play previous song
function playPreviousSong() {
    let currentyear = label.value
    songOfTheYear = allMusics.filter(music => music.id == currentyear)
    //stock id of current music
    const index = songOfTheYear[0].id
    let i = allMusics.length - 1
    let newIndex

    if(index == 2006){
        newIndex = i
    }else{
        newIndex = index - 1
    }

    // If we get out of the array we restart from the begining
    if (newIndex >= allMusics[0].id)
        playSong(newIndex)
    else
        playSong(allMusics[allMusics.length - 1].id)
}

//-------------------------------------------------------------------

// On click we send the instruction to the player

audioPlayer.addEventListener('click', () => {
    //using predefinded audio function
    if (audioPlayer.paused){
        audioPlayer.play()
        console.log(audioPlayer)
    }

    else if(!audioPlayer.paused){
        audioPlayer.pause()
    }

})

//-------------------------------------------------------------------
//Event listener
//-------------------------------------------------------------------

// Bouton précédent
playerPrev.addEventListener('click', playPreviousSong)


// Bouton suivant
playerNext.addEventListener('click', playNextSong)


export { playPreviousSong, playSong, playNextSong }