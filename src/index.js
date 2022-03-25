import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'


//year must be between 2006-2016
const meteorites = []
allMeteorites.forEach(meteorite => {
    if (meteorite.year > 2006 && meteorite.year < 2016) {
        meteorites.push(meteorite)
    }
})
console.log(meteorites)

//year chosen by user 
let yearChoose = 2006
const label = document.getElementById('year-select')
label.addEventListener('change', function () {
    yearChoose = label.value
    //sort by year
    let compteur = 0
    allMeteorites.forEach(meteorite => {
        if (meteorite.year == yearChoose) {
            compteur = compteur + 1
        }
    })
    console.log(compteur)
})