showScatter(d3.select("#scatter"));
initialize();

function showBarGraphs(id) {
    const data_url = "data/ac_space_3.csv";

    const svg = d3.select(divID).select("svg");

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    // set the dimensions and margins of the graph
    const margin = {
        top: 50,
        right: 30,
        bottom: 30,
        left: 60
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const title = svg.append("g").append("text")
        .attr("class", "figure-title")
        .attr("transform", `translate(${innerWidth/2+margin.left}, ${margin.top/2})`)
        .text("Standard ACVS P. Optimal (%) over Blocks");


    const render = function(data) {

        /* Create bars using summary data */

        const mean_a_opt_b_1 = d3.mean(data, d => d.a_opt_b_1);
        const mean_a_opt_b_2 = d3.mean(data, d => d.a_opt_b_2);
        const mean_a_opt_b_3 = d3.mean(data, d => d.a_opt_b_3);
        const mean_s_opt_b_1 = d3.mean(data, d => d.s_opt_b_1);
        const mean_s_opt_b_2 = d3.mean(data, d => d.s_opt_b_2);
        const mean_s_opt_b_3 = d3.mean(data, d => d.s_opt_b_3);
        const se_a_opt_b_1 = d3.deviation(data, d => d.a_opt_b_1) / data.length;
        const se_a_opt_b_2 = d3.deviation(data, d => d.a_opt_b_2) / data.length;
        const se_a_opt_b_3 = d3.deviation(data, d => d.a_opt_b_3) / data.length;
        const se_s_opt_b_1 = d3.deviation(data, d => d.s_opt_b_1) / data.length;
        const se_s_opt_b_2 = d3.deviation(data, d => d.s_opt_b_2) / data.length;
        const se_s_opt_b_3 = d3.deviation(data, d => d.s_opt_b_3) / data.length;
        const summary = [{
                "label": "Block 1",
                "mean": mean_a_opt_b_1
            },
            {
                "label": "Block 2",
                "mean": mean_a_opt_b_2
            },
            {
                "label": "Block 3",
                "mean": mean_a_opt_b_3
            }
        ];

        // create a band scale for blocks
        const xScale = d3.scaleBand()
            .domain(["Block 1", "Block 2", "Block 3"])
            .range([0, innerWidth])
            .paddingInner(.2)
            .paddingOuter(.2);

        // create a linear scale for p optimal
        const ymin = 0;
        const ymax = 100;
        const yScale = d3.scaleLinear()
            .domain([ymin, ymax])
            .range([innerHeight, 0]);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        // The y and height attributes in here is really really confusing.
        g.selectAll("rect").data(summary).enter().append("rect")
            .attr("x", function(d) {
                return xScale(d.label)
            })
            .attr("y", function(d) {
                return innerHeight - yScale(ymax - d.mean)
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return yScale(ymax - d.mean)
            });

        g.append("g").call(d3.axisLeft(yScale))
            .attr("class", "axis");

        const xAxisG = g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .attr("class", "axis")
            .call(d3.axisBottom(xScale));
        xAxisG.selectAll(".tick line").remove();


        /* Add error bars */


        /* Show detailed data points */
        g.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("cx", xScale("Block 1") + 0.5 * xScale.bandwidth())
            .attr("cy", function(d) {
                return yScale(d.a_opt_b_1)
            })
            .attr("r", 3)
            .style("fill", "lightgrey");

        g.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("cx", xScale("Block 2") + 0.5 * xScale.bandwidth())
            .attr("cy", function(d) {
                return yScale(d.a_opt_b_2)
            })
            .attr("r", 3)
            .style("fill", "lightgrey");

        g.append("g").selectAll("circle").data(data)
            .enter().append("circle")
            .attr("cx", xScale("Block 3") + 0.5 * xScale.bandwidth())
            .attr("cy", function(d) {
                return yScale(d.a_opt_b_3)
            })
            .attr("r", 3)
            .style("fill", "lightgrey");
    }

    d3.csv(data_url).then(function(data) {
        render(data);
    })


}

function showScatter(parent) {
    const data_url = "data/ac_space_3.csv";

    const svg = parent.append("svg")
        .attr("width", 560)
        .attr("height", 500);

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const margin = {
        top: 50,
        right: 30,
        bottom: 50,
        left: 100
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const figureG = svg.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv(data_url).then(data => render(data));

    const render = function(data) {
        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, innerWidth]);

        // append x axis
        figureG.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .attr("class", "axis")
            .call(d3.axisBottom(x));

        // append x axis label
        // necessary downward shift to adjust the label
        const x_label_shift_down = 45;
        figureG.append("text")
            .attr("class", "axis-label")
            .attr("transform", `translate(${innerWidth/2}, ${innerHeight + x_label_shift_down})`)
            .text("Standard ACVS P. Optimal (%)");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);
        figureG.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));

        // Add Y axis label
        const y_label_shift = -45;
        figureG.append("text")
            .attr("class", "axis-label")
            .attr("transform", `translate(${y_label_shift}, ${innerHeight/2}) rotate(-90)`)
            .text("Spatial ACVS P. Optimal (%)");

        // Color scale: give me a specie name, I return a color
        // var color = d3.scaleOrdinal()
        //   .domain(["1", "2", "3" ])
        //   .range([ "Magenta", "Cyan", "SlateGray"]);
        const color = ["Magenta", "Cyan", "SlateGray"];

        // Highlight the specie that is hovered
        const highlight = function(d) {

            selected_cluster = "cluster" + d.idx;
            selected_sub = d.sub;

            d3.selectAll(".sub" + selected_sub)
                .transition()
                .duration(200)
                .style("fill", "black")
                .attr("r", "7");

            // main_update(selected_sub);
            // showTrialOpt("#t-opt-line", selected_sub);
            // showTrialSr("#t-sr-line", selected_sub);
        }


        const doNotHighlight = function() {
            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("fill", "lightgrey")
                .attr("r", 5);

            // d3.select("#t-opt-line").selectAll("svg").data([]).exit().remove();
            // d3.select("#t-sr-line").selectAll("svg").data([]).exit().remove();

            // showTrialOpt("#line_graph_t_opt", 0);
            // showTrialSr("#line_graph_t_sr", 0);
        }

        const clicked = function(sub) {
            main_update(sub);
            heatmap_update(sub);
            render_trial_opt(sub);
            render_trial_sr(sub);
        }

        // Add dots
        figureG.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function(d) {
                return "dot cluster" + d.idx +
                    " sub" + d.sub;
            })
            .attr("cx", function(d) {
                return x(d.a_opt);
            })
            .attr("cy", function(d) {
                return y(d.s_opt);
            })
            .attr("r", 5)
            .style("fill", "lightgrey")
            // .style("fill", function (d) { return color[d.idx-1] } )
            // .on("load", doNotHighlight )
            .on("mouseover", d => highlight(d))
            .on("click", d => clicked(d.sub))
            .on("mouseleave", doNotHighlight);

    }
}


