import React from 'react';
import PortfolioTableRow from './PortfolioTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PortfolioTable = ({ sellShares, deleteShare, editShare, user, selectSymbol }) => {
  const cellStyle = {
    width: '3rem',
    height: '3rem',
    textAlign: 'center',
  }
 
  //NOT NEEDED
  // const totalCalc = values.reduce(
  //   (runningTotal, shareValues) =>
  //     (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
  //   0
  // );

  const row = user.portfolio.map((stock, i) => {
    return (
      <PortfolioTableRow
        editShare={editShare}
        deleteShare={deleteShare}
        sellShares={sellShares}
        key={i}
        stock={stock}
        selectSymbol={selectSymbol}
      />
    );
  });

  return (
    <>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Share</TableCell>
              <TableCell sx={cellStyle}>Shares Held</TableCell>
              <TableCell sx={cellStyle}>Average Price Paid (per share)</TableCell>
              <TableCell sx={cellStyle}>Current Value (per share)</TableCell>
              <TableCell sx={cellStyle}>%</TableCell>
              <TableCell sx={cellStyle}>View</TableCell>
              <TableCell sx={cellStyle}>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={cellStyle} style={{fontWeight: 'bold'}}>Total:</TableCell>
              <TableCell sx={cellStyle} style={{fontWeight: 'bold'}}>£{user.portfolioTotals.totalPortfolioValue}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
};

export default PortfolioTable;

{/* <TableCell sx={cellStyle}>Edit</TableCell> */}