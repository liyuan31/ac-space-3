d3.csv("data/ac_space_3.csv").then(function(data) {
    const data_object = new Data(data);
    const sidebar = new SidebarWidget(data_object);
    const display = new MainWidget();
    sidebar.render();
})