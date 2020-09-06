import React, { useEffect, useRef, useState, Component } from 'react'
import { select, line, area, axisBottom, axisLeft, axisRight, scaleLinear, scaleUtc, extent, max, min, selectAll, timer } from 'd3';
// import * as d3 from 'd3'
import * as d3  from 'd3-fetch'


class Svg extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataX: [],
            dataY: [],
            infos: {},
            period: "5Y",
            symbol: "amzn",
            Token :"pk_99d153747d5a4c939661c8f2fb359437",
            baseUrl : "https://cloud.iexapis.com/stable",
            sandbaseUrl : "https://sandbox.iexapis.com/stable",
            sandToken : "Tsk_f449b3b9b1e04ea3b0e1e41c195a4359",
        }
        this.svgRef = React.createRef();
    }
    drawChart(symbol, period){
        const loadHistorycalPrices =  d3.json(`${this.state.sandbaseUrl}/stock/${symbol}/chart/${period}?token=${this.state.sandToken}`)
        loadHistorycalPrices.then(val => {
            console.log("val", val)
            const date = val.map(el => el.date);
            const valeur = val.map(el => el.close);
            this.setState({dataX: [...date]});
            this.setState({dataY:[...valeur]});
            const liste = []
            liste.push(date.map((val, index)=> ({date: new Date(val), value: valeur[index]})))
            const data = liste[0]
            console.log(typeof(data[0]))
            const height = 300;
            const width = 764;
            selectAll("svg > *").remove(); // select all element below the svg then remove them
            const svg = select(this.svgRef.current)
                .attr("viewBox", [0, 0, width, height]);
            const margin = ({top: 20, right:30, bottom: 30, left: 40});

            const yTitle = "$ Close";
            const x = scaleUtc().domain(extent(data, (d) => d.date)).range([margin.left, width - margin.right]);
            const y = scaleLinear().domain([min(data, (d) => d.value), max(data, (d) => d.value)]).nice().range([height - margin.bottom, margin.top]);      
            
            // define the line
            const Line = line()
                .defined(d => !isNaN(d.value))
                .x(d => x(d.date))
                .y(d => y(d.value))

            
            // define area   css .area{ fill: lightsteelblue };
            // const Area = area()
            //     .x(d => x(d.date))
            //     .y0(height)
            //     .y(d => y(d.date))

                const xAxis = g => g
                        .attr("transform", `translate(0,${height - margin.bottom})`)
                        .call(axisBottom(x).ticks(width/80).tickSizeOuter(0));
            const yAxis = g => g
                        .attr("transform", "translate(735,0)")
                        .call(axisRight(y))
                        .call(g => g.select(".domain").remove())
                        .call(g => g.select(".tick:last-of-type text").clone()
                            .attr("x", 3)
                            .attr("text-anchor", "start")
                            .attr("font-weight", "bold"));
            svg.append("g")
                .call(xAxis)
                .style("font-size", "10px");

            svg.append("g")
                .call(yAxis)
                .style("font-size", "10px")

            // add the area
            // svg.append("path")
            //     .datum(data)
            //     .attr("class", "area")
            //     .attr("d", Area)

            // add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("d", Line )
        } )
    }
    componentDidMount(){
        console.log(this.state.sandToken)
        console.log(this.props)
        this.drawChart(this.props.symbol.toLowerCase(), this.props.period);
        
    }
    componentDidUpdate(prevProps, pervState){
        if(prevProps.period != this.props.period) {
            console.log("willll")
            this.drawChart(this.props.symbol.toLowerCase(), this.props.period)
        }
    }
    
    render(){
        return (
            <div className="chart-container">
                <svg ref={this.svgRef}></svg>
            </div>
        )
    }
}


export default Svg;