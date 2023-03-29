import React, { useMemo } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { Box, Card, Table, TableBody, TableRow, Typography, TableCell } from '@mui/material'



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
                y: 10
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
                    startAngle: 0,
                    endAngle: 0,
                    center: ['50%', '50%'],
                    size: '100%'
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
        if (user) {
            const data = user.portfolio.map((asset) => {
                const percentage = Number(asset.currentTotalValue) / Number(user.portfolioTotals.totalPortfolioValue) * 100;
                return [asset.symbol, percentage]
            })
            console.log(data)
            options.series[0].data = data;
        }
        return options;
    }, [user])

    const percentage = ((user.portfolioTotals.totalPortfolioValue / user.portfolioTotals.totalPaid) * 100)


    return (
        <Card sx={{ display: 'flex', padding: "0.5rem 3rem 0.5rem 3rem", alignItems: 'center', justifyContent: 'space-between' }}>

            <Box>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Box>
            <Box>
                {percentage >= 100 ? <Box style={{ color: '#00DD00' }} ><h2>&#8593;{(percentage - 100).toFixed(2)}%</h2></Box> : <Box style={{ color: 'red' }} ><h2>&#8595;{(100 - percentage).toFixed(2)}%</h2></Box>}

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell> <Typography variant="h5">Total Value:</Typography></TableCell>
                            <TableCell align="right"> <Typography variant="h5">${user.portfolioTotals.totalPortfolioValue}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <Typography variant="h6">Total Paid:</Typography></TableCell>
                            <TableCell align="right"> <Typography variant="h6">${user.portfolioTotals.totalPaid}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <Typography variant="h6">Total Sales:</Typography></TableCell>
                            <TableCell align="right"> <Typography variant="h6">${user.portfolioTotals.totalFromSales}</Typography></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> <Typography variant="h6">Total Increase:</Typography></TableCell>
                            <TableCell align="right"> <Typography variant="h6">${user.portfolioTotals.totalValueIncrease}</Typography></TableCell>
                        </TableRow>
                        {/* <Typography variant="h5">Total Value: ${user.portfolioTotals.totalPortfolioValue}</Typography>
                    <Typography variant="h5">T $</Typography>
                    <Typography variant="h5">Total : ${u}</Typography>
                <Typography variant="h5">Value Increase: ${user.}</Typography> */}
                    </TableBody>
                </Table>
            </Box>
        </Card >
    )
}

export default DonutChart