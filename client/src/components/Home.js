import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({user, addShares, sellShares, deleteShare})=>{
    return(
        <>
            <h1>Home</h1>
            <AddShares addShares={addShares}/>
            <Table user={user} sellShares={sellShares} deleteShare={deleteShare}/>
            <UserChart/>
        </>
    )
};
export default Home;