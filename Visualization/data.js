class DataGenerator {

    static fetch(sub) {
        const format2 = d3.format(".2f");
        const format4 = d3.format(".4f");
        let result = new Data();
        d3.csv("data/ac_space_3.csv").then( function(data) {
            let i = 0;
            for (i; i < data.length; i++) {
                if (data[i].sub === `${sub}`) break
            }
            if (sub === 0) {
                result.a_opt = format2(d3.mean(data, d => d.a_opt));
            } else {
                result.a_opt = format2(data[i].a_opt);
            }
        });
        return result;
    }

}


class Data {
    constructor() {
            // Initialize all the parameters needed
        // for the standard acvs
        this.a_opt = 0;
        this.a_opt_b_1 = 0;
        this.a_opt_b_2 = 0;
        this.a_opt_b_3 = 0;
        this.a_sr = 0;
        this.a_sr_b_1 = 0;
        this.a_sr_b_2 = 0;
        this.a_sr_b_3 = 0;
        this.a_rt = 0;
        this.a_rt_b_1 = 0;
        this.a_rt_b_2 = 0;
        this.a_rt_b_3 = 0;
        // and for the spatial acvs


    }
}