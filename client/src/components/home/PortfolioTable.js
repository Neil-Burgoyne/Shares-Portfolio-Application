import React from 'react';
import PortfolioTableRow from './PortfolioTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PercentIcon from '@mui/icons-material/Percent';
import { comma } from '../../utilities/comma';
import { cellStyle } from '../../styles/tableStyles';

const PortfolioTable = ({ sellShares, addShares, user, selectSymbol }) => {
  //NOT NEEDED
  // const totalCalc = values.reduce(
  //   (runningTotal, shareValues) =>
  //     (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
  //   0
  // );

  const row = user.portfolio.map((stock, i) => {
    return (
      <PortfolioTableRow
        addShares={addShares}
        sellShares={sellShares}
        key={i}
        stock={stock}
        selectSymbol={selectSymbol}
      />
    );
  });

  const answer =
    (user.portfolioTotals.totalPortfolioValue /
      user.portfolioTotals.totalPaid) *
    100;

  console.log(user.portfolioTotals.totalPortfolioValue);
  console.log(user.portfolioTotals.totalPortfolioValue.length);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Symbol</TableCell>
              <TableCell sx={cellStyle}>Name</TableCell>
              <TableCell sx={cellStyle}>Shares Held</TableCell>
              <TableCell sx={cellStyle}>
                Average Price Paid (per share)
              </TableCell>
              <TableCell sx={cellStyle}>Total Paid</TableCell>
              <TableCell sx={cellStyle}>Current Value (per share)</TableCell>
              <TableCell sx={cellStyle}>Total Value</TableCell>
              <TableCell sx={cellStyle}>
                <PercentIcon fontSize="small" />
              </TableCell>
              <TableCell sx={cellStyle}>View</TableCell>
              <TableCell sx={cellStyle}>Add Shares</TableCell>
              <TableCell sx={cellStyle}>Sell Shares</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell sx={cellStyle} style={{ fontWeight: 'bold' }}>
                Grand Total Paid:
              </TableCell>
              <TableCell sx={cellStyle} style={{ fontWeight: 'bold' }}>
                ${comma(user.portfolioTotals.totalPaid)}
              </TableCell>
              <TableCell sx={cellStyle} style={{ fontWeight: 'bold' }}>
                Current Portfolio Value:
              </TableCell>
              <TableCell sx={cellStyle} style={{ fontWeight: 'bold' }}>
                ${comma(user.portfolioTotals.totalPortfolioValue)}
              </TableCell>
              {answer >= 100 ? (
                <TableCell
                  style={{ color: '#00DD00', fontWeight: 'bold' }}
                  sx={cellStyle}
                >
                  &#8593;{(answer - 100).toFixed(2)}%
                </TableCell>
              ) : (
                <TableCell
                  style={{ color: 'red', fontWeight: 'bold' }}
                  sx={cellStyle}
                >
                  &#8595;{(100 - answer).toFixed(2)}%
                </TableCell>
              )}
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PortfolioTable;

{
  /* <TableCell sx={cellStyle}>Edit</TableCell> */
}
