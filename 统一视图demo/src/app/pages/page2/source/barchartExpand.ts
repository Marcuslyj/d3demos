import { BarChart } from '../../../common/charts/BarChart';

export function barchartExpand(barchart: BarChart) {
    let _this = barchart;
    //legend 部分
    addLegend(_this);
    //指示框部分
    addValueTag(_this);
}
//添加指示框
function addValueTag(barchart: BarChart) {
    let _this = barchart;
    let tagWidth = _this.width_content * .3;
    let tagHeight = _this.width_content * .1;
    let tagGap = _this.width_content * .02;
    let tagColor = "rgba(0,0,0,.7)";
    let fontSize = d3.select("body").style("font-size").replace("px", "");
    let g_main = _this.svg.select(".g_main");

    let targetLine = g_main.append("g").classed("g_line", true)
        .style("opacity", 0)
        ;
    let g_tag = targetLine.append("g").classed("g_tag", true);

    let valTagRect = g_tag.append("rect").classed("valTag", true);
    valTagRect
        .attr("x", tagGap)
        .attr("y", 0)
        .attr("width", tagWidth)
        .attr("height", tagHeight)
        .attr("rx", tagWidth * .05)
        .attr("fill", tagColor);
    targetLine.append("line")
        .attr("x1", "0")
        .attr("y1", "-.6rem")
        .attr("x2", "0")
        .attr("y2", _this.height_content)
        .attr("stroke", "#ff5722")
        .attr("stroke-dasharray", "10 10");
    var leftArrow = targetLine.append("polygon").classed("left-arrow", true)
        .attr("fill", tagColor)
        .attr("points", `0,${tagHeight / 2} ${tagGap * 1.015},${tagHeight / 2 - tagGap} ${tagGap * 1.015},${tagHeight / 2 + tagGap}`);
    var rightArrow = targetLine.append("polygon").classed("right-arrow", true)
        .attr("fill", tagColor)
        .attr("points", `0,${tagHeight / 2} ${-tagGap * 1.015},${tagHeight / 2 - tagGap} ${-tagGap * 1.015},${tagHeight / 2 + tagGap}`);
    var targetText = g_tag.append("text").classed("valText", true)
        .text("")
        .attr("transform", "translate(" + (tagGap + tagWidth / 2) + "," + (tagHeight / 2 + fontSize * .65 / 2) + ")")
        .style("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", ".65rem")
        .style("font-weight", 700);

    //隐形矩形做触摸事件
    let rect_touch = g_main.append("rect").classed("rect_touch", true)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", _this.width_content)
        .attr("height", _this.height_content)
        .style("fill", "rgba(255,255,255,0)")
        ;
    rect_touch.on("touchstart", function () {
        showTargetLine(_this);

    });
    rect_touch.on("touchmove", function () {
        showTargetLine(_this);
    });
    rect_touch.on("touchend", function () {
        targetLine
            .style("transition", "2s")
            .style("opacity", 0);
    });
}
//显示指示框
function showTargetLine(barchart: BarChart) {
    let _this = barchart;
    let g_main = _this.svg.select(".g_main");
    let targetLine = _this.svg.select(".g_line");
    let g_tag = targetLine.select(".g_tag");
    let valTagRect = g_tag.select(".valTag", true);
    let g_bar = g_main.select(".g_bar");
    let leftArrow = targetLine.select(".left-arrow");
    let rightArrow = targetLine.select(".right-arrow");

    let tagWidth = _this.width_content * .3;
    let tagHeight = _this.width_content * .1;
    let tagGap = _this.width_content * .02;

    //判断在纵坐标右边 或者减去margin.left和svg的left
    let clientX = d3.event["changedTouches"][0].clientX - _this.margin.left;
    if (clientX < 0) {
        return;
    }
    targetLine
        .style("transition", "0s")
        .style("opacity", 1);
    //寻找最近的rect
    var rects = g_bar.selectAll(".bar");
    var targetRect;
    var lastDelta;
    rects.each(function (d, e) {
        var thisRect = d3.select(this);
        var centerLineX = Number(thisRect.attr("x")) + thisRect.attr("width") / 2;
        var index;
        if (!targetRect) {
            targetRect = thisRect;
            lastDelta = Math.abs(clientX - centerLineX);
        }
        var newDelta = Math.abs(clientX - centerLineX);
        if (newDelta <= lastDelta) {
            lastDelta = newDelta;
            targetRect = thisRect;
            rects.classed("target", false);
            thisRect.classed("target", true);
            targetLine.attr("transform", "translate(" + centerLineX + ",0)");

            // targetText.text(d.amount);
            targetLine.select(".valText").text(d.amount);
            //过半
            if (e > rects[0].length / 2) {
                g_tag.attr("transform", "translate(" + -(tagGap * 2 + tagWidth) + ",0)");
                leftArrow.classed("no_display", true);
                rightArrow.classed("no_display", false);
            } else {
                g_tag.attr("transform", "translate(0,0)");
                leftArrow.classed("no_display", false);
                rightArrow.classed("no_display", true);
            }
        }
    });
}
//画legend
function addLegend(barchart: BarChart) {
    let _this = barchart;
    let g_legend = _this.svg.append("g").classed("g_legend", true)
        .attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top * .4 + ")");
    g_legend.selectAll(".g_legendItem")
        .data(_this.data_total)
        .enter()
        .append("g").classed("g_legendItem", true)
        .attr("transform", function (d, i) {
            return "translate(" + (i * _this.width_content * .21) + ",0)";
        })
        ;
    let legendItems = g_legend.selectAll(".g_legendItem");
    legendItems
        .append("circle").classed("legendCircle", true)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", ".22rem")
        .attr("fill", "#e3e3e3")
        ;
    legendItems
        .append("text")
        .attr("dominant-baseline", "middle")
        .attr("x", ".5rem")
        .style("font-size", ".8rem")
        .attr("fill", "gray")
        .text(function (d) {
            return d.name;
        })
        ;
    //透明矩形,优化点击事件
    legendItems
        .append("rect")
        .attr("x", 0)
        .attr("y", "-.5rem")
        .attr("width", "2.8rem")
        .attr("height", "1rem")
        .style("opacity", 0)
        ;
    //第一个黄色
    g_legend.select("circle").attr("fill", "#fe7429");
    //legend 点击事件
    //点击重绘
    legendItems
        .on("click", function (d, i) {
            _this.update(d.data, function () {
                //legend圆颜色
                g_legend.selectAll("circle").attr("fill", "#e3e3e3");
                d3.select(g_legend.selectAll("circle")[0][i]).attr("fill", "#fe7429");
            });

        })
        ;
}
