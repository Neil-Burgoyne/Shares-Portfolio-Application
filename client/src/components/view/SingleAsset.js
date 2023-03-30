import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import PercentIcon from '@mui/icons-material/Percent'
import { comma } from "../../utilities/comma";
import { cellStyle } from "../../styles/tableStyles";


const SingleAsset = ({ asset }) => {



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={cellStyle}>Symbol</TableCell>
                        <TableCell sx={cellStyle}>Name</TableCell>
                        <TableCell sx={cellStyle}>Shares Held</TableCell>
                        <TableCell sx={cellStyle}>Average Price Paid (per share)</TableCell>
                        <TableCell sx={cellStyle}>Total Paid</TableCell>
                        <TableCell sx={cellStyle}>Current Value (per share)</TableCell>
                        <TableCell sx={cellStyle}>Total Value</TableCell>
                        <TableCell sx={cellStyle}>Total From Sales</TableCell>
                        <TableCell sx={cellStyle}>Total Value Increase</TableCell>
                        <TableCell sx={cellStyle}><PercentIcon fontSize='small' /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={cellStyle} component="th" scope="row">{asset.symbol}</TableCell>
                        <TableCell sx={cellStyle} >{asset.name}</TableCell>
                        <TableCell sx={cellStyle} >{comma(asset.numShares)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.averagePricePaid)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.totalPaid)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.currentMarketValue)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.currentTotalValue)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.totalFromSales)}</TableCell>
                        <TableCell sx={cellStyle} >${comma(asset.totalValueIncrease)}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>


    );
}

export default SingleAsset;