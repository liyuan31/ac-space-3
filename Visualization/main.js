const sidebar = new SidebarWidget();

function main_update(sub) {

d3.csv("data/ac_space_3.csv").then(data => render(data));

const render = function(data) {
    console.log(data[sub])
    sidebar.update(data[sub]);
}
}

main_update(3);
