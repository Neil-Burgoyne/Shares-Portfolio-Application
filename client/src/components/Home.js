import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({user, addShares})=>{
    return(
        <>
            <h1>Home</h1>
            <AddShares addShares={addShares}/>
            <Table user={user}/>
            <UserChart/>
        </>
    )
};
export default Home;