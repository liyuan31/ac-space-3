/**
 * This function wraps the processes of rendering sidebar content.
 */
class SidebarWidget {
    constructor() {
        this.data = {
            a_opt: "0",
            a_sr: "0",
            a_rt: "0"
        };   // an object from <Data> class
        // the parent element of the widget
        this.parent = d3.select(".side-bar-content");
        // the width of the parent element
        // TODO: this is hard-coded
        this.width = 252;
        this.update();
    }

    /**
     * When called, this function updates the bound data object and render the sidebar again.
     * @param {Data} data : default is the existing <Data> object (no update), replace when given the argument 
     */
    update(data=this.data) {
        this.data = data;
        this._render();
    }

    _render() {

        const prop_scale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, this.width]);
        const pink_to_red = d3.scaleLinear()
            .domain([0, 100])
            .range(["pink", "red"]);

        // First render elements for each panel
        const a_opt = this.parent.select("#a-opt");
        a_opt.select(".info").select(".label").html("P. Optimal");
        a_opt.select(".info").select(".value").html(`${this.data.a_opt}%`);
        a_opt.select(".figure").selectAll("svg").data([0]).enter().append("svg");
        const a_opt_figure_svg = a_opt.select(".figure").select("svg");
        const a_opt_figure_svg_line = a_opt_figure_svg.selectAll("line").data([this.data]);
        // If <svg> does not exist, i.e., in the intial rendering, the enter selection will have
        // one sub-selection of <svg>.
        a_opt_figure_svg_line.enter().append("line")
            .merge(a_opt_figure_svg_line)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", d => `${prop_scale(d.a_opt)}`)
                .attr("stroke", d => `${pink_to_red(d.a_opt)}`);
        // When the render function is called again, the enter selection is null, so in order to
        // update, we need to use the existing selection.
        // First remove the existing <line>, if any
        // a_opt_figure_svg_line.remove();
        // a_opt_figure_svg_line
        //     .attr("x1", "0")
        //     .attr("y1", "0")
        //     .attr("x2", "0")
        //     .attr("y2", "0")
        //     .attr("stroke", pink_to_red(0))
        //     .transition()
        //         .duration(1000)
        //         .attr("x2", d => `${prop_scale(d.a_opt)}`)
        //         .attr("stroke", d => `${pink_to_red(d.a_opt)}`);
        // // Since the data object bound with <svg> will always contain only one element, the exit
        // // selection should always be null. But I'll write the following statement just for completeness.
        // a_opt_figure_svg_line.exit().remove();

        // And do the same thing to switch rate
        const a_sr = this.parent.select("#a-sr");
        a_sr.select(".info").select(".label").html("Switch Rate");
        a_sr.select(".info").select(".value").html(`${this.data.a_sr}%`);
        const a_sr_figure_svg = a_sr.select(".figure").selectAll("svg").data([this.data]);
        a_sr_figure_svg.enter().append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${this.data.a_sr}%`);
        a_sr_figure_svg.selectAll("line").remove();
        a_sr_figure_svg.append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${this.data.a_sr}%`);

        // And do pretty much the same thing to RT, with some adjustments
        const a_rt = this.parent.select("#a-rt");
        a_rt.select(".info").select(".label").html("Response Time");
        a_rt.select(".info").select(".value").html(`${this.data.a_rt}`);
        // calculate the proportion rt of 6s, since the max rt in the dataset is 5.8
        const rt_prop = this.data.a_rt/6*100;
        const a_rt_figure_svg = a_rt.select(".figure").selectAll("svg").data([this.data]);
        a_rt_figure_svg.enter().append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${rt_prop}%`);
        a_rt_figure_svg.selectAll("line").remove();
        a_rt_figure_svg.append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${this.data.a_sr}%`);
    }

}