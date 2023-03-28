import React from 'react';
import Search from './Search';
import StockChart from './StockChart';
import AddShares from './AddShares';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const View = ({ stockSymbol, allStocks, addShares }) => {
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
      <Box align="center">
        <AddShares allStocks={allStocks} addShares={addShares} />
      </Box>
    </>
  );
};

export default View;
