import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'
import playSong from './section/player.js'
import { getYear, getMax, getNbMet } from './year.js'
import { getGraph, getDonut, getMap }  from './section/statistics.js'
import Tweens from "./class/Tweens.js";
import MainLoop from "./lib/Mainloop.mjs";
import * as random from "./lib/Math.mjs"; 
import Sprite from "./class/Sprite.js";
import { domOn } from "./lib/dom.js";

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
ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;

const nbSprites = Math.round(ctx.canvas.width/3);

const sprites = new Array(nbSprites);
const imgHeight = 5;
const imgWidth = 5;

let mouse = { x:-100 , y:-100, height: 200, width: 200}; 


for (let i = 0; i < sprites.length; i++) {

    const randDenominateur = random.getRandomInt(1, 3);

    sprites[i] = new Sprite({
        x : random.getRandomInt(0, ctx.canvas.width),
        y : random.getRandomInt(0, ctx.canvas.height),
        width : Math.round(imgWidth / randDenominateur),
        height : Math.round(imgHeight / randDenominateur),
        color : `hsl(0, 100%, 50%)`,
        velX: (Math.random() - 0.5) / 5, //vecteurs qui servent pour la direction 
        velY: (Math.random() - 0.5) / 5
    })
    
}
console.log(sprites);
const tweens = new Tweens();

tweens.create({
    to : 360,
    duration : 50000,
    loop : true,
    animate : hue => {
        sprites.forEach(sprite => {
            sprite.setColor(`hsl(${hue}, 100%, 50%)`);
        })
    }
})

MainLoop.setSimulationTimestep(1000/60);
MainLoop.setUpdate(dt => {

    for (const sprite of sprites) {
        sprite.move(dt)
        sprite.bounceOffTheWalls(ctx);

        if(sprite.isInHitbox(mouse.x, mouse.y, mouse.height, mouse.width)){
            let angle = Math.atan2(sprite.x - mouse.x, sprite.y - mouse.y);
            sprite.changeVelocite(angle); 
        }
    }
    tweens.update(dt); 
});

MainLoop.setDraw(() => {
    ctx.canvas.height = ctx.canvas.clientHeight;
    ctx.canvas.width = ctx.canvas.clientWidth;

    sprites.forEach(sprite => sprite.draw(ctx));
    ctx.globalCompositeOperation = "source-in";
    // draw color
    ctx.fillStyle = sprites[0].color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // reset composite mode
    ctx.globalCompositeOperation = "source-over";
});

MainLoop.setEnd((fps, panic) => {
    if(panic) console.log('panic');
})

MainLoop.start();

domOn('canvas', 'mousemove', evt => {
    let rect = ctx.canvas.getBoundingClientRect();
    
    mouse.x = evt.clientX - rect.left; 
    mouse.y = evt.clientY - rect.top;

})