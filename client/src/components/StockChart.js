// To show graph of a single stock. Requires stockSymbol prop, 
// Is only set up in demo mode so the only stocksymbol that will work is "IBM"

import React, { useState, useEffect } from "react";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/accessibility')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

const StockChart = ({ stockSymbol }) => {
    const [chartOptions, setChartOptions] = useState({
        yAxis: [{
            height: '75%',
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: stockSymbol
            }
        }, {
            top: '75%',
            height: '25%',
            labels: {
                align: 'right',
                x: -3
            },
            offset: 0,
            title: {
                text: 'MACD'
            }
        }],
        series: [{
            data: [],
            type: '',
            name: `'${stockSymbol}Stock Price'`,
            id: 'stock'
        }
            // ,
            // {
            //     type: 'pivotpoints',
            //     linkedTo: 'aapl',
            //     zIndex: 0,
            //     lineWidth: 1,
            //     dataLabels: {
            //         overflow: 'none',
            //         crop: false,
            //         y: 4,
            //         style: {
            //             fontSize: 9
            //         }
            //     }
            // }
            , {
            type: 'macd',
            yAxis: 1,
            linkedTo: 'stock'
        }
        ]
    })


    useEffect(() => {
        const updateSeries = (parsedData) => {
            const newChartOptions = { ...chartOptions }
            newChartOptions.series[0].data = parsedData;
            newChartOptions.series[0].title = stockSymbol;
            newChartOptions.yAxis[0].title.text = stockSymbol;
            setChartOptions(newChartOptions);
        }

        const parseData = (data) => {
            const rawSeriesData = data["Time Series (Daily)"]
            const parsed = Object.keys(rawSeriesData).map((key) => {
                const date = new Date(key).getTime();
                const item = rawSeriesData[key];
                return [date, Number(item["1. open"]), Number(item["2. high"]), Number(item["3. low"]), Number(item["4. close"])];
            }).reverse()
            return parsed;
        }

        const getData = async () => {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&outputsize=full&apikey=demo`);
            const data = await res.json();
            const parsedData = parseData(data);
            updateSeries(parsedData);
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