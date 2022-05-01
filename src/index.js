import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
import { getYear, getMax, getNbMet } from './year.js'
import { getGraph, getDonut, getMap } from './section/statistics.js'
import MainLoop from "./lib/Mainloop.mjs";
import * as random from "./lib/Math.mjs";
import Imgs from "./class/Imgs.js";
import './css/index.css';

const label = document.getElementById('year-select')
const svg = document.getElementById('Statistics')
const svgDonut = document.getElementById('StatisticsDonut')
const svgMap = document.getElementById('Map')
//year chosen by user 
let yearChoose = getYear()

//get music infos default year
playSong(yearChoose)
//draw data default year
getGraph(getNbMet(), yearChoose, getMax())
//draw donut
getDonut(getNbMet(), yearChoose)
//draw map
getMap()

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
    getDonut(getNbMet(), yearChoose)

    //draw map
    svgMap.replaceChildren()
    getMap()

    //generate meteorites and sort them
    generateImgs(Images)
    Images.sort((a, b) => a.conpareSize(b));
})

//PARALLAX-------------------------------------------------------------------------------------------------

const ctx = document.querySelector('canvas').getContext('2d');

// define same canvas size as the screen
ctx.canvas.height = 600;
ctx.canvas.width = 1720;

let nbImgs = getMax();

const Images = new Array(nbImgs);
const imgHeight = 310/3;
const imgWidth = 324/3;

// interval of each meteorite drawing
let interval=1000; //length of song divided by de number of meteorite

//generate meteorites and sort them
generateImgs(Images)
Images.sort((a, b) => a.conpareSize(b));

MainLoop.setSimulationTimestep(1000 / 60);
MainLoop.setUpdate(dt => {
    for (const Img of Images) {
        Img.move(dt)
    }
});

MainLoop.setDraw(() => {
    ctx.canvas.height = 300;
    ctx.canvas.width = 1535
    for (const Img of Images) {
       // setInterval(drawImg(Img,ctx),interval) // should draw 1 meteorit every secon :'(
        Img.draw(ctx)
    }
});

MainLoop.setEnd((fps, panic) => {
    if (panic) console.log('panic');
})

MainLoop.start();

//function to draw img within a timstep
function drawImg(Img,ctx) {
    Img.draw(ctx)
}

// function for generating meteorites
function generateImgs(Images) {
    for (let i = 0; i < Images.length; i++) {
        const randDenominateur = random.getRandomInt(1, 3);
        Images[i] = new Imgs({
            x: random.getRandomInt(100, ctx.canvas.width),
            y: random.getRandomInt(-100, ctx.canvas.height),
            width: Math.round(imgWidth / randDenominateur),
            height: Math.round(imgHeight / randDenominateur),
        })
    }
}