import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import { margin } from '@mui/system';
import { TableHead } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PageviewIcon from '@mui/icons-material/Pageview';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';


const PortfolioTableRow = ({ stock, sellShares, deleteShare, editShare, selectSymbol }) => {
    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [shareInput, setShareInput] = useState();
    const [editForm, setEditForm] = useState(stock);

    const editClick = () => {
        setClicked(false)
        setEditClicked(!editClicked);
    }

    const sellClick = () => {
        setEditClicked(false)
        setClicked(!clicked)
    }

    const onChange = (e) => {
        setShareInput(e.target.value)
    }

    const sell = () => {
        if (shareInput <= stock.numShares) {
            sellShares(Number(shareInput), stock)
            sellClick()
        } else {
            return null
        }
    }
    const navigate = useNavigate();
    const handleViewClicked = () => {
        selectSymbol(stock.symbol);
        navigate('/view')
    }

    const deleteEntry = () => {
        setEditClicked(false)
        deleteShare(stock)
    }

    const answer = ((stock.currentMarketValue / stock.averagePricePaid) * 100)

    const editChange = (e) => {
        editForm[e.target.id] = Number(e.target.value)
        setEditForm(editForm)
    }

    const submitEditEntry = () => {
        editShare(editForm, stock)
        setEditForm(stock)
        setEditClicked(!editClicked);
    }


    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{stock.symbol}</TableCell>
                <TableCell>{stock.numShares}</TableCell>
                <TableCell>£{stock.averagePricePaid}</TableCell>
                <TableCell>£{stock.currentMarketValue}</TableCell>
                {answer >= 100 ? <TableCell>&#8593;{(answer - 100).toFixed(2)}%</TableCell> : <TableCell>&#8595;{(100 - answer).toFixed(2)}%</TableCell>}
                <TableCell><PageviewIcon onClick={handleViewClicked} /></TableCell>
                <TableCell onClick={editClick}><SettingsIcon /></TableCell>
                <TableCell onClick={sellClick}><AttachMoneyIcon /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="cell" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={clicked} timeout="auto" unmountOnExit>
                        <TableHead>
                            <TableRow>
                                <TableCell>Sell Shares</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableRow>
                            <TableCell><input id="input" type='number' onChange={onChange} max={stock.numShares} placeholder='Number to sell'></input></TableCell>
                            <TableCell><button onClick={sell}>Sell Shares</button></TableCell>
                            <TableCell><button onClick={sellClick}>Cancel</button></TableCell>
                        </TableRow>
                    </Collapse>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, margin: 0 }} colSpan={8}>
                    <Collapse in={editClicked} timeout="auto" unmountOnExit>
                        <TableHead>
                            <TableCell>Share</TableCell>
                            <TableCell>Shares Held</TableCell>
                            <TableCell>Average Value</TableCell>
                            <TableCell>Current Value</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell><input type='text' readOnly value={stock.symbol}></input></TableCell>
                                <TableCell><input onChange={editChange} id='numShares' type='number' defaultValue={stock.numShares}></input></TableCell>
                                <TableCell><input onChange={editChange} id='averagePricePaid' type='number' defaultValue={stock.averagePricePaid}></input></TableCell>
                                <TableCell><input onChange={editChange} id='currentMarketValue' type='number' defaultValue={stock.currentMarketValue}></input></TableCell>
                                <TableCell><button onClick={deleteEntry}>Delete</button></TableCell>
                                <TableCell><button onClick={submitEditEntry}>Confirm Changes</button></TableCell>
                                <TableCell><button onClick={editClick}>Cancel</button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Collapse>
                </TableCell>
            </TableRow>


        </>
    )
};

export default PortfolioTableRow;