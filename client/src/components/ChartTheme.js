import Highcharts from 'highcharts/highstock'

// require('highcharts/modules/exporting')(Highcharts);
const ChartTheme = () => {
    Highcharts.theme = {
        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            backgroundColor: 'none'
            // {

            //     // linearGradient: [0, 0, 500, 500],
            //     // stops: [
            //     //     [0, ''],
            //     //     [1, 'rgb(240, 240, 255)']
            //     // ]
            // },
        },
        title: {
            style: {
                color: 'white',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: 'white',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'white'
            },
            itemHoverStyle: {
                color: 'gray'
            }
        }

    };
    Highcharts.setOptions(Highcharts.theme);

    return (<></>);
}

export default ChartTheme;