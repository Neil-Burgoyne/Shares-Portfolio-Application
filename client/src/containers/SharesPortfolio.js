import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../components/Home.js';
import View from '../components/View.js';
import ButtonAppBar from '../components/AppBar.js';

import { teal } from '@mui/material/colors';

import ApiTest from '../components/ApiTest.js';


const SharesPortfolio = () => {
  // DARK MODE THEME NEEDS WORK
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: {
        main: '#00796b',
      },
    },
  });

  const [user, setUser] = useState({
    name: 'Millicent Moneybags',
    shareValues: [
      {
        stockSymbol: 'AAPL',
        numshares: 120,
        averagePricePaid: 126,
        currentMarketValue: 125,
      },
      {
        stockSymbol: 'IBM',
        numshares: 120,
        averagePricePaid: 35,
        currentMarketValue: 125,
      },
    ],
    soldShares: [],
  });

  // Saving to state as expected 25/03/23
  const addShares = (data) => {
    const temp = { ...user };
    data.currentMarketValue = 100;
    const match = temp.shareValues.find(
      ({ stockSymbol }) => stockSymbol == data.stockSymbol
    );
    if (match) {
      data.averagePricePaid = Math.round(
        (match.averagePricePaid * match.numshares +
          data.currentMarketValue * data.numshares) /
        (data.numshares + match.numshares)
      );
      data.numshares += match.numshares;
      const index = temp.shareValues.indexOf(match);
      temp.shareValues[index] = data;
      setUser(temp);
    } else {
      data.averagePricePaid = data.currentMarketValue;
      temp.shareValues.push(data);
      setUser(temp);
    }
  };

  const deleteShare = (singleStock) => {
    const temp = { ...user };
    const index = temp.shareValues.indexOf(singleStock);
    temp.shareValues.splice(index, 1);
    setUser(temp);
  };

  const sellShares = (data, singleStock) => {
    addToPreviousPortfolio(data, singleStock);
    const temp = { ...user };
    if (data.numshares == 0) {
      deleteShare(singleStock);
    } else {
      const index = temp.shareValues.indexOf(singleStock);
      temp.shareValues[index] = data;
      setUser(temp);
    }
  };

  const addToPreviousPortfolio = (data, singleStock) => {

    const newDate = new Date()
    const year = newDate.toLocaleString("default", { year: "numeric" })
    const month = newDate.toLocaleString("default", { month: "2-digit" })
    const day = newDate.toLocaleString("default", { day: "2-digit" })
    const formatted = year + "-" + month + "-" + day;
    const newEntry = {
      quantity: singleStock.numshares - data.numshares,
      soldFor: data.currentMarketValue,
      date: formatted
    }
    const temp = { ...user }

    const match = temp.soldShares.find(
      ({ stockSymbol }) => stockSymbol == data.stockSymbol
    );
    if (match) {

      match.sales.push(newEntry)
    } else {
      temp.soldShares.push({
        stockSymbol: data.stockSymbol,
        sales: [{ ...newEntry }]
      })
    }
    setUser(temp)
  };

  const editShare = (data, singleStock) => {
    const temp = { ...user }

    const index = temp.shareValues.indexOf(singleStock);
    temp[index] = data;
    setUser(temp);
  };

  return (
    <Router>
      <ThemeProvider darkMode={darkMode} theme={theme}>
        <Paper style={{ height: '250vh' }}>
          <ButtonAppBar
            check={darkMode}
            change={() => setDarkMode(!darkMode)}
            user={user}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  addShares={addShares}
                  deleteShare={deleteShare}
                  sellShares={sellShares}
                  editShare={editShare}
                />
              }
            />
            <Route path="/view" element={<View user={user} />} />
            <Route path="/apitest" element={<ApiTest />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </Router>
  );
};
export default SharesPortfolio;
