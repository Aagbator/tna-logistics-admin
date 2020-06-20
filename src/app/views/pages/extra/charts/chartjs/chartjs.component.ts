import { Component, OnInit } from '@angular/core';

import { Constants } from 'src/app/config';

declare let Chart: any;

@Component({
    selector: 'app-chartjs',
    templateUrl: './chartjs.component.html',
    styleUrls: ['./chartjs.component.css']
})
export class ChartjsComponent implements OnInit {

    colors: any;

    public lineChart;
    public lineChart2;
    public lineChart3;
    public lineChart4;
    public barChart;
    public barChart2;
    public areaChart;
    public areaChart2;
    public areaChart3;

    public horizonalBarChart;
    public stackedBarChart;
    public stackedBarChart2;
    public comboChart;

    public pieChart;
    public doughnutChart;
    public polarAreaChart;
    public radarChart;
    public scatterChart;
    public scatterLogXChart;


    constructor() { }

    ngOnInit() {

        var colors = Constants.colors;
        var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var DAYS = ["Sunday", "Munday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var DAYS_S = ["S", "M", "T", "W", "T", "F", "S"];
        var color = Chart.helpers.color;
        var r = function(min = 1, max = 99) {
            var rand = min - 0.5 + Math.random() * (max - min + 1)
            rand = Math.round(rand);
            return rand;
        };

        /*
         * Line Chart Data
         */

        this.lineChart = {
            type: 'line',
            data: [
                {data: [30, 50, 35, 70, 58, 88, 70], label: 'Series A'},
                {data: [50, 70, 65, 100, 85, 120, 98], label: 'Series B'},
            ],
            labels: DAYS,
            legend: true,
            colors: [
                {
                    borderColor: colors.primary,
                    fill: false,
                    borderWidth: 2,
                    lineTension: 0.1,
                    pointBackgroundColor: colors.primary,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 30,
                    borderDash: [5, 5],
                },
                {
                    borderColor: colors.danger,
                    fill: false,
                    lineTension: 0.1,
                    pointBackgroundColor: '#fff',
                    pointHitRadius: 30,
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 5,
                    pointHoverRadius: 6,
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

        this.lineChart2 = {
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

        this.lineChart3 = {
            type: 'line',
            data: [
                {data: [30, 50, 35, 70, 58, 88, 70], label: 'Series A'},
                {data: [50, 70, 65, 100, 85, 120, 98], label: 'Series B'},
            ],
            labels: DAYS_S,
            legend: true,
            colors: [
                {
                    borderColor: colors.purple,
                    fill: false,
                    borderWidth: 4,
                    pointHitRadius: 30,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.purple,
                    pointHoverBorderColor: '#fff',
                    pointHoverBackgroundColor: colors.purple,
                    pointRadius: 0,
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                },
                {
                    borderColor: colors.pink,
                    fill: false,
                    borderWidth: 4,
                    pointHitRadius: 30,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.pink,
                    pointRadius: 0,
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
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

        this.lineChart4 = {
            type: 'line',
            data: [
                {data: [30, 50, 35, 70, 58, 88, 70], label: 'Dataset'},
            ],
            labels: DAYS_S,
            legend: true,
            colors: [
                {
                    borderColor: colors.primary,
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0.1,
                    pointHitRadius: 30,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: colors.primary,
                    pointHoverBorderWidth: 5,
                }
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
         * Bar Chart Data
         */
        this.barChart = {
            type: 'bar',
            data: [
                {data: [65, 59, 80, 81, 56, 55, 40, 20, 55], label: 'Series A'},
                {data: [28, 48, 40, 19, 86, 27, 90, 30, 70], label: 'Series B'}
            ],
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            legend: true,
            colors: [
                {backgroundColor: colors.primary},
                {backgroundColor: colors.purple},
            ],
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: false,
            },
            chartClicked: function(e:any):void {
                console.log(e);
            },
            chartHovered: function(e:any):void {
                console.log(e);
            }
        };

        this.barChart2 = {
            type: 'bar',
            data: [
                {data: [28, 58, 50, 19, 86, 37, 90, 42, 70], label: 'Series B'}
            ],
            labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
            legend: true,
            colors: [
                {backgroundColor: colors.pink},
            ],
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: false,
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
                responsive: true,
                maintainAspectRatio: false,
            },
        };

        this.areaChart2 = {
            type: 'line',
            data: [
                {data: [30, 50, 35, 70, 58, 88, 70], label: 'Dataset'},
            ],
            labels: DAYS_S,
            legend: true,
            colors: [
                {
                    borderColor: colors.purple,
                    backgroundColor: color(colors.purple).alpha(0.5).rgbString(),
                    borderWidth: 4,
                    pointHitRadius: 30,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: colors.purple,
                    pointRadius: 6,
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
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

        this.areaChart3 = {
            type: 'line',
            data: [
                {
                    data: [50, 80, 28, 61, 28, 75, 12],
                    label: 'Dataset',
                    fill: 'start',
                },
            ],
            labels: DAYS_S,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
            },
            colors: [{
                backgroundColor: color(colors.primary).alpha(0.4).rgbString(),
                borderColor: colors.primary,
                    pointHitRadius: 30,
                    pointBackgroundColor: colors.primary,
                    pointBorderColor: colors.primary,
                    pointHoverBorderWidth: 5,
            }],
        };

        /*
         * Horizonal Bars Chart Data
         */
        this.horizonalBarChart = {
            type: 'horizontalBar',
            data: [
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100),],
                    label: 'Dataset 1',
                },
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100),],
                    label: 'Dataset 2',
                },
            ],
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: false,
            },
            colors: [
                {
                    backgroundColor: colors.primary,
                    borderColor: colors.primary,
                },
                {
                    backgroundColor: colors.danger,
                    borderColor: colors.danger,
                },
            ],
        };

        /*
         * Stacked Bars Chart Data
         */
        this.stackedBarChart = {
            type: 'bar',
            data: [
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(), r(-100, 100), r(-100, 100), r(-100, 100)],
                    label: 'Dataset 1',
                },
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(), r(-100, 100), r(-100, 100), r(-100, 100)],
                    label: 'Dataset 2',
                },
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(), r(-100, 100), r(-100, 100), r(-100, 100)],
                    label: 'Dataset 3',
                },
            ],
            labels: DAYS_S,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
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

        this.stackedBarChart2 = {
            type: 'bar',
            data: [
                {
                    data: [r(), r(), r(), r(), r(), r(), r()],
                    label: 'Dataset 1',
                    stack: 'Stack 0'
                },
                {
                    data: [r(), r(), r(), r(), r(), r(), r()],
                    label: 'Dataset 2',
                    stack: 'Stack 0'
                },
                {
                    data: [r(), r(), r(), r(), r(), r(), r()],
                    label: 'Dataset 3',
                    stack: 'Stack 1'
                },
            ],
            labels: DAYS_S,
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: false,
            },
            colors: [
                {
                    backgroundColor: colors.primary,
                },
                {
                    backgroundColor: colors.success,
                },
                {
                    backgroundColor: colors.warning,
                },
            ],
        };

        /*
         * Combo Chart Data
         */
        this.comboChart = {
            type: 'bar',
            data: [
                {
                    type: 'line',
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100),],
                    label: 'Dataset 1',
                    fill: false,
                    borderWidth: 2,
                },
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100),],
                    label: 'Dataset 2',
                },
                {
                    data: [r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100), r(-100, 100),],
                    label: 'Dataset 3',
                },
            ],
            labels: DAYS_S,
            options: {
                scaleShowVerticalLines: false,
                responsive: true,
                maintainAspectRatio: false,
            },
            colors: [
                {
                    borderColor: colors.primary,
                },
                {
                    backgroundColor: colors.purple,
                },
                {
                    backgroundColor: colors.pink,
                },
            ],
        };


        /*
         * Pie Chart Data
         */
        this.pieChart = {
            type: 'pie',
            data: [300, 500, 100],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
            legend: true,
            colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger] }],
            options: {
                maintainAspectRatio: false
            }
        };

        /*
         * Doughnut Chart Data
         */
        this.doughnutChart = {
            type: 'doughnut',
            data: [350, 450, 100],
            labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
            colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger] }],
            legend: true,
            options: {
                maintainAspectRatio: false
            }
        };

        /*
         * Polar Area Chart Data
         */
        this.polarAreaChart = {
            type: 'polarArea',
            data: [300, 500, 120, 80, 150],
            labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
            legend: true,
            colors: [{ backgroundColor: [colors.primary, colors.purple, colors.danger, colors.success, colors.warning] }],
            options: {
                maintainAspectRatio: false
            }
        };

        /*
         * Radar Chart Data
         */
        this.radarChart = {
            type: 'radar',
            data: [
                {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
                {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
            ],
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            legend: true,
            colors: [
                { backgroundColor: color(colors.primary).alpha(0.5).rgbString(), borderColor: colors.primary },
                { backgroundColor: color(colors.purple).alpha(0.5).rgbString(), borderColor: colors.purple }
            ],
            options: {
                maintainAspectRatio: false
            }
        };

        /*
         * Scatter Chart Data
         */
        this.scatterChart = {
            type: 'scatter',
            data: [
                {
                    label: 'My First dataset',
                    data: [{
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }]
                },
                {
                    label: 'My Second dataset',
                    data: [{
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }, {
                        x: r(-100, 100),
                        y: r(-100, 100),
                    }]
                }
            ],
            legend: true,
            colors: [
                {
                    borderColor: 'transparent',
                    backgroundColor: color(colors.danger).alpha(0.5).rgbString(),
                    pointBackgroundColor: '#FFF',
                    pointBorderColor: colors.danger,
                    pointHoverBackgroundColor: colors.danger,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    borderColor: 'transparent',
                    backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                    pointBackgroundColor: '#FFF',
                    pointBorderColor: colors.primary,
                    pointHoverBackgroundColor: colors.primary,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Chart.js Scatter Chart'
                },
            }
        };

        /*
         * Scatter Logarithmic scale Chart Data
         */
        this.scatterLogXChart = {
            type: 'scatter',
            data: [
                {
                    label: 'V(node2)',
                    data: [{
                        x: 1,
                        y: -1.711e-2,
                    }, {
                        x: 1.26,
                        y: -2.708e-2,
                    }, {
                        x: 1.58,
                        y: -4.285e-2,
                    }, {
                        x: 2.0,
                        y: -6.772e-2,
                    }, {
                        x: 2.51,
                        y: -1.068e-1,
                    }, {
                        x: 3.16,
                        y: -1.681e-1,
                    }, {
                        x: 3.98,
                        y: -2.635e-1,
                    }, {
                        x: 5.01,
                        y: -4.106e-1,
                    }, {
                        x: 6.31,
                        y: -6.339e-1,
                    }, {
                        x: 7.94,
                        y: -9.659e-1,
                    }, {
                        x: 10.00,
                        y: -1.445,
                    }, {
                        x: 12.6,
                        y: -2.110,
                    }, {
                        x: 15.8,
                        y: -2.992,
                    }, {
                        x: 20.0,
                        y: -4.102,
                    }, {
                        x: 25.1,
                        y: -5.429,
                    }, {
                        x: 31.6,
                        y: -6.944,
                    }, {
                        x: 39.8,
                        y: -8.607,
                    }, {
                        x: 50.1,
                        y: -1.038e1,
                    }, {
                        x: 63.1,
                        y: -1.223e1,
                    }, {
                        x: 79.4,
                        y: -1.413e1,
                    }, {
                        x: 100.00,
                        y: -1.607e1,
                    }, {
                        x: 126,
                        y: -1.803e1,
                    }, {
                        x: 158,
                        y: -2e1,
                    }, {
                        x: 200,
                        y: -2.199e1,
                    }, {
                        x: 251,
                        y: -2.398e1,
                    }, {
                        x: 316,
                        y: -2.597e1,
                    }, {
                        x: 398,
                        y: -2.797e1,
                    }, {
                        x: 501,
                        y: -2.996e1,
                    }, {
                        x: 631,
                        y: -3.196e1,
                    }, {
                        x: 794,
                        y: -3.396e1,
                    }, {
                        x: 1000,
                        y: -3.596e1,
                    }],
                }
            ],
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            legend: true,
            colors: [
                {
                    borderColor: 'transparent',
                    backgroundColor: color(colors.primary).alpha(0.5).rgbString(),
                    pointBackgroundColor: '#FFF',
                    pointBorderColor: colors.primary,
                    pointHoverBackgroundColor: colors.primary,
                    pointHitRadius: 30,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Chart.js Scatter Chart - Logarithmic X-Axis'
                },
                scales: {
                    xAxes: [{
                        type: 'logarithmic',
                        position: 'bottom',
                        ticks: {
                            userCallback: function(tick) {
                                var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
                                if (remain === 1 || remain === 2 || remain === 5) {
                                    return tick.toString() + 'Hz';
                                }
                                return '';
                            },
                        },
                        scaleLabel: {
                            labelString: 'Frequency',
                            display: true,
                        },
                    }],
                    yAxes: [{
                        type: 'linear',
                        ticks: {
                            userCallback: function(tick) {
                                return tick.toString() + 'dB';
                            }
                        },
                        scaleLabel: {
                            labelString: 'Voltage',
                            display: true
                        },
                    }]
                }
            }
        };

    }

}
