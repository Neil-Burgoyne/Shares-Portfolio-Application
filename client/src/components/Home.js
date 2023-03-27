import React from 'react';
import AddShares from './AddShares';
import PortfolioTable from './PortfolioTable';
import UserChart from './UserChart';

const Home = ({ user, addShares, sellShares, deleteShare, editShare }) => {
  return (
    <>
      <AddShares addShares={addShares} />
      <div className='table-test'>
      <PortfolioTable table={"portfolio"} editShare={editShare} values={user.shareValues} sellShares={sellShares} deleteShare={deleteShare} />
      </div>
      <UserChart />
    </>
  );
};
export default Home;
