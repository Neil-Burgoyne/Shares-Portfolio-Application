import React from 'react';
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
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const View = ({ allStocks, addShares }) => {

  const [selected, setSelected] = useState();

  const options = allStocks.map((stock) => {
    return `${stock.symbol}: ${stock.name}`
  })

  const handleChange = (e) => {
    if (e.target.innerText) {
      const symbol = e.target.innerText.split(':')
      const answer = allStocks.find((stock) => stock.symbol == symbol[0])
      setSelected(answer)
    } else {
      setSelected()
    }
  }

  return (
    <>
      <Container>
        <Card elevation={3} style={{ marginTop: '20px' }}>
          <CardHeader avatar={<Avatar>A</Avatar>} />
          <Card>
            <CardContent style={{ display: 'flex' }}>
              <Autocomplete id='combo-box-demo' size="small" onChange={handleChange} disablePortal sx={{ width: 300 }} options={options} renderInput={(params) => <TextField {...params} label="Select A Stock" />} />
              {selected ?
                <div>
                  <Typography variant="h6" component="div">Add Shares to your Portfolio:</Typography>
                  <form onSubmit={null}>
                    <TextField style={{ marginBottom: '1rem' }} id="standard-basic" type="number" label="Number of Shares" onChange={null} variant="standard" />
                    <Button variant="contained" type="submit">Add</Button><br />
                  </form>
                </div>
                : null}
            </CardContent>
          </Card>
          <CardContent>
            <StockChart stock={selected} />
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
