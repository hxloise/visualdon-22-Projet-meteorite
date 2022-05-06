import * as d3 from 'd3'

export function getGraph(fallenData, yearChosen, max) {

    const data = fallenData[yearChosen]

    //draw with data
    const width = 100
    const height = max / 10
    const margin = { top: 50, bottom: 50, left: 0, right: 0 }

    //----------------------------------------------------------------------------
    //add div to section statistic
    d3.select('#Statistics')
        .append('div')
        .attr('id', 'graph-meteorite-numbers')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    //add text
    const div = d3.select("#graph-meteorite-numbers")
        .append('p').text("Météorites tombées")

    // div.append('button').attr("class", "info").text("En savoir plus ")

    div.append("p")
        .append("text")
        .attr('id', "nb")
        .text(data)

    //----------------------------------------------------------------------------

    //add svg in div
    const svg = d3.select("#graph-meteorite-numbers")
        .append("svg")
        // .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width)
        // .attr("height", height/4)
        .attr("transform", "rotate(0,24,0)")
        .append("g")

    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width)
        .style("fill", "white") //by default it's in black
        .attr("stroke", "white")

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

    svg.append("rect")
        .attr("x", 0)
        .attr("y", posRect)
        .attr("width", width)
        .attr("height", rectHeight)
        .attr("height", 0)
        .transition()
        .duration(400)
        .attr("height", rectHeight)
        .attr("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
        .attr("stroke", "white")

    //draw y axe
    svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(5))

    //custom tick line
    svg.selectAll(".tick line").attr("stroke", "white").attr("opacity", "1")
}

//--------------------------------------------------------------------------------------------------------

export function getDonut(data, yearChosen) {

    //set the dimension and margin of the graph
    const width = 250
    const height = 250
    const margin = 40

    //count nb of meteorit in category
    let compteurStony = 0
    let compteurStonyIron = 0
    let compteurIron = 0

    data.forEach(d => {
        if (d.year == yearChosen) {
            switch (d.Type) {
                case "Stony":
                    compteurStony = compteurStony + 1
                    break
                case "StonyIron":
                    compteurStonyIron = compteurStonyIron + 1
                    break
                case "Iron":
                    compteurIron = compteurIron + 1
                    break
            }
        }

    });

    let Obj = {
        stony: compteurStony,
        stonyIron: compteurStonyIron,
        iron: compteurIron
    }

    //radius of the pieplot
    const radius = Math.min(width, height) / 2 - margin

    // add div to section statistic donut
    d3.select('#StatisticsDonut')
        .append('div')
        .attr('id', 'donut-meteorite-recclass')

    //add text
    // const div = d3.select("#StatisticsDonut")
    //     .append('p').text("Matières")
    // div.append('p').text("1 : Stony").append('p').text('2 : StonyIron').append('p').text('3 : Iron')

    // //add svg in div
    const svg = d3.select("#donut-meteorite-recclass")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    //scale color
    const color = d3.scaleOrdinal()
        .range(["#ffd97d", "#D93D04", "#072040"])

    //array of data return array of objects contains details about each arc angle
    const pie = d3.pie()
        .value(d => d[1])

    //return an array where elements are the key/value of object in argument
    const data_ready = pie(Object.entries(Obj))

    let Desc = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

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
        .style("opacity", 1)
        .on("mouseover", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .style("opacity", 0.5);

            Desc.transition()
                .duration('50')
                .style("opacity", 1);

            // let txt = i.data[0]
            let txt = i.value
            Desc.html(txt)
                .style("left", (d.clientX + 10) + "px")
                .style("top", (d.clientY - 15) + "px");

        })
        .on("mouseleave", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .style("opacity", 1);

            Desc.transition()
                .duration('50')
                .style("opacity", 0)
        })

}
//--------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------

export function getMap(allMet) {
    const width = 400
    const height = 300
    //const margin = {top:20, right:20, bottom:30, left:50}

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

    //-------------------------------------------------------------------------------------------------------------

    //define projection
    const projection = d3.geoOrthographic()
        .scale(140)
        .clipAngle(90)
        .translate([width / 2, height / 1.8])
        .rotate([0, 0, 0])

    //GeoJson object convert into svg path string, like shape generator
    const path = d3.geoPath().projection(projection)

    let data = new Map()
    //échelle des couleurs
    let thresholdScale = d3.scaleThreshold()
        .domain([50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])
        .range(d3.schemeOranges[8])
    Rotate();

    // Loading data from json
    d3.json("https://raw.githubusercontent.com/epistler999/GeoLocation/master/world.json").then(function (data) {
        // Draw the map 
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("d", patg.projection(projection))
            .attr("id", function(d) {return d.properties.name})
            .attr("fill", function (d) {
                let number = 0;
                allMet.forEach(e => {
                    if(typeof i[this.id] != "undefined"){
                        number = e[this.id]
                    }
                });
                //scale color 
                return thresholdScale(number)
                
            })
            .attr("d", path)
            .style("stroke", "#CEB3F2")

            
    })

    //-------------------------------------------------------------------------------------------------------------

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



