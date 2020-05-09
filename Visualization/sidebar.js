/**
 * This function wraps the processes of rendering sidebar content.
 */
function render_sidebar() {
    const data_url = "data/ac_space_3.csv";

    d3.csv(data_url).then(data => render(data));

    // The render function in d3.csv callback
    const render = function(data) {
        
    }
}