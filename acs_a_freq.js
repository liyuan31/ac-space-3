export function load_acs_a_freq() {

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
}
