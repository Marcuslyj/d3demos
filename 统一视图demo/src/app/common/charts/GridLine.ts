export class GridLine {
    public svg;
    public width;
    public height;
    public width_content;
    public isAnimating = false;
    constructor(public config) {
        this.svg = config.svg;
        this.width = config.width ? config.width : window.innerWidth;
        this.height = config.height ? config.height : this.width * .2;
        this.width_content = config.width_content ? config.width_content : this.width * .92;
    }

    initialLine() {
        let _this = this;
        //初始化svg宽高
        _this.svg
            .attr("width", _this.width)
            .attr("height", _this.height)
            ;
        //定义条纹
        _this.svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "bg")
            .attr("x1", "0")
            .attr("y1", "1%")
            .attr("x2", "1")
            .attr("y2", "0")
            ;
        let g_main = _this.svg.append("g").classed("g_main", true)
            .attr("transform", "translate(" + (_this.width - _this.width_content) / 2 + ",0)")
            ;
        let g_line = g_main.append("g").classed("g_line", true)
            .attr("transform", "translate(0," + _this.height / 2 + ")")
            ;
        //白线
        g_line.append("rect").classed("bg", true)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", _this.width_content)
            .attr("height", _this.width_content * .03)
            .attr("rx", _this.width_content * .03 * .5)
            .attr("fill", "#fff")
            ;
        //格子线
        let gridline = g_line.append("rect").classed("gridline", true)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", _this.width_content * .03)
            .attr("rx", _this.width_content * .03 * .5)
            .attr("fill", "transparent")
            .attr("stroke", "#b5d1ff")
            ;
    }
    //格子线宽
    setWidth(widthRate) {
        let _this = this;
        if (_this.isAnimating) {
            return;
        }
        _this.isAnimating = true;
        let gridline = this.svg.select(".gridline");
        let duration = 300;
        let timer_break = 20;
        let width_show = widthRate * _this.width_content;
        let width_show_tmp = Number(gridline.attr("width"));
        let width_delta = Math.abs(width_show - width_show_tmp);
        let bg = this.svg.select("#bg");
        let cell_width = Math.ceil(window.innerWidth / 40);//满屏40个
        let addFlag;

        if (width_show >= width_show_tmp) {
            addFlag = true;
        } else {
            addFlag = false;
        }

        let interval = setInterval(() => {
            if (addFlag) {
                width_show_tmp += width_delta / (duration / timer_break);
                if (width_show_tmp > width_show) {
                    width_show_tmp = width_show;
                }
            }
            else {
                width_show_tmp -= width_delta / (duration / timer_break);
                if (width_show_tmp < width_show) {
                    width_show_tmp = width_show;
                }
            }


            _this.svg.selectAll("#bg stop").remove();
            // 要精确，不能取整
            let cell_count = width_show_tmp / cell_width;
            for (let i = 0; i < cell_count; i++) {
                bg.append("stop")
                    .attr("offset", i / cell_count)
                    .attr("stop-color", () => {
                        if (i % 2 === 0) {
                            return "#b5d1ff";
                        } else {
                            return "#dcebff";
                        }
                    });
                bg.append("stop")
                    .attr("offset", (i + 1) / cell_count)
                    .attr("stop-color", () => {
                        if (i % 2 === 0) {
                            return "#b5d1ff";
                        } else {
                            return "#dcebff";
                        }
                    });
            }
            bg.attr("y1", .01 * _this.width / width_show_tmp);
            gridline.attr("width", width_show_tmp);
            gridline.attr("fill", "url(#bg)");
            if ((addFlag && width_show_tmp >= width_show) || (!addFlag && width_show_tmp <= width_show)) {
                clearInterval(interval);
                _this.isAnimating = false;
            }

        }, timer_break);

    }
}