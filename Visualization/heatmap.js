class HeatmapWidget {
    constructor() {
        this.data = [];
        this.parent = d3.select(".side-bar-heatmap");
        this._initialize();
    }

    /**
     * Two things need to be done in initialization
     * First, create the data for placeholder squares representing the initial status
     * Then, initialize the display, which mainly involves drawing the acvs cartoon
     */
    _initialize() {
        const cx = 50;
        const cy = 50;
        const r = 40;
        const w = 5;
        for ( let i=1 ; i<=12 ; i++ ) {
            const angle = 2 * Math.PI / 12;
            let x = (Math.cos(angle * i - Math.PI / 2) * r*0.5 + cx);
            let y = (Math.sin(angle * i - Math.PI / 2) * r*0.5 + cy);
            this.data.push(new Square(x, y, w, w, "white", i));
        }
        for ( let i=1 ; i<=18 ; i++ ) {
            const angle = 2 * Math.PI / 18;
            let x = (Math.cos(angle * i - Math.PI / 2) * r * 0.75 + cx);
            let y = (Math.sin(angle * i - Math.PI / 2) * r * 0.75 + cy);
            this.data.push(new Square(x, y, w, w, "white", i+12));
        }
        for ( let i=1 ; i<=24 ; i++ ) {
            const angle = 2 * Math.PI / 24;
            let x = (Math.cos(angle * i - Math.PI / 2) * r * 1.0 + cx);
            let y = (Math.sin(angle * i - Math.PI / 2) * r * 1.0 + cy);
            this.data.push(new Square(x, y, w, w, "white", i+12+18));
        }
        const svg = this.parent.append("svg")
            .attr("class", "heatmap")
            .attr("viewBox", "0 0 100 100");
        const rects = svg.selectAll("rect").data(this.data);
        rects.enter().append("rect")
            .attr("x", d => d.x )
            .attr("y", d => d.y )
            .attr("width", d => d.w )
            .attr("height", d => d.h )
            .attr("fill", d => d.color )
            .attr("id", d => "heatmap_pos_" + `${d.pos}`);


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

        // Just a test for csv read
    }

    /**
     * 
     * @param {} data : the raw dataset from a subject
     */
    _update(data) {
        this.data = data;
        this._render();
    }

    /**
     * This function renders the heatmap according to the current data
     */
    _render() {

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
