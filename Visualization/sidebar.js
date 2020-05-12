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
        this.initialize();
        this.update();
    }

    /**
     * This method intializes all necessary elements of the sidebar object
     * For referrence, every "panel" class will look like this,
     *  <div class="panel" id="s-opt">
     *      <div class="info">
     *          <div class="label"></div>
     *          <div class="value"></div>
     *      </div>
     *      <div class="figure"></div>
     *  </div>
     */
    initialize() {
        const panel_id_names = [
            "a-opt", "a-sr", "a-rt", "s-opt", "s-sr", "s-rt"
        ];
        const parent = this.parent;

        // The titles are inserted here, and their order is determined by CSS flexbox
        parent.append("div").attr("class", "title").html("Standard ACVS");
        parent.append("div").attr("class", "title").html("Spatial ACVS");

        // Add panel div
        panel_id_names.forEach( name => {
            const panel = parent.append("div")
                .attr("class", "panel")
                .attr("id", name);
            const info = panel.append("div").attr("class", "info");
            // Add two div, label and value, for the info section.
            // This is the parameter name (e.g., switch rate) and the corresponding value.
            info.selectAll("div").data(["label", "value"])
                .enter().append("div")
                    .attr("class", d => d);
            // Add the figure div for the panel, and this is where the line comes in.
            panel.append("div").attr("class", "figure");
        });


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

        const rt_scale = d3.scaleLinear()
            .domain([0, 6])
            .range([0, this.width]);

        const color_scale_red = d3.scaleLinear()
            .domain([0, 100])
            .range(["rgb(255, 204, 204)", "red"]);
        
        const color_scale_green = d3.scaleLinear()
            .domain([0, 100])
            .range(["rgb(204, 255, 204)", "green"]);

        const color_scale_blue = d3.scaleLinear()
            .domain([0, 100])
            .range(["rgb(153, 204, 255)", "blue"]);

        // First render elements for each panel
        const a_opt = this.parent.select("#a-opt");
        a_opt.select(".info").select(".label").html("P. Optimal");
        a_opt.select(".info").select(".value").html(`${this.data.a_opt}%`);
        a_opt.select(".figure").selectAll("svg").data([0]).enter().append("svg");
        const a_opt_figure_svg = a_opt.select(".figure").select("svg");
        const a_opt_figure_svg_line = a_opt_figure_svg.selectAll("line").data([this.data]);
        // If <svg> does not exist, i.e., in the intial rendering, the enter selection will have
        // one sub-selection of <svg>.
        // When the render function is called again, the enter selection is null, so in order to
        // update, we need to merge the enter selection with the existing selection.
        a_opt_figure_svg_line.enter().append("line")
            .merge(a_opt_figure_svg_line)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .attr("stroke", color_scale_red(0))
            .transition()
                .duration(1000)
                .attr("x2", d => `${prop_scale(d.a_opt)}`)
                .attr("stroke", d => `${color_scale_red(d.a_opt)}`);
        // Since the data object bound with <svg> will always contain only one element, the exit
        // selection should always be null. But I'll write the following statement just for completeness.
        a_opt_figure_svg_line.exit().remove();

        // And do the same thing to switch rate
        const a_sr = this.parent.select("#a-sr");
        a_sr.select(".info").select(".label").html("Switch Rate");
        a_sr.select(".info").select(".value").html(`${this.data.a_sr}%`);
        a_sr.select(".figure").selectAll("svg").data([0]).enter().append("svg");
        const a_sr_figure_svg = a_sr.select(".figure").select("svg");
        const a_sr_figure_svg_line = a_sr_figure_svg.selectAll("line").data([this.data]);
        a_sr_figure_svg_line.enter().append("line")
            .merge(a_sr_figure_svg_line)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .attr("stroke", color_scale_green(0))
            .transition()
                .duration(1000)
                .attr("x2", d => `${prop_scale(d.a_sr)}`)
                .attr("stroke", d => `${color_scale_green(d.a_sr)}`);
        a_sr_figure_svg_line.exit().remove();

        // And do pretty much the same thing to RT, with some adjustments
        const a_rt = this.parent.select("#a-rt");
        a_rt.select(".info").select(".label").html("Response Time");
        a_rt.select(".info").select(".value").html(`${this.data.a_rt}s`);
        a_rt.select(".figure").selectAll("svg").data([0]).enter().append("svg");
        const a_rt_figure_svg = a_rt.select(".figure").select("svg");
        const a_rt_figure_svg_line = a_rt_figure_svg.selectAll("line").data([this.data]);
        a_rt_figure_svg_line.enter().append("line")
            .merge(a_rt_figure_svg_line)
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .attr("stroke", color_scale_blue(0))
            .transition()
                .duration(1000)
                .attr("x2", d => `${rt_scale(d.a_rt)}`)
                .attr("stroke", d => `${color_scale_blue(d.a_rt)}`);
        a_rt_figure_svg_line.exit().remove();
    }

}