import allMeteorites from '/data/meteorite-landings.csv'

//--------------------------------------------------------------------------------------------------------
//get some informations
//--------------------------------------------------------------------------------------------------------

//year chosen by user
let yearChosen = 2006
const label = document.getElementById('year-select')

//get year chosen
export function getYear() {
    yearChosen = label.value
    return yearChosen
}

//get max fallen meteorites
export function getMax() {
    let compteur = 0
    for (let i = 2006; i <= 2016; i++) {
        if(getNbMet(i) > compteur){
            compteur = getNbMet(i)
        }
    }
    return compteur
}

//get nb fallen meteorites
export function getNbMet(yearChoosen) {
    //year must be between 2006-2016
    let meteorites = []
    allMeteorites.forEach(meteorite => {
        if (meteorite.year >= 2006 && meteorite.year <= 2013) {
            meteorites.push(meteorite)
        }
    })

    //count number of meteorite
    let compteur = 0
    allMeteorites.forEach(meteorite => {
        if (meteorite.year == yearChoosen) {
            compteur = compteur + 1
        }
    })

    return compteur
}