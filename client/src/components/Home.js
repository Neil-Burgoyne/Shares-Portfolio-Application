import React from 'react';
import AddShares from './AddShares';
import PortfolioTable from './PortfolioTable';
import UserChart from './UserChart';
import Grid2 from '@mui/material/Unstable_Grid2';
import DonutChart from './DonutChart';

const Home = ({ addShares, sellShares, user, allStocks, selectSymbol, selectedSymbol }) => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 xs={3}>
          <AddShares allStocks={allStocks} addShares={addShares} />
        </Grid2>
        <Grid2 xs={9}>
          <h2>Current Portfolio</h2>
          <DonutChart user={user} />
          <div className='table-test'>
            <PortfolioTable sellShares={sellShares} addShares={addShares} user={user} selectedSymbol={selectedSymbol} selectSymbol={selectSymbol} />
          </div>
        </Grid2>
      </Grid2>
    </>
  );
};
export default Home;
