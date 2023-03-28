import React, { useMemo } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'



const DonutChart = ({ user }) => {

    const options = useMemo(() => {
        const options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Portfolio<br>Ratios',
                align: 'center',
                verticalAlign: 'middle',
                y: 60
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%'],
                    size: '110%'
                }
            },
            series: [{
                type: 'pie',
                name: 'Portfolio Ratio',
                innerSize: '50%',
                data: [
                ]
            }]
        };
        console.log(user)
        if (user) {
            const data = user.portfolio.map((asset) => {
                console.log("currentMarketValue", asset.currentMarketValue)
                console.log("portfolioTotals", Number(user.portfolioTotals.totalPortfolioValue))

                const percentage = Number(asset.currentTotalValue) / Number(user.portfolioTotals.totalPortfolioValue) * 100;
                return [asset.symbol, percentage]
            })
            console.log(data)
            options.series[0].data = data;
        }
        return options;
    }, [user])
    return (<HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
    )
}

export default DonutChart