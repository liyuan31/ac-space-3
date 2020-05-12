/**
 * This function wraps the processes of rendering sidebar content.
 */
class SidebarWidget {
    constructor() {
        this.data = {
            a_opt: "0",
            a_sr: "0",
            a_rt: "0",
            s_opt: "0",
            s_sr: "0",
            s_rt: "0"
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

        const all_panels_data = [
            {id: "#a-opt", label: "P. Optimal", unit: "%", value: this.data.a_opt, value_scale: prop_scale, color_scale: color_scale_red},
            {id: "#a-sr", label: "Switch Rate", unit: "%", value: this.data.a_sr, value_scale: prop_scale, color_scale: color_scale_green},
            {id: "#a-rt", label: "Response Time", unit: "s", value: this.data.a_rt, value_scale: rt_scale, color_scale: color_scale_blue},
            {id: "#s-opt", label: "P. Optimal", unit: "%", value: this.data.s_opt, value_scale: prop_scale, color_scale: color_scale_red},
            {id: "#s-sr", label: "Switch Rate", unit: "%", value: this.data.s_sr, value_scale: prop_scale, color_scale: color_scale_green},
            {id: "#s-rt", label: "Response Time", unit: "s", value: this.data.s_rt, value_scale: rt_scale, color_scale: color_scale_blue}
        ];

        all_panels_data.forEach( data => {
            // Make some necessary parameters local
            const color_scale = data.color_scale;
            const value_scale = data.value_scale;
            // First render elements for each panel
            const panel = this.parent.select( data.id );
            panel.select(".info").select(".label").html( data.label );
            panel.select(".info").select(".value").html(`${data.value}` + `${data.unit}`);
            panel.select(".figure").selectAll("svg").data([0]).enter().append("svg");
            const panel_figure_svg = panel.select(".figure").select("svg");
            const panel_figure_svg_line = panel_figure_svg.selectAll("line").data([data.value]);
            // If <svg> does not exist, i.e., in the intial rendering, the enter selection will have
            // one sub-selection of <svg>.
            // When the render function is called again, the enter selection is null, so in order to
            // update, we need to merge the enter selection with the existing selection.
            panel_figure_svg_line.enter().append("line")
                .merge(panel_figure_svg_line)
                .attr("x1", "0")
                .attr("y1", "0")
                .attr("x2", "0")
                .attr("y2", "0")
                .attr("stroke", color_scale(0))
                .transition()
                    .duration(1000)
                    .attr("x2", d => `${value_scale(d)}`)
                    .attr("stroke", d => `${color_scale(d)}`);
            // Since the data object bound with <svg> will always contain only one element, the exit
            // selection should always be null. But I'll write the following statement just for completeness.
            panel_figure_svg_line.exit().remove();            
        });

    }

}