import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { comma } from "../../utilities/comma";
import { cellStyle } from "../../styles/tableStyles";
import { capitalize, formatDate } from "../../utilities/stringUtilities";

const TransactionRow = ({ transaction }) => {

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell sx={cellStyle} component="th" scope="row">{formatDate(transaction.date)}</TableCell>
            <TableCell sx={cellStyle} >{transaction.stockSymbol}</TableCell>
            <TableCell sx={cellStyle} >{comma(transaction.quantity)}</TableCell>
            <TableCell sx={cellStyle} >${comma(transaction.price)}</TableCell>
            <TableCell sx={cellStyle} >${comma((Number(transaction.price) * transaction.quantity).toFixed(2))}</TableCell>
            <TableCell sx={cellStyle} style={transaction.type === "purchase" ? { color: "green" } : { color: "red" }}>{capitalize(transaction.type)}
            </TableCell>
        </TableRow>
    );
}

export default TransactionRow;
