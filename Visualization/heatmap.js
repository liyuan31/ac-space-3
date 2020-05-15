class HeatmapWidget {
    constructor() {
        this.acvs_data = [];
        this.space_data = [];
        this.parent = d3.select(".side-bar-heatmap");
        this._initialize();
    }

    /**
     * Two things need to be done in initialization
     * First, create the data for placeholder squares representing the initial status
     * Then, initialize the display, which mainly involves drawing the acvs cartoon
     */
    _initialize() {
        {
            // Create a title
            this.parent.append("div")
                .attr("class", "title")
                .html("Heatmaps")
        }
        {
            const squares = [];
            const cx = 50;
            const cy = 50;
            const r = 40;
            const w = 5;
            for ( let i=1 ; i<=12 ; i++ ) {
                const angle = 2 * Math.PI / 12;
                let x = (Math.cos(angle * i - Math.PI / 2) * r*0.5 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r*0.5 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i));
            }
            for ( let i=1 ; i<=18 ; i++ ) {
                const angle = 2 * Math.PI / 18;
                let x = (Math.cos(angle * i - Math.PI / 2) * r * 0.75 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r * 0.75 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i+12));
            }
            for ( let i=1 ; i<=24 ; i++ ) {
                const angle = 2 * Math.PI / 24;
                let x = (Math.cos(angle * i - Math.PI / 2) * r * 1.0 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r * 1.0 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i+12+18));
            }
            const svg = this.parent.append("svg")
                .attr("class", "heatmap")
                .attr("viewBox", "0 0 100 100");
            const rects = svg.selectAll("rect").data(squares);
            rects.enter().append("rect")
                .attr("x", d => d.x )
                .attr("y", d => d.y )
                .attr("width", d => d.w )
                .attr("height", d => d.h )
                .attr("fill", d => d.color )
                .attr("id", d => "heatmap_a_pos_" + `${d.pos}`);
        }

        {
            const squares = [];
            const cx = 50;
            const cy = 50;
            const r = 40;
            const w = 5;
            for ( let i=1 ; i<=12 ; i++ ) {
                const angle = 2 * Math.PI / 12;
                let x = (Math.cos(angle * i - Math.PI / 2) * r*0.5 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r*0.5 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i));
            }
            for ( let i=1 ; i<=18 ; i++ ) {
                const angle = 2 * Math.PI / 18;
                let x = (Math.cos(angle * i - Math.PI / 2) * r * 0.75 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r * 0.75 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i+12));
            }
            for ( let i=1 ; i<=24 ; i++ ) {
                const angle = 2 * Math.PI / 24;
                let x = (Math.cos(angle * i - Math.PI / 2) * r * 1.0 + cx);
                let y = (Math.sin(angle * i - Math.PI / 2) * r * 1.0 + cy);
                squares.push(new Square(x, y, w, w, "rgb(255, 255, 255)", i+12+18));
            }
            const svg = this.parent.append("svg")
                .attr("class", "heatmap")
                .attr("viewBox", "0 0 100 100");
            const rects = svg.selectAll("rect").data(squares);
            rects.enter().append("rect")
                .attr("x", d => d.x )
                .attr("y", d => d.y )
                .attr("width", d => d.w )
                .attr("height", d => d.h )
                .attr("fill", d => d.color )
                .attr("id", d => "heatmap_s_pos_" + `${d.pos}`);
        }

        // Just test for the pos
        // const pos = svg.selectAll("text").data(this.data);
        // let text_shift = 0.65;
        // pos.attr("x", (function (d) { return d.x + d.w / 3.25 + "" }))
        //     .attr("y", (function (d) { return d.y + d.w / 1.35 + "" }))
        //     .attr("fill", "red")
        //     .attr("class", "ace_pretty_text")
        //     .attr("font-size", d => d.w * text_shift + "")
        //     .text(function (d) { return d.pos });
        // pos.enter().append("text")
        //     .attr("x", (function (d) { return d.x + d.w / 3.25 + "" }))
        //     .attr("y", (function (d) { return d.y + d.w / 1.35 + "" }))
        //     .attr("fill", "red")
        //     .attr("class", "ace_pretty_text")
        //     .attr("font-size", d => d.w * text_shift + "")
        //     .text(function (d) { return d.pos });
        // pos.exit().remove();
    }

    /**
     * 
     * @param {} data : the raw standard acvs dataset from a subject
     */
    update_acvs(data) {
        this.acvs_data = data;
        this._render_acvs();
    }

    update_space(data) {
        this.space_data = data;
        this._render_space();
    }


    /**
     * This function renders the heatmap according to the current data
     */
    _render_acvs() {
        // prepare a scale that, after standarize to z score, convert to a scale from
        // 0 to 1
        const scale_z_to_0_to_1 = d3.scaleLinear()
            .domain([-2, 2])
            .range([0, 1]);
        // create a map to record the location and target choice count
        let count = new Map();
        for ( let i=1; i<=54; i++) {count.set(`${i}`, 0)}
        const update = function(pos) {
            const updated = count.get(pos) + 1;
            count.set(pos, updated);
            d3.select("#heatmap_a_pos_" + pos)
                .attr("fill", d3.interpolateReds(scale_z_to_0_to_1(count.get(pos))));
        }
        // standardize using z-scores
        const standardize = function() {
            let raw = [];
            let z_score = new Map();
            for ( let i=1; i <= 54; i++ ) {
                raw.push(count.get(`${i}`));
            }
            const mean = d3.mean(raw);
            const std = d3.deviation(raw);
            for ( let i=1; i<=54; i++ ) {
                z_score.set(`${i}`, (count.get(`${i}`)-mean)/std)
            }
            for (let i=1; i<=54; i++) {
                d3.select(`#heatmap_a_pos_${i}`)
                    .attr("fill", d3.interpolateReds(scale_z_to_0_to_1(z_score.get(`${i}`))));      
            }
        }
        this.acvs_data.forEach( trial => {
            if (trial.Acc === '1') {
                // if this is a correct trial
                if (trial.Targ_Choice === '1') {
                    update(trial.Targ1_position);
                } else if (trial.Targ_Choice === '2') {
                    update(trial.Targ2_position);
                }
            }
        });
        standardize();
    }

    _render_space() {
        // prepare a scale that, after standarize to z score, convert to a scale from
        // 0 to 1
        const scale_z_to_0_to_1 = d3.scaleLinear()
            .domain([-2, 2])
            .range([0, 1]);
        // create a map to record the location and target choice count
        // exclude squares that doesn't exist
        const excluded = [54, 30, 12, 6, 21, 42];
        let count = new Map();
        for ( let i=1; i<=54; i++) {
            if(!excluded.includes(i)) { count.set(`${i}`, 0) }
        }
        const update = function(pos) {
            const updated = count.get(pos) + 1;
            count.set(pos, updated);
            d3.select("#heatmap_s_pos_" + pos)
                .attr("fill", d3.interpolateGreys(scale_z_to_0_to_1(count.get(pos))));
        }
        // standardize using z-scores
        const standardize = function() {
            let raw = [];
            let z_score = new Map();
            for ( let i=1; i<=54; i++ ) {
                if(!excluded.includes(i)) { raw.push(count.get(`${i}`)) }
            }
            const mean = d3.mean(raw);
            const std = d3.deviation(raw);
            for ( let i=1; i<=54; i++ ) {
                if(!excluded.includes(i)) {z_score.set(`${i}`, (count.get(`${i}`)-mean)/std)}
            }
            for (let i=1; i<=54; i++) {
                if(!excluded.includes(i)) {
                    d3.select(`#heatmap_s_pos_${i}`)
                        .attr("fill", d3.interpolateGreys(scale_z_to_0_to_1(z_score.get(`${i}`))));                       
                } 
            }
        }
        this.space_data.forEach( trial => {
            if (trial.Acc === '1') {
                // if this is a correct trial
                if (trial.Targ_Choice === '1') {
                    update(trial.Targ1_position);
                } else if (trial.Targ_Choice === '2') {
                    update(trial.Targ2_position);
                }
            }
        });
        standardize();
        console.log(count)
    }
}

/**
 * Helper class to represent a square. Basically the same as that in the experiment code.
 */
class Square {
    constructor(x, y, w, h, color, pos) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
      this.pos = pos;
    }
  }
