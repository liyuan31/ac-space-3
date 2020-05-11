class DataGenerator {

    static fetch(sub) {
        d3.csv("data/ac_space_3.csv").then(data => get_data(data));
        const get_data = function(data) {
            const format2 = d3.format(".2f");
            const format4 = d3.format(".4f");
            let a_opt, a_sr, a_rt;
            if (sub === '0') {
                a_opt = format2(d3.mean(data, d => d.a_opt));
                console.log(a_opt)
                a_sr = format2(d3.mean(data, d => d.a_sr));
                a_rt = format2(d3.mean(data, d => d.a_rt));
            } else {
                let i = 0;
                for (i; i < data.length; i++) {
                    if (data[i].sub === sub) break;
                }
                a_opt = format2(data[i].a_opt);
            }
            return new Data(a_opt, a_sr, a_rt);
        }
        return get_data;
    }

}


class Data {
    constructor(a_opt, a_sr, a_rt) {
            // Initialize all the parameters needed
        // for the standard acvs
        this.a_opt = a_opt;
        // this.a_opt_b_1 = 0;
        // this.a_opt_b_2 = 0;
        // this.a_opt_b_3 = 0;
        this.a_sr = a_sr;
        // this.a_sr_b_1 = 0;
        // this.a_sr_b_2 = 0;
        // this.a_sr_b_3 = 0;
        this.a_rt = a_rt;
        // this.a_rt_b_1 = 0;
        // this.a_rt_b_2 = 0;
        // this.a_rt_b_3 = 0;
        // and for the spatial acvs


    }
}
