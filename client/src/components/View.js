import React from 'react';
import Search from './Search';
import StockChart from './StockChart';
import AddShares from './AddShares';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';

const View = ({ stockSymbol }) => {
  return (
    <>
      <Container>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardHeader avatar={<Avatar>A</Avatar>} />
          <Search />
          <CardContent>
            <StockChart stockSymbol={'AAPL'} />
          </CardContent>
        </Card>
      </Container>
      <Grid>
        <AddShares />
      </Grid>
    </>
  );
};

export default View;
