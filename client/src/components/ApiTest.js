import React, { useState, useEffect } from 'react'
import { getStocks, getStock } from '../api_services/StocksService';

const ApiTest = () => {
    const [allStocks, setAllStocks] = useState([]);
    const [stock, setStock] = useState({});

    useEffect(() => {
        const fetchStocks = async () => {
            const stocks = await getStocks()
            setAllStocks(stocks);
        }
        fetchStocks();
    }, [])

    useEffect(() => {
        const fetchStock = async (symbol) => {
            const stock = await getStock(symbol)
            setStock(stock);
        }
        fetchStock("AAPL");
    }, [])

    return (<h1>ApiTest</h1>);
}

export default ApiTest;