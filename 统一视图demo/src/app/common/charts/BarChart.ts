export class BarChart {
    public svg;
    public width;
    public height;
    public width_content;
    public height_content;
    public margin;
    public data;
    public data_old;
    public data_total;
    public ticks;
    public color;
    public linecap;
    public webLineX;
    public webLineY;

    constructor(public config) {
        this.svg = config.svg;
        this.width = config.width ? config.width : window.innerWidth;
        this.height = config.height ? config.height : this.width * .7;
        this.linecap = config.linecap ? config.linecap : false;
        this.webLineX = config.webLineX ? config.webLineX : false;
        this.webLineY = config.webLineY ? config.webLineY : false;
        this.ticks = config.ticks ? config.ticks : 10;
        this.color = config.color ? config.color : "steelblue"
        //margin
        this.margin = config.margin ? config.margin : {
            top: this.width * .1,
            right: this.width * .05,
            bottom: this.width * .1,
            left: this.width * .12
        };
        this.data = config.data;
        this.data_total = config.data_total;
        this.data_old = config.data;
    }

    initial() {
        let _this = this;
        //svg宽高
        _this.svg
            .attr("width", _this.width)
            .attr("height", _this.height)
            ;
        _this.width_content = _this.width - _this.margin.left - _this.margin.right;
        _this.height_content = _this.height - _this.margin.top - _this.margin.bottom;
        //g_main
        let g_main = _this.svg.append("g").classed("g_main", true);
        g_main.attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top + ")");

        let duration = 800;

        let x = d3.scale.ordinal()
            .rangeRoundBands([0, _this.width_content], .8);
        let y = d3.scale.linear()
            .range([_this.height_content, 0]);

        let xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        let yAxis = d3.svg.axis()
            .scale(y)
            .ticks(_this.ticks)
            .orient("left")
            ;



        x.domain(_this.data.map(function (d) {
            return d.name;
        }));
        var y_max = d3.max(_this.data, function (d) {
            return d.amount;
        });
        y_max += y_max / _this.ticks;
        y.domain([0, y_max]);

        g_main.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + _this.height_content + ")")
            .call(xAxis);
        g_main.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        var g_bar = g_main.append("g")
            .classed("g_bar", true);
        //g_bar
        g_bar.data(_this.data).enter();
        console.log(_this.data);
        var bar = g_bar.selectAll(".bar")
            .data(_this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.name);
            })
            .attr("y", _this.height_content)
            .attr("height", 0)
            .attr("width", x.rangeBand())
            .attr("ry", x.rangeBand() * .5)
            .attr("fill", _this.color)
            .transition().duration(duration)
            .attr("y", function (d) {
                return y(d.amount);
            })
            .attr("height", function (d) {
                return _this.height_content - y(d.amount);
            });
        //网线
        if (_this.webLineY) {
            _this.svg.selectAll("g.y.axis g.tick")
                .append("line").classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", _this.width_content)
                .attr("y2", 0)
                ;
            // _this.svg.select("g.y.axis")
            //     .append("line").classed("grid-line", true)
            //     .attr("x1", 0)
            //     .attr("y1", 0)
            //     .attr("x2", _this.width_content)
            //     .attr("y2", 0)
            //     ;
        }
        if (_this.webLineX) {
            _this.svg.selectAll("g.x.axis g.tick")
                .append("line").classed("grid-line", true)
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", 0)
                .attr("y2", -_this.height_content)
                ;
            // _this.svg.select("g.x.axis")
            //     .append("line").classed("grid-line", true)
            //     .attr("x1", _this.width_content)
            //     .attr("y1", 0)
            //     .attr("x2", _this.width_content)
            //     .attr("y2", -_this.height_content)
            //     ;
        }
    }

    update(data, handle?) {
        let _this = this;
        //x,y轴网线去除
        _this.svg.selectAll(".grid-line").remove();
        //y轴渐变
        let y = d3.scale.linear()
            .range([_this.height_content, 0]);
        let y_max = d3.max(data, function (d) {
            return d.amount;
        });
        y_max += y_max / _this.ticks;
        y.domain([0, y_max]);
        let yAxis = d3.svg.axis()
            .scale(y)
            .ticks(_this.ticks)
            .orient("left")
            ;
        _this.svg.select("g.y.axis")
            .transition().duration(600)
            .call(yAxis)
            .each("end", function () {
                //重绘网格y
                if (_this.webLineY) {
                    _this.svg.selectAll("g.y.axis g.tick")
                        .append("line").classed("grid-line", true)
                        .attr("x1", 0)
                        .attr("y1", 0)
                        .attr("x2", _this.width_content)
                        .attr("y2", 0)
                        ;
                }
            })
            ;
        //x轴渐变
        let x = d3.scale.ordinal()
            .rangeRoundBands([0, _this.width_content], .8)
            .domain(data.map(function (d) {
                return d.name;
            }));
        let xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        _this.svg.select("g.x.axis")
            .transition().duration(600)
            .call(xAxis)
            .each("end", function () {
                //重绘网格y
                if (_this.webLineX) {
                    _this.svg.selectAll("g.x.axis g.tick")
                        .append("line").classed("grid-line", true)
                        .attr("x1", 0)
                        .attr("y1", 0)
                        .attr("x2", 0)
                        .attr("y2", -_this.height_content)
                        ;
                }
            })
            ;
        //长方形渐变
        _this.svg.selectAll(".bar")
            .data(data)
            .transition()
            .attr("y", function (d) {
                return y(d.amount);
            })
            .attr("height", function (d) {
                return _this.height_content - y(d.amount);
            })
            ;
        if (handle) {
            handle();
        }
    }
}