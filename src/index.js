import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
import { getYear, getMax, getNbMet } from './year.js'
import { getGraph, getDonut, getMap } from './section/statistics.js'
import MainLoop from "./lib/Mainloop.mjs";
import * as random from "./lib/Math.mjs";
import Sprite from "./class/Sprite.js";
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

})

//PARALLAX-------------------------------------------------------------------------------------------------

const ctx = document.querySelector('canvas').getContext('2d');

// Définir la taille de la toile identique à la taille de l'écran
ctx.canvas.height = 600;
ctx.canvas.width = 1720;

const nbSprites = 100;

const sprites = new Array(nbSprites);
const imgHeight = 50;
const imgWidth = 60;

//generate meteorites and sort them
generateSprites(sprites)
//sprites.sort((a, b) => a.conpareSize(b));
console.log(sprites);

MainLoop.setSimulationTimestep(1000 / 60);
MainLoop.setUpdate(dt => {
    for (const sprite of sprites) {
        sprite.move(dt)
    }
});

MainLoop.setDraw(() => {
    ctx.canvas.height = 300;
    // ctx.canvas.width = 500;
    ctx.canvas.width = 1535
    sprites.forEach(sprite => sprite.draw(ctx));
     //  ctx.globalCompositeOperation = "source-in";
    //  draw color
    //  ctx.fillStyle = 'black';
     // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //  reset composite mode
    //  ctx.globalCompositeOperation = "source-over";
});

MainLoop.setEnd((fps, panic) => {
    if (panic) console.log('panic');
})

MainLoop.start();

// function for generating meteorites
function generateSprites(sprites) {
    for (let i = 0; i < sprites.length; i++) {
        const randDenominateur = random.getRandomInt(1, 3);
        sprites[i] = new Sprite({
            x: random.getRandomInt(0, ctx.canvas.width),
            y: random.getRandomInt(0, ctx.canvas.height),
            width: Math.round(imgWidth / randDenominateur),
            height: Math.round(imgHeight / randDenominateur),
            velX: (Math.random() - 0.5) / 5, //vecteurs qui servent pour la direction 
            velY: (Math.random() - 0.5) / 5
        })
    }
}