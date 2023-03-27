import React from 'react';
import PortfolioTableRow from './PortfolioTableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PortfolioTable = ({ values, sellShares, deleteShare, editShare }) => {
  const totalCalc = values.reduce(
    (runningTotal, shareValues) =>
      (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
    0
  );

  const row = values.map((singleStock, i) => {
    return (
      <PortfolioTableRow
        editShare={editShare}
        deleteShare={deleteShare}
        sellShares={sellShares}
        key={i}
        singleStock={singleStock}
      />
    );
  });

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <>


        <h2>Current Portfolio</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Share</TableCell>
            <TableCell align="right">Shares Held</TableCell>
            <TableCell align="right">Average Price Paid (per share)</TableCell>
            <TableCell align="right">Current Value (per share)</TableCell>
            <TableCell align="right">%</TableCell>
            <TableCell align="right">View</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {row}
        <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Total:</TableCell>
                    <TableCell>£{totalCalc}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    </>
  );
};

export default PortfolioTable;
