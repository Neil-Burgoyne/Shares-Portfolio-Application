import React, { useState } from 'react';
import Search from './Search';
import StockChart from './StockChart';
import AddShares from './AddShares';
import {
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
import PortfolioTableRow from './PortfolioTableRow';

const View = ({ user, allStocks, editShare, deleteShare, sellShares, addShares, selectedSymbol, selectSymbol }) => {

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


  return (
    <>
      <Container>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardHeader avatar={<Avatar>A</Avatar>} />
          <Card>
            <CardContent style={{ display: 'flex' }}>
              <Autocomplete id='combo-box-demo' size="small" disablePortal sx={{ width: 300 }} onChange={handleChange} options={options} defaultValue={() => findSelectedOption()} renderInput={(params) => <TextField {...params} label="Select A Stock" />} />
              {selectedSymbol ?
                <div>
                  <Typography variant="h6" component="div">Add Shares to your Portfolio:</Typography>
                  <form onSubmit={handleAddShares}>
                    <TextField style={{ marginBottom: '1rem' }} id="standard-basic" type="number" label="Number of Shares" onChange={handleNumChange} variant="standard" />
                    <Button variant="contained" type="submit">Add</Button><br />
                  </form>
                </div>
                : null}
              <PortfolioTableRow editShare={editShare} sellShares={sellShares} deleteShare={deleteShare} user={user} stock={user.portfolio.find(((stock) => stock.symbol === selectedSymbol))} selectSymbol={selectSymbol} />

            </CardContent>
          </Card>
          <CardContent>
            <StockChart selectedSymbol={selectedSymbol} allStocks={allStocks} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography component="div">

            </Typography>
          </CardContent>
        </Card>
      </Container>
      {/* <Box align="center">
        <AddShares allStocks={allStocks} addShares={addShares} />
      </Box> */}
    </>
  );
};

export default View;
