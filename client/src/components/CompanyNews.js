import React, { useState, useEffect } from 'react';
import { getNewsSymbol } from '../api_services/StocksService';

const CompanyNews = ({ symbol }) => {
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetchNews = async (symbol) => {
            const newsData = await getNewsSymbol(symbol)
            setNews(newsData);
        }
        if (symbol) {
            fetchNews(symbol);
        }
    }, [symbol])


    return (<p>companynews</p>);
}

export default CompanyNews;