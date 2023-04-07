import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { getNewsSymbol, getNews } from '../../api_services/StocksService';
import NewsCard from './NewsCard';

const CompanyNews = ({ symbol = null, page }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async (symbol = null) => {
      let newsData
      if (symbol) {
        newsData = await getNewsSymbol(symbol);
        console.table(newsData)
      }
      else { newsData = await getNews(); }
      setNews(newsData);
    };
    if (symbol) {
      fetchNews(symbol);
    } else {
      fetchNews()
    }
  }, [symbol]);

  const newsNodes = news.map((item) => {
    return <NewsCard key={item.id} article={item} page={page} />;
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
