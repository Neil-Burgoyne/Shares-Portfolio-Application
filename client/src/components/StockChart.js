// To show graph of a single stock. Requires stockSymbol prop, 
// Is only set up in demo mode so the only stocksymbol that will work is "IBM"

import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import './StockChart.css'

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/hollowcandlestick')(Highcharts);

const StockChart = ({ stockSymbol }) => {
    Highcharts.theme = {
        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, ''],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
        },
        title: {
            style: {
                color: '#000',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'black'
            },
            itemHoverStyle: {
                color: 'gray'
            }
        }
    };


    Highcharts.setOptions(Highcharts.theme);
    const [chartOptions, setChartOptions] = useState({
        rangeSelector: {
            selected: 1,
            allButtonsEnabled: true,
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m',
                title: 'View 1 month'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'View 3 months'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'View 6 months'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'View year to date'
            }]
        },

        title: {
            text: `${stockSymbol} Price`
        },

        series: [{
            type: 'candlestick',
            name: stockSymbol,
            title: stockSymbol,
            data: [],
        }]
    });
    //     rangeSelector: {
    //         selected: 4,
    //         allButtonsEnabled: true,
    //         buttons: [{
    //             type: 'month',
    //             count: 1,
    //             text: '1m',
    //             title: 'View 1 month'
    //         }, {
    //             type: 'month',
    //             count: 3,
    //             text: '3m',
    //             title: 'View 3 months'
    //         }, {
    //             type: 'month',
    //             count: 6,
    //             text: '6m',
    //             title: 'View 6 months'
    //         }, {
    //             type: 'ytd',
    //             text: 'YTD',
    //             title: 'View year to date'
    //         }]
    //     },
    //     plotOptions: {
    //         candleStick: { animation: true }
    //     },
    //     series: [{
    //         data: [],
    //         type: 'candlestick',
    //         name: `'${stockSymbol} Stock Price'`,
    //         id: 'stock'
    //     }

    //     ]
    // })


    useEffect(() => {
        const updateSeries = (data) => {
            console.log(data)
            const newChartOptions = { ...chartOptions }
            console.log(newChartOptions.series);
            newChartOptions.series[0].data = data.graphData;
            // newChartOptions.series[0].title = stockSymbol;
            // newChartOptions.yAxis[0].title.text = stockSymbol;
            setChartOptions(newChartOptions);
        }

        const getData = async () => {
            const res = await fetch(`http://localhost:9000/api/stocks/${stockSymbol}`);
            const data = await res.json();
            console.log("getData", data);
            updateSeries(data);
        }
        console.log("stockSymbol")
        getData();
    }, [stockSymbol]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType='stockChart'
                options={chartOptions}
            />
        </div>
    );
}

export default StockChart;