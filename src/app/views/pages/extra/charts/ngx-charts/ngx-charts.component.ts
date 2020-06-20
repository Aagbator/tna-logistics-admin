import { Component, OnInit } from '@angular/core';

import { Constants } from 'src/app/config';
import { barChartSingle, barChartmulti, pieChartSingle, lineChartMulti, areaChartMulti } from './charts-data';

import * as shape from 'd3-shape';

@Component({
    selector: 'app-ngx-charts',
    templateUrl: './ngx-charts.component.html',
})
export class NgxChartsComponent implements OnInit {

    public areaChart;
    public areaChart2;
    public lineChart;

    public barChart;
    public barChart_grouped;
    public barChart_grouped2;
    public barChart_horizonal;
    public barChart_grouped_horizontal;

    public pieChart;
    public pieChart2;
    public pieChart3;
    public pieGrid;
    public advancedPieChart;

    //Chart Data
    barChartSingle = barChartSingle;
    lineChartMulti = lineChartMulti;
    areaChartMulti = areaChartMulti;
    barChartmulti = barChartmulti;
    pieChartSingle = pieChartSingle;

    constructor(
    ) {
    }

    ngOnInit() {

        var colors = Constants.colors;

        /*
         * Area Chart Data
         */
        this.areaChart = {
            colorScheme: {
                domain: [colors.primary, colors.purple]
            },
            data: areaChartMulti,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
            autoScale: true,
            lineInterpolation: shape.curveBasis,
        };

        this.areaChart2 = {
            colorScheme: {
                domain: [colors.primary, colors.purple]
            },
            data: areaChartMulti,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
            autoScale: true,
        };

        /*
         * Line Chart Data
         */
        this.lineChart = {
            colorScheme: {
                domain: [
                    colors.primary,
                    colors.danger,
                    colors.success,
                    colors.warning,
                    colors.secondary
                ],
            },
            data: lineChartMulti,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
            autoScale: true,
        };

        /*
         * Bar Chart Data
         */
        this.barChart = {
            colorScheme: {
                domain: [colors.primary]
            },
            data: barChartSingle,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
        };

        /*
         * Grouped Bar Chart Data
         */
        this.barChart_grouped = {
            colorScheme: {
                domain: [colors.primary, colors.purple]
            },
            data: [
              {
                "name": "Germany",
                "series": [
                  {
                    "name": "2010",
                    "value": 730
                  },
                  {
                    "name": "2011",
                    "value": 894
                  }
                ]
              },

              {
                "name": "USA",
                "series": [
                  {
                    "name": "2010",
                    "value": 787
                  },
                  {
                    "name": "2011",
                    "value": 827
                  }
                ]
              },

              {
                "name": "France",
                "series": [
                  {
                    "name": "2010",
                    "value": 500
                  },
                  {
                    "name": "2011",
                    "value": 580
                  }
                ]
              },
              {
                "name": "Australia",
                "series": [
                  {
                    "name": "2010",
                    "value": 600
                  },
                  {
                    "name": "2011",
                    "value": 650
                  }
                ]
              },
              {
                "name": "Russia",
                "series": [
                  {
                    "name": "2010",
                    "value": 780
                  },
                  {
                    "name": "2011",
                    "value": 820
                  }
                ]
              },
              {
                "name": "Spain",
                "series": [
                  {
                    "name": "2010",
                    "value": 600
                  },
                  {
                    "name": "2011",
                    "value": 450
                  }
                ]
              }
            ],
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
        };

        this.barChart_grouped2 = {
            colorScheme: {
                domain: [colors.primary, colors.success, colors.pink]
            },
            data: barChartmulti,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: false,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
        };

        /*
         * Horizontal Bar Chart Data
         */
        this.barChart_horizonal = {
            colorScheme: {
                domain: [
                  colors.info,
                  colors.purple,
                  colors.warning,
                  colors.primary,
                  colors.success,
                  colors.pink,
                ]
            },
            data: barChartSingle,
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
        };

        this.barChart_grouped_horizontal = {
            colorScheme: {
                domain: [colors.primary, colors.purple]
            },
            data: [
              {
                "name": "Germany",
                "series": [
                  {
                    "name": "2010",
                    "value": 730
                  },
                  {
                    "name": "2011",
                    "value": 894
                  }
                ]
              },
              {
                "name": "USA",
                "series": [
                  {
                    "name": "2010",
                    "value": 787
                  },
                  {
                    "name": "2011",
                    "value": 827
                  }
                ]
              },
              {
                "name": "France",
                "series": [
                  {
                    "name": "2010",
                    "value": 500
                  },
                  {
                    "name": "2011",
                    "value": 580
                  }
                ]
              },
              {
                "name": "Australia",
                "series": [
                  {
                    "name": "2010",
                    "value": 600
                  },
                  {
                    "name": "2011",
                    "value": 650
                  }
                ]
              },
              {
                "name": "Spain",
                "series": [
                  {
                    "name": "2010",
                    "value": 600
                  },
                  {
                    "name": "2011",
                    "value": 450
                  }
                ]
              }
            ],
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xAxisLabel: 'Country',
            yAxisLabel: 'Population',
        };


        /*
         * Pie Chart Data
         */
        this.pieChart = {
            colorScheme: {
                domain: [
                  colors.primary,
                  colors.danger,
                  colors.purple,
                  colors.pink,
                  colors.info,
                  colors.success,
                ]
            },
            data: pieChartSingle,
            gradient: false,
            showLegend: true,
            showLabels: true,
            doughnut: false,
            explodeSlices: false,
        };

        this.pieChart2 = {
            colorScheme: {
                domain: [
                  colors.primary,
                  colors.danger,
                  colors.purple,
                  colors.pink,
                  colors.success,
                  colors.info,
                ]
            },
            data: pieChartSingle,
            gradient: false,
            showLegend: false,
            showLabels: true,
            doughnut: true,
            explodeSlices: false,
        };

        this.pieChart3 = {
            colorScheme: {
                domain: [
                  colors.primary,
                  colors.info,
                  colors.pink,
                  colors.success,
                  colors.danger,
                  colors.purple,
                ]
            },
            data: pieChartSingle,
            gradient: false,
            showLegend: false,
            showLabels: true,
            doughnut: false,
            explodeSlices: true,
        };

        this.advancedPieChart = {
            colorScheme: {
                domain: [
                  colors.primary,
                  colors.purple,
                  colors.pink,
                  colors.success,
                ]
            },
            data: [
              {
                "name": "India",
                "value": 40632
              },
              {
                "name": "France",
                "value": 36745
              },
              {
                "name": "UK",
                "value": 46060
              },
              {
                "name": "Brazil",
                "value": 56438
              }
            ],
            gradient: false,
        };


        /*
         * Pie Grid Data
         */
        this.pieGrid = {
            colorScheme: {
                domain: [
                  colors.primary,
                  colors.danger,
                  colors.purple,
                  colors.pink,
                  colors.success,
                  colors.info,
                ]
            },
            data: pieChartSingle,
        };

    }

}
