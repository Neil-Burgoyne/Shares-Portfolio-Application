import React from 'react';

import { ListItem, List, Paper, Typography, Card } from '@mui/material';
import { Box, textAlign } from '@mui/system';

const NewsCard = ({ article }) => {
  return (
    <Card sx={{ display: "grid", gridTemplateColumns: "1fr 5fr", gap: "2rem", padding: '0.8rem' }} elevation={3}>
      <Box sx={{ width: '13rem', margin: 'auto' }}>
        <img style={{ width: '100%' }} src={article.image} alt="" />
      </Box>
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant='h5'>{article.headline}</Typography>
        <Typography variant='p'>{article.summary}</Typography>
        <br />
        <br />
        <Typography variant='p' ><a target='_blank' style={{ color: '#00e676' }} href={article.url}>
          Click here to read more
        </a></Typography>
      </Box>
    </Card >
  );
};

export default NewsCard;
