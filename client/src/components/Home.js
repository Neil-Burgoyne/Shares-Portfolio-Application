import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({user, addShares, sellShares})=>{
    return(
        <>
            <h1>Home</h1>
            <AddShares addShares={addShares}/>
            <Table user={user} sellShares={sellShares}/>
            <UserChart/>
        </>
    )
};
export default Home;