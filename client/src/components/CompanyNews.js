import React, { useState, useEffect } from 'react';
import { getNewsSymbol } from '../api_services/StocksService';
import NewsCard from './NewsCard';

const CompanyNews = ({ symbol }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async (symbol) => {
      const newsData = await getNewsSymbol(symbol);
      setNews(newsData);
    };
    if (symbol) {
      fetchNews(symbol);
    }
  }, [symbol]);

  const newsNodes = news.map((item) => {
    return <NewsCard key={item.id} article={item} />;
  });
  return (
    <>
      <h1>Company News</h1>
      {news !== [] ? newsNodes : 'loading...'}
    </>
  );
};

export default CompanyNews;
