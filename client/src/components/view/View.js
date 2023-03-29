import React, { useState } from 'react';
import Search from '../home/Search';
import StockChart from './StockChart';
import AddShares from '../home/AddShares';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SingleAsset from './SingleAsset';
import TradeHistory from './TradeHistory';

import CompanyNews from "../news/CompanyNews"

const View = ({
  user,
  allStocks,
  addShares,
  sellShares,
  selectedSymbol,
  selectSymbol,
}) => {

  const [numShares, setNumShares] = useState(0);

  const options = allStocks.map((stock) => {
    return `${stock.symbol} : ${stock.name}`
  })

  const findSelectedOption = () => {

    const found = options.find((option) => {
      console.log(option)
      return option.split(' :')[0] === selectedSymbol;
    })
    return found;
    console.log("found", found)
  }
  const handleChange = (e, value) => {
    console.log(value)
    if (value) {
      const symbol = value.split(' :')[0]
      console.log(symbol)
      selectSymbol(symbol)
    }
  }
  const handleBuyShares = () => {
    const data = { stockSymbol: selectedSymbol, numshares: numShares };
    addShares(data);
    setNumShares(0);
  }
  const handleSellShares = () => {
    if (numShares <= asset.numShares) {
      sellShares(Number(numShares), selectedStock)
    } else {
      return null
    }
  }

  const handleNumChange = (e) => {
    setNumShares(e.target.value)
  }

  const findPortfolioAsset = () => {
    const asset = user.portfolio.find(
      (asset) => asset.symbol === selectedSymbol
    );
    console.log(asset);
    return asset;
  };

  const asset = findPortfolioAsset();
  const selectedStock = allStocks.find((stock) => stock.symbol === selectedSymbol)
  const stockTransactions = user.shareTransactions.filter((trans) => trans.stockSymbol === selectedSymbol);

  return (
    <>
      <Container>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardHeader
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
            avatar={<Avatar>A</Avatar>}
            action={
              <Container sx={{ textAlign: 'right' }}>
                <p>Current Price: ${selectedStock.closingValue}</p>{' '}
                <p>
                  Volume:{' '}
                  {
                    selectedStock.graphData[
                    selectedStock.graphData.length - 1
                    ][5]
                  }
                </p>
              </Container>
            }
            title={
              <Container>
                <Autocomplete
                  size="small"
                  disablePortal
                  sx={{ width: 300 }}
                  onChange={handleChange}
                  options={options}
                  defaultValue={() => findSelectedOption()}
                  renderInput={(params) => (
                    <TextField {...params} label="Select A Stock" />
                  )}
                />
              </Container>
            }
          ></CardHeader>
          <CardContent>
            <StockChart selectedStock={selectedStock} />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "2rem", padding: "0.5rem 2rem 0.5rem 2rem", alignItems: "center" }}>

              <Typography>Numer of Shares:</Typography>
              <TextField
                sx={{ width: "5rem" }}
                type="number"
                onChange={handleNumChange}
                value={numShares}
                variant="standard"
              />
              <Typography>x ${selectedStock.closingValue} = ${(numShares * selectedStock.closingValue).toFixed(2)}</Typography>
              <Button sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "#009900" } }} onClick={handleBuyShares} variant="contained" size="medium">
                Buy
              </Button>
              <Button sx={{ backgroundColor: "#DD0000", "&:hover": { backgroundColor: "#FF0000" } }} onClick={handleSellShares} variant="contained" size="medium">
                Sell
              </Button>
            </Box>

            <br />
            {asset &&
              <><Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Your Holdings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SingleAsset asset={asset} />
                </AccordionDetails>
              </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Transaction History</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TradeHistory transactions={stockTransactions} />
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Company News</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CompanyNews symbol={selectedSymbol} />
                  </AccordionDetails>
                </Accordion>
              </>
            }
          </CardContent>
        </Card>
      </Container>

    </>
  );
};

export default View;
