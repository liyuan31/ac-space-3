/**
 * This function wraps the processes of rendering sidebar content.
 */
class SidebarWidget {
    constructor(data) {
        this.data = data;   // an object from <Data> class
        this.content_div = d3.select(".side-bar-content");
    }

    render() {
        // First render elements for each panel
        const a_opt = this.content_div.select("#a-opt");
        a_opt.select(".info").select(".label").html("P. Optimal");
        a_opt.select(".info").select(".value").html(`${this.data.mean_a_opt}%`);
        a_opt.select(".figure").append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", "0")
            .attr("y2", "0")
            .transition()
                .duration(1000)
                .attr("x2", `${this.data.mean_a_opt}%`);
        const a_sr = this.content_div.select("#a-sr");
        a_sr.select(".info").select(".label").html("P. Switch");
        a_sr.select(".info").select(".value").html(`${this.data.mean_a_opt}%`);
        a_sr.select(".figure").append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", `${this.data.mean_a_opt}%`)
            .attr("y2", "0");
        const a_rt = this.content_div.select("#a-rt");
        a_rt.select(".info").select(".label").html("Response Time");
        a_rt.select(".info").select(".value").html(`${this.data.mean_a_opt}%`);
        a_rt.select(".figure").append("svg").append("line")
            .attr("x1", "0")
            .attr("y1", "0")
            .attr("x2", `${this.data.mean_a_opt}%`)
            .attr("y2", "0");  
    }

}