function showTrialOpt(divID, sub) {

    // Rewrote to follow the same logic as the scatter plot svg
    // set the dimensions and margins of the graph
    const margin = {
        top: 70,
        right: 30,
        bottom: 10,
        left: 100
    };
    const width = 560;
    const height = 250;

    // append the svg element to parent
    let svg = d3.select(divID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([0, 252]);

    y.domain([0, 1]);

    // Add the X Axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // define the line
    const valueline = d3.line()
        .x(function(d) {
            return x(d.trial_no);
        })
        .y(function(d) {
            return y(d.ten_trials_mean);
        });

    let line = svg.append("g")
        .attr("class", "line");

    // Plot Spatial ACVS p. optimal across trials
    d3.csv("data/time_series/s_trial_opt_" + sub + ".csv").then(function(data) {

        // Add the valueline path.
        line.append("path")
            .data([data])
            .attr("class", "line_s")
            .attr("d", valueline);
    });

    d3.csv("data/time_series/a_trial_opt_" + sub + ".csv").then(function(data) {

        // Add the valueline path.
        line.append("path")
            .data([data])
            .attr("class", "line_a")
            .attr("d", valueline);
    });

    // }

}



function showTrialSr(divID, sub) {

    // if div exists, do not need to create it again
    // if !(document.getElementById(divID).getElementsByTagName("svg").length) {

    // set basic dimensions
    const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 480 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    // create svg object
    let svg = d3.select(divID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([0, 252]);

    y.domain([0, 1]);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));


    // define the line
    const valueline = d3.line()
        .x(function(d) {
            return x(d.trial_no);
        })
        .y(function(d) {
            return y(d.ten_trials_mean);
        });

    // Plot Spatial ACVS p. optimal across trials
    d3.csv("data/time_series/s_trial_sr_" + sub + ".csv").then(function(error, data) {
        if (error) throw error;

        // format the data
        // data.forEach(function(d) {
        //     d.date = +d.date;
        //     d.close = +d.close;
        // });

        // Scale the range of the data
        // x.domain(d3.extent(data, function(d) { return d.date; }));
        // y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line_s")
            .attr("d", valueline);
    });

    d3.csv("data/time_series/a_trial_sr_" + sub + ".csv").then(function(error, data) {
        if (error) throw error;

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line_a")
            .attr("d", valueline);
    });


    // }

}


