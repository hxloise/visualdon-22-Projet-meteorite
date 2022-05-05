import allMeteorites from '/data/meteorite-landings.csv'

//--------------------------------------------------------------------------------------------------------
//get some informations
//--------------------------------------------------------------------------------------------------------

//year chosen by user
let yearChosen = 2006
const label = document.getElementById('year-select')

//--------------------------------------------------------------------------------------------------------

export function getYear() {
    yearChosen = label.value
    return yearChosen
}

//--------------------------------------------------------------------------------------------------------

export function getMax() {
    let tab = getNbMet()
    let compteur = 0
    for (let i = 2006; i <= 2012; i++) {
        if (tab[i] > compteur) {
            compteur = tab[i]
        }
    }
    return compteur
}

//--------------------------------------------------------------------------------------------------------

export function getNbMet() {
    //sort by year
    allMeteorites.sort((a, b) => a.year - b.year);
    let meteorites = []
    allMeteorites.forEach(meteorite => {
        if (meteorite.year >= 2006 && meteorite.year <= 2013) {
            meteorites.push(meteorite)
        }
    })

    let compteur2006 = 0
    let compteur2007 = 0
    let compteur2008 = 0
    let compteur2009 = 0
    let compteur2010 = 0
    let compteur2011 = 0
    let compteur2012 = 0

    let meteoriteData = {}
    meteorites.forEach(meteorite => { 
        const year = meteorite.year
        switch (year) {
            case 2006:
                compteur2006 = compteur2006 + 1
                break
            case 2007: 
                compteur2007 = compteur2007 + 1
                break
            case 2008:
                compteur2008 = compteur2008 + 1
                break
            case 2009:
                compteur2009 = compteur2009 + 1
                break
            case 2010:
                compteur2010 = compteur2010 + 1
                break
            case 2011:
                compteur2011 = compteur2011 + 1
                break
            case 2012:
                compteur2012 = compteur2012 + 1
                break
        }

    });

    meteoriteData["2006"] = compteur2006
    meteoriteData["2007"] = compteur2007
    meteoriteData["2008"] = compteur2008
    meteoriteData["2009"] = compteur2009
    meteoriteData["2010"] = compteur2010
    meteoriteData["2011"] = compteur2011
    meteoriteData["2012"] = compteur2012

    return meteoriteData
}

export function getMatiere(){
    //get data between 2006-2013
    let dataFinal = []
    allMeteorites.forEach(m => {
      if(m.year >= 2006 && m.year <= 2013){
          dataFinal.push(m)
      }
  });

//------------------------------------------------------------------------------
//---------------Meteorites classification--------------------------------------
//------------------------------------------------------------------------------.

const typeIron = 'Iron';
const typeStonyIron = 'StonyIron';
const typeStony = 'Stony';

//----------------Iron Meteorites-----------------------------------------------
let ironMeteorites = dataFinal.filter(e=>e.recclass.includes('Iron') || e.recclass.includes('Relict iron'));
ironMeteorites.forEach(e=>e.Type=typeIron);


//----------------Stony meteorites----------------------------------------------
const CLASSES_TO_KEEP = ['A', 'L', 'C', 'E', 'B', 'D', 'F', 'H', 'K', 'O', 'R', 'S', 'U', 'W'];

let stonyMeteorites = dataFinal.filter(e=> CLASSES_TO_KEEP.includes(e.recclass[0]) || e.recclass.includes('Martian') && !e.recclass.includes('Relict iron'));
stonyMeteorites.forEach(e=>e.Type=typeStony);
// console.log("stony",stonyMeteorites);


//-----------------Stony-iron meteorites----------------------------------------
let stonyIronMeteorites = dataFinal.filter(e=>e.recclass.includes('Pallasite') || e.recclass.includes('Mesosiderite'));
stonyIronMeteorites.forEach(e=>e.Type=typeStonyIron);
// console.log("StonyIronMeteorites",stonyIronMeteorites);


//data classified
let dataClassified = [...stonyMeteorites,...stonyIronMeteorites,...ironMeteorites];
//console.log("final",dataClassified);

// const COLOR = Object.freeze({
//     Iron      : '#2171b5',
//     StonyIron : 'brown',
//     Stony     : 'green'
// });

return dataClassified

}