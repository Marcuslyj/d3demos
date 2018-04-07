import { PieChart } from '../../../common/charts/PieChart';

export function piechartExpand(piechart: PieChart, handle?) {
    let _this = piechart;
    //core部分
    piechartAddCore(_this, handle);
    //左侧文字部分
    piechartAddMsg(_this);
    //图例部分
    piechartDrawLegend(_this, handle);

    setTimeout(() => {
        _this.animating = false;
        activeFan(_this, 0, _this.data[0], handle);
    }, 1000);
}

//添加core
function piechartAddCore(piechart: PieChart, handle?) {
    let _this = piechart;
    let g_pie = _this.svg.select(".g_pie");
    //添加core内容
    let g_core = g_pie.append("g").classed("g_core", true);
    let core_num = g_core.append("text").classed("core_name", true)
        .text("100000")
        .style("font-size", "1rem")
        .attr("y", "-.3rem")
        .attr("fill", "white")
        ;
    let core_name = g_core.append("text").classed("core_name", true)
        .text("限额")
        .style("font-size", ".8rem")
        .attr("y", "1.1rem")
        .attr("fill", "rgba(255,255,255,.7)")
        ;
    g_core.selectAll("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        ;
    //添加透明core_circle，以进行点击事件
    let core_circle = g_core.append("circle").classed("core_circle", true);
    core_circle.attr("x", 0)
        .attr("y", 0)
        .attr("r", _this.innerRadius * .9)
        .attr("fill", "rgba(255,255,255,0)")
        ;
    //添加core扇形
    let core_fan = g_core.append("path").classed("core_fan", true)
        .attr("d", d3.svg.arc()
            .startAngle(0)
            .endAngle(_this.endAngle)
            .innerRadius(_this.innerRadius)
            .outerRadius(_this.innerRadius)
        )
        .attr("fill", "#3f51b5")
        ;

    //周边扇形点击事件
    let fans = _this.svg.select(".g_encircle").selectAll("path.fan")
    fans.on("click", (d, i) => {
        activeFan(_this, i, d, handle);
    });
    //core点击事件
    core_circle.on("click", () => {
        activeCore(_this, handle);
    });
}
//添加左侧文字展示区
function piechartAddMsg(piechart: PieChart) {
    let _this = piechart;
    let g_msg = _this.svg.select(".g_main").append("g").classed("g_msg", true);
    //画左边文字展示区，透明
    let msg_area = {
        left: _this.width * .04,
        width: _this.outerRadius * 1.7,
        height: _this.outerRadius * 1.7
    }
    g_msg
        .attr("transform", "translate(" + msg_area.left + "," + (_this.height - msg_area.height) / 2 + ")")
        .style("opacity", 0)
        ;
    g_msg.append("path").classed("msg_bg", true)
        .attr("d", () => {
            return `M 0 0 
                        H ${msg_area.width}
                        Q ${msg_area.width * .6} ${msg_area.height / 2}, ${msg_area.width} ${msg_area.height}
                        H 0 V 0`;
        })
        .attr("fill", "rgba(255,255,255,.1)")
        .attr("stroke", "#68a4fb")
        .attr("stroke-width", ".05rem")
        ;
    //百分比背景矩形
    let g_msg_rect = g_msg.append("rect")
        .attr("x", ".3rem")
        .attr("y", msg_area.height / 2 - msg_area.height / 8 - msg_area.height / 16 * 1.3)
        .attr("width", "2rem")
        .attr("height", msg_area.height / 8 * 1.2)
        .attr("rx", ".5rem")
        ;
    //文字
    let g_msg_txt = g_msg.append("g").classed("g_msg_txt", true);
    g_msg_txt.append("text").classed("class", true)
        .attr("x", ".5rem")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .attr("font-size", ".8rem")
        .attr("y", 1.5 * msg_area.height / 8)
        ;
    g_msg_txt.append("text").classed("rate", true)
        .attr("dominant-baseline", "middle")
        .attr("x", ".65rem")
        .attr("fill", "white")
        .attr("font-size", ".6rem")
        .attr("y", msg_area.height / 2 - msg_area.height / 8)
        ;
    g_msg_txt.append("text").classed("used", true)
        .attr("dominant-baseline", "middle")
        .attr("x", ".5rem")
        .attr("fill", "#d2d8fb")
        .attr("font-size", ".6rem")
        .attr("y", 3 * msg_area.height / 4 - msg_area.height / 8);
    g_msg_txt.append("text").classed("canuse", true)
        .attr("dominant-baseline", "middle")
        .attr("x", ".5rem")
        .attr("fill", "#d2d8fb")
        .attr("font-size", ".6rem")
        .attr("y", msg_area.height - 1.5 * msg_area.height / 8)
        ;
}
//添加图例
function piechartDrawLegend(piechart: PieChart, handle?) {
    let _this = piechart;
    let g_legend = _this.svg.select(".g_main").append("g").classed("g_legend", true);
    g_legend
        .attr("transform", "translate(" + _this.width * .8 + "," + _this.height / 2 + ")")
        //透明
        .style("opacity", 0)
        .transition().duration(3000)
        .style("opacity", 1);
    let g_legendItems = g_legend.selectAll(".g_legendItem")
        .data(_this.data)
        .enter()
        .append("g").classed("g_legendItem", true)
        ;
    g_legendItems
        .each(function (d, i) {
            d3.select(this)
                .attr("transform", function () {
                    return "translate(0," + ((i - 2) * _this.height / 8 + _this.height / 16) + ")";
                });
        });
    g_legendItems.append("circle")
        .attr("x", 0)
        .attr("y", 0)
        .attr("r", ".2rem")
        .attr("fill", function (d, i) {
            return _this.getColor(i);
        })
        ;
    g_legendItems.append("text")
        .text(function (d) {
            return d.name;
        })
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .attr("font-size", ".65rem")
        .attr("x", ".5rem")
        .attr("y", ".05rem")
        ;
    //添加透明矩形
    g_legendItems.append("rect")
        .attr("x", 0)
        .attr("y", "-.5rem")
        .attr("width", "3rem")
        .attr("height", "1.2rem")
        .attr("fill", "rgba(255,255,255,0)")
        .on("click", function (d, i) {
            if (_this.coreActive) {
                _this.lastActivated = i;
                activeCore(_this, handle);
            } else {
                activeFan(_this, i, d, handle);
            }
        })
        ;
}
//设置显示文字
function setMsgTxt(piechart: PieChart, d, i, color?) {
    let _this = piechart;
    let g_msg = _this.svg.select("g.g_msg");
    let setColor = _this.getColor(i);
    g_msg.select(".class")
        .text(d.name + " " + d.total);
    g_msg.select(".rate")
        .text(d.rate * 100 + "%");
    g_msg.select(".used")
        .text("已用 " + d.used);
    g_msg.select(".canuse")
        .text("可用 " + d.canuse);
    if (color) {
        setColor = color;
    }
    g_msg.select("rect")
        .attr("fill", setColor)
        .attr("width", function () {
            return 1 + g_msg.select(".rate").text().length * .3 + "rem";
        })
        ;
}
//激活fan
function activeFan(piechart: PieChart, index, data, handle?) {
    let _this = piechart;
    if (_this.animating) {
        return;
    }
    _this.animating = true;
    // //格子线
    // _this.gridline.setWidth(data.rate);
    // _this.gridline.setNum(data.total);
    if (handle) {
        handle(data);
    }

    //扇形区
    let fans = _this.svg.selectAll(".fan");
    fans.each(function (d, i) {
        d3.select(this)
            .attr("d", d3.svg.arc()
                .startAngle(d.startAngle)
                .endAngle(d.endAngle)
                .innerRadius(_this.innerRadius)
                .outerRadius(_this.outerRadius)
            );
    });
    let arc = d3.svg.arc()
        .startAngle(data.startAngle)
        .endAngle(data.endAngle)
        .innerRadius(_this.innerRadius)
        .outerRadius(_this.outerRadius * 1.1);
    d3.select(fans[0][index])
        .transition().duration(600)
        .attr("d", arc);

    let g_msg = _this.svg.select("g.g_msg");
    g_msg.transition().duration(300).ease("linear")
        .style("opacity", 0)
        .each("end", function () {
            setMsgTxt(_this, data, index);
            g_msg
                .transition().duration(300).ease("out")
                .style("opacity", 1)
                .each("end", function () {
                    _this.animating = false;
                    _this.lastActivated = index;
                });
        })
        ;
}
//激活core
function activeCore(piechart: PieChart, handle) {
    let _this = piechart;
    if (_this.animating) {
        return;
    }
    _this.animating = true;
    if (!_this.coreActive) {
        _this.coreActive = true;
        //其他缩小
        let fans = _this.svg.selectAll(".fan");
        let ok = true;
        fans.each(function (d, i) {
            d3.select(this)
                .transition().duration(300)//
                .attr("d", d3.svg.arc()
                    .startAngle(d.startAngle)
                    .endAngle(d.endAngle)
                    .innerRadius(_this.innerRadius)
                    .outerRadius(_this.innerRadius)
                )
                .style("opacity", 0)
                .each("end", function (d, _i) {
                    if (ok) {
                        let core_fan = _this.svg.select(".g_core .core_fan")
                            .transition().duration(300)//
                            .attr("d", d3.svg.arc()
                                .startAngle(0)
                                .endAngle(Math.PI * 2)
                                .innerRadius(_this.innerRadius)
                                .outerRadius(_this.outerRadius * 1.1)
                            );
                    }
                    ok = false;
                })
                ;
        });
        _this.svg.select(".g_msg")
            .transition().duration(300).ease("linear")
            .style("opacity", 0)
            .each("end", function () {
                setMsgTxt(_this, _this.coreInfo, null, "#3f51b5")
                d3.select(this)
                    .transition().duration(300)
                    .style("opacity", 1)
                    .each("end", function () {
                        _this.animating = false;
                    })
                    ;
            });
        //回调
        if (handle) {
            handle(_this.coreInfo);
        }
    }
    else {
        _this.coreActive = false;
        let fans = _this.svg.selectAll(".fan");
        //core 缩小
        let core_fan = _this.svg.select(".g_core .core_fan")
            .transition().duration(300)//
            .attr("d", d3.svg.arc()
                .startAngle(0)
                .endAngle(Math.PI * 2)
                .innerRadius(_this.innerRadius)
                .outerRadius(_this.innerRadius)
            )
            //其他还原
            .each("end", function () {
                let ok = false;
                fans.each(function (d, i) {
                    d3.select(this)
                        .transition().duration(300)//
                        .attr("d", d3.svg.arc()
                            .startAngle(d.startAngle)
                            .endAngle(d.endAngle)
                            .innerRadius(_this.innerRadius)
                            .outerRadius(_this.outerRadius)
                        )
                        .style("opacity", 1)
                        .each("end", function (d, i) {
                            if (!ok) {
                                _this.animating = false;
                                activeFan(_this, _this.lastActivated, _this.data[_this.lastActivated], handle);
                            }
                            ok = true;
                        })
                        ;
                });
            });
        ;
    }
}

