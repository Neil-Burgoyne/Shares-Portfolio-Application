const parseOHLCData = async (data, { symbol, name }) => {
    const stockObject = { symbol, name };
    const graphData = data.t.map((t, index) => {
        return [t * 1000, data.o[index], data.h[index], data.l[index], data.c[index], data.v[index]]
    });
    stockObject.graphData = graphData;
    stockObject.closingValue = stockObject.graphData[0][4];
    return stockObject;
}

module.exports = { parseOHLCData };