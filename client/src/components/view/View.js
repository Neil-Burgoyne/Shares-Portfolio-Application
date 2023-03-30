import React, { useState, useEffect } from 'react';
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
  SvgIcon,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SingleAsset from './SingleAsset';
import TradeHistory from './TradeHistory';

import CompanyNews from "../news/CompanyNews"
import TableAccordion from './TableAccordion';
import BuyRow from './BuyRow';
import { getImageSymbol } from '../../api_services/StocksService';
import { comma } from '../../utilities/comma';

const View = ({
  user,
  allStocks,
  addShares,
  sellShares,
  selectedSymbol,
  selectSymbol
}) => {
  const [logo, setLogo] = useState(null)

  useEffect(() => {
    const fetchImage = async (selectedStock) => {
      let logo;
      if (selectedStock.logo) logo = selectedStock.logo
      else logo = await getImageSymbol(selectedStock.symbol);
      setLogo(logo);
    }
    if (selectedStock) {
      fetchImage(selectedStock);
    }
  }, [selectedSymbol, allStocks]);

  const options = allStocks.map((stock) => {
    return `${stock.symbol} : ${stock.name}`
  })

  const findSelectedOption = () => {

    const found = options.find((option) => {
      return option.split(' :')[0] === selectedSymbol;
    })
    return found;
  }
  const handleChange = (e, value) => {
    if (value) {
      const symbol = value.split(' :')[0]
      selectSymbol(symbol)
    }
  }

  const findPortfolioAsset = () => {
    const asset = user.portfolio.find(
      (asset) => asset.symbol === selectedSymbol
    );
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
            sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginLeft: "2rem", marginRight: "2rem" }}
            avatar={logo ? <Avatar sx={{ width: "4rem", height: "4rem" }} src={logo} /> : <Avatar sx={{ width: "4rem", height: "4rem" }}>{selectedStock.name[0].toUpperCase()}</Avatar>}
            action={
              <Container sx={{ textAlign: 'right' }}>
                <p>Current Price: ${comma(selectedStock.closingValue)}</p>{' '}
                <p>
                  Volume:{' '}
                  {comma(
                    selectedStock.graphData[
                    selectedStock.graphData.length - 1
                    ][5])
                  }
                </p>
              </Container>
            }
            title={
              <Container>
                <Autocomplete
                  size="small"
                  disablePortal
                  sx={{ width: 500 }}
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
            <BuyRow addShares={addShares} sellShares={sellShares} selectedStock={selectedStock} asset={asset} />
            <br />
            {asset && <>
              <TableAccordion summary={"Detailed Breakdown Of Holdings"} element={<SingleAsset asset={asset} />} />
              <TableAccordion summary={`Your Transaction History For ${selectedStock.name}`} element={<TradeHistory transactions={stockTransactions} />} />
            </>}
            <TableAccordion summary={`${selectedStock.name} News`} element={<CompanyNews symbol={selectedSymbol} />} />
          </CardContent>
        </Card>
      </Container>

    </>
  );
};

export default View;
