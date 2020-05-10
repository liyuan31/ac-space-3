/**
 * This function wraps the processes of rendering sidebar content.
 */
class SidebarWidget {
    constructor(data) {
        this.data = data;   // an object from <Data> class
        // the parent element of the widget
        this.parent = d3.select(".side-bar-content");
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
        // First render elements for each panel
        const a_opt = this.parent.select("#a-opt");
        a_opt.select(".info").select(".label").html("P. Optimal");
        a_opt.select(".info").select(".value").html(`${this.data.mean_a_opt}%`);
        const a_svg = a_opt.select(".figure").selectAll("svg").data([this.data]);
        // If <svg> does not exist, i.e., in the intial rendering, the enter selection will have
        // one sub-selection of <svg>.
        a_svg.enter().append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", d => `${d.mean_a_opt}%`);
        // When the render function is called again, the enter selection is null, so in order to
        // update, we need to use the existing selection.
        a_svg.append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", d => `${d.mean_a_opt}%`);
        // Since the data object bound with <svg> will always contain only one element, the exit
        // selection should always be null. But I'll write the following statement just for completeness.
        a_svg.exit().remove();
        const a_sr = this.parent.select("#a-sr");
        a_sr.select(".info").select(".label").html("Switch Rate");
        a_sr.select(".info").select(".value").html(`${this.data.mean_a_sr}%`);
        a_sr.select(".figure").append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${this.data.mean_a_sr}%`);
        const a_rt = this.parent.select("#a-rt");
        a_rt.select(".info").select(".label").html("Response Time");
        a_rt.select(".info").select(".value").html(`${this.data.mean_a_rt}`);
        // calculate the proportion rt of 6s, since the max rt in the dataset is 5.8
        const rt_prop = this.data.mean_a_rt/6*100;
        a_rt.select(".figure").append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${rt_prop}%`);  
    }

}