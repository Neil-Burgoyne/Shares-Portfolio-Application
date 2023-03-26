import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({ user, addShares, sellShares, deleteShare, editShare }) => {
  return (
    <>
      <AddShares addShares={addShares} />
      <Table table={"portfolio"} editShare={editShare} values={user.shareValues} sellShares={sellShares} deleteShare={deleteShare} />
      <UserChart />
    </>
  );
};
export default Home;
