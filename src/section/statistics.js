import * as d3 from 'd3'

export default function getGraph(data, max) {

    //draw with data
    const width = 100
    const height = max / 10
    const margin = { top: 50, bottom: 50, left: 30, right: 0 }

    //add div to section statistic
    d3.select('#Statistics')
        .append('div')
        .attr('id', 'graph-meteorite-numbers')

    //add svg in div
    const svg = d3.select("#graph-meteorite-numbers")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("fill", "white") //by default it's in black
        .attr("stroke", "black")


    //define scale y axe
    let y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0])
        .nice()
    console.log(max)

    //define rect axe
    let rectScale = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0])
    
    //define rect attributes
    let rectHeight = height - y(data)
    let posRect = height - rectHeight
    //ckeck in console
    console.log("Le nombre de météorite tombée durant l'année sélectionnée est de :",data)

    svg.append("rect")
        .attr("x", 0)
        .attr("y", posRect)
        .attr("width", width)
        .attr("height", rectHeight )
        .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
        .attr("stroke", "black")

    //draw y axe
    svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(10))

    //custom tick line
    svg.selectAll(".tick line").attr("stroke", "black").attr("opacity", "1")


}




