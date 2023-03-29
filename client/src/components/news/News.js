import React, { useState, useEffect } from 'react';
import { getNews } from '../../api_services/StocksService';

const News = () => {
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {
            const newsData = await getNews()
            setNews(newsData);
        }

        fetchNews();

    }, [])


    return (<p>news</p>);
}

export default News;