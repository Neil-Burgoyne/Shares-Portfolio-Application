import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const TableRow = ({singleStock, sellShares, deleteShare}) => {
    const [clicked, setClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [shareInput, setShareInput] = useState();

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
        if(shareInput <= singleStock.numshares){
            const temp = {...singleStock}
            temp.numshares -= shareInput
            sellShares(temp, singleStock)
            sellClick()
        } else{
            return null
        }
    }

    const deleteEntry = ()=>{
        deleteShare(singleStock)

    }


    return( 
    <>
    <tr>
        <td>{singleStock.stockSymbol}</td>
        <td>{singleStock.numshares}</td>
        <td>£{singleStock.averagePricePaid}</td>
        <td>£{singleStock.currentMarketValue}</td>
        <td><Link to="/view" singleStock={singleStock}>View</Link></td>
        <td onClick={editClick}>Edit</td>
    {clicked? 
    <>
        <td><input id="input" type='number' onChange={onChange} placeholder='Number to sell'></input></td>
        <td><button onClick={sell}>Sell Shares</button></td>
        <td><button onClick={sellClick}>Cancel</button></td>
    </>
    : <td onClick={sellClick}>Sell</td>}
    </tr>
    {editClicked ? 
    <>
    <tr>
        <td><input type='text' readOnly value={singleStock.stockSymbol}></input></td>
        <td><input type='number' defaultValue={singleStock.numshares}></input></td>
        <td><input type='number' defaultValue={singleStock.averagePricePaid}></input></td>
        <td><input type='number' defaultValue={singleStock.currentMarketValue}></input></td>
        <td><button onClick={deleteEntry}>Delete</button></td>
        <td><button>Confirm Changes</button></td>
        <td><button onClick={editClick}>Cancel</button></td>
    </tr>
    </>
    : null}
    </>
)};

export default TableRow;