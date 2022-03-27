import * as d3 from 'd3'
import allMusics from '../../data/music.json'
import getYear from '../year.js'

// Song infos
const playerSection = document.querySelector('#player')
const playerSongTitle = playerSection.querySelector('#player-infos-song-title')
const playerArtistName = playerSection.querySelector('#player-infos-artist-name')
let songOfTheYear = []
let year = 2006


function filterSongId(allMusics) {
    year = getYear()
    if (allMusics.id == year) {
        return true
    }
}

export default function getMusic() {
    console.log(year);
    songOfTheYear = allMusics.filter(filterSongId)
    playerSongTitle.innerText = songOfTheYear[0].song
    playerArtistName.innerText = songOfTheYear[0].artist
}

