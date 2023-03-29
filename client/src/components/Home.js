import React from 'react';
import AddShares from './AddShares';
import PortfolioTable from './PortfolioTable';
import UserChart from './UserChart';
import Grid2 from '@mui/material/Unstable_Grid2';
import DonutChart from './DonutChart';

const Home = ({ addShares, sellShares, user, allStocks, selectSymbol, selectedSymbol }) => {
  return (
    <>
      <Grid2 container spacing={6}>
        {/* GAP AT TOP OF PAGE */}
        <Grid2 xs={12}/>
        <Grid2 xs={12}/>
        {/* GAP AT LEFT OF PAGE */}
        <Grid2 xs={.5}/>
        {/* ADD SHARE */}
        <Grid2 xs={2.5}>
          <AddShares allStocks={allStocks} addShares={addShares} />
        </Grid2>
        {/* PORTFOLIO */}
        <Grid2 xs={8.5}>
          <DonutChart user={user} />
          <PortfolioTable sellShares={sellShares} addShares={addShares} user={user} selectedSymbol={selectedSymbol} selectSymbol={selectSymbol} />
        </Grid2>
        {/* GAP AT RIGHT OF PAGE */}
        <Grid2 xs={.5}/>
        {/* GAP AT BOTTOM OF PAGE */}
        <Grid2 xs={12}/>
      </Grid2>
    </>
  );
};
export default Home;
