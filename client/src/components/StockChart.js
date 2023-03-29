// To show graph of a single stock. Requires stockSymbol prop, 
// Is only set up in demo mode so the only stocksymbol that will work is "IBM"

import React, { useState, useEffect, useMemo } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import './StockChart.css'

require('highcharts/indicators/indicators')(Highcharts)
// require('highcharts/indicators/pivot-points')(Highcharts)
// require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/hollowcandlestick')(Highcharts);


const StockChart = ({ selectedSymbol, allStocks }) => {

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
            text: `Loading`
        },

        series: [{
            type: 'candlestick',
            name: 'Loading',
            title: 'Loading',
            data: [],
        }]
    })


    // if (stock) {
    //     console.log("stock", stock)
    //     options.series[0].data = stock.graphData;
    //     options.series[0].name = stock.symbol;
    //     options.title.text = `${stock.symbol} Price`
    // }



    useEffect(() => {
        const updateSeries = (stock) => {
            const newChartOptions = { ...chartOptions }
            newChartOptions.series[0].data = stock.graphData;
            newChartOptions.series[0].title = stock.symbol;
            newChartOptions.title.text = stock.symbol;
            setChartOptions(newChartOptions);
        }

        // const getData = async () => {
        //     const res = await fetch(`http://localhost:9000/api/stocks/${stockSymbol}`);
        //     const data = await res.json();
        //     updateSeries(data);
        // }
        if (allStocks) {
            updateSeries(allStocks.find((stock) => stock.symbol === selectedSymbol));
        }
    }, [selectedSymbol, allStocks]);

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