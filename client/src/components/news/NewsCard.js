import React from 'react';

import { Typography, Card } from '@mui/material';
import { Box } from '@mui/system';

const NewsCard = ({ article, page }) => {

const viewPageStyle = 
{
  display: "grid", 
  gridTemplateColumns: "1fr 5fr", 
  gap:'2rem', 
  padding: '0.8rem'
}

const homePageStyle = 
{
  display: "flex", 
  flexDirection:'column',
  gap: "2rem", 
  padding: '0.8rem'
}

  return (
    <>    
      {/* <Card sx={{display: "flex", flexDirection:'column' ,gap: "2rem", padding: '0.8rem' }} elevation={3}> */}
      <Card sx={page==='home' ? homePageStyle : viewPageStyle} elevation={3}>
        <Box sx={{margin: 'auto' }}>
          <img style={{ width: '100%' }} src={article.image} alt="" />
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='h5'>{article.headline}</Typography>
          <Typography variant='p'>{article.summary}</Typography>
          <br />
          <br />
          <Typography variant='p' ><a target='_blank' rel="noopener noreferrer" style={{ color: '#00e676' }} href={article.url}>
            Click here to read more
          </a></Typography>
        </Box>
      </Card > 
    </>
  );
};

export default NewsCard;
