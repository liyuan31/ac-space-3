const sidebar = new SidebarWidget();
// main_update(0);
const heatmap = new HeatmapWidget();

function main_update(sub) {

    d3.csv("data/ac_space_3.csv").then(data => {
        // console.log(data);
        if (sub !== '0') {
            let i = 0;
            for (i; i < data.length; i++) {
                if (data[i].sub === sub) break;
            }
            sidebar.update(data[i]);
        } else {
            // If 0 is passed, return the mean data
            const format2 = d3.format(".2f");
            const format4 = d3.format(".4f");
            let mean_a_opt, mean_a_sr, mean_a_rt, mean_s_opt, mean_s_sr, mean_s_rt;
            mean_a_opt = format2(d3.mean(data, d => d.a_opt));
            mean_a_sr = format2(d3.mean(data, d => d.a_sr));
            mean_a_rt = format4(d3.mean(data, d => d.a_rt));
            mean_s_opt = format2(d3.mean(data, d => d.s_opt));
            mean_s_sr = format2(d3.mean(data, d => d.s_sr));
            mean_s_rt = format4(d3.mean(data, d => d.s_rt));
            const mean = {
                a_opt: mean_a_opt,
                a_sr: mean_a_sr,
                a_rt: mean_a_rt,
                s_opt: mean_s_opt,
                s_sr: mean_s_sr,
                s_rt: mean_s_rt,
                sub: "Mean"
            }
            sidebar.update(mean);
        }
    });

}

function heatmap_update(sub) {
    // First read the csv file, which is very messy because we need to skip one row,
    // and also notice that acvs is recorded with tab-separated txt file.
    d3.text("data/raw/Data_AdaptChoice_" + sub + ".txt").then( data => {
        // remove the first row
        let cleaned = data.split('\n').slice(1).join('\n');
        // create a customized parser for delimiter-separated values
        // see https://github.com/d3/d3-dsv
        const tsv = d3.dsvFormat('\t');
        // parse it
        cleaned = tsv.parse( cleaned );
        // pass it to the <HeatmapWidget>
        heatmap.update_acvs(cleaned);
    })

    d3.text("data/raw/Data_AC_SPACE_" + sub + ".csv").then( data => {
        // remove the first row
        let cleaned = data.split('\n').slice(1).join('\n');
        // parse it
        cleaned = d3.csvParse( cleaned );
        // pass it to the <HeatmapWidget>
        heatmap.update_space(cleaned);
    })
}