import * as d3 from 'd3'
import { filter } from 'd3'

export function getGraph(fallenData, yearChosen, maxM, data) {
    //add description of the section
    d3.select('#Statistics')
        .append('p')
        .attr('id', "Titlel")
        .text('Distribution of mass by type')

    //data need to be  sort
    const nbM = data.filter(m => m.year == yearChosen).length
    let data_filter = data.filter(m => m.year == yearChosen)

    //usefull counter
    let cs = 0
    let csi = 0
    let ci = 0
    let compteurStony = 0
    let compteurStonyIron = 0
    let compteurIron = 0

    //count mass by type
    data_filter.forEach(m => {
        switch (m.Type) {
            case 'Stony':
                cs = cs + m.mass
                compteurStony = compteurStony + 1
                break
            case 'StonyIron':
                csi = csi + m.mass
                compteurStonyIron = compteurStonyIron + 1
                break
            case 'Iron':
                ci = ci + m.mass
                compteurIron = compteurIron + 1
                break
        }
    });
    //stock value
    let data_ready = [
        {
            Type: 'Stony', MassT: cs, Nb: compteurStony
        },
        {
            Type: 'Stony Iron', MassT: csi, Nb: compteurStonyIron
        },
        {
            Type: 'Iron', MassT: ci, Nb: compteurIron
        }
    ]
    //get total of mass for a  year
    const MassMaxYear = cs + csi + ci

    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 30, bottom: 40, left: 90 },
        width = 350 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    //add div to section statistic
    d3.select('#Statistics')
        .append('div')
        .attr('id', 'graph-meteorite-numbers')
        .attr("width", width)
        .attr("height", height + margin.top + margin.bottom)

    let obj = totMass()
    function totMass() {
        let total = 0
        let max = 0
        data.forEach(e => {
            total = total + e.mass
            if (e.mass > max) {
                max = e.mass
            }
        });
        let tab = {
            max: max, total: total
        }
        return tab
    }

    //add text of bottom section
    d3.select("#totalNb")
        .append('p').attr("id", "tbNb").text("Total of meteorites | " + nbM)

    const totM = totMass()
    d3.select("#totalMasse")
        .append('p').attr("id", "tbM").text("Total Mass [g] | " + MassMaxYear.toFixed(2))

    //add svg in div
    const svg = d3.select("#graph-meteorite-numbers")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", `translate(${100}, ${margin.top})`)

    //value for right axis x
    let xMax = obj.max
    let x = d3.scalePow()
        .domain([0, xMax])
        .range([0, width + 100])
        .nice()
    //define axis x format
    let x_axis = d3.axisBottom(x).ticks(4)
        .tickFormat(d3.format(".1s"))
    //add X axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(x_axis)

    //define axis y description
    let desType = [
        {
            Type: "Stony"
        },
        {
            Type: "Stony Iron"
        },
        {
            Type: "Iron"
        }
    ]

    //axis y param
    let y = d3.scaleBand()
        .domain(desType.map(function (d) { return d.Type }))
        .range([0, height])
        .padding(.1);

    //add axis y to svg
    svg.append("g")
        .call(d3.axisLeft(y))

    //color scale, not usefull
    let color = d3.scaleLinear()
        .domain([0, 2])
        .range(["red", "white", "green"]);

    //add tooltip
    let Desc = d3.select("body").append("div")
        .attr("class", "tooltip-donut")
        .style("opacity", 0);

    //Bars
    svg.selectAll("myRect")
        .data(data_ready)
        .join(enter => enter
            .append("rect")
            .attr("x", x(0))
            .attr("y", d => y(d.Type))
            .attr("width", d => x(d.MassT))
            .attr("height", y.bandwidth())
            .attr("fill", "purple"),
            update => update
                .attr("fill", "#purple"),
            exit => exit
                .remove()
        ).on("mouseover", function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .style("opacity", 0.5);

            Desc.transition()
                .duration('50')
                .style("opacity", 1);

            let txt = "Total Mass [g]: " + i.MassT.toFixed(0) + "<br>" + "Number of meteorite: " + i.Nb
            console.log(i)
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

export function getDonut(data, yearChosen) {
    //add description of the section
    d3.select('#StatisticsDonut')
        .append('p')
        .attr('id', "Titlel")
        .text('Fell or found')

    //just filter one more time the data..
    const data_filter = data.filter(m => m.year == yearChosen)
    //get fell meteorite
    const data_fall = data_filter.filter(m => m.fall == "Fell")
    //get found meteorites
    const data_found = data_filter.filter(m => m.fall == "Found")
    //stock fell and found meteorites 
    const data_fall_found = {
        fall: data_fall.length,
        found: data_found.length
    }

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

    //add svg in div
    const svg = d3.select("#donut-meteorite-recclass")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    //scale color
    const color = d3.scaleOrdinal()
        .range(["purple", "orange", "darblue"])
    // color maybe used : 69b3a2 D93D04

    //array of data return array of objects contains details about each arc angle
    const pie = d3.pie()
        .value(d => d[1])

    //return an array where elements are the key/value of object in argument
    const data_ready = pie(Object.entries(data_fall_found))

    //add tooltip in body
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
            .innerRadius(60)
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

export function getMap(allMet, yearChosen) {
    //add description of the section in html part
    d3.select('#Map')
        .append('p')
        .attr('id', "Titlel")
        .text('Meteorite location')

    //define margin
    const width = 400
    const height = 300
    //const margin = {top:20, right:20, bottom:30, left:50}

    //add container for svg
    d3.select('#Map')
        .append('div')
        .attr('id', 'MapVis')

    //add svg balise
    const svg = d3.select('#MapVis')
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //-------------------------------------------------Map Rotation---------------------------------------------------

    // const config = {
    //     speed: 0.010,
    //     verticalTilted: -10,
    //     horizontalTilted: 0
    // }

    //define projection
    // const projection = d3.geoOrthographic()
    //     .scale(140)
    //     .clipAngle(90)
    //     .translate([width / 2, height / 1.8])
    //     .rotate([0, 0, 0])



    //GeoJson object convert into svg path string, like shape generator
    // const path = d3.geoPath().projection(projection)

    //-------------------------------------------------------------------------------------------------------------

    //set path
    let path = d3.geoPath()

    //set projection
    let projection = d3.geoMercator()
        //let projection = d3.geoOrthographic()
        //lat and long of the projection
        .center([0, 0])
        //size of the projection
        .scale(70)
        //center
        .translate([width / 2, height / 2])


    // Create data for circles:
    const filterData = allMet.filter(m => m.year == yearChosen)
    let points = []
    let compteur = 0
    let i = 0
    filterData.forEach(m => {
        if (m.GeoLocation === null) {
            compteur = compteur + 1
        } else {
            let location = GetPos(m.GeoLocation)
            points[i] = {
                long: location.long,
                lat: location.lat,
                name: m.name,
                mass: m.mass,
                // type: m.Type
            }
            i = i + 1

        }
    });

    //Draw map, data format Geojson
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (d) {
        svg.append('g')
            .selectAll('path')
            //data are in an object. At the index features, an array of objects with each country
            .data(d.features)
            .join("path")
            .attr("d", path.projection(projection))
            .attr("id", function (d) { return d.properties.name; })
            .attr("fill", "purple")
            .style("opacity", .6)

        // select the tooltip
        const Desc = d3.select(".tooltip-donut")

        // Add circles:
        svg.selectAll("myCircles")
            .data(points)
            .join("circle")
            .attr("cx", d => projection([d.long, d.lat])[0])
            .attr("cy", d => projection([d.long, d.lat])[1])
            .attr("r", 3)
            .attr("class", "circle")
            .style("fill", "purple")
            .attr("stroke", "orange")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
            .on("mouseover", function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .style("opacity", 0.5);

                Desc.transition()
                    .duration('50')
                    .style("opacity", 1);

                let txt = "Location: " + i.name
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
    })

    //function get long and lat
    function GetPos(geoLocation) {

        let end = geoLocation.length - 2

        let onlyNb = geoLocation.substr(1, end)
        let latC = onlyNb.split(",")

        let lat = Number(latC[0])
        let long = Number(latC[1])

        let obj = {
            lat: lat,
            long: long
        }
        return obj
    }


    //--------------------------------------------------------------------------------------------------------
    //Rotate();
    //-------------------------------------------------------------------------------------------------------------
    // Function rotate using timer()
    // function Rotate() {
    //     d3.timer(function (elapsed) {
    //         projection.rotate(
    //             [config.speed * elapsed - 120,
    //             config.verticalTilted,
    //             config.horizontalTilted]);
    //         svg.selectAll("path").attr("d", path)
    //     })
    // }
}



