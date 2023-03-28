// To show graph of a single stock. Requires stockSymbol prop, 
// Is only set up in demo mode so the only stocksymbol that will work is "IBM"

import React, { useState, useEffect, useMemo } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import './StockChart.css'

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/hollowcandlestick')(Highcharts);

const StockChart = ({ stock }) => {

    const options = useMemo(() => {
        const options = {
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
                text: `Loading`
            },

            series: [{
                type: 'candlestick',
                name: 'Loading',
                title: 'Loading',
                data: [],
            }]
        }

        if (stock) {

            options.series[0].data = stock.graphData;
            options.series[0].name = stock.symbol;
            options.title.text = `${stock.symbol} Price`
        }
        return options;
    }, [stock])

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


    // useEffect(() => {
    //     const updateSeries = (data) => {
    //         const newChartOptions = { ...chartOptions }
    //         newChartOptions.series[0].data = data.graphData;
    //         // newChartOptions.series[0].title = stockSymbol;
    //         // newChartOptions.yAxis[0].title.text = stockSymbol;
    //         setChartOptions(newChartOptions);
    //     }

    //     const getData = async () => {
    //         const res = await fetch(`http://localhost:9000/api/stocks/${stockSymbol}`);
    //         const data = await res.json();
    //         updateSeries(data);
    //     }
    //     getData();
    // }, [stockSymbol]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType='stockChart'
                options={options}
            />
        </div>
    );
}

export default StockChart;