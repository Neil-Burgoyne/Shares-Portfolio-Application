

const parseOHLCData = async (data, { symbol, name }) => {
    const stockObject = { symbol, name };
    const graphData = data.t.map((t, index) => {
        return [t * 1000, data.o[index], data.h[index], data.l[index], data.c[index], data.v[index]]
    });
    stockObject.graphData = graphData;
    stockObject.closingValue = stockObject.graphData[0][4];
    return stockObject;
}

// const parseStockSymbols = async (data) => {
//     const symbolsObject = { data: "stockSymbols", cached: todaysDate() }
//     symbolsObject.symbols = data.map((symbol) => {
//         return { symbol: symbol.symbol, name: symbol.description }
//     });
//     return symbolsObject;
// }

module.exports = { parseOHLCData };