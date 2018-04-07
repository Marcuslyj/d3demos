

export class PieChart {
    public svg;
    public width;
    public height;
    public innerRadius;
    public outerRadius;
    public animating = true;
    public coreActive = false;
    public coreInfo: any;
    public lastActivated;
    public gridline;
    public data;
    public endAngle;
    constructor(public chartConfig) {
        this.svg = chartConfig.svg;
        this.width = chartConfig.width ? chartConfig.width : window.innerWidth;
        this.height = chartConfig.height ? chartConfig.height : this.width * .6;
        this.innerRadius = chartConfig.innerRadius ? chartConfig.innerRadius : this.width * .115;
        this.outerRadius = chartConfig.outerRadius ? chartConfig.outerRadius : this.width * .18;
        this.gridline = chartConfig.gridline;
    }

    //方法：取颜色
    getColor(idx) {
        let palette = [
            '#f58a2c', '#3cb371', '#03a9f4', '#ffc107'
        ]
        return palette[idx % palette.length];
    }

    drawPieChart() {
        let _this = this;
        let svg = _this.svg
            .attr("width", _this.width)
            .attr("height", _this.height);
        let g_main = svg.append("g").classed("g_main", true);
        let g_pie = g_main.append("g").classed("g_pie", true);



        //画扇形区域图
        g_pie
            .attr("transform", "translate(" + _this.width / 2 + "," + _this.height / 2 + ")");

        //背景圆
        let pieBg = g_pie.append("path")
            .attr("d", d3.svg.arc()
                .startAngle(0)
                .endAngle(2 * Math.PI)
                .innerRadius(_this.innerRadius * .85)
                .outerRadius(_this.outerRadius * 1.1)
            )
            .attr("fill", "#506bec");

        let endAngle = _this.endAngle = Math.PI * 2;
        let data_source = [
            { name: "债权类", total: 25000, used: 9000, canuse: 16000, rate: .25 },
            { name: "债券类", total: 26000, used: 18000, canuse: 8000, rate: .26 },
            { name: "权益类", total: 9000, used: 6000, canuse: 3000, rate: .09 },
            { name: "合作类", total: 40000, used: 38000, canuse: 2000, rate: .4 },
        ];
        _this.coreInfo = {
            name: "限额",
            total: 100000,
            used: 69000,
            canuse: 31000,
            rate: 1
        };

        let data: any = data_source.concat();
        let rate_left = 1;
        let count_data = 0
        do {
            data[count_data].startAngle = endAngle * rate_left;
            data[count_data].endAngle = endAngle * (rate_left - data[count_data].rate);
            rate_left -= data[count_data].rate;
            count_data++;
        } while (count_data < data.length)
        _this.data = data;

        let g_encircle = g_pie.append("g").classed("g_encircle", true);
        let arc = d3.svg.arc().outerRadius(_this.outerRadius).innerRadius(_this.innerRadius);
        g_encircle.selectAll("path.fan")
            .data(data)
            .enter()
            .append("path")
            .attr("class", "fan")
            .attr("fill", function (d, i) {
                return _this.getColor(i);
            })
            .transition().duration(1000)
            .attrTween("d", function (d) {
                var start = {
                    startAngle: endAngle,
                    endAngle: endAngle
                }; 
                var interpolate = d3.interpolate(start, d); // <-B
                return function (t) {
                    return arc(interpolate(t)); // <-C
                };
            });   
    }
}