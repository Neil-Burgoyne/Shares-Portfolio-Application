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
      <Box align="center">
        <AddShares />
      </Box>
    </>
  );
};

export default View;
