/**
 * This function wraps the processes of rendering sidebar content.
 */
class SidebarWidget {
    constructor(data) {
        this.data = data;   // an object from <Data> class
        this.content_div = d3.select(".side-bar-content");
    }

    render() {
        const a_opt_bar = this.content_div.select(".a-opt-bar").append("svg");
        a_opt_bar.attr("width", this.data.mean_a_opt_b_1);
    }

}