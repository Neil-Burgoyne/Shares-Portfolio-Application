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
                numshares: 120,
                averagePricePaid: 35,
                currentMarketValue: 125
            },
            {
                stockSymbol: "IBM",
                numshares: 120,
                averagePricePaid: 35,
                currentMarketValue: 125
            }
        ],
        previousShareValues: []
    });

    // Saving to state as expected 25/03/23
    const addShares = (data)=>{
        const temp = {...user}
        data.currentMarketValue = 100
        const match = temp.shareValues.find(({stockSymbol}) => stockSymbol == data.stockSymbol)
        if (match){
            data.averagePricePaid = Math.round(((match.averagePricePaid * match.numshares) + (data.currentMarketValue * data.numshares)) / (data.numshares + match.numshares))
            data.numshares += match.numshares
            const index = temp.shareValues.indexOf(match)
            temp.shareValues[index] = data
            setUser(temp)
        }else{
            data.averagePricePaid = data.currentMarketValue
            temp.shareValues.push(data)
            setUser(temp);}
    }

    const deleteShare = (singleStock)=>{
        const temp = {...user}
        const index = temp.shareValues.indexOf(singleStock)
        temp.shareValues.splice(index, 1);
        setUser(temp)
    }

    const sellShares = (data, singleStock)=>{
        addToPreviousPortfolio(data)
        const temp = {...user}
        if (data.numshares == 0){
            deleteShare(singleStock);
        }
        else{
        const index = temp.shareValues.indexOf(singleStock)
        temp.shareValues[index] = data
        setUser(temp)
    }
    }

    const addToPreviousPortfolio = (data)=>{
        // const temp = {...user}
        // temp.previousShareValues.push(data);
        // Work on tomorrow - CIB
    }


    return(
        <Router>
            <Header user={user}/>
            <Routes>
                <Route path="/" element={<Home user={user} addShares={addShares} deleteShare={deleteShare} sellShares={sellShares}/>}/>
                <Route path="/view" element={<View user={user}/>}/>
            </Routes>
            <footer>
                <h3>Footer</h3>
            </footer>
        </Router>
    )
};
export default SharesPortfolio;