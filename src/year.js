
//year chosen by user
let yearChosen = 2006
const label = document.getElementById('year-select')

export default function getYear() {
    yearChosen = label.value
    return yearChosen
}