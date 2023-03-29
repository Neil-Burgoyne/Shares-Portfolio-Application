import { Card, CardContent, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";


const SingleAsset = ({ asset }) => {



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell align="left">name:</TableCell>
                        <TableCell align="right">currentMarketValue</TableCell>
                        <TableCell align="right">numShares</TableCell>
                        <TableCell align="right">Current Value</TableCell>
                        <TableCell align="right">averagePricePaid</TableCell>
                        <TableCell align="right">totalFromSales:</TableCell>
                        <TableCell align="right">TotalValueIncrease:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{asset.name}</TableCell>
                        <TableCell align="right">${asset.currentMarketValue}</TableCell>
                        <TableCell align="right">{asset.numShares}</TableCell>
                        <TableCell align="right">${asset.currentTotalValue}</TableCell>
                        <TableCell align="right">${asset.averagePricePaid}</TableCell>
                        <TableCell align="right">${asset.totalFromSales}</TableCell>
                        <TableCell align="right">${asset.totalValueIncrease}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>


    );
}

export default SingleAsset;