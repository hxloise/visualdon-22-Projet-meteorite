import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
import getYear from './year.js'


//year must be between 2006-2016
const meteorites = []
allMeteorites.forEach(meteorite => {
    if (meteorite.year >= 2006 && meteorite.year <= 2013) {
        meteorites.push(meteorite)
    }
})


//test affichage 
d3.select("body")
    .append("div")
    .attr('id', 'div-number-meteorite')



//graph number of meteorite
d3.select("body #Statistics")
    .append("div")
    .attr('id', 'graph-meteorite-numbers')





//year chosen by user // est-ce qqu'on creer pas une classe pour l'année? j'ai de la peine à la récup pour le player
let yearChoose = 2006
const label = document.getElementById('year-select')

label.addEventListener('change', function () {
    yearChoose = getYear()
    //count number of meteorite
    let compteur = 0
    allMeteorites.forEach(meteorite => {
        if (meteorite.year == yearChoose) {
            compteur = compteur + 1
        }

    })

    // get music infos
    playSong()

    //draw with data
    const width = 1000
    const height = 450
    const margin = { top: 50, bottom: 50, left: 50, right: 0 }


    let svg = d3.select("#graph-meteorite-numbers")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //define scale for axe x
    let x = d3.scaleBand()
        .domain(yearChoose)
        .range([0, 1])

    //define scale for axe y
    let y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0])

    //just test something 
    console.log(compteur)
    d3.select('#div-number-meteorite')
        .append('p')
        .text(`En ${yearChoose}, il y a eu  ${compteur} météorites qui sont tombées`)
})

