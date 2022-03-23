import * as d3 from 'd3'
import allMeteorites from '/data/meteorite-landings.csv'



//year must be between 2006-2016
const meteorites = []
allMeteorites.forEach(meteorite => {
    if(meteorite.year > 2006 && meteorite.year < 2016){
        meteorites.push(meteorite)
    }
})
console.log(meteorites)

//sort by year
// for (let i = 2006; i <= 2016; i++) {
//     meteorites.forEach(meteorite => {
//         if(meteorite.year == 2006){
//             compteur = compteur + 1
//         }
//     });
//     console.log("test")
    
// }
// console.log(compteur)