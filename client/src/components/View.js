import React, { useState } from 'react';
import Search from './Search';
import StockChart from './StockChart';
import AddShares from './AddShares';
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
import CompanyNews from "./CompanyNews"


const View = ({
  user,
  allStocks,
  editShare,
  deleteShare,
  sellShares,
  addShares,
  selectedSymbol,
  selectSymbol,
  symbol,
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
  const handleAddShares = (e) => {
    e.preventDefault();
    const data = { stockSymbol: selectedSymbol, numshares: numShares }
    addShares(data)
    e.target.reset()
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
                  id="combo-box-demo"
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

            {asset && <SingleAsset asset={asset} />}
            <br />
            {asset &&
              <><Accordion>
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

            {selectedSymbol ? (
              <div>
                <Typography variant="h6" component="div">
                  Add Shares to your Portfolio:
                </Typography>
                <form onSubmit={handleAddShares}>
                  <TextField
                    style={{ marginBottom: '1rem' }}
                    id="standard-basic"
                    type="number"
                    label="Number of Shares"
                    onChange={handleNumChange}
                    variant="standard"
                  />
                  <Button variant="contained" type="submit">
                    Add
                  </Button>
                  <br />
                </form>
              </div>
            ) : null}
          </CardContent>
        </Card>




      </Container>

    </>
  );
};

export default View;
