import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUsers, transaction } from '../api_services/UsersService';
import { getStocks, getStock } from '../api_services/StocksService';

import Home from '../components/Home.js';
import View from '../components/View.js';
import ButtonAppBar from '../components/AppBar.js';
import { teal } from '@mui/material/colors';
import ApiTest from '../components/ApiTest.js';

const SharesPortfolio = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: {
        main: '#f50057',
      },

      mode: darkMode ? 'dark' : 'light',
    },
  });

  const [allUsers, setUsers] = useState([]);
  const [allStocks, setAllStocks] = useState([]);
  const [stock, setStock] = useState({});
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers()
      setUsers(users);
    }
    fetchUsers();

    const fetchStocks = async () => {
      const stocks = await getStocks()
      setAllStocks(stocks);
    }
    fetchStocks();
  }, [])

  // DATA - {stockSymbol: value, numshares: value}
  const addShares = (newShareData) => {
    const temp = [...allUsers]
    const match = allStocks.find((stock) => stock.symbol == newShareData.stockSymbol)
    transaction(allUsers[user]._id, newShareData.stockSymbol, Number(newShareData.numshares), Number(match.closingValue), 'purchase').then((response) => {
      temp[user] = response
      setUsers(temp)
    })
  }

  const sellShares = (data, singleStock) => {
    const temp = [...allUsers]
    const match = allStocks.find((stock) => stock.symbol == singleStock.symbol)
    transaction(user._id, singleStock.symbol, data, match.closingValue, 'sale').then((response) => {
      temp[user] = response
      setUser(temp)
    })
  };

  // data.currentMarketValue = 100;
  // const match = temp.shareValues.find(
  //   ({ stockSymbol }) => stockSymbol == data.stockSymbol
  // );
  // if (match) {
  //   data.averagePricePaid = Math.round(
  //     (match.averagePricePaid * match.numshares +
  //       data.currentMarketValue * data.numshares) /
  //       (data.numshares + match.numshares)
  //   );
  //   data.numshares += match.numshares;
  //   const index = temp.shareValues.indexOf(match);
  //   temp.shareValues[index] = data;
  //   setUser(temp);
  // }


  // data.currentMarketValue = 100;
  // const match = temp.shareValues.find(
  //   ({ stockSymbol }) => stockSymbol == data.stockSymbol
  // );
  // if (match) {
  //   data.averagePricePaid = Math.round(
  //     (match.averagePricePaid * match.numshares +
  //       data.currentMarketValue * data.numshares) /
  //       (data.numshares + match.numshares)
  //   );
  //   data.numshares += match.numshares;
  //   const index = temp.shareValues.indexOf(match);
  //   temp.shareValues[index] = data;
  //   setUser(temp);
  // } else {
  //   data.averagePricePaid = data.currentMarketValue;
  //   temp.shareValues.push(data);
  //   setUser(temp);
  // }

  const deleteShare = (singleStock) => {
    const temp = { ...user };
    const index = temp.shareValues.indexOf(singleStock);
    temp.shareValues.splice(index, 1);
    setUser(temp);
  };


  // const addToPreviousPortfolio = (data, singleStock) => {
  //   const newDate = new Date();
  //   const year = newDate.toLocaleString('default', { year: 'numeric' });
  //   const month = newDate.toLocaleString('default', { month: '2-digit' });
  //   const day = newDate.toLocaleString('default', { day: '2-digit' });
  //   const formatted = year + '-' + month + '-' + day;
  //   const newEntry = {
  //     quantity: singleStock.numshares - data.numshares,
  //     soldFor: data.currentMarketValue,
  //     date: formatted,
  //   };
  //   const temp = { ...user };

  //   const match = temp.soldShares.find(
  //     ({ stockSymbol }) => stockSymbol == data.stockSymbol
  //   );
  //   if (match) {
  //     match.sales.push(newEntry);
  //   } else {
  //     temp.soldShares.push({
  //       stockSymbol: data.stockSymbol,
  //       sales: [{ ...newEntry }],
  //     });
  //   }
  //   setUser(temp);
  // };

  const editShare = (data, singleStock) => {
    const temp = { ...user };

    const index = temp.shareValues.indexOf(singleStock);
    temp[index] = data;
    setUser(temp);
  };

  return (
    <Router>
      {allUsers[user] && allStocks ?
        <ThemeProvider theme={theme}>
          <Paper style={{ height: '100vh' }}>
            <ButtonAppBar
              check={darkMode}
              change={() => setDarkMode(!darkMode)}
              user={allUsers[user]}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    addShares={addShares}
                    deleteShare={deleteShare}
                    sellShares={sellShares}
                    editShare={editShare}
                    user={allUsers[user]}
                    allStocks={allStocks}
                  />
                }
              />
              <Route path="/view" element={<View />} />
              <Route path="/apitest" element={<ApiTest />} />
            </Routes>
          </Paper>
        </ThemeProvider>
        :
        <h1>Loading...</h1>}
    </Router>
  );
};
export default SharesPortfolio;
