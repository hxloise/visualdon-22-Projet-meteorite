import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import { playSong, playNextSong, playPreviousSong } from './section/player.js'
import { getYear, getMax, getNbMet, getMatiere } from './year.js'
import { getGraph, getDonut, getMap } from './section/statistics.js'
import MainLoop from "./lib/Mainloop.mjs";
import * as random from "./lib/Math.mjs";
import Imgs from "./class/Imgs.js";
import './css/index.css';

const label = document.getElementById('year-select')
const svg = document.getElementById('Statistics')
const svgDonut = document.getElementById('StatisticsDonut')
const svgMap = document.getElementById('Map')
const playerPlay = document.querySelector('#audio-player')
const playerPrev = document.querySelector('#player-control-previous')
const playerNext = document.querySelector('#player-control-next')

//year chosen by user 
let yearChoose = getYear()

//get music infos default year
playerPlay.addEventListener('click', () => {
    playSong(yearChoose)
})

//draw data default year
getGraph(getNbMet(), yearChoose, getMax(), getMatiere())
//draw donut
getDonut(getMatiere(), yearChoose)
//draw map
getMap(allMeteorites,yearChoose)

// get the material type of the meteorites
const dataClassified = getMatiere()
let MaterialByYear = dataClassified.filter(type => type.year == yearChoose)


label.addEventListener('change', function () {

    yearChoose = getYear()

    // play previous song
    playSong(yearChoose)
    document.querySelector("#totalMasse").replaceChildren()
    document.querySelector("#totalNb").replaceChildren()
    svg.replaceChildren()
    //draw data 
    getGraph(getNbMet(), yearChoose, getMax(), getMatiere())

    //draw donut
    svgDonut.replaceChildren()
    getDonut(getMatiere(), yearChoose)

    //draw map
    svgMap.replaceChildren()
    getMap(allMeteorites,yearChoose)

    // clear interval and canevas on change
    clearInterval(imageSpawner)
    ctx.canvas.height = ctx.canvas.clientHeight
    ctx.canvas.width = ctx.canvas.clientWidth

    // clear Imgs tab and reset counter interval and nbImgs
    cmpt = 0;
    nbImgsEachYear = getNbMet(true)
    nbImgs = nbImgsEachYear[yearChoose]
    Images = []
    interval = (playerPlay.duration * 1000) / nbImgs; 
    console.log(nbImgs);
    //generate meteorites and sort them
    imageSpawner = setInterval(() => generateImg(), interval) // Draws 1 meteorit every x second 
    Images.forEach(img => img.setSrc(img.type))

})

playerPrev.addEventListener('click', function () {
    yearChoose = getYear()

    svg.replaceChildren()
    document.querySelector("#totalMasse").replaceChildren()
    document.querySelector("#totalNb").replaceChildren()
    //draw data 
    getGraph(getNbMet(), yearChoose, getMax(), getMatiere())

    //draw donut
    svgDonut.replaceChildren()
    getDonut(getMatiere(), yearChoose)

    //draw map
    svgMap.replaceChildren()
    getMap(allMeteorites,yearChoose)

    // clear interval and canevas on change
    clearInterval(imageSpawner)
    ctx.canvas.height = ctx.canvas.clientHeight
    ctx.canvas.width = ctx.canvas.clientWidth

    // clear Imgs tab and reset counter interval and nbImgs
    cmpt = 0;
    nbImgsEachYear = getNbMet(true)
    nbImgs = nbImgsEachYear[yearChoose]
    Images = []
    interval = (playerPlay.duration * 1000) / nbImgs;   // NE MARCHE PAS :/

    //generate meteorites and sort them
    imageSpawner = setInterval(() => generateImg(), interval) // Draws 1 meteorit every x second
    Images.forEach(img => img.setSrc(img.type))
})

playerNext.addEventListener('click', function () {
    yearChoose = getYear()

    document.querySelector("#totalNb").replaceChildren()
    document.querySelector("#totalMasse").replaceChildren()
    svg.replaceChildren()
    //draw data 
    getGraph(getNbMet(), yearChoose, getMax(), getMatiere())

    //draw donut
    svgDonut.replaceChildren()
    getDonut(getMatiere(), yearChoose)

    //draw map
    svgMap.replaceChildren()
    getMap(allMeteorites,yearChoose)

    // clear interval and canevas on change
    clearInterval(imageSpawner)
    ctx.canvas.height = ctx.canvas.clientHeight
    ctx.canvas.width = ctx.canvas.clientWidth

    // clear Imgs tab and reset counter interval and nbImgs
    cmpt = 0;
    nbImgsEachYear = getNbMet(true)
    nbImgs = nbImgsEachYear[yearChoose]
    Images = []
    interval = (playerPlay.duration * 1000) / nbImgs;   // NE MARCHE PAS :/

    //generate meteorites and sort them
    imageSpawner = setInterval(() => generateImg(), interval) // Draws 1 meteorit every x second
    Images.forEach(img => img.setSrc(img.type))
})

//PARALLAX-------------------------------------------------------------------------------------------------

const ctx = document.querySelector('canvas').getContext('2d');

// define same canvas size as the screen
ctx.canvas.height = ctx.canvas.clientHeight
ctx.canvas.width = ctx.canvas.clientWidth

let nbImgsEachYear = getNbMet(true)
let nbImgs = nbImgsEachYear[yearChoose]
let Images = []
const imgHeight = 310 / 3
const imgWidth = 324 / 3

// interval of each meteorite drawing
let interval = (playerPlay.duration* 1000) / nbImgs; //length of song divided by de number of meteorite

//generate meteorites and sort them
let imageSpawner = setInterval(() => generateImg(), interval) // Draws 1 meteorit every x second 
Images.forEach(img => img.setSrc(img.type))

MainLoop.setSimulationTimestep(1000 / 60);
MainLoop.setUpdate(dt => {
    for (let Img of Images) {
        Img.move(dt)
    }
})

MainLoop.setDraw(() => {
    ctx.canvas.height = ctx.canvas.clientHeight
    ctx.canvas.width = ctx.canvas.clientWidth
    for (let Img of Images) {
        Img.draw(ctx)
    }
})

MainLoop.setEnd((fps, panic) => {
    if (panic) console.log('panic');
})

MainLoop.start()


let cmpt = 0;
function generateImg() {
    if (cmpt >= nbImgs) {
        clearInterval(imageSpawner);
        return;
    }
    const randDenominateur = random.getRandomInt(1, 3);
    Images[cmpt] = new Imgs({
        x: random.getRandomInt(100, ctx.canvas.width+350),
        y: random.getRandomInt(-100,-200),
        type: MaterialByYear[cmpt].Type, //assign a type to the meteorite
        width: Math.round(imgWidth / randDenominateur),
        height: Math.round(imgHeight / randDenominateur),
  
    })
    Images[cmpt].setSrc(Images[cmpt].type)
    cmpt++;
}