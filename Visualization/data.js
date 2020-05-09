class Data {
    constructor(data) {
        // this should be derived from a d3.csv callback
        this.data = data;
        const format2 = d3.format(".2f");
        const format4 = d3.format(".4f");
        this.mean_a_opt_b_1 = format2(d3.mean(this.data, d => d.a_opt_b_1));
        this.mean_a_opt = format2(d3.mean(this.data, d => d.a_opt));
        this.mean_a_sr = format2(d3.mean(this.data, d => d.a_sr));
        this.mean_a_rt = format4(d3.mean(this.data, d => d.a_rt));
        // const mean_a_opt_b_2 = d3.mean(data, d => d.a_opt_b_2);
        // const mean_a_opt_b_3 = d3.mean(data, d => d.a_opt_b_3);
        // const mean_s_opt_b_1 = d3.mean(data, d => d.s_opt_b_1);
        // const mean_s_opt_b_2 = d3.mean(data, d => d.s_opt_b_2);
        // const mean_s_opt_b_3 = d3.mean(data, d => d.s_opt_b_3);
        // const se_a_opt_b_1 = d3.deviation(data, d => d.a_opt_b_1) / data.length;
        // const se_a_opt_b_2 = d3.deviation(data, d => d.a_opt_b_2) / data.length;
        // const se_a_opt_b_3 = d3.deviation(data, d => d.a_opt_b_3) / data.length;
        // const se_s_opt_b_1 = d3.deviation(data, d => d.s_opt_b_1) / data.length;
        // const se_s_opt_b_2 = d3.deviation(data, d => d.s_opt_b_2) / data.length;
        // const se_s_opt_b_3 = d3.deviation(data, d => d.s_opt_b_3) / data.length;
    }
}