import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const TableRow = ({singleStock, sellShares, deleteShare, editShare}) => {
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
    <tr>
        <td>{singleStock.stockSymbol}</td>
        <td>{singleStock.numshares}</td>
        <td>£{singleStock.averagePricePaid}</td>
        <td>£{singleStock.currentMarketValue}</td>
        {answer >= 100 ? <td>&#8593;{(answer-100).toFixed(2)}%</td> : <td>&#8595;{(100-answer).toFixed(2)}%</td>}
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
        <td><input onChange={editChange} id='numshares' type='number' defaultValue={singleStock.numshares}></input></td>
        <td><input onChange={editChange} id='averagePricePaid' type='number' defaultValue={singleStock.averagePricePaid}></input></td>
        <td><input onChange={editChange} id='currentMarketValue' type='number' defaultValue={singleStock.currentMarketValue}></input></td>
        <td><button onClick={deleteEntry}>Delete</button></td>
        <td><button onClick={submitEditEntry}>Confirm Changes</button></td>
        <td><button onClick={editClick}>Cancel</button></td>
    </tr>
    </>
    : null}
    </>
)};

export default TableRow;