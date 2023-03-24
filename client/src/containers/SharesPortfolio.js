import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../components/Header.js"
import Home from '../components/Home.js';
import View from '../components/View.js';

const SharesPortfolio = ()=>{
    return(
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/view" element={<View/>}/>
            </Routes>
            <footer>
                <h3>Footer</h3>
            </footer>
        </Router>
    )
};
export default SharesPortfolio;