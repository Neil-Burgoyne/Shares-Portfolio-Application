import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../components/Header.js"
import Home from '../components/Home.js';
import View from '../components/View.js';

const SharesPortfolio = ()=>{
    const [user, setUser] = useState({
        name: "Millicent Moneybags",
        shareValues: [
            {
                stockSymbol: "AAPL",
                numshares: '120',
                averagePricePaid: '35',
                currentMarketValue: '125'
            },
            {
                stockSymbol: "IBM",
                numshares: '120',
                averagePricePaid: '35',
                currentMarketValue: '125'
            }
        ]
    });

    const addShares = (data)=>{
        const temp = {...user}
        const match = temp.shareValues.find(({stockSymbol}) => stockSymbol == data.stockSymbol)
        console.log(match)
        data.currentMarketValue = '100'
        data.averagePricePaid = String(Math.round(data.currentMarketValue / data.numshares))
        temp.shareValues.push(data)
        setUser(temp);
    }


    return(
        <Router>
            <Header user={user}/>
            <Routes>
                <Route path="/" element={<Home user={user} addShares={addShares}/>}/>
                <Route path="/view" element={<View user={user}/>}/>
            </Routes>
            <footer>
                <h3>Footer</h3>
            </footer>
        </Router>
    )
};
export default SharesPortfolio;