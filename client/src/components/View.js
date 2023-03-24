import React from 'react';
import Search from './Search';
import StockChart from './StockChart';
import AddShares from './AddShares';


const View = ({ stockSymbol }) => {
    return (
        <>
            <h1>View</h1>
            <Search />
            <StockChart stockSymbol={"AAPL"} />
            <AddShares />
        </>
    )
};

export default View;