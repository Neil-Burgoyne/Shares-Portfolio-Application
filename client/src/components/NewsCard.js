import React from 'react';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';

const NewsCard = ({ article }) => {
  return (
    <List>
      <ListItem>
        <img
          style={{ height: '5rem', alignContent: 'center' }}
          src={article.image}
          alt=""
        />
      </ListItem>
      <ListItem>{article.headline}</ListItem>
      <hr/>
    </List>
  );
};

export default NewsCard;
