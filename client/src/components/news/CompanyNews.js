import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { getNewsSymbol } from '../../api_services/StocksService';
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
      <Stack sx={{ margin: "0.5rem", gap: "1rem" }}>
        {news !== [] ? newsNodes : 'loading...'}
      </Stack>
    </>
  );
};

export default CompanyNews;
