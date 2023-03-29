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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const PortfolioTableRow = ({ stock, sellShares, deleteShare, editShare, selectSymbol }) => {
    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [shareInput, setShareInput] = useState();
    const [editForm, setEditForm] = useState(stock);

    const cellStyle = {
        width: '3rem',
        height: '3rem',
        textAlign: 'center',
    }

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

    
    const answer = ((stock.currentMarketValue / stock.averagePricePaid) * 100)
    
    
    
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={cellStyle} component="th" scope="row">{stock.symbol}</TableCell>
                <TableCell sx={cellStyle}>{stock.numShares}</TableCell>
                <TableCell sx={cellStyle}>£{stock.averagePricePaid}</TableCell>
                <TableCell sx={cellStyle}>£{stock.currentMarketValue}</TableCell>
                {answer >= 100 ? <TableCell sx={cellStyle}>&#8593;{(answer - 100).toFixed(2)}%</TableCell> : <TableCell sx={cellStyle}>&#8595;{(100 - answer).toFixed(2)}%</TableCell>}
                <TableCell sx={cellStyle}><PageviewIcon onClick={handleViewClicked} /></TableCell>
                <TableCell sx={cellStyle} onClick={sellClick}><AttachMoneyIcon /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="cell" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={clicked} timeout="auto" unmountOnExit>
                        <TableRow>
                            <TableCell sx={{width: '100%'}}/>
                            <TableCell sx={{cellStyle, display: 'flex', flexDirection: 'column', padding: '2px', width:'12rem'}}>
                                <TextField style={{marginTop: '0.5rem', marginBottom: '.5rem'}} id="input" type='number' onChange={onChange} max={stock.numShares} placeholder='Number to sell'></TextField>
                                <Button style={{marginBottom: '.5rem'}} variant="contained" onClick={sell}>Sell Shares</Button>
                                <Button style={{marginBottom: '.5rem'}} variant="contained" onClick={sellClick}>Cancel</Button>
                            </TableCell>
                        </TableRow>
                    </Collapse>
                </TableCell>
            </TableRow>



        </>
    )
};

export default PortfolioTableRow;

// EDIT BUTTON
{/* <TableCell sx={cellStyle} onClick={editClick}><SettingsIcon /></TableCell> */}
//EDIT ROW
{/* <TableRow>
<TableCell style={{ paddingBottom: 0, paddingTop: 0, margin: 0 }} colSpan={8}>
<Collapse in={editClicked} timeout="auto" unmountOnExit>
<TableHead>
<TableCell sx={cellStyle}>Share</TableCell>
<TableCell sx={cellStyle}>Shares Held</TableCell>
<TableCell sx={cellStyle}>Average Value</TableCell>
<TableCell sx={cellStyle}>Current Value</TableCell>
</TableHead>
<TableBody>
<TableRow>
<TableCell sx={cellStyle}><input type='text' readOnly value={stock.symbol}></input></TableCell>
<TableCell sx={cellStyle}><input onChange={editChange} id='numShares' type='number' defaultValue={stock.numShares}></input></TableCell>
<TableCell sx={cellStyle}><input onChange={editChange} id='averagePricePaid' type='number' defaultValue={stock.averagePricePaid}></input></TableCell>
<TableCell sx={cellStyle}><input onChange={editChange} id='currentMarketValue' type='number' defaultValue={stock.currentMarketValue}></input></TableCell>
<TableCell sx={cellStyle}><button onClick={deleteEntry}>Delete</button></TableCell>
<TableCell sx={cellStyle}><button onClick={submitEditEntry}>Confirm Changes</button></TableCell>
<TableCell sx={cellStyle}><button onClick={editClick}>Cancel</button></TableCell>
</TableRow>
</TableBody>
</Collapse>
</TableCell>
</TableRow> */}

//EDIT FUNCTIONS
// const deleteEntry = () => {
//     setEditClicked(false)
//     deleteShare(stock)
// }
// const editChange = (e) => {
//     editForm[e.target.id] = Number(e.target.value)
//     setEditForm(editForm)
// }

// const submitEditEntry = () => {
//     editShare(editForm, stock)
//     setEditForm(stock)
//     setEditClicked(!editClicked);
// }

