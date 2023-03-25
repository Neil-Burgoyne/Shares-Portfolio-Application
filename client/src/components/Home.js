import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({ user, addShares, sellShares, deleteShare }) => {
  return (
    <>
      <AddShares addShares={addShares} />
      <Table user={user} sellShares={sellShares} deleteShare={deleteShare} />
      <UserChart />
    </>
  );
};
export default Home;
