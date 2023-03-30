import React from 'react';

import { ListItem, List, Paper } from '@mui/material';

const NewsCard = ({ article }) => {
  return (
    <Paper elevation={3}>
      <img style={{ height: '8rem' }} src={article.image} alt="" />
      <List>
        <ListItem style={{ justifyContent: 'center' }}>
          {article.headline}
        </ListItem>
        <ListItem style={{ justifyContent: 'center' }}>
          {article.summary}
        </ListItem>
        <ListItem style={{ justifyContent: 'center' }}>
          <a style={{ color: '#00e676' }} href={article.url}>
            Click here to read more
          </a>
        </ListItem>
      </List>
    </Paper>
  );
};

export default NewsCard;
