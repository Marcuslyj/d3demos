import { GridLine } from '../../../common/charts/GridLine';

export function gridlineExpand(gridline: GridLine) {
    let _this = gridline;
    //标题部分
    addTitle(_this);
    //legend部分
    addLegend(_this);
}
//添加标题
function addTitle(gridline: GridLine) {
    let _this = gridline;
    let g_title = _this.svg.select(".g_main").append("g").classed("g_title", true);
    g_title.append("text").classed("title_name", true)
        .text("在途授信（审批中+未建额）")
        .attr("dominant-baseline", "middle")
        .attr("y", "1rem")
        .attr("fill", "white")
        .style("font-size", ".8rem")
        ;
    g_title.append("text").classed("title_num", true)
        .attr("dominant-baseline", "middle")
        .attr("x", "45%")
        .attr("y", "1rem")
        .attr("fill", "white")
        .style("font-size", ".8rem")
        ;
}
//添加legend
function addLegend(gridline: GridLine) {
    let _this = gridline;
    let g_legend = _this.svg.select(".g_main").append("g").classed("g_legend", true);
    g_legend.attr("transform", "translate(0," + _this.height * .9 + ")");

    let data_legend = [
        { color: "#b3d2fe", name: "审批在途授信（近三个月）" },
        { color: "#fff", name: "已审批未建额授信（近半年）" }
    ];
    g_legend.selectAll(".g_legendItem")
        .data(data_legend)
        .enter()
        .append("g").classed("g_legendItem", true)
        .attr("transform", function (d, i) {
            return "translate(" + i * _this.width_content / 2 + ",0)";
        })
        ;
    let legendItems = g_legend.selectAll(".g_legendItem");
    legendItems.append("circle")
        .attr("cx", ".5rem")
        .attr("cy", "-.1rem")
        .attr("r", ".3rem")
        .attr("fill", function (d) {
            return d.color;
        })
        ;
    legendItems.append("text")
        .text(function (d) {
            return d.name;
        })
        .attr("x", "1rem")
        .attr("fill", "#fff")
        .attr("dominant-baseline", "middle")
        .style("font-size", ".7rem")
        ;
}
//设数字
export function setNum(gridline: GridLine, num) {
    gridline.svg.select(".title_num").text(num);
}