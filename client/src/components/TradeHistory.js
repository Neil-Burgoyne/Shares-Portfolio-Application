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
import { comma } from "../utilities/comma";
import { cellStyle } from "../styles/tableStyles";


const TradeHistory = ({ transactions }) => {



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={cellStyle}>Date</TableCell>
                        <TableCell sx={cellStyle}>Symbol</TableCell>
                        <TableCell sx={cellStyle}>Quantity</TableCell>
                        <TableCell sx={cellStyle}>Price per share</TableCell>
                        <TableCell sx={cellStyle}>Total Price</TableCell>
                        <TableCell sx={cellStyle}>Type</TableCell>



                        <TableCell sx={cellStyle}><PercentIcon fontSize='small' /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={cellStyle} component="th" scope="row">{asset}</TableCell>
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

export default TradeHistory;