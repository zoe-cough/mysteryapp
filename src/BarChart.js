/*
Child 1
Bar chart
Count of items across categories
Height = # items in category
Each bar needs label
Not dynamic; ezpz
*/

import React, { Component } from "react";
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.svgRef = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        //console.log(this.props.data);
    }
    componentDidUpdate() {
        var data = this.props.data
        var margin = { top: 10, right: 10, bottom: 30, left: 20 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;

        //console.log(data)
        var temp_data = d3.flatRollup(
            data,
            v => v.length,
            d => d.category
        );
        console.log(temp_data);
        const svg = d3.select(this.svgRef.current);
        var container = d3
            .select(".child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".g_2")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // X axis
        var x_data = temp_data.map((item) => item[0]);
        var x_scale = d3
            .scaleBand()
            .domain(x_data)
            .range([margin.left, w])
            .padding(0.2);

        container
            .selectAll(".x_axis_g")
            .data([0])
            .join("g")
            .attr("class", "x_axis_g")
            .attr("transform", `translate(0, ${h})`)
            .call(d3.axisBottom(x_scale));
        // Add Y axis
        var y_data = temp_data.map((item) => item[1]);
        var y_scale = d3
            .scaleLinear()
            .domain([0, d3.max(y_data)])
            .range([h, 0]);

        container
            .selectAll(".y_axis_g")
            .data([0])
            .join("g")
            .attr("class", "y_axis_g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y_scale));

        container
            .selectAll("rect")
            .data(temp_data)
            .enter()
            .append("rect")
            .attr("x", function (d) {
                return x_scale(d[0]);
            })
            .attr("y", function (d) {
                return y_scale(d[1]);
            })
            .attr("width", x_scale.bandwidth())
            .attr("height", function (d) {
                return h - y_scale(d[1]);
            })
            .attr("fill", "#69b3a2")
            .each(function ([, value]) {
                svg.append('text')  //text inside the bars
                    .attr('x', parseFloat(d3.select(this).attr('x')) + parseInt(d3.select(this).attr('width')) / 1.5)
                    .attr('y', parseFloat(d3.select(this).attr('y')) + 30)
                    .attr('text-anchor', 'middle')
                    .text(value)
                    .attr('fill', 'black');
            });
    }
    render() {
        return (
            <svg ref = {this.svgRef} className="child2_svg">
                <g className="g_2"></g>
            </svg>
        );
    }
}

export default BarChart;