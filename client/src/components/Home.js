import React from 'react';
import AddShares from './AddShares';
import Table from './Table';
import UserChart from './UserChart';

const Home = ({user})=>{
    return(
        <>
            <h1>Home</h1>
            <AddShares/>
            <Table user={user}/>
            <UserChart/>
        </>
    )
};
export default Home;