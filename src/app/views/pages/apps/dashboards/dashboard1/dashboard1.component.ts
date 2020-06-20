import { Component, OnInit } from '@angular/core';

import { Constants } from 'src/app/config';
import {ReportService} from '../../../../../core/services/report/report.service';
import {Dashboard} from '../../../../../core/models/dashboard/dashboard.model';

declare let Chart: any;

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit {

    colors: any;

    public barChart_horizonal;
    public isLoadingChart = false;

    public lineChart;
    public areaChart;
    public doughnutChart;
    public stackedBarChart;

    public dashboardStatistics: Dashboard;
    public barChartData: {name: string, value: number}[] = [];
        // {
        //     "name": "Germany",
        //     "value": 550
        // },
        // {
        //     "name": "USA",
        //     "value": 820
        // },


    constructor(public reportService: ReportService) {

    }


    getDashboardReport = () => {
        this.isLoadingChart = true;
        this.reportService.getDashboardStatistics().subscribe((res => {
            this.dashboardStatistics = new Dashboard(res);
            console.log(this.dashboardStatistics);
            // this.dashboardStatistics.forEach(ele => {
            //     const obj = Object.assign({}, {name: ele.name, value: ele.totalPercentageBought});
            //     this.barChartData.push(obj);
            // });
            this.populateBarchart(this.barChartData);
            this.isLoadingChart = false;
        }));
    }

//     orderStatistics: (3) [{…}, {…}, {…}]
// top10Products: Array(4)
// 0: {id: 2, name: "Banana vinut", price: 500, qty: 0, amount: 0}
// 1: {id: 3, name: "Yoyo vanilla cream", price: 100, qty: 0, amount: 0}
// 2: {id: 4, name: "Five Alive Active", price: 350, qty: 0, amount: 0}
// 3: {id: 5, name: "Berry Blast", price: 420, qty: 0, amount: 0}
// length: 4
// __proto__: Array(0)
// totalCustomerCount: 2
// totalProductCount: 4

    populateBarchart = (data) => {
        /* Horizontal Bar Chart Data */

        this.barChart_horizonal.data = data;
    }

    ngOnInit() {
        const colors = Constants.colors;
        const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const DAYS = ['Sunday', 'Munday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const DAYS_S = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const color = Chart.helpers.color;

        const r = function(min = 1, max = 99) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            rand = Math.round(rand);
            return rand;
        };

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
            data: [],
            gradient: false,
            showXAxis: true,
            showYAxis: true,
            showLegend: true,
            showXAxisLabel: true,
            showYAxisLabel: true,
            xScaleMax: 100,
            xAxisLabel: 'Total Units Bought of 100%',
            yAxisLabel: 'Available Farms',
        };

        this.getDashboardReport();

        /*
         * Line Chart Data
         */
        this.lineChart = {
            type: 'line',
            data: [
                {data: [30, 50, 35, 70, 58, 88, 70], label: 'Dataset'},
            ],
            labels: DAYS_S,
            legend: true,
            colors: [
                {
                    borderColor: colors.primary,
                    backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                    fill: false,
                    borderWidth: 4,
                    pointHitRadius: 30,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.primary,
                    pointHoverBorderColor: '#fff',
                    pointHoverBackgroundColor: colors.primary,
                    pointRadius: 5,
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                },
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
            },
        };

        /*
         * Area Chart Data
         */
        this.areaChart = {
            type: 'line',
            data: [
                {data: [20, 18, 40, 50, 35, 24, 40], label: 'Series A'},
                {data: [28, 48, 24, 35, 70, 33, 32], label: 'Series B'}
            ],
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            legend: true,
            colors: [
                {
                    backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                    borderColor: 'transparent',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.primary,
                    pointHoverBorderColor: '#fff',
                    pointHoverBackgroundColor: colors.primary,
                    pointHitRadius: 30,

                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    backgroundColor: color(colors.purple).alpha(0.7).rgbString(),
                    borderColor: 'transparent',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.purple,
                    pointHoverBorderColor: '#fff',
                    pointHoverBackgroundColor: colors.purple,
                    pointHitRadius: 30,

                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
            options: {
                maintainAspectRatio: false,
            },
        };

        /*
         * Doughnut Chart Data
         */
        this.doughnutChart = {
            type: 'doughnut',
            data: [57, 21],
            labels: ['In-Store Sales', 'Online Sales'],
            colors: [{ backgroundColor: [colors.primary, colors.danger] }],
            legend: false,
            options: {
                cutoutPercentage: 65,
                circumference: 1.6 * Math.PI,
            }
        };

        this.stackedBarChart = {
            type: 'bar',
            data: [
                {
                    data: [30, 55, 70, 45, 32],
                    label: 'Dataset 1',
                    stack: 'Stack 0'
                },
                {
                    data: [10, 15, 15, 35, 30],
                    label: 'Dataset 2',
                    stack: 'Stack 0'
                },
                {
                    data: [10, 15, 25, 15, 25],
                    label: 'Dataset 3',
                    stack: 'Stack 1'
                },
            ],
            labels: [1, 2, 3, 4, 5],
            legend: false,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: false,
                    }],
                    yAxes: [{
                        stacked: true,
                        display: false,
                    }]
                },
            },
            colors: [
                {
                    backgroundColor: colors.primary,
                },
                {
                    backgroundColor: colors.success,
                },
                {
                    backgroundColor: colors.danger,
                },
            ],
        };

    }

}
