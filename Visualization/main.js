const sidebar = new SidebarWidget();

function main_update(sub) {

    d3.csv("data/ac_space_3.csv").then(data => {
        if (sub !== '0') {
            let i = 0;
            for (i; i < data.length; i++) {
                if (data[i].sub === sub) break;
            }
            sidebar.update(data[i]);
        } else { Error("Error: update called on initialization") }
    });

}