function initialize() {
    // Initialize the trial opt time series
    {
        // set the dimensions and margins of the graph
        const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
            width = 480 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        // set the ranges
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        x.domain([0, 252]);

        y.domain([0, 1]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select("#t-opt-lines").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));

        svg.append("g")
            .attr("id", "a-opt-line-g")
            .attr("class", "line");
    }

    {
        // set the dimensions and margins of the graph
        const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
            width = 480 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        // set the ranges
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        x.domain([0, 252]);

        y.domain([0, 1]);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        const svg = d3.select("#t-sr-lines").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add the X Axis
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y));

        svg.append("g")
            .attr("id", "t-sr-line-g")
            .attr("class", "line");
    }
}

// TODO: duplicated logic
/**
 * 
 */
function render_trial_opt(sub) {

    // set the dimensions and margins of the graph
    const margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
        width = 480 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;

    // set the ranges
    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain([0, 252]);

    y.domain([0, 1]);

    // define the line
    const valueline = d3.line()
        .x(function(d) {
            return x(d.trial_no);
        })
        .y(function(d) {
            return y(d.ten_trials_mean);
        });

    d3.select("#a-opt-line-g").selectAll("path").data(["line_a", "line_s"]).enter()
        .append("path")
        .attr("class", d => d);

    // Plot Spatial ACVS p. optimal across trials
    d3.csv("data/time_series/a_trial_opt_" + sub + ".csv").then(function(data) {

        // Add the valueline path.
        d3.selectAll("#a-opt-line-g .line_a")
            .data([data])
            .transition()
                .duration(500)
                .attr("d", valueline);
    });

    d3.csv("data/time_series/s_trial_opt_" + sub + ".csv").then(function(data) {

        // Add the valueline path.
        d3.selectAll("#a-opt-line-g .line_s")
            .data([data])
            .transition()
            .duration(500)
                .attr("d", valueline);
    });
}

function render_trial_sr(sub) {


        // set the dimensions and margins of the graph
        const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
            width = 480 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;
    
        // set the ranges
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
    
        x.domain([0, 252]);
    
        y.domain([0, 1]);
    
        // define the line
        const valueline = d3.line()
            .x(function(d) {
                return x(d.trial_no);
            })
            .y(function(d) {
                return y(d.ten_trials_mean);
            });
    
        d3.select("#t-sr-line-g").selectAll("path").data(["line_a", "line_s"]).enter()
            .append("path")
            .attr("class", d => d);
    
        // Plot Spatial ACVS p. optimal across trials
        d3.csv("data/time_series/a_trial_sr_" + sub + ".csv").then(function(data) {
    
            // Add the valueline path.
            d3.selectAll("#t-sr-line-g .line_a")
                .data([data])
                .transition()
                    .duration(500)
                    .attr("d", valueline);
        });
    
        d3.csv("data/time_series/s_trial_sr_" + sub + ".csv").then(function(data) {
    
            // Add the valueline path.
            d3.selectAll("#t-sr-line-g .line_s")
                .data([data])
                .transition()
                .duration(500)
                    .attr("d", valueline);
        });

}