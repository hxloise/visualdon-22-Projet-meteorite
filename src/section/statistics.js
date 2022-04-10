import * as d3 from 'd3'

export function getGraph(fallenData, yearChosen, max) {

    const data = fallenData[yearChosen]

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

    //define rect axe
    let rectScale = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0])

    //define rect attributes
    let rectHeight = height - y(data)
    let posRect = height - rectHeight
    //ckeck in console
    console.log("Le nombre de météorite tombée durant l'année sélectionnée est de :", data)

    svg.append("rect")
        .attr("x", 0)
        .attr("y", posRect)
        .attr("width", width)
        .attr("height", rectHeight)
        // .attr("height", 0)
        // .transition()
        // .duration(400)
        .attr("height", rectHeight)
        .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
        .attr("stroke", "black")

    //draw y axe
    svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(10))

    //custom tick line
    svg.selectAll(".tick line").attr("stroke", "black").attr("opacity", "1")
}

//--------------------------------------------------------------------------------------------------------

export function getDonut(data, yearChosen) {

    //set the dimension and margin of the graph
    const width = 250
    const height = 250
    const margin = 40

    //radius of the pieplot
    const radius = Math.min(width, height) / 2 - margin

    // add div to section statistic donut
    d3.select('#StatisticsDonut')
        .append('div')
        .attr('id', 'donut-meteorite-recclass')


    // //add svg in div
    const svg = d3.select("#donut-meteorite-recclass")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    //scale color
    const color = d3.scaleOrdinal()
        .range(["#E80CAD", "#D50CF2", "#8C16DB", "#570CF2", "#180CE8", "#053473", "#0857A6"])

    //array of data return array of objects contains details about each arc angle
    const pie = d3.pie()
        .value(d => d[1])

    //return an array where elements are the key/value of object in argument
    const data_ready = pie(Object.entries(data))

    //draw in svg
    svg.selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        //arc generator function, based on the difference between the start angle and the end angle
        .attr('d', d3.arc()
            .innerRadius(40)
            .outerRadius(radius)
        )
        .attr('fill', d => color(d.data[0]))
        .style("opacity", 0.7)
}

//--------------------------------------------------------------------------------------------------------

export function getMap() {

    const width = 1200
    const height = 850

    d3.select('#Map')
        .append('div')
        .attr('id', 'MapVis')

    const svg = d3.select('#MapVis')
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    
    const config = {
        speed: 0.010,
        verticalTilted: -10,
        horizontalTilted: 0
    }

    //define projection
    const projection = d3.geoOrthographic()
        .scale(200)
        .clipAngle(90)
        .translate([width / 2, height / 3])
        .rotate([0, 0, 0])

    //GeoJson object convert into svg path string, like shape generator
    const path = d3.geoPath().projection(projection)

    Rotate();

    // Loading data from json
    d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json").then(function (data) {
        // Draw the map 
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "blue")
            .attr("d", path)
            .style("stroke", "#ffff")
    })

    // Function rotate using timer()
    function Rotate() {
        d3.timer(function (elapsed) {
            projection.rotate(
                [config.speed * elapsed - 120,
                config.verticalTilted,
                config.horizontalTilted]);
            svg.selectAll("path").attr("d", path)
        })
    }
}



