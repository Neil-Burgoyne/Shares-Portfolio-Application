let symbols;

const fs = require("fs");
fs.createReadStream("tech.csv", { encoding: "utf-8" })
    .on("data", (chunk) => {
        const splitbyLine = chunk.split(/\r?\n/);
        splitbyLine.shift();
        console.log(splitbyLine);
        symbols = splitbyLine.map((line) => {
            const symbolData = line.split(',');
            return {symbol: symbolData[0],name:symbolData[1],cached:20221025}
        })
        
        symbols = JSON.stringify(symbols);
        fs.writeFile('stockSymbols.json', symbols, 'utf8', ()=>console.log("written"));

    })
    
    .on("error", (error) => {
        console.log(error);
    });
