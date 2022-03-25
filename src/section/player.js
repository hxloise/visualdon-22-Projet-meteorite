import * as d3 from 'd3'
import allMusics from '../../data/music.json'


// Song infos
const playerSection = document.querySelector('#player')
const playerSongTitle = playerSection.querySelector('#player-infos-song-title')
const playerArtistName = playerSection.querySelector('#player-infos-artist-name')
const year = 2008


function filterSongId(allMusics) {
    if (allMusics.id == year) {
        return true
    }
}

export default function getMusic() {
    const songOfTheYear = allMusics.filter(filterSongId)
    playerSongTitle.innerText = songOfTheYear[0].song
    playerArtistName.innerText = songOfTheYear[0].artist
}

