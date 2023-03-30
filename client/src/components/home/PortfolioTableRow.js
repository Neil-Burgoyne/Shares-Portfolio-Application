import React, { useState } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import PageviewIcon from '@mui/icons-material/Pageview';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { cellStyle } from '../../styles/tableStyles';
import { comma } from '../../utilities/comma';



const PortfolioTableRow = ({ stock, sellShares, addShares, selectSymbol }) => {
    const [clicked, setClicked] = useState(false);
    const [addClicked, setAddClicked] = useState(false);
    const [shareInput, setShareInput] = useState();
    const [addInput, setAddInput] = useState();



    const addClick = () => {
        setClicked(false)
        setAddClicked(!addClicked)
    }

    const sellClick = () => {
        setAddClicked(false)
        setClicked(!clicked)
    }

    const onChange = (e) => {
        setShareInput(e.target.value)
    }
    const onAddChange = (e) => {
        setAddInput(e.target.value)
    }

    const add = () => {
        const data = { stockSymbol: stock.symbol, numshares: addInput }
        addShares(data)
        addClick()
        setAddInput()
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
                <TableCell sx={cellStyle}>{stock.name}</TableCell>
                <TableCell sx={cellStyle}>{comma(stock.numShares)}</TableCell>
                <TableCell sx={cellStyle}>${comma(stock.averagePricePaid)}</TableCell>
                <TableCell sx={cellStyle}>${comma(stock.totalPaid)}</TableCell>
                <TableCell sx={cellStyle}>${comma(stock.currentMarketValue)}</TableCell>
                <TableCell sx={cellStyle}>${comma(stock.currentTotalValue)}</TableCell>
                {answer >= 100 ? <TableCell style={{ color: '#00DD00', fontWeight: 'bold' }} sx={cellStyle}>&#8593;{(answer - 100).toFixed(2)}%</TableCell> : <TableCell style={{ color: 'red', fontWeight: 'bold' }} sx={cellStyle}>&#8595;{(100 - answer).toFixed(2)}%</TableCell>}
                <TableCell sx={cellStyle}><PageviewIcon onClick={handleViewClicked} /></TableCell>
                <TableCell sx={cellStyle} onClick={addClick}><AddIcon /></TableCell>
                <TableCell sx={cellStyle} onClick={sellClick}><AttachMoneyIcon /></TableCell>
            </TableRow>
            <TableRow>
                <TableCell className="cell" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={addClicked} timeout="auto" unmountOnExit>
                        <TableRow>
                            <TableCell sx={{ width: '91%' }} />
                            <TableCell style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '10rem' }}>
                                <TextField style={{ marginTop: '0.5rem', marginBottom: '.5rem' }} id="addInput" type='number' onChange={onAddChange} placeholder='Number to Add'></TextField>
                                <Button sx={{backgroundColor: "green", "&:hover": { backgroundColor: "#009900" }}}style={{ marginBottom: '.5rem' }} variant="contained" onClick={add}>Add Shares</Button>
                                <Button style={{ marginBottom: '.5rem' }} variant="contained" onClick={addClick}>Cancel</Button>
                            </TableCell>
                            <TableCell sx={{ width: '10%' }} />
                        </TableRow>
                    </Collapse>
                    <Collapse in={clicked} timeout="auto" unmountOnExit>
                        <TableRow>
                            <TableCell sx={{ width: '100%' }} />
                            <TableCell style={{ display: 'flex', flexDirection: 'column', padding: '2px', width: '10rem' }}>
                                <TextField style={{ marginTop: '0.5rem', marginBottom: '.5rem' }} id="input" type='number' onChange={onChange} max={stock.numShares} placeholder='Number to Sell'></TextField>
                                <Button sx={{backgroundColor: "#DD0000", "&:hover": { backgroundColor: "#FF0000" }}} style={{ marginBottom: '.5rem' }} variant="contained" onClick={sell}>Sell Shares</Button>
                                <Button style={{ marginBottom: '.5rem' }} variant="contained" onClick={sellClick}>Cancel</Button>
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
{/* <TableCell sx={cellStyle} onClick={editClick}><SettingsIcon /></TableCell> */ }
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

// const editClick = () => {
//     setClicked(false)
//     setEditClicked(!editClicked);
// }
// const [editForm, setEditForm] = useState(stock);