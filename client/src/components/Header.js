import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({user}) => {

    const totalCalc = user.shareValues.reduce((runningTotal, shareValues)=>(runningTotal += (shareValues.currentMarketValue * shareValues.numshares)),0);

    return( 
    <>
        <h1>Header</h1>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/view">Search</Link></button>
        <p>Username: {user.name}</p>
        <p>Current Portfolio Total: £{totalCalc}</p>
    </>
)};

export default Header;

