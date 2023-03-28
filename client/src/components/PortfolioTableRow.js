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


const PortfolioTableRow = ({singleStock, sellShares, deleteShare, editShare}) => {
    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [shareInput, setShareInput] = useState();
    const [editForm, setEditForm] = useState(singleStock);

    const editClick = ()=>{
        setClicked(false)
        setEditClicked(!editClicked);
    }

    const sellClick = ()=>{
        setEditClicked(false)
        setClicked(!clicked)
    }

    const onChange = (e)=>{
        setShareInput(e.target.value)
    }

    const sell =()=>{
        if(shareInput <= singleStock.numShares){
            sellShares(Number(shareInput), singleStock)
            sellClick()
        } else{
            return null
        }
    }

    const deleteEntry = ()=>{
        setEditClicked(false)
        deleteShare(singleStock)
    }

    const answer = ((singleStock.currentMarketValue / singleStock.averagePricePaid)*100)

    const editChange = (e)=>{
        editForm[e.target.id] = Number(e.target.value)
        setEditForm(editForm)
    }

    const submitEditEntry = ()=>{
        editShare(editForm, singleStock)
        setEditForm(singleStock)
        setEditClicked(!editClicked);
    }


    return( 
    <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">{singleStock.symbol}</TableCell>
            <TableCell>{singleStock.numShares}</TableCell>
            <TableCell>£{singleStock.averagePricePaid}</TableCell>
            <TableCell>£{singleStock.currentMarketValue}</TableCell>
            {answer >= 100 ? <TableCell>&#8593;{(answer-100).toFixed(2)}%</TableCell> : <TableCell>&#8595;{(100-answer).toFixed(2)}%</TableCell>}
            <TableCell><Link to="/view" singleStock={singleStock}><PageviewIcon/></Link></TableCell>
            <TableCell onClick={editClick}><SettingsIcon/></TableCell>
            <TableCell onClick={sellClick}><AttachMoneyIcon/></TableCell>
        </TableRow>
        <TableRow>
        <TableCell className="cell" style={{ paddingBottom: 0, paddingTop: 0}} colSpan={8}>
        <Collapse in={clicked} timeout="auto" unmountOnExit>
                <TableHead>
                <TableRow>
                    <TableCell>Sell Shares</TableCell>
                </TableRow>

                </TableHead>
                <TableRow>        
                    <TableCell><input id="input" type='number' onChange={onChange} placeholder='Number to sell'></input></TableCell>
                    <TableCell><button onClick={sell}>Sell Shares</button></TableCell>
                    <TableCell><button onClick={sellClick}>Cancel</button></TableCell>
                </TableRow>
        </Collapse>
        </TableCell>
        </TableRow>
        
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, margin:0}} colSpan={8}>
        <Collapse in={editClicked} timeout="auto" unmountOnExit>
                <TableHead>
                    <TableCell>Share</TableCell>
                    <TableCell>Shares Held</TableCell>
                    <TableCell>Average Value</TableCell>
                    <TableCell>Current Value</TableCell>
                </TableHead>
                <TableBody>
                <TableRow>        
                    <TableCell><input type='text' readOnly value={singleStock.symbol}></input></TableCell>
                    <TableCell><input onChange={editChange} id='numShares' type='number' defaultValue={singleStock.numShares}></input></TableCell>
                    <TableCell><input onChange={editChange} id='averagePricePaid' type='number' defaultValue={singleStock.averagePricePaid}></input></TableCell>
                    <TableCell><input onChange={editChange} id='currentMarketValue' type='number' defaultValue={singleStock.currentMarketValue}></input></TableCell>
                    <TableCell><button onClick={deleteEntry}>Delete</button></TableCell>
                    <TableCell><button onClick={submitEditEntry}>Confirm Changes</button></TableCell>
                    <TableCell><button onClick={editClick}>Cancel</button></TableCell>
                </TableRow>
                </TableBody>
        </Collapse>
        </TableCell>
        </TableRow>


    </>
)};

export default PortfolioTableRow;