import { Component, OnInit } from '@angular/core';
import { PieChart } from '../../common/charts/PieChart';
import { GridLine } from '../../common/charts/GridLine';
import { BarChart } from '../../common/charts/BarChart';

// import * as Dom from '../../common/ts/commonDomFun';
import * as piechartExp from './source/piechartExpand';
import * as gridlineExp from './source/gridlineExpand';
import * as barchartExp from './source/barchartExpand';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  public dropSelectData = [
    { name: "选择1", id: "1" },
    { name: "选择2", id: "2" },
    { name: "选择3", id: "3" },
    { name: "选择4", id: "4" },
    { name: "选择5", id: "5" },
  ];
  constructor() { }
  selectChange(){
    console.log("选项变了");
  }
  ngOnInit() {
    //初始化格子线
    let gridLineConfig = {
      svg: d3.select(".gridLine")
    }
    let gridLine = new GridLine(gridLineConfig);
    gridLine.initialLine();
    //扩展格子线
    gridlineExp.gridlineExpand(gridLine);

    //初始化饼图
    let pieChartConfig = {
      svg: d3.select(".pieChart"),
    }
    //实例化饼图
    let pieChart = new PieChart(pieChartConfig);
    pieChart.drawPieChart();
    //扩展饼图
    piechartExp.piechartExpand(pieChart, (data) => {
      gridLine.setWidth(data.rate);
      gridlineExp.setNum(gridLine, data.total);
    });

    //初始化条形图
    let barchartConfig: any = {
      svg: d3.select(".barchart"),
      margin: {
        top: window.innerWidth * .15,
        right: window.innerWidth * .08,
        bottom: window.innerWidth * .13,
        left: window.innerWidth * .12
      },
      webLineY: true,
      ticks: 5,
      color: "url(#gradient1)",
    };
    let barchartData = [
      {
        name: "债权类",
        data: [{ name: "综合授信", amount: 800 }, { name: "单-自营业务", amount: 580 }
          , { name: "单-理财业务", amount: 850 }, { name: "单-代销信托", amount: 480 }
          , { name: "单-债券承销", amount: 300 }, { name: "单-委托贷款", amount: 700 }]
      },
      {
        name: "债券类",
        data: [{ name: "综合授信2", amount: 600 }, { name: "单-自营业务", amount: 263 }
          , { name: "单-理财业务", amount: 600 }, { name: "单-代销信托", amount: 600 }
          , { name: "单-债券承销", amount: 560 }, { name: "单-委托贷款", amount: 280 }]
      },
      {
        name: "权益类",
        data: [{ name: "综合授信", amount: 450 }, { name: "单-自营业务", amount: 730 }
          , { name: "单-理财业务", amount: 880 }, { name: "单-代销信托", amount: 900 }
          , { name: "单-债券承销", amount: 300 }, { name: "单-委托贷款", amount: 590 }]
      },
      {
        name: "合作类",
        data: [{ name: "综合授信", amount: 666 }, { name: "单-自营业务", amount: 333 }
          , { name: "单-理财业务", amount: 888 }, { name: "单-代销信托", amount: 777 }
          , { name: "单-债券承销", amount: 666 }, { name: "单-委托贷款", amount: 111 }]
      }
    ];

    barchartConfig.data = barchartData[0].data;
    barchartConfig.data_total = barchartData;
    let barchart = new BarChart(barchartConfig);
    barchart.initial();
    barchartExp.barchartExpand(barchart);
  }
}
