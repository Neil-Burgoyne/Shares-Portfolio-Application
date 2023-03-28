import React from 'react';
import AddShares from './AddShares';
import PortfolioTable from './PortfolioTable';
import UserChart from './UserChart';
import Grid2 from '@mui/material/Unstable_Grid2';

const Home = ({ addShares, sellShares, deleteShare, editShare, user, allStocks }) => {
  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 xs={3}>
          <AddShares allStocks={allStocks} addShares={addShares} />
        </Grid2>
        <Grid2 xs={9}>
        <UserChart />
        <div className='table-test'>
        <PortfolioTable editShare={editShare} sellShares={sellShares} deleteShare={deleteShare} user={user} />
        </div>
        </Grid2>
      </Grid2>
    </>
  );
};
export default Home;
