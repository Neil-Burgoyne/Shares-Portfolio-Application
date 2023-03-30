import {
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import { cellStyle } from "../../styles/tableStyles";
import TransactionRow from "./TransactionRow";


const TradeHistory = ({ transactions }) => {

    const transNodes = transactions.map((trans, index) => <TransactionRow key={trans._id ? trans._id : `${index}${Date.now()}`} transaction={trans} />)

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transNodes}
                </TableBody>
            </Table>
        </TableContainer>


    );
}

export default TradeHistory;