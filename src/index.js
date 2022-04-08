import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
import { getYear, getMax, getNbMet } from './year.js'
import getGraph  from './section/statistics.js'

const label = document.getElementById('year-select')
const svg = document.getElementById('Statistics')
//year chosen by user 
let yearChoose = getYear()

//get music infos default year
playSong(yearChoose)
//draw data default year
getGraph(getNbMet(), yearChoose, getMax())

let test 
label.addEventListener('change', function () {
    yearChoose = getYear()
    // get music infos
    playSong(yearChoose)
    svg.replaceChildren()
    //draw data
    getGraph(getNbMet(), yearChoose, getMax())

})

