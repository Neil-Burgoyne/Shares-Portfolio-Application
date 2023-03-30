import React from 'react';
import AddShares from './AddShares';
import PortfolioTable from './PortfolioTable';
import Grid2 from '@mui/material/Unstable_Grid2';
import DonutChart from './DonutChart';
import CompanyNews from '../news/CompanyNews';
import TableAccordion from '../view/TableAccordion';

const Home = ({
  addShares,
  sellShares,
  user,
  allStocks,
  selectSymbol,
  selectedSymbol,
}) => {
  return (
    <>
      <Grid2 container spacing={3}>
        {/* GAP AT TOP OF PAGE */}
        <Grid2 xs={12} />
        <Grid2 xs={12} />
        {/* GAP AT LEFT OF PAGE */}
        <Grid2 xs={0.5} />
        {/* ADD SHARE */}
        <Grid2 xs={2.5}>
          <AddShares allStocks={allStocks} addShares={addShares} />
          <Grid2 xs={12} />
          <TableAccordion
            summary={`Market News`}
            element={<CompanyNews page="home" />}
          />
        </Grid2>
        {/* PORTFOLIO */}
        <Grid2 xs={8.5}>
          <DonutChart user={user} />
          <PortfolioTable
            sellShares={sellShares}
            addShares={addShares}
            user={user}
            selectedSymbol={selectedSymbol}
            selectSymbol={selectSymbol}
          />
        </Grid2>
        {/* GAP AT RIGHT OF PAGE */}
        <Grid2 xs={0.5} />
        {/* GAP AT BOTTOM OF PAGE */}
        <Grid2 xs={12} />
      </Grid2>
    </>
  );
};
export default Home;
