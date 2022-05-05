import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
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
const playerPlay = document.querySelector('#player-control-play')
//year chosen by user 
let yearChoose = getYear()

//get music infos default year

playerPlay.addEventListener('click', () => {
    playSong(yearChoose)
})
//draw data default year
getGraph(getNbMet(), yearChoose, getMax())
//draw donut
getDonut(getMatiere(), yearChoose)
//draw map
getMap(allMeteorites)

const dataClassified = getMatiere()

// console.log(allMeteorites)
let test
label.addEventListener('change', function () {
    yearChoose = getYear()
    // get music infos
    playSong(yearChoose)
    svg.replaceChildren()
    //draw data 
    getGraph(getNbMet(), yearChoose, getMax())

    //draw donut
    svgDonut.replaceChildren()
    getDonut(getMatiere(), yearChoose)

    //draw map
    svgMap.replaceChildren()
    getMap(allMeteorites)

    // clear interval and canevas on change
    clearInterval(imageSpawner);

    ctx.canvas.height = 300
    ctx.canvas.width = 1535
    //generate meteorites and sort them
    setInterval(() => generateImg(), interval); // Draws 1 meteorit every x second 
    //Images.sort((a, b) => a.conpareSize(b));
})

//PARALLAX-------------------------------------------------------------------------------------------------

const ctx = document.querySelector('canvas').getContext('2d');

// define same canvas size as the screen
ctx.canvas.height = 600;
ctx.canvas.width = 1720;

let nbImgs = getMax();

const Images = [];
const imgHeight = 310 / 3;
const imgWidth = 324 / 3;

// interval of each meteorite drawing
let interval = 60000 / nbImgs; //length of song divided by de number of meteorite

//generate meteorites and sort them
const imageSpawner = setInterval(() => generateImg(), interval); // Draws 1 meteorit every x second 

//Images.sort((a, b) => a.conpareSize(b));

MainLoop.setSimulationTimestep(1000 / 60);
MainLoop.setUpdate(dt => {
    for (const Img of Images) {
        Img.move(dt)
    }
});

MainLoop.setDraw(() => {
    ctx.canvas.height = 380
    ctx.canvas.width = 1380
    for (const Img of Images) {
        Img.draw(ctx)
    }
});

MainLoop.setEnd((fps, panic) => {
    if (panic) console.log('panic');
})

MainLoop.start();


let cmpt = 0;
function generateImg() {
    if (cmpt >= nbImgs) {
        clearInterval(imageSpawner);
        return;
    }
    const randDenominateur = random.getRandomInt(1, 3);
    Images[cmpt] = new Imgs({
        x: random.getRandomInt(500, ctx.canvas.width),
        y: -100,
        width: Math.round(imgWidth / randDenominateur),
        height: Math.round(imgHeight / randDenominateur),
    })
    cmpt++;